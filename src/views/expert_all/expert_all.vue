<template>
  <div class="contain">
    <div class="header">
      <Headnav :lefttitle="this.lefttitle" @datatype="datachange"></Headnav>
    </div>
    <div class="expert_list" ref="expert_list" v-infinite-scroll="load">
      <div
        class="expert_info"
        v-for="(item, index) in expert_list"
        :key="index"
        @click="godetail(item, index)"
      >
        <img class="photo" v-lazy="item.avatar" alt="图片好像不见了" />
        <span class="name">{{ item.realname }}</span>
        <div class="tag">专家</div>
        <div class="intro">
          <p :class="[item.position.length == 1 ? 'company1' : 'company']">
            {{ item.position }}
          </p>
          <span class="join_time">加入时间：{{ item.jointime }}</span>
          <p class="skills" v-if="item.zuowu">擅长作物：{{ item.zuowu }}</p>
          <span class="chufang">处方({{ item.chufangcount }})</span>
          <span class="cut_line">|</span>
          <span class="join_hospital">加入医院({{ item.hospitalcount }})</span>
        </div>
      </div>
    </div>
    <!-- <div class="loading" v-show="loading">正在加载数据......</div> -->
    <div class="expert_num">共{{ this.total }}个结果</div>
    <Nodata v-if="this.total == 0"></Nodata>
  </div>
</template>
<script>
import Headnav from "../../components/head_nav/head_nav";
import Nodata from "../../components/no-data/no-data";
import { mapMutations, mapState } from "vuex";
export default {
  components: {
    Headnav,
    Nodata
  },
  data() {
    return {
      expert_list: [],
      curuserid: "", // 当前的用户ID
      total: 0,
      page: 1, // 当前页数
      lefttitle: "所有专家",
      returnpath: "/findindex"
    };
  },
  computed: {
    ...mapState(["prevroute", "loginId", "purview"])
  },
  created() {
    this.userid = window.sessionStorage.getItem("curuserid");
    this.getexpert_list(this.page);
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      if (vm.purview == 46) {
        vm.returnpath = "/index_first";
        return false;
      }
      if (
        from.path == "/indexFour" ||
        from.path == "/findindex" ||
        from.path == "/data_analysis"
      ) {
        vm.returnpath = from.path;
        vm.getPrevroute(from.path);
      } else if (from.path == "/expert_detail_four" || from.path == "/") {
        // 加入from.path是因为 点击选择全部医院或者新型医院后vuex中记录的上级页面信息的路由消失了
        // 将上一级的路由信息存成本地存储 如果vuex失效 访问本地缓存
        if (
          vm.prevroute == "/indexFour" ||
          localStorage.getItem("prevroute") == "/indexFour"
        ) {
          vm.returnpath = "/indexFour";
        } else if (
          vm.prevroute == "/data_analysis" ||
          localStorage.getItem("prevroute") == "/data_analysis"
        ) {
          vm.returnpath = "/data_analysis";
        }
      }
    });
  },
  methods: {
    ...mapMutations(["getPrevroute"]),
    godetail(item, index) {
      window.sessionStorage.setItem("expert_uid", item.uid);
      this.$router.push({
        path: "/expert_detail_four",
        query: { appId: this.userid, uid: item.uid }
      });
    },
    getexpert_list(curpage) {
      const rLoading = this.openLoading();
      this.$axios
        .fetchPost("/Home/Expert/GetMpExpertList", {
          appId: this.loginId,
          purview: "1",
          page: curpage,
          isstore: window.sessionStorage.getItem("isstore")
        })
        .then(res => {
          rLoading.close();
          if (res.data.code == "200") {
            this.total = res.data.maxitem;
            if (this.page == 1) {
              this.expert_list = res.data.data;
            } else {
              this.expert_list.push(...res.data.data);
            }
          }
        });
    },
    load() {
      // 是否当前page不是最后一页
      if (this.page <= Math.ceil(this.total / 12)) {
        // 页码+1
        this.page++;
        this.getexpert_list(this.page);
      }
    },
    datachange(value) {
      if (value) {
        location.reload();
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.contain
    width 100%
    height 100%
    background-color: rgba(3, 5, 57, 1);
    margin 0 auto
    .header
      width 100%
    .expert_list
        margin 0 40px
        width 100%
        margin-top 53px
        height 560px
        @media screen and (min-width:1900px) {
            height 741px
        }
        overflow scroll
        overflow-x hidden
        .expert_info
            position relative
            height 180px
            width 49%
            float left
            margin-right 1.8%
            margin-bottom 5px
            border 2px solid rgba(255, 255, 255, 0.15)
            &:nth-child(2n+0)
                margin-right 0px
            @media screen and (min-width:1900px) {
                height 235px
                margin-bottom 18px
            }
            .photo
                position absolute
                height 176px
                width 180px
                top 0px
                left 0px
                @media screen and (min-width:1900px) {
                    width 235px
                    height 231px
                }
            .name
                margin 15px 10px auto 32%
                font-size 30px
                float left
                font-family Source Han Sans CN
                font-weight 400
                color #FFFFFF
                @media screen and (min-width:1900px) {
                    margin 22px 18px auto 266px
                }
            .tag
                display inline-block
                margin-top 15px
                float left
                width 60px
                height 35px
                background: #FF6600
                border-radius 16px
                font-size 20px
                font-family SimHei
                font-weight 400
                color #FFFFFF
                line-height 35px
                @media screen and (min-width:1900px) {
                    margin-top 18px
                    font-size 24px
                    width 95px
                    height 38px
                    line-height 38px
                }
            .intro
                position absolute
                width 70%
                height 54%
                top 35%
                left 32%
                font-size 20px
                font-family SimHei
                font-weight Regular
                line-height 28px
                @media screen and (min-width:1900px) {
                    left 30%
                    line-height 35px
                }
                .company
                    width 100%
                    float left
                    text-align left
                    vertical-align top
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
                    color #808080
                .company1
                    display none
                .join_time
                    width 100%
                    float left
                    text-align left
                    color #808080
                .skills
                    width 90%
                    float left
                    text-align left
                    vertical-align top
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
                    color #FFFFFF
                .chufang,.cut_line,.join_hospital
                    float left
                    color #FFFFFF
    .expert_num
        position fixed
        left 44px
        bottom 66px
        font-size 16px
        font-family SimHei
        font-weight Regular
        color #B5B5B5
        @media screen and (min-width:1900px) {
            font-size 24px
        }
</style>
