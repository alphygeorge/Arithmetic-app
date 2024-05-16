
import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    result: null,
    error: null
  },
  mutations: {
    setResult(state, result) {
      state.result = result;
    },
    setError(state, error) {
      state.error = error;
    }
  },
  actions: {
    async calculate({ commit }, { endpoint, num1, num2 }) {
      try {
        const response = await axios.post(`http://localhost:3000/${endpoint}`, { num1, num2 }, { withCredentials: true });
        commit('setResult', response.data.result);
        commit('setError', null);
      } catch (error) {
        commit('setResult', null);
        commit('setError', error.response.data.error);
      }
    }
  },
  getters: {
    result: state => state.result,
    error: state => state.error
  }
});
