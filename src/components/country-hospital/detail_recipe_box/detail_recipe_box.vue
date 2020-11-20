<template>
  <div class="recipe-box">
      <div class="l">
        <div class="icon"></div>
        <p>
          处方药
          <br />（5）
        </p>
      </div>
      <div class="ul-wrap">
        <ul class="r-ul">
          <li v-for="item in 8" :key="item" @click="goToDetail(item.id)">
            <el-image fit="cover" class="img"></el-image>
          </li>
        </ul>
      </div>
  <div/>
</template>
<script>
export default {
  name: "component_name",
  components: {},
  props: {},
  data() {
    return {
      infoData: ""
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  destroyed() {},
  methods: {
    goToDetail(id) {
      this.$router.push({
        path: "/goods_detail",
        query: { id: id }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.recipe-box
    margin 40px 0 0 90px
    display flex
    .l
      background rgba(9, 29, 67, 0.4)
      border 1px solid rgba(255, 255, 255, 0.2)
      width 140px
      height 270px
      display inline-block
      vertical-align top
      text-align center
      margin-right 40px
      .icon
        width 60px
        height 70px
        background url('./24.png') center no-repeat
        margin 45px auto 0
      p
        font-size 34px
        color #fff
        line-height 34px
        margin-top 34px
    .ul-wrap
      flex 1
      min-width 0
      overflow-x auto
      height 291px
    .r-ul
      display inline-block
      vertical-align top
      height 270px
      width 3000px
      li
        display inline-block
        margin-right 15px
        .img
          width 270px
          height 270px
</style>
