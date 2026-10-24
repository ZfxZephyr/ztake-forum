# ztake-service — 后端服务

基于 **Spring Boot 3.3 + MyBatis Plus + MySQL** 的论坛后端，单服务架构，Maven 管理依赖，Apache Commons（lang3 / collections4）作为基础工具组件。Java 21。

## 技术栈

| 组件 | 选型 | 说明 |
|---|---|---|
| 框架 | Spring Boot 3.3.5 | Web + Validation |
| ORM | MyBatis Plus 3.5.7 | BaseMapper 零 SQL 增删改查，雪花 ID |
| 数据库 | MySQL 8 | `schema.sql` 启动时幂等建表 + 种子数据 |
| 基础组件 | Apache Commons Lang3 / Collections4 | 字符串与集合工具 |
| 构建 | Maven 3.8+ | 依赖管理 |
| Java | 21（LTS） | |

## 数据库准备

使用 ServBay 或任意 MySQL 8，创建数据库即可（表结构由应用启动时自动创建）：

```sql
CREATE DATABASE IF NOT EXISTS ztake DEFAULT CHARSET utf8mb4;
```

连接配置在 `src/main/resources/application.yml`（默认 `root/root@localhost:3306/ztake`，按实际修改）。

## 启动

```bash
# 仓库根目录
npm run build:be      # mvn package
npm run dev:be        # mvn spring-boot:run，端口 3000
```

前端开发模式下 `/api/*` 自动代理到本服务。

## 接口一览

统一响应：`{code, message, data}`，业务异常经全局处理器转换。

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | `/api/posts?board=dev` | 帖子列表（板块筛选，置顶优先） |
| GET | `/api/posts/hot` | 热榜 Top5 |
| GET | `/api/posts/{id}` | 帖子详情（含楼中楼评论树，浏览量 +1） |
| POST | `/api/posts` | 发布帖子 `{title, content, board, tags[]}` |
| POST | `/api/posts/{id}/like` | 点赞 +1 |
| GET | `/api/posts/{id}/comments` | 评论树 |
| POST | `/api/posts/{id}/comments` | 发评论 `{content, parentId?}` |
| POST | `/api/auth/login` | 登录 `{email, password}` → 用户信息 + token |
| POST | `/api/auth/register` | 注册 `{email, name?}` |
| GET | `/api/notifications` | 通知列表 |
| POST | `/api/notifications/read-all` | 全部已读 |
| GET | `/api/search?q=` | 搜索（标题/摘要/标签） |
| GET | `/api/stats` | 社区数据 |

## 目录结构

```
ztake-service/
├── pom.xml                                  # Maven 依赖
└── src/main/
    ├── java/com/ztake/service/
    │   ├── ZtakeApplication.java            # 启动类
    │   ├── common/                          # Result 统一响应 / BizException / 全局异常处理
    │   ├── config/WebConfig.java            # CORS 配置
    │   ├── controller/                      # Post / Auth / Notification / Common
    │   ├── dto/                             # 请求与视图对象（含校验注解）
    │   ├── entity/                          # MyBatis Plus 实体
    │   ├── mapper/                          # BaseMapper 接口
    │   └── service/ForumService.java        # 业务逻辑
    └── resources/
        ├── application.yml                  # 端口 / 数据源 / MyBatis Plus 配置
        └── schema.sql                       # 幂等建表 + 种子数据
```

## 演进计划

- [ ] 认证：Spring Security + JWT + BCrypt 密码哈希
- [ ] 分页：MyBatis Plus 分页插件
- [ ] 缓存：热点帖子 Redis 缓存
- [ ] 接口文档：springdoc-openapi (Swagger UI)
- [ ] 测试：Spring Boot Test + Testcontainers MySQL
