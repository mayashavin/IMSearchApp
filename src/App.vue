<template>
  <div id="app">
    <v-app dark class="white--text" v-show="existingUser">
      <v-toolbar fixed flat class="app-toolbar">
        <v-btn icon flat v-if="!isHomeScreen" @click.prevent="back">
          <v-icon>arrow_back_ios</v-icon>
        </v-btn>
        <v-toolbar-title class="app-title">
          <img class="app-title-logo" alt="IMSearch Logo" src="./assets/logo_32.png"/>
          <div>IMSearch App</div>
        </v-toolbar-title>
        <search v-on:search-query="triggerSearch" :class="searchExtraClass"></search>
      </v-toolbar>
      <main id="main-app-container" class="main">
        <router-view></router-view>
      </main>
    </v-app>
    <div class="app-welcome black" v-show="!existingUser">
      <img class="app-welcome-logo" src="./assets/logo.png"/>
      <h3 class="white--text">Welcome to IM Search</h3>
      <div class="grey--text">Click on search to start</div>
      <search v-on:search-query="triggerSearch" class="app-welcome-search"></search>

    </div>
  </div>
</template>

<script>
import Search from '@/components/Search'
import LocalDB from '@/localDB/localDB.js'
import omdb from '@/omdbSDK/omdb.js'

export default {
  name: 'app',
  components: {
    'search': Search
  },
  mounted () {
    let user = this.$store.getters.user
    let searchedTerms = LocalDB.getValue(user.SearchTermsDB)

    if (searchedTerms && searchedTerms.length > 0) {
      let lastSearch = searchedTerms[0]
      this.triggerSearch(lastSearch)
    }
  },
  methods: {
    triggerSearch (query, specs) {
      if (query) {
        this.$router.push('/')

        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })

        this.$store.commit('updateOnSearching', true)
        this.$store.commit('updateSearchedTerm', { query })

        let data = new Map([['s', query]])

        if (specs && specs.byYear) {
          data.set('y', specs.byYear)
        }

        omdb.search(data).then(result => {
          this.$store.commit('updateMovies', result)
          this.$store.commit('updateOnSearching', false)
        })
      }
    },
    back () {
      document.getElementById('close-search-btn').click()
      if (this.$store.getters.isGoingBack) {
        this.$router.back()
      } else {
        this.$router.push('/')
      }
    }
  },
  computed: {
    isHomeScreen () {
      return ['movie'].indexOf(this.$route.name) === -1
    },
    searchExtraClass () {
      return {
        'with-back-btn': !this.isHomeScreen
      }
    },
    existingUser () {
      return this.$store.getters.getMovies
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
</style>

<style lang="less">
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.app-toolbar{
  height: auto !important;

  .toolbar__content{
    justify-content: space-between;
  }
}

.app-title{
  display:flex;
  align-items: center;

  .app-title-logo{
    margin-right: 0.5rem;
  }
}

.main {
  text-align: center;
  margin-top: 56px;
  display: flex;
  height: ~"calc(100% - 56px)";
}

.app-welcome{
  height: 100%;
  position: absolute;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  line-height: 1.5;

  .app-welcome-logo{
    margin: 1rem;
  }

  .app-welcome-search{
    margin: 1rem 1.5rem;
  }
}

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
    background: black#f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}

@media (max-width: 768px){
  .app-title{
    display: none;
  }

  .app-toolbar{
    .search-box-wrapper{
      margin-left: 0;
      margin-right: 0 !important;

      &.with-back-btn{
        margin-left: 0;
      }
    }
  }
}
</style>
