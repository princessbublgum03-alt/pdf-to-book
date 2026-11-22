# pdf-to-book (PDF → Markdown · Local Parser)

A privacy-first, 100% client-side web application that converts PDF documents into clean, structured **Markdown (`.md`)** and formatted **Word (`.docx`)** files directly in the browser. Files are processed locally on your device—nothing is uploaded to a server, and no external AI services are used.

## Why This Project Exists & What Problem It Solves

Extracting readable content from PDFs is notoriously messy:
- Naive copy-paste and basic text extractors scramble **multi-column reading order**.
- **Tables** collapse into unreadable single-line fragments.
- **Running headers, footers, and page numbers** repeat throughout the extracted text.
- **Line wraps and hyphenated words** break paragraphs into awkward fragments.
- Most online PDF converters require **uploading private or sensitive files** to third-party servers.

`pdf-to-book` solves these issues completely inside the browser using **PDF.js** and deterministic **spatial geometry heuristics** (XY-Cut layout segmentation, table detection, heading inference, and book-structure post-processing) so you can turn digital PDFs, reports, and books into structured Markdown or DOCX documents privately and instantaneously.

## Key Features

- **100% Local & Private Processing**: All parsing, structuring, and file export run client-side in your browser with zero server uploads.
- **Multi-Document Drag-and-Drop**: Upload and process multiple PDFs in one session with live progress bars and summary metrics (document count, pages processed, elapsed time in ms, and detected tables).
- **Document & Page Classification**: Samples pages and classifies both documents and individual pages as **Text**, **Table**, **Scan**, or **Mixed**. Scanned pages without an embedded text layer are explicitly flagged so you know when external OCR is required (no built-in OCR is executed).
- **Spatial Column & Reading-Order Recovery**: Reconstructs text lines from PDF glyph coordinates and uses **XY-Cut** whitespace column splitting to keep multi-column layouts in natural reading order.
- **Heuristic Table Extraction**: Detects both borderless tables (via horizontal gap analysis) and ruled tables (via PDF vector path operators), converting them into GitHub-Flavored Markdown tables.
- **Automatic Book & Document Structuring**:
  - Strips repeating running headers, footers, and standalone page numbers.
  - Rejoins hyphenated line breaks and merges wrapped lines into coherent paragraphs.
  - Detects headings by font size, bold styling, and chapter/section patterns.
  - Generates a cover header and clickable **Table of Contents** with anchor slugs.
- **Markdown Source & Rendered Preview**: Switch between raw Markdown and formatted HTML preview, or load the built-in **Demo Structure** to explore the interface immediately.
- **Export Options**:
  - **Copy Markdown** directly to the clipboard.
  - **Download `.md`** with clean Markdown formatting.
  - **Export `.docx`** locally (via `docx`) with headings, chapter page breaks, formatted tables, code blocks, blockquotes, lists, headers, and numbered footers.
- **Light & Dark Theme**: Responsive desktop/mobile interface with saved theme preference.

## Quick Start (Local Development)

Requires Node.js 22+.

```bash
npm install
npm run dev      # Start local Express server on http://localhost:3000
npm run build    # Build static web bundle into ./dist
npm run lint     # Syntax-check server and build scripts
npm test         # Run unit tests for server and static build
```

## Deploying to GitHub Pages

The repository includes an automated GitHub Actions YAML workflow (`.github/workflows/deploy.yml`) that installs dependencies, runs lint and unit tests, builds the static bundle into `./dist` (`index.html`, `404.html`, `.nojekyll`), and deploys it to **GitHub Pages**.

To enable live hosting on GitHub:
1. Push the repository to the `main` (or `master`) branch on GitHub.
2. Go to **Settings → Pages** in your GitHub repository.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Trigger a push or run **Actions → Deploy Web Site to GitHub Pages → Run workflow**. Your site will be published at `https://<your-username>.github.io/<repository-name>/`.

## Tech Stack

- **Browser Engine**: Vanilla HTML/CSS/ES Modules + [PDF.js](https://mozilla.github.io/pdf.js/) + [`docx`](https://docx.js.org/)
- **Local Dev Server**: Node.js + Express (`server.js`)
- **Static Build & CI/CD**: Node.js build script (`scripts/build.mjs`) + GitHub Actions (`deploy.yml`)

## Limitations

- Designed for **text-based and mixed PDFs**. Image-only scans are detected and labeled as scans, but optical character recognition (OCR) is intentionally not included.