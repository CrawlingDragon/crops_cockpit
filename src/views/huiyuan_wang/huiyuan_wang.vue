<template>
  <div class="vip_diagnosis-container">
    <ul
      class="diagnosis-ul"
      v-infinite-scroll="load"
      infinite-scroll-distance="15px"
    >
      <li
        v-for="(item, index) in this.wangzhenlist"
        :key="index"
        @click="godetail(item)"
      >
        <div class="icon"></div>
        <div class="text">
          <p class="p1">
            {{ item.title }}
            <span>{{ item.showtime }}</span>
          </p>
          <p class="p2">{{ item.content }}</p>
        </div>
        <div class="answer">
          <p class="p3">回复数：{{ item.replies }}</p>
          <el-image class="img" :src="item.thumb_pic">
            <div slot="placeholder" class="image-slot">
              <img class="loading" src="../../assets/65.png" alt="" />
            </div>
            <div slot="error" class="image-slot">
              <img class="loading" src="../../assets/65.png" alt="" />
            </div>
          </el-image>
        </div>
      </li>
    </ul>
    <div class="result-num" v-if="this.total != 0">
      共{{ this.total }}个结果
    </div>
    <div class="temporary" v-if="this.total == 0">
      暂无提问
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Nodata from "../../components/no-data/no-data";
export default {
  name: "huiyuan_wang",
  props: {
    from: {
      type: String,
      default: ""
    },
    userId: "",
    uId: ""
  },
  components: {
    Nodata
  },
  data() {
    return {
      wangzhenlist: "",
      total: "",
      page: 1,
      userid: this.userId
    };
  },
  computed: {
    ...mapState(["loginId", "appId"])
  },
  watch: {},
  created() {
    this.getwanginfo(1, 10);
  },
  methods: {
    getwanginfo(page, pagesize) {
      this.openLoading();
      this.$axios
        .fetchPost("/Home/Treatment/GetWenList", {
          appId: this.from === "general" ? this.loginId : this.appId,
          Id: this.userid,
          page: page,
          pagesize: pagesize,
          purview: this.from === "general" ? 1 : 0,
          idtype: this.from === "general" ? 2 : 1
        })
        .then(res => {
          this.openLoading().close();
          if (res.data.code == "200") {
            if (res.data.data.length != 0) {
              this.total = res.data.count;
            }

            if (this.page == 1) {
              this.wangzhenlist = res.data.data;
            } else {
              this.wangzhenlist.push(...res.data.data);
            }
          }
        });
    },
    godetail(item) {
      console.log(item);
      this.$router.push({
        path: "/wangzhen_detail",
        query: { tid: item.tid, title: item.title }
      });
    },
    load() {
      // 是否当前page不是最后一页
      if (this.page < Math.ceil(this.total / 10)) {
        // 页码+1
        this.page++;
        this.getwanginfo(this.page, 10);
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.vip_diagnosis-container
  .diagnosis-ul
    margin 0px 40px
    height 429px
    padding 3px
    @media screen and (min-width:1900px) {
      height 741px
    }
    overflow scroll
    overflow-x hidden
    scrollbar-arrow-color rgba(3, 5, 57, 1)
    scrollbar-base-color hsla(0, 0%, 53%, 0.4)
    scrollbar-track-color rgba(3, 5, 57, 1)
    scrollbar-shadow-color hsla(0, 0%, 53%, 0.1)
    &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        background: transparent;
    }
    &::-webkit-scrollbar-thumb {
        background: transparent;
        border-radius: 4px;
    }
    &:hover::-webkit-scrollbar-thumb {
        background: hsla(0, 0%, 53%, 0.4);
    }
    &:hover::-webkit-scrollbar-track {
        background: hsla(0, 0%, 53%, 0.1);
    }
    li
      border 1px solid rgba(255, 255, 255, 0.2)
      display flex
      text-align left
      height 220px
      padding-top 22px
      margin-bottom 11px
      overflow: hidden;
      padding-bottom 20px
      &:hover
        outline 3px solid #FF6600
        box-shadow 0px 1px 26px #f60
      .icon
        width 30px
        height 35px
        background url('../vip_diagnosis/21.png') no-repeat
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
          overflow hidden
          text-overflow ellipsis
          display -webkit-box
          -webkit-line-clamp 3
          -webkit-box-orient vertical
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
          .loading
            width 110px
            height 110px
  .result-num
    text-align left
    margin-left 40px
    font-size 24px
    color #B5B5B5
    padding 30px 0
  .temporary
    font-size 30px
    line-height 36px
    color #FFFFFF
    width 300px
    height 200px
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%); /* 50%为自身尺寸的一半 */
    -webkit-transform: translate(-50%, -50%);
</style>
