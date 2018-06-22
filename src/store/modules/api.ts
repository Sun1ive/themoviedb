import axios, { AxiosResponse } from 'axios';
import config from '@/config';
import * as T from '@/Types/index.d.ts';

const state = {
  page: 1,
  movies: [],
  genres: [],
  totalResults: 0,
} as T.IApiState;

const mutations = {
  setMovies(state: T.IApiState, movies: T.IMovie[]) {
    state.movies = movies;
  },
  setGenres(state: T.IApiState, genres: T.IGenre[]) {
    state.genres = genres;
  },
  setTotalResults(state: T.IApiState, results: number) {
    state.totalResults = results;
  },
};

const actions = {
  async fetchData({ state, commit }: any) {
    try {
      commit('setLoading', true);
      const { data }: AxiosResponse<T.IApiResponseObject> = await axios.get(
        `${config.URL}/3/movie/popular?api_key=${config.apiKey}&language=ru-RU&page=${state.page}`,
      );
      const { data: resp }: AxiosResponse<any> = await axios.get(
        `${config.URL}/3/genre/movie/list?&api_key=${config.apiKey}`,
      );
      commit('setMovies', data.results);
      commit('setTotalResults', data.total_results);
      commit('setGenres', resp.genres);
      commit('setLoading', false);
    } catch (e) {
      throw new Error(`Error has occured ${e.response.data.status_message}`);
    }
  },
  async fetchRecommendations(ctx: any, movieId: string | number) {
    try {
      const { data }: AxiosResponse<any> = await axios.get(
        `${config.URL}/3/movie/${movieId.toString()}/recommendations?api_key=${config.apiKey}`,
      );
      return data.results.slice(0, 4);
    } catch (e) {
      throw new Error(`Error has occured ${e.response.data.status_message}`);
    }
  },
};
const getters = {
  getMovies: (state: T.IApiState): T.IMovie[] => state.movies,
  getGenres: (state: T.IApiState): T.IGenre[] => state.genres,
  getPages: (state: T.IApiState): number => Math.ceil(state.totalResults / 20),
};

export default {
  state,
  mutations,
  actions,
  getters,
};
