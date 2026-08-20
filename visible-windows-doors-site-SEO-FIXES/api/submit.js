// Vercel Serverless Function
// Receives contact and service forms, emails them through Resend, and either
// returns JSON to the enhanced browser form or redirects the no-JS fallback.

const { formidable } = require('formidable');
const fs = require('fs');
const { Resend } = require('resend');

// Vercel Functions reject request bodies above 4.5 MB before this handler is
// reached. A 3 MB file cap leaves room for multipart fields and headers.
const MAX_FILE_SIZE = 3 * 1024 * 1024;
const DEFAULT_INBOX = 'contact@visiblewindowsanddoors.com';
const DEFAULT_SENDER = 'onboarding@resend.dev';
const ALLOWED_FILE_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif'
]);
const ALLOWED_FORM_TYPES = new Set([
  'Contact Form',
  'Service Request',
  'Specialty Window & Door Repair Request'
]);

function getField(fields, key) {
  const value = fields[key];
  return String(Array.isArray(value) ? value[0] || '' : value || '').trim();
}

function getRecipients() {
  // BUSINESS_INBOX_EMAIL is retained for compatibility with the former Next
  // deployment so an environment-variable migration cannot silently drop mail.
  return (process.env.TO_EMAIL || process.env.BUSINESS_INBOX_EMAIL || DEFAULT_INBOX)
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean);
}

function getSender() {
  const configured = (process.env.FROM_EMAIL || DEFAULT_SENDER).trim();
  // Accept both a bare address and the fully formatted value documented by the
  // former app. Never wrap an already formatted value a second time.
  return configured.includes('<')
    ? configured
    : `Visible Windows & Doors Website <${configured}>`;
}

function wantsJson(req) {
  return String(req.headers.accept || '').includes('application/json');
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(JSON.stringify(payload));
}

function redirect(res, location) {
  res.writeHead(303, { Location: location, 'Cache-Control': 'no-store' });
  res.end();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function errorPage(message, returnPath) {
  return `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="robots" content="noindex, follow">
      <title>Submission Error | Visible Windows &amp; Doors</title>
      <style>
        *{box-sizing:border-box} body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;background:#f8f6f0;color:#171c22;font:16px/1.65 system-ui,-apple-system,"Segoe UI",sans-serif}
        main{width:min(100%,600px);border:1px solid rgba(8,32,80,.16);border-top:4px solid #082050;border-radius:16px;background:#fff;padding:clamp(28px,7vw,52px);text-align:center;box-shadow:0 24px 60px -38px rgba(5,22,58,.5)}
        h1{margin:0;color:#082050;font-family:Georgia,serif;font-size:clamp(2rem,8vw,3rem);line-height:1.1} p{margin:18px 0 0} a{color:#082050;font-weight:700} .button{display:inline-flex;margin-top:26px;border-radius:10px;background:#082050;color:#fff;padding:12px 18px;text-decoration:none}
      </style>
    </head>
    <body><main>
      <h1>We couldn't send that request</h1>
      <p>${escapeHtml(message)}</p>
      <p>You can also call <a href="tel:8583349071">(858) 334-9071</a> or email <a href="mailto:${DEFAULT_INBOX}">${DEFAULT_INBOX}</a>.</p>
      <a class="button" href="${escapeHtml(returnPath)}">Return to the form</a>
    </main></body>
  </html>`;
}

function sendError(req, res, statusCode, message, returnPath = '/contact') {
  if (wantsJson(req)) {
    sendJson(res, statusCode, { error: message });
    return;
  }
  res.writeHead(statusCode, {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(errorPage(message, returnPath));
}

function sendSuccess(req, res) {
  if (wantsJson(req)) {
    sendJson(res, 200, {
      message: 'Thank you. Your request was sent successfully.',
      redirect: '/thank-you'
    });
    return;
  }
  redirect(res, '/thank-you');
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function safeFilename(value) {
  return String(value || 'project-photo')
    .replace(/[^a-zA-Z0-9._() -]/g, '_')
    .slice(0, 120);
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    sendError(req, res, 405, 'This endpoint only accepts form submissions.');
    return;
  }

  if (!String(req.headers['content-type'] || '').includes('multipart/form-data')) {
    sendError(req, res, 415, 'The form submission format was not recognized. Please reload the page and try again.');
    return;
  }

  let invalidFileType = false;
  const form = formidable({
    multiples: false,
    maxFiles: 1,
    allowEmptyFiles: true,
    minFileSize: 0,
    maxFileSize: MAX_FILE_SIZE,
    maxTotalFileSize: MAX_FILE_SIZE,
    maxFields: 40,
    maxFieldsSize: 128 * 1024,
    filter(part) {
      // Browsers commonly serialize an unselected optional file input as an
      // empty file part. It must be allowed and then ignored below.
      if (!part.originalFilename) return true;
      const allowed = ALLOWED_FILE_TYPES.has(String(part.mimetype || '').toLowerCase());
      if (!allowed) invalidFileType = true;
      return allowed;
    }
  });

  let fields;
  let files;
  try {
    [fields, files] = await form.parse(req);
  } catch (parseError) {
    console.error('Form parse error:', parseError);
    const tooLarge = parseError && (
      parseError.code === 1009 ||
      parseError.httpCode === 413 ||
      /maxFileSize|maxTotalFileSize/i.test(String(parseError.message || ''))
    );
    sendError(
      req,
      res,
      tooLarge ? 413 : 400,
      tooLarge
        ? 'That image is too large. Please choose an image smaller than 3 MB, or submit without a photo.'
        : 'We could not read the form. Please review the fields and try again.'
    );
    return;
  }

  if (invalidFileType) {
    sendError(req, res, 400, 'Please upload a JPEG, PNG, WebP, HEIC, or HEIF image.');
    return;
  }

  // Honeypot spam trap. Return the normal success response without sending.
  if (getField(fields, 'bot-field')) {
    sendSuccess(req, res);
    return;
  }

  const requestedType = getField(fields, 'form-type');
  const formType = ALLOWED_FORM_TYPES.has(requestedType) ? requestedType : 'Website Form';
  const returnPath = formType === 'Contact Form'
    ? '/contact'
    : formType === 'Specialty Window & Door Repair Request'
      ? '/specialty-window-door-repair#repair-form'
      : '/service-maintenance#service-form';
  const name = getField(fields, 'name');
  const email = getField(fields, 'email');
  const description = getField(fields, 'message') || getField(fields, 'notes');

  if (!name || !email || !description) {
    sendError(req, res, 400, 'Please complete your name, email, and project description.', returnPath);
    return;
  }

  if (!isValidEmail(email)) {
    sendError(req, res, 400, 'Please enter a valid email address.', returnPath);
    return;
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set in the Vercel project environment variables.');
    sendError(
      req,
      res,
      503,
      'Email delivery is temporarily unavailable. Your entries are still on the previous page; please go back, or contact us directly.',
      returnPath
    );
    return;
  }

  try {
    const attachments = [];
    const fileField = files.photo;
    if (fileField) {
      const uploaded = Array.isArray(fileField) ? fileField[0] : fileField;
      if (uploaded && uploaded.size > 0) {
        const buffer = fs.readFileSync(uploaded.filepath);
        attachments.push({
          filename: safeFilename(uploaded.originalFilename),
          content: buffer.toString('base64')
        });
      }
    }

    const bodyLines = Object.keys(fields)
      .filter((key) => !['bot-field', 'form-type'].includes(key))
      .map((key) => `${key}: ${getField(fields, key)}`)
      .join('\n');

    // Resend resolves API-level failures rather than throwing them, so always
    // inspect `error` before reporting success to the visitor.
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: getSender(),
      to: getRecipients(),
      replyTo: email,
      subject: `New ${formType} Submission`,
      text: bodyLines,
      attachments: attachments.length ? attachments : undefined
    });

    if (error) {
      console.error('Resend API error:', error);
      sendError(
        req,
        res,
        502,
        'We could not deliver your request right now. Your entries are still on the previous page; please go back and try again, or contact us directly.',
        returnPath
      );
      return;
    }

    sendSuccess(req, res);
  } catch (sendErrorValue) {
    console.error('Email send error:', sendErrorValue);
    sendError(
      req,
      res,
      500,
      'We could not deliver your request right now. Your entries are still on the previous page; please go back and try again, or contact us directly.',
      returnPath
    );
  }
};
