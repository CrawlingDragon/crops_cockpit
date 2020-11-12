<template>
  <div class="diagnosis-container">
    <Header title="诊疗"></Header>
    <div class="nav-top">
      <div
        class="item"
        :class="{ active: activeIndex == 1 }"
        @click="chooseModule(1)"
      >
        测土配方
        <span>({{ count.cetuCount }})</span>
      </div>
      <div
        class="item"
        :class="{ active: activeIndex == 2 }"
        @click="chooseModule(2)"
      >
        网诊
        <span>({{ count.wenCount }})</span>
      </div>
      <div
        class="item"
        :class="{ active: activeIndex == 3 }"
        @click="chooseModule(3)"
      >
        坐诊
        <span>({{ count.wenzhenCount }})</span>
      </div>
      <div
        class="item"
        :class="{ active: activeIndex == 4 }"
        @click="chooseModule(4)"
      >
        巡诊
        <span>({{ count.xunzhenCount }})</span>
      </div>
    </div>
    <div class="module-content"></div>
    <router-view></router-view>
    <Nav :index="3"></Nav>
  </div>
</template>
<script>
import Header from "@/components/online_hospital_header/online_hospital_header";
import Nav from "@/components/nav_list_second/nav_list_second";
import { mapState } from "vuex";
export default {
  name: "diagnosis",
  components: { Nav, Header },
  props: {},
  data() {
    return {
      activeIndex: 1,
      count: ""
    };
  },
  computed: {
    ...mapState(["appId", "purview"])
  },
  watch: {},
  mounted() {
    this.getTreamentCount();
  },
  destroyed() {},
  methods: {
    chooseModule(index) {
      this.activeIndex = index;
      switch (index) {
        case 1:
          this.$router.push({
            path: "/diagnosis/second_tu"
          });
          break;
        case 2:
          this.$router.push({
            path: "/diagnosis/second_wang"
          });
          break;
        case 3:
          this.$router.push({
            path: "/diagnosis/second_zuo"
          });
          break;
        case 4:
          this.$router.push({
            path: "/diagnosis/second_xun"
          });
          break;
      }
    },
    getTreamentCount() {
      this.$axios
        .fetchPost("/Home/Treatment/GetTreamentCount", {
          appId: this.appId,
          purview: this.purview == (3 || 4) ? 1 : 0
        })
        .then(res => {
          if (res.data.code == 200) {
            this.count = res.data.data;
          }
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.diagnosis-container
  padding-top 100px
  .nav-top
    margin 0 90px
    & > .item
      padding 5px 30px
      display inline-block
      font-size 30px
      color #C5C5C5
      cursor pointer
      &.active
        color #FF6500
        border-bottom 4px solid #FF6500
        span
          font-size 30px
          color #FF6500
      span
        font-size 30px
        color #C5C5C5
/deep/.second_wang-container
  padding-top 50px !important
</style>
