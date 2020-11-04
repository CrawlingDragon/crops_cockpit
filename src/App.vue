<template>
  <div id="app">
    <keep-alive exclude="module_detail">
      <router-view></router-view>
    </keep-alive>
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
  font-family: SimHei;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  min-width: 1908px;
  color: #fff;
  min-height: 1079px;
  margin: 0 auto;
  width: 100%
  .create-isLoading
    font-size 30px
    .el-loading-spinner
        .el-loading-text
          font-size 20px !important
          margin-top 10px
</style>
