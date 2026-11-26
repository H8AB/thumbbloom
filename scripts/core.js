export const sizes = {
  video: { label: 'Landscape video · 16:9', width: 1280, height: 720 },
  article: { label: 'Article card · 3:4', width: 900, height: 1200 },
  square: { label: 'Square post · 1:1', width: 1080, height: 1080 },
  vertical: { label: 'Vertical video · 9:16', width: 1080, height: 1920 }
};

export const examples = [
  { id: 'desk', name: 'Video | Five-minute desk reset', kind: 'video', style: 'bold', eyebrow: 'CREATOR LAB  /  VOL. 01', title: '5-MINUTE\nDESK RESET', subtitle: 'A calmer workspace in minutes', brand: 'CREATOR LAB', accent: '#F6E15B' },
  { id: 'notes', name: 'Article | A better note system', kind: 'article', style: 'editorial', eyebrow: 'FIELD NOTES  /  GUIDE', title: 'BUILD A\nNOTE SYSTEM', subtitle: 'Keep what you learn, find it again', brand: 'FIELD NOTES', accent: '#C56C47' },
  { id: 'habits', name: 'Podcast | Daily creative habits', kind: 'square', style: 'minimal', eyebrow: 'CREATOR CONVERSATIONS  /  08', title: 'CREATE\nEVERY DAY', subtitle: 'Small creative habits that last', brand: 'THE MAKER ROOM', accent: '#9EBAA7' }
];

const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&apos;' }[ch]));
const clean = (value, max = 100) => String(value ?? '').trim().slice(0, max);
const color = value => /^#[0-9a-fA-F]{6}$/.test(value ?? '') ? value : '#F6E15B';

function linesOf(value, maxUnits = 14, maxLines = 3) {
  const source = clean(value, 120).split(/\n/);
  const lines = [];
  for (const paragraph of source) {
    let line = '';
    for (const ch of paragraph) {
      const units = [...(line + ch)].reduce((n, c) => n + (/[^\x00-\xff]/.test(c) ? 1.8 : 1), 0);
      if (units > maxUnits && line) { lines.push(line); line = ch; } else line += ch;
    }
    if (line) lines.push(line);
  }
  return lines.slice(0, maxLines);
}

function textLines(lines, x, y, size, leading, attrs = '') {
  return lines.map((line, i) => `<text x="${x}" y="${y + i * leading}" ${attrs}>${esc(line)}</text>`).join('');
}

function commonDefs(accent) {
  return `<defs><linearGradient id="grain" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${accent}"/><stop offset="1" stop-color="#E79965"/></linearGradient><pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.4" fill="currentColor" opacity=".14"/></pattern></defs>`;
}

export function normalize(input = {}) {
  const kind = sizes[input.kind] ? input.kind : 'video';
  const style = ['bold', 'editorial', 'minimal'].includes(input.style) ? input.style : 'bold';
  return {
    kind, style, accent: color(input.accent),
    eyebrow: clean(input.eyebrow, 45),
    title: clean(input.title, 120) || 'YOUR COVER TITLE',
    subtitle: clean(input.subtitle, 70),
    brand: clean(input.brand, 40)
  };
}

export function buildSvg(input) {
  const d = normalize(input);
  const { width: w, height: h } = sizes[d.kind];
  const r = w / h;
  const vertical = r < .9;
  const pad = Math.round(w * .072);
  const main = linesOf(d.title, vertical ? 11.7 : 15.5, 3);
  const titleSize = Math.round(Math.min(w * (vertical ? .102 : .075), h * (main.length === 3 ? .14 : .17)));
  const leading = Math.round(titleSize * 1.18);
  const titleY = vertical ? Math.round(h * .40) : Math.round(h * .38);
  const eyebrowSize = Math.round(w * .019 + 8);
  const subSize = Math.round(w * .021 + 10);
  const font = `font-family="Inter, Avenir Next, Noto Sans CJK SC, PingFang SC, Microsoft YaHei, sans-serif"`;
  let body = '';

  if (d.style === 'bold') {
    const artX = vertical ? w * .73 : w * .79;
    const artY = vertical ? h * .77 : h * .52;
    const artR = vertical ? w * .38 : w * .23;
    body = `<rect width="${w}" height="${h}" fill="#17262A"/><rect width="${w}" height="${h}" fill="url(#dots)" color="#E9F5E7"/>`+
      `<circle cx="${artX}" cy="${artY}" r="${artR}" fill="${d.accent}"/>`+
      `<circle cx="${artX}" cy="${artY}" r="${artR * .73}" fill="none" stroke="#17262A" stroke-width="${Math.round(w * .018)}"/>`+
      `<path d="M ${artX-artR*.57} ${artY+artR*.18} L ${artX-artR*.10} ${artY-artR*.28} L ${artX+artR*.23} ${artY+artR*.04} L ${artX+artR*.66} ${artY-artR*.38}" fill="none" stroke="#17262A" stroke-width="${Math.round(w*.025)}" stroke-linecap="round" stroke-linejoin="round"/>`+
      `<rect x="${pad}" y="${pad}" width="${Math.round(w*.075)}" height="${Math.round(w*.012)}" rx="5" fill="${d.accent}"/>`+
      `<text x="${pad}" y="${Math.round(h*.18)}" fill="${d.accent}" font-size="${eyebrowSize}" font-weight="750" letter-spacing="3" ${font}>${esc(d.eyebrow.toUpperCase())}</text>`+
      textLines(main, pad, titleY, titleSize, leading, `fill="#FFF9EE" font-size="${titleSize}" font-weight="850" letter-spacing="-2" ${font}`)+
      `<text x="${pad}" y="${Math.min(h-pad*1.72, titleY+main.length*leading+subSize*.65)}" fill="#BFD0CD" font-size="${subSize}" font-weight="500" ${font}>${esc(d.subtitle)}</text>`+
      `<line x1="${pad}" y1="${h-pad}" x2="${w-pad}" y2="${h-pad}" stroke="#8DA19E" stroke-width="2"/>`+
      `<text x="${pad}" y="${h-pad*.55}" fill="#FFF9EE" font-size="${Math.round(w*.018+7)}" font-weight="700" letter-spacing="2" ${font}>${esc(d.brand.toUpperCase())}</text>`;
  } else if (d.style === 'editorial') {
    const blockY = vertical ? h*.60 : h*.51;
    body = `<rect width="${w}" height="${h}" fill="#F2EDE4"/><rect x="${pad}" y="${pad}" width="${w-2*pad}" height="${h-2*pad}" fill="none" stroke="#B6B0A4" stroke-width="2"/>`+
      `<rect x="${w*.58}" y="${h*.13}" width="${w*.31}" height="${vertical ? h*.26 : h*.39}" rx="${w*.15}" fill="${d.accent}" opacity=".93"/>`+
      `<circle cx="${w*.73}" cy="${vertical ? h*.27 : h*.33}" r="${w*.093}" fill="#F2EDE4"/>`+
      `<path d="M ${w*.73} ${vertical ? h*.14 : h*.19} V ${vertical ? h*.40 : h*.48} M ${w*.60} ${vertical ? h*.27 : h*.33} H ${w*.86}" stroke="#332E29" stroke-width="${Math.round(w*.004)}" opacity=".55"/>`+
      `<text x="${pad*1.25}" y="${h*.145}" fill="#795F51" font-size="${eyebrowSize}" font-weight="700" letter-spacing="3" ${font}>${esc(d.eyebrow)}</text>`+
      `<line x1="${pad*1.25}" y1="${blockY-titleSize*1.55}" x2="${w*.43}" y2="${blockY-titleSize*1.55}" stroke="#332E29" stroke-width="3"/>`+
      textLines(main, pad*1.25, blockY, titleSize, leading, `fill="#2F2D29" font-size="${titleSize}" font-weight="750" letter-spacing="-2" ${font}`)+
      `<text x="${pad*1.25}" y="${Math.min(h-pad*2.1, blockY+main.length*leading+subSize*.55)}" fill="#6B675F" font-size="${subSize}" ${font}>${esc(d.subtitle)}</text>`+
      `<text x="${pad*1.25}" y="${h-pad*1.5}" fill="#795F51" font-size="${Math.round(w*.018+7)}" font-weight="700" letter-spacing="2" ${font}>${esc(d.brand.toUpperCase())}</text>`;
  } else {
    const blobY = vertical ? h*.31 : h*.32;
    const blobR = vertical ? w*.22 : w*.18;
    const titleStart = vertical ? h*.56 : h*.61;
    const miniSize = Math.round(Math.min(titleSize, w*.082));
    body = `<rect width="${w}" height="${h}" fill="#E9ECE7"/><circle cx="${w*.5}" cy="${blobY}" r="${blobR}" fill="${d.accent}"/>`+
      `<circle cx="${w*.5}" cy="${blobY}" r="${w*.12}" fill="#E9ECE7"/>`+
      `<circle cx="${w*.5}" cy="${blobY}" r="${w*.038}" fill="#24312D"/>`+
      `<path d="M ${w*.5-blobR*1.13} ${blobY} H ${w*.5+blobR*1.13} M ${w*.5} ${blobY-blobR*1.13} V ${blobY+blobR*1.13}" stroke="#24312D" stroke-width="2" opacity=".5"/>`+
      `<text x="${w*.5}" y="${h*.12}" text-anchor="middle" fill="#52605A" font-size="${eyebrowSize}" font-weight="650" letter-spacing="3" ${font}>${esc(d.eyebrow)}</text>`+
      textLines(main, w*.5, titleStart, miniSize, miniSize*1.25, `text-anchor="middle" fill="#24312D" font-size="${miniSize}" font-weight="800" letter-spacing="-2" ${font}`)+
      `<text x="${w*.5}" y="${Math.min(h-pad*1.6, titleStart+main.length*miniSize*1.25+subSize*.6)}" text-anchor="middle" fill="#52605A" font-size="${subSize}" ${font}>${esc(d.subtitle)}</text>`+
      `<line x1="${pad}" y1="${h-pad}" x2="${w-pad}" y2="${h-pad}" stroke="#A9B4AB" stroke-width="2"/>`+
      `<text x="${w*.5}" y="${h-pad*.55}" text-anchor="middle" fill="#52605A" font-size="${Math.round(w*.018+7)}" font-weight="700" letter-spacing="2" ${font}>${esc(d.brand.toUpperCase())}</text>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(d.title.replace(/\n/g, ' '))}">${commonDefs(d.accent)}${body}</svg>`;
}
