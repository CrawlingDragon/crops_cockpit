<template>
  <div class="tu-container">
    <div class="infinite-list-item li" @click="goToDetail(item.id)">
      <div class="icon"></div>
      <div class="text">
        <p class="p1">
          {{ item.title }}
          <span>ID:{{ item.idnumber }}</span>
        </p>
        <p class="p2">{{ item.address }}</p>
        <p class="p3">{{ item.showtime }}</p>
      </div>
      <div class="test-status">
        <div class="icon icon-ing" v-if="item.teststatus == 1"></div>
        <div class="icon icon-success" v-if="item.teststatus == 3"></div>
        <div class="icon icon-way" v-if="item.teststatus == 2"></div>
        <p>
          {{
            item.teststatus == 1
              ? "检测中"
              : item.teststatus == 2
              ? "检测完成"
              : "已给处方"
          }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "second_tu",
  components: {},
  props: ["item"],
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  destroyed() {},
  methods: {
    goToDetail(id) {
      const route = this.$router.resolve({
        path: "/cetu_detail",
        query: { id: id, from: "adminRoute" }
      });
      window.open(route.href, "_blank");
      //   if (
      //     this.routerPath == "/diagnosis_general" ||
      //     this.routerPath == "/diagnosis_general/second_tu"
      //   ) {
      //     this.setIsLowerHospital("true");
      //     const route = this.$router.resolve({
      //       path: "/cetu_detail",
      //       query: { id: id, from: "adminRoute" }
      //     });
      //     window.open(route.href, "_blank");
      //   } else {
      //     this.$router.push({
      //       path: "/cetu_detail",
      //       query: { id: id }
      //     });
      //   }
    }
  }
};
</script>
<style lang="stylus" scoped>
.tu-container
  .li
    background rgba(9, 29, 67, 0.4)
    border 1px solid rgba(255, 255, 255, 0.2)
    margin-bottom 11px
    padding 30px 0 20px
    display flex
    cursor: pointer;
    & > .icon
      width 30px
      height 40px
      background url('../../assets/image/31.png') no-repeat
      background-position center
      background-size 100%
      margin 0 28px 0 22px
    .text
      flex 1
      margin-bottom 10px
      text-align left
      .p1
        font-size 36px
        font-family SimHei
        font-weight 400
        color rgba(255, 255, 255, 1)
        line-height 1.2
        margin-top -3px
        margin-bottom 25px
        span
          margin-left 20px
          font-size 24px
          color rgba(181, 181, 181, 1)
      .p2, .p3
        color #B5B5B5
        font-size 24px
        line-height 1.2
        margin-bottom 10px
    .test-status
      min-width 260px
      line-height 141px
      & > .icon
        width 40px
        height 40px
        display inline-block
        margin-right 21px
        vertical-align middle
        &.icon-ing
          background url('../../assets/image/35.png') no-repeat
          background-position center
          background-size 100%
        &.icon-success
          background url('../../assets/image/36.png') no-repeat
          background-position center
          background-size 100%
        &.icon-way
          background url('../../assets/image/27.png') no-repeat
          background-position center
          background-size 100%
      p
        color #FF6500
        font-size 36px
        display inline-block
        vertical-align middle
  .noData
    font-size 26px
    color #7fb5f1
    line-height 60px
</style>
