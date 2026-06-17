/* ClearCut — in-browser background removal. No server, no upload.
 * Uses @imgly/background-removal (ONNX/WASM) loaded lazily from a CDN. */

const $ = (id) => document.getElementById(id);

const dropzone = $("dropzone");
const fileInput = $("file-input");
const workspace = $("workspace");
const originalImg = $("original-img");
const resultImg = $("result-img");
const loader = $("loader");
const loaderText = $("loader-text");
const progressBar = $("progress-bar");
const downloadBtn = $("download-btn");
const errorMsg = $("error-msg");

const SAMPLE_URL =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80";

let _removeBackground = null;

// Lazy-load the library only when the user actually needs it.
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
  resultImg.hidden = true;
  downloadBtn.hidden = true;
  errorMsg.hidden = true;
  loader.hidden = false;
  progressBar.style.width = "0%";
  fileInput.value = "";
}

async function processImage(source) {
  errorMsg.hidden = true;
  workspace.hidden = false;
  resultImg.hidden = true;
  downloadBtn.hidden = true;
  loader.hidden = false;
  progressBar.style.width = "0%";

  // show the original
  originalImg.src = typeof source === "string" ? source : URL.createObjectURL(source);

  try {
    const removeBackground = await getRemover();
    loaderText.textContent = "Removing background…";

    const blob = await removeBackground(source, {
      progress: (key, current, total) => {
        if (total) {
          const pct = Math.round((current / total) * 100);
          progressBar.style.width = pct + "%";
          if (key && key.includes("fetch")) loaderText.textContent = `Downloading model… ${pct}%`;
        }
      },
      output: { format: "image/png" },
    });

    const url = URL.createObjectURL(blob);
    resultImg.src = url;
    resultImg.hidden = false;
    loader.hidden = true;
    downloadBtn.href = url;
    downloadBtn.hidden = false;
  } catch (err) {
    console.error(err);
    showError(
      "Couldn't remove the background. The AI model needs an internet connection " +
      "on first use and a modern browser. Details: " + (err && err.message ? err.message : err)
    );
  }
}

// ---- input handlers -------------------------------------------------------
function handleFile(file) {
  if (!file || !file.type.startsWith("image/")) {
    showError("Please choose an image file (PNG, JPG, or WEBP).");
    workspace.hidden = false;
    return;
  }
  processImage(file);
}

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

// paste from clipboard
window.addEventListener("paste", (e) => {
  const item = [...(e.clipboardData?.items || [])].find((i) => i.type.startsWith("image/"));
  if (item) handleFile(item.getAsFile());
});

$("sample-btn").addEventListener("click", async (e) => {
  e.stopPropagation();
  try {
    const resp = await fetch(SAMPLE_URL);
    const blob = await resp.blob();
    processImage(blob);
  } catch (_) {
    processImage(SAMPLE_URL); // let the library fetch it directly
  }
});

$("reset-btn").addEventListener("click", resetUI);
