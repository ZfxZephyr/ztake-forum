<script setup>
import { ref } from 'vue'

const tab = ref('账户')
const tabs = ['账户', '通知', '外观', '隐私']
const saved = ref(false)
function save() { saved.value = true; setTimeout(() => { saved.value = false }, 1500) }
</script>

<template>
  <main class="page page-narrow">
    <div class="page-col">
      <div class="feed-head">
        <button v-for="t in tabs" :key="t" class="chip" :class="{ active: tab === t }" @click="tab = t">{{ t }}</button>
      </div>

      <div class="card">
        <template v-if="tab === '账户'">
          <div class="form-block"><label>昵称</label><input class="text-input" value="飞翔"></div>
          <div class="form-block"><label>邮箱</label><input class="text-input" value="feixiang@example.com"><p class="hint">已验证</p></div>
          <div class="form-block"><label>个人简介</label><textarea class="text-area" rows="3">写代码，也写字。专注架构与极简设计。</textarea></div>
        </template>
        <template v-else-if="tab === '通知'">
          <label v-for="s in ['评论和回复','点赞与收藏','新粉丝','私信','每周精选']" :key="s" class="check" style="display:flex;margin-bottom:12px"><input type="checkbox" checked> {{ s }}</label>
        </template>
        <template v-else-if="tab === '外观'">
          <p class="sub" style="margin-bottom:12px">主题模式</p>
          <div class="chip-row" style="margin-bottom:20px">
            <button class="chip active">浅色</button><button class="chip">深色</button><button class="chip">跟随系统</button>
          </div>
          <p class="sub" style="margin-bottom:12px">内容密度</p>
          <div class="chip-row"><button class="chip active">舒适</button><button class="chip">紧凑</button></div>
        </template>
        <template v-else>
          <label v-for="s in ['公开我的关注列表','允许陌生人私信','在搜索结果中展示我的主页']" :key="s" class="check" style="display:flex;margin-bottom:12px"><input type="checkbox"> {{ s }}</label>
          <hr class="hr">
          <button class="danger-btn">注销账号</button>
        </template>
      </div>

      <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:4px">
        <button class="btn-outline">取消</button>
        <button class="btn-primary" @click="save">{{ saved ? '✓ 已保存' : '保存修改' }}</button>
      </div>
    </div>

    <aside class="page-side">
      <div class="card">
        <h4>登录设备</h4>
        <div v-for="d in [{n:'Chrome · Windows',t:'当前设备'},{n:'ztake App · iOS',t:'2 小时前'}]" :key="d.n" style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border);font-size:13px">
          <span>{{ d.n }}</span><span class="sub">{{ d.t }}</span>
        </div>
      </div>
    </aside>
  </main>
</template>
