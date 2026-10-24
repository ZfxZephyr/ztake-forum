<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { notifications } from '../data/forum.js'

const router = useRouter()
const tab = ref('全部')
const tabs = ['全部', '未读', '赞和收藏', '回复', '关注', '系统']
const list = ref(notifications)

function go(n) {
  n.unread = false
  if (n.type === 'follow') router.push(`/user/${n.actor}`)
  else if (n.type !== 'system') router.push('/post/1')
}

const filtered = computed(() => {
  if (tab.value === '未读') return list.value.filter(n => n.unread)
  if (tab.value === '系统') return list.value.filter(n => n.type === 'system')
  if (tab.value === '赞和收藏') return list.value.filter(n => n.type === 'like')
  if (tab.value === '回复') return list.value.filter(n => n.type === 'reply' || n.type === 'mention')
  if (tab.value === '关注') return list.value.filter(n => n.type === 'follow')
  return list.value
})
const typeLabel = { like: '赞', reply: '回复', follow: '关注', mention: '提及', system: '系统' }
function markAll() { list.value.forEach(n => { n.unread = false }) }
</script>

<template>
  <main class="page page-narrow">
    <div class="page-col">
      <div class="feed-head" style="justify-content:space-between">
        <div style="display:flex;gap:8px">
          <button v-for="t in tabs" :key="t" class="chip" :class="{ active: tab === t }" @click="tab = t">{{ t }}</button>
        </div>
        <button class="action-btn mini" @click="markAll">全部已读</button>
      </div>

      <div class="card" style="padding:0;overflow:hidden">
        <div v-for="n in filtered" :key="n.id" class="notice" :class="{ unread: n.unread }" style="cursor:pointer"
             @click="go(n)">
          <span class="avatar" :style="{ background: n.avatarColor }">{{ n.actor[0] }}</span>
          <div style="flex:1;min-width:0">
            <p style="font-size:14px"><b>{{ n.actor }}</b> {{ n.text }}</p>
            <p class="sub" style="margin-top:2px">{{ n.time }}</p>
          </div>
          <span v-if="n.unread" class="unread-dot"></span>
        </div>
        <p v-if="!filtered.length" class="empty-card" style="margin:0">
          <span class="empty-big">没有更多通知</span>
        </p>
      </div>
    </div>

    <aside class="page-side">
      <div class="card">
        <h4>通知设置</h4>
        <label v-for="s in ['有人赞我时','有人回复我时','有人关注我时','每周精选邮件']" :key="s" class="check" style="margin-bottom:10px;display:flex">
          <input type="checkbox" checked> {{ s }}
        </label>
      </div>
    </aside>
  </main>
</template>
