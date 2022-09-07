import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';

const Index = () => import('@/views/Index.vue');
const Login = () => import('@/views/Login/Index.vue');

// 指定 RouteRecordRaw[] 型別，撰寫程式碼時就有 TS 的提示和檢查了
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Index,
    beforeEnter: () => {
      const token = localStorage.getItem('5xcampTodo');
      if (!token) return '/login';
    },
  },
  { path: '/login', component: Login },
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
