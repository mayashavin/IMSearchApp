<template>
  <div class="movies-list--wrapper">
    <div class="movies-list--container" v-if="movies.length > 0">
      <movie-card v-for="movie in movies" :key="movie.imdbID" :movie="movie" class="movies-list-item"></movie-card>
    </div>
    <div class="empty-list--container" v-else>
      There is no result found.
    </div>
  </div>

</template>
<script>
import MovieCard from '@/components/MovieCard'

export default {
  name: 'MoviesList',
  props: ['movies'],
  data () {
    return {}
  },
  components: {
    'movie-card': MovieCard
  }
}
</script>
<style lang="less" scoped>
.movies-list--wrapper{
  .movies-list-item{
    margin: 1rem;
  }
}
</style>


