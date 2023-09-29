import { createRouter, createWebHistory } from 'vue-router';
import AuthPage from '@/views/AuthPage.vue';
import Home from '@/views/Home.vue';
import ProfilePage from '@/views/ProfilePage.vue';
import InfoPage from '@/views/InfoPage.vue';
import SettingsPage from '@/views/SettingsPage.vue';
import TrainerListPage from '@/views/TrainerListPage.vue';
import TrainerCreatePage from '@/views/TrainerCreatePage.vue';

const routes = [
  {
    path: '',
    name: 'Home',
    component: Home,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthPage,
  },
  {
    path: '/profile',
    name: 'ProfileDefault',
    component: ProfilePage,
    redirect: { name : 'Auth' },
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: ProfilePage,
    props: true,
  },
  {
    path: '/info',
    name: 'Info',
    component: InfoPage,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsPage,
  },
  {
    path: '/trainers',
    name: 'Trainers',
    component: TrainerListPage,
  },
  {
    path: '/trainer-create',
    name: 'TrainerCreate',
    component: TrainerCreatePage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
