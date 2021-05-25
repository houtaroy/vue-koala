export const asyncRoutes = [
  {
    path: '/',
    name: 'index',
    meta: { title: 'menu.home' },
    children: [
      {
        name: 'Home',
        component: (): any => import('@/views/Home.vue'),
        meta: { title: 'home', permission: ['home'] },
      },
      {
        path: '/about',
        name: 'About',
        component: (): any => import('@/views/About.vue'),
        meta: { title: 'home', permission: ['about'] },
      },
    ],
  },
];

export const constantRoutes = [];
