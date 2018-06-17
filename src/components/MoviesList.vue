<template>
  <div class="movies-list--wrapper">
    <div class="movies-list-sort-options" v-show="movies && movies.length > 0">
      <v-switch :label="`A-Z`" id="movies-sort-by-alpha" color="green darken-1" class="movies-list-sort-btn" v-model="sortAlpha"></v-switch>
      <v-switch :label="`By year`" id="movies-sort-by-year" color="green darken-1" class="movies-list-sort-btn" v-model="sortByYear"></v-switch>
    </div>
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
      sortAlpha: false,
      scrollTopVisible: false,
      sortByYear: false
    }
  },
  computed: {
    displayMsg () {
      return this.movies ? (this.movies.error ? this.movies.error : 'No result found.') : 'Your movie list is empty.<br>Click on search to start'
    },
    displayIcon () {
      return this.movies ? 'sentiment_very_dissatisfied' : 'local_activity'
    },
    sortedMovies () {
      let sorted = [].concat(this.movies)

      sorted = sorted.sort((movieA, movieB) => {
        let compareTitle = movieA.Title.localeCompare(movieB.Title)
        let compareYear = movieB.Year - movieA.Year
        let result = 1

        if (this.sortAlpha && this.sortByYear) {
          result = compareTitle && compareYear
        } else if (this.sortAlpha) {
          result = compareTitle
        } else if (this.sortByYear) {
          result = compareYear
        }

        return result
      })

      return sorted
    }
  },
  methods: {
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
<style lang="less">
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

.movies-list-sort-btn {
  display:flex;
  .input-group__details {
    min-height:0;
  }
}

.movies-list-sort-options{
  display:flex;
  text-transform: uppercase;
  align-items: center;
  margin: 1rem 1rem 0 1rem;

  label{
    color:#9e9e9e !important;
  }
}

@media (max-width: 768px){
  .movies-list--container{
    grid-template-columns: 1fr 1fr;
  }
}
</style>


