import axios, { AxiosResponse } from 'axios';
import config from '@/config';
import * as T from '@/Types/index.d.ts';

const state = {
  page: 1,
  movies: [],
  genres: [],
} as T.IApiState;

const mutations = {
  setMovies(state: T.IApiState, movies: T.IMovie[]) {
    state.movies = movies;
  },
  setGenres(state: T.IApiState, genres: T.IGenre[]) {
    state.genres = genres;
  },
};

const actions = {
  async fetchData({ state, commit }: any) {
    try {
      /* eslint-disable-next-line */
      const { data }: AxiosResponse<T.IApiResponseObject> = await axios.get(
        `${config.URL}/3/movie/popular?api_key=${config.apiKey}&language=ru-RU&page=${
          state.page
        }`);
      const resp = await axios.get(`${config.URL}/3/genre/movie/list?&api_key=${config.apiKey}`);
      commit('setGenres', resp.data.genres);
      commit('setMovies', data.results);
    } catch (e) {
      throw new Error(`Error has occured ${e.response.data.status_message}`);
    }
  },
  async fetchRecommendations(ctx: any, movieId: string | number) {
    try {
      const { data } = await axios.get(`${config.URL}/3/movie/${movieId}/recommendations?api_key=${config.apiKey}`);
      return data.results.slice(0, 4);
    } catch (e) {
      throw new Error(`Error has occured ${e.response.data.status_message}`);
    }
  },
};
const getters = {
  getMovies: (state: T.IApiState): T.IMovie[] => state.movies,
  getGenres: (state: T.IApiState): T.IGenre[] => state.genres,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
