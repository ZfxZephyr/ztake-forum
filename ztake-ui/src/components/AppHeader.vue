<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const navs = [
  { name: '首页', to: '/' },
  { name: '发帖', to: '/compose' },
  { name: '通知', to: '/notifications' },
  { name: '设置', to: '/settings' }
]
const active = ref('首页')
const q = ref('')

function doSearch() {
  router.push({ path: '/search', query: { q: q.value } })
}
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <router-link class="logo" to="/">
        <svg class="logo-svg" width="30" height="30" viewBox="0 0 64 64" aria-hidden="true">
          <defs><linearGradient id="lg-h" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E08A6D"/><stop offset="1" stop-color="#D97757"/></linearGradient></defs>
          <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#lg-h)"/>
          <path d="M18 20h28v7L29 37h17v7H18v-7l17-10H18z" fill="#fff"/>
        </svg>
        ztake
      </router-link>
      <nav class="nav">
        <router-link
          v-for="n in navs" :key="n.name" :to="n.to"
          :class="{ active: active === n.name }"
          @click="active = n.name"
        >{{ n.name }}</router-link>
      </nav>
      <label class="search">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
        <input v-model="q" placeholder="搜索话题、板块或用户" @keydown.enter="doSearch">
        <span class="kbd">⌘K</span>
      </label>
      <div class="header-actions">
        <button class="icon-btn" aria-label="通知" @click="router.push('/notifications')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>
          <span class="dot"></span>
        </button>
        <span class="avatar" style="background:#6a9bcc;cursor:pointer" @click="router.push('/user/飞翔')">飞</span>
        <button class="btn-primary" @click="router.push('/compose')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
          发帖
        </button>
      </div>
    </div>
  </header>
</template>
