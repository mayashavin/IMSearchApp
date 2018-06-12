<template>
  <div id="app">
    <v-app dark class="white--text">
      <v-toolbar fixed flat class="app-toolbar" height="auto">
        <v-btn icon flat v-if="!isHomeScreen" @click.prevent="back">
          <v-icon>arrow_back_ios</v-icon>
        </v-btn>
        <v-toolbar-title class="app-title">IMSearch App</v-toolbar-title>
        <search v-on:search-query="triggerSearch" :class="searchExtraClass"></search>
      </v-toolbar>
      <main>
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
        this.$store.commit('updateOnSearching', true)

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
      this.$router.go(-1)
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

main {
  text-align: center;
  margin-top: 76px;
  display: flex;
  height: ~"calc(100% - 76px)";
}

@media (max-width: 768px){
  .app-title{
    display: none;
  }

  .app-toolbar{
    .search-box-wrapper{
      margin-left: 0.5rem;
      margin-right: 0 !important;

      &.with-back-btn{
        margin-left: 0;
      }
    }
  }
}
</style>
