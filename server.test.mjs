import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { createApp } from './server.js';

function startTestServer() {
  return new Promise((resolve) => {
    const server = http.createServer(createApp());
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      resolve({ server, baseUrl: `http://127.0.0.1:${address.port}` });
    });
  });
}

test('GET / serves index.html with 200 status and app title', async () => {
  const { server, baseUrl } = await startTestServer();
  try {
    const res = await fetch(`${baseUrl}/`);
    assert.equal(res.status, 200);
    assert.match(res.headers.get('content-type') || '', /text\/html/);
    const html = await res.text();
    assert.match(html, /PDF to Book · Lightweight PDF Studio/);
  } finally {
    server.close();
  }
});

test('GET /server.js and /package.json are not exposed', async () => {
  const { server, baseUrl } = await startTestServer();
  try {
    const serverRes = await fetch(`${baseUrl}/server.js`);
    assert.equal(serverRes.status, 404);
    const pkgRes = await fetch(`${baseUrl}/package.json`);
    assert.equal(pkgRes.status, 404);
  } finally {
    server.close();
  }
});

test('GET /favicon.ico returns 204', async () => {
  const { server, baseUrl } = await startTestServer();
  try {
    const res = await fetch(`${baseUrl}/favicon.ico`);
    assert.equal(res.status, 204);
  } finally {
    server.close();
  }
});
