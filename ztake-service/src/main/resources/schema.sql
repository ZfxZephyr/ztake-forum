-- 幂等建表
CREATE TABLE IF NOT EXISTS `user` (
  `id`          VARCHAR(32)  NOT NULL,
  `name`        VARCHAR(50)  NOT NULL,
  `email`       VARCHAR(100) NOT NULL,
  `password`    VARCHAR(100) NOT NULL,
  `avatar_color` VARCHAR(16) NOT NULL DEFAULT '#6a9bcc',
  `bio`         VARCHAR(255) NULL,
  `level`       INT          NOT NULL DEFAULT 1,
  `created_at`  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `post` (
  `id`           VARCHAR(32)  NOT NULL,
  `author`       VARCHAR(50)  NOT NULL,
  `avatar_color` VARCHAR(16)  NOT NULL DEFAULT '#788c5d',
  `board`        VARCHAR(20)  NOT NULL,
  `pinned`       TINYINT(1)   NOT NULL DEFAULT 0,
  `title`        VARCHAR(120) NOT NULL,
  `excerpt`      VARCHAR(255) NOT NULL,
  `content`      TEXT         NOT NULL,
  `tags`         VARCHAR(255) NULL,
  `likes`        INT          NOT NULL DEFAULT 0,
  `favorites`    INT          NOT NULL DEFAULT 0,
  `views`        INT          NOT NULL DEFAULT 0,
  `created_at`   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_post_board` (`board`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `comment` (
  `id`           VARCHAR(32)  NOT NULL,
  `post_id`      VARCHAR(32)  NOT NULL,
  `parent_id`    VARCHAR(32)  NULL,
  `author`       VARCHAR(50)  NOT NULL,
  `avatar_color` VARCHAR(16)  NOT NULL DEFAULT '#8a7bb8',
  `content`      VARCHAR(2000) NOT NULL,
  `likes`        INT          NOT NULL DEFAULT 0,
  `created_at`   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_comment_post` (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `notification` (
  `id`           VARCHAR(32) NOT NULL,
  `type`         VARCHAR(20) NOT NULL,
  `actor`        VARCHAR(50) NOT NULL,
  `avatar_color` VARCHAR(16) NOT NULL DEFAULT '#a0a09a',
  `text`         VARCHAR(255) NOT NULL,
  `post_id`      VARCHAR(32) NULL,
  `unread`       TINYINT(1)  NOT NULL DEFAULT 1,
  `created_at`   DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 种子数据（重复执行不插入）
INSERT IGNORE INTO `user` (`id`,`name`,`email`,`password`,`avatar_color`,`bio`,`level`) VALUES
('u1','飞翔','feixiang@example.com','{noop}123456','#6a9bcc','写代码，也写字。专注架构与极简设计。',6),
('u2','林一舟','lin@example.com','{noop}123456','#788c5d','架构师',5);

INSERT IGNORE INTO `post` (`id`,`author`,`avatar_color`,`board`,`pinned`,`title`,`excerpt`,`content`,`tags`,`likes`,`favorites`,`views`) VALUES
('p1','林一舟','#788c5d','dev',1,'从零搭建一套轻量级社区系统的架构复盘：为什么我们放弃了微服务','三个月前立项时团队一致倾向微服务架构，但用户量预估和运维成本让我们重新算了一笔账……','三个月前立项时，团队一致倾向微服务架构——听起来现代、可扩展、简历好看。但我们把用户量预估和运维成本摆到桌面上重新算了一笔账，结论完全不同。\n\n最终我们采用"模块化单体"：代码内按领域分包，模块间只通过接口通信，为将来拆分留好缝。上线后 P99 延迟 87ms，月成本不到 200 元。','架构',328,41,2400),
('p2','苏晚','#d97757','design',0,'极简不等于空洞：聊聊留白比例、字重层级与信息密度的平衡','很多"简约设计"最后变成"没有设计"。分享一套实操方法……','用 8pt 网格控制垂直节奏；用三档字重建立层级；色彩预算只有 1 个强调色。','CSS,产品',214,127,1800),
('p3','周野','#6a9bcc','life',0,'连续 60 天早上 6 点起床是什么体验？数据、感受与崩溃记录','用手表记录了完整的睡眠和专注时长……','平均深睡增加 22 分钟，上午专注时长提升约 40%，但代价是 22 点后基本不能有社交。','生活记录',187,22,3100);

INSERT IGNORE INTO `comment` (`id`,`post_id`,`parent_id`,`author`,`avatar_color`,`content`,`likes`) VALUES
('c1','p1',NULL,'陈默','#8a7bb8','模块化单体这个思路很务实，请问怎么避免模块间循环依赖？',24),
('c2','p1','c1','林一舟','#788c5d','约定单向依赖，跨模块调用只走 expose 的接口包，CI 里加了依赖检查。',15),
('c3','p1',NULL,'赵拾光','#788c5d','P99 87ms 这个数据很漂亮。',9);
