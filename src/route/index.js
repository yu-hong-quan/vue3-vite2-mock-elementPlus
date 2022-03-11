import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  { path: '/', redirect: '/dashboard' },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
    },
    component: () =>
      import(/* webpackChunkName: 'login' */ '@/pages/login/index.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: () =>
      import(/* webpackChunkName: 'home' */ '@/pages/home/index.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          title: '系统首页',
        },
        component: () =>
          import(
            /* webpackChunkName: 'dashboard' */ '@/pages/home/dashboard/index.vue'
          ),
      },
      {
        path: '/table',
        name: 'basetable',
        meta: {
          title: '数据列表',
        },
        component: () =>
          import(
            /* webpackChunkName: "basetable" */ '@/pages/home/baseTable/index.vue'
          ),
      },
      {
        path: '/picturEditor',
        name: 'picturEditor',
        meta: {
          title: '图片编辑',
        },
        component: () =>
          import(
            /* webpackChunkName: "picturEditor" */ '@/pages/home/picturEditor/index.vue'
          ),
      },

      {
        path: '/tableDemo',
        name: 'tableDemo',
        meta: {
          title: '封装表格组件',
        },
        component: () =>
          import(
            /* webpackChunkName: "tableDemo" */ '@/pages/home/table/index.vue'
          ),
      },
      {
        path: '/form',
        name: 'baseform',
        meta: {
          title: '表单',
        },
        component: () =>
          import(
            /* webpackChunkName: "baseform" */ '@/pages/home/baseForm/index.vue'
          ),
      },
      {
        path: '/tabs',
        name: 'tabs',
        meta: {
          title: 'tab选项卡',
        },
        component: () =>
          import(/* webpackChunkName: "tabs" */ '@/pages/home/tabs/index.vue'),
      },
      {
        path: '/permission',
        name: 'permission',
        meta: {
          title: '权限管理',
          permission: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "permission" */ '@/pages/home/permission/index.vue'
          ),
      },
      {
        path: '/upload',
        name: 'upload',
        meta: {
          title: '上传插件',
          permission: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "upload" */ '@/pages/home/upload/index.vue'
          ),
      },
      {
        path: '/404',
        name: '404',
        meta: {
          title: '找不到页面',
        },
        component: () =>
          import(/* webpackChunkName: "404" */ '@/pages/home/404/index.vue'),
      },
      {
        path: '/403',
        name: '403',
        meta: {
          title: '没有权限',
          permission: true,
        },
        component: () =>
          import(/* webpackChunkName: "403" */ '@/pages/home/403/index.vue'),
      },
    ],
  },
];

// 导出路由
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | 内卷小屋`;
  const role = localStorage.getItem('ms_username');
  if (!role && to.path !== '/login') {
    next('/login');
  } else if (to.meta.permission) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === 'admin' ? next() : next('/403');
  } else {
    next();
  }
});

export default router;
