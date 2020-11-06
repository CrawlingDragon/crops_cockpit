<template>
  <div class="empty-container">
    <el-image v-if="type == img" src="" class="empty-data"></el-image>
    <el-image v-if="type == text" src="" class="empty-data"></el-image>
  </div>
</template>
<script>
export default {
  name: "empty",
  components: {},
  props: {},
  data() {
    return {
      type: {
        type: String,
        default: "img"
      }
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  destroyed() {},
  methods: {}
};
</script>
<style lang="stylus" scoped>
.empty-container
  width 100%
  height 100%
  position relative
  .empty-data
    position absolute
    left 50%
    top 50%
    transform translate(-50%,-50%)
    width auto
    height auto
</style>
