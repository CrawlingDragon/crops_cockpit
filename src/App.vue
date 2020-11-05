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
  components: {},
};
</script>
<style lang="stylus" scoped>

#app
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  min-width: 1340px;
  color: #fff;
  min-height: 768px;
  margin: 0 auto;
  width: 100%
  .create-isLoading
    font-size 30px
    .el-loading-spinner
        .el-loading-text
          font-size 20px !important 
          margin-top 10px
</style>
