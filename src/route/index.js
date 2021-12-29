import { createRouter,createWebHashHistory} from "vue-router";

// 指定了相同的webpackChunkName，会合并打包成一个js文件。 把组件按组分块
const Home =  () => import(/* webpackChunkName: 'RouterModuleJs' */ '@/pages/home/index.vue')

const routes = [
    { path:'/', redirect:'/home' },
    {
        path:'/home',
        name:'home',
        component:Home
    },
]

// 导出路由
export const router = createRouter({
    history:createWebHashHistory(),
    routes
})