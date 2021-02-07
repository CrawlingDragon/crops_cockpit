<template>
  <div class="search_all-conatiner">
    <div class="result-num" v-show="count != 0">共{{ count }}个相关结果</div>
    <div class="noData" v-show="count == 0">暂无符合条件的结果</div>
    <div class="box-uls">
      <div class="box" v-show="result.data_mp.num !== 0">
        <div class="title clearfix">
          <div class="left-name">医院</div>
          <div
            class="more"
            v-show="result.data_mp.num >= 4"
            @click="goToSecondRoute('医院')"
          >
            更多&gt;
          </div>
          <div class="num">共{{ result.data_mp.num }}个相关结果</div>
        </div>
        <div class="hospital-item-wrap">
          <Hospital
            v-for="item in result.data_mp.lists"
            :key="item.appid"
            :item="item"
          ></Hospital>
        </div>
      </div>
      <div class="box" v-show="result.data_expert.num !== 0">
        <div class="title clearfix">
          <div class="left-name">专家</div>
          <div
            class="more"
            v-show="result.data_expert.num >= 4"
            @click="goToSecondRoute('专家')"
          >
            更多&gt;
          </div>
          <div class="num">共{{ result.data_expert.num }}个相关结果</div>
        </div>
        <div class="hospital-item-wrap">
          <Expert
            v-for="item in result.data_expert.lists"
            :key="item.uid"
            :item="item"
            class="expert"
            :adminFrom="true"
          ></Expert>
        </div>
      </div>
      <div class="box" v-show="result.data_zuowu.num !== 0">
        <div class="title clearfix">
          <div class="left-name">作物</div>
          <div
            class="more"
            v-show="result.data_zuowu.num >= 4"
            @click="goToSecondRoute('作物')"
          >
            更多&gt;
          </div>
          <div class="num">共{{ result.data_zuowu.num }}个相关结果</div>
        </div>
        <div class="hospital-item-wrap">
          <Zuowu
            v-for="item in result.data_zuowu.lists"
            :key="item.fid"
            :item="item"
          ></Zuowu>
        </div>
      </div>
      <div class="box" v-show="result.data_user.num !== 0">
        <div class="title clearfix">
          <div class="left-name">会员</div>
          <div
            class="more"
            v-show="result.data_user.num >= 4"
            @click="goToSecondRoute('会员')"
          >
            更多&gt;
          </div>
          <div class="num">共{{ result.data_user.num }}个相关结果</div>
        </div>
        <div class="hospital-item-wrap">
          <Vip
            v-for="item in result.data_user.lists"
            :key="item.id"
            :item="item"
          ></Vip>
        </div>
      </div>
      <div class="box" v-show="result.data_zuozhen.num !== 0">
        <div class="title clearfix">
          <div class="left-name">坐诊</div>
          <div
            class="more"
            v-show="result.data_zuozhen.num >= 4"
            @click="goToSecondRoute('坐诊')"
          >
            更多&gt;
          </div>
          <div class="num">共{{ result.data_zuozhen.num }}个相关结果</div>
        </div>
        <div class="hospital-item-wrap">
          <Xunzhen
            v-for="item in result.data_zuozhen.lists"
            :key="item.id"
            :item="item"
            iszuozhen="zuozhen"
          ></Xunzhen>
        </div>
      </div>
      <div class="box" v-show="result.data_xunzhen.num !== 0">
        <div class="title clearfix">
          <div class="left-name">巡诊</div>
          <div
            class="more"
            v-show="result.data_xunzhen.num >= 4"
            @click="goToSecondRoute('巡诊')"
          >
            更多&gt;
          </div>
          <div class="num">共{{ result.data_xunzhen.num }}个相关结果</div>
        </div>
        <div class="hospital-item-wrap">
          <Xunzhen
            v-for="item in result.data_xunzhen.lists"
            :key="item.id"
            :item="item"
            iszuozhen="xunzhen"
          ></Xunzhen>
        </div>
      </div>
      <div class="box" v-show="result.data_wen.num !== 0">
        <div class="title clearfix">
          <div class="left-name">网诊</div>
          <div
            class="more"
            v-show="result.data_wen.num >= 4"
            @click="goToSecondRoute('网诊')"
          >
            更多&gt;
          </div>
          <div class="num">共{{ result.data_wen.num }}个相关结果</div>
        </div>
        <div class="hospital-item-wrap">
          <OnlineItem
            v-for="item in result.data_wen.lists"
            :key="item.id"
            :item="item"
          ></OnlineItem>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Hospital from "@/components/search_hospital_item/search_hospital_item";
import Expert from "@/components/expert/expert";
import Zuowu from "@/components/search_zuowu/search_zuowu";
import Vip from "@/components/search_vip/search_vip";
import OnlineItem from "@/components/online_item/online_item";
import Xunzhen from "@/components/search_xunzhen/search_xunzhen";

export default {
  name: "search_all",
  components: { Hospital, Expert, Zuowu, Vip, OnlineItem, Xunzhen },
  props: ["result", "count"],
  data() {
    return { noData: false };
  },
  computed: {},
  watch: {},
  mounted() {},
  destroyed() {},
  methods: {
    goToSecondRoute(where) {
      switch (where) {
        case "医院":
          this.$router.replace({
            path: "/search/search_hospital"
          });
          break;
        case "专家":
          this.$router.replace({
            path: "/search/search_expert"
          });
          break;
        case "作物":
          this.$router.replace({
            path: "/search/search_zuowu"
          });
          break;
        case "会员":
          this.$router.replace({
            path: "/search/search_vip"
          });
          break;
        case "坐诊":
          this.$router.replace({
            path: "/search/search_zuozhen"
          });
          break;
        case "巡诊":
          this.$router.replace({
            path: "/search/search_xunzhen"
          });
          break;
        case "网诊":
          this.$router.replace({
            path: "/search/search_wangzhen"
          });
          break;
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.search_all-conatiner
  text-align left
  width 1330px
  margin 0 auto
  .result-num
    font-size: 24px;
    color: #C5C5C5;
    padding 20px 0 7px
  .box-uls
    .box
      padding-top 40px
      padding-bottom 15px
      .title
        height 35px
        line-height 35px
        margin-bottom 10px
        .left-name
          float left
          font-size: 30px;
          color: #FFFFFF;
        .num
          font-size: 24px;
          color: #C5C5C5;
          float right
        .more
          float right
          font-size: 24px;
          color: rgba(255, 102, 0, 1)
          margin-left 40px
          cursor pointer
      .hospital-item-wrap
        width 100%
        padding 30px 19px
        background rgba(7, 47, 101, 1)
        .expert
          margin-bottom 20px
          /deep/.text
            border: 2px solid rgba(255, 255, 255, 0.15);
      .online_item-container
        padding 0
</style>
