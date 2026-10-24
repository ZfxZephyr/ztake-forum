export const boards = [
  { id: 'all', name: '全部动态', icon: '◆', color: '#788c5d', bg: '#eef3ea', count: '1.2k' },
  { id: 'dev', name: '技术开发', icon: '⌘', color: '#788c5d', bg: '#eef3ea', count: '486' },
  { id: 'design', name: '设计灵感', icon: '◇', color: '#d97757', bg: '#fdf1ec', count: '312' },
  { id: 'life', name: '生活方式', icon: '☾', color: '#6a9bcc', bg: '#eaf1f7', count: '208' },
  { id: 'chat', name: '自在闲谈', icon: '✦', color: '#8a7bb8', bg: '#f1eef7', count: '164' }
]

export const tabs = ['最新', '热门', '精华', '关注']

export const posts = [
  {
    id: 1,
    author: '林一舟',
    avatarColor: '#788c5d',
    time: '25 分钟前',
    board: 'dev',
    pinned: true,
    title: '从零搭建一套轻量级社区系统的架构复盘：为什么我们放弃了微服务',
    excerpt: '三个月前立项时团队一致倾向微服务架构，但用户量预估和运维成本让我们重新算了一笔账。这篇文章记录了单体优先路线的完整决策过程、踩过的坑，以及最终上线后的性能数据……',
    content: [
      '三个月前立项时，团队一致倾向微服务架构——听起来现代、可扩展、简历好看。但我们把用户量预估和运维成本摆到桌面上重新算了一笔账，结论完全不同。',
      '第一，日活预估 2 万以内，单机 + 读写分离绰绰有余；第二，团队 4 人，没有专职运维，微服务的部署、链路追踪、服务治理成本会吞掉一半开发时间；第三，业务边界还没稳定，过早拆分只会制造分布式单体。',
      '最终我们采用"模块化单体"：代码内按领域分包，模块间只通过接口通信，为将来拆分留好缝。上线后 P99 延迟 87ms，月成本不到 200 元。',
      '复盘结论：架构选型的第一原则是匹配业务阶段，而不是追逐技术时尚。单体不丢人，过早微服务才丢人。'
    ],
    likes: 328, comments: 96, favorites: 41, views: '2.4k'
  },
  {
    id: 2,
    author: '苏晚',
    avatarColor: '#d97757',
    time: '1 小时前',
    board: 'design',
    pinned: false,
    title: '极简不等于空洞：聊聊留白比例、字重层级与信息密度的平衡',
    excerpt: '很多"简约设计"最后变成"没有设计"。分享一套实操方法：用 8pt 网格控制节奏，用三档字重建立层级，把色彩预算严格控制在 1 个强调色以内……',
    content: [
      '很多"简约设计"最后变成"没有设计"——元素删完了，信息也丢了。简约的本质是秩序，不是空。',
      '实操上我遵守三条：用 8pt 网格控制垂直节奏；用三档字重（400/600/700）建立层级，绝不多加；色彩预算只有 1 个强调色，其余全部中性色。',
      '留白不是浪费，是给重点内容让路。当所有东西都在喊，就没有人在听。'
    ],
    likes: 214, comments: 58, favorites: 127, views: '1.8k'
  },
  {
    id: 3,
    author: '周野',
    avatarColor: '#6a9bcc',
    time: '3 小时前',
    board: 'life',
    pinned: false,
    title: '连续 60 天早上 6 点起床是什么体验？数据、感受与崩溃记录',
    excerpt: '用手表记录了完整的睡眠和专注时长，前两周靠意志力，第三周开始身体自己醒了。第 38 天崩溃过一次，这里也如实写出来……',
    content: [
      '用手表记录了 60 天完整的睡眠和专注时长。前两周纯靠意志力，第三周开始身体会自己醒，第 38 天崩溃过一次——睡到中午，之后照常继续。',
      '数据结论：平均深睡增加 22 分钟，上午专注时长提升约 40%，但代价是 22 点后基本不能有社交。值不值，看你要什么。'
    ],
    likes: 187, comments: 143, favorites: 22, views: '3.1k'
  }
]

export const comments = [
  { id: 1, author: '陈默', avatarColor: '#8a7bb8', time: '18 分钟前', content: '模块化单体这个思路很务实，接口边界划清楚，后面拆分就是体力活了。请问领域分包时怎么避免模块间循环依赖？', likes: 24, replies: [
    { id: 11, author: '林一舟', avatarColor: '#788c5d', time: '12 分钟前', content: '约定单向依赖：domain 层不允许 import 上层模块，跨模块调用只走 expose 的接口包，CI 里加了依赖检查。', likes: 15 }
  ]},
  { id: 2, author: '赵拾光', avatarColor: '#788c5d', time: '40 分钟前', content: 'P99 87ms 这个数据很漂亮，单体 + 缓存做好确实不输微服务。', likes: 9, replies: [] },
  { id: 3, author: '苏晚', avatarColor: '#d97757', time: '1 小时前', content: '建议补一张模块依赖图，文字描述还是有点抽象。', likes: 6, replies: [] }
]

export const hotList = [
  { title: '从零搭建轻量级社区系统：为什么放弃微服务', meta: '328 赞 · 96 评论', id: 1 },
  { title: '极简不等于空洞：留白与密度的平衡', meta: '214 赞 · 58 评论', id: 2 },
  { title: '连续 60 天早起体验全记录', meta: '187 赞 · 143 评论', id: 3 },
  { title: '2026 值得关注的 8 个开源项目', meta: '156 赞 · 32 评论', id: 1 }
]

export const stats = [
  { num: '12.4k', label: '注册成员' },
  { num: '1,208', label: '今日新帖' },
  { num: '386', label: '本周话题' },
  { num: '98%', label: '回复率' }
]

export const notifications = [
  { id: 1, type: 'like', actor: '苏晚', avatarColor: '#d97757', text: '赞了你的帖子「从零搭建一套轻量级社区系统的架构复盘」', time: '5 分钟前', unread: true },
  { id: 2, type: 'reply', actor: '陈默', avatarColor: '#8a7bb8', text: '回复了你的评论：「模块化单体这个思路很务实……」', time: '18 分钟前', unread: true },
  { id: 3, type: 'follow', actor: '赵拾光', avatarColor: '#788c5d', text: '关注了你', time: '2 小时前', unread: true },
  { id: 4, type: 'mention', actor: '周野', avatarColor: '#6a9bcc', text: '在帖子中提到了你', time: '昨天', unread: false },
  { id: 5, type: 'system', actor: '系统', avatarColor: '#a0a09a', text: '你的账号已完成邮箱验证', time: '3 天前', unread: false }
]

export const searchResults = [
  { id: 1, title: '从零搭建一套轻量级社区系统的架构复盘', author: '林一舟', board: '技术开发', time: '25 分钟前', excerpt: '……我们采用"模块化单体"：代码内按领域分包，模块间只通过接口通信，为将来拆分留好缝。' },
  { id: 2, title: '极简不等于空洞：聊聊留白比例与信息密度', author: '苏晚', board: '设计灵感', time: '1 小时前', excerpt: '……用 8pt 网格控制垂直节奏，用三档字重建立层级，色彩预算只有 1 个强调色。' },
  { id: 3, title: '2026 值得关注的 8 个开源项目', author: '赵拾光', board: '技术开发', time: '昨天', excerpt: '……从数据库、前端框架到本地优先同步，都是社区里讨论度最高的项目。' }
]

export const boardLabel = { dev: '技术开发', design: '设计灵感', life: '生活方式', chat: '自在闲谈' }
export const boardClass = { dev: 'tag-dev', design: 'tag-design', life: 'tag-life', chat: 'tag-life' }
