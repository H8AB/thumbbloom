import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { buildSvg, examples, normalize, sizes } from './core.js';

for (const item of examples) {
  const svg = buildSvg(item);
  const s = sizes[item.kind];
  assert.match(svg, new RegExp(`width="${s.width}" height="${s.height}"`));
  assert.match(svg, /<svg[\s\S]*<\/svg>$/);
  assert.equal(svg, await readFile(new URL(`../examples/${item.id}.svg`, import.meta.url), 'utf8'));
}
assert.equal(normalize({ kind: 'unknown', style: 'unknown', accent: 'red' }).accent, '#F6E15B');
const hostile = buildSvg({ title: '<script>alert("x")</script>', eyebrow: '" onload="alert(1)', brand: '&bad' });
assert.ok(!hostile.includes('<script>'));
assert.ok(!hostile.includes(' onload="alert(1)'));
assert.ok(hostile.includes('&lt;script&gt;'));
const base = await readFile(new URL('../skills/thumbbloom/SKILL.md', import.meta.url), 'utf8');
const workbuddy = await readFile(new URL('../platforms/workbuddy/thumbbloom/SKILL.md', import.meta.url), 'utf8');
const body = value => value.replace(/^---\n[\s\S]*?\n---\n/, '');
assert.equal(body(base), body(workbuddy), 'WorkBuddy variant shares the same instructions');
console.log('Renderer, dimensions, generated examples, and text escaping verified.');
