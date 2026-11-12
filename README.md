Repo of all the tooling pages I'm creating.

## Complete QuickTiny collection

All **57 tools from the reference screenshots**, plus the custom PDF-to-JPG tool, are available as **58 independent HTML pages** in [tools/quicktiny](tools/quicktiny/index.html). Every page uses a warm light theme and English/French controls with small flags. The main catalog lists every tool individually and now contains 71 tools.

- [Open the complete collection](tools/quicktiny/index.html)
- [Download all 58 standalone pages](downloads/quicktiny-standalone-tools.zip)
- [Editable source, inventory, behavior and test instructions](sources/quicktiny/README.md)
- [Screenshot inventory](sources/quicktiny/SCREENSHOT-TOOLS.json)

The HTML files include their required scripts and assets; there are no runtime CDN dependencies or uploads. OCR, automatic subtitles, and AI-assisted clip captions include their recognition engines/models and are therefore larger. Device/codec support depends on the browser.

Build in `sources/quicktiny` with `node build.mjs`; copy generated `dist/*.html` into `tools/quicktiny/`. Run `npm run package` to create `sources/quicktiny-standalone-tools.zip`, then copy it to `downloads/`. For tests install development dependencies and run `npm test`.

All earlier tools outside the QuickTiny collection remain unchanged. Actual browser recording/hardware checks remain unverified in the current sandbox; standalone DOM, pure algorithms, native raster, OCR and speech inference checks pass.
