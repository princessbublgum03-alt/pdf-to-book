import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { buildStaticSite } from './scripts/build.mjs';

test('buildStaticSite generates dist/index.html, 404.html, and .nojekyll', async () => {
  const tempOut = await fs.mkdtemp(path.join(os.tmpdir(), 'pdf-to-book-dist-'));
  try {
    const result = await buildStaticSite({ outDir: tempOut });
    assert.deepEqual(result.files, ['index.html', '404.html', '.nojekyll']);
    assert.ok(result.bytes > 1000);

    const [indexHtml, notFoundHtml, noJekyll] = await Promise.all([
      fs.readFile(path.join(tempOut, 'index.html'), 'utf8'),
      fs.readFile(path.join(tempOut, '404.html'), 'utf8'),
      fs.readFile(path.join(tempOut, '.nojekyll'), 'utf8'),
    ]);

    assert.match(indexHtml, /PDF to Book · Lightweight PDF Studio/);
    assert.equal(notFoundHtml, indexHtml);
    assert.equal(noJekyll, '');
  } finally {
    await fs.rm(tempOut, { recursive: true, force: true });
  }
});

test('GitHub Pages YAML workflow is configured for dist build and deploy', async () => {
  const yml = await fs.readFile(path.join(process.cwd(), '.github/workflows/deploy.yml'), 'utf8');
  assert.match(yml, /npm run build/);
  assert.match(yml, /actions\/upload-pages-artifact@v3/);
  assert.match(yml, /path:\s*\.\/dist/);
  assert.match(yml, /actions\/deploy-pages@v4/);
  assert.match(yml, /pages:\s*write/);
});


test('mobile processing keeps PDF operator lists out of the sample cache and caps OCR raster size', async () => {
  const html = await fs.readFile(path.join(process.cwd(), 'index.html'), 'utf8');
  assert.match(html, /sampleCache\.set\(n,\{content\}\)/);
  assert.match(html, /pixelBudget=mobile\?1100000:2000000/);
  assert.match(html, /finally\{canvas\.width=0;canvas\.height=0;\}/);
  assert.match(html, /prefers-reduced-motion:reduce/);
});
