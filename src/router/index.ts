import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      // component: () => import('@/views/Home.vue'),
      component: Home,
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('@/views/Favorites.vue'),
    },
    {
      path: '/movie/:id',
      name: 'movie-id',
      component: () => import('@/views/Movie.vue'),
      props: true,
    },
  ],
});
