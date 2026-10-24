<script setup>
import { ref, computed } from 'vue'
import { posts, searchResults } from '../data/forum.js'

const q = ref('架构')
const scope = ref('全部')
const scopes = ['全部', '帖子', '用户', '板块']
const results = computed(() => {
  if (!q.value.trim()) return []
  return searchResults.concat(posts.map(p => ({ id: p.id, title: p.title, author: p.author, board: '技术开发', time: p.time, excerpt: p.excerpt })))
    .filter((r, i, arr) => arr.findIndex(x => x.id === r.id) === i)
    .filter(r => r.title.includes(q.value.trim()) || r.excerpt.includes(q.value.trim()))
})
</script>

<template>
  <main class="page page-narrow">
    <div class="page-col">
      <label class="search" style="max-width:none;margin-bottom:16px">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
        <input v-model="q" placeholder="搜索话题、板块或用户">
      </label>
      <div class="feed-head">
        <button v-for="s in scopes" :key="s" class="chip" :class="{ active: scope === s }" @click="scope = s">{{ s }}</button>
        <span class="sub" style="margin-left:auto">找到 {{ results.length }} 条与「{{ q }}」相关的结果</span>
      </div>

      <div v-for="r in results" :key="r.id" class="card" style="margin-bottom:14px;cursor:pointer" @click="r.id && $router.push(`/post/${r.id}`)">
        <h3 style="font-size:15px;font-weight:600">{{ r.title }}</h3>
        <p style="font-size:13px;color:var(--text-2);line-height:1.6;margin-top:6px">{{ r.excerpt }}</p>
        <p class="sub" style="margin-top:8px">{{ r.author }} · {{ r.board }} · {{ r.time }}</p>
      </div>

      <div v-if="!results.length" class="card empty-card">
        <p class="empty-big">没有找到相关内容</p>
        <p class="empty-sub">换个关键词试试，或去社区发帖提问</p>
      </div>
    </div>

    <aside class="page-side">
      <div class="card">
        <h4>热门搜索</h4>
        <div class="chip-row">
          <button v-for="k in ['微服务','极简设计','早起挑战','开源项目','性能优化']" :key="k" class="chip" @click="q = k">{{ k }}</button>
        </div>
      </div>
    </aside>
  </main>
</template>
