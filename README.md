# pdf-to-book

A privacy-first, client-side web tool that converts PDF documents into clean, structured **Markdown (`.md`)** and formatted **Word (`.docx`)** files directly in your browser. All processing happens locally on your device—no files are uploaded, no servers are involved, and no AI services are required.

## What Problem It Solves

Extracting clean, readable text from PDFs is difficult because PDFs store positioned glyphs rather than document structure:

- **Broken reading order**: Standard copy-paste scrambles multi-column layouts.
- **Collapsed tables**: Tabular data turns into flat, unreadable lines of text.
- **Page noise**: Running headers, footers, and page numbers repeat throughout the document.
- **Fragmented paragraphs**: Hard line wraps and hyphenated words split sentences mid-word.
- **Privacy risks**: Online converters require uploading private or sensitive files to remote servers.

`pdf-to-book` solves these problems locally using deterministic spatial geometry heuristics—reconstructing columns, tables, headings, paragraphs, and a table of contents so reports, articles, and books become clean, editable documents.

## Features

- **100% Local Processing**: Every PDF is analyzed and exported entirely inside your browser; your documents never leave your device.
- **Batch PDF Support**: Drag and drop or select multiple PDF files at once, with real-time progress tracking and session statistics (documents, pages, processing time, and detected tables).
- **Automatic Page & Document Classification**: Identifies documents and individual pages as **Text**, **Table**, **Scan**, or **Mixed**. Scanned pages without a text layer are clearly flagged rather than silently dropped.
- **Multi-Column Reading Order (XY-Cut)**: Groups glyph coordinates into lines and segments columns spatially to preserve natural reading flow.
- **Table Extraction**: Recognizes both borderless tables (via horizontal whitespace gaps) and ruled tables (via PDF vector paths) and formats them as clean Markdown tables.
- **Book & Document Cleanup**:
  - Removes repeating running headers, footers, and standalone page numbers.
  - Rejoins hyphenated line breaks and merges wrapped lines into proper paragraphs.
  - Detects heading hierarchy from font size, weight, and chapter/section patterns.
  - Generates a cover section and clickable **Table of Contents** with heading anchors.
- **Source & Rendered Preview**: Switch between raw Markdown and formatted preview, or load a built-in demo document to test the workflow immediately.
- **Flexible Export**:
  - Copy Markdown to clipboard in one click.
  - Download clean `.md` files.
  - Export styled `.docx` files complete with headings, chapter page breaks, formatted tables, code blocks, quotes, lists, headers, and numbered footers.
- **Light & Dark Mode**: Responsive layout with persistent theme switching.

## Limitations

`pdf-to-book` is built for text-based and mixed PDFs. Image-only scanned pages are automatically detected and marked as scans, but built-in OCR is intentionally not included.