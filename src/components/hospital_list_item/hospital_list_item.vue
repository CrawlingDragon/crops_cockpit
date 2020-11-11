<template>
  <ul class="item-wrap">
    <li v-for="item in items" :key="item.id" :class="{'other':item.isstore==0}" @click="goToHospitalIndex(item.appid,item.isstore)">
      <div class=" title">{{item.name}}</div>
      <div class="num-item">
        <p class="p1">专家</p>
        <p class="p2">{{item.expert}}</p>
      </div>
      <div class="num-item" v-if="item.isstore == '0'">
        <p class="p1">网诊</p>
        <p class="p2">{{item.wen}}</p>
      </div>
      <div class="num-item" v-if="item.isstore !== '0'">
        <p class="p1">会员</p>
        <p class="p2">{{item.user}}</p>
      </div>
      <div class="num-item" v-if="item.isstore !== '0'">
        <p class="p1">处方</p>
        <p class="p2">{{item.chufang}}</p>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  name: "component_name",
  components: {},
  props: {
    title: {
      type: String,
      default: "",
    },
    items: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      purview: 0,
      uid:window.sessionStorage.getItem("expert_uid"),//专家的uid
      hospitalList:""
    };
  },
  computed: {},
  watch: {},
  created() {
    
  },
  destroyed() {},
  methods: {
    getHospitalType(appId) {
      // 获取医院的类型
      this.$axios
        .fetchPost("/Home/Index/GetIndexMpData", { appId: appId })
        .then((res) => {
          if (res.data.code == 200) {
            this.purview = res.data.data.purview;
          }
        });
    },
    goToHospitalIndex(appid, isstore) {
      // eslint-disable-next-line eqeqeq
      if (isstore == 2) {
        this.$router.push({
          path: "/index_second",
          query: { appId: appid },
        });
      } else {
        this.$router.push({
          path: "/index_third",
          query: { appId: appid },
        });
      }
    },
  },
};
</script>
<style lang="stylus" scoped>
.item-wrap
  text-align left
  li
    display inline-block
    background rgba(35, 147, 221, 0.5)
    width 307px
    height 150px
    margin-right 10px
    @media screen and (min-width:1900px)
      width 440px
      height 204px
      margin-right 15px
    color #fff
    font-family SimHei
    padding 30px 5px 30px 31px
    margin-bottom 15px
    &.other
      background rgba(1, 217, 173, 0.5)
    &:nth-child(4n)
      margin-right 0
    .title
      font-size 28px
      text-align center
      @media screen and (min-width:1900px)
        font-size 38px
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      line-height 1.2
      margin-bottom 10px
    .num-item
      display inline-block
      width 33.33%
      line-height 1.2
      & > p
        font-size 20px
        @media screen and (min-width:1900px)
          font-size 38px
        color #CDCDCD
        text-align center
</style>
