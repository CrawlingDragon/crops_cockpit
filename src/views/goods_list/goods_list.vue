<template>
  <div class="goods_list_container">
    <Header title="农资商品"></Header>
    <div class="nav-bar">
      <div
        class="item"
        v-for="(item, index) in menu"
        :key="item.catid"
        :class="{ active: menuIndex == index }"
        @click="changeNenu(item.catid, index)"
      >
        {{ item.catname }}
      </div>
    </div>
    <ul class="list_ul">
      <li v-for="item in list" :key="item.id" @click="goToDetail(item.id)">
        <el-image class="img" :src="item.thumb_pic" fit="cover">
          <div slot="placeholder" class="image-slot">
            加载中
            <span class="dot">...</span>
          </div>
        </el-image>
        <p>{{item.name}}</p>
      </li>
    </ul>
    <div v-show="list.length == 0 && noGoods" class="noGoods">暂无商品</div>
    <div class="result-bar" v-show="list.length != 0">
      共{{ list.length == 0 ? 0 : list.length }}个结果
    </div>
  </div>
</template>
<script>
import Header from "@/components/online_hospital_header/online_hospital_header";
import { mapState } from "vuex";

export default {
  name: "goods_list",
  components: {
    Header
  },
  props: {},
  data() {
    return {
      menuIndex: 0, // 显示导航的索引
      menu: [], // 导航栏栏目
      list: [],
      noGoods: false
    };
  },
  computed: {
    ...mapState(["appId", "purview"]),
  },
  watch: {},
  mounted() {
    this.getMenu();
  },
  destroyed() {},
  methods: {
    getMenu() {
      // 获取导航栏
      this.$axios.fetchPost("/Home/Products/GetProductsMenu").then((res) => {
        if (res.data.code == 200) {
          this.menu = res.data.data;
          setTimeout(() => {
            this.getGoodsList(res.data.data[0].catid);
          }, 100);
        }
      });
    },
    getGoodsList(catid) {
      // 获取商品列表
      this.noGoods = false;
      this.$axios
        .fetchPost("/Home/Products/GetMpProList", {
          appId: 63587 || this.appId,
          catid: catid,
          purview: this.purview == 4 || 5 ? 1 : 0,
        })
        .then((res) => {
          if (res.data.count == 0) {
            this.noGoods = true;
          }
          if (res.data.code == 200) {
            this.list = res.data.data;
          }
        });
    },
    changeNenu(catid, index) {
      // 点击导航栏
      this.menuIndex = index;
      this.getGoodsList(catid);
    },
    goToDetail(id) {
      // 去到商品详情
      this.$router.push({
        path: "/goods_detail",
        query: { id: id },
      });
    },
  },
};
</script>
<style lang="stylus" scoped>
.goods_list_container
  .nav-bar
    padding 42px 0 0
    margin 0 90px
    margin-bottom 70px
    text-align center
    border-bottom 2px solid rgba(255, 255, 255, 0.2)
    & > .item
      display inline-block
      padding 0 35px 9px
      border-bottom 4px solid transparent
      font-size 40px
      color #C5C5C5
      cursor pointer
      margin-right 20px
      &:hover
        border-bottom 4px solid #FF6500
      &.active
        border-bottom 4px solid #FF6500
        color #FF6500
  .list_ul
    margin 0 90px
    text-align left
    padding 10px 3px 0
    & > li
      margin-right 14px
      width 275px
      height 275px
      margin-bottom 55px
      display inline-block
      position relative
      cursor pointer
      &:nth-child(6n)
        margin-right 0
      &:hover
        outline 3px solid #FF6600
        box-sizing border-box
        box-shadow 0px 1px 26px #f60
      & > .img
        display block
        width 100%
        height 100%
      p
        height 70px
        position absolute
        left 0
        bottom 0
        width 100%
        color #fff
        background url('./text-bj.png') no-repeat
        background-size 100%
        background-position center
        font-size 28px
        padding-left 20px
        line-height 70px
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
  .noGoods
    font-size 40px
    min-height 400px
    line-height 400px
    text-align center
    color #B5B5B5
  .result-bar
    margin 50px 0 20px 90px
    text-align left
    font-size 30px
    color #B5B5B5
</style>
