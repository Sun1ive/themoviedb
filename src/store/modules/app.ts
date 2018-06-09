import * as T from '@/Types/index.d.ts';
import Vue from 'vue';

const state = {
  favorites: [],
} as T.IAppState;

const mutations = {
  setFavorites(state: T.IAppState, favorites: number[]) {
    state.favorites = favorites;
  },
  addToFavorite(state: T.IAppState, favorite: number) {
    if (state.favorites.indexOf(favorite) === -1) {
      Vue.set(state.favorites, state.favorites[state.favorites.length - 1], favorite);
    }
  },
};

const getters = {
  getFavorites: (state: T.IAppState) => state.favorites,
};

export default { state, mutations, getters };
