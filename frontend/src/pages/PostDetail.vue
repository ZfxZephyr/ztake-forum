<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { posts, comments, boardLabel, boardClass } from '../data/forum.js'

const route = useRoute()
const post = computed(() => posts.find(p => String(p.id) === route.params.id) || posts[0])
const list = ref(comments)
const draft = ref('')
const liked = ref({})

function submit() {
  if (!draft.value.trim()) return
  list.value.push({
    id: Date.now(), author: '飞翔', avatarColor: '#6a9bcc',
    time: '刚刚', content: draft.value.trim(), likes: 0, replies: []
  })
  draft.value = ''
}
function toggleLike(id) { liked.value[id] = !liked.value[id] }
</script>

<template>
  <main class="page">
    <div class="page-col">
      <article class="card detail">
        <div class="post-meta">
          <span class="avatar" :style="{ background: post.avatarColor, cursor: 'pointer' }" @click="$router.push(`/user/${post.author}`)">{{ post.author[0] }}</span>
          <div @click="$router.push(`/user/${post.author}`)" style="cursor:pointer">
            <b>{{ post.author }}</b>
            <div class="sub">{{ post.time }} · {{ post.views }} 浏览</div>
          </div>
          <router-link class="tag" :class="boardClass[post.board]" :to="`/?board=${post.board}`">{{ boardLabel[post.board] }}</router-link>
        </div>
        <h1>{{ post.title }}</h1>
        <div class="detail-body">
          <p v-for="(para, i) in post.content" :key="i">{{ para }}</p>
        </div>
        <div class="detail-actions">
          <button class="action-btn" :class="{ on: liked.p }" @click="toggleLike('p')">▲ {{ post.likes + (liked.p ? 1 : 0) }}</button>
          <button class="action-btn">◈ 收藏 {{ post.favorites }}</button>
          <button class="action-btn">↗ 分享</button>
          <span style="margin-left:auto" class="sub">💬 {{ post.comments }} 条评论</span>
        </div>
      </article>

      <div class="card">
        <h4>{{ list.length }} 条评论</h4>
        <div class="comment-editor">
          <span class="avatar" style="background:#6a9bcc">飞</span>
          <textarea v-model="draft" rows="3" placeholder="写下你的评论…（支持 Markdown）"></textarea>
          <button class="btn-primary" @click="submit">发送</button>
        </div>
        <ul class="comment-list">
          <li v-for="c in list" :key="c.id">
            <span class="avatar sm" :style="{ background: c.avatarColor }">{{ c.author[0] }}</span>
            <div class="c-body">
              <div class="post-meta" style="margin-bottom:4px"><b class="link-author" @click="$router.push(`/user/${c.author}`)">{{ c.author }}</b><span class="sub">{{ c.time }}</span></div>
              <p class="c-text">{{ c.content }}</p>
              <div class="c-acts">
                <button class="action-btn mini" :class="{ on: liked[c.id] }" @click="toggleLike(c.id)">▲ {{ c.likes + (liked[c.id] ? 1 : 0) }}</button>
                <button class="action-btn mini">回复</button>
              </div>
              <div v-if="c.replies.length" class="replies">
                <div v-for="r in c.replies" :key="r.id" class="reply">
                  <span class="avatar sm" :style="{ background: r.avatarColor }">{{ r.author[0] }}</span>
                  <div>
                    <div class="post-meta" style="margin-bottom:2px"><b class="link-author" @click="$router.push(`/user/${r.author}`)">{{ r.author }}</b><span class="sub">{{ r.time }}</span></div>
                    <p class="c-text">{{ r.content }}</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <aside class="page-side">
      <div class="card">
        <h4>关于作者</h4>
        <div style="display:flex;align-items:center;gap:12px">
          <span class="avatar" :style="{ background: post.avatarColor }">{{ post.author[0] }}</span>
          <div>
            <b style="font-size:14px">{{ post.author }}</b>
            <div class="sub">社区贡献者 · 86 帖</div>
          </div>
        </div>
        <router-link :to="`/user/${post.author}`" class="btn-outline" style="margin-top:14px;width:100%;justify-content:center">查看主页</router-link>
      </div>
      <div class="card">
        <h4>相关推荐</h4>
        <ul class="rank">
          <li v-for="p in posts.filter(x => x.id !== post.id)" :key="p.id">
            <router-link :to="`/post/${p.id}`" style="display:block">
              {{ p.title }}
              <div class="meta">{{ p.likes }} 赞 · {{ p.comments }} 评论</div>
            </router-link>
          </li>
        </ul>
      </div>
    </aside>
  </main>
</template>
