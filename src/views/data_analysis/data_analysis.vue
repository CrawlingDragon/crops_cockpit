<template>
  <div class="data_analysis">
    <Header></Header>
    <div class="data_analysis-contaner">
      <div class="left">
        <div
          class="bar"
          @click.stop="goToAnswerDetail"
          :class="{ active: activeNumber == 2 }"
          style="cursor:pointer"
        >
          <div class="title">问答作物</div>
          <div id="answerPie" class="echart-box"></div>
        </div>
        <div class="bar" :class="{ active: activeNumber == 3 }">
          <div class="title">测土配方</div>
          <div class="echart-box" id="cetu"></div>
        </div>
        <div class="bar" :class="{ active: activeNumber == 4 }">
          <div class="title">销售额</div>
          <div
            class="echart-box"
            id="sale"
            style="width:95%;margin:0 auto;"
          ></div>
        </div>
      </div>
      <div class="mid">
        <div class="mid-bar">
          <div class="h2-title">
            <div class="h2" v-show="arrMainData != []">
              {{ arrMainData[activeNumber].name }}
            </div>
            <div
              class="number"
              v-for="item in arrMainData[activeNumber].number"
              :key="item.number"
            >
              <div class="text">{{ item }}</div>
            </div>
          </div>
          <Disk :hoverActive="activeNumber"></Disk>
        </div>
        <div class="bottom-bar">
          <ul>
            <li @click="bottomRouter('医院')">
              <div class="icon icon01"></div>
              <div class="text">医院</div>
            </li>
            <li @click="bottomRouter('医院数据')">
              <div class="icon icon02"></div>
              <div class="text">医院数据</div>
            </li>
            <li @click="bottomRouter('专家')">
              <div class="icon icon03"></div>
              <div class="text">专家</div>
            </li>
            <li @click="bottomRouter('专家网诊榜')" v-if="isshaoxing == 1">
              <div class="icon icon04"></div>
              <div class="text">专家网诊榜</div>
            </li>
            <li @click="bottomRouter('评分')" v-if="isshaoxing == 1">
              <div class="icon icon05"></div>
              <div class="text">评分</div>
            </li>
            <el-tooltip
              class="item"
              effect="dark"
              content="绍兴市为农服务平台"
              placement="top"
              v-if="isshaoxing == 1"
            >
              <el-image class="erweima" :src="erweimaSrc"></el-image>
            </el-tooltip>
          </ul>
        </div>
      </div>
      <div class="right">
        <div class="bar" :class="{ active: activeNumber == 1 }">
          <div class="title">
            {{ zuozhenActive == 0 ? "巡诊" : "坐诊" }}
          </div>
          <div class="echart-box" id="zuozhen"></div>
        </div>
        <div class="bar" :class="{ active: activeNumber == 0 }">
          <div class="title">
            {{ zuozhenActive == 0 ? "庄稼医院 " : "专家" }}
          </div>
          <div class="echart-box" id="hospital"></div>
        </div>
        <div class="bar" :class="{ active: activeNumber == 5 }">
          <div class="title">服务面积</div>
          <div class="echart-box" id="serve"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/init_header/init_header";
import Disk from "@/components/disk/disk";
import { mapState, mapMutations } from "vuex";
const echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/pie");
require("echarts/lib/chart/bar");
require("echarts/lib/chart/line");
require("echarts/lib/chart/radar");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/legend");
let timer1;
let timer2;
let timeInterval;
let timeInterval2;
export default {
  name: "data_analysis",
  components: { Disk, Header },
  props: {},
  data() {
    return {
      mainData: { name: "", number: "" },
      activeNumber: 0,
      // appId: 54435,
      saleAmount: [],
      serviceData: [],
      zuozhenActive: 0,
      pieActive: 0,
      serviceArea: "",
      erweimaSrc: "",
      dataIndex: 0,
      pieDataIndex: 0,
      zuowu: "",
      zuozhenEchart: "",
      hospitalEchart: "",
      isshaoxing: window.sessionStorage.getItem("isshaoxing")
    };
  },
  computed: {
    ...mapState(["appId"]),
    arrMainData() {
      // let arr = [
      //   { name: '庄稼医院', number: '26' },
      //   { name: '坐诊巡诊', number: '2039' },
      //   { name: '线上问答', number: '10000' },
      //   { name: '测土配方', number: '775' },
      //   { name: '销售额', number: '105881' },
      //   { name: '服务面积', number: '6000' }
      // ]
      const arr = [];
      for (const key in this.mainData) {
        arr.push({
          name: key,
          number: this.mainData[key].toString()
        });
      }
      return arr;
    },
    zuowuData() {
      const arr = [];
      const arr1 = [];
      this.zuowu.forEach(item => {
        arr.push(item.title);
        arr1.push({
          name: item.title,
          value: item.chartnum
        });
      });
      return {
        name: arr,
        number: arr1
      };
    },
    saleArrData() {
      // 销售额数据
      const arr = [];
      const arr2 = [];
      this.saleAmount.forEach(item => {
        arr.push(item.titel);
        arr2.push(item.chartnum);
      });
      return {
        name: arr,
        number: arr2
      };
    },
    cetu() {
      // 测土数据
      const arr = [];
      const arr2 = [];
      this.serviceData.forEach(item => {
        arr.push(item.title);
        arr2.push(parseFloat(item.chartnum_cetu));
      });
      return {
        name: arr,
        number: arr2
      };
    },
    wenzhenxunzhen() {
      // 问诊巡诊数据
      const arr = [];
      const arr4 = [];
      const arr2 = [];
      const arr3 = [];
      this.serviceData.forEach(item => {
        arr2.push(parseFloat(item.chartnum_xunzhen));
        arr3.push(parseFloat(item.chartnum_zuozhen));
        var max2 = Math.max.apply(null, arr2);
        var max3 = Math.max.apply(null, arr3);
        arr.push({ name: item.title, max: max2 });
        arr4.push({ name: item.title, max: max3 });
      });
      return {
        title: [arr, arr4],
        number: [arr2, arr3]
      };
    },
    hospital() {
      const arr = [];
      const arr2 = [];
      const arr3 = [];
      this.serviceData.forEach(item => {
        arr.push(item.title);
        arr2.push(item.chartnum_mp);
        arr3.push(item.chartnum_expert);
      });
      return {
        name: arr,
        number: [arr2, arr3]
      };
    },
    server() {
      // 服务面积
      const arr = [];
      this.serviceArea.forEach((item, index) => {
        // if (this.activeNumber == index) {
        //   arr.push({ name: item.title, value: item.chartnum, selected: true })
        // } else {
        arr.push({ name: item.title, value: item.chartnum, selected: false });
        // }
        // arr2.push(item.chartnum)
      });
      return arr;
    },
    initSaleData() {
      // 销售额数据
      const arr = [];
      const arr2 = [];
      this.saleAmount.forEach(item => {
        arr.push(item.title);
        arr2.push(item.chartnum);
      });
      return {
        name: arr,
        number: arr2
      };
    }
  },
  watch: {},
  mounted() {
    const appId = window.sessionStorage.getItem("curuserid");
    this.setAppId(appId);
    // console.log("vm.appId :>> ", this.appId);
    // this.initPie()
    setTimeout(() => {
      this.getMainData();
      this.getServiceData();
      this.getSaleAmount();
      this.getServiceArea();
      this.getCode();
      this.getZuowu();
    }, 100);

    timer1 = setInterval(() => {
      this.activeNumber += 1;
      if (this.activeNumber >= 6) {
        this.activeNumber = 0;
      }
    }, 2000);
  },
  destroyed() {
    clearInterval(timer1);
    clearInterval(timer2);
    clearInterval(timeInterval);
    clearInterval(timeInterval2);
  },
  methods: {
    ...mapMutations(["setAppId"]),
    getZuowu() {
      this.$axios
        .fetchGet("/Home/DatavDemo/getZuowu?appId=" + this.appId)
        .then(res => {
          this.zuowu = res.data.splice(0, 6);
          this.initPie();
        });
    },
    getCode() {
      this.$axios.fetchGet("/Admin/Api/get_qr_code").then(res => {
        if (res.data.code == 200) {
          this.erweimaSrc = res.data.data.qrcode;
        }
      });
    },
    getMainData() {
      // 获取整体数据
      this.$axios
        .fetchGet("/Home/DatavDemo/getMainData?appId=" + this.appId)
        .then(res => {
          if (res.status == 200) {
            this.mainData = res.data;
          }
        });
    },
    getServiceData() {
      // 庄稼医院/专家数据/坐诊/巡诊/测土配方
      this.$axios
        .fetchGet(
          "/Home/DatavDemo/getServiceData?appId=" + this.appId + "&action=total"
        )
        .then(res => {
          this.serviceData = res.data;
          setTimeout(() => {
            this.initCetu();
            this.initZuozhen();
            this.initHospital();
            timer2 = setInterval(() => {
              this.zuozhenActive = this.zuozhenActive + 1;
              if (this.zuozhenActive >= 2) {
                this.zuozhenActive = 0;
              }
              // this.initZuozhen();
              this.zuozhenEchart.setOption({
                radar: {
                  // shape: 'circle',
                  indicator: this.wenzhenxunzhen.title[this.zuozhenActive]
                },
                series: [
                  {
                    name: this.zuozhenActive == 0 ? "巡诊数量" : "坐诊数量",
                    data: [
                      {
                        value: this.wenzhenxunzhen.number[this.zuozhenActive]
                      }
                    ]
                  }
                ]
              });
              // this.initHospital();
              this.hospitalEchart.setOption({
                xAxis: {
                  type: "category",
                  data: this.hospital.name
                },
                series: [
                  {
                    type: "bar",
                    data: this.hospital.number[this.zuozhenActive]
                  },
                  {
                    data: this.hospital.number[this.zuozhenActive],
                    type: "line",
                    itemStyle: {
                      color: "#87DBF7"
                    }
                  }
                ]
              });
            }, 2000);
          }, 100);
        });
    },
    getSaleAmount() {
      // 销售额
      this.$axios
        .fetchGet("/Home/DatavDemo/getRecentSaleAmount", { appId: this.appId })
        .then(res => {
          this.saleAmount = res.data;
          setTimeout(() => {
            this.initSale();
          }, 100);
        });
    },
    getServiceArea() {
      this.$axios
        .fetchGet("/Home/DatavDemo/getServiceArea", { appId: this.appId })
        .then(res => {
          this.serviceArea = res.data;
          this.initServe();
        });
    },
    initPie() {
      // 问答管理
      const mapEchartP = echarts.init(document.getElementById("answerPie"));
      mapEchartP.setOption(
        {
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c}"
          },
          legend: {
            orient: "vertical",
            right: 10,
            data: this.zuowuData.name,
            textStyle: {
              color: "#fff"
            }
          },
          series: [
            {
              label: {
                show: false,
                // position: 'center',
                fontSize: "18",
                emphasis: { show: true }
              },
              rich: {},
              name: "问答数",
              type: "pie",
              center: ["40%", "50%"],
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
              data: this.zuowuData.number,
              roseType: "radius"
            }
          ]
        },
        true
      );
      const that = this;
      function timerFun(chartdata) {
        timeInterval2 = setInterval(() => {
          chartdata.dispatchAction({ type: "downplay", seriesIndex: 0 });
          that.pieDataIndex + 1 == 6
            ? (that.pieDataIndex = 0)
            : that.pieDataIndex++;
          chartdata.dispatchAction({
            type: "highlight",
            dataIndex: that.pieDataIndex
          });
        }, 2000);
      }
      timerFun(mapEchartP);
      mapEchartP.on("mouseover", () => {
        clearInterval(timeInterval2);
        mapEchartP.dispatchAction({ type: "downplay", seriesIndex: 0 });
        mapEchartP.dispatchAction({
          type: "highlight",
          dataIndex: this.pieDataIndex
        });
      });
      mapEchartP.on("mouseout", () => {
        timerFun(mapEchartP);
      });
    },
    initCetu() {
      // 测土
      const mapEchartP = echarts.init(document.getElementById("cetu"));
      mapEchartP.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c}"
        },
        xAxis: {
          type: "category",
          data: this.cetu.name,
          axisLabel: {
            textStyle: {
              color: "#7ECEF4"
            }
          },
          axisLine: {
            lineStyle: { color: "#657CA8" }
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            textStyle: {
              color: "#7ECEF4"
            }
          },
          axisLine: {
            lineStyle: { color: "#657CA8" }
          },
          splitLine: {
            lineStyle: {
              color: "rgba(101, 124, 168, .3)"
            }
          }
        },
        grid: [{ x: "30px", y: "5%", width: "95%", height: "80%" }],
        series: [
          {
            type: "bar",
            data: this.cetu.number,
            name: "测土配方",
            barWidth: 20,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#FFC13F" },
                { offset: 0.5, color: "#FFE824" },
                { offset: 1, color: "#FFD7AC" }
              ])
            }
          },
          {
            data: this.cetu.number,
            type: "line",
            name: "测土配方",
            itemStyle: {
              color: "rgba(255, 232, 36, 1)"
            }
          }
        ]
      });
    },
    initSale() {
      const mapEchartP = echarts.init(document.getElementById("sale"));
      mapEchartP.setOption({
        tooltip: {
          trigger: "axis",
          borderColor: "#7F92FF",
          textStyle: { color: "#7F92FF" },
          formatter: "{a} <br/>{b}: {c}"
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.initSaleData.name,
          axisLabel: {
            textStyle: {
              color: "#7ECEF4"
            }
          },
          axisLine: {
            lineStyle: { color: "#657CA8" }
          }
        },
        yAxis: {
          type: "value",

          axisLabel: {
            textStyle: {
              color: "#7ECEF4"
            }
          },
          axisLine: {
            lineStyle: { color: "#657CA8" }
          },
          splitLine: {
            lineStyle: {
              color: "rgba(101, 124, 168, .3)"
            }
          }
        },
        grid: [{ x: "15%", y: "2%", width: "80%", height: "80%" }],
        series: [
          {
            areaStyle: {},
            name: "销售额",
            smooth: true,
            data: this.initSaleData.number,
            type: "line",
            itemStyle: {
              color: "rgba(150, 88, 219, 1)"
            }
          }
        ]
      });
    },
    initZuozhen() {
      // const mapEchartP = echarts.init(document.getElementById("zuozhen"));
      this.zuozhenEchart = echarts.init(document.getElementById("zuozhen"));
      this.zuozhenEchart.setOption(
        {
          tooltip: {},
          radar: {
            // shape: 'circle',
            name: {
              textStyle: {
                color: "#fff",
                borderRadius: 3,
                padding: [3, 5],
                fontSize: 16
              }
            },
            radius: 85,
            indicator: this.wenzhenxunzhen.title[this.zuozhenActive]
          },
          series: [
            {
              name: this.zuozhenActive == 0 ? "巡诊数量" : "坐诊数量",
              type: "radar",
              areaStyle: {},
              data: [
                {
                  value: this.wenzhenxunzhen.number[this.zuozhenActive]
                }
              ]
            }
          ]
        },
        true
      );
    },
    initHospital() {
      this.hospitalEchart = echarts.init(document.getElementById("hospital"));
      this.hospitalEchart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c}"
        },
        xAxis: {
          type: "category",
          data: this.hospital.name,
          axisLabel: {
            textStyle: {
              color: "#7ECEF4"
            }
          },
          axisLine: {
            lineStyle: { color: "#657CA8" }
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            textStyle: {
              color: "#7ECEF4"
            }
          },
          axisLine: {
            lineStyle: { color: "#657CA8" }
          },
          splitLine: {
            lineStyle: {
              color: "rgba(101, 124, 168, .3)"
            }
          }
        },
        grid: [{ x: "30px", y: "5%", width: "95%", height: "80%" }],
        series: [
          {
            type: "bar",
            data: this.hospital.number[this.zuozhenActive],
            barWidth: 20,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#40D0FD" },
                { offset: 1, color: "#00FFF6" }
              ])
            }
          },
          {
            data: this.hospital.number[this.zuozhenActive],
            type: "line",
            itemStyle: {
              color: "#87DBF7"
            }
          }
        ]
      });
    },
    initServe() {
      const mapEchartP = echarts.init(document.getElementById("serve"));
      mapEchartP.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c}"
        },
        series: [
          {
            name: "服务面积",
            type: "pie",
            radius: ["50%", "70%"],
            // avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                formatter: "{b}\n{c}",
                textStyle: {
                  fontSize: 20,
                  rich: {
                    b: {
                      fontSize: 40,
                      fontWeight: "bolder",
                      lineHeight: 50
                    },
                    c: {
                      fontSize: 20
                    }
                  }
                }
              }
            },
            // label: {
            //   show: true,
            //   // position: 'center',
            //   fontSize: '20'
            // },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold"
              }
            },
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
            data: this.server
          }
        ]
      });
      const that = this;
      function timerFun(chartdata) {
        timeInterval = setInterval(() => {
          chartdata.dispatchAction({ type: "downplay", seriesIndex: 0 });
          that.dataIndex + 1 == 6 ? (that.dataIndex = 0) : that.dataIndex++;
          chartdata.dispatchAction({
            type: "highlight",
            dataIndex: that.dataIndex
          });
        }, 2000);
      }
      timerFun(mapEchartP);
      mapEchartP.on("mouseover", () => {
        clearInterval(timeInterval);
        mapEchartP.dispatchAction({ type: "downplay", seriesIndex: 0 });
        mapEchartP.dispatchAction({
          type: "highlight",
          dataIndex: this.dataIndex
        });
      });
      mapEchartP.on("mouseout", () => {
        timerFun(mapEchartP);
      });
    },
    goToAnswerDetail() {
      this.$router.push({
        path: "/answer_data_detail"
      });
    },
    bottomRouter(where) {
      switch (where) {
        case "医院":
          this.$router.push({
            path: "/hospitalsort"
          });
          break;
        case "医院数据":
          this.$router.push({
            path: "/nexthospital"
          });
          break;
        case "专家":
          this.$router.push({
            path: "/expertlist"
          });
          break;
        case "专家网诊榜":
          this.$router.push({
            path: "/expertranking"
          });
          break;
        case "评分":
          this.$router.push({
            path: "/discussscore"
          });
          break;
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.data_analysis
  width 1900px
  padding 0 42px 37px
  margin 0 auto
  height 1080px
  .data_analysis-contaner
    margin-top 20px
  .left
    display inline-block
    width 438px
    vertical-align top
    .bar
      width 100%
      height 300px
      background: url('./bj01.png') no-repeat;
      background-size 100%
      background-position center
      border: 1px solid #30C1D8;
      margin-bottom 20px
      &.active
        border 1px solid #D31563;
      &:last-child
        margin-bottom 0
      .title
        height 45px
        text-align center
        line-height 45px
        font-size: 20px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #FFFFFF;
      .echart-box
        width 100%
        height 255px
  .mid
    display inline-block
    width 900px
    margin 0 20px
    position relative
    vertical-align top
    height 940px
    background: url('./bj02.png') no-repeat;
    // background-size 496px 384px
    background-position top
    .h2-title
      height 172px
      display flex
      align-items center
      padding-left 54px
      .h2
        font-size: 38px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #7FB5F1;
        margin-right 32px
        user-select none
      .number
        display inline-block
        height 83px
        padding 0 5px
        border-radius 10px
        margin-right 10px
        user-select none
        .text
          font-size: 70px;
          font-family: SimSun;
          font-weight: 400;
          color: #00FFD4;
          line-height 83px
          background: linear-gradient(0deg, #2CF4D1 0%, #22D0E5 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
    .bottom-bar
      position absolute
      left 0
      right 0
      bottom 0
      height 110px
      background: rgba(0, 0, 45, 0.8);
      border: 1px solid #30C1D8;
      padding 0 20px
      .title
        position absolute
        top -35px
        font-size: 18px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #FFFFFF;
      & > ul
        display flex
        align-items center
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #FFFFFF;
        height 100%
        .erweima
          width 80px
          height 80px
          background #fff
          border-radius: 5px;
        li
          cursor pointer
          font-size: 16px;
          display flex
          align-items center
          flex 1
          justify-content center
          .icon
            width 60px
            height 60px
            margin-right 10px
          .icon01
            background url('./icon01.png') no-repeat
          .icon02
            background url('./icon02.png') no-repeat
          .icon03
            background url('./icon03.png') no-repeat
          .icon04
            background url('./icon04.png') no-repeat
          .icon05
            background url('./icon05.png') no-repeat
          .text
            width auto
  .right
    display inline-block
    width 438px
    vertical-align top
    .bar
      width 100%
      height 300px
      background: rgba(0, 0, 45, 0.8);
      border: 1px solid #30C1D8;
      margin-bottom 20px
      &.active
        border 1px solid #D31563;
      &:last-child
        margin-bottom 0
      .title
        height 45px
        text-align center
        line-height 45px
        font-size: 20px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #FFFFFF;
      .echart-box
        width 100%
        height 255px
</style>
