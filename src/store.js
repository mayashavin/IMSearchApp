import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies: [],
    onSearching: false
  },
  mutations: {
    updateMovies (state, newValue) {
      Vue.set(state, 'movies', newValue)
    },
    updateOnSearching (state, newValue) {
      Vue.set(state, 'onSearching', newValue)
    }
  },
  getters: {
    getMovies: state => state.movies,
    onSearching: state => state.onSearching
  }
})
