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
    <Nav :index="3"></Nav>
  </div>
</template>
<script>
import Header from "@/components/online_hospital_header/online_hospital_header";
import Nav from "@/components/nav_list_second/nav_list_second";
import NavThird from "@/components/nav_list_third/nav_list_third";
import { mapState } from "vuex";
export default {
  name: "diagnosis",
  components: { Nav, Header, NavThird },
  props: {},
  data() {
    return {
      activeIndex: 1,
      count: "",
      title: "",
      midTitle: "诊疗"
    };
  },
  computed: {
    ...mapState(["appId", "purview", "lowerHospital", "isLowerHospital"])
  },
  watch: {},
  mounted() {
    if (
      this.purview == 3 ||
      this.purview == 4 ||
      (this.purview == "46" && this.isLowerHospital == "true")
    ) {
      this.title = this.lowerHospital;
    } else {
      this.title = "诊疗";
    }
    // this.title =
    //   this.purview == 3 || this.purview == 4 || this.purview == 46
    //     ? this.lowerHospital
    //     : "诊疗";
    const name = this.$route.path;
    switch (name) {
      case "/diagnosis/second_tu":
        this.activeIndex = 1;
        break;
      case "/diagnosis/second_wang":
        this.activeIndex = 2;
        break;
      case "/diagnosis/second_zuo":
        this.activeIndex = 3;
        break;
      case "/diagnosis/second_xun":
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
            path: "/diagnosis/second_tu"
          });
          break;
        case 2:
          this.$router.replace({
            path: "/diagnosis/second_wang"
          });
          break;
        case 3:
          this.$router.replace({
            path: "/diagnosis/second_zuo"
          });
          break;
        case 4:
          this.$router.replace({
            path: "/diagnosis/second_xun"
          });
          break;
      }
    },
    getTreamentCount() {
      this.$axios
        .fetchPost("/Home/Treatment/GetTreamentCount", {
          appId: this.appId,
          purview: this.purview == 46 && this.isLowerHospital == "false" ? 1 : 0
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
