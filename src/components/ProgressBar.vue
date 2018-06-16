<template>
  <div class="progress-bar grey darken-3" v-show="onShow">
    <v-progress-circular indeterminate color="blue-grey"></v-progress-circular>
    <div class="white--text progress-text" v-if="msg">{{msg}}</div>
  </div>
</template>
<script>
export default {
  name: 'ProgressBar',
  props: ['onShow', 'msg']
}
</script>
<style lang="less">
  .progress-bar{
    z-index: 4;
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .progress-text{
      padding: 0.5rem 0;
    }
  }
</style>


