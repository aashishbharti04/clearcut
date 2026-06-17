<div align="center">

# ✂️ ClearCut

### Remove image backgrounds instantly — free, private, in your browser.

A privacy-first background remover (a remove.bg-style tool) where the AI runs **100% on
the client** via WebAssembly. No server, no uploads, no API keys, no watermark.

<p>
  <img alt="Vanilla JS" src="https://img.shields.io/badge/Vanilla-JS-00E5FF?style=for-the-badge&logo=javascript&logoColor=white&labelColor=0D1117">
  <img alt="In-browser AI" src="https://img.shields.io/badge/AI-in--browser-FF2E97?style=for-the-badge&labelColor=0D1117">
  <img alt="Pages" src="https://img.shields.io/badge/GitHub-Pages%20ready-9D4EFF?style=for-the-badge&logo=github&logoColor=white&labelColor=0D1117">
  <img alt="License" src="https://img.shields.io/badge/License-MIT-00FFA3?style=for-the-badge&labelColor=0D1117">
</p>

</div>

---

## ✨ Features

- 🧠 **On-device AI** — background removal runs in the browser ([@imgly/background-removal](https://github.com/imgly/background-removal-js)); images never leave your device
- 🔒 **Private by design** — no upload, no account, no tracking
- 🖼️ **Drag & drop, browse, or paste** any image (PNG/JPG/WEBP)
- ⚡ **Transparent PNG** download in one click
- 🎨 Dark-neon UI, fully responsive, **zero build step**
- 🆓 Free & open-source — deploy your own on GitHub Pages

## 🚀 Use it

1. Click **`Use this template`** / fork.
2. **Settings → Pages → Source: GitHub Actions** — it deploys automatically.
3. Open your site, drop an image, download the cut-out. Done.

Prefer offline? Download the repo and open `index.html` (needs internet on first run to
fetch the AI model, which is then cached).

## 🧱 How it works

```
image → @imgly/background-removal (ONNX model via WASM, in-browser) → transparent PNG
```

- [`index.html`](index.html) — UI (dropzone, before/after, download)
- [`assets/js/app.js`](assets/js/app.js) — lazy-loads the model and runs removal
- [`assets/css/style.css`](assets/css/style.css) — dark-neon theme
- [`.github/workflows/pages.yml`](.github/workflows/pages.yml) — auto-deploy to Pages

The model (~tens of MB) downloads from a CDN on first use and is cached by the browser
afterward, so subsequent cuts are fast and work offline.

## ⚙️ Customize

- Swap the model/quality in `assets/js/app.js` (the `removeBackground` options).
- Re-theme via the CSS variables at the top of `style.css`.

## 📄 License

[MIT](LICENSE) © Aashish Bharti

<div align="center">
<sub>⭐ Star it if ClearCut saved you a trip to a paid background remover.</sub>
</div>
