import express from 'express'
import cors from 'cors'
import apiRouter from './routes/index.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// 简易请求日志
app.use((req, _res, next) => {
  console.log(`[${new Date().toLocaleTimeString('zh-CN', { hour12: false })}] ${req.method} ${req.url}`)
  next()
})

app.use('/api', apiRouter)

app.get('/health', (_req, res) => res.json({ status: 'up', service: 'ztake-backend' }))

// 404
app.use((_req, res) => res.status(404).json({ code: 404, message: 'not found' }))

app.listen(PORT, () => {
  console.log(`ztake service listening on http://localhost:${PORT}`)
})
