<template>
  <div class="map-wrap">
    <div
      class="linping"
      v-if="false"
      v-show="name == '330100'"
      :class="{ islinping: islinping || hoverlinping }"
      ref="linping"
      @click="otherAddress('linping', $event)"
      @mousemove="hoverOtherAddress('linping', $event)"
      @mouseleave="leaderOtherAddress('linping')"
    >
      <!-- 临平地区 -->
    </div>
    <div
      class="qiantang"
      v-if="false"
      v-show="name == '330100'"
      @click="otherAddress('qiantang', $event)"
      @mousemove="hoverOtherAddress('qiantang', $event)"
      @mouseleave="leaderOtherAddress('qiantang')"
      :class="{ isqiantang: isqiantang || hoverqiantang }"
    >
      <!-- 钱塘区 -->
    </div>
    <div
      class="shangcheng"
      v-if="false"
      v-show="name == '330100'"
      @click="otherAddress('shangcheng', $event)"
      @mousemove="hoverOtherAddress('shangcheng', $event)"
      @mouseleave="leaderOtherAddress('shangcheng')"
      :class="{ isshangcheng: isshangcheng || hovershangcheng }"
    >
      <!-- 上城区 -->
    </div>
    <div id="mapId"></div>
    <div class="hover-box" ref="hover">
      {{ hoverCity }}:{{ otherCityVal.value }}所
    </div>
    <div class="showMapData" ref="mapData">
      <span>{{ cityName }}</span> ｜
      <span
        class="number"
        @click="lookSecondDetail"
        :class="{ none: cityVal }"
        >{{ cityVal == 0 ? "暂无医院" : "详情>" }}</span
      >
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
let mapEcharts;
// const hangzhou = require("./330100.json");
const echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/pie");
require("echarts/lib/chart/map");
require("echarts/lib/component/tooltip");
export default {
  name: "maps",
  data() {
    return {
      pieIndex: 0,
      cityName: "", // 城市名称
      cityVal: "", // 城市对应的数据
      hoverCity: "",
      obj: {},
      islinping: false,
      hoverlinping: false,
      isqiantang: false,
      hoverqiantang: false,
      isshangcheng: false,
      hovershangcheng: false
    };
  },
  props: {
    name: {
      type: String,
      default: "zhejiang"
    },
    mapData: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  methods: {
    otherAddress(address, e) {
      this.pieIndex = 10000;
      let x = e.currentTarget.offsetLeft;
      let y = e.currentTarget.offsetTop;
      this.$refs.mapData.style.left = x + 30 + "px";
      this.$refs.mapData.style.top = y + "px";
      this.$refs.mapData.style.display = "block";
      this.islinping = false;
      this.isqiantang = false;
      this.isshangcheng = false;
      if (address == "linping") {
        this.islinping = true;
        this.cityName = "临平区";
        this.cityVal = this.otherCityVal.value;
      }
      if (address == "qiantang") {
        this.isqiantang = true;
        this.cityName = "钱塘区";
        this.cityVal = this.otherCityVal.value;
      }
      if (address == "shangcheng") {
        this.isshangcheng = true;
        this.cityName = "上城区";
        this.cityVal = this.otherCityVal.value;
      }
      this.obj = this.clickCityVal;
      let midObj = {
        name: this.clickCityVal.childName,
        level: this.clickCityVal.childLevel
      };
      this.$emit("getMidData", midObj);
    },
    hoverOtherAddress(address, e) {
      if (address == "linping") {
        this.hoverlinping = true;
        this.hoverCity = "临平区";
      }
      if (address == "qiantang") {
        this.hoverqiantang = true;
        this.hoverCity = "钱塘区";
      }
      if (address == "shangcheng") {
        this.hovershangcheng = true;
        this.hoverCity = "上城区";
      }
      let x = e.currentTarget.offsetLeft;
      let y = e.currentTarget.offsetTop;
      let pageX = e.layerX;
      let pageY = e.layerY;
      this.$refs.hover.style.left = x + pageX + 20 + "px";
      this.$refs.hover.style.display = "block";
      this.$refs.hover.style.top = y + pageY + "px";
      // this.cityVal = this.otherCityVal.value;
    },
    leaderOtherAddress(address) {
      this.$refs.hover.style.display = "none";
      if (address == "linping") {
        this.hoverlinping = false;
      }
      if (address == "qiantang") {
        this.hoverqiantang = false;
      }
      if (address == "shangcheng") {
        this.hovershangcheng = false;
      }
    },
    ...mapMutations(["changeBaseCity", "getIsnav"]),
    initMap(name) {
      const that = this;
      // 注册可用的地图
      mapEcharts = echarts.init(document.getElementById("mapId"));
      this.$axios
        .fetchPost("/Home/NationwideDatav/getJosnArea", { areaname: name })
        .then(res => {
          echarts.registerMap(name, res.data);
          mapEcharts.setOption(
            {
              tooltip: {
                trigger: "item",
                // formatter: "{b}:{c}所"
                formatter: function(name) {
                  // return "";
                  const val = isNaN(name.data.value) ? 0 : name.data.value;
                  // if(isNaN(name.data.value)){

                  // }
                  return name.data.name + ":" + val + "所";
                }
              },
              series: [
                {
                  name: name,
                  type: "map",
                  mapType: name, // 自定义扩展图表类型,
                  zoom: 1.2,
                  position: "center",
                  // selectedMode: "single",
                  itemStyle: {
                    normal: {
                      areaColor: "#226DBF",
                      label: {
                        show: that.textBoolean,
                        textStyle: {
                          color: "#fff",
                          fontSize: 0
                        }
                      }
                    },
                    emphasis: {
                      areaColor: "#fbe69c",
                      label: {
                        // backgroundColor: "#ff6600",
                        show: that.textBoolean,
                        textStyle: {
                          color: "#fff",
                          fontSize: 10
                        }
                      }
                    }
                  },
                  data: that.mapsArray
                }
              ]
            },
            true
          );
          mapEcharts.on("mouseover", function(params) {
            let name = params.data.name;
            if (name == "上城区") {
              that.hovershangcheng = true;
            }
          });
          mapEcharts.off("click");
          mapEcharts.on("click", function(params) {
            const x = params.event.offsetX;
            const y = params.event.offsetY;
            that.$refs.mapData.style.left = x + "px";
            that.$refs.mapData.style.top = y + "px";
            that.$refs.mapData.style.display = "block";
            that.pieIndex = params.dataIndex;
            that.cityName = params.name;
            that.cityVal = params.value;
            ///
            that.islinping = false;
            that.isqiantang = false;
            that.isshangcheng = false;
            ///
            that.obj = {
              name: params.name,
              level: params.data.level,
              index: params.dataIndex,
              childName: params.data.childName,
              childLevel: params.data.childLevel,
              isClick: 1,
              letter: params.data.letter
            };
            // that.$emit("upCity", obj);
            let midObj = "";
            // console.log(that.obj);
            if (
              params.data.level == 4 ||
              params.data.level == 3 ||
              params.data.level == 2
            ) {
              midObj = {
                name: params.name,
                level: params.data.level
              };
            } else {
              midObj = {
                name: params.data.childName,
                level: params.data.childLevel
              };
            }

            // 点击地图，更新中间区域内容
            that.$emit("getMidData", midObj);
          });
        });
    },
    lookSecondDetail() {
      if (this.cityVal != 0) {
        // 点击地图查看详情，全网页数据更新
        this.$emit("upCity", this.obj);
      }
    }
  },
  // created(){
  //   // 离开重新进入会触发更新，保存成离开之前的
  //   if(window.sessionStorage.getItem('mapIndex') != null){
  //     this.pieIndex = window.sessionStorage.getItem('mapIndex')
  //   }
  // },
  mounted() {
    // 用一个中心bus事件吧
    this.initMap(this.name);
    window.addEventListener("resize", () => {
      mapEcharts.resize();
    });
  },
  destroyed() {
    window.removeEventListener("resize", () => {
      console.log("已经移除 :>> ");
    });
  },
  // beforeDestroy(){
  //   // 记录离开时当前地图的指向
  //   window.sessionStorage.setItem('mapIndex',this.pieIndex)
  // },
  computed: {
    ...mapState(["globalLevel", "ismapupdate"]),
    textBoolean() {
      let textBoolean = true;
      if (this.name == "china") {
        textBoolean = false;
      } else {
        textBoolean = false;
      }
      return textBoolean;
    },
    mapsArray() {
      // 给地图的数组
      const arr = [];
      this.mapData.forEach((item, index) => {
        if (this.pieIndex == index) {
          arr.push({
            name: item.name,
            value: item.hcount,
            level: item.level,
            selected: true,
            childName: item.childname,
            childLevel: item.childlevel,
            letter: item.childmapname
          });
        } else {
          arr.push({
            name: item.name,
            value: item.hcount,
            level: item.level,
            selected: false,
            childName: item.childname,
            childLevel: item.childlevel,
            letter: item.childmapname
          });
        }
      });
      // console.log(arr, this.pieIndex);
      return arr;
    },
    dMapIndex() {
      return this.$store.state.secondMapIndex;
    },
    clickCityVal() {
      let obj = {};
      this.mapsArray.forEach(item => {
        if (item.name == this.cityName) {
          obj = item;
        }
      });
      obj.isClick = 1;
      return obj;
    },
    otherCityVal() {
      let obj = {};
      this.mapsArray.forEach(item => {
        if (item.name == this.hoverCity) {
          obj = item;
        }
      });
      return obj;
    }
  },
  components: {},
  watch: {
    name(newVal) {
      if (this.globalLevel <= 2) {
        return;
      }
      this.pieIndex = this.dMapIndex;
      this.$refs.mapData.style.display = "none";
    },
    mapsArray() {
      this.initMap(this.name);
    },
    ismapupdate(newVal) {
      this.pieIndex = 0;
      this.$refs.mapData.style.display = "none";
    }
  }
};
</script>
<style lang="stylus" scoped>
.map-wrap
  position relative
  #mapId
    width 295px
    height 330px
    @media screen and (min-width:1900px) {
      width 503px
      height 385px
    }
  .linping
    position absolute
    width 24px
    height 37px
    background url('./linping.png') no-repeat
    background-size 100% 100%
    background-position center center
    right 159px
    top 60px
    z-index 9999
    @media screen and (min-width:1900px) {
      width 38px
      height 61px
      right 85px
      top 15px
    }
    &.islinping
      background url('./linping_hover.png') no-repeat
      background-size 100% 100%
      background-position center center
  .qiantang
    position absolute
    width 50px
    height 41px
    background url('./qiantang.png') no-repeat
    background-size 100% 100%
    background-position center center
    right 115px
    top 82px
    z-index 9999
    @media screen and (min-width:1900px) {
      width 88px
      height 71px
      right 7px
      top 50px
    }
    &.isqiantang
      background url('./qiantang_hover.png') no-repeat
      background-size 100% 100%
      background-position center center
  .shangcheng
    position absolute
    width 20px
    height 33px
    background url('./shangcheng.png') no-repeat
    background-size 100% 100%
    background-position center center
    right 164px
    top 82px
    z-index 9999
    @media screen and (min-width:1900px) {
      width 33px
      height 54px
      right 94px
      top 53px
    }
    &.isshangcheng
      background url('./shangcheng_hover.png') no-repeat
      background-size 100% 100%
      background-position center center
  .showMapData
    padding 5px
    background rgba(0, 0, 0, 0.5)
    color #ffffff
    position absolute
    min-width 128px
    left 0px
    top 0px
    transition 0.5s all ease
    line-height 22px
    border-radius 5px
    z-index 222222
    display none
    .number
      cursor default
      &.none
        cursor pointer
  .hover-box
    position absolute
    padding 5px 5px
    background rgba(0,0,0,.2)
    left -1000px
    top -10000px
    z-index 9999999
    font-size 14px
    min-width 80px
</style>
