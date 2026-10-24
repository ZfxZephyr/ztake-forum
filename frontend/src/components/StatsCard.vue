<script setup>
import { stats } from '../data/forum.js'
</script>

<template>
  <div class="card">
    <h4>社区数据</h4>
    <div class="stats-grid">
      <div v-for="s in stats" :key="s.label">
        <div class="num">{{ s.num }}</div>
        <div class="lbl">{{ s.label }}</div>
      </div>
    </div>
  </div>
</template>
