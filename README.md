# ztake — 现代简约论坛

一套现代化、极简风格的社区论坛前端，基于 **Vue 3 + Vite** 构建。覆盖社区产品全链路 UI：首页信息流、帖子详情与评论、发帖编辑器、登录注册、个人主页、通知中心、搜索与设置，站内导航全部路由化打通。

![Tech](https://img.shields.io/badge/Vue-3.5-42b883) ![Vite](https://img.shields.io/badge/Vite-6-646cff) ![Router](https://img.shields.io/badge/vue--router-4-d97757) ![License](https://img.shields.io/badge/license-MIT-green)

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
npm install
npm run dev        # 开发环境 http://localhost:5173
npm run build      # 生产构建 → dist/
npm run preview    # 本地预览构建产物
```

## 📁 项目结构

```
forum-vue/
├── public/
│   └── favicon.svg              # 品牌 favicon
├── src/
│   ├── assets/                  # Logo（标准版 / 单色版）
│   ├── components/              # 通用组件
│   │   ├── AppHeader.vue        #   吸顶导航 + 搜索
│   │   ├── SideNav.vue          #   板块导航
│   │   ├── PostCard.vue         #   帖子卡片
│   │   ├── TrendingCard.vue     #   热榜 + 在线状态
│   │   └── StatsCard.vue        #   社区数据
│   ├── pages/                   # 8 个功能页面
│   ├── router/index.js          # 路由配置
│   ├── data/forum.js            # Mock 数据层（后续可替换为 API）
│   ├── styles/main.css          # 设计系统（CSS 变量 + 全部组件样式）
│   ├── App.vue
│   └── main.js
├── index.html
└── vite.config.js
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
