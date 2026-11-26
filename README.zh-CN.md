# ThumbBloom · 中文说明（可选）

[English README](README.md)

ThumbBloom 是面向视频、文章和播客创作者的开源封面设计技能。智能体会先提炼真实的内容卖点，提出不同设计方向，再交付可编辑封面，并检查缩略图可读性。

默认使用英文。需要中文时，在请求中写明：“请用简体中文回复，封面文案也用简体中文。”技能会读取可选的中文本地化参考。

## 安装

复制完整的 `skills/thumbbloom/` 目录：Codex 项目放入 `.agents/skills/`，Claude Code 项目放入 `.claude/skills/`。Claude 网页端可在支持自定义技能的账号中上传技能 ZIP。WorkBuddy 可运行 `npm run workbuddy` 生成专用版本后导入。

## 案例与验证

`examples/` 包含三个虚构案例的可编辑 SVG。运行 `npm run examples` 可重新生成案例；`npm run check` 验证尺寸、文案转义和技能版本一致性。示例尺寸仅作起点，正式发布前请核对目标平台规格。

代码与案例采用 [MIT License](LICENSE)。
