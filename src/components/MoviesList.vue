<template>
  <div class="movies-list--wrapper">
    <div class="movies-list--container" v-if="movies && movies.length > 0">
      <movie-card v-for="movie in sortedMovies" :key="movie.imdbID" :movie="movie" class="movies-list-item"></movie-card>
    </div>
    <div class="empty-list--container" v-else>
      <div class="movies-list-empty grey--text text--darken-2">
        <v-icon class="movies-list-search-icon" color="grey darken-2" x-large>{{displayIcon}}</v-icon>
        <div class="movies-list-msg" v-html="displayMsg"></div>
      </div>
    </div>
    <v-btn fab dark small color="green darken-2" class="movies-list-up-btn"
            v-if="movies && movies.length > 0 && scrollTopVisible"
            @click.prevent="backtoTop">
      <v-icon class="movies-list-up-icon" dark medium>arrow_upward</v-icon>
    </v-btn>
  </div>

</template>
<script>
import MovieCard from '@/components/MovieCard'

export default {
  name: 'MoviesList',
  props: ['movies'],
  components: {
    'movie-card': MovieCard
  },
  data () {
    return {
      onSortOption: {
        show: false,
        options: {
          alphaSort: false,
          yearSort: false
        }
      },
      scrollTopVisible: false
    }
  },
  computed: {
    displayMsg () {
      return this.movies ? (this.movies.error ? this.movies.error : 'No result found.') : 'Your movie list is empty.<br>Click on searh to start'
    },
    displayIcon () {
      return this.movies ? 'sentiment_very_dissatisfied' : 'local_activity'
    },
    sortBtnClass () {
      return {
        'sort-op-btn-active': this.onSortOption.show
      }
    },
    sortedMovies () {
      return this.movies
    }
  },
  methods: {
    toggleSortOption () {
      this.onSortOption.show = !this.onSortOption.show
    },
    toggleSortByAlpha () {
      this.onSortOption.options.alphaSort = !this.onSortOption.options.alphaSort
    },
    toggleSortByYear () {
      this.onSortOption.options.yearSort = !this.onSortOption.options.yearSort
    },
    isAtTop () {
      let main = document.getElementById('main-app-container')

      this.scrollTopVisible = main && main.getBoundingClientRect().top < 0
    },
    backtoTop () {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  },
  mounted () {
    this.isAtTop()
    window.addEventListener('scroll', () => { this.isAtTop() })
  }
}
</script>
<style lang="less" scoped>
.movies-list--wrapper{
  height: 100%;

  .empty-list--container{
    height: 100%;
    display:flex;
    justify-content: center;
    align-items: center;

    .movies-list-empty{
      display: flex;
      flex-direction: column;
    }

    .movies-list-msg{
      padding-top: 0.5rem;
      font-size: 1.1rem;
    }
  }

  .movies-list-item{
    margin: 1rem;
  }

  .movies-list-sort-icon, .movies-list-up-icon{
    display: flex;
  }

  .movies-list-up-btn{
    position: fixed;
    margin: 1rem;
    right: 0;
    bottom: 0;
  }

}

  .movies-list--container{
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  }

@media (max-width: 768px){
  .movies-list--container{
    grid-template-columns: 1fr 1fr;
  }
}
</style>


