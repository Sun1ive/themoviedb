import axios from 'axios';
import config from '@/config';

const state = {
  page: 1,
};
const mutations = {};
const actions = {
  async fetchData({ commit }: any) {
    try {
      const { data } = await axios.get(`${
        config.URL
      }/discover/movie?page=1&include_video=false&include_adult=false&sort_by=popularity.desc&language=en-US&api_key=${
        config.apiKey
      }`);
      console.log(data);
    } catch (e) {
      throw new Error(`Error has occured ${e.response.data.status_message}`);
    }
  },
};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
