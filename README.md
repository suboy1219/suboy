# Suboy · 独立工具箱

为最近开发的 8 个工具制作的中文个人作品集。原生 HTML、CSS 和 JavaScript，无需安装依赖或配置后端，可直接部署到 GitHub Pages。

## 内容与功能

| 工具 | 用途 | 平台 |
| --- | --- | --- |
| [CmdDock](https://github.com/suboy1219/cmd-dock) | 多标签、任意分屏的原生终端 | Windows |
| [Codex 托盘用量](https://github.com/suboy1219/codex-taskbar) | 查看 5 小时与每周剩余额度 | Windows |
| [ProjectDock](https://github.com/suboy1219/project-dock) | 按项目整理和切换窗口 | Windows |
| [QuickDock](https://github.com/suboy1219/quick-dock) | 鼠标旁的快速启动器 | Windows |
| [DeskNote](https://github.com/suboy1219/desk-note) | 快捷呼出、自动保存的桌面便签 | Windows |
| [LagLens](https://github.com/suboy1219/lag-lens) | 记录并回看卡顿发生时的资源占用 | Windows |
| [DevClean](https://github.com/suboy1219/DevClean) | 按白名单和风险等级清理缓存 | Windows |
| [屏幕直尺](https://github.com/suboy1219/screen-ruler) | 可校准的手机屏幕直尺 | Android |

页面提供分类筛选、名称与关键词搜索、工具详情弹窗、获取入口和源码链接。支持手机、平板和桌面尺寸，键盘可操作，尊重系统的减少动画偏好。按 `/` 聚焦搜索，`Esc` 清空搜索或关闭详情。禁用 JavaScript 时仍可查看全部工具并打开项目链接。

截图由各项目现有文档图片转为本地 WebP，页面不依赖外部图片、字体、CDN 或数据 API。截图和示意图的来源及性质标注在详情中；示例额度、磁盘容量等不表示实时数据。

## 本地预览

直接打开 `index.html` 即可浏览，也可以在本目录运行：

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

访问 <http://127.0.0.1:8000>。按 `Ctrl+C` 结束服务。

## 部署到 GitHub Pages

当前仓库是 `suboy1219/suboy`，部署后的项目网站地址为：

**https://suboy1219.github.io/suboy/**

1. 将网页文件提交并推送到此仓库的 `main` 分支。
2. 打开 [仓库 Pages 设置](https://github.com/suboy1219/suboy/settings/pages)。
3. 在 **Build and deployment** 中将 **Source** 设为 **Deploy from a branch**。
4. 选择 **main** 和 **/(root)**，点击 **Save**。
5. 等待 GitHub 完成部署后访问网站；部署记录可以在仓库的 **Actions** 中查看。

后续推送 `main` 会自动更新网站。`.nojekyll` 让 GitHub 直接发布静态文件，无需构建。本站所有资源使用相对路径，也可以放到 `suboy1219.github.io` 仓库根目录，部署到用户主页地址。

配置依据：[GitHub 官方文档：配置 GitHub Pages 发布源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。

## 修改内容

- `index.html`：主页、8 个工具的介绍、标签、平台、图片和获取链接。
- `styles.css`：配色、布局和响应式样式。
- `app.js`：分类与搜索、详情文案和弹窗交互。
- `assets/`：本地界面图片和站点图标；[图片来源](assets/README.md)。

增加工具时，在 `index.html` 增加一张 `.tool-card`，填写唯一 `data-id`、所属 `data-category` 和搜索用 `data-keywords`；在 `app.js` 的 `details` 中补齐同名详情，同时更新分类计数、工具总数和页面元数据。

部分项目的获取入口指向 README，由项目说明提供运行或构建方式；不假定所有项目都有 Release。屏幕直尺入口指向当前 README 中明确列出的 APK 文件。更新版本后可同步修改入口。
