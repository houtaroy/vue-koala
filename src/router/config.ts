import { RouteConfig } from 'vue-router';

// 动态路由配置
export const asyncRoutes: RouteConfig[] = [
  {
    path: '/',
    meta: { title: 'menu.home' },
    component: (): any => import('@/layouts/index.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: (): any => import('@/views/Home.vue'),
        meta: { title: 'home', permissions: ['home'] }
      },
      {
        path: 'about',
        name: 'About',
        component: (): any => import('@/views/About.vue'),
        meta: { title: 'about', permissions: ['about'] }
      }
    ]
  }
];

// 静态路由配置
export const constantRoutes: RouteConfig[] = [];
