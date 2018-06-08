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
      // const { data }: AxiosResponse<T.IApiResponseObject> = await axios.get(`${config.URL}/discover/movie?page=${state.page}&with_genres=all&include_video=true&language=ru-RU&api_key=${config.apiKey}`);
      /* eslint-disable-next-line */
      const { data }: AxiosResponse<T.IApiResponseObject> = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${config.apiKey}&language=en-US&page=${
          state.page
        }`);
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
