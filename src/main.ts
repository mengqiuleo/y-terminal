/*
 * @Author: Pan Jingyi
 * @Date: 2022-09-25 17:18:41
 * @LastEditTime: 2022-11-03 21:25:12
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import * as VueRouter from 'vue-router'
import routes from './config/routes'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)

// 路由
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
})
app.use(router)

// 状态管理
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.mount('#app')
