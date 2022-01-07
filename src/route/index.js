import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(
        /* webpackChunkName: 'RouterModuleJs' */ '@/pages/login/index.vue'
      ),
  },
  {
    path: '/home',
    name: 'home',
    component: () =>
      import(/* webpackChunkName: 'RouterModuleJs' */ '@/pages/home/index.vue'),
  },
];

// 导出路由
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
