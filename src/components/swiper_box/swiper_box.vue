<template>
  <div class="swiper-box-container" @click="goToMessageDetail">
    <el-carousel class="swiper" trigger="click" @change="changeItem">
      <el-carousel-item v-for="item in list" :key="item.id" :name="item.id">
        <img :src="item.thumb" alt="" class="item-img" />
        <div class="text">{{ item.title }}</div>
      </el-carousel-item>
    </el-carousel>
    <Empty v-show="list.length == 0">
      <img src="./2.png" alt="" />
    </Empty>
  </div>
</template>
<script>
// import Swiper from "swiper";
import Empty from "@/components/empty/empty";

export default {
  name: "swiper-box",
  components: { Empty },
  props: ["list"],
  data() {
    return {
      activeTid: 0,
      id: 0
    };
  },
  computed: {},
  watch: {
    list(newVal) {
      if (newVal.length != 0) {
        this.activeCatid = this.list[0].catid;
        this.id = this.list[0].id;
      }
    }
  },
  mounted() {},
  destroyed() {},
  methods: {
    changeItem(item, i1) {
      this.activeCatid = this.list[item].catid;
      this.id = this.list[item].id;
    },
    goToMessageDetail() {
      this.$router.push({
        path: "/find_detail",
        query: { catid: this.activeCatid, id: this.id, from: "ad" }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.swiper-box-container
  height 100%
  .swiper
    height 100%
  /deep/.el-carousel__container
    height 100%
    position relative
    cursor pointer
    .item-img
      width 100%
      height 100%
      display block
    .text
      position absolute
      left 0
      right 0
      bottom 0
      height 80px
      background rgba(0, 0, 0, 0.8)
      font-size 34px
      line-height 80px
      padding-left 20px
      text-align left
  /deep/.el-carousel__button
    width 20px
    height 20px
    border-radius: 50%;
  /deep/.el-carousel__indicators--horizontal
    right 50px
    left auto
    bottom 15px
</style>
