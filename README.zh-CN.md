# ThumbBloom · 中文说明（可选）

## 先这样用

把视频、文章或播客的主题发给我，告诉我发布平台；有标题、照片或品牌色也可以附上。比如：“这期视频讲怎么用 AI 整理会议记录，帮我做张适合手机看的封面。”

我会先给你看封面。你可以直接说“标题短一点”“换成暖色”“人物不要出现”，我会按你的意思修改，再给可下载的图片。

素材权利不明确时，我会先用原创图形或请你提供素材。公开示例不会使用你的账号或历史内容。

[English README](README.md)

ThumbBloom 是面向视频、文章和播客创作者的开源封面设计技能。智能体会先提炼真实的内容卖点，提出不同设计方向，再交付可编辑封面，并检查缩略图可读性。

GitHub 通用版会跟随请求的语言；在 WorkBuddy 中文版可直接用中文描述任务。

## 安装

复制完整的 `skills/thumbbloom/` 目录：Codex 项目放入 `.agents/skills/`，Claude Code 项目放入 `.claude/skills/`。Claude 网页端可在支持自定义技能的账号中上传技能 ZIP。WorkBuddy 可运行 `npm run workbuddy` 生成专用版本后导入。

## 案例与验证

`examples/` 包含三个虚构案例的可编辑 SVG。运行 `npm run examples` 可重新生成案例；`npm run check` 验证尺寸、文案转义和技能版本一致性。示例尺寸仅作起点，正式发布前请核对目标平台规格。

代码与案例采用 [MIT License](LICENSE)。
