import Vue from 'vue'
import Vuex from 'vuex'
import LocalDB from '@/localDB/localDB.js'

Vue.use(Vuex)

let user = LocalDB.getValue(LocalDB.userField)

if (!user) {
  user = LocalDB.createUserProfile()
}

console.log(user)

export default new Vuex.Store({
  state: {
    movies: undefined,
    onSearching: false,
    user: user,
    searchedTerms: LocalDB.getValue(user.SearchTermsDB),
    favorites: LocalDB.getValue(user.FavoriteDB)
  },
  mutations: {
    updateMovies (state, newValue) {
      Vue.set(state, 'movies', newValue)
    },
    updateOnSearching (state, newValue) {
      Vue.set(state, 'onSearching', newValue)
    },
    updateSearchedTerm (state, { query, toClear }) {
      let lastQueries = LocalDB.getValue(state.user.SearchTermsDB) || []
      let indexInSearchList = lastQueries.indexOf(query.trim())

      if (!toClear) {
        if (query && indexInSearchList === -1) {
          lastQueries.push(query)
        } else if (indexInSearchList > -1) {
          lastQueries.splice(indexInSearchList, 1)
          lastQueries.unshift(query)
        }
      } else {
        lastQueries.length = 0
      }

      LocalDB.setValue(user.SearchTermsDB, lastQueries)

      Vue.set(state, 'searchedTerms', lastQueries)
    },
    updateFavorites (state, newTerm) {
      let favorites = LocalDB.getValue(state.user.FavoriteDB)

      if (newTerm) {
        favorites.push(newTerm)
      }

      LocalDB.setValue(user.FavoriteDB, favorites)

      Vue.set(state, 'favorites', favorites)
    }
  },
  getters: {
    getMovies: state => state.movies,
    onSearching: state => state.onSearching,
    user: state => state.user,
    searchedTerms: state => state.searchedTerms,
    favorites: state => state.favorites
  }
})
