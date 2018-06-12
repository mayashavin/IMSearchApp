<template>
  <div>

  </div>
</template>
<script>
import omdb from '@/omdbSDK/omdb.js'

export default {
  name: 'MovieView',
  prop: ['id'],
  beforeCreate () {
    let data = new Map([['i', this.id]])

    omdb.retrieve(data).then(result => {
      this.movie = result
      console.log(result)
    })
  },
  data () {
    return {
      movie: null
    }
  }
}
</script>
<style lang="less">

</style>


