<template>
  <v-layout>
    <v-card flat class="movie-view--card">
      <v-card-media v-bind:src="movie.Poster" flat height="40%" class="poster--background">
      </v-card-media>
      <div class="movie-details--container grey lighten-3" >
        <img class="poster" v-bind:src="movie.Poster"/>
        <v-avatar dark color="amber" class="movie-play--btn" size="4.5rem">
          <!-- <v-icon dark class="movie-play-icon">local_play</v-icon>-->
          <h4 class="movie-rating">{{movie.imdbRating}}</h4>
        </v-avatar>
        <v-card-title class="movie-title--container black--text" >
          <div class="caption">{{movie.Year}}</div>
          <h3 class="movie-title mb-0">{{movie.Title}}</h3>
          <div class="movie-genres text-xs-center">
            <div class="movie-genre caption" v-for="genre in genres" :key="genre">{{genre}}</div>
          </div>
          <div class="movie-subtitle-container">
            <div class="movie-runtime--container black--text">
              <v-icon color="indigo" small class="movie-runtime--icon">access_time</v-icon>
              <div class="movie-runtime--text caption">{{movie.Runtime}}</div>
            </div>
            <div class="movie-rated--section" :class="ratedLabelClass">
              <div class="movie-rated--text white--text">{{movie.Rated}}</div>
            </div>
          </div>
        </v-card-title>
      </div>
    </v-card>
  </v-layout>
</template>
<script>
import omdb from '@/omdbSDK/omdb.js'

export default {
  name: 'MovieView',
  props: ['id'],
  beforeCreate () {
    let data = new Map([['i', this.$route.params.id]])

    omdb.retrieve(data).then(result => {
      this.movie = result
      console.log(result)
    })
  },
  data () {
    return {
      movie: {
        Genre: ''
      }
    }
  },
  computed: {
    genres () {
      return this.movie.Genre.split(', ')
    },
    ratedLabelClass () {
      return {
        'green darken-2': ['PG-13', 'PG'].indexOf(this.movie.Rated) !== -1,
        'red darken-1': ['M-18'].indexOf(this.movie.Rated) > -1
      }
    }
  }
}
</script>
<style lang="less">
.movie-view--card{
  width: 100%;
}

.poster--background{
  .card__media__background{
    background-position-y: top !important;

  }
}

.movie-details--container{
  position: relative;
  display: grid;
  grid-template-columns: 8rem auto;
  grid-gap: 0.5rem;
  min-height:60%;

  .poster{
    width: 7rem;
    position: absolute;
    top: -5rem;
    left: 1.5rem;
    box-shadow: 4px 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
  }

  .movie-play--btn{
    position: absolute;
    top: -35px;
    right: 1rem;
    box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12);

    .movie-play--icon{
      display:flex;
    }

    .movie-rating{
      font-size: 1.3rem;
    }

  }

    .movie-title--container{
      grid-column-start: 2;
      align-self: self-start;
      display: grid;
      justify-items: start;

      .movie-title{
        text-align: justify;
        font-size: 1.3rem;
        line-height: 1;
        font-weight: 600;
      }

      .movie-subtitle-container{
        display: flex;
        align-items: center;
      }

      .movie-genres{
        display:flex;
        justify-content: space-evenly;
        padding: 0.1rem 0;

        .movie-genre{
          &:not(:last-child){
            border-right: 1px solid lightgrey;
            padding-right: 0.5rem;
          }

          &:not(:first-child){
            padding-left: 0.5rem;
          }
        }
      }

      .movie-runtime--container{
        display:flex;
        align-items: center;

        .movie-runtime--text{
          padding: 0.2rem;
        }
      }

      .movie-rated--section{
        padding: 0.2rem 0.5rem;
        border-radius: 11px;
        font-size: 0.85rem;
        line-height: 1.2;
        margin: 0 0.5rem;
      }

    }
}
</style>


