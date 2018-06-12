<template>
  <v-layout class="homepage" id="homepage">
    <div class="main-container">
      <movies-list :movies="movies"></movies-list>
    </div>
    <div class="progress-bar" v-show="onSearching">
      <v-progress-circular indeterminate color="blue-grey"></v-progress-circular>
      <div class="white--text progress-text">Hold on, searching now...</div>
    </div>
  </v-layout>
</template>
<script>
import MoviesList from '@/components/MoviesList'

export default {
  name: 'Home',
  components: {
    'movies-list': MoviesList
  },
  computed: {
    movies () {
      return this.$store.getters.getMovies
    },
    onSearching () {
      return this.$store.getters.onSearching
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

  .progress-bar{
    z-index: 2;
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .progress-text{
      padding: 0.5rem 0;
    }
  }
</style>


