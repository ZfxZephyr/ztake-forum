# ztake — 现代简约论坛

一套现代化、极简风格的社区论坛，**Vue 3 + Vite 前端 + Express 后端** 的 monorepo 工程。覆盖社区产品全链路：首页信息流、帖子详情与评论、发帖编辑器、登录注册、个人主页、通知中心、搜索与设置，站内导航全部路由化打通，后端提供完整 REST API。

![Tech](https://img.shields.io/badge/Vue-3.5-42b883) ![Vite](https://img.shields.io/badge/Vite-6-646cff) ![Express](https://img.shields.io/badge/Express-4-000000) ![License](https://img.shields.io/badge/license-MIT-green)

## ✨ 设计理念

- **极简不等于空洞** —— 暖白底色（`#f7f7f5`）+ 单一陶土橙强调色（`#d97757`），色彩预算严格控制在 1 个强调色
- **秩序感** —— 8pt 网格垂直节奏，三档字重（400/600/700）建立层级，胶囊形组件语言统一
- **细节到位** —— 毛玻璃吸顶 Header、卡片 hover 浮起、在线人数呼吸灯、骨架屏加载态、空态引导、`prefers-reduced-motion` 无障碍适配

## 🧩 功能页面

| 页面 | 路由 | 说明 |
|---|---|---|
| 首页信息流 | `/` | 板块导航（点击筛选）、排序 tab、帖子卡片、热榜 / 在线人数 / 社区数据侧栏 |
| 帖子详情 | `#/post/:id` | 正文排版、点赞收藏分享、评论 + 楼中楼回复、可用的评论输入框 |
| 发帖编辑器 | `#/compose` | 板块选择、字数统计、Markdown 工具栏、标签（限 3 个）、草稿 |
| 登录 / 注册 | `#/login` | 双模式切换、密码显隐、第三方登录入口、加载 / 成功态 |
| 个人主页 | `#/user/:name` | 资料头 + 等级、数据条、内容 tab、徽章墙 |
| 通知中心 | `#/notifications` | 分类筛选、未读高亮、一键已读、点击跳转对应内容 |
| 搜索 | `#/search?q=` | Header 回车跳转、范围筛选、空态、热门关键词 |
| 设置 | `#/settings` | 账户 / 通知 / 外观 / 隐私四分区 |

品牌视觉：几何 Z 形 SVG Logo（含 `favicon` 与单色版），见 `public/favicon.svg`、`src/assets/`。

## 🚀 快速开始

```bash
git clone https://github.com/ZfxZephyr/ztake-forum.git
cd ztake-forum
npm install              # 一次性安装前后端依赖（npm workspaces）

npm run dev              # 同时启动前端(5173) + 后端(3000)
npm run dev:fe           # 仅前端
npm run dev:be           # 仅后端
npm run build            # 构建前端 → frontend/dist
npm start                # 启动后端生产服务
```

开发模式下前端 `/api/*` 请求自动代理到后端 `http://localhost:3000`（见 `ztake-ui/vite.config.js`）。后端接口文档见 [`ztake-service/README.md`](ztake-service/README.md)。

## 📁 项目结构

```
ztake-forum/
├── package.json              # monorepo 工作区（npm workspaces）
├── ztake-ui/                 # Vue 3 前端
│   ├── public/favicon.svg    # 品牌 favicon
│   ├── src/
│   │   ├── assets/           # Logo（标准版 / 单色版）
│   │   ├── components/       # AppHeader / SideNav / PostCard / TrendingCard / StatsCard
│   │   ├── pages/            # 8 个功能页面
│   │   ├── router/index.js   # 路由配置
│   │   ├── data/forum.js     # Mock 数据层（将逐步替换为 /api 调用）
│   │   └── styles/main.css   # 设计系统（CSS 变量 + 组件样式）
│   ├── index.html
│   └── vite.config.js        # 含 /api 代理
├── ztake-service/            # Express 4 后端（详见 ztake-service/README.md）
│   └── src/
│       ├── server.js         # 应用入口
│       ├── routes/index.js   # REST API 路由
│       └── db.js             # 数据层（内存 Mock，可替换为数据库）
└── docs/                     # 项目文档（规划中）
```

## 🎨 设计系统速查

| Token | 值 | 用途 |
|---|---|---|
| `--bg` | `#f7f7f5` | 页面底色 |
| `--surface` | `#ffffff` | 卡片表面 |
| `--accent` | `#d97757` | 唯一强调色（陶土橙） |
| `--green` / `--blue` | `#788c5d` / `#6a9bcc` | 辅助语义色 |
| `--radius` / `--radius-sm` | `14px` / `10px` | 卡片 / 控件圆角 |

全部颜色、圆角、阴影集中在 `src/styles/main.css` 的 `:root` 变量中，改一处即可全站生效。

## 🗺️ Roadmap

- [ ] 暗色模式（设置页外观 tab 已预留入口）
- [ ] Pinia 全局登录态 + 路由守卫
- [ ] 接入后端 API（`src/data/forum.js` 为替换点）
- [ ] 帖子 Markdown 渲染与代码高亮
- [ ] 无限滚动加载

## License

[MIT](LICENSE)
