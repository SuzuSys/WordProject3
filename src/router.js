import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: { name: 'DashboardPage' },
  },
  {
    path: '/dashboard',
    name: 'DashboardPage',
    component: () => import('@/views/DashboardPage'),
  },
  {
    path: '/account',
    name: 'AccountPage',
    component: () => import('@/views/AccountPage'),
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;