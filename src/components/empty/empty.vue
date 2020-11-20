<template>
  <div class="empty-container">
    <div class="empty-data">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "empty",
  components: {},
  props: {},
  data() {
    return {};
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
  background: #091D44;
  border: 2px solid rgba(7, 47, 101, .5)
  .empty-data
    position absolute
    left 50%
    top 50%
    transform translate(-50%,-50%)
    width auto
    height auto
</style>
