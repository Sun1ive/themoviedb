import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(Router);

export default new Router({
  base: process.env.baseUrl,
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('@/views/Favorites.vue'),
    },
    {
      path: '/:id',
      name: 'movie-id',
      component: () => import('@/views/Movie.vue'),
      props: true,
    },
  ],
});
