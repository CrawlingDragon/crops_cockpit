<template>
  <div class="expert">
    <div class="title" @click="goTo">专家回复排行榜 ></div>
    <ul>
      <li
        v-for="(item, index) in list"
        :key="item.uid"
        @click="goToExpert(item.uid)"
      >
        <el-image
          :src="item.avatar"
          class="expert-avator"
          fit="cover"
        ></el-image>
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
import { mapState } from "vuex";
export default {
  name: "expert_ranking_list",
  components: { Empty },
  props: ["list", "routerPath"],
  data() {
    return {
      // routerPath: this.$route.path
      routeName: this.$route.name
    };
  },
  computed: {
    ...mapState(["isLowerHospital"])
  },
  watch: {},
  mounted() {
    // console.log("this.$route :>> ", this.$route.name);
  },
  destroyed() {},
  methods: {
    goToExpert(uid) {
      // 去到专家详情页
      if (this.routeName === "index_first") {
        this.$router.push({
          path: "expert_detail_four",
          query: { uid: uid }
        });
      } else {
        this.$router.push({
          path: "/expert_detail",
          query: { uid: uid }
        });
      }
    },
    goTo() {
      if (this.routerPath == "") {
        this.$router.push({
          path: "/expert_paihang"
        });
      } else {
        this.$router.push({
          path: this.routerPath
        });
      }
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
      width 33.3333%
      height 306px
      position relative
      background url('./19.png') no-repeat
      background-size 70px
      background-position top left
      padding-right 10px
      &:nth-child(3)
        padding-right 0
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
        z-index 2
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
