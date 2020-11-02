<template>
  <div :style="{overflow:'showTableFlag'?'hidden':''}">
    <Headers logoSrc="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592223004241&di=e1ea4d4a1d3237e81b1ae84e5299a2b6&imgtype=0&src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201202%2F13%2F20120213114436_HxfS5.jpg" :title="indexDate.name"></Headers>
    <div class="index-container">
      <div class="left" @click="showTable">
        <ul>
          <li>
            <div class="titles">
              <div>庄稼</div>
              <div>医院</div>
            </div>
            <div class="text">
              <p>
                {{count.isstore}}所
                <br />
                <span class="small">
                  其中
                  <span class="num">{{count.isstore}}</span>
                  所实体店
                </span>
              </p>
            </div>
            <div class="up" v-if="count.new_mpublic != 0">
              <span class="icon"></span>
              <span class="up-num">{{count.new_mpublic}}</span>
            </div>
          </li>
          <li>
            <div class="title">专家</div>
            <div class="text">{{count.expert}}位</div>
            <div class="up" v-if="count.new_expert != 0">
              <span class="icon"></span>
              <span class="up-num">{{count.new_expert}}</span>
            </div>
          </li>
          <li>
            <div class="title">会员</div>
            <div class="text">{{count.user}}个</div>
            <div class="up" v-if="count.new_user != 0">
              <span class="icon"></span>
              <span class="up-num">{{count.new_user}}</span>
            </div>
          </li>
          <li>
            <div class="title">三诊</div>
            <div class="text">{{count.wenzhen}}次</div>
          </li>
          <li>
            <div class="titles">
              <div>测土</div>
              <div>配方</div>
            </div>
            <div class="text">{{count.cetu}}次</div>
          </li>
        </ul>
      </div>
      <div class="mid">
        <hospital :list="indexDate.mpublic"></hospital>
      </div>
      <div class="right">
        <Message :list="message"></Message>
        <div class="expert-box">
          <expert :list="expertArr"></expert>
        </div>
      </div>
    </div>
    <div class="nav-box">
      <div class="item i1" @click="goToHistory">
        <div class="icon icon01"></div>
        <p>浏览历史</p>
      </div>
      <div class="item i2" @click="goToSearch">
        <div class="icon icon02"></div>
        <p>搜索</p>
      </div>
      <div class="item i3" @click="goToHospital">
        <div class="icon icon03"></div>
        <p>医院本级</p>
      </div>
      <div class="item i4" @click="goToHospitalList">
        <div class="icon icon04"></div>
        <p>医院综合排序</p>
      </div>
    </div>
    <Nav></Nav>
    <layerBar :showFlag="showTableFlag" :countDate="count" @changeShowFlag="changeLayerFlag"></layerBar>
  </div>
</template>
<script>
import Headers from "@/components/headers/headers";
import ExpertRankingList from "@/components/expert_ranking_list/expert_ranking_list";
import HospitalList from "@/components/hospital_list/hospital_list";
import Nav from "@/components/nav_list/nav_list";
import layerBar from "@/components/layerDate/layerDate";
import { getUrlQuery } from "@/common/js/util.js";
import Message from "@/components/message_list/message_list";
import { mapMutations } from "vuex";
export default {
  name: "indexFirst",
  components: {
    Headers,
    Expert: ExpertRankingList,
    hospital: HospitalList,
    Nav,
    layerBar,
    Message,
  },
  props: {},
  data() {
    return {
      query: "",
      indexDate: "",
      count: {},
      expertArr: [],
      message: [],
      showTableFlag: false,
    };
  },
  computed: {},
  created() {
    this.query = getUrlQuery("appid");
    this.getAppId(getUrlQuery("appid"));
  },
  watch: {
    indexDate(newVal) {
      this.expertArr = newVal.expert.slice(0, 3);
    },
    $route(newVal) {
      this.getIndexDate(newVal.query.appid);
      this.getMessageDate(newVal.query.appid);
    },
  },
  mounted() {
    this.getIndexDate(this.query);
    this.getMessageDate(this.query);
    this.getPurviewFn();
  },
  destroyed() {},
  methods: {
    ...mapMutations(["getAppId", "getPurview"]),
    getIndexDate(query) {
      // 获取首页数据
      this.$axios
        .fetchPost("/Home/Manage/GetManageMPIndexData", { appId: query })
        .then((res) => {
          if (res.data.code === "200") {
            this.indexDate = res.data.data;
            this.count = res.data.data.count;
          }
        });
    },
    getMessageDate(query) {
      // 获取通知数据
      this.$axios
        .fetchPost("/Home/Manage/GetManageMessageData", { appId: query })
        .then((res) => {
          if (res.data.code === "200") {
            this.message = res.data.data;
          }
        });
    },
    getPurviewFn() {
      // 获取医院类型
      this.$axios
        .fetchPost("/Home/Index/GetIndexMpData", { appId: this.query })
        .then((res) => {
          if (res.data.code == 200) {
            this.getPurview(res.data.data.purview);
            if (res.data.data.isview === 1) {
              this.$router.push({
                path: "/index_second",
              });
            } else if (res.data.data.isview === 2) {
              this.$router.push({
                path: "/index_third",
              });
            }
          }
        });
    },
    showTable() {
      this.showTableFlag = true;
    },
    changeLayerFlag(boolean) {
      this.showTableFlag = boolean;
    },
    goToHistory() {
      // 去到 浏览历史
      this.$router.push({
        path: "/history",
      });
    },
    goToSearch() {
      // 去到搜索页
      this.$router.push({
        path: "/search",
      });
    },
    goToHospital() {
      // 去到医院本级
      this.$router.push({
        path: "/me",
      });
    },
    goToHospitalList() {
      // 去到医院列表
      this.$router.push({
        path: "/hospital",
      });
    },
  },
};
</script>
<style lang="stylus" scoped>
.index-container
  display flex
  padding 0 90px
  .left
    width 409px
    margin-right 30px
    ul
      border 1px solid #eee
      height 586px
      background rgba(9, 29, 68, 1)
      border 2px solid rgba(7, 47, 101, 1)
      li
        display flex
        border 2px solid #072F65
        position relative
        .title, .titles
          width 140px
          height 113px
          display flex
          align-items center
          justify-content center
          background rgba(12, 41, 84, 0.5)
          font-size 32px
          line-height 1.1
          flex-direction column
        .text
          flex 1
          text-align left
          padding-left 24px
          display flex
          align-items center
          color #FFFDFD
          font-size 32px
          line-height 1.1
          .small
            font-size 22px
            .num
              color #FF6600
        .up
          position absolute
          right 32px
          top 45px
          color #fff
          .icon
            width 20px
            height 26px
            margin-right 10px
            display inline-block
            background url('./1.png') no-repeat
          .up-num
            font-size 28px
            font-family SimHei
            font-weight 400
  .mid
    width 409px
    margin-right 30px
  .right
    flex 1
    min-width 0
    overflow hidden
.nav-box
  width 100%
  display flex
  padding 0 90px
  & > .item
    flex 1
    margin-right 30px
    box-sizing border-box
    height 198px
    align-items center
    display flex
    justify-content space-around
    cursor pointer
    &.i1
      background #2494DE
    &.i2
      background #DA3266
    &.i3
      background #EBB701
    &.i4
      background #7B70FA
    &:last-child
      margin-right 0
    .icon01
      width 92px
      height 70px
      background url('./5.png') no-repeat
      background-position center
      background-size 100%
    .icon02
      width 90px
      height 91px
      background url('./16.png') no-repeat
      background-position center
      background-size 100%
    .icon03
      width 75px
      height 75px
      background url('./15.png') no-repeat
      background-position center
      background-size 100%
    .icon04
      width 92px
      height 71px
      background url('./6.png') no-repeat
      background-position center
      background-size 100%
    & > p
      font-size 36px
      font-family SimHei
      font-weight 400
      color rgba(255, 255, 255, 1)
</style>
