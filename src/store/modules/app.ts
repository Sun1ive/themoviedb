import * as T from '@/Types/index.d.ts';

const state = {
  favorites: [],
} as T.IAppState;

const mutations = {
  setFavorites(state: T.IAppState, favorites: number[]) {
    state.favorites = favorites;
  },
  removeFromFavorite(state: T.IAppState, id: number) {
    const index = state.favorites.indexOf(id);
    state.favorites.splice(index, 1);
  },
  addToFavorite(state: T.IAppState, favorite: number) {
    if (state.favorites.indexOf(favorite) === -1) {
      state.favorites.push(favorite);
    }
  },
};

const getters = {
  getFavorites: (state: T.IAppState) => state.favorites,
};

export default { state, mutations, getters };
