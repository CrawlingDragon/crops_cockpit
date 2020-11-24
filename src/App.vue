<template>
  <div id="app">
    <!-- <keep-alive exclude="module_detail"> -->
    <router-view></router-view>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
export default {
  name: "app",
  components: {}
};
</script>
<style lang="stylus" scoped>
#app
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family MicrosoftYaHei
  text-align: center;
  min-width: 1340px
  color: #fff;
  margin: 0 auto;
  width: 100%
  height 100%
</style>
