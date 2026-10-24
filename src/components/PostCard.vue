<script setup>
import { boardLabel, boardClass } from '../data/forum.js'

defineProps({
  post: { type: Object, required: true }
})
</script>

<template>
  <article class="post" @click="$router.push(`/post/${post.id}`)">
    <span class="avatar" :style="{ background: post.avatarColor }">{{ post.author[0] }}</span>
    <div class="post-body">
      <div class="post-meta" @click.stop>
        <b class="link-author" @click="$router.push(`/user/${post.author}`)">{{ post.author }}</b><span>·</span><span>{{ post.time }}</span>
        <router-link class="tag" :class="boardClass[post.board]" :to="`/?board=${post.board}`">{{ boardLabel[post.board] }}</router-link>
        <span v-if="post.pinned" class="pin">置顶</span>
      </div>
      <h3>{{ post.title }}</h3>
      <p>{{ post.excerpt }}</p>
      <div class="post-foot">
        <span class="stat hot">▲ {{ post.likes }}</span>
        <span class="stat">💬 {{ post.comments }}</span>
        <span class="stat">◈ 收藏 {{ post.favorites }}</span>
        <span style="margin-left:auto">{{ post.views }} 浏览</span>
      </div>
    </div>
  </article>
</template>
