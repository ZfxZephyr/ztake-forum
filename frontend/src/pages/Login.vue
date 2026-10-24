<script setup>
import { ref } from 'vue'

const mode = ref('login')
const email = ref('')
const pwd = ref('')
const showPwd = ref(false)
const agree = ref(true)
const loading = ref(false)
const done = ref(false)

function submit() {
  if (!email.value || !pwd.value || loading.value) return
  loading.value = true
  setTimeout(() => { loading.value = false; done.value = true }, 900)
}
</script>

<template>
  <main class="auth">
    <div class="auth-card">
      <div class="auth-head">
        <svg width="40" height="40" viewBox="0 0 64 64" style="margin:0 auto 14px;display:block" aria-hidden="true">
          <defs><linearGradient id="lg-a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E08A6D"/><stop offset="1" stop-color="#D97757"/></linearGradient></defs>
          <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#lg-a)"/>
          <path d="M18 20h28v7L29 37h17v7H18v-7l17-10H18z" fill="#fff"/>
        </svg>
        <h2>{{ mode === 'login' ? '欢迎回来' : '加入 ztake' }}</h2>
        <p class="sub">{{ mode === 'login' ? '登录你的账号，继续社区生活' : '注册只需 30 秒，和 12.4k 成员一起交流' }}</p>
      </div>

      <template v-if="!done">
        <div class="form-block">
          <label>邮箱</label>
          <input v-model="email" type="email" class="text-input" placeholder="you@example.com">
        </div>
        <div class="form-block">
          <label>密码</label>
          <div class="pwd-wrap">
            <input v-model="pwd" :type="showPwd ? 'text' : 'password'" class="text-input" placeholder="至少 8 位，含字母和数字">
            <button class="pwd-toggle" @click="showPwd = !showPwd">{{ showPwd ? '隐藏' : '显示' }}</button>
          </div>
        </div>

        <div v-if="mode === 'login'" class="form-row">
          <label class="check"><input type="checkbox" v-model="agree"> 记住我</label>
          <a href="#" class="link">忘记密码？</a>
        </div>
        <p v-else class="form-row">
          <label class="check"><input type="checkbox" v-model="agree"> 我已阅读并同意<a href="#" class="link">社区公约</a></label>
        </p>

        <button class="btn-primary btn-block" :disabled="loading" @click="submit">
          {{ loading ? '正在' + (mode === 'login' ? '登录' : '注册') + '…' : (mode === 'login' ? '登录' : '注册') }}
        </button>

        <div class="divider"><span>或</span></div>
        <div class="oauth-row">
          <button class="oauth-btn" style="color:#24292f">GitHub</button>
          <button class="oauth-btn" style="color:#07c160">微信</button>
          <button class="oauth-btn" style="color:#1677ff">手机号</button>
        </div>

        <p class="auth-switch">
          {{ mode === 'login' ? '还没有账号？' : '已有账号？' }}
          <a href="#" class="link" @click.prevent="mode = mode === 'login' ? 'register' : 'login'">
            {{ mode === 'login' ? '立即注册' : '直接登录' }}
          </a>
        </p>
      </template>

      <div v-else class="auth-done">
        <div class="done-icon">✓</div>
        <p style="font-weight:600">操作成功</p>
        <p class="sub">{{ mode === 'login' ? '已登录，正在进入社区…' : '验证邮件已发送，请查收' }}</p>
      </div>
    </div>
  </main>
</template>
