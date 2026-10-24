// 内存数据库 —— 后续替换为真实数据库（如 Prisma + SQLite/PostgreSQL）时，只需保持导出接口不变
import { randomUUID } from 'node:crypto'

const now = () => new Date().toLocaleString('zh-CN', { hour12: false })

const db = {
  users: [
    { id: 'u1', name: '飞翔', email: 'feixiang@example.com', password: '******', avatarColor: '#6a9bcc', bio: '写代码，也写字。专注架构与极简设计。', level: 6, joinedAt: '2024-03-01' },
    { id: 'u2', name: '林一舟', email: 'lin@example.com', password: '******', avatarColor: '#788c5d', bio: '架构师', level: 5, joinedAt: '2024-05-12' }
  ],
  posts: [
    {
      id: 'p1', author: '林一舟', avatarColor: '#788c5d', board: 'dev', pinned: true,
      title: '从零搭建一套轻量级社区系统的架构复盘：为什么我们放弃了微服务',
      excerpt: '三个月前立项时团队一致倾向微服务架构，但用户量预估和运维成本让我们重新算了一笔账……',
      content: [
        '三个月前立项时，团队一致倾向微服务架构——听起来现代、可扩展、简历好看。但我们把用户量预估和运维成本摆到桌面上重新算了一笔账，结论完全不同。',
        '最终我们采用"模块化单体"：代码内按领域分包，模块间只通过接口通信，为将来拆分留好缝。上线后 P99 延迟 87ms，月成本不到 200 元。'
      ],
      tags: ['架构'], likes: 328, favorites: 41, views: 2400, createdAt: now()
    },
    {
      id: 'p2', author: '苏晚', avatarColor: '#d97757', board: 'design', pinned: false,
      title: '极简不等于空洞：聊聊留白比例、字重层级与信息密度的平衡',
      excerpt: '很多"简约设计"最后变成"没有设计"。分享一套实操方法……',
      content: ['用 8pt 网格控制垂直节奏；用三档字重建立层级；色彩预算只有 1 个强调色。'],
      tags: ['CSS', '产品'], likes: 214, favorites: 127, views: 1800, createdAt: now()
    },
    {
      id: 'p3', author: '周野', avatarColor: '#6a9bcc', board: 'life', pinned: false,
      title: '连续 60 天早上 6 点起床是什么体验？数据、感受与崩溃记录',
      excerpt: '用手表记录了完整的睡眠和专注时长……',
      content: ['平均深睡增加 22 分钟，上午专注时长提升约 40%，但代价是 22 点后基本不能有社交。'],
      tags: ['生活记录'], likes: 187, favorites: 22, views: 3100, createdAt: now()
    }
  ],
  comments: [
    { id: 'c1', postId: 'p1', author: '陈默', avatarColor: '#8a7bb8', content: '模块化单体这个思路很务实，请问怎么避免模块间循环依赖？', likes: 24, parentId: null, createdAt: now() },
    { id: 'c2', postId: 'p1', author: '林一舟', avatarColor: '#788c5d', content: '约定单向依赖，跨模块调用只走 expose 的接口包，CI 里加了依赖检查。', likes: 15, parentId: 'c1', createdAt: now() },
    { id: 'c3', postId: 'p1', author: '赵拾光', avatarColor: '#788c5d', content: 'P99 87ms 这个数据很漂亮。', likes: 9, parentId: null, createdAt: now() }
  ],
  notifications: [
    { id: randomUUID(), type: 'like', actor: '苏晚', avatarColor: '#d97757', text: '赞了你的帖子', postId: 'p1', unread: true, createdAt: now() },
    { id: randomUUID(), type: 'reply', actor: '陈默', avatarColor: '#8a7bb8', text: '回复了你的评论', postId: 'p1', unread: true, createdAt: now() },
    { id: randomUUID(), type: 'follow', actor: '赵拾光', avatarColor: '#788c5d', text: '关注了你', postId: null, unread: false, createdAt: now() }
  ]
}

export const boards = [
  { id: 'all', name: '全部动态', count: '1.2k' },
  { id: 'dev', name: '技术开发', count: '486' },
  { id: 'design', name: '设计灵感', count: '312' },
  { id: 'life', name: '生活方式', count: '208' },
  { id: 'chat', name: '自在闲谈', count: '164' }
]

// 统一响应包装
export const ok = (data) => ({ code: 0, message: 'ok', data })
export const fail = (message, code = 1) => ({ code, message, data: null })

export function listPosts({ board } = {}) {
  let list = [...db.posts].sort((a, b) => b.pinned - a.pinned)
  if (board && board !== 'all') list = list.filter(p => p.board === board)
  return list.map(p => ({ ...p, comments: db.comments.filter(c => c.postId === p.id && !c.parentId).length }))
}

export function getPost(id) {
  const post = db.posts.find(p => p.id === id)
  if (!post) return null
  return { ...post, comments: buildTree(id) }
}

function buildTree(postId) {
  const tops = db.comments.filter(c => c.postId === postId && !c.parentId)
  return tops.map(t => ({ ...t, replies: db.comments.filter(c => c.parentId === t.id) }))
}

export function createPost({ title, content, board = 'dev', tags = [], author = '飞翔', avatarColor = '#6a9bcc' }) {
  const post = {
    id: randomUUID().slice(0, 8), author, avatarColor, board, pinned: false,
    title, excerpt: String(content).slice(0, 80) + '…', content: [content],
    tags, likes: 0, favorites: 0, views: 0, createdAt: now()
  }
  db.posts.unshift(post)
  return post
}

export function createComment({ postId, content, author = '飞翔', avatarColor = '#6a9bcc', parentId = null }) {
  if (!db.posts.some(p => p.id === postId)) return null
  const comment = { id: randomUUID().slice(0, 8), postId, author, avatarColor, content, likes: 0, parentId, createdAt: now() }
  db.comments.push(comment)
  return comment
}

export function likePost(id) {
  const post = db.posts.find(p => p.id === id)
  if (!post) return null
  post.likes += 1
  return post
}

export function listNotifications() { return db.notifications }
export function readAllNotifications() { db.notifications.forEach(n => { n.unread = false }); return db.notifications }

export function search(q) {
  if (!q?.trim()) return []
  const kw = q.trim().toLowerCase()
  return db.posts.filter(p =>
    p.title.toLowerCase().includes(kw) ||
    p.excerpt.toLowerCase().includes(kw) ||
    p.tags.some(t => t.toLowerCase().includes(kw))
  )
}

export function login({ email, password }) {
  const user = db.users.find(u => u.email === email && u.password === password)
  if (!user) return null
  const { password: _, ...safe } = user
  return { ...safe, token: 'jwt-' + randomUUID() } // TODO: 替换为真实 JWT 签发
}

export function stats() {
  return {
    members: '12.4k', todayPosts: 1208,
    weeklyTopics: db.posts.length, replyRate: '98%'
  }
}

export function hotList() {
  return [...db.posts].sort((a, b) => b.likes - a.likes).slice(0, 5)
    .map(p => ({ id: p.id, title: p.title, meta: `${p.likes} 赞 · ${db.comments.filter(c => c.postId === p.id).length} 评论` }))
}
