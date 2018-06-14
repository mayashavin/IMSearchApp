<template>
  <!-- <v-layout style="flex-direction: column;" class="movie-card--wrapper mobile"> -->
      <v-card :to="movieLink" class="movie-card--container">
            <v-flex class="movie-card-poster-wrapper">
              <img v-bind:src="posterLink" class="movie-card--poster" v-if="posterLink !== 'N/A'" :alt="movie.Title"/>
              <div class="movie-card-no-poster" v-else><v-icon x-large color="grey darken-2">local_movies</v-icon></div>
            </v-flex>
            <v-flex class="movie-card--details">
              <div class="movie-card--title">{{movie.Title}}</div>
              <div class="caption movie-card--text grey--text">({{movie.Year}})</div>
              <div class="caption movie-card--text grey--text" v-if="movie.Type !== 'movie'">{{movie.Type}}</div>
              <!-- <v-btn flat icon>
                <v-icon>arrow_forward_ios</v-icon>
              </v-btn> -->
    </v-flex>

      </v-card>
  <!-- </v-layout> -->

</template>
<script>
export default {
  name: 'MovieCard',
  props: ['movie'],
  data () {
    return {
    }
  },
  computed: {
    movieLink () {
      return `/movie/${this.movie.ID}`
    },
    posterLink () {
      return `${this.movie.Poster}`
    }
  }
}
</script>
<style lang="less" scoped>
.movie-card--container{
  display: grid;
  grid-gap: 0.2rem;
  grid-template-rows: 17rem;

  .movie-card-poster-wrapper{
    height: 17rem;
    width: 100%;
    justify-content: center;
    align-items: center;
    display: flex;
  }

  .movie-card--poster{
    height: 15rem;
    width: 11rem;
    object-fit: contain;
  }

  .movie-card-no-poster{
    display: flex;
    height: 15rem;
    width: 11rem;
    justify-content: center;
    align-items: center;
    border: 1px solid #616161;
  }

  .movie-card--details{
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding: 0 1rem 0.5rem 1rem;

    .movie-card--title{
      text-align: left;
      font-size: 1.1rem;
    }

    .movie-card--text{
      text-transform: capitalize;
    }
  }
}
@media (max-width: 768px){
  .movie-card--container{
  grid-template-rows: 9.5rem;

  .movie-card-poster-wrapper{
    height: 10rem;
  }

  .movie-card--poster{
    height: 8rem;
    width: 6rem;
  }

  .movie-card-no-poster{
    height: 8rem;
    width: 6rem;
  }
}
}
</style>

