<script setup>
defineProps({
  boards: { type: Array, required: true },
  active: { type: String, required: true }
})
defineEmits(['select'])
</script>

<template>
  <aside class="sidebar-left">
    <div class="side-title">板块</div>
    <ul class="side-list">
      <li v-for="b in boards" :key="b.id">
        <a href="#" :class="{ active: active === b.id }" @click.prevent="$emit('select', b.id)">
          <span class="pill" :style="{ background: b.bg, color: b.color }">{{ b.icon }}</span>
          {{ b.name }}
          <span class="cnt">{{ b.count }}</span>
        </a>
      </li>
    </ul>
    <hr class="hr">
    <div class="side-title">我的</div>
    <ul class="side-list">
      <li><a href="#">我的帖子</a></li>
      <li><a href="#">收藏夹</a></li>
      <li><a href="#">关注的人</a></li>
    </ul>
  </aside>
</template>
