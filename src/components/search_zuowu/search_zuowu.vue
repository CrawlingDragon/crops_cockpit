<template>
  <div class="search_zuowu-container" @click="goToZuowu(item)">
    <el-image fit="cover" class="left" :src="item.icon"></el-image>
    <div class="zuowu-name">{{ item.name }}</div>
  </div>
</template>
<script>
export default {
  name: "search_zuowu",
  components: {},
  props: {
    item: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  destroyed() {},
  methods: {
    goToZuowu(item) {
      this.$router.push({
        path: "/search_zuowu_detail/hospital_detail",
        query: { zuowuName: item.name }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.search_zuowu-container
  display flex
  color #fff
  margin-bottom 20px
  cursor pointer
  &:last-child
    margin-bottom 0
  .left
    width 235px
    height 235px
  .zuowu-name
    flex 1
    font-size: 30px;
    padding 20px 0 0 30px
    border: 2px solid rgba(255, 255, 255, 0.15);
</style>
