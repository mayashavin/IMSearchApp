<template>
  <v-layout>
    <v-card flat class="movie-view--card" v-show="!onLoad">
      <v-card-media v-bind:src="movie.Poster" flat  height="25rem" class="poster--background">
        <v-card-text v-if="movie.Poster === 'N/A'" class="text-xs-center title grey--text text--darken-2 movie-poster--text-wrapper">
          <div class="movie-poster--text">{{movie.Title}}</div></v-card-text>
      </v-card-media>
      <div class="movie-details--container grey lighten-3" >
        <div class="movie-view-poster-wrapper white">
          <img class="poster" v-bind:src="movie.Poster" :alt="movie.Title" v-if="movie.Poster !== 'N/A'"/>
          <div class="movie-details-no-poster grey darken-3" v-else><v-icon x-large color="grey darken-2">local_movies</v-icon></div>
        </div>
        <v-avatar dark color="amber" class="movie-rating-label movie-square-label" size="4.5rem">
          <h4 class="movie-rating">{{movie.Rating}}</h4>
        </v-avatar>
        <v-card-title class="movie-title--container black--text">
          <div class="caption" v-if="movie.Year && movie.Type" >{{movie.Year}}</div>
          <h3 class="movie-title mb-0">{{movie.Title}}</h3>
          <div class="movie-genres text-xs-center">
            <div class="movie-genre caption" v-for="genre in genres" :key="genre">{{genre}}</div>
          </div>
          <div class="movie-subtitle--container" v-if="formattedRuntime || hasRateLabel || movie.Type">
            <div class="movie-subtitle--section black--text" v-if="movie.Type">
              <v-icon color="indigo" small class="movie-subtitle--icon">local_movies</v-icon>
              <div class="movie-subtitle--text caption">{{capitalize(movie.Type)}}</div>
            </div>
            <!-- <div class="caption" v-if="movie.Type">{{capitalize(movie.Type)}}</div> -->
            <div class="movie-subtitle--section black--text" v-if="formattedRuntime">
              <v-icon color="indigo" small class="movie-subtitle--icon">access_time</v-icon>
              <div class="movie-subtitle--text caption">{{formattedRuntime}}</div>
            </div>
            <div class="movie-rated--section" :class="ratedLabelClass" v-if="hasRateLabel">
              <div class="movie-rated--text white--text">{{movie.Rated}}</div>
            </div>
          </div>
        </v-card-title>
        <div class="movie-subdetails--section grey darken-4 black--text">
          <div class="grey lighten-3">
            <v-btn :class="favoriteBtn.class" @click.prevent="toogleFavorite">
              <v-icon left dark >{{favoriteBtn.icon}}</v-icon>
              {{favoriteBtn.label}}
            </v-btn>
          </div>
          <div class="movie-ratings--section grey lighten-3" v-if="movie.Ratings">
            <div v-for="rating in ratings" :key="rating.Source" class="movie-rating-list-item" v-if="rating.Source !== 'IMDB'">
              <v-avatar :class="rating.ScoreColor" class="movie-rating-score-container white--text movie-square-label" size="3.5rem">
                <div class="movie-rating-score">{{rating.Value}}</div>
                <div class="movie-rating-base" v-if="rating.Base">{{rating.Base}}</div>
              </v-avatar>
              <div class="movie-rating-source" :class="rating.SourceColor">{{rating.Source}}</div>
            </div>
          </div>
           <v-tabs centered light color="grey lighten-3" grow>
            <v-tabs-slider color="green darken-3"></v-tabs-slider>
            <v-tab href="#movie-info--tab">
              Details
            </v-tab>
            <v-tab href="#movie-plot--tab">
              Plot
            </v-tab>
            <v-tab-item id="movie-info--tab">
              <v-card class="movie-info--section movie-view--card">
                <v-card-title class="movie-view--card-heading">Cast</v-card-title>
                <v-card-text class="movie-cast-list">
                  <div class="movie-cast-item" v-for="actor in mainActors" :key="actor" v-if="actor">
                    <span class="white--text">{{actor}}</span>
                  </div>
                </v-card-text>
                <div class="movie-info--line-wrapper" v-if="movie.Director">
                  <v-divider></v-divider>
                  <div class="movie-info--line">
                    <div class="white--text">Director:&nbsp;</div><div class="grey--text text--lighten-1">{{movie.Director}}</div>
                  </div>
                </div>
                <div class="movie-info--line-wrapper" v-if="writersStr">
                  <v-divider></v-divider>
                  <div class="movie-info--line">
                    <div class="white--text">Writer:&nbsp;</div><div class="grey--text text--lighten-1">{{writersStr}}</div>
                  </div>
                </div>
              </v-card>
              <v-card class="movie-view--card" v-if="movie.Awards">
                <v-card-title class="movie-view--card-heading">Awards</v-card-title>
                <div class="movie-info--line-wrapper with-bottom-padding">
                  <div :class="{'white--text': index === 0, 'grey--text text--lighten-1 movie-info--line-subtext': index !== 0}" class="white--text text-xs-left" v-for="(award, index) in awards" :key="index">
                    {{award}}
                  </div>
                </div>
              </v-card>
               <v-card class="movie-view--card" v-if="detailsSections">
                <v-card-title class="movie-view--card-heading">Details</v-card-title>
                <div class="movie-info--line-wrapper" v-for="(section, index) in detailsSections" :key="index">
                  <v-divider v-if="index > 0"></v-divider>
                  <div class="movie-info--line">
                    <div class="white--text">{{formatLabelWithSpace(section.label)}}:&nbsp;</div><div class="grey--text text--lighten-1">{{section.value}}</div>
                  </div>
                </div>
              </v-card>
            </v-tab-item>
            <v-tab-item id="movie-plot--tab">
              <v-card flat class="movie-plot-tab-container">
                <v-card-title class="movie-view--card-heading">Plot</v-card-title>
                <div class="movie-info--line-wrapper">
                  <div class="movie-info--line">
                    <div class="white--text text-xs-justify">{{movie.Plot}}</div>
                  </div>
                </div>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </div>
      </div>
    </v-card>
    <progress-bar :onShow="onLoad" :msg="loadMsg"></progress-bar>
    <div class="movie-view-actions-wrapper" :class="actionsShowClass" v-show="!onLoad">
      <v-btn fab dark small color="orange darken-3" class="movie-view-action-btn"
            tooltip="Buy ticket" @click.prevent="orderTicket" v-if="comingSoon">
        <v-icon dark class="movie-view-action-icon">local_play</v-icon>
      </v-btn>
      <v-btn fab dark small color="blue darken-2" class="movie-view-action-btn"
            tooltip="Visit website" @click.prevent="goToWebsite">
        <v-icon dark class="movie-view-action-icon">public</v-icon>
      </v-btn>
      <v-btn fab dark medium color="green darken-3" class="movie-view-action-btn"
            @click.prevent="toggleActionList">
        <v-icon dark class="movie-view-action-icon">more_vert</v-icon>
      </v-btn>
    </div>
  </v-layout>
</template>
<script>
import ProgressBar from '@/components/ProgressBar'
import omdb from '@/omdbSDK/omdb.js'

export default {
  name: 'MovieView',
  props: ['id'],
  components: {
    'progress-bar': ProgressBar
  },
  beforeCreate () {
    window.scrollTo(0, 0)

    let data = new Map([['i', this.$route.params.id]])

    omdb.retrieve(data).then(result => {
      this.movie = result
      let favorites = this.$store.getters.favorites
      this.isFavorite = favorites && favorites.indexOf(this.id) !== -1
      this.onLoad = false
    })
  },
  data () {
    return {
      movie: {},
      onLoad: true,
      loadMsg: 'One tiny moment...',
      isFavorite: false,
      actionsShow: false
    }
  },
  computed: {
    websiteLink () {
      return this.movie.Website && this.movie.Website !== 'N/A' ? this.movie.Website : `https://www.imdb.com/title/${this.$route.params.id}`
    },
    favoriteBtn () {
      return {
        label: this.isFavorite ? `Remove from favorite` : 'Add to favorite',
        icon: this.isFavorite ? 'favorite' : 'favorite_border',
        class: this.isFavorite ? 'favorite-btn-remove btn--outline pink--text' : 'pink white--text'
      }
    },
    ratings () {
      const sources = {
        'Internet Movie Database': 'IMDB',
        'Rotten Tomatoes': 'RT',
        'Metacritic': 'Metascore'
      }
      const color = {
        IMDB: {
          score: ['amber darken-1'],
          source: ['amber--text text--darken-1']
        },
        Metascore: {
          score: ['light-green darken-1'],
          source: ['light-green--text text--darken-1']
        },
        RT: {
          score: ['deep-orange lighten-1'],
          source: ['deep-orange--text text--darken-1']
        }
      }

      let ratings = []

      if (this.movie.Ratings) {
        for (let i = 0; i < this.movie.Ratings.length; i++) {
          let rating = this.movie.Ratings[i]
          let source = sources[rating.Source] || rating.Source
          let score = rating.Value.trim().split('/')

          ratings.push({
            Source: source,
            Value: `${score[0] || ''}`,
            Base: `${score[1] || ''}`,
            ScoreColor: color[source].score,
            SourceColor: color[source].source
          })
        }
      }

      return ratings
    },
    genres () {
      return this.convertStrToList(this.movie.Genre)
    },
    hasRateLabel () {
      return this.movie.Rated && ['N/A', 'NOT RATED'].indexOf(this.movie.Rated) === -1
    },
    ratedLabelClass () {
      return {
        'green darken-2': ['PG-13', 'PG', 'G', 'TV-Y', 'TV-Y7', 'TV-G', 'TV-PG', 'TV-14'].indexOf(this.movie.Rated) !== -1,
        'red darken-1': ['M-18', 'M', 'R', 'TV-MA'].indexOf(this.movie.Rated) > -1,
        'red darken-3': ['NC-17'].indexOf(this.movie.Rated) > -1
      }
    },
    formattedRuntime () {
      let formatted = ''
      const timeRate = 60

      if (this.movie.Runtime) {
        let runTime = parseInt(this.movie.Runtime)
        let hour = Math.floor(runTime / timeRate)
        let mins = runTime - (hour * timeRate)

        formatted = `${hour > 0 ? `${hour}h ` : ''}${mins > 0 ? `${mins}min ` : ''}`
      }

      return formatted
    },
    mainActors () {
      return this.convertStrToList(this.movie.Actors)
    },
    writersStr () {
      let writers = this.convertStrToList(this.movie.Writer)
      let formattedStr = writers[0] || ''

      if (writers.length > 1) {
        formattedStr += ` and ${writers.length - 1} others`
      }

      return formattedStr
    },
    detailsSections () {
      let sections = []
      const fields = ['Released', 'dvdRelease', 'Language', 'BoxOffice', 'Country', 'Production']

      for (let i = 0; i < fields.length; i++) {
        let field = fields[i]

        if (this.movie[field]) {
          sections.push({
            label: field,
            value: this.movie[field]
          })
        }
      }

      return sections
    },
    awards () {
      return this.convertStrToList(this.movie.Awards)
    },
    actionsShowClass () {
      return {
        'movie-view-actions-active': this.actionsShow,
        '': !this.actionsShow
      }
    },
    comingSoon () {
      let comingSoon = false
      const MS_PER_DAY = 1000 * 3600 * 24
      const period = 15

      if (this.movie.Released) {
        let releaseDay = this.getUTCTime(new Date(this.movie.Released))
        let today = this.getUTCTime(new Date())

        let timeDiff = Math.floor(releaseDay - today)

        if (!isNaN(timeDiff)) {
          comingSoon = Math.abs(timeDiff / MS_PER_DAY) < period
        }
      }

      return comingSoon
    }
  },
  methods: {
    convertStrToList (str) {
      str = str || ''

      return str.trim().split(/\s*[,.]\s*/)
    },
    formatLabelWithSpace (str) {
      let res = str.replace(/([A-Z])/g, ' $1').trim()

      return res.replace('dvd', 'DVD')
    },
    capitalize (str) {
      return `${str.charAt(0).toUpperCase()}${str.slice(1)}`
    },
    toggleActionList () {
      this.actionsShow = !this.actionsShow
    },
    goToWebsite () {
      window.open(this.websiteLink)
      this.toggleActionList()
    },
    orderTicket () {
      console.log('Ordering ticket')
      window.open('https://www.cinema-city.co.il')
      this.toggleActionList()
    },
    getUTCTime (date) {
      return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    },
    toogleFavorite () {
      this.isFavorite = !this.isFavorite

      this.$store.commit('updateFavorites', {
        id: this.id,
        isAdd: this.isFavorite
      })

      this.$store.commit('updateMovies', this.$store.getters.getMovies)
    }
  }
}
</script>
<style lang="less">
.movie-view--card{
  width: 100%;
}

.movie-plot-tab-container{
  padding-bottom: 56px;
}

.poster--background{

  .card__media__background{
    background-position-y: top !important;

  }

  .movie-poster--text-wrapper{
    display:flex;
    justify-content: center;
    align-items: center;
  }

  .movie-poster--text{
    text-overflow: ellipsis;
    overflow: hidden;
    height: 100%;
    display: flex;
    align-items: center;
  }
}

.movie-details--container{
  position: relative;
  display: grid;
  grid-template-columns: 17rem auto;
  grid-template-rows: auto auto;
  grid-column-gap: 0.5rem;

  .movie-view-poster-wrapper{
    height: 19rem;
    width: 13rem;
    left: 3rem;
    top: -10rem;

    display: flex;
    align-items: center;
    position: absolute;
    text-decoration: none;
    outline: none;
    box-shadow: 4px 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);

    .movie-details-no-poster{
      display: flex;
      height: 100%;
      width: 100%;
      justify-content: center;
      align-items: center;
      border: 1px solid #616161;
    }
  }

  .poster{
    width: 13rem;
  }

  .movie-rating-label{
    position: absolute;
    right: 5rem;
    top: -35px;
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

    .movie-subtitle--container{
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

    .movie-subtitle--section{
      display:flex;
      align-items: center;

      .movie-subtitle--text{
        padding: 0.2rem;
      }

      margin-right: 0.5rem;
    }

    .movie-rated--section{
      padding: 0.2rem 0.5rem;
      border-radius: 11px;
      font-size: 0.85rem;
      line-height: 1.2;
      margin: 0;
      min-width: 2.5rem;
    }

  }

  .movie-subdetails--section{
    grid-row-start: 2;
    grid-column-start: 1;
    grid-column-end: 3;

    .favorite-btn-remove{
      .btn__content{
        &::before{
          background-color:transparent;
        }
      }
    }

    .movie-ratings--section{
      display:flex;
      justify-content: space-evenly;
      padding-top: 0.5rem;
    }

    .movie-rating-score-container{
      display:flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .movie-rating-score{
      font-size: 1.1rem;
      line-height: 1;
      font-weight: 600;
    }

    .movie-rating-base{
      font-size: 0.8rem;
      border-top: 1px solid;
      margin-top: 0.2rem;
      opacity: 0.8;
    }

    .movie-rating-source{
      font-size: 0.85rem;
      margin-top: 0.3rem;
    }

    .movie-view--card{
      &:not(:last-child){
        margin-bottom: 1rem;
      }
    }

    .movie-view--card-heading{
      text-transform: uppercase;
      padding-bottom: 0;
    }

    .movie-cast-list{
      display: flex;
      flex-wrap: wrap;

      .movie-cast-item{
        padding: 0.2rem 0.5rem;
        border: 1px solid;
        border-radius: 14px;
        margin:0 0.5rem 0.5rem 0.5rem;
      }
    }

    .movie-info--line-wrapper{
      padding: 0 16px;

      &.with-bottom-padding{
        padding-bottom: 16px;
      }
    }

    .movie-info--line{
      display:flex;
      padding: 16px 0;
    }

    .movie-info--line-subtext{
      font-size: 0.9rem;
    }
  }
}

.movie-square-label{
  border-radius: 20% !important;
}

.movie-view-actions-wrapper{
  bottom: 0;
  position: fixed;
  margin: 1em;
  right: 0px;

  .movie-view-action-btn{
    position: relative;
    -webkit-transition: all .1s ease-out;
    transition: all .1s ease-out;
    background-size: contain;
    display:block;
    margin: 15px auto 0;

    &:not(:last-child){
      opacity: 0;
      -webkit-transform: translateY(50px);
      -ms-transform: translateY(50px);
      transform: translateY(50px);

      &:nth-last-child(2){
        webkit-transition-delay: 50ms;
        transition-delay: 20ms;
      }

      &:nth-last-child(2){
        webkit-transition-delay: 75ms;
        transition-delay: 40ms;
      }
    }

  }

  &.movie-view-actions-active{
    .movie-view-action-btn{
      &:not(:last-child){
        opacity: 1;
        -webkit-transform: none;
        -ms-transform: none;
        transform: none;
      }
    }

    [tooltip]{
      &:before{
        visibility: visible;
        opacity: 1;
      }
    }
  }

  .movie-view-action-icon{
    display: flex;
  }

  [tooltip]{
    &:before{
      bottom: 12%;
      border-radius: 5px;
      background: #757070fc;
      color: #fff;
      content: attr(tooltip);
      font-size: 12px;
      visibility: hidden;
      opacity: 0;
      padding: 5px 7px;
      margin-right: 9px;
      position: absolute;
      right: 100%;
      white-space: nowrap;
      box-shadow: 0 0 4px rgba(0, 0, 0, .14), 0 4px 8px rgba(0, 0, 0, .28);
    }
  }
}

@media (max-width: 768px){
  .poster--background{
    height: 17rem !important;
  }

  .movie-details--container{
    grid-template-columns: 8rem auto;

    .movie-view-poster-wrapper{
      height: 10rem;
      width: 7rem;
      top: -5rem;
      left: 1.5rem;
      .poster{
        width: 7rem;
      }
    }

    .movie-rating-label{
      right: 1rem;
    }
  }
}
</style>


