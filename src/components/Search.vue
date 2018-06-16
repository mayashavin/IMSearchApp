<template>
<div class="search-box-wrapper">
  <div class="search-box-section">
    <div class="search-box" :class="searchBoxClass">
      <v-icon class="search-icon" :class="searchIconColor">search</v-icon>
      <input type="text" id="search-box--input" class="search-box--input white--text"
            v-model="query" :placeholder="defaultPlaceholder" title="search"
            @keyup.enter="submit"
            @focus="focus"
            @keyup.13="submit">
      <v-btn flat icon v-show="onFocus" id="close-search-btn" @click.prevent="close" small class="close-btn">
        <v-icon small>close</v-icon>
      </v-btn>
    </div>
  </div>
  <v-card class="searchbox-sticky-section grey darken-4" v-show="onFocus">
    <div class="advanced-search-box">
      <div class="searchbox-lastSearch-heading-wrapper">
        <div class="searchbox-lastSearch-heading">Filter by year</div>
      </div>
      <input type="number" id="searchbox--input-year" min=1000 max=9999 class="search-box--input-advanced white--text"
          v-model="year" :placeholder="yearPlaceholder" title="search by year"
          @focus="focus"
          @keyup.enter="submit">
    </div>
    <div class="searchbox-lastSearch-section" v-show="lastQuery && lastQuery.length > 0">
      <div class="searchbox-lastSearch-heading-wrapper">
        <div class="searchbox-lastSearch-heading">Recent</div>
        <v-btn small flat @click.prevent="clear" class="amber--text">
          clear
        </v-btn>
      </div>
      <v-list class="searchbox-lastSearch-list grey darken-4">
          <template v-for="(item, index) in lastQuery">
            <v-list-tile :key="index" @click.prevent="search(item)">
              <v-list-tile-content ripple>
                <v-list-tile-title v-text="item" class="grey--text caption"></v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon dark small class="grey--text">keyboard_arrow_right</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index + 1 < lastQuery.length" :key="item"></v-divider>
          </template>
      </v-list>
    </div>
  </v-card>
</div>

</template>
<script>
export default {
  name: 'Search',
  data () {
    return {
      query: '',
      defaultPlaceholder: 'Search for movies by title',
      onFocus: false,
      year: '',
      yearPlaceholder: 'Search by year'
    }
  },
  methods: {
    submit () {
      this.onFocus = false
      this.$emit('search-query', this.query, { byYear: this.year })
    },
    focus () {
      this.onFocus = true
    },
    close () {
      this.onFocus = false
      this.query = ''
    },
    clear () {
      let query = ''
      let toClear = true
      this.$store.commit('updateSearchedTerm', { query, toClear })
    },
    search (value) {
      this.query = value
      this.submit()
    }
  },
  computed: {
    advancedSearchBtnlass () {
      return {
        'green--text': this.withAdvanceSearch,
        'white--text': !this.withAdvanceSearch
      }
    },
    searchBoxClass () {
      return {
        'active': this.onFocus
      }
    },
    lastQuery () {
      return this.$store.getters.searchedTerms || []
    },
    searchIconColor () {
      return {
        'white--text': this.onFocus,
        'grey--text': !this.onFocus
      }
    }
  }
}
</script>
<style lang="less" scoped>
.search-box-wrapper{
  width: 100%;
  max-width: 700px;
  position: relative;

  .search-box-section{
    display:grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    justify-content: center;
    margin-left: 0.5rem;
    margin-right: 0.5rem;

    .search-box{
      padding: 0.5rem;
      border: 1px solid lightgray;
      border-radius: 2rem;
      width: 100%;
      display: flex;
      align-items: center;
      min-height: 45px;

      &.active{
        outline: orange;
      }

      .search-box--input{
        flex: 1;

        &:active, &:focus{
          outline: none;
        }
      }

      .close-btn{
        margin-top: 0;
        margin-bottom: 0;
      }

      .search-icon{
        margin-right: 0.5rem;
      }
    }
  }

  .searchbox-sticky-section{
    position: absolute;
    width: 100%;
    z-index: 6;
    padding: 0 1rem;
  }

  .searchbox-lastSearch-heading-wrapper{
    display:flex;
    justify-content: space-between;
    align-items: center;

    .searchbox-lastSearch-heading{
      text-transform: uppercase;
    }
  }

  .search-box--input-advanced{
    width: 10rem;
    border-bottom: 1px white solid;
    margin: 0 1rem;
    line-height: 1;
    outline: none;
    padding: 0.5rem;
  }

  .advanced-search-box{
    display: flex;
    padding: 0.5rem 0;
  }

  .searchbox-clear-btn-icon{
    margin-left:5px;
  }
}
</style>


