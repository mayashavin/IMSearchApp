<template>
<div class="search-box-wrapper">
  <div class="search-box-section">
    <div class="search-box" :class="searchBoxClass">
      <v-icon class="search-icon">search</v-icon>
      <input type="text" id="search-box--input" class="search-box--input white--text"
            v-model="query" :placeholder="defaultPlaceholder" title="search"
            @keyup.enter="submit"
            @focus="focus"
            @keyup.13="submit"
            @blur="close">
      <v-btn flat icon v-show="onFocus" @click.prevent="close" small class="close-btn">
        <v-icon small>close</v-icon>
      </v-btn>
    </div>
    <v-btn flat icon @click.prevent="toogleAdvancedSearch">
      <v-icon :class="advancedSearchBtnlass">filter_list</v-icon>
    </v-btn>
  </div>
  <v-card class="searchbox-sticky-section grey darken-4" v-show="onFocus">
    <div class="searchbox-lastSearch-section" v-show="lastQuery && lastQuery.length > 0">
      <div class="searchbox-lastSearch-heading-wrapper">
        <div class="searchbox-lastSearch-heading">Recent</div>
        <v-btn small flat @click.prevent="clear" class="amber--text">
          clear
          <v-icon small right dark class="searchbox-clear-btn-icon">highlight_off</v-icon></v-btn>
      </div>
      <v-list class="searchbox-lastSearch-list grey darken-4">
          <template v-for="(item, index) in lastQuery">
            <v-list-tile :key="index">
              <v-list-tile-content ripple
                @click.prevent="search(item)">
                <v-list-tile-title v-text="item" class="grey--text caption"></v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon dark small class="grey--text">keyboard_arrow_right</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index + 1 < lastQuery.length" :key="index"></v-divider>
          </template>
      </v-list>
    </div>
    <div class="advanced-search-box" v-show="withAdvanceSearch">

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
      defaultPlaceholder: 'Search for movies',
      withAdvanceSearch: false,
      onFocus: false
    }
  },
  methods: {
    toogleAdvancedSearch () {
      this.withAdvanceSearch = !this.withAdvanceSearch
    },
    submit () {
      this.$emit('search-query', this.query)
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
    z-index: 2;
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

  .searchbox-clear-btn-icon{
    margin-left:5px;
  }
}
</style>


