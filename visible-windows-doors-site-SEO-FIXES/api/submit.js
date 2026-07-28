// Vercel Serverless Function
// Receives submissions from contact.html, service-maintenance.html, and
// lift-and-slide-door-repair.html, emails them via Resend, and redirects
// to /thank-you.html on success.
//
// Required environment variables (set in Vercel Project Settings > Environment Variables):
//   RESEND_API_KEY  - API key from https://resend.com
//   TO_EMAIL        - inbox that should receive submissions (defaults to contact@visiblewindowsanddoors.com)
//   FROM_EMAIL      - verified sender address in Resend (defaults to Resend's shared
//                      onboarding@resend.dev sandbox address, which works immediately
//                      but should be replaced once your domain is verified in Resend)

const { formidable } = require('formidable');
const fs = require('fs');
const { Resend } = require('resend');

const TO_EMAIL = process.env.TO_EMAIL || 'contact@visiblewindowsanddoors.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';
// Resend's constructor throws if the key is missing/empty, so pass a
// placeholder here and check RESEND_API_KEY explicitly before sending.
// This keeps a missing env var from crashing the whole function at cold
// start (which would show Vercel's generic error page instead of ours).
const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

function getField(fields, key) {
  const v = fields[key];
  return Array.isArray(v) ? v[0] : v;
}

function sendHtml(res, statusCode, html) {
  res.writeHead(statusCode, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
}

function redirect(res, location) {
  res.writeHead(302, { Location: location });
  res.end();
}

function errorPage() {
  return `<!doctype html><html><head><meta charset="utf-8"><title>Submission Error</title></head><body style="font-family:sans-serif;max-width:560px;margin:80px auto;text-align:center">
  <h1>Something went wrong</h1>
  <p>We couldn't submit your request. Please email us directly at <a href="mailto:contact@visiblewindowsanddoors.com">contact@visiblewindowsanddoors.com</a> or call us, and we'll get right back to you.</p>
  <p><a href="/contact.html">Return to Contact Page</a></p>
  </body></html>`;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    sendHtml(res, 405, 'Method Not Allowed');
    return;
  }

  const form = formidable({ multiples: false, maxFileSize: 15 * 1024 * 1024 });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parse error:', err);
      sendHtml(res, 500, errorPage());
      return;
    }

    // Honeypot spam trap: if this hidden field is filled in, a bot did it.
    // Pretend success so the bot doesn't learn anything, but don't email it.
    const botField = getField(fields, 'bot-field');
    if (botField) {
      redirect(res, '/thank-you.html');
      return;
    }

    const formType = getField(fields, 'form-type') || 'Website Form';

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set in the Vercel project environment variables.');
      sendHtml(res, 500, errorPage());
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
            filename: uploaded.originalFilename || 'attachment',
            content: buffer.toString('base64'),
          });
        }
      }

      const bodyLines = Object.keys(fields)
        .filter((k) => !['bot-field', 'form-type'].includes(k))
        .map((k) => `${k}: ${getField(fields, k)}`)
        .join('\n');

      // The Resend SDK does NOT throw on API-level failures (bad key,
      // unverified domain, rate limit, etc.) - it resolves normally with
      // { data: null, error: {...} }. Must check `error` explicitly or a
      // failed send would silently redirect to the thank-you page.
      const { data, error } = await resend.emails.send({
        from: `Visible Windows & Doors Website <${FROM_EMAIL}>`,
        to: TO_EMAIL,
        replyTo: getField(fields, 'email') || undefined,
        subject: `New ${formType} Submission`,
        text: bodyLines,
        attachments,
      });

      if (error) {
        console.error('Resend API error:', error);
        sendHtml(res, 500, errorPage());
        return;
      }

      redirect(res, '/thank-you.html');
    } catch (sendErr) {
      console.error('Email send error:', sendErr);
      sendHtml(res, 500, errorPage());
    }
  });
};
