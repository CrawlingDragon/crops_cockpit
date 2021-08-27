<template>
  <div class="vip_diagnosis-container container-wrap">
    <GeneralHeader :title="title" v-if="from === 'general'"></GeneralHeader>
    <Header :title="title" v-else></Header>
    <div class="nav">
      <div
        class="item "
        @click="routeName = 'wangZhen'"
        :class="{ active: routeName == 'wangZhen' }"
      >
        网诊
      </div>
      <div
        class="item"
        @click="routeName = 'joinHopital'"
        :class="{ active: routeName == 'joinHopital' }"
      >
        TA加入的医院
      </div>
    </div>
    <div class="content-bar">
      <div class="show-bar1" v-show="routeName === 'wangZhen'">
        <VipWang from="general"></VipWang>
      </div>
      <div class="show-bar2" v-show="routeName === 'joinHopital'">
        <Hospital :items="hospitalList"></Hospital>
        <div v-if="hospitalList == 0">暂无符合条件的医院</div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/online_hospital_header/online_hospital_header";
import GeneralHeader from "@/components/general_hospital_header/general_hospital_header";
import Hospital from "@/components/hospital_list_item/hospital_list_item";
import VipWang from "@/views/huiyuan_wang/huiyuan_wang";

export default {
  name: "vip_diagnosis",
  components: { Header, Hospital, VipWang, GeneralHeader },
  props: {},
  data() {
    return {
      routeName: "wangZhen",
      hospitalList: [],
      userId: this.$route.query.userId,
      title: "会员：" + this.$route.query.userName,
      from: this.$route.query.from
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.get_info();
  },
  destroyed() {},
  methods: {
    get_info() {
      // ta 加入的医院
      this.$axios
        .fetchPost("/Home/Manage/GetManageMpDataList", {
          appId: this.userId, //user id
          storetag: 99,
          ordertag: "default",
          type: "user"
        })
        .then(res => {
          if (res.data.code === "200") {
            if (res.data.data == 0) {
              this.hospitalList = 0;
              return;
            }
            this.hospitalList = res.data.data.lists;
          }
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.vip_diagnosis-container
  .nav
    margin-top 101px
    text-emphasis center
    margin-bottom 87px
    .item
      padding 0 35px 9px
      font-size 30px
      color #C5C5C5
      display inline-block
      cursor pointer
      margin-right 40px
      &.active
        border-bottom 4px solid #FF6500
        color #fff
  .diagnosis-ul
    margin 35px 90px 0
    li
      border 1px solid rgba(255, 255, 255, 0.2)
      display flex
      text-align left
      height 220px
      padding-top 22px
      margin-bottom 11px
      &:hover
        outline 3px solid #FF6600
        box-shadow 0px 1px 26px #f60
      .icon
        width 30px
        height 35px
        background url('./21.png') no-repeat
        background-position center
        background-size 100%
        margin 0 29px 0 22px
      .text
        flex 1
        .p1
          font-size 24px
          color #B5B5B5
          line-height 1.2
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          margin-bottom 20px
        .p2
          font-size 30px
          color #FFFFFF
          line-height 44px
      .answer
        width 140px
        margin 0 0 0 30px
        .p3
          font-size 24px
          color #B5B5B5
          margin-bottom 30px
          line-height 1.2
        .img
          width 110px
          height 110px
  .result-num
    text-align left
    margin-left 90px
    font-size 30px
    padding 30px 0
.show-bar2
  padding 0 45px
</style>
