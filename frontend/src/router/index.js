import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const routes = [
  { path: '/login',    component: () => import('@/views/LoginView.vue'),
    meta: { layout: 'auth' } },
  { path: '/register', component: () => import('@/views/RegisterView.vue'),
    meta: { layout: 'auth' } },
  { path: '/',         component: () => import('@/views/DashboardView.vue'),
    meta: { requiresAuth: true } },
  { path: '/calendar', component: () => import('@/views/CalendarView.vue'),
    meta: { requiresAuth: true } },
  { path: '/todos',    component: () => import('@/views/TodoView.vue'),
    meta: { requiresAuth: true } },
  { path: '/admin',    component: () => import('@/views/AdminView.vue'),
    meta: { requiresAuth: true, role: 'admin' } },
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.token) return '/login';
  if (to.meta.role && auth.user?.role !== to.meta.role) return '/';
});

export default router;