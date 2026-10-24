<script setup>
import { hotList } from '../data/forum.js'
</script>

<template>
  <div class="card">
    <div class="online">
      <span class="breath"></span>当前 <b style="color:var(--text)">1,284</b> 人在线
    </div>
    <div class="faces">
      <span class="avatar" style="background:#788c5d">林</span>
      <span class="avatar" style="background:#d97757">苏</span>
      <span class="avatar" style="background:#6a9bcc">周</span>
      <span class="avatar" style="background:#8a7bb8">陈</span>
      <span class="avatar more">+99</span>
    </div>
  </div>

  <div class="card">
    <h4>今日热榜</h4>
    <ul class="rank">
      <li v-for="(item, i) in hotList" :key="i">
        <span class="no">{{ i + 1 }}</span>
        <router-link v-if="item.id" :to="`/post/${item.id}`" style="display:block">
          {{ item.title }}
          <div class="meta">{{ item.meta }}</div>
        </router-link>
        <div v-else>
          {{ item.title }}
          <div class="meta">{{ item.meta }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
