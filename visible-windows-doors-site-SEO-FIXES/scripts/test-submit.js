const assert = require('assert/strict');
const { Readable } = require('stream');

const submit = require('../api/submit');

function multipartBody(boundary, fields, includeEmptyPhoto) {
  const parts = [];
  Object.entries(fields).forEach(([name, value]) => {
    parts.push(
      `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="${name}"\r\n\r\n` +
      `${value}\r\n`
    );
  });
  if (includeEmptyPhoto) {
    parts.push(
      `--${boundary}\r\n` +
      'Content-Disposition: form-data; name="photo"; filename=""\r\n' +
      'Content-Type: application/octet-stream\r\n\r\n\r\n'
    );
  }
  parts.push(`--${boundary}--\r\n`);
  return Buffer.from(parts.join(''));
}

function multipartBodyWithPhoto(boundary, fields, photo) {
  const before = multipartBody(boundary, fields, false)
    .toString()
    .replace(`--${boundary}--\r\n`, '');
  return Buffer.concat([
    Buffer.from(
      before +
      `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="photo"; filename="${photo.filename}"\r\n` +
      `Content-Type: ${photo.type}\r\n\r\n`
    ),
    photo.content,
    Buffer.from(`\r\n--${boundary}--\r\n`)
  ]);
}

function invoke({ method = 'POST', body = Buffer.alloc(0), contentType = '' }) {
  return new Promise((resolve, reject) => {
    const req = Readable.from(body.length ? [body] : []);
    req.method = method;
    req.headers = {
      accept: 'application/json',
      'content-type': contentType,
      'content-length': String(body.length)
    };

    const response = { statusCode: 200, headers: {}, body: '' };
    const res = {
      setHeader(name, value) {
        response.headers[name.toLowerCase()] = value;
      },
      writeHead(statusCode, headers = {}) {
        response.statusCode = statusCode;
        Object.entries(headers).forEach(([name, value]) => {
          response.headers[name.toLowerCase()] = value;
        });
      },
      end(value = '') {
        response.body += value;
        resolve(response);
      }
    };

    Promise.resolve(submit(req, res)).catch(reject);
  });
}

async function run() {
  const boundary = 'visible-windows-form-test';

  const emptyPhotoBody = multipartBody(boundary, { 'bot-field': 'test-bot' }, true);
  const emptyPhoto = await invoke({
    body: emptyPhotoBody,
    contentType: `multipart/form-data; boundary=${boundary}`
  });
  assert.equal(emptyPhoto.statusCode, 200, 'empty optional file should not fail parsing');
  assert.equal(JSON.parse(emptyPhoto.body).redirect, '/thank-you');

  const noPhotoBody = multipartBody(boundary, { 'bot-field': 'test-bot' }, false);
  const noPhoto = await invoke({
    body: noPhotoBody,
    contentType: `multipart/form-data; boundary=${boundary}`
  });
  assert.equal(noPhoto.statusCode, 200, 'a submission without the optional file should parse');

  const wrongTypeBody = multipartBodyWithPhoto(boundary, { 'bot-field': 'test-bot' }, {
    filename: 'notes.txt',
    type: 'text/plain',
    content: Buffer.from('not an image')
  });
  const wrongType = await invoke({
    body: wrongTypeBody,
    contentType: `multipart/form-data; boundary=${boundary}`
  });
  assert.equal(wrongType.statusCode, 400, 'non-image attachments should be rejected');
  assert.match(JSON.parse(wrongType.body).error, /JPEG, PNG, WebP, HEIC, or HEIF/i);

  const oversizedBody = multipartBodyWithPhoto(boundary, { 'bot-field': 'test-bot' }, {
    filename: 'large.jpg',
    type: 'image/jpeg',
    content: Buffer.alloc(3 * 1024 * 1024 + 1, 1)
  });
  const originalConsoleError = console.error;
  console.error = () => {};
  let oversized;
  try {
    oversized = await invoke({
      body: oversizedBody,
      contentType: `multipart/form-data; boundary=${boundary}`
    });
  } finally {
    console.error = originalConsoleError;
  }
  assert.equal(oversized.statusCode, 413, 'files above the advertised 3 MB limit should be rejected');

  const requiredBody = multipartBody(boundary, { 'form-type': 'Contact Form' }, false);
  const required = await invoke({
    body: requiredBody,
    contentType: `multipart/form-data; boundary=${boundary}`
  });
  assert.equal(required.statusCode, 400, 'missing required fields should be rejected');
  assert.match(JSON.parse(required.body).error, /name, email, and project description/i);

  const method = await invoke({ method: 'GET' });
  assert.equal(method.statusCode, 405, 'non-POST requests should be rejected');

  const format = await invoke({
    body: Buffer.from('{}'),
    contentType: 'application/json'
  });
  assert.equal(format.statusCode, 415, 'non-multipart requests should be rejected');

  console.log('Form endpoint tests passed.');
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
