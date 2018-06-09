import Vue from 'vue';
import Vuex from 'vuex';
import api from './modules/api';
import app from './modules/app';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    api,
    app,
  },
});
