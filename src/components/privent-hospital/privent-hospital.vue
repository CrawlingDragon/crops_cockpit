<template>
  <div class="privent-content">
    <slot></slot>
    <div class="map-box" v-if="showComponent">
      <Maps
        :name="cityMap"
        :mapData="proMapData"
        :cityNames="secondName"
        @upCity="getDownCity"
        @getMidData="clickMapMidBar"
      ></Maps>
      <!-- :mapIndex="pieIndex" -->
    </div>
    <div class="map-hospital-box" v-if="showComponent">
      <MapHospital :CurMp="pie" :cityNames="secondName" :count="count">
      </MapHospital>
    </div>
    <CityHospital
      v-if="!showComponent"
      :CurMp="pie"
      :cityNames="secondName"
      :list="secondPieList"
      :pieLi="secondPieLi"
    ></CityHospital>
  </div>
</template>
<script>
import MapHospital from "../map-hospital/map-hospital";
import Maps from "../maps/maps";
import CityHospital from "../city-hospital/city-hospital";
import { mapMutations, mapState } from "vuex";
export default {
  name: "privent-hospital",
  data() {
    return {
      cityNameCom: "",
      pieArray: [], // pie的数据
      count: {}, // 庄稼医院，会员，专家等数量
      secondPieList: [], // 第二个pie的数据
      loginId: window.sessionStorage.getItem("LoginId") // 登陆时，保存地图参数id
    };
  },
  props: {
    cityMap: {
      type: String,
      default: ""
    },
    proMapData: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  computed: {
    ...mapState([
      "globalLevel",
      "isnav",
      "bviousName",
      "bviousLevel",
      "isstore"
    ]),
    showComponent() {
      const id = this.loginId;
      if (id == 2) {
        return false;
      } else {
        if (this.globalLevel <= 2) {
          return false;
        } else {
          return true;
        }
        // return true;
      }
    },
    // 获取当前导航的位置，判断是否取本级地区的数据,如果是从余杭区看 不包括市区在余杭区的数据
    navareaname() {
      const obj = this.$store.state.breadArr[
        this.$store.state.breadArr.length - 1
      ];
      if (obj) {
        return obj.name;
      } else {
        return "";
      }
    },
    cityName() {
      const level = this.$store.state.globalLevel;
      const clickName = this.$store.state.defaultProvince;
      if (level === 3) {
        // 那点击的地址就等于方块请求的地址，也等于方块数据的title
        this.getDefaultCity(clickName);
      } else if (level === 4) {
        // 那点击的地址就等于请求的地址的第一个下一级，也等于方块数据的title
        // 从defaultAddressArr里匹配
        const arr = this.$store.state.defaultAddressArr;
        arr.forEach(item => {
          if (clickName == item.name) {
            this.getDefaultCity(item.city[0].name);
          }
        });
      } else {
        // 也就是全国
      }
      return true;
    },
    pie() {
      // 给2个pie饼图的数据
      const arr = [];
      if (this.pieArray) {
        this.pieArray.forEach(item => {
          if (item.value !== 0) {
            arr.push({
              name: item.name,
              value: item.value,
              list: item.list
            });
          }
        });
      }

      return arr;
    },
    secondPieLi() {
      const arr = [];
      this.pieArray.forEach(item => {
        arr.push(item.name);
      });

      return arr;
    }, // 显示pie下方li地址
    secondName() {
      // 二级请求的地址
      return this.$store.state.defaultCity;
    },
    secondLevel() {
      // 二级请求的地址等级
      return this.$store.state.secondGlobalLevel;
    }
  },
  mounted() {
    if (this.loginId - 0 == 2) {
      this.getMapData(
        this.navareaname,
        this.secondLevel,
        this.loginId,
        this.isnav,
        this.navareaname
      );
    } else {
      this.getMapData(
        this.secondName,
        this.secondLevel,
        this.loginId,
        this.isnav
      );
    }
  },
  methods: {
    ...mapMutations([
      "getDefaultCity",
      "getIsnav",
      "getBviousName",
      "getBviousLevel",
      "getSecondGlobalLevel"
    ]),
    getDownCity(obj) {
      // 地图过来的二级城市选择
      this.pieIndex = obj.index;
      // console.log("obj :", obj);
      // 改变vuex的二级地址，触发二级地址的watch，在本page
      this.$emit("clickMapForData", obj);
      this.getDefaultCity(obj.childName);
      this.getIsnav(1);
      this.getSecondGlobalLevel(obj.childLevel);
      // this.getMapData(this.secondName, obj.level, this.loginId, 0);
    },
    getMapData(name, level, loginId, isnav, navareaname) {
      if (level <= 1) {
        level = this.globalLevel;
      }
      if (level != 2) {
        this.getBviousName(null); // 重置二级导航
        this.getBviousLevel(null); // 重置二级导航
      }
      this.$axios
        .fetchPost("Home/NationwideDatav/GetCurMpData", {
          areaname: name,
          level: level,
          userlevel: loginId,
          isnav: isnav,
          isstore: this.isstore,
          navareaname: navareaname
        })
        .then(res => {
          if (res.data.code == 200) {
            this.count = res.data.data.count;
            this.pieArray = res.data.data.city;
            this.secondPieList = res.data.data.list;
          } else {
            this.count = {};
            this.pieArray = [];
            this.secondPieList = [];
          }
          // this.countArr = res.data.data.list;
          // console.log(res.data);
        });
    },
    clickMapMidBar(midObj) {
      // 点击地图，更新中间区域数据
      // this.getMapData(midObj.name, midObj.level, this.loginId, this.isnav);
      this.getDefaultCity(midObj.name);
    }
  },
  watch: {
    secondName(newVal, oldval) {
      if (this.loginId - 0 == 2) {
        this.getMapData(
          this.navareaname,
          this.secondLevel,
          this.loginId,
          this.isnav,
          this.navareaname
        );
      } else {
        this.getMapData(
          this.secondName,
          this.secondLevel,
          this.loginId,
          this.isnav
        );
      }
    },
    bviousName(newVal) {
      if (newVal == null) return;
      this.getMapData(newVal, this.bviousLevel, this.loginId, 1);
    },
    navareaname(newVal, oldval) {
      this.getMapData(
        this.secondName,
        this.secondLevel,
        this.loginId,
        this.isnav,
        this.navareaname
      );
    }
  },
  components: {
    MapHospital,
    Maps,
    CityHospital
  }
};
</script>
<style lang="stylus" scoped>
.privent-content
  position relative
  .map-box
    position absolute
    left 10px
    width 404px
    height 309px
    @media screen and (min-width:1900px) {
      width 502px
      height 385px
      left 25px
    }
  .map-hospital-box
    right 10px
    position absolute
    width 280px
    height 304px
    @media screen and (min-width:1900px) {
      width 332px
      height 382px
      right 25px
    }
</style>
