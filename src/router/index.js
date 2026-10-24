import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import PostDetail from '../pages/PostDetail.vue'
import Compose from '../pages/Compose.vue'
import Login from '../pages/Login.vue'
import Profile from '../pages/Profile.vue'
import Notifications from '../pages/Notifications.vue'
import Search from '../pages/Search.vue'
import Settings from '../pages/Settings.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/post/:id', name: 'post', component: PostDetail },
    { path: '/compose', name: 'compose', component: Compose },
    { path: '/login', name: 'login', component: Login },
    { path: '/user/:name', name: 'profile', component: Profile },
    { path: '/notifications', name: 'notifications', component: Notifications },
    { path: '/search', name: 'search', component: Search },
    { path: '/settings', name: 'settings', component: Settings }
  ],
  scrollBehavior() { return { top: 0 } }
})

export default router
