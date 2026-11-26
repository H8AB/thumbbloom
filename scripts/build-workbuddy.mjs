import { mkdir, readFile, writeFile, cp } from 'node:fs/promises';

const source = new URL('../skills/covercraft/', import.meta.url);
const target = new URL('../platforms/workbuddy/covercraft/', import.meta.url);
const text = await readFile(new URL('SKILL.md', source), 'utf8');
const body = text.replace(/^---\n[\s\S]*?\n---\n/, '');
const header = `---
name: covercraft
display_name: 封面工坊
display_name_en: Covercraft
description: 为视频、文章、播客设计可编辑的社媒封面与缩略图；需要封面创意、排版或成品时使用。
description_zh: 提炼内容亮点，制作可编辑封面，并检查缩略图可读性。
description_en: Design editable covers and thumbnails for creator content.
version: 0.1.0
author: Covercraft contributors
examples_zh:
  - "为我的短视频设计醒目的封面"
  - "给这篇文章做一个有编辑感的封面"
---
`;
await mkdir(target, { recursive: true });
await writeFile(new URL('SKILL.md', target), header + body, 'utf8');
await cp(new URL('references/', source), new URL('references/', target), { recursive: true });
console.log('Generated WorkBuddy skill at platforms/workbuddy/covercraft/');
