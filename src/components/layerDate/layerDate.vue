<template>
  <div class="index_layer_date" v-show="showFlag" @click="hide_layer">
    <div class="layer-container">
      <div class="title">浙江省网上庄稼医院-下级医院数据统计</div>
      <div class="left-box">
        <div class="item">
          <div class="t">庄稼<br />医院</div>
          <div class="r">
            <p class="p1"> {{ countDate.isstore}}所</p>
            <p>其中<span>{{countDate.mpublic}}</span>所实体店</p>
            <p v-if="countDate.new_mpublic !== '0'">今日新增： <span>{{countDate.new_mpublic}}</span></p>
          </div>
        </div>
        <div class="item">
          <div class="t">专家</div>
          <div class="r">
            <p class="p1">{{countDate.expert}}位</p>
            <p v-if="countDate.new_expert !== 0">今日新增：<span>{{countDate.new_expert}}</span></p>
          </div>
        </div>
        <div class="item">
          <div class="t">会员</div>
          <div class="r">
            <p class="p1">{{countDate.user}}个</p>
            <p v-if="countDate.new_user !== 0">今日新增： <span>{{countDate.new_user}}</span></p>
          </div>
        </div>
        <div class="item">
          <div class="t">三诊</div>
          <div class="r">
            <p class="p1">{{countDate.wenzhen}}次</p>
            <p v-if="countDate.new_wenzhen !== 0">今日新增： <span>{{countDate.new_wenzhen}}</span></p>
          </div>
        </div>
        <div class="item">
          <div class="t">测土<br />配方</div>
          <div class="r">
            <p class="p1">{{countDate.cetu}}次</p>
            <p v-if="countDate.new_cetu !== 0">今日新增： <span>{{countDate.new_cetu}}</span></p>
          </div>
        </div>
      </div>
      <div class="right-box">
        <div class="echart-box">
          <v-chart :options="polar" class="echart-c" />
        </div>
        <el-table :data="lists" style="width: 100%;text-align:center" :border="false" class-name="mytable">
          <el-table-column prop="name" label="地区">
          </el-table-column>
          <el-table-column prop="num" label="庄稼医院">
          </el-table-column>
          <el-table-column prop="isstore" label="实体店医院">
          </el-table-column>
          <el-table-column prop="expert" label="专家">
          </el-table-column>
          <el-table-column prop="member" label="会员">
          </el-table-column>
          <el-table-column prop="wenzhen" label="三诊">
          </el-table-column>
          <el-table-column prop="cetu" label="测土配方">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "../../http.js";
import { getUrlQuery } from "@/common/js/util.js";
import ECharts from "vue-echarts";
import "echarts/lib/chart/bar";
export default {
  name: "index_layer_date",
  components: {
    "v-chart": ECharts
  },
  props: {
    showFlag: {
      type: Boolean,
      default: false
    },
    countDate: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      chart: [],
      lists: [], //table 数据
      appid: "",
      polar: {}
    };
  },
  computed: {
    xList() {
      const arr = [];
      this.chart.forEach((item, index) => {
        arr.push(item.name);
      });
      return arr;
    },
    sList() {
      const arr = [];
      this.chart.forEach((item, index) => {
        arr.push(item.num);
      });
      return arr;
    }
  },
  watch: {
    chart() {
      this.initPolar();
    }
  },
  created() {
    this.appid = getUrlQuery("appid");
  },
  mounted() {
    this.getAreaList();
  },
  destroyed() {},
  methods: {
    getAreaList() {
      //获取网院区域统计
      axios
        .fetchPost("/Home/Manage/GetManageMpAreaData", { appId: this.appid })
        .then(res => {
          if (res.data.code === "200") {
            this.chart = res.data.data.chart;
            this.lists = res.data.data.lists;
          }
        });
    },
    initPolar() {
      this.polar = {
        xAxis: {
          type: "category",
          data: this.xList,
          axisLine: {
            lineStyle: { color: "#FF6600", width: 4 }
          }
        },
        yAxis: {
          type: "value",
          show: false
        },
        series: [
          {
            data: this.sList,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0)"
            },
            barWidth: "20%",
            itemStyle: {
              color: "#FF6600"
            },
            label: {
              show: true,
              position: "top"
            }
          }
        ]
      };
    },
    hide_layer() {
      this.$emit("changeShowFlag", false);
    }
  }
};
</script>
<style lang="stylus" scoped>
.index_layer_date
  position fixed
  left 0
  right 0
  top 0
  bottom 0
  background rgba(2, 10, 39, 0.9)
  z-index 22
  overflow auto
  .layer-container
    width 1450px
    margin 0 auto
    padding-top 100px
    display flex
    flex-wrap wrap
    padding-bottom 100px
    text-align left
    .title
      width 100%
      font-size 60px
      font-family SimHei
      font-weight 400
      color rgba(255, 255, 255, 1)
      line-height 1.2
      margin-bottom 40px
    .left-box
      width 420px
      border 2px solid rgba(7, 47, 101, 1)
      height 713px
      & > .item
        height 142px
        border-bottom 1px solid #072F65
        display flex
        .t
          width 140px
          background rgba(12, 41, 84, 0.5)
          font-size 32px
          text-align center
          line-height 1.2
          display flex
          align-items center
          justify-content center
        .r
          flex 1
          background #091D44
          padding-left 24px
          color #FFFDFD
          display flex
          flex-wrap wrap
          flex-direction column
          justify-content center
          font-family SimHei
          p
            font-size 24px
            line-height 32px
            width 100%
            margin-bottom 5px
            span
              color #ff6600
          .p1
            font-size 32px
    .right-box
      flex 1
      margin-left 20px
      .echart-box
        width 100%
        display block
        .echart-c
          width 1010px
      /deep/.el-table, /deep/.el-table__expanded-cell, /deep/.el-table th, /deep/.el-table tr
        background-color #091D44
        border-bottom 1px solid rgba(255, 255, 255, 0.2)
        color #fff
      /deep/.el-table td, /deep/ .el-table th.is-leaf
        border-bottom 1px solid rgba(255, 255, 255, 0.2)
      .el-table--border::after, .el-table--group::after, .el-table::before
        display none
      /deep/.el-table--enable-row-hover
        .el-table__body tr
          &:hover
            td
              background #999
</style>
