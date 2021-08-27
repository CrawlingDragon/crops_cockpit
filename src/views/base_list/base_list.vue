<template>
  <div class="base_list-container container-wrap">
    <Header title="基地列表"></Header>
    <ul class="base-ul clearfix container-wrap">
      <li
        class="base-li"
        v-for="item in list"
        :key="item.id"
        @click="goToBaseDetail(item)"
      >
        <el-image class="base-img" fit="cover" :src="item.logo">
          <div slot="error" class="image_error"></div>
          <div class="image_error" slot="placeholder"></div>
        </el-image>
        <div class="right-bar">
          <div class="name">{{ item.title }}</div>
          <div class="base-text">
            {{ item.introduce }}
          </div>
        </div>
      </li>
    </ul>
    <div class="page-box " v-if="amount >= 7">
      <div class="wrap">
        <div class="total">共{{ amount }}个结果</div>
        <el-pagination
          small
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30]"
          :page-size="6"
          layout="prev, pager, next"
          :total="amount"
          class="paginatin"
          :currentPage="page"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/general_hospital_header/general_hospital_header";
import { mapState } from "vuex";

export default {
  name: "base_list",
  components: { Header },
  props: {},
  data() {
    return {
      amount: 0,
      page: 1,
      level: this.$route.query.level,
      areaname: this.$route.query.areaname,
      list: []
    };
  },
  computed: { ...mapState(["loginId"]) },
  watch: {
    page() {
      this.getList();
    }
  },
  mounted() {
    this.getList();
  },
  destroyed() {},
  methods: {
    getList() {
      this.$axios
        .fetchGet("/Home/NationwideDatav/GetGoodBaseListCom", {
          level: this.level,
          areaname: this.areaname,
          page: this.page
        })
        .then(res => {
          if (res.data.code == 200) {
            this.list = res.data.data;
            this.amount = res.data.maxitem;
          }
        });
    },
    handleSizeChange() {},
    handleCurrentChange(current) {
      this.page = current;
    },
    goToBaseDetail(item) {
      this.$router.push({
        path: "/base_detail",
        query: { appId: item.id }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.base_list-container
  padding 102px 0 132px
  .base-ul
    padding 0 40px
    .base-li
      width 50%
      float: left;
      display flex
      cursor: pointer;
      margin-bottom 18px

      &:nth-child(odd)
        padding-right 16px
      &:nth-child(even)
        padding-left 16px
      .base-img
        width 232px
        height 232px
        border 2px solid rgba(255,255,255,0.15)
        border-right none
      .right-bar
        flex 1
        border 2px solid rgba(255, 255, 255, 0.15);
        border-left none
        padding-left 30px
        text-align left
        padding-right 30px
        min-width: 0;
        .name
          font-size: 30px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #FFFFFF;
          margin-top 15px
          text-overflow ellipsis
          word-break break-all
          white-space nowrap
          overflow hidden
        .base-text
          font-size: 20px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #B5B5B5;
          line-height: 35px;
          display -webkit-box
          text-overflow ellipsis
          -webkit-box-orient vertical
          -webkit-line-clamp 4
          overflow hidden
.page-box
    position fixed
    left 0
    right 0
    bottom 0
    height 130px
    background #080f3e
    .wrap
      margin 0 auto
      height 100%
      position relative
      padding 0 40px
      width 100%
      @media (min-width 1900px)
        width: 1900px
      @media screen and (max-width 1890px)
        width: 1340px
      .paginatin
        position absolute
        right 40px
        top 40%
      .total
        position absolute
        left 40px
        top 40%
        font-size: 24px;
        font-family: SimHei;
        font-weight: 400;
        color: #B5B5B5;
</style>
