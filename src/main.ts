/*
 * @Author: Pan Jingyi
 * @Date: 2022-09-25 17:18:41
 * @LastEditTime: 2022-09-25 18:27:49
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import * as VueRouter from "vue-router"
import routes from './config/routes'

const app = createApp(App)

// 路由
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});
app.use(router);

app.mount('#app')
