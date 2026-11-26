import { mkdir, writeFile } from 'node:fs/promises';
import { buildSvg, examples } from './core.js';

const dir = new URL('../examples/', import.meta.url);
await mkdir(dir, { recursive: true });
for (const item of examples) await writeFile(new URL(`${item.id}.svg`, dir), buildSvg(item), 'utf8');
const pieces = examples.map((item, i) => {
  const svg = buildSvg(item).replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
  const { kind } = item;
  const frame = kind === 'article' ? { w: 300, h: 400 } : kind === 'square' ? { w: 340, h: 340 } : { w: 400, h: 225 };
  const x = [40, 500, 900][i];
  const y = 120 + (400 - frame.h) / 2;
  return `<svg x="${x}" y="${y}" width="${frame.w}" height="${frame.h}" viewBox="0 0 ${kind === 'article' ? '900 1200' : kind === 'square' ? '1080 1080' : '1280 720'}">${svg}</svg>`;
});
const overview = `<svg xmlns="http://www.w3.org/2000/svg" width="1300" height="600" viewBox="0 0 1300 600"><rect width="1300" height="600" fill="#E9EFE4"/><text x="40" y="68" font-size="30" font-family="sans-serif" font-weight="700" fill="#263B2D">ThumbBloom · Three cover examples</text>${pieces.join('')}</svg>`;
await writeFile(new URL('overview.svg', dir), overview, 'utf8');
console.log('Generated 3 case covers and overview.svg');
