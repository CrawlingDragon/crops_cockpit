<template>
  <div class="search_vip-item" @click="goToVipDetail(item)">
    <el-image class="photo" fit="cover" :src="item.avatar">
      <div slot="error" class="vip_image_error"></div>
      <div slot="placeholder" class="vip_image_error"></div>
    </el-image>
    <div class="name">{{ item.title }}</div>
  </div>
</template>
<script>
export default {
  name: "search_vip",
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
    goToVipDetail(item) {
      this.$router.push({
        path: "/vip_diagnosis",
        query: { userId: item.uid, userName: item.title, from: "general" }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.search_vip-item
  display inline-block
  margin-right 30px
  font-size 0
  cursor pointer
  margin-bottom 30px
  .photo
    width 235px
    height 235px
  .name
    height 79px
    line-height 79px
    font-size: 30px;
    color: #FFFFFF;
    padding-left 19px
    border: 2px solid rgba(255, 255, 255, 0.15);
</style>
