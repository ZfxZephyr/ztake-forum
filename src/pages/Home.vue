<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import SideNav from '../components/SideNav.vue'
import PostCard from '../components/PostCard.vue'
import TrendingCard from '../components/TrendingCard.vue'
import StatsCard from '../components/StatsCard.vue'
import { boards, tabs, posts } from '../data/forum.js'

const route = useRoute()
const activeBoard = ref(boards.some(b => b.id === route.query.board) ? route.query.board : 'all')
const activeTab = ref('最新')
const loading = ref(false)

function selectBoard(id) {
  if (id === activeBoard.value) return
  activeBoard.value = id
  loading.value = true
  setTimeout(() => { loading.value = false }, 500)
}
</script>

<template>
  <main class="layout">
    <SideNav :boards="boards" :active="activeBoard" @select="selectBoard" />

    <section>
      <div class="feed-head">
        <button
          v-for="t in tabs" :key="t"
          class="chip" :class="{ active: activeTab === t }"
          @click="activeTab = t"
        >{{ t }}</button>
      </div>

      <template v-if="loading">
        <div class="skeleton" aria-hidden="true">
          <div class="sk" style="width:40px;height:40px;border-radius:99px"></div>
          <div style="flex:1;display:flex;flex-direction:column;gap:10px">
            <div class="sk" style="width:180px;height:12px"></div>
            <div class="sk" style="width:85%;height:16px"></div>
            <div class="sk" style="width:60%;height:12px"></div>
          </div>
        </div>
      </template>

      <template v-else>
        <PostCard
          v-for="post in (activeBoard === 'all' ? posts : posts.filter(p => p.board === activeBoard))"
          :key="post.id" :post="post"
        />
        <div v-if="activeBoard !== 'all' && !posts.some(p => p.board === activeBoard)" class="card empty-card">
          <p class="empty-big">该板块暂无内容</p>
          <p class="empty-sub">来发第一帖，开启这里的讨论吧</p>
          <router-link to="/compose" class="btn-primary" style="margin-top:16px">发布帖子</router-link>
        </div>
        <p class="empty" style="margin-top:20px">— 已经到底啦 · 点击加载更多 —</p>
      </template>
    </section>

    <aside class="sidebar-right">
      <TrendingCard />
      <StatsCard />
      <div class="card" style="background:var(--accent-soft);border-color:#f3ddd3">
        <h4 style="color:var(--accent)">每周精选</h4>
        <p style="font-size:13px;color:var(--text-2);line-height:1.6;margin-bottom:14px">
          订阅 newsletter，每周四获取社区精华内容汇总。
        </p>
        <button class="btn-primary" style="width:100%;justify-content:center">立即订阅</button>
      </div>
    </aside>
  </main>
</template>
