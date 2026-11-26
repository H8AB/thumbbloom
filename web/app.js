import { buildSvg, examples, normalize, sizes } from './core.js';

const form = document.querySelector('#editor');
const preview = document.querySelector('#coverPreview');
const mini = document.querySelector('#miniPreview');
const sizeLabel = document.querySelector('#sizeLabel');
const status = document.querySelector('#status');
let currentSvg = '';

function values() { return normalize(Object.fromEntries(new FormData(form))); }

function render() {
  const data = values();
  currentSvg = buildSvg(data);
  preview.innerHTML = currentSvg;
  mini.innerHTML = currentSvg;
  const s = sizes[data.kind];
  preview.style.aspectRatio = `${s.width} / ${s.height}`;
  mini.style.aspectRatio = `${s.width} / ${s.height}`;
  sizeLabel.textContent = `${s.width} × ${s.height} px`;
  status.textContent = '';
}

function setExample(example) {
  for (const [key, value] of Object.entries(example)) {
    const field = form.elements.namedItem(key);
    if (!field) continue;
    if (key === 'style') form.querySelector(`[name="style"][value="${value}"]`).checked = true;
    else field.value = value;
  }
  render();
}

function download(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

document.querySelector('#downloadSvg').addEventListener('click', () => {
  download(new Blob([currentSvg], { type: 'image/svg+xml;charset=utf-8' }), `thumbbloom-${values().kind}.svg`);
  status.textContent = 'SVG 已下载，可在矢量编辑器中继续修改。';
});

document.querySelector('#downloadPng').addEventListener('click', () => {
  const data = values(); const s = sizes[data.kind];
  const url = URL.createObjectURL(new Blob([currentSvg], { type: 'image/svg+xml;charset=utf-8' }));
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas'); canvas.width = s.width; canvas.height = s.height;
    canvas.getContext('2d').drawImage(img, 0, 0);
    URL.revokeObjectURL(url);
    canvas.toBlob(blob => {
      if (blob) { download(blob, `thumbbloom-${data.kind}.png`); status.textContent = 'PNG 已下载。'; }
      else status.textContent = 'PNG 导出失败，请先下载 SVG。';
    }, 'image/png');
  };
  img.onerror = () => { URL.revokeObjectURL(url); status.textContent = 'PNG 导出失败，请先下载 SVG。'; };
  img.src = url;
});

const caseGrid = document.querySelector('#caseGrid');
examples.forEach((example, i) => {
  const card = document.createElement('button');
  card.type = 'button'; card.className = 'case-card';
  const art = document.createElement('div'); art.className = 'case-art'; art.innerHTML = buildSvg(example);
  const meta = document.createElement('div'); meta.className = 'case-meta';
  const label = document.createElement('span'); label.textContent = `0${i+1}  /  ${example.name}`;
  const arrow = document.createElement('span'); arrow.textContent = '编辑 ↗';
  meta.append(label, arrow); card.append(art, meta); caseGrid.append(card);
  card.addEventListener('click', () => { setExample(example); document.querySelector('#studio').scrollIntoView({ behavior: 'smooth' }); });
});

form.addEventListener('input', render);
form.addEventListener('change', render);
setExample(examples[0]);
