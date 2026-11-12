# Media implementation and bundled assets

The application code is authored for this project. Recognition engines and pretrained models are bundled so user media and recognized text never need to leave the browser.

- Transformers.js 3.8.1, Apache-2.0: https://github.com/huggingface/transformers.js and https://huggingface.co/docs/transformers.js/en/custom_usage
- ONNX Runtime Web bundled with Transformers.js, MIT: https://github.com/microsoft/onnxruntime
- Quantized multilingual Whisper Tiny ONNX encoder/merged decoder and tokenizer/configuration from Xenova/whisper-tiny, Apache-2.0 model-card license: https://huggingface.co/Xenova/whisper-tiny
- Original Whisper model, MIT: https://github.com/openai/whisper
- Tesseract.js 6.0.1 and Tesseract.js-core 6.0.0, Apache-2.0: https://github.com/naptha/tesseract.js
- English, French and Arabic fast trained data, Apache-2.0: https://github.com/tesseract-ocr/tessdata_fast
- PDF parsing, generation and rendering reuse the existing bundled PDF-LIB and PDF.js versions and licenses in vendor/.

Browser speech inference uses a module Worker, a custom cache backed exclusively by embedded Blob URLs, and one WASM thread. Remote model downloads are disabled. OCR worker/core and trained data are also supplied from embedded assets; persistent OCR caching is disabled.

The small acceptance-test speech fixture is seven seconds of John F. Kennedy's inaugural address, a US-government public-domain speech. It is mono 16 kHz Float32, resampled from the public Transformers.js documentation sample at https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/jfk.wav . It is used only in tests, not embedded in the tool.

AI Clip Maker can run the same bundled Whisper model to recognize words, align cut boundaries, and burn timed captions into exported clips. Candidate-window ranking uses audio energy and activity; it does not claim a cloud language model or semantic face tracking. Export previews and editable cut ranges let users inspect every suggested cut.

Media exports use the browser's actual MediaRecorder encoder and retain the correct MIME type/file extension. MP4 is used when available; WebM is the fallback. Rendering occurs in real time and supports cancellation. Keep the tab active during an export.
