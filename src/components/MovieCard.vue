<template>
  <v-layout style="flex-direction: column;">
   <v-flex class="movie-card--wrapper mobile">
      <v-card :to="movieLink">
        <v-container fluid grid-list-lg>
          <v-layout row class="movie-card--container">
            <v-flex>
              <img v-bind:src="movie.Poster" class="movie-card--poster"/>
            </v-flex>
            <v-flex class="movie-card--details">
              <div class="movie-card--title">{{movie.Title}}</div>
              <div class="subheading movie-card--text grey--text">({{movie.Year}})</div>
              <div class="body-1 movie-card--text grey--text" v-if="movie.Type !== 'movie'">{{movie.Type}}</div>
              <!-- <v-btn flat icon>
                <v-icon>arrow_forward_ios</v-icon>
              </v-btn> -->
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>

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
      return `/movie/${this.movie.imdbID}`
    }
  }
}
</script>
<style lang="less" scoped>
.movie-card--container{
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 0.5rem;

  .movie-card--poster{
    height: 10rem;
  }

  .movie-card--details{
    display: flex;
    align-items: flex-start;
    flex-direction: column;

    &.sticky{
      position: absolute;
      bottom: 0;
      opacity: 0;
    }

    .movie-card--title{
      text-align: left;
      font-size: 1.4rem;
    }

    .movie-card--text{
      text-transform: capitalize;
    }
  }
}

.movie-card--wrapper{
  &.desktop{
    .movie-card--container{
      display: flex;
      position: relative;

      .movie-card--poster{
        height: 20rem;
      }

      &:hover{
        .movie-card--details{
          opacity: 0.8;
          transform: ease-in 0.3s;
        }
      }
    }
  }
}

@media (max-width: 768px){
}
</style>

