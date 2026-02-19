const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 5000;
const distDir = path.join(__dirname, '..', 'dist');

if (!fs.existsSync(distDir)) {
  console.error('dist directory not found — run `npm run build` first');
  process.exit(1);
}

const server = http.createServer((req, res) => {
  const safePath = req.url === '/' ? 'index.html' : req.url.replace(/\?.*$/, '').replace(/\/$/, '/index.html');
  const filePath = path.join(distDir, safePath);
  fs.readFile(filePath, (err, data) => {
    if (err) { res.statusCode = 404; res.end('404'); return; }
    res.end(data);
  });
});

server.listen(port, async () => {
  try {
    const status = await new Promise((resolve, reject) => {
      http.get({ hostname: '127.0.0.1', port, path: '/' }, (res) => resolve(res.statusCode)).on('error', reject);
    });

    if (status !== 200) {
      console.error('Smoke test failed — server returned', status);
      process.exitCode = 1;
    } else {
      const index = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
      if (!index.includes('./assets/')) {
        console.error('Smoke test failed — index.html does not contain relative ./assets/ references');
        process.exitCode = 1;
      } else {
        console.log('Smoke test passed — index served and relative assets present');
      }
    }
  } catch (err) {
    console.error('Smoke test error', err);
    process.exitCode = 1;
  } finally {
    server.close();
  }
});