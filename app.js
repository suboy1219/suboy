"use strict";

(() => {
  const english = document.documentElement.lang === "en";
  const translations = window.SuboyEnglish;
  const labels = english ? translations.ui : {
    featuresTitle: "它能帮你做什么",
    requirementsTitle: "使用与获取",
    sourceLabel: "查看源码与说明",
    results: "找到 {count} 个工具",
    query: "，关键词：{query}",
    detailLabel: "了解{name}的详情"
  };
  const preferenceKey = "suboy-language";
  const languageLinks = [...document.querySelectorAll("[data-language]")];
  languageLinks.forEach(link => link.addEventListener("click", () => {
    // Navigation still works when browser storage is disabled or unavailable.
    try { window.localStorage.setItem(preferenceKey, link.dataset.language); } catch {}
    if (window.location.hash) link.hash = window.location.hash;
  }));
  try {
    // Only an explicit, previously selected preference changes the landing page.
    // Direct English URLs remain English; ?lang=zh always opens the Chinese page.
    if (!english && new URLSearchParams(window.location.search).get("lang") !== "zh" && window.localStorage.getItem(preferenceKey) === "en") {
      const destination = new URL(document.querySelector('[data-language="en"]').getAttribute("href"), window.location.href);
      destination.hash = window.location.hash;
      window.location.replace(destination.href);
      return;
    }
  } catch {}

  const grid = document.querySelector("#tool-grid");
  const cards = [...grid.querySelectorAll(".tool-card")];
  const filters = [...document.querySelectorAll(".filter")];
  const search = document.querySelector("#tool-search");
  const empty = document.querySelector("#empty-state");
  const status = document.querySelector("#results-status");
  const dialog = document.querySelector("#tool-dialog");
  const content = document.querySelector("#dialog-content");
  let category = "all";
  let opener = null;

  // Content is based on the eight projects' README files. Screenshots use public demo data.
  const details = english ? translations.details : {
    "cmd-dock": {
      features: ["每个标签和分屏拥有独立的 shell 进程，可混用 cmd、Windows PowerShell 和已安装的 PowerShell 7。", "左右、上下嵌套分屏，支持拖拽调整；Ctrl + F 实时搜索，Ctrl + H 查看命令历史。", "目录书签、输出留档、亮暗主题与可配置字体，把常用操作留在同一个窗口。"],
      requirements: "Windows 10 1809 及以上，x64。Releases 提供自带运行时版本，以及需要 .NET 10 Desktop Runtime 的精简版本。",
      caption: "项目提供的演示截图，使用示例目录和文字。"
    },
    "codex-taskbar": {
      features: ["托盘数字显示 5 小时剩余额度；悬浮胶囊同时显示 5 小时和每周两项余量。", "状态条可拖动，靠近屏幕边缘时收成贴边小条；点击查看剩余比例、重置时间和更新时间。", "每 60 秒自动刷新，支持手动刷新、显示或隐藏状态条，以及开机自启。"],
      requirements: "Windows x64。下载自包含版本后可直接运行。使用前需先在本机登录 Codex，工具复用本机已有登录态；展示的是剩余额度。",
      caption: "项目界面预览；图中额度为示例，不代表访客的实时用量。"
    },
    "project-dock": {
      features: ["从 VS Code、Cursor、Unity、Visual Studio 和资源管理器的窗口标题中识别项目，自动归组。", "可手动拖动窗口调整归属，拖动分组改变顺序；手动规则会保存，重启后继续生效。", "Alt + F2 呼出或收起（可自定义）。点击窗口即可切换，点击面板外自动收起。"],
      requirements: "Windows 桌面工具。获取方式与构建步骤见项目 README；自行构建需要 .NET 10 SDK。当前面板固定显示在主屏右下角。",
      caption: "项目提供的演示截图，项目名和窗口标题均为示例内容。"
    },
    "quick-dock": {
      features: ["默认用 Alt + 鼠标中键呼出，面板跟随光标出现，自动避让屏幕边缘；可自定义鼠标快捷键。", "添加程序、快捷方式、文档、文件夹或网址，也能扫描已安装软件和 Windows 商店应用后批量加入。", "支持数字键 1–9、方向键和 Enter 启动；可按最近使用排序，并选择开机自启。"],
      requirements: "Windows 桌面工具。获取方式与构建步骤见项目 README；精简版需要 .NET 10 Desktop Runtime，自包含版本自带运行时。",
      caption: "项目提供的快速启动器界面预览。"
    },
    "desk-note": {
      features: ["Alt + F3 随时呼出或收起，快捷键可更换；呼出时聚焦，切回其他软件后取消置顶。", "停止输入约 0.6 秒自动保存，失焦和退出时也会保存；Ctrl + S 可立即保存。", "支持亮暗主题、可拉伸窗口和多行纯文本，每个非空行作为独立条目显示不同底色。"],
      requirements: "Windows 10 / 11 x64。Releases 提供含运行时的完整包，以及依赖 .NET 10 Desktop Runtime 的精简包。内容保存在本机 note.txt 中，可自行备份。",
      caption: "按应用布局绘制的亮暗主题界面示意，使用公开示例文字，并非实机截图。"
    },
    "lag-lens": {
      features: ["每秒采样 CPU、物理磁盘和内存，在内存中保留最近 60 秒，支持暂停后逐帧回看。", "按进程名聚合资源占用，列出 Top 5 应用；点击应用可在资源管理器中定位程序。", "自动记录冻结和持续高压，托盘图标按负载变色；不主动弹窗打断工作。"],
      requirements: "Windows 10 / 11 x64，发布压缩包已包含 .NET 运行时。无需管理员权限。结论用于辅助排查，需结合当时的曲线和负载查看。",
      caption: "使用模拟数据演示卡顿场景，不包含真实使用记录或本机路径。"
    },
    "dev-clean": {
      features: ["扫描内置白名单中的系统与应用缓存，展示体积、风险等级和所需权限，按类别查看。", "覆盖 npm、pnpm、pip、NuGet、Gradle、Cargo、Unity 等开发工具链缓存。", "清理前展示路径、大小与风险；高风险项目需要额外确认，完成后列出结果和失败原因。"],
      requirements: "Windows x64。Releases 提供自包含单文件，无需另装 .NET。部分系统项需要管理员权限；清理前请阅读项目说明，确认每个勾选项的影响。",
      caption: "内置演示模式截图，磁盘容量和缓存数据均为虚构示例。"
    },
    "screen-ruler": {
      features: ["支持横向和纵向刻度，拖动 A、B 测量线查看距离，可切换毫米和英寸读数。", "以 0.1 mm 或 1 mm 步进微调测量线；支持银行卡、硬币及实际屏幕尺寸等校准方式。", "校准结果保存在本机，测量时屏幕保持常亮，不联网、不申请运行时权限。"],
      requirements: "Android 7.0（API 24）及以上，下载 APK 安装。建议第一次用银行卡或硬币校验；系统 DPI 和显示缩放会影响精度。0.1 mm 是调节步长，不代表测量精度。当前安装包使用项目的 debug 签名。",
      caption: "通过 Robolectric 渲染真实 Android 布局生成的项目截图。"
    }
  };

  function updateResults() {
    const query = search.value.trim().normalize("NFKC").toLocaleLowerCase();
    let count = 0;
    cards.forEach(card => {
      const text = `${card.textContent} ${card.dataset.id} ${card.dataset.keywords} ${translations.search[card.dataset.id]}`.normalize("NFKC").toLocaleLowerCase();
      const matches = (category === "all" || category === card.dataset.category) && text.includes(query);
      card.hidden = !matches;
      if (matches) count++;
    });
    grid.classList.toggle("is-filtered", category !== "all" || Boolean(query));
    grid.hidden = count === 0;
    empty.hidden = count !== 0;
    status.textContent = labels.results.replace("{count}", String(count)) + (query ? labels.query.replace("{query}", search.value.trim()) : "");
    filters.forEach(button => {
      const active = button.dataset.filter === category;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function resetResults() {
    category = "all";
    search.value = "";
    updateResults();
    search.focus();
  }

  filters.forEach(button => button.addEventListener("click", () => {
    category = button.dataset.filter;
    updateResults();
  }));
  search.addEventListener("input", updateResults);
  document.querySelector("#reset-search").addEventListener("click", resetResults);
  document.querySelector(".toolbar").hidden = false;

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function openDetails(card, trigger) {
    const info = details[card.dataset.id];
    if (!info || dialog.open) return;
    opener = trigger;
    content.replaceChildren();

    const header = element("div", "dialog-header");
    const titleRow = card.querySelector(".card-title-row").cloneNode(true);
    const oldTitle = titleRow.querySelector("h3");
    const title = element("h2", "", oldTitle.textContent);
    title.id = "dialog-title";
    oldTitle.replaceWith(title);
    const description = element("p", "dialog-description", card.querySelector(".card-description").textContent);
    description.id = "dialog-description";
    header.append(titleRow, description);

    const figure = element("figure", "dialog-image");
    const screenshot = card.querySelector(".card-visual img").cloneNode();
    screenshot.loading = "eager";
    figure.append(screenshot);
    const caption = element("p", "image-caption", info.caption);

    const body = element("div", "dialog-details");
    const list = element("ul", "dialog-features");
    info.features.forEach(text => {
      const item = element("li");
      const check = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      check.classList.add("icon");
      check.setAttribute("aria-hidden", "true");
      const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
      use.setAttribute("href", "#i-check");
      check.append(use);
      item.append(check, element("span", "", text));
      list.append(item);
    });
    const actions = element("div", "dialog-actions");
    const download = card.querySelector(".download-link").cloneNode(true);
    download.className = "button button-dark";
    const source = card.querySelector(".source-link").cloneNode(true);
    source.className = "";
    source.append(document.createTextNode(labels.sourceLabel));
    source.removeAttribute("aria-label");
    actions.append(download, source);
    body.append(element("h3", "", labels.featuresTitle), list, element("h3", "", labels.requirementsTitle), element("p", "requirements", info.requirements), actions);
    content.append(header, figure, caption, body);
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add("modal-open");
  }

  if (typeof dialog.showModal === "function") {
    cards.forEach(card => {
      const button = card.querySelector(".detail-button");
      button.hidden = false;
      button.setAttribute("aria-label", labels.detailLabel.replace("{name}", card.querySelector("h3").textContent));
      button.setAttribute("aria-haspopup", "dialog");
      button.addEventListener("click", () => openDetails(card, button));
    });
    dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
    // Only close when both ends of a pointer click are on the backdrop.
    let backdropPressed = false;
    function outsideDialog(event) {
      const rect = dialog.getBoundingClientRect();
      return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    }
    dialog.addEventListener("pointerdown", event => { backdropPressed = event.target === dialog && outsideDialog(event); });
    dialog.addEventListener("click", event => {
      if (backdropPressed && event.target === dialog && outsideDialog(event)) dialog.close();
      backdropPressed = false;
    });
    dialog.addEventListener("close", () => {
      document.body.classList.remove("modal-open");
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    });
  }

  document.addEventListener("keydown", event => {
    const target = event.target;
    const typing = target instanceof Element && Boolean(target.closest("input, textarea, select, [contenteditable]:not([contenteditable='false'])"));
    if (event.key === "/" && !typing && !dialog.open && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
      search.focus();
    }
    if (event.key === "Escape" && target === search && search.value) {
      search.value = "";
      updateResults();
    }
  });
})();
