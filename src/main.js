import { createApp } from 'vue'
import App from './App.vue'
import { router } from '@/route/index'
import 'reset-css' // 引入初始化样式的依赖
import store from './store' // 引入公共数据仓库
import axios from '@/utils/request' // 引入封装请求文件

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
// Vue3注册全局方法
app.config.globalProperties.$axios = axios // 注册全局方法
