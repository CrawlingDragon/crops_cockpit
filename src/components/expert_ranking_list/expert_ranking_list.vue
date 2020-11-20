<template>
  <div class="expert">
    <div class="title" @click="goToExpertRanking">专家回复排行榜 ></div>
    <ul>
      <li
        v-for="(item, index) in list"
        :key="item.uid"
        @click="goToExpert(item.uid)"
      >
        <img :src="item.avatar" alt class="expert-avator" />
        <div class="icon">{{ index + 1 }}</div>
        <div class="bom-bar">
          <p class="p1">{{ item.realname }}</p>
          <p class="p2">
            <span>总回复数</span>
            <span class="number">{{ item.replycounts }}</span>
          </p>
        </div>
      </li>
      <li v-for="item in 3" :key="item" v-show="list.length == 0">
        <Empty>
          <img src="./2.png" alt="" />
        </Empty>
      </li>
    </ul>
  </div>
</template>
<script>
import Empty from "@/components/empty/empty";
export default {
  name: "expert_ranking_list",
  components: { Empty },
  props: ["list"],
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  destroyed() {},
  methods: {
    goToExpert(uid) {
      // 去到专家详情页
      this.$router.push({
        path: "/expert_detail",
        query: { uid: uid }
      });
    },
    goToExpertRanking() {
      this.$router.push({
        path: "/expert_paihang"
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.expert
  text-align left
  .title
    padding 27px 0 15px
    font-size 32px
    color rgba(255, 254, 254, 1)
  ul
    display flex
    // justify-content space-between
    li
      width 33%
      height 306px
      position relative
      background url('./19.png') no-repeat
      background-size 70px
      background-position top left
      .expert-avator
        display block
        height 100%
        width 100%
      .icon
        width 70px
        height 70px
        background url('./19.png') no-repeat
        background-size 70px
        position absolute
        left 0
        top 0px
        z-index 22
        font-size 40px
        padding-left 5px
        line-height 1.2
        font-family PingFang SC
      .bom-bar
        height 125px
        width 100%
        position absolute
        left 0
        bottom 0
        background url('./text-bj.png') no-repeat
        background-size 100%
        background-position center
        padding-left 20px
        padding-top 25px
        .p1
          font-size 36px
          font-family SimHei
          font-weight 400
          color rgba(255, 255, 255, 1)
          line-height 1.2
        .p2
          font-size 22px
          font-family SimHei
          font-weight 400
          color rgba(206, 206, 206, 1)
          line-height 1.2
          margin-top -5px
          .number
            color #FFFFFF
            font-size 44px
            margin-left 24px
</style>
