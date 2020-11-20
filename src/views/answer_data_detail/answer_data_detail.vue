<template>
  <div class="answer_data_detail-container">
    <div class="header" @click="goToAnalysis">
      <div class="icon"></div>
      <div class="p">问答数据详情</div>
    </div>
    <div class="answer-content">
      <div class="tabar">
        <div
          class="item"
          @click="showFlag = 'a'"
          :class="{ active: showFlag == 'a' }"
        >
          作物
        </div>
        <div
          class="item"
          @click="showFlag = 'b'"
          :class="{ active: showFlag == 'b' }"
        >
          医院
        </div>
      </div>
      <div class="content content01" v-show="showFlag == 'a'">
        <div class="title">前10作物</div>
        <div class="echart-box" id="zuowu"></div>
        <div class="title">数据明细</div>
        <div class="table-box">
          <div class="table">
            <div class="item item-th">
              <div class="">作物</div>
              <div class="">提问数</div>
              <div class="">占比</div>
            </div>
            <div class="item" v-for="item in zuowuData" :key="item.title">
              <div class="name">
                {{ item.title }}
              </div>
              <div class="number">
                {{ item.chartnum }}
              </div>
              <div class="number">
                {{ item.chartnum_per }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content content02" v-show="showFlag == 'b'">
        <div class="title">前10医院</div>
        <div class="echart-box" id="hospital"></div>
        <div class="title">数据明细</div>
        <div class="table-box">
          <div class="table">
            <div class="item item-th item2">
              <div class="">医院</div>
              <div class="">会员提问数</div>
              <div class="">提问数占比</div>
              <div class="">回复数</div>
              <div class="">回复率</div>
            </div>
            <div
              class="item item2"
              v-for="item in hospitalData"
              :key="item.title"
            >
              <div class="name">{{ item.title }}</div>
              <div class="number">{{ item.chartnum_thread }}</div>
              <div class="number">{{ item.chartnum_thread_per }}</div>
              <div class="number">{{ item.chartnum_reply }}</div>
              <div class="number">{{ item.chartnum_reply_per }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
// var index = 0;
const echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/pie");
require("echarts/lib/chart/bar");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/legend");
export default {
  name: "answer_data_detail",
  components: {},
  props: {},
  data() {
    return {
      showFlag: "a",
      showRwo: true,
      hospitalData: [],
      zuowuData: []
    };
  },
  computed: {
    ...mapState(["appId"]),
    zuowu() {
      const arr = [];
      const arr1 = [];
      const arr2 = [];
      this.zuowuData.forEach(item => {
        if (item.title != "全部") {
          arr.push(item.title);
          arr1.push(item.chartnum);
          arr2.push({
            name: item.title,
            value: item.chartnum
          });
        }
      });
      return {
        title: arr.reverse(),
        number: arr1.reverse(),
        dataArr: arr2
      };
    },
    hospital() {
      const arr = [];
      const arr1 = [];
      this.hospitalData.forEach(item => {
        if (item.title != "全部") {
          arr.push(item.title);
          arr1.push(item.chartnum_thread);
        }
      });
      return { name: arr.reverse(), number: arr1.reverse() };
    }
  },
  watch: {
    showFlag(newVal) {
      if (newVal == "b" && this.showRwo) {
        setTimeout(() => {
          this.initHospital();
          this.showRwo = false;
        }, 500);
      }
    }
  },
  mounted() {
    this.getZuowu();
    // this.initHospital()
    this.getHospitalTop();
  },
  destroyed() {},
  methods: {
    getHospitalTop() {
      this.$axios
        .fetchGet(
          "/Home/DatavDemo/getWenAmount?appId=" + this.appId + "&action=total"
        )
        .then(res => {
          this.hospitalData = res.data;
          // this.initHospital()
        });
    },
    getZuowu() {
      this.$axios
        .fetchGet(
          "/Home/DatavDemo/getZuowu??appId=" + this.appId + "&action=total"
        )
        .then(res => {
          this.zuowuData = res.data;
          this.initZuowu();
        });
    },

    goToAnalysis() {
      this.$router.push({
        path: "/data_analysis"
      });
    },
    initZuowu() {
      const mapEchartP = echarts.init(document.getElementById("zuowu"));
      mapEchartP.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: this.zuowu.title,
          orient: "vertical",
          right: 10,
          top: "30%",
          bottom: 20,
          textStyle: {
            color: "#fff",
            fontSize: 24
          }
        },
        grid: [
          {
            top: 50,
            width: "60%",
            bottom: "1%",
            left: "30px",
            containLabel: true
          }
        ],

        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          axisLabel: {
            textStyle: {
              color: "#B4B4BC",
              fontSize: 24
            }
          }
          // data: this.zuowu.number
        },
        yAxis: {
          type: "category",
          axisLabel: {
            textStyle: {
              color: "#B4B4BC",
              fontSize: 24
            }
          },
          data: this.zuowu.title
        },
        series: [
          {
            name: "问答数",
            type: "bar",
            stack: "总量",
            center: ["25%", "150%"],
            label: {
              show: false,
              position: "insideRight"
            },
            data: this.zuowu.number,
            itemStyle: {
              color: "rgba(255, 232, 36, 1)"
            }
          },
          {
            tooltip: {
              trigger: "item",
              axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            name: "问答数",
            type: "pie",
            radius: [30, 110],
            center: ["79%", "50%"],
            roseType: "area",
            color: [
              "#027FF2",
              "#F19610",
              "#8A00E1",
              "#00C6FF",
              "#34D160",
              "#6054FF",
              "#ca8622",
              "#bda29a",
              "#6e7074",
              "#546570",
              "#c4ccd3"
            ],
            data: this.zuowu.dataArr
          }
        ]
      });
    },
    initHospital() {
      const mapEchartP = echarts.init(document.getElementById("hospital"));
      mapEchartP.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: [
          {
            top: 50,
            width: "70%",
            bottom: "1%",
            left: 10,
            containLabel: true
          }
        ],
        xAxis: {
          type: "value",
          axisLabel: {
            textStyle: {
              color: "#B4B4BC",
              fontSize: 24
            }
          }
        },
        yAxis: {
          type: "category",
          axisLabel: {
            textStyle: {
              color: "#B4B4BC",
              fontSize: 24
            }
          },
          data: this.hospital.name
        },
        series: [
          {
            name: "问答数量",
            type: "bar",
            stack: "总量",
            center: ["25%", "150%"],
            label: {
              show: false,
              position: "insideRight"
            },
            data: this.hospital.number,
            itemStyle: {
              color: "rgba(255, 232, 36, 1)"
            }
          }
        ]
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.answer_data_detail-container
  width 1900px
  margin 0 auto
  padding 0 40px
  .header
    height 105px
    display flex
    align-items center
    cursor pointer
    .icon
      width 30px
      height 30px
      background url('./icon.png') no-repeat
    .p
      font-size: 30px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      margin-left 20px
      color: #7FB5F1;
  .answer-content
    .tabar
      text-align center
      color #C5C5C5
      font-size: 30px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      .item
        display inline-block
        margin-right 50px
        padding 0 30px 10px
        cursor pointer
        user-select none
        &:lats-child
          margin-right 0
        &.active
          border-bottom 2px solid #FF6600
          color #FF6600
    .content
      .echart-box
        height 815px
      .title
        font-size 28px
        font-family: Microsoft YaHei;
        margin-bottom 20px
        margin-top 10px
        color #fff
        text-align left
      .table-box
        border 1px solid #072F65
        background #091D44
        padding 53px 47px
        .table
          border 1px solid rgba(255,255,255,0.2)
          .item
            height 106px
            line-height 106px
            font-size 26px
            text-align left
            border-bottom 1px solid rgba(255,255,255,0.2)
            color #fff
            &.item-th
              font-size 34px
            & > div
              display inline-block
              width 255px
              text-align center
          .item2
            & > div
              width 20%
            .number
              color rgba(255,255,255,.5)
</style>
