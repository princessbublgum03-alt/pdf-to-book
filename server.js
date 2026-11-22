import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const INDEX_HTML = path.join(__dirname, 'index.html');

export function createApp() {
  const app = express();
  app.disable('x-powered-by');

  app.get('/favicon.ico', (_req, res) => {
    res.status(204).end();
  });

  app.get(['/', '/index.html'], (_req, res) => {
    res.sendFile(INDEX_HTML);
  });

  app.use((_req, res) => {
    res.status(404).type('text/plain').send('Not Found');
  });

  return app;
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === __filename;

if (isMain) {
  const port = Number(process.env.PORT) || 3000;
  const host = '0.0.0.0';
  const app = createApp();
  app.listen(port, host, () => {
    console.log(`Server listening on http://${host}:${port}`);
  });
}
