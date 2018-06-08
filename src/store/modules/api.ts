import axios, { AxiosResponse } from 'axios';
import config from '@/config';
import * as T from '@/Types/index.d.ts';

const state = {
  page: 1,
  movies: [],
} as T.IApiState;

const mutations = {
  setMovies(state: T.IApiState, movies: T.IMovie[]) {
    state.movies = movies;
  },
};

const actions = {
  async fetchData({ state, commit }: any) {
    try {
      const { data }: AxiosResponse<T.IApiResponseObject> = await axios.get(`${config.URL}/discover/movie?page=${state.page}&include_video=true&language=ru-RU&api_key=${config.apiKey}`);
      commit('setMovies', data.results);
    } catch (e) {
      throw new Error(`Error has occured ${e.response.data.status_message}`);
    }
  },
};
const getters = {
  getMovies: (state: T.IApiState): T.IMovie[] => state.movies,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
