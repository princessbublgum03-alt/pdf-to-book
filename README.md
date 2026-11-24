<div align="center">

# pdf-to-book

**A privacy-first, client-side web tool that converts PDF documents into clean, structured Markdown and formatted Word files — directly in your browser.**

**All processing happens locally on your device. No files are uploaded, no servers are involved, no AI services are required.**

[Open the application](https://princessbublgum03-alt.github.io/pdf-to-book/)

![Local](https://img.shields.io/badge/100%25_local-blue) ![No servers](https://img.shields.io/badge/no_servers-green) ![No AI](https://img.shields.io/badge/no_AI-green)

</div>

---

## What Problem It Solves

Extracting clean, readable text from PDFs is difficult because PDFs store positioned glyphs rather than document structure:

- **Broken reading order** — standard copy-paste scrambles multi-column layouts.
- **Collapsed tables** — tabular data turns into flat, unreadable lines of text.
- **Page noise** — running headers, footers, and page numbers repeat throughout the document.
- **Fragmented paragraphs** — hard line wraps and hyphenated words split sentences mid-word.
- **Privacy risks** — online converters require uploading private or sensitive files to remote servers.

`pdf-to-book` solves these problems locally using deterministic spatial geometry heuristics — reconstructing columns, tables, headings, paragraphs, and a table of contents so reports, articles, and books become clean, editable documents.

## Features

### Privacy

- **100% local processing** — every PDF is analyzed and exported entirely inside your browser; your documents never leave your device.

### Extraction

- **Batch PDF support** — drag and drop or select multiple PDF files at once, with real-time progress tracking and session statistics (documents, pages, processing time, and detected tables).
- **Automatic page and document classification** — identifies documents and individual pages as *Text*, *Table*, *Scan*, or *Mixed*.
- **Built-in OCR for scanned pages** — recognizes image-only pages in the browser using Tesseract.js 7 and fast language data. Russian and English are supported, with a language selector and an on/off switch.
- **Multi-column reading order (XY-Cut)** — groups glyph coordinates into lines and segments columns spatially to preserve natural reading flow.
- **Table extraction** — recognizes both borderless tables (via horizontal whitespace gaps) and ruled tables (via PDF vector paths) and formats them as clean Markdown tables.

### Cleanup

- Removes repeating running headers, footers, and standalone page numbers.
- Rejoins hyphenated line breaks and merges wrapped lines into proper paragraphs.
- Detects heading hierarchy from font size, weight, and chapter/section patterns.
- Generates a cover section and a clickable table of contents with heading anchors.

### Export and Interface

- **Source and rendered preview** — switch between raw Markdown and formatted preview, or load a built-in demo document to test the workflow immediately.
- **Copy Markdown to clipboard** in one click.
- **Download clean `.md` files.**
- **Export styled `.docx` files** — complete with headings, chapter page breaks, formatted tables, code blocks, quotes, lists, headers, and numbered footers.
- **Light and dark mode** — responsive layout with persistent theme switching.
- **OCR controls** — enable or disable recognition and choose Russian, English, or both.

## Limitations

OCR runs locally in the browser and can take longer on high-resolution or large scanned PDFs. Recognition quality depends on scan clarity and selected languages. OCR is applied to pages without an extractable text layer; the original PDF is never uploaded.

## Links

- Application: [https://princessbublgum03-alt.github.io/pdf-to-book/](https://princessbublgum03-alt.github.io/pdf-to-book/)

---

<div align="center">

**[pdf-to-book](https://princessbublgum03-alt.github.io/pdf-to-book/)**

</div>
