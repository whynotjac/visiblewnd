const http = require('http');
const fs = require('fs');
const path = require('path');

const submitForm = require('../api/submit');

const ROOT = path.resolve(__dirname, '..');
const PORT = Number.parseInt(process.env.PORT || '3000', 10);
const HOST = process.env.DEV_HOST || '127.0.0.1';

const MIME_TYPES = {
  '.avif': 'image/avif',
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8'
};

const BLOCKED_PREFIXES = [
  '/.git',
  '/.env',
  '/.design-previews',
  '/api/',
  '/node_modules/',
  '/scripts/'
];

const BLOCKED_FILES = new Set([
  '/package.json',
  '/package-lock.json',
  '/vercel.json'
]);

const REDIRECTS = new Map([
  ['/lift-and-slide-door-repair', '/specialty-window-door-repair'],
  ['/lift-and-slide-door-repair.html', '/specialty-window-door-repair']
]);

function commonHeaders(contentType) {
  return {
    'Cache-Control': 'no-store',
    'Content-Type': contentType,
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN'
  };
}

function isBlocked(pathname) {
  return BLOCKED_FILES.has(pathname)
    || BLOCKED_PREFIXES.some((prefix) => pathname === prefix.slice(0, -1) || pathname.startsWith(prefix));
}

function redirect(res, destination, search = '') {
  res.writeHead(308, {
    'Cache-Control': 'no-store',
    Location: `${destination}${search}`
  });
  res.end();
}

function safeFilePath(pathname) {
  const relativePath = pathname.replace(/^\/+/, '');
  const absolutePath = path.resolve(ROOT, relativePath);
  if (absolutePath !== ROOT && !absolutePath.startsWith(`${ROOT}${path.sep}`)) return null;
  return absolutePath;
}

function existingFile(pathname) {
  const filePath = safeFilePath(pathname);
  if (!filePath) return null;
  try {
    return fs.statSync(filePath).isFile() ? filePath : null;
  } catch {
    return null;
  }
}

function resolveStaticFile(pathname) {
  if (pathname === '/') return path.join(ROOT, 'index.html');
  if (isBlocked(pathname)) return null;

  const directFile = existingFile(pathname);
  if (directFile) return directFile;

  if (!path.extname(pathname)) {
    const cleanPath = pathname.replace(/\/+$/, '') || '/';
    const cleanFile = existingFile(`${cleanPath}.html`);
    if (cleanFile) return cleanFile;
    return existingFile(`${cleanPath}/index.html`);
  }

  return null;
}

function sendFile(req, res, filePath, statusCode = 200) {
  const extension = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[extension];
  if (!contentType) return false;

  let body;
  try {
    body = fs.readFileSync(filePath);
  } catch {
    return false;
  }

  const headers = commonHeaders(contentType);
  headers['Content-Length'] = String(body.length);
  res.writeHead(statusCode, headers);
  if (req.method === 'HEAD') res.end();
  else res.end(body);
  return true;
}

function sendNotFound(req, res) {
  const notFoundPage = path.join(ROOT, '404.html');
  if (!sendFile(req, res, notFoundPage, 404)) {
    const body = Buffer.from('Page not found');
    res.writeHead(404, {
      ...commonHeaders('text/plain; charset=utf-8'),
      'Content-Length': String(body.length)
    });
    res.end(req.method === 'HEAD' ? undefined : body);
  }
}

const server = http.createServer(async (req, res) => {
  let requestUrl;
  try {
    requestUrl = new URL(req.url, `http://${req.headers.host || `${HOST}:${PORT}`}`);
    requestUrl.pathname = decodeURIComponent(requestUrl.pathname);
  } catch {
    sendNotFound(req, res);
    return;
  }

  const { pathname, search } = requestUrl;

  if (pathname === '/api/submit') {
    try {
      await submitForm(req, res);
    } catch (error) {
      console.error('Local form handler error:', error);
      if (!res.headersSent) {
        res.writeHead(500, commonHeaders('application/json; charset=utf-8'));
      }
      if (!res.writableEnded) res.end(JSON.stringify({ error: 'The local form handler failed.' }));
    }
    return;
  }

  if (pathname === '/api/submit.js') {
    redirect(res, '/api/submit', search);
    return;
  }

  const redirectTarget = REDIRECTS.get(pathname);
  if (redirectTarget) {
    redirect(res, redirectTarget, search);
    return;
  }

  if (pathname !== '/' && pathname.endsWith('/')) {
    redirect(res, pathname.replace(/\/+$/, ''), search);
    return;
  }

  if (pathname.endsWith('.html') && !isBlocked(pathname) && existingFile(pathname)) {
    const cleanPath = pathname === '/index.html' ? '/' : pathname.slice(0, -5);
    redirect(res, cleanPath, search);
    return;
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, {
      ...commonHeaders('text/plain; charset=utf-8'),
      Allow: 'GET, HEAD'
    });
    res.end('Method not allowed');
    return;
  }

  const filePath = resolveStaticFile(pathname);
  if (!filePath || !sendFile(req, res, filePath)) sendNotFound(req, res);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Stop the existing preview and run npm run dev again.`);
  } else {
    console.error(error);
  }
  process.exitCode = 1;
});

server.listen(PORT, HOST, () => {
  console.log(`Visible Windows & Doors preview: http://${HOST}:${PORT}`);
  console.log('Clean URLs and /api/submit now match the Vercel route shape.');
});
