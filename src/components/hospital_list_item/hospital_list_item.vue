<template>
  <ul class="item-wrap">
    <li
      v-for="item in items"
      :key="item.id"
      :class="[
        item.isstore == '0'
          ? 'singlehospital'
          : 'singlehospital singlehospital1'
      ]"
      @click="
        goToHospitalIndex(item.appid, item.isstore, item.istown, item.name)
      "
    >
      <div class=" title">{{ item.name }}</div>
      <div class="num-item">
        <p class="p1">专家</p>
        <p class="p2">{{ item.expert }}</p>
      </div>
      <div class="num-item" v-if="item.isstore == '0'">
        <p class="p1">网诊</p>
        <p class="p2">{{ item.wen }}</p>
      </div>
      <div class="num-item" v-if="item.isstore !== '0'">
        <p class="p1">会员</p>
        <p class="p2">{{ item.user }}</p>
      </div>
      <div class="num-item" v-if="item.isstore !== '0'">
        <p class="p1">处方</p>
        <p class="p2">{{ item.chufang }}</p>
      </div>
    </li>
  </ul>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "hospital_list_item",
  components: {},
  props: {
    title: {
      type: String,
      default: ""
    },
    items: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      // purview: 0,
      uid: window.sessionStorage.getItem("expert_uid"), //专家的uid
      hospitalList: ""
    };
  },
  computed: {},
  watch: {},
  created() {},
  destroyed() {},
  methods: {
    ...mapMutations(["setAppId", "setIsLowerHospital", "setLowerHospital"]),
    // getHospitalType(appId) {
    //   // 获取医院的类型
    //   this.$axios
    //     .fetchPost("/Home/Index/GetIndexMpData", { appId: appId })
    //     .then(res => {
    //       if (res.data.code == 200) {
    //         this.purview = res.data.data.purview;
    //       }
    //     });
    // },
    open() {
      this.$alert("因业务原因村级庄稼医院暂时不能从驾驶舱中查看", "打开失败", {
        confirmButtonText: "知道了",
        center: true,
        customClass: "myAlert",
        callback: action => {}
      });
    },
    goToHospitalIndex(appid, isstore, istown, name) {
      this.setAppId(appid);
      this.setIsLowerHospital("true");
      if (istown == 0) {
        if (isstore == 1) {
          let route = this.$router.resolve({
            path: "/index_second",
            query: { from: "adminRoute", appid: appid }
          });
          window.open(route.href, "_blank");
        } else if (isstore == 0) {
          let route = this.$router.resolve({
            path: "/index_third",
            query: { from: "adminRoute" }
          });
          window.open(route.href, "_blank");
          // this.$router.push({
          //   path: "/index_third"
          // });
        }
      } else {
        // this.open();
        this.setLowerHospital(name);
        let route = this.$router.resolve({
          path: "/village_me",
          query: { from: "adminRoute", appId: appid }
        });
        window.open(route.href, "_blank");
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.item-wrap
  text-align left
  .singlehospital
    display inline-block
    background rgba(35, 147, 221, 0.5)
    width 307px
    height 150px
    margin-right 10px
    @media screen and (min-width:1900px)
      width 440px
      height 204px
      margin-right 19px
    color #fff
    font-family SimHei
    padding 30px 31px 30px 31px
    margin-bottom 27px
    &:nth-child(4n)
      margin-right 0
    .title
      font-size 28px
      text-align center
      margin-bottom 10px
      @media screen and (min-width:1900px)
        margin-bottom 27px
        font-size 34px
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      line-height 1.2
    .num-item
      display inline-block
      width 33.33%
      line-height 1.2
      text-align left
      & > p
        font-size 20px
        color #CDCDCD
        @media screen and (min-width:1900px)
          font-size 28px
        text-align center
      .p1
        margin-bottom 5px
  .singlehospital1
    background  rgba(1, 217, 173, 0.5)
</style>
