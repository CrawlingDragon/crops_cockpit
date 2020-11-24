<template>
  <div class="contain">
    <div class="head">
      <Headers
        :title="title"
        :returnPath="this.returnPath"
        midTitle="我的会员"
      ></Headers>
    </div>
    <div class="my_huiyuan">
      <div
        class="single_huiyuan"
        v-for="(item, index) in this.huiyuan_list"
        v-infinite-scroll="load"
        :key="index"
        infinite-scroll-distance="15px"
        @click="watch_detail(item)"
      >
        <el-image class="photo" :src="item.avatar"></el-image>
        <div class="intro">
          <div class="name">{{ item.name }}</div>
          <p class="skills">{{ item.zuowu_mushu }}</p>
        </div>
      </div>
    </div>
    <div class="total" v-if="this.total !== 0">共计{{ this.total }}个结果</div>
    <div class="temporary" v-if="this.total == 0">
      <div>暂无会员</div>
      <div>请先使用新型庄稼医院管理平台录入会员</div>
    </div>
  </div>
</template>
<script>
import Headers from "../../components/online_hospital_header/online_hospital_header";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      huiyuan_list: [], // 会员列表
      page: 1, // 当前页数
      total: "", // 当前会员总数
      title: "我的会员",
      returnPath: "/index_second",
      from: this.$route.query.from
    };
  },
  components: {
    Headers
  },
  computed: {
    ...mapState(["appId", "purview", "lowerHospital"])
  },
  mounted() {
    this.gethuiyuan_list(1, 14);
    this.title =
      this.purview == 3 || this.purview == 4 ? this.lowerHospital : "我的会员";
  },
  methods: {
    gethuiyuan_list(page, pagesize) {
      this.$axios
        .fetchPost("/Home/Member/GetMpUser", {
          appId: this.appId,
          keyword: "",
          page: page,
          pagesize: pagesize
        })
        .then(res => {
          if (res.data.code == "200") {
            this.total = res.data.count;
            if (this.page == 1) {
              this.huiyuan_list = res.data.data;
            } else {
              this.huiyuan_list.push(...res.data.data);
            }
            this.loading = false;
          }
        });
    },
    ...mapMutations(["getHuiyuanName", "getHuiyuanId"]),
    watch_detail(item) {
      this.getHuiyuanName(item.name);
      this.getHuiyuanId(item.id);
      window.sessionStorage.setItem("huiyuan_id", item.id);
      window.sessionStorage.setItem("huiyuan_name", item.name);
      window.sessionStorage.setItem("huiyuan_uid", item.uid);
      this.$router.push({
        path: "/second_huiyuan_itro/huiyuan_jianjie",
        query: {
          id: item.id,
          name: item.name
        }
      });
    },
    load() {
      // 是否当前page不是最后一页
      if (this.page < Math.ceil(this.total / 14)) {
        // 页码+1
        this.page++;
        this.gethuiyuan_list(this.page);
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.contain
  padding-top 100px
  .my_huiyuan
    margin 0 auto
    min-width 1340px
    max-width 1900px
    padding 0 40px
    height 500px
    @media screen and (min-width:1900px)
      height 700px
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
    .single_huiyuan
        height 329px
        width 232px
        margin 0px 20px 20px 0px
        float left
        @media screen and (max-width:1340px)
            &:nth-child(5n+0)
                margin-right 0px
        @media screen and (min-width:1900px)
            height 334px
            width 235px
            margin 0px 28px 29px 0px
            float left
            &:nth-child(7n+0)
                margin-right 0px
        .photo
            width 232px
            height 232px
            display block
            @media screen and (min-width:1900px)
                width 235px
                height 235px
        .intro
            width 232px
            height 99px
            font-family Microsoft YaHei
            font-weight Regular
            @media screen and (min-width:1900px)
                width 235px
                height 99px
            border 2px solid rgba(255, 255, 255, 0.15)
            .name
                margin 10px auto 8px 19px
                font-size 30px
                text-align left
                color #FFFFFF
            .skills
                font-size 24px
                text-align left
                color #808080
                margin 0px 0px 16px 20px
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
.total
    position fixed
    left 40px
    bottom 79px
    color #B5B5B5
    font-size 24px
.temporary
    font-size 30px
    line-height 50px
    color #FFFFFF
    width 800px
    height 200px
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%); /* 50%为自身尺寸的一半 */
    -webkit-transform: translate(-50%, -50%);
</style>
