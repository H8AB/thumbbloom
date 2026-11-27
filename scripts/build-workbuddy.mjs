import { mkdir, readFile, writeFile, cp } from 'node:fs/promises';

const source = new URL('../skills/thumbbloom/', import.meta.url);
const target = new URL('../platforms/workbuddy/thumbbloom/', import.meta.url);
const text = await readFile(new URL('SKILL.md', source), 'utf8');
const body = text.replace(/^---\n[\s\S]*?\n---\n/, '');
const header = `---
name: thumbbloom
display_name: 社媒封面设计
display_name_en: ThumbBloom
display_name_zh: 社媒封面设计
description: 从视频、文章或播客里找出最值得被看见的重点，做成手机上也清楚的封面。
description_zh: 从视频、文章或播客里找出最值得被看见的重点，做成手机上也清楚的封面。
description_en: Design editable covers and thumbnails for creator content.
version: 0.1.1
author: ThumbBloom contributors
examples_en:
  - "Design a bold cover for my video"
  - "Create an editorial cover for this article"
examples_zh:
  - "这期视频讲我怎么用 AI 整理会议记录，帮我做张让人愿意点开的封面。"
  - "这篇文章要发公众号，帮我做一张手机上也看得清的封面。"
---
`;
await mkdir(target, { recursive: true });
await writeFile(new URL('SKILL.md', target), header + body, 'utf8');
await cp(new URL('references/', source), new URL('references/', target), { recursive: true });
console.log('Generated WorkBuddy skill at platforms/workbuddy/thumbbloom/');
