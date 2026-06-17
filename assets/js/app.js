/* ClearCut — in-browser background removal + replacement. No server, no upload.
 * Uses @imgly/background-removal (ONNX/WASM) loaded lazily from a CDN. */

/* ============================================================================
 *  YOUR SOCIAL LINKS — fill in your handles/URLs (leave "" to hide an icon).
 * ========================================================================== */
const SOCIALS = {
  github: "https://github.com/aashishbharti04",
  linkedin: "https://www.linkedin.com/in/aashana1012",
  twitter: "",       // e.g. "https://x.com/your-handle"
  instagram: "https://www.instagram.com/asurwave1012",
  youtube: "https://www.youtube.com/@CodeWithAsur",
  website: "",       // e.g. "https://yoursite.com"
  email: "corerankdigital@gmail.com",
};

const ICONS = {
  github: '<path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.75.4-1.27.73-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 5.83 0c2.22-1.5 3.2-1.18 3.2-1.18.63 1.59.23 2.75.11 3.05.75.81 1.2 1.84 1.2 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z"/>',
  linkedin: '<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/>',
  twitter: '<path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93Zm-1.29 19.5h2.04L6.48 3.24H4.3l13.31 17.41Z"/>',
  instagram: '<path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.38C1.35 2.67.94 3.34.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.8.72 1.47 1.38 2.13.66.66 1.33 1.07 2.12 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.12A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-10.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z"/>',
  youtube: '<path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z"/>',
  website: '<path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm7.94 7h-3.38a15.6 15.6 0 0 0-1.34-3.46A8.03 8.03 0 0 1 19.94 7ZM12 2.04c.83 1.2 1.48 2.54 1.91 3.96h-3.82c.43-1.42 1.08-2.76 1.91-3.96ZM2.26 14a7.97 7.97 0 0 1 0-4h3.87a16.5 16.5 0 0 0 0 4H2.26Zm.8 2h3.38c.34 1.25.8 2.42 1.34 3.46A8.03 8.03 0 0 1 3.06 16Zm3.38-8H3.06a8.03 8.03 0 0 1 4.72-3.46A15.6 15.6 0 0 0 6.44 8ZM12 21.96c-.83-1.2-1.48-2.54-1.91-3.96h3.82A14.6 14.6 0 0 1 12 21.96ZM14.34 16H9.66a14.5 14.5 0 0 1 0-4h4.68a14.5 14.5 0 0 1 0 4Zm.32 3.46c.54-1.04 1-2.21 1.34-3.46h3.38a8.03 8.03 0 0 1-4.72 3.46ZM17.87 14a16.5 16.5 0 0 0 0-4h3.87a7.97 7.97 0 0 1 0 4h-3.87Z"/>',
  email: '<path d="M22 4H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4.24-10 6.25L2 8.24V6l10 6.25L22 6v2.24Z"/>',
};

function renderSocials() {
  const box = document.getElementById("socials");
  if (!box) return;
  const html = Object.entries(SOCIALS)
    .filter(([, url]) => url)
    .map(([name, url]) => {
      const href = name === "email" ? `mailto:${url}` : url;
      return `<a class="social" href="${href}" target="_blank" rel="noopener" aria-label="${name}" title="${name}">`
        + `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">${ICONS[name] || ""}</svg></a>`;
    })
    .join("");
  box.innerHTML = html;
}

/* ========================================================================== */
const $ = (id) => document.getElementById(id);

const dropzone = $("dropzone");
const fileInput = $("file-input");
const workspace = $("workspace");
const originalImg = $("original-img");
const canvas = $("result-canvas");
const loader = $("loader");
const loaderText = $("loader-text");
const progressBar = $("progress-bar");
const downloadBtn = $("download-btn");
const errorMsg = $("error-msg");
const bgControls = $("bg-controls");

const SAMPLE_URL =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80";
const PRESETS = ["#00e5ff", "#ff2e97", "#00ffa3", "#9d4eff", "#ffffff", "#000000", "#ff6b35"];

const state = {
  mode: "bg",           // "bg" | "object"
  sourceFile: null,
  originalImg: null,
  bgDone: false,
  cutoutImg: null,      // pristine result (for reset)
  cutoutCanvas: null,   // mutable copy we erase into
  bgType: "transparent", bgColor: "#00e5ff", bgImage: null, format: "png",
  eraseMode: false, brush: 28, erasing: false,
  // object remover
  objWorking: null, objMask: null, objBrush: 36, objPainting: false,
};
let _removeBackground = null;

async function getRemover() {
  if (_removeBackground) return _removeBackground;
  loaderText.textContent = "Loading AI model… (first time only)";
  const mod = await import("https://esm.sh/@imgly/background-removal@1");
  _removeBackground = mod.removeBackground;
  return _removeBackground;
}

function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.hidden = false;
  loader.hidden = true;
}

function resetUI() {
  workspace.hidden = true;
  canvas.hidden = true;
  downloadBtn.hidden = true;
  bgControls.hidden = true;
  errorMsg.hidden = true;
  loader.hidden = false;
  progressBar.style.width = "0%";
  fileInput.value = "";
  state.cutoutImg = null;
  state.cutoutCanvas = null;
  state.bgType = "transparent";
  state.bgImage = null;
  setEraseMode(false);
}

// ---- compositing ----------------------------------------------------------
function drawCover(ctx, img, w, h) {
  const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
  const dw = img.naturalWidth * scale, dh = img.naturalHeight * scale;
  ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
}

function paint(ctx, w, h, opaqueFallback) {
  if (state.bgType === "color") {
    ctx.fillStyle = state.bgColor; ctx.fillRect(0, 0, w, h);
  } else if (state.bgType === "image" && state.bgImage) {
    drawCover(ctx, state.bgImage, w, h);
  } else if (opaqueFallback) {
    ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, w, h);
  }
  ctx.drawImage(state.cutoutCanvas, 0, 0, w, h);
}

function render() {
  if (!state.cutoutCanvas) return;
  const w = state.cutoutCanvas.width, h = state.cutoutCanvas.height;
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, w, h);
  paint(ctx, w, h, false);
  canvas.hidden = false;
  updateDownload();
}

function updateDownload() {
  const w = state.cutoutCanvas.width, h = state.cutoutCanvas.height;
  const ex = document.createElement("canvas");
  ex.width = w; ex.height = h;
  const isJpg = state.format === "jpg";
  paint(ex.getContext("2d"), w, h, isJpg); // jpg can't be transparent → white fallback
  const mime = isJpg ? "image/jpeg" : "image/png";
  ex.toBlob((blob) => {
    if (!blob) return;
    downloadBtn.href = URL.createObjectURL(blob);
    downloadBtn.download = `clearcut.${isJpg ? "jpg" : "png"}`;
    downloadBtn.hidden = false;
  }, mime, 0.92);
}

// ---- pipeline -------------------------------------------------------------
async function processImage(source) {
  errorMsg.hidden = true;
  workspace.hidden = false;
  canvas.hidden = true;
  downloadBtn.hidden = true;
  bgControls.hidden = true;
  loader.hidden = false;
  progressBar.style.width = "0%";
  originalImg.src = typeof source === "string" ? source : URL.createObjectURL(source);

  try {
    const removeBackground = await getRemover();
    loaderText.textContent = "Removing background…";
    const blob = await removeBackground(source, {
      model: "isnet_fp16", // smaller + faster than the default full model
      progress: (key, current, total) => {
        if (key && key.includes("fetch")) {
          const pct = total ? Math.round((current / total) * 100) : 0;
          progressBar.style.width = pct + "%";
          loaderText.textContent = `Downloading model… ${pct}% (first time only)`;
        } else {
          // download done — now the CPU does the actual cut-out
          progressBar.style.width = "100%";
          loaderText.textContent = "Removing background… (a few seconds)";
        }
      },
      output: { format: "image/png" },
    });

    const img = new Image();
    img.onload = () => {
      state.cutoutImg = img;
      const cc = document.createElement("canvas");
      cc.width = img.naturalWidth; cc.height = img.naturalHeight;
      cc.getContext("2d").drawImage(img, 0, 0);
      state.cutoutCanvas = cc;
      state.bgDone = true;
      loader.hidden = true;
      bgControls.hidden = false;
      setEraseMode(false);
      render();
    };
    img.src = URL.createObjectURL(blob);
  } catch (err) {
    console.error(err);
    showError(
      "Couldn't remove the background. The AI model needs an internet connection " +
      "on first use and a modern browser. Details: " + (err && err.message ? err.message : err)
    );
  }
}

function handleFile(file) {
  if (!file || !file.type.startsWith("image/")) {
    workspace.hidden = false;
    showError("Please choose an image file (PNG, JPG, or WEBP).");
    return;
  }
  onImage(file);
}

// Load the original once, then run whichever tool is selected.
function onImage(source) {
  state.sourceFile = source;
  state.bgDone = false;
  state.objWorking = null;
  workspace.hidden = false;
  errorMsg.hidden = true;
  const img = new Image();
  img.onload = () => { state.originalImg = img; dispatchMode(); };
  img.onerror = () => showError("Couldn't load that image.");
  img.src = typeof source === "string" ? source : URL.createObjectURL(source);
}

function dispatchMode() {
  if (state.mode === "bg") {
    showModeUI("bg");
    if (!state.bgDone) processImage(state.sourceFile);
  } else {
    showModeUI("object");
    setupObject();
  }
}

function showModeUI(mode) {
  document.getElementById("bg-ui").hidden = mode !== "bg";
  document.getElementById("object-ui").hidden = mode !== "object";
  document.getElementById("tab-bg").classList.toggle("active", mode === "bg");
  document.getElementById("tab-object").classList.toggle("active", mode === "object");
}

// ---- background controls --------------------------------------------------
function initControls() {
  // preset swatches
  const sw = $("swatches");
  sw.innerHTML = PRESETS.map(
    (c) => `<button class="swatch" data-color="${c}" style="background:${c}" aria-label="${c}"></button>`
  ).join("");
  sw.addEventListener("click", (e) => {
    const c = e.target.getAttribute("data-color");
    if (!c) return;
    state.bgColor = c; $("bg-color").value = c; state.bgType = "color";
    setActiveChip("color"); $("color-row").hidden = false; render();
  });

  document.querySelectorAll(".chip[data-bg]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const type = btn.getAttribute("data-bg");
      setActiveChip(type);
      $("color-row").hidden = type !== "color";
      if (type === "image") { $("bg-image-input").click(); return; }
      state.bgType = type;
      render();
    }));

  $("bg-color").addEventListener("input", (e) => {
    state.bgColor = e.target.value; state.bgType = "color"; setActiveChip("color"); render();
  });

  $("bg-image-input").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const img = new Image();
    img.onload = () => { state.bgImage = img; state.bgType = "image"; setActiveChip("image"); render(); };
    img.src = URL.createObjectURL(file);
  });

  $("bg-format").addEventListener("change", (e) => { state.format = e.target.value; updateDownload(); });

  // --- eraser ---
  $("erase-toggle").addEventListener("click", () => setEraseMode(!state.eraseMode));
  $("brush-size").addEventListener("input", (e) => { state.brush = Number(e.target.value); });
  $("undo-erase").addEventListener("click", () => {
    if (!state.cutoutImg || !state.cutoutCanvas) return;
    const ctx = state.cutoutCanvas.getContext("2d");
    ctx.clearRect(0, 0, state.cutoutCanvas.width, state.cutoutCanvas.height);
    ctx.drawImage(state.cutoutImg, 0, 0);
    render();
  });

  // pointer painting on the visible canvas
  const start = (e) => { if (state.eraseMode) { state.erasing = true; eraseAt(e); } };
  const move = (e) => { if (state.eraseMode && state.erasing) { e.preventDefault(); eraseAt(e); } };
  const end = () => { state.erasing = false; };
  canvas.addEventListener("pointerdown", start);
  canvas.addEventListener("pointermove", move);
  window.addEventListener("pointerup", end);
}

function setEraseMode(on) {
  state.eraseMode = on;
  state.erasing = false;
  const btn = $("erase-toggle");
  if (btn) { btn.classList.toggle("active", on); btn.setAttribute("aria-pressed", String(on)); }
  canvas.classList.toggle("erasing", on);
}

function eraseAt(e) {
  const cc = state.cutoutCanvas;
  if (!cc) return;
  const rect = canvas.getBoundingClientRect();
  const sx = cc.width / rect.width, sy = cc.height / rect.height;
  const x = (e.clientX - rect.left) * sx;
  const y = (e.clientY - rect.top) * sy;
  const r = (state.brush / 2) * sx; // brush is in display px → canvas px
  const ctx = cc.getContext("2d");
  ctx.save();
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  render();
}

function setActiveChip(type) {
  document.querySelectorAll(".chip[data-bg]").forEach((b) =>
    b.classList.toggle("active", b.getAttribute("data-bg") === type));
}

// ---- input wiring ---------------------------------------------------------
$("browse-btn").addEventListener("click", (e) => { e.stopPropagation(); fileInput.click(); });
dropzone.addEventListener("click", () => fileInput.click());
dropzone.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fileInput.click(); }
});
fileInput.addEventListener("change", (e) => handleFile(e.target.files[0]));

["dragenter", "dragover"].forEach((evt) =>
  dropzone.addEventListener(evt, (e) => { e.preventDefault(); dropzone.classList.add("drag"); }));
["dragleave", "drop"].forEach((evt) =>
  dropzone.addEventListener(evt, (e) => { e.preventDefault(); dropzone.classList.remove("drag"); }));
dropzone.addEventListener("drop", (e) => {
  if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
});

window.addEventListener("paste", (e) => {
  const item = [...(e.clipboardData?.items || [])].find((i) => i.type.startsWith("image/"));
  if (item) handleFile(item.getAsFile());
});

$("sample-btn").addEventListener("click", async (e) => {
  e.stopPropagation();
  try {
    const resp = await fetch(SAMPLE_URL);
    onImage(await resp.blob());
  } catch (_) {
    onImage(SAMPLE_URL);
  }
});

$("reset-btn").addEventListener("click", resetUI);
$("obj-try-another").addEventListener("click", resetUI);

// ---- mode tabs ------------------------------------------------------------
$("tab-bg").addEventListener("click", () => { state.mode = "bg"; if (state.originalImg) dispatchMode(); else showModeUI("bg"); });
$("tab-object").addEventListener("click", () => { state.mode = "object"; if (state.originalImg) dispatchMode(); else showModeUI("object"); });

// ---- object remover (inpainting) -----------------------------------------
const editCanvas = $("edit-canvas");

function setupObject() {
  if (!state.originalImg) return;
  const w = state.originalImg.naturalWidth, h = state.originalImg.naturalHeight;
  // working copy (so removals stack), and a mask layer
  const wc = document.createElement("canvas"); wc.width = w; wc.height = h;
  wc.getContext("2d").drawImage(state.originalImg, 0, 0);
  state.objWorking = wc;
  const mc = document.createElement("canvas"); mc.width = w; mc.height = h;
  state.objMask = mc;
  $("obj-download").hidden = true;
  renderObject();
}

function renderObject() {
  if (!state.objWorking) return;
  const w = state.objWorking.width, h = state.objWorking.height;
  editCanvas.width = w; editCanvas.height = h;
  const ctx = editCanvas.getContext("2d");
  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(state.objWorking, 0, 0);
  ctx.save(); ctx.globalAlpha = 0.45; ctx.drawImage(state.objMask, 0, 0); ctx.restore();
}

function paintMaskAt(e) {
  const mc = state.objMask; if (!mc) return;
  const rect = editCanvas.getBoundingClientRect();
  const sx = mc.width / rect.width, sy = mc.height / rect.height;
  const x = (e.clientX - rect.left) * sx, y = (e.clientY - rect.top) * sy;
  const r = (state.objBrush / 2) * sx;
  const ctx = mc.getContext("2d");
  ctx.fillStyle = "#ff2e97";
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  renderObject();
}

function removeObject() {
  if (!state.objWorking || !state.objMask) return;
  const w = state.objWorking.width, h = state.objWorking.height;
  const maskData = state.objMask.getContext("2d").getImageData(0, 0, w, h).data;
  const mask = new Uint8Array(w * h);
  let any = false;
  for (let i = 0; i < w * h; i++) { if (maskData[i * 4 + 3] > 10) { mask[i] = 1; any = true; } }
  if (!any) { showError("Paint over the object you want to remove first."); return; }
  errorMsg.hidden = true;
  $("obj-loader").hidden = false;
  // let the spinner paint before the (sync) heavy work
  setTimeout(() => {
    inpaint(state.objWorking, mask, w, h);
    state.objMask.getContext("2d").clearRect(0, 0, w, h);
    renderObject();
    $("obj-loader").hidden = true;
    state.objWorking.toBlob((b) => {
      if (b) { $("obj-download").href = URL.createObjectURL(b); $("obj-download").hidden = false; }
    }, "image/png");
  }, 30);
}

// Content-aware fill: BFS fill from the hole boundary inward, then smooth.
function inpaint(canvas, mask, w, h) {
  const ctx = canvas.getContext("2d");
  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;
  const known = new Uint8Array(w * h);
  const hole = [];
  for (let i = 0; i < w * h; i++) { if (mask[i]) hole.push(i); else known[i] = 1; }

  let remaining = hole.length, guard = 0;
  while (remaining > 0 && guard++ < 5000) {
    const toMark = [];
    for (let k = 0; k < hole.length; k++) {
      const p = hole[k]; if (known[p]) continue;
      const x = p % w, y = (p / w) | 0;
      let r = 0, g = 0, b = 0, n = 0;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        if (!dx && !dy) continue;
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
        const q = ny * w + nx;
        if (known[q]) { const o = q * 4; r += d[o]; g += d[o + 1]; b += d[o + 2]; n++; }
      }
      if (n) { const o = p * 4; d[o] = r / n; d[o + 1] = g / n; d[o + 2] = b / n; d[o + 3] = 255; toMark.push(p); }
    }
    if (!toMark.length) break;
    for (const p of toMark) { known[p] = 1; remaining--; }
  }

  // smooth the filled region a few times to remove blockiness
  for (let pass = 0; pass < 3; pass++) {
    const copy = d.slice();
    for (const p of hole) {
      const x = p % w, y = (p / w) | 0;
      let r = 0, g = 0, b = 0, n = 0;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
        const o = (ny * w + nx) * 4; r += copy[o]; g += copy[o + 1]; b += copy[o + 2]; n++;
      }
      const o = p * 4; d[o] = r / n; d[o + 1] = g / n; d[o + 2] = b / n;
    }
  }
  ctx.putImageData(img, 0, 0);
}

function initObjectControls() {
  $("obj-brush").addEventListener("input", (e) => { state.objBrush = Number(e.target.value); });
  $("obj-clear").addEventListener("click", () => {
    if (state.objMask) { state.objMask.getContext("2d").clearRect(0, 0, state.objMask.width, state.objMask.height); renderObject(); }
  });
  $("obj-remove").addEventListener("click", removeObject);
  $("obj-reset").addEventListener("click", setupObject);

  const start = (e) => { state.objPainting = true; paintMaskAt(e); };
  const move = (e) => { if (state.objPainting) { e.preventDefault(); paintMaskAt(e); } };
  const end = () => { state.objPainting = false; };
  editCanvas.addEventListener("pointerdown", start);
  editCanvas.addEventListener("pointermove", move);
  window.addEventListener("pointerup", end);
}

// ---- init -----------------------------------------------------------------
renderSocials();
initControls();
initObjectControls();
const yr = $("year"); if (yr) yr.textContent = "2026";
