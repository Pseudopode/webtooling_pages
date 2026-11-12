Repo of all the tooling pages I'm creating.

## QuickTiny tools

Fourteen independent, offline HTML tools are in [tools/quicktiny](tools/quicktiny/index.html), including PDF-to-JPG extraction with a maximum JPG file size. Every page has a warm light theme and English/French buttons with flags. The main catalog lists each tool individually.

- [PDF to JPG](tools/quicktiny/pdf-to-jpg.html): retrieve embedded original JPGs, recompress to a byte limit, or convert whole pages.
- [Download all 14 standalone pages](downloads/quicktiny-standalone-tools.zip).
- [Editable source and test instructions](sources/quicktiny/README.md).

These are static pages: open the HTML files directly or serve the repository with any static host. No accounts, API keys, runtime dependencies, or uploads are needed. Keep the HTML files together for sidebar navigation.

To rebuild: run `node build.mjs` in `sources/quicktiny`, then copy its generated `dist/*.html` into `tools/quicktiny/`. The archive can be regenerated with `npm run package` and copied from `sources/quicktiny-standalone-tools.zip` into `downloads/`.
