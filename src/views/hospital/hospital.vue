<template>
  <!-- 下级医院 -->
  <div class="hospital-container">
    <Header goBackBtn="返回上一页"></Header>
    <div class="nav-top">
      <div class="item" @click="changeNav('default',0)" :class="{'active':showIndex == 0}">默认排序</div>
      <div class="item" @click="changeNav('listorder',1)" :class="{'active':showIndex == 1}">综合排序</div>
      <div class="item" @click="changeNav('filter',2)" :class="{'active':showIndex == 2}">筛选</div>
    </div>
    <div class="hospital-box">
      <div class="address-list list1" v-show="showIndex == 2">
        <div class="item" v-for="(item,index) in areadataList" :key="item.areaid" @click="changeArea(item.name,index)" :class="{'active':areaIndex == index}">{{item.name}}</div>
      </div>
      <div class="address-list list2" v-show="showIndex == 2">
        <div class="item" @click="changeStore(99,0)" :class="{'active':storeIndex == 0}">全部</div>
        <div class="item" @click="changeStore(0,1)" :class="{'active':storeIndex == 1}">网院</div>
        <div class="item" @click="changeStore(1,2)" :class="{'active':storeIndex == 2}">实体店</div>
      </div>
      <div class="box">
        <Item :items="hospitalList"></Item>
      </div>
      <p class="noData" v-show="hospitalList.length == 0">暂无符合条件的医院</p>
    </div>
    <div class="result-bum">共{{hospitalList.length}}个结果</div>
    <Nav index="3"></Nav>
  </div>
</template>
<script>
import Header from "@/components/default_header/default_header";
import Nav from "@/components/nav_list/nav_list";
import Item from "@/components/hospital_list_item/hospital_list_item";
import { mapState } from "vuex";

export default {
  name: "hospital",
  components: { Header, Nav, Item },
  props: {},
  data() {
    return {
      storetag: "", // 是否实体
      ordertag: "", // 排序方式
      areatag: "", // 地区
      type: "", // 请求的类型
      showIndex: 0,
      areaIndex: 0,
      storeIndex: 0,
      areadataList: [], // 地址列表
      hospitalList: [],
    };
  },
  computed: {
    ...mapState(["appId"]),
  },
  watch: {},
  mounted() {
    this.getHospital(
      this.appId,
      this.storetag,
      this.ordertag,
      this.areatag,
      this.type
    );
  },
  destroyed() {},
  methods: {
    getHospital(appId, storetag = "", ordertag = "", areatag = "", type = "") {
      // 获取医院数据列表
      this.$axios
        .fetchPost("/Home/Manage/GetManageMpDataList", {
          appId,
          storetag,
          ordertag,
          areatag,
          type,
        })
        .then((res) => {
          if (res.data.code == 200) {
            if (res.data.data == 0) {
              this.hospitalList = [];
              return;
            }
            this.hospitalList = res.data.data.lists;
            this.areadataList = res.data.data.areadata;
          }
        });
    },
    changeNav(ordertag, index) {
      // 点击筛选按钮
      if (ordertag != "filter") {
        this.storetag = "";
        this.areatag = "";
        this.storeIndex = 0;
        this.areaIndex = 0;
      }
      this.ordertag = ordertag;
      this.showIndex = index;
      this.getHospital(
        this.appId,
        this.storetag,
        ordertag,
        this.areatag,
        this.type
      );
    },
    changeArea(name, index) {
      // 点击  选择地区
      this.areatag = name;
      this.areaIndex = index;
      this.getHospital(
        this.appId,
        this.storetag,
        this.ordertag,
        name,
        this.type
      );
    },
    changeStore(storetag, index) {
      // 选择实体店
      this.storetag = storetag;
      this.storeIndex = index;
      this.getHospital(
        this.appId,
        storetag,
        this.ordertag,
        this.areatag,
        this.type
      );
    },
  },
};
</script>
<style lang="stylus" scoped>
.hospital-container
  padding-bottom 60px
  max-width 1900px
  margin 0 auto
  .nav-top
    border-bottom 1px solid rgba(255, 255, 255, 0.2)
    margin 0 90px
    text-align center
    .item
      display inline-block
      padding 0px 40px 11px
      color #C5C5C5
      font-size 40px
      cursor pointer
      font-family SimHei
      &.active
        border-bottom 4px solid #FF6500
        color #FFFFFF
  .hospital-box
    .address-list
      text-align left
      margin 0 90px
      &.list1
        margin-top 50px
      &.list2
        margin-top 20px
      .item
        display inline-block
        margin-right 13px
        border 1px solid rgba(255, 255, 255, 0.2)
        background rgba(27, 57, 93, 0.4)
        padding 0 13px
        height 40px
        line-height 39px
        font-size 28px
        color #B5B5B5
        cursor pointer
        &:hover
          border 1px solid rgba(255, 255, 255, 1)
        &.active
          color #fff
          border 1px solid rgba(255, 255, 255, 1)
    .box
      margin 50px 90px 30px
    .noData
      width 100%
      min-height 300px
      text-align center
      line-height 300px
      font-size 35px
      color #ffff
  .result-bum
    margin 10px 90px
    color #B5B5B5
    font-size 30px
    text-align left
</style>
