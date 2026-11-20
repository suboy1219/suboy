# Suboy · 独立工具箱

为最近开发的 10 个工具制作的中英文个人作品集。原生 HTML、CSS 和 JavaScript，无需安装依赖或配置后端，可直接部署到 GitHub Pages。

在线访问：[Suboy 工具箱](https://suboy1219.github.io/suboy/)。

English: [Suboy Toolbox](https://suboy1219.github.io/suboy/en/).

## 中英文支持

页头的 **中文 / EN** 可切换语言，两种语言都有完整静态 HTML。导航、介绍、工具卡片、图片替代文字、搜索提示、详情内容和无障碍标签均已翻译；应用截图保留项目提供的原始界面。英文详情会说明工具自身目前的界面语言，网站翻译不代表桌面或 Android 应用也已翻译。

搜索可在任一语言页面匹配中英文工具关键词。点击语言入口时保存选择，再次从网站根路径进入时会使用明确选择过的英文偏好；直接访问英文路径会显示英文，访问 `?lang=zh` 可强制打开中文。浏览器禁止本地存储时仍能正常使用语言链接。切换时保留当前的页面锚点。

两页分别设置自己的 canonical，互相使用 `hreflang` 标记语言版本，站点地图包含两个网址。页面文字可在 JavaScript 执行前读取。

修改中文 `index.html` 或英文 `locales/en.json` 后，在推送前运行：

```powershell
python scripts/build_locales.py
```

脚本只用 Python 标准库，生成并更新 `en/index.html` 与 `locales/en.js`。新增中文文案缺少翻译时会报错，避免英文页出现未翻译的中文。部署时直接发布生成文件，不需要服务器运行 Python。

## 内容与功能

| 工具 | 用途 | 平台 |
| --- | --- | --- |
| [CmdDock](https://github.com/suboy1219/cmd-dock) | 多标签、任意分屏的原生终端 | Windows |
| [Droid Studio Lite](https://github.com/suboy1219/droid-studio-lite) | Logcat、设备文件管理与多标签文本编辑 | Windows |
| [Codex 托盘用量](https://github.com/suboy1219/codex-taskbar) | 查看 5 小时与每周剩余额度 | Windows |
| [ProjectDock](https://github.com/suboy1219/project-dock) | 按项目整理和切换窗口 | Windows |
| [QuickDock](https://github.com/suboy1219/quick-dock) | 鼠标旁的快速启动器 | Windows |
| [DeskNote](https://github.com/suboy1219/desk-note) | 快捷呼出、自动保存的桌面便签 | Windows |
| [EyeGuard 护眼卫士](https://github.com/suboy1219/eye-guard) | 定时休息、远眺提醒与蓝光过滤 | Windows |
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

## 提交到 Google 搜索

主页已有描述性标题、页面描述和规范网址（canonical）；10 个工具的介绍直接写在 HTML 中，关闭 JavaScript 也能读取。`sitemap.xml` 包含中英文首页。页面内的 `#tools` 等锚点、详情弹窗以及外部项目仓库不是独立的本站网页，不重复写入站点地图。

1. 登录 [Google Search Console](https://search.google.com/search-console/welcome)，选择 **网址前缀**，输入 `https://suboy1219.github.io/suboy/`。
2. 在验证方式中选择 **HTML 标记**，将 Google 提供的完整 `<meta name="google-site-verification" ...>` 放进 `index.html` 的 `<head>` 中。提交、推送并等待部署后，再返回 Search Console 点击 **验证**。成功后保留该标记，不要删除。
3. 在 **站点地图** 中提交 `https://suboy1219.github.io/suboy/sitemap.xml`。
4. 使用顶部 **网址检查** 检查 `https://suboy1219.github.io/suboy/`，根据检查结果点击 **请求编入索引**，之后通过该工具查看收录状态。

本站使用 GitHub 的子路径托管，无需配置 DNS 验证或购买域名。`robots.txt` 必须位于主机根路径 `https://suboy1219.github.io/robots.txt` 才有效，放到本项目中会变成 `/suboy/robots.txt`，因此本项目不添加无效的爬虫规则文件。没有 `robots.txt` 不会阻止 Google 抓取本站。

可在个人 GitHub 简介和相关项目的 Website/README 中添加网站链接，帮助访客和搜索引擎发现网站。新站抓取可能需要几天到几周；提交站点地图或请求索引不保证收录，也不保证搜索排名。Google Search Console 的网址检查结果比单纯搜索 `site:suboy1219.github.io/suboy/` 更适合确认具体网址的索引状态。

官方说明：[验证网站所有权](https://support.google.com/webmasters/answer/9008080?hl=zh-Hans)、[提交站点地图](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)、[请求重新抓取](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)、[robots.txt 文件位置](https://developers.google.com/crawling/docs/robots-txt/create-robots-txt)。

## 修改内容

- `index.html`：主页、10 个工具的介绍、标签、平台、图片和获取链接。
- `styles.css`：配色、布局和响应式样式。
- `app.js`：分类与搜索、详情文案和弹窗交互。
- `locales/en.json`：英文文案、详情与两种语言通用的搜索关键词。
- `scripts/build_locales.py`：生成静态英文页和英文运行时文案。
- `en/index.html`、`locales/en.js`：生成文件，修改源文件后重新生成。
- `sitemap.xml`：提交到搜索引擎的本站页面清单；增加独立页面或更换域名后同步更新，并检查 `index.html` 中的 canonical 和 `og:url`。
- `assets/`：本地界面图片和站点图标；[图片来源](assets/README.md)。

增加工具时，在 `index.html` 增加一张 `.tool-card`，填写唯一 `data-id`、所属 `data-category` 和搜索用 `data-keywords`；在 `app.js` 的 `details` 中补齐同名详情，在 `locales/en.json` 中补齐英文文案、详情和搜索关键词，再运行语言生成脚本，同时更新分类计数、工具总数和页面元数据。

部分项目的获取入口指向 README，由项目说明提供运行或构建方式；不假定所有项目都有 Release。Droid Studio Lite 的入口指向项目说明，目前在 Windows 10 / 11 上验证与打包，使用前需准备可用的 adb，并开启设备 USB 调试、授权本机。屏幕直尺入口指向当前 README 中明确列出的 APK 文件。更新版本后可同步修改入口。
