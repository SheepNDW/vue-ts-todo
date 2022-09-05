import { createRouter, createWebHashHistory } from 'vue-router';

const Index = () => import('@/views/Index.vue');
const Login = () => import('@/views/Login/Index.vue');

const routes = [
  {
    path: '/',
    component: Index,
  },
  { path: '/login', component: Login },
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
