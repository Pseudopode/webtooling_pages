# QuickTiny standalone tools

Fourteen independent browser tools with a warm ivory, sand, and terracotta light theme. Every HTML file contains its own CSS and JavaScript and runs offline, with no server, account, or upload.

Open `dist/index.html` to browse the toolkit, or open any tool HTML file directly. Keep sibling files together to use the navigation. The English and Français buttons include small flags, translate the whole interface, and preserve current inputs and results. The selected language follows navigation and is remembered locally when the browser permits it; file contents and text are not stored.

## Tools

| File | Tool |
| --- | --- |
| `compress-image.html` | Image Compressor |
| `word-counter.html` | Word Counter |
| `clean-text.html` | Clean Text |
| `json-formatter.html` | JSON Formatter |
| `seo-slug-generator.html` | SEO Slug Generator |
| `case-converter.html` | Case Converter |
| `remove-duplicate-lines.html` | Remove Duplicate Lines |
| `sort-lines.html` | Sort Lines |
| `base64-encode-decode.html` | Base64 Encode/Decode |
| `url-encode-decode.html` | URL Encode/Decode |
| `timestamp-converter.html` | Timestamp Converter |
| `password-generator.html` | Password Generator |
| `batch-image-compressor.html` | Batch Image Compressor |
| `pdf-to-jpg.html` | PDF to JPG |

## Scanned PDF to JPG

Choose the PDF exported by Windows Scan, a printer, or another scanning app. Specify the maximum size **per JPG** in decimal KB or MB; 500 KB means 500,000 bytes.

- **Extract embedded JPG images** retrieves the original JPEG bytes from the PDF, including images in nested forms and compressed PDF object streams. An image used on several pages is listed once with its page numbers. If the original image fits the limit, it is preserved exactly. Larger images are re-encoded, with dimensions reduced when necessary. Every downloadable JPG is checked against the requested byte limit.
- **Convert whole PDF pages to JPG** renders pages locally for scans stored in other image formats, or when rotation, margins, and annotations should be included.
- Download images individually or together in a ZIP. The size limit applies to each JPG; the ZIP may be larger.
- Small limits can reduce resolution and fine text detail. Password-protected PDFs must be unlocked before use. No OCR is performed.

PDF parsing and rendering libraries are embedded into this HTML file. They require no CDN or runtime download. Vendor versions and source archives are recorded in `vendor/manifest.json`; licenses are included in the HTML and the downloadable ZIP. The larger size of the PDF tool reflects these embedded libraries.

## Other behaviors

Image tools support JPG, PNG, and WebP, adjustable output format, quality, and proportional downscaling. JPG uses white for transparent pixels; the PNG quality slider is disabled because its output is lossless. Batch compression is included without a payment system.

Base64 supports UTF-8, including emoji. URL encoding treats input as one URL component. Timestamps use explicit seconds or milliseconds and UTC date input. Passwords use Web Crypto randomness, guarantee each selected character type, and optionally exclude look-alike characters.

## Build and check

Use Node 20 or newer. `node build.mjs` regenerates all 15 self-contained HTML files in `dist/`; the build itself requires no installed dependencies. Vendored libraries are already included.

For tests, install the declared development dependencies with `npm install`, then run `npm test`. Tests cover self-contained output, existing conversions, bilingual interface behavior, preservation of user data, PDF extraction, actual JPEG encoding under byte limits, and PDF interface download blobs. Test PDF fixtures are generated locally and ignored by Git.

`npm run package` rebuilds the ZIP at `../quicktiny-standalone-tools.zip`. `node tests/delivery.mjs` verifies its contents against the current HTML files.

For an optional local HTTP preview run `npm start`, then open `http://localhost:4173`. Opening individual HTML files directly also works.

Real-browser verification is available with `npm run test:update-browser` after installing Chromium (`npx playwright-core install chromium`), or setting `QUICKTINY_BROWSER` to an installed browser executable. It covers both PDF conversion modes, JPEG downloads within the size limit, language controls, and desktop/tablet/phone layouts.

## Verification limits in the build environment

Structural, algorithm, bilingual DOM, PDF extraction, JPEG byte-limit, interface, and archive checks pass. Chromium process startup is denied by the current macOS sandbox, so actual browser screenshots, visual layout, and whole-page PDF rendering have not been verified here. The PDF image extraction and recompression workflow is exercised using real PDF and JPEG fixtures and a native image encoder.
