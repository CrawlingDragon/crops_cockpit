<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {}
}
</script>

<style>
@import "../src/common/css/react.styl";
html,
body {
  height: 100%;
  width: 100%;
  background: rgba(1, 21, 64, 1);
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  min-width: 1908px;
  color: #fff;
  min-height: 1079px;
  margin: 0 auto;
  width: 1908px;
}
</style>
