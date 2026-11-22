import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEFAULT_ROOT = path.resolve(__dirname, '..');

export async function buildStaticSite({
  rootDir = DEFAULT_ROOT,
  outDir = path.join(DEFAULT_ROOT, 'dist'),
} = {}) {
  const sourceHtmlPath = path.join(rootDir, 'index.html');
  const html = await fs.readFile(sourceHtmlPath, 'utf8');

  await fs.rm(outDir, { recursive: true, force: true });
  await fs.mkdir(outDir, { recursive: true });

  const outIndex = path.join(outDir, 'index.html');
  const out404 = path.join(outDir, '404.html');
  const outNoJekyll = path.join(outDir, '.nojekyll');

  await Promise.all([
    fs.writeFile(outIndex, html, 'utf8'),
    fs.writeFile(out404, html, 'utf8'),
    fs.writeFile(outNoJekyll, '', 'utf8'),
  ]);

  return {
    outDir,
    files: ['index.html', '404.html', '.nojekyll'],
    bytes: Buffer.byteLength(html, 'utf8'),
  };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === __filename;

if (isMain) {
  const result = await buildStaticSite();
  console.log(
    `Static web build complete -> ${result.outDir} (${result.files.join(', ')}, ${result.bytes} bytes)`
  );
}
