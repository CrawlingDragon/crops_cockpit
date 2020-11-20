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
    <ul
      class="list_ul infinite-list"
      v-infinite-scroll="load"
      style="overflow:auto;"
      infinite-scroll-disabled="disabled"
    >
      <li
        v-for="item in list"
        :key="item.id"
        @click="goToDetail(item.id)"
        class="infinite-list-item"
      >
        <el-image class="img" :src="item.thumb_pic" fit="cover">
          <div slot="placeholder" class="image-slot">
            加载中
            <span class="dot">...</span>
          </div>
        </el-image>
        <p>{{ item.name }}</p>
      </li>
      <p v-if="loading" style="text-align:center">加载中...</p>
      <p v-if="noMore && noGoods == false" style="text-align:center">
        没有更多了
      </p>
      <div v-show="list.length == 0 && noGoods" class="noGoods">暂无商品</div>
    </ul>
    <div class="result-bar" v-show="list.length != 0">共{{ count }}个结果</div>
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
      noGoods: false,
      count: 0,
      page: 0,
      loading: false,
      noMore: false,
      catid: 0
    };
  },
  computed: {
    disabled() {
      return this.loading || this.noMore;
    },
    ...mapState(["appId", "purview"])
  },
  watch: {
    // catid(newVal, oldVal) {
    //   // console.log("watch:>> ");
    //   // if (oldVal != 0) {
    //   //   // this.page = 0;
    //   //   // this.list = [];
    //   //   // this.loading = false;
    //   //   // this.noMore = false;
    //   //   setTimeout(() => {
    //   //     this.load();
    //   //   }, 100);
    //   }
    // }
  },
  mounted() {
    this.getMenu();
  },
  destroyed() {},
  methods: {
    load() {
      this.loading = true;
      this.page += 1;
      setTimeout(() => {
        this.noGoods = false;
        this.$axios
          .fetchGet("/Home/Products/GetMpProList", {
            appId: this.appId,
            catId: this.catid,
            page: this.page,
            purview: this.purview == (4 || 5) ? 1 : 0
          })
          .then(res => {
            if (res.data.code == 200) {
              this.list = this.list.concat(res.data.data);
              this.loading = false;
              this.count = res.data.count;
              if (res.data.data.length == 0) {
                this.noMore = true;
              }
              if (this.page == 1) {
                this.noGoods = true;
              }
            } else {
              this.noMore = true;
            }
          });
      }, 1000);
    },
    getMenu() {
      // 获取导航栏
      this.$axios.fetchPost("/Home/Products/GetProductsMenu").then(res => {
        if (res.data.code == 200) {
          this.menu = res.data.data;
          this.catid = res.data.data[0].catid;
        }
      });
    },
    getGoodsList() {
      // 获取商品列表
      this.noGoods = false;
      this.$axios
        .fetchGet("/Home/Products/GetMpProList", {
          appId: this.appId,
          catId: this.catid,
          page: this.page,
          purview: this.purview == (4 || 5) ? 1 : 0
        })
        .then(res => {
          if (res.data.code == 200) {
            this.list = this.list.concat(res.data.data);
            this.loading = false;
            this.count = res.data.count;
            console.log("this.page :>> ", this.page);
            if (this.page == 1) {
              this.noGoods = true;
            }
            if (res.data.data.length == 0) {
              this.noMore = true;
            }
          } else {
            this.noMore = true;
          }
        });
    },
    changeNenu(catid, index) {
      // 点击导航栏
      if (this.menuIndex != index) {
        this.menuIndex = index;
        this.page = 0;
        this.list = [];
        this.loading = false;
        this.noMore = false;
        this.noGoods = false;
        this.load();
      }
      this.catid = catid;
    },
    goToDetail(id) {
      // 去到商品详情
      this.$router.push({
        path: "/goods_detail",
        query: { id: id }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.goods_list_container
  padding-top 100px
  .nav-bar
    max-width 1900px
    min-width 1340px
    margin: 0 auto;
    margin-bottom 60px
    text-align center
    & > .item
      display inline-block
      padding 0 35px 9px
      border-bottom 4px solid transparent
      font-size 30px
      color #C5C5C5
      cursor pointer
      margin-right 20px
      &:hover
        color #FF6500
      &.active
        border-bottom 4px solid #FF6500
        color #FF6500
  .list_ul
    padding 0 64px 0
    text-align left
    max-height 570px
    padding-top 5px
    min-height 300px
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
    & > li
      margin-right 30px
      width 270px
      height 270px
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
