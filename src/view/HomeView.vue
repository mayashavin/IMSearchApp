<template>
  <v-layout class="homepage" id="homepage">
    <div class="main-container">
      <movies-list :movies="movies"></movies-list>
    </div>
    <progress-bar :onShow="onSearching" :msg="onSearchMsg"></progress-bar>
  </v-layout>
</template>
<script>
import MoviesList from '@/components/MoviesList'
import ProgressBar from '@/components/ProgressBar'

export default {
  name: 'Home',
  components: {
    'movies-list': MoviesList,
    'progress-bar': ProgressBar
  },
  computed: {
    movies () {
      return this.$store.getters.getMovies
    },
    onSearching () {
      return this.$store.getters.onSearching
    }
  },
  data () {
    return {
      onSearchMsg: 'Hold on, searching now...'
    }
  }
}
</script>
<style lang="less">
  .homepage{
    width: inherit;

    .main-container{
      width: 100%;
      flex-direction: column;
    }
  }


</style>


