<template>
  <div class="diagnosis-container">
    <Header :title="title" :midTitle="midTitle"></Header>
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
    <NavThird :index="3" v-if="purview != 4"></NavThird>
  </div>
</template>
<script>
import Header from "@/components/general_hospital_header/general_hospital_header";
import Nav from "@/components/nav_list_second/nav_list_second";
import NavThird from "@/components/nav_list_third/nav_list_third";
import { mapState } from "vuex";
export default {
  name: "diagnosis_general",
  components: { Nav, Header, NavThird },
  props: {},
  data() {
    return {
      activeIndex: 1,
      count: "",
      title: "",
      midTitle: "诊疗",
      from: this.$route.query.from //是否为index（也就是首页的最新网诊 导航）
    };
  },
  computed: {
    ...mapState([
      "appId",
      "purview",
      "lowerHospital",
      "isLowerHospital",
      "loginId"
    ])
  },
  watch: {},
  mounted() {
    this.title = "诊疗";
    // this.title =
    //   this.purview == 3 || this.purview == 4 || this.purview == 46
    //     ? this.lowerHospital
    //     : "诊疗";
    const name = this.$route.path;
    switch (name) {
      case "/diagnosis_general/second_tu":
        this.activeIndex = 1;
        break;
      case "/diagnosis_general/second_wang":
        this.activeIndex = 2;
        break;
      case "/diagnosis_general/second_zuo":
        this.activeIndex = 3;
        break;
      case "/diagnosis_general/second_xun":
        this.activeIndex = 4;
        break;
    }
    this.getTreamentCount();
  },
  destroyed() {},
  methods: {
    chooseModule(index) {
      this.activeIndex = index;
      switch (index) {
        case 1:
          this.$router.replace({
            path: "/diagnosis_general/second_tu"
          });
          break;
        case 2:
          this.$router.replace({
            path: "/diagnosis_general/second_wang"
          });
          break;
        case 3:
          this.$router.replace({
            path: "/diagnosis_general/second_zuo"
          });
          break;
        case 4:
          this.$router.replace({
            path: "/diagnosis_general/second_xun"
          });
          break;
      }
    },
    getTreamentCount() {
      this.$axios
        .fetchPost("/Home/Treatment/GetTreamentCount", {
          appId: this.loginId,
          purview:
            this.purview == 3 || this.purview == 4 || this.purview == 46 ? 1 : 0
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
