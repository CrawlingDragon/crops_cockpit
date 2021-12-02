<template>
  <div class="contain">
    <div class="header">
      <Headnav
        :lefttitle="this.lefttitle"
        :returnpath="this.returnpath"
        @datatype="datachange"
      ></Headnav>
    </div>
    <div class="expert_list" ref="expert_list" v-infinite-scroll="load">
      <div
        class="expert_info"
        v-for="(item, index) in expert_list"
        :key="index"
        @click="godetail(item, index)"
      >
        <img
          class="photo"
          v-lazy="item.avatar"
          alt="图片好像不见了"
          :class="{ no01: index === 0, no02: index === 1 || index === 2 }"
        />
        <span
          class="name"
          :class="{ no01: index === 0, no02: index === 1 || index === 2 }"
        >
          <i>NO.{{ index + 1 }}</i>
          {{ item.realname }}
        </span>
        <div class="intro">
          <p class="skills">擅长作物：{{ item.zuowu || "暂无" }}</p>
          <p :class="[item.position.length == 1 ? 'company1' : 'company']">
            {{ item.position }}
          </p>
        </div>
        <div class="total-number">
          总回复数<i class="">{{ item.replycounts }}</i>
        </div>
      </div>
    </div>
    <!-- <div class="loading" v-show="loading">正在加载数据......</div> -->
    <div class="expert_num">共{{ this.total }}个结果</div>
    <Nodata v-if="total == 0"></Nodata>
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
      lefttitle: "专家排行榜",
      returnpath: "/findindex"
    };
  },
  computed: {
    ...mapState(["prevroute", "loginId", "purview"]),
    no1Color(index) {
      if (index === 1) {
        return "border-color:#FF0000,color:#FF0000";
      }
    }
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
        //加入from.path是因为 点击选择全部医院或者新型医院后vuex中记录的上级页面信息的路由消失了
        //将上一级的路由信息存成本地存储 如果vuex失效 访问本地缓存
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
        .fetchPost("/Home/Expert/GetMpExpertRank", {
          appId: this.loginId,
          purview: "1",
          page: curpage,
          isstore: window.sessionStorage.getItem("isstore")
        })
        .then(res => {
          rLoading.close();
          if (res.data.code == "200") {
            this.total = res.data.total;
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
        margin 0 auto
        max-width 1790px
        margin-top 53px
        margin 0 auto
        height 740px
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
        .expert_info
            position relative
            height 235px
            width 100%
            float left
            margin-bottom 18px
            border 2px solid rgba(255, 255, 255, 0.15)
            display flex
            align-items center
            padding-right 35px
            .photo
                height 170px
                width 170px
                margin-right 58px
                border-radius: 50%;
                margin-left 35px
                border: 4px solid #fff;
            .no01
              color #FF0000 !important
              border-color #FF0000 !important
            .no02
              color #FFA335 !important
              border-color #FFA335 !important
            .name
                flex 1
                font-size 30px
                font-weight 400
                color #FFFFFF
                text-align left
                font-size: 40px;
                font-family: Microsoft YaHei;
                font-weight: 400;
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
            .intro
                flex 3
                font-size 20px
                font-family SimHei
                font-weight Regular
                line-height 28px
                min-width 0
                margin-right 20px
                .company
                    width 100%
                    text-align left
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
                    text-align left
                    vertical-align top
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
                    color #FFFFFF
                .chufang,.cut_line,.join_hospital
                    float left
                    color #FFFFFF
            .total-number
              font-size: 20px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #999999;
              display flex
              align-items center
              & > i
                font-size: 50px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                font-style: italic;
                color: #FF6600;
                margin-left 15px
    .expert_num
        position fixed
        left 44px
        bottom 20px
        font-size 24px
        font-family SimHei
        font-weight Regular
        color #B5B5B5
</style>
