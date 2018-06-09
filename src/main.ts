import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';
import App from './App.vue';
import router from './router/';
import store from './store/';
import './registerServiceWorker';
import './style/main.styl';

Vue.config.productionTip = false;
Vue.use(Vuetify);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
