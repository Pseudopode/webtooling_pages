export const tools = [
 ['compress-image','Image Compressor','Image','Reduce image size, keep the detail.','Shrink an image for your next upload. Everything happens on your device.','image'],
 ['word-counter','Word Counter','Text','Make every word count.','Instant word, character, sentence, and line counts as you write.','type'],
 ['clean-text','Clean Text','Text','A fresh start for messy text.','Tidy up copied text by removing extra spaces, tabs, and blank lines.','spark'],
 ['json-formatter','JSON Formatter','Data','Bring structure to your JSON.','Format, validate, and minify JSON with clear feedback.','code'],
 ['seo-slug-generator','SEO Slug Generator','SEO','A clean URL starts here.','Turn a title into a simple, readable URL slug.','link'],
 ['case-converter','Case Converter','Text','The right case, in one click.','Switch between sentence case, title case, lowercase, and UPPERCASE.','type'],
 ['remove-duplicate-lines','Remove Duplicate Lines','Text','Keep the list. Lose the repeats.','Remove repeated lines while keeping their original order.','layers'],
 ['sort-lines','Sort Lines','Text','Put your list in order.','Sort lines alphabetically, naturally, or by length.','sort'],
 ['base64-encode-decode','Base64 Encode/Decode','Data','A simple way to encode text.','Encode Unicode text as Base64 or decode it back to readable text.','code'],
 ['url-encode-decode','URL Encode/Decode','Data','Make text ready for a URL.','Encode a URL component or decode percent-encoded text.','link'],
 ['timestamp-converter','Timestamp Converter','Utility','A moment, made readable.','Convert Unix seconds or milliseconds to dates, and dates back to timestamps.','clock'],
 ['password-generator','Password Generator','Utility','A stronger password starts here.','Create random passwords with the length and characters you choose.','key'],
 ['pdf-to-jpg','PDF to JPG','Image','Your scan, back as a JPG.','Recover images from a scanned PDF and download JPG files within your size limit.','image'],
 ['batch-image-compressor','Batch Image Compressor','Image','A lighter batch. A faster workflow.','Compress multiple images locally and download them together as a ZIP.','layers']
].map(([slug,name,category,headline,description,icon])=>({slug,name,category,headline,description,icon}));
