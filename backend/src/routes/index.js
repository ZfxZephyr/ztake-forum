import { Router } from 'express'
import * as store from '../db.js'

const router = Router()

/* ---------- 帖子 ---------- */
router.get('/posts', (req, res) => {
  res.json(store.ok(store.listPosts({ board: req.query.board })))
})

router.get('/posts/hot', (_req, res) => res.json(store.ok(store.hotList())))

router.get('/posts/:id', (req, res) => {
  const post = store.getPost(req.params.id)
  post ? res.json(store.ok(post)) : res.status(404).json(store.fail('帖子不存在', 404))
})

router.post('/posts', (req, res) => {
  const { title, content } = req.body || {}
  if (!title?.trim() || !content?.trim()) {
    return res.status(400).json(store.fail('标题和正文不能为空', 400))
  }
  res.status(201).json(store.ok(store.createPost(req.body)))
})

router.post('/posts/:id/like', (req, res) => {
  const post = store.likePost(req.params.id)
  post ? res.json(store.ok(post)) : res.status(404).json(store.fail('帖子不存在', 404))
})

/* ---------- 评论 ---------- */
router.get('/posts/:id/comments', (req, res) => {
  const post = store.getPost(req.params.id)
  post ? res.json(store.ok(post.comments)) : res.status(404).json(store.fail('帖子不存在', 404))
})

router.post('/posts/:id/comments', (req, res) => {
  const comment = store.createComment({ ...req.body, postId: req.params.id })
  comment ? res.status(201).json(store.ok(comment)) : res.status(404).json(store.fail('帖子不存在', 404))
})

/* ---------- 认证 ---------- */
router.post('/auth/login', (req, res) => {
  const user = store.login(req.body || {})
  user ? res.json(store.ok(user)) : res.status(401).json(store.fail('邮箱或密码错误', 401))
})

router.post('/auth/register', (req, res) => {
  const { email, name } = req.body || {}
  if (!email?.includes('@')) return res.status(400).json(store.fail('邮箱格式不正确', 400))
  // TODO: 落库 + 密码哈希（bcrypt）+ 邮箱验证
  res.status(201).json(store.ok({ email, name: name || email.split('@')[0], message: '验证邮件已发送' }))
})

/* ---------- 通知 ---------- */
router.get('/notifications', (_req, res) => res.json(store.ok(store.listNotifications())))
router.post('/notifications/read-all', (_req, res) => res.json(store.ok(store.readAllNotifications())))

/* ---------- 其他 ---------- */
router.get('/search', (req, res) => res.json(store.ok(store.search(req.query.q))))
router.get('/boards', (_req, res) => res.json(store.ok(store.boards)))
router.get('/stats', (_req, res) => res.json(store.ok(store.stats())))

export default router
