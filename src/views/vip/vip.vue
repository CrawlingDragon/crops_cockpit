<template>
  <div class="vip-container">
    <Header title="黄泽黄桃专科医院" midTitle="我的会员"></Header>
    <ul class="vip-ul">
      <li v-for="item in users" :key="item.id">
        <el-image fit="cover" class="img" :src="item.avatar"></el-image>
        <div class="name">
          <p class="p1">{{ item.name }}</p>
          <p class="p2">共{{ item.zuowu_mushu }}亩地</p>
        </div>
      </li>
    </ul>
    <div class="result-num">共{{ count }}个结果</div>
  </div>
</template>
<script>
import Header from "@/components/online_hospital_header/online_hospital_header";
import { mapState } from "vuex";
export default {
  name: "vip",
  components: { Header },
  props: {},
  data() {
    return {
      users: [],
      count: 0
    };
  },
  computed: {
    ...mapState(["appId"])
  },
  watch: {},
  mounted() {
    this.getMpUser();
  },
  destroyed() {},
  methods: {
    getMpUser() {
      this.$axios
        .fetchGet("/Home/Member/GetMpUser", { appId: this.appId })
        .then(res => {
          if (res.data.code == 200) {
            this.users = res.data.data;
            this.count = res.data.count;
          }
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.vip-container
  padding-top 100px
  .vip-ul
    min-width 1340px
    max-width 1900px
    margin 0 auto
    padding 0 40px
    text-align left
    & > li
      width 235px
      display inline-block
      margin-right 29px
      margin-bottom 65px
      &:hover
        outline 3px solid #FF6600
        box-shadow 0px 1px 26px #f60
      &:nth-child(7n)
        margin-right 0
      .img
        width 100%
        height 235px
        display block
      .name
        height 100px
        text-align left
        box-sizing border-box
        padding-left 20px
        color #FFFFFF
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        border 2px solid rgba(255, 255, 255, 0.15)
        background rgba(0, 0, 0, 0)
        padding-top 10px
        .p1
          color #fff
          font-size 30px
        .p2
          color #808080
          font-size 24px
  .result-num
    font-size 30px
    color #B5B5B5
    text-align left
    padding-left 90px
    padding-bottom 30px
</style>
