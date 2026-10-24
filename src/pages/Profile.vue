<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { posts } from '../data/forum.js'

const route = useRoute()
const name = computed(() => route.params.name || '飞翔')
const tab = ref('帖子')
const tabs = ['帖子', '评论', '收藏', '关于']
const mine = ref(posts.slice(0, 2))
</script>

<template>
  <main class="page page-narrow">
    <div class="page-col">
      <div class="card profile-head">
        <span class="avatar xl" style="background:#6a9bcc">飞</span>
        <div style="flex:1">
          <div style="display:flex;align-items:center;gap:10px">
            <h2 style="font-size:20px">{{ name }}</h2>
            <span class="pin">Lv.6</span>
          </div>
          <p class="sub" style="margin-top:4px">Java 后端 · 安徽合肥 · 加入于 2024-03 · 与 128 人互相关注</p>
          <p style="font-size:14px;color:var(--text-2);margin-top:8px">写代码，也写字。专注架构与极简设计。</p>
        </div>
        <button class="btn-outline" @click="$router.push('/settings')">编辑资料</button>
      </div>

      <div class="stat-strip card" style="padding:14px 20px">
        <div v-for="s in [{n:'86',l:'帖子'},{n:'1.2k',l:'获赞'},{n:'342',l:'粉丝'},{n:'96',l:'收藏'}]" :key="s.l">
          <div class="num" style="font-size:18px;font-weight:700">{{ s.n }}</div>
          <div class="sub">{{ s.l }}</div>
        </div>
      </div>

      <div class="feed-head">
        <button v-for="t in tabs" :key="t" class="chip" :class="{ active: tab === t }" @click="tab = t">{{ t }}</button>
      </div>

      <template v-if="tab === '帖子'">
        <div v-for="p in mine" :key="p.id" class="card" style="margin-bottom:14px;cursor:pointer" @click="$router.push(`/post/${p.id}`)">
          <h3 style="font-size:15px;font-weight:600">{{ p.title }}</h3>
          <p class="sub" style="margin-top:6px">{{ p.time }} · {{ p.likes }} 赞 · {{ p.comments }} 评论</p>
        </div>
      </template>
      <div v-else class="card empty-card">
        <p class="empty-big">{{ tab }}内容为空</p>
        <p class="empty-sub">这里还没有任何内容</p>
      </div>
    </div>

    <aside class="page-side">
      <div class="card">
        <h4>徽章墙</h4>
        <div class="badge-grid">
          <span v-for="b in ['🚀 首帖','🔥 热帖作者','✍️ 百日更','💬 话痨','⭐ 精华作者','🎁 周年庆']" :key="b" class="badge">{{ b }}</span>
        </div>
      </div>
    </aside>
  </main>
</template>
