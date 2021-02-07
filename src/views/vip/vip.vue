<template>
  <div class="vip-container container-wrap">
    <Header title="所有会员" v-if="from !== 'general'"></Header>
    <GeneralHeader title="所有会员" v-else></GeneralHeader>

    <ul
      class="vip-ul infinite-list"
      v-infinite-scroll="load"
      style="overflow:auto;"
      infinite-scroll-disabled="disabled"
    >
      <li
        v-for="item in users"
        :key="item.id"
        class="infinite-list-item"
        @click="goToVipDetail(item.id, item.name)"
      >
        <el-image fit="cover" class="img" :src="item.avatar">
          <div slot="error" class="vip_image_error"></div>
          <div slot="placeholder" class="vip_image_error"></div>
        </el-image>
        <div class="name">
          <p class="p2">{{ item.name }}</p>
        </div>
      </li>
      <p v-if="loading" class="p1">加载中...</p>
      <p v-if="noMore" class="p1">没有更多了</p>
    </ul>
    <div class="result-num">共{{ count }}个结果</div>
  </div>
</template>
<script>
import Header from "@/components/online_hospital_header/online_hospital_header";
import GeneralHeader from "@/components/general_hospital_header/general_hospital_header";
import { mapState } from "vuex";
export default {
  name: "vip",
  components: { Header, GeneralHeader },
  props: {},
  data() {
    return {
      users: [],
      list: [],
      page: 0,
      loading: false,
      noMore: false,
      count: 0,
      from: this.$route.query.from
    };
  },
  computed: {
    ...mapState(["loginId"]),
    disabled() {
      return this.loading || this.noMore;
    }
  },
  watch: {},
  mounted() {
    // this.getMpUser();
  },
  destroyed() {},
  methods: {
    load() {
      this.page += 1;
      this.loading = true;
      setTimeout(() => {
        if (this.from === "general") {
          this.getVipUser();
        } else {
          this.getMpUser();
        }
      }, 1000);
    },
    getVipUser() {
      // 获取管理院会员
      this.$axios
        .fetchGet("/Home/Member/GetUcenterMember", {
          appId: this.loginId,
          page: this.page
        })
        .then(res => {
          if (res.data.code == 200) {
            this.users = this.users.concat(res.data.data);
            this.count = res.data.count;
            this.loading = false;
            if (res.data.data.length == 0) {
              this.noMore = true;
            }
          } else {
            this.noMore = true;
          }
        });
    },
    getMpUser() {
      this.$axios
        .fetchGet("/Home/Member/GetMpUser", {
          appId: this.loginId,
          page: this.page
        })
        .then(res => {
          if (res.data.code == 200) {
            this.users = this.users.concat(res.data.data);
            this.count = res.data.count;
            this.loading = false;
            if (res.data.data.length == 0) {
              this.noMore = true;
            }
          } else {
            this.noMore = true;
          }
        });
    },
    goToVipDetail(userId, userName) {
      this.$router.push({
        path: "/vip_diagnosis",
        query: { userId: userId, userName: userName, from: this.from }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.vip-container
  padding-top 100px
  .vip-ul
    margin 0 auto
    padding 10px 40px
    text-align left
    max-height 690px
    & > li
      width 235px
      display inline-block
      margin-right 27px
      margin-bottom 65px
      cursor pointer
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
        height 78px
        text-align left
        box-sizing border-box
        padding-left 20px
        color #FFFFFF
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        border 2px solid rgba(255, 255, 255, 0.15)
        background rgba(0, 0, 0, 0)
        color #fff
        font-size 30px
        line-height 78px
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        word-break break-all
  .result-num
    font-size 30px
    color #B5B5B5
    text-align left
    padding-left 40px
    padding-bottom 30px
.p1
  width 100%
  text-align center
@media screen and (max-width 1899px) {
  .vip-container{
  .vip-ul{
    & > li{
      margin-right 19px
      }
    li:nth-child(7n){
        margin-right 19px
    }
    li:nth-child(5n){
        margin-right 0
        }
  }}
}
</style>
