<template>
  <div class="cetu_list-container">
    <div class="title" @click="goToCetuList" v-if="zuowu == false">
      测土配方记录 >
    </div>
    <ul class="cetu-ul">
      <li v-for="item in list" :key="item.id" @click="goToCetuDetail(item.id)">
        <p class="p1">{{ item.title }}</p>
        <p class="p2">ID：{{ item.idnumber }}</p>
        <p class="p2">取样日期：{{ item.showtime }}</p>
        <div
          class="icon"
          :class="{ icon_checking: item.teststatus == 1 }"
        ></div>
        <div class="icon" :class="{ icon_checked: item.teststatus == 2 }"></div>
        <div class="icon" :class="{ icon_chufang: item.teststatus == 3 }"></div>
        <!-- teststatus:1检测中，2检测完成，3给处方 -->
      </li>
    </ul>
    <Empty v-show="list.length == 0 && zuowu == false">
      <img src="./cetu_noData.png" alt="" />
    </Empty>
  </div>
</template>
<script>
import Empty from "@/components/empty/empty";
export default {
  name: "cetu_list",
  components: { Empty },
  props: ["list", "zuowu"],
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  destroyed() {},
  methods: {
    goToCetuList() {
      this.$router.push({
        path: "/diagnosis/second_tu"
      });
    },
    goToCetuDetail(id) {
      this.$router.push({
        path: "/cetu_detail",
        query: { id: id }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.cetu_list-container
  text-align left
  height 100%
  .title
    font-size 32px
    line-height 32px
    margin-bottom 15px
    cursor pointer
  .empty-container
    height 473px
  .cetu-ul
    border-left none
    border-bottom none
    li
      height 157px
      border-bottom 2px solid #072F65
      background #061F50
      padding 20px
      cursor pointer
      position relative
      &:first-child
        border-left 3px solid #17DAA4
      &:nth-child(2)
        border-left 3px solid #E19129
      &:last-child
        border-left 3px solid #EA365E
      .p1
        font-size 28px
        line-height 28px
        margin-bottom 15px
        color #FFFDFD
      .p2
        font-size 24px
        color #808080
        margin-bottom 15px
        line-height 24px
      .icon
        width 40px
        height 40px
        right 20px
        bottom 35px
        position absolute
        &.icon_checking
          background url('./checking.png') no-repeat
        &.icon_checked
          background url('./checked.png') no-repeat
        &.icon_chufang
          background url('./chufang.png') no-repeat
</style>
