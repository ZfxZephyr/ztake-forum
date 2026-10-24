import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      // 前端请求 /api/* 时转发到后端服务
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
