import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';
import LocalStorage from '@/utils';
import router from '@/router';
import store from '@/store';
import App from './App.vue';
// import '@/registerServiceWorker';
import './style/main.styl';

Vue.config.productionTip = false;
Vue.use(Vuetify);

new Vue({
  created() {
    this.$store.dispatch('fetchData');
    const favorites = LocalStorage.get('favoriteMovies');
    if (favorites) {
      this.$store.commit('setFavorites', favorites);
    }
  },
  store,
  router,
  render: h => h(App),
}).$mount('#app');
