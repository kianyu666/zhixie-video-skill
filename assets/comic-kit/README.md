# 智械漫画动画组件

这是可编辑的 Remotion 组件和 18 秒验证样片，不是输入文案即可自动出片的软件。目标是让文件、选择与步骤产生独立动作；每条新视频仍需要根据文案设计分镜和素材。

## 组件

- `FolderManual`：文件夹前后两层，手册从中抽出；`label` 可换文字、`delay` 控制开始时间（秒）。
- `SelectAndOpen`：三个候选进入、指针选择一项、手册展开；通过 `labels` 和 `selected` 换内容。
- `Steps`：三项步骤依次勾选；`items` 可换内容。
- `Paper`、`Title`、`Stamp`、`InkRing`、`Burst`：背景、标题、标贴、描线和漫画转场。

动画跟随 Remotion 的每个 `Sequence` 本地帧与合成帧率。组件针对 1080×1920 画布设计；短标签可直接替换，长文案需检查排版并按镜头改造。复制组件到新的 Remotion 工程，通过 `Sequence` 安排镜头，示例见 `src/index.tsx`。

## 本机运行

准备 Node.js 和本项目 `package.json` 所列依赖后，在本目录运行。依赖安装和执行前，请检查当前环境与授权。

```powershell
node render.mjs             # 输出静帧和完整视频
node render.mjs --stills    # 只输出抽查静帧
```

渲染器会查找本机 Edge 或 Chrome；路径不同时，设置环境变量 `COMIC_BROWSER` 指向浏览器可执行文件。`package.json` 记录直接依赖，迁移到新电脑时需要自行准备匹配的 Node.js 和依赖，再按实际环境验证；未在其他电脑验证。

默认输出无配音、无底部字幕的 1080×1920 / 30fps 视频；可按需增减内容和调整时长。生成文件在 `output/`，每个选题应新建工程或目录，避免覆盖之前的成片。
