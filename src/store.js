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
    favorites: LocalDB.getValue(user.FavoriteDB),
    stack: [],
    isGoingBack: false
  },
  mutations: {
    updateMovies (state, movies) {
      let favorites = state.favorites

      for (let i = 0; i < movies.length; i++) {
        let movie = movies[i]

        movie.isFavorite = favorites && favorites.indexOf(movie.ID) !== -1
      }

      Vue.set(state, 'movies', movies)
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
    updateFavorites (state, { id, isAdd }) {
      let favorites = LocalDB.getValue(state.user.FavoriteDB) || []

      if (id) {
        if (isAdd) {
          favorites.push(id)
        } else {
          let index = favorites.indexOf(id)

          if (index !== -1) {
            favorites.splice(index, 1)
          }
        }
      }

      LocalDB.setValue(user.FavoriteDB, favorites)

      Vue.set(state, 'favorites', favorites)
    },
    push (state, page) {
      state.stack.push(page)
    },
    toogleGoingBack (state, shouldGoBack) {
      state.isGoingBack = shouldGoBack
    }
  },
  getters: {
    getMovies: state => state.movies,
    onSearching: state => state.onSearching,
    user: state => state.user,
    searchedTerms: state => state.searchedTerms,
    favorites: state => state.favorites,
    stack: state => state.stack,
    isGoingBack: state => state.isGoingBack
  }
})
