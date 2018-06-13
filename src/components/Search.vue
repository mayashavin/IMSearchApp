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
      <v-icon :class="advancedSearchBtnlass">tune</v-icon>
    </v-btn>
  </div>
  <div class="advanced-search-box" v-show="withAdvanceSearch">
    tbd
  </div>
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
    }
  }
}
</script>
<style lang="less" scoped>
.search-box-wrapper{
  width: 100%;

  .search-box-section{
    display:grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    justify-content: center;
    margin: 1rem;

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
}
</style>


