# ztake 后端 API

基于 **Express 4** 的论坛后端服务，内存数据存储（开发期 Mock），接口结构已按真实业务分层，可直接替换为数据库实现。

## 启动

```bash
npm run dev:be        # 开发（文件变更自动重启）
npm start             # 生产
# 默认端口 3000，可用 PORT=4000 覆盖
```

## 接口一览

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | `/api/posts?board=dev` | 帖子列表（按板块筛选，置顶优先） |
| GET | `/api/posts/hot` | 热榜 Top5 |
| GET | `/api/posts/:id` | 帖子详情（含楼中楼评论树） |
| POST | `/api/posts` | 发布帖子 `{title, content, board, tags}` |
| POST | `/api/posts/:id/like` | 点赞 +1 |
| GET | `/api/posts/:id/comments` | 评论树 |
| POST | `/api/posts/:id/comments` | 发评论 `{content, parentId?}` |
| POST | `/api/auth/login` | 登录 `{email, password}` → 用户信息 + token |
| POST | `/api/auth/register` | 注册 `{email, name}` |
| GET | `/api/notifications` | 通知列表 |
| POST | `/api/notifications/read-all` | 全部已读 |
| GET | `/api/search?q=关键词` | 全文搜索（标题/摘要/标签） |
| GET | `/api/boards` | 板块列表 |
| GET | `/api/stats` | 社区数据 |
| GET | `/health` | 健康检查 |

统一响应格式：`{ code: 0, message: 'ok', data: ... }`，错误时 `code` 非 0 并返回对应 HTTP 状态码。

## 目录结构

```
backend/
├── package.json
└── src/
    ├── server.js          # 应用入口（中间件、日志、挂载路由）
    ├── routes/index.js    # 全部 API 路由（按资源分组）
    └── db.js              # 内存数据层 —— 替换数据库时只需改此文件
```

## 演进计划

- [ ] 数据持久化：SQLite（开发）/ PostgreSQL（生产），ORM 建议 Prisma
- [ ] 认证：JWT 签发 + bcrypt 密码哈希 + 路由守卫中间件
- [ ] 上传：帖子图片 → 本地/OSS
- [ ] 测试：Vitest + Supertest 接口测试
