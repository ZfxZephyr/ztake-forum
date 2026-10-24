<script setup>
import { ref } from 'vue'

const title = ref('')
const body = ref('')
const board = ref('dev')
const tags = ref([])
const allTags = ['架构', '前端', 'CSS', '产品', '生活记录']
const boards = [
  { id: 'dev', name: '技术开发' },
  { id: 'design', name: '设计灵感' },
  { id: 'life', name: '生活方式' },
  { id: 'chat', name: '自在闲谈' }
]
const submitted = ref(false)

function publish() {
  if (!title.value.trim() || !body.value.trim()) return
  submitted.value = true
  setTimeout(() => { submitted.value = false }, 2000)
}
</script>

<template>
  <main class="page page-narrow">
    <div class="page-col">
      <div class="card">
        <h4>发布新帖</h4>
        <div class="form-block">
          <label>板块</label>
          <div class="chip-row">
            <button v-for="b in boards" :key="b.id" class="chip" :class="{ active: board === b.id }" @click="board = b.id">{{ b.name }}</button>
          </div>
        </div>
        <div class="form-block">
          <label>标题</label>
          <input v-model="title" class="text-input" placeholder="一句话说清你的主题（建议 8–30 字）" maxlength="60">
          <span class="hint">{{ title.length }}/60</span>
        </div>
        <div class="form-block">
          <label>正文</label>
          <div class="editor-toolbar">
            <button v-for="t in ['B','I','H2','引用','代码','图片','链接']" :key="t" class="tool-btn">{{ t }}</button>
          </div>
          <textarea v-model="body" rows="10" class="text-area" placeholder="正文内容，支持 Markdown 语法…"></textarea>
        </div>
        <div class="form-block">
          <label>标签（最多 3 个）</label>
          <div class="chip-row">
            <button
              v-for="t in allTags" :key="t"
              class="chip" :class="{ active: tags.includes(t) }"
              @click="tags.includes(t) ? tags = tags.filter(x => x !== t) : (tags.length < 3 && tags.push(t))"
            >{{ t }}</button>
          </div>
        </div>
        <div class="compose-foot">
          <span v-if="submitted" style="color:var(--green);font-size:13px">✓ 已发布到社区</span>
          <span v-else class="hint">发布即同意社区公约，请友善发言</span>
          <div style="display:flex;gap:10px">
            <button class="btn-outline">存草稿</button>
            <button class="btn-primary" @click="publish">发布帖子</button>
          </div>
        </div>
      </div>
    </div>
    <aside class="page-side">
      <div class="card">
        <h4>发帖指南</h4>
        <ul class="guide">
          <li>标题描述问题本身，而非求助情绪</li>
          <li>正文先给结论，再给过程和数据</li>
          <li>代码块用 ``` 包裹并注明语言</li>
          <li>选择正确的板块，拒绝标题党</li>
        </ul>
      </div>
    </aside>
  </main>
</template>
