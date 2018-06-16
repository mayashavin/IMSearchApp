<template>
  <div id="app">
    <v-app dark class="white--text">
      <v-toolbar fixed flat class="app-toolbar">
        <v-btn icon flat v-if="!isHomeScreen" @click.prevent="back">
          <v-icon>arrow_back_ios</v-icon>
        </v-btn>
        <v-toolbar-title class="app-title">IMSearch App</v-toolbar-title>
        <search v-on:search-query="triggerSearch" :class="searchExtraClass"></search>
      </v-toolbar>
      <main id="main-app-container" class="main">
        <router-view></router-view>
      </main>
    </v-app>
  </div>
</template>

<script>
import Search from '@/components/Search'
import omdb from '@/omdbSDK/omdb.js'

export default {
  name: 'app',
  components: {
    'search': Search
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

.main {
  text-align: center;
  margin-top: 56px;
  display: flex;
  height: ~"calc(100% - 56px)";
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
