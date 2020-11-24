<template>
  <div class="tu-container">
    <div class="bar">
      <div
        class="item"
        @click="choose('全部')"
        :class="{ active: chooseItem == '' }"
      >
        全部
      </div>
      <div
        class="item"
        @click="choose('检测中')"
        :class="{ active: chooseItem == '1' }"
      >
        检测中
      </div>
      <div
        class="item"
        @click="choose('检测完成')"
        :class="{ active: chooseItem == '2' }"
      >
        检测完成
      </div>
      <div
        class="item"
        @click="choose('已给处方')"
        :class="{ active: chooseItem == '3' }"
      >
        已给处方
      </div>
    </div>
    <ul
      class="tu-ul infinite-list"
      v-infinite-scroll="load"
      style="overflow:auto;"
      infinite-scroll-disabled="disabled"
    >
      <li
        v-for="item in list"
        :key="item.id"
        class="infinite-list-item"
        @click="goToDetail(item.id)"
      >
        <div class="icon"></div>
        <div class="text">
          <p class="p1">
            {{ item.title }}
            <span>ID:{{ item.idnumber }}</span>
          </p>
          <p class="p2">{{ item.address }}</p>
          <p class="p3">{{ item.showtime }}</p>
        </div>
        <div class="test-status">
          <div class="icon icon-ing" v-if="item.teststatus == 1"></div>
          <div class="icon icon-success" v-if="item.teststatus == 3"></div>
          <div class="icon icon-way" v-if="item.teststatus == 2"></div>
          <p>
            {{
              item.teststatus == 1
                ? "检测中"
                : item.teststatus == 2
                ? "检测完成"
                : "已给处方"
            }}
          </p>
        </div>
      </li>
      <p v-if="loading">加载中...</p>
      <p v-if="noMore && noData == false">没有更多了</p>
      <div class="noData" v-show="chooseItem == '' && noData">
        <p class="p1">暂无测土配方</p>
        <p class="p1">请先使用新型庄稼医院管理平台录入测土配方记录</p>
      </div>
      <div class="noData" v-show="chooseItem == '1' && noData">
        <p class="p1">暂无测土配方</p>
        <p class="p1">请先使用新型庄稼医院管理平台录入测土配方记录</p>
      </div>
      <div class="noData" v-show="chooseItem == '2' && noData">
        <p class="p1">暂无测土配方</p>
        <p class="p1">请先使用新型庄稼医院管理平台录入测土配方记录</p>
      </div>
      <div class="noData" v-show="chooseItem == '3' && noData">
        <p class="p1">暂无测土配方</p>
        <p class="p1">请先使用新型庄稼医院管理平台录入测土配方记录</p>
      </div>
    </ul>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "second_tu",
  components: {},
  props: {},
  data() {
    return {
      chooseItem: "",
      list: [],
      page: 0,
      loading: false,
      noMore: false,
      noData: false
    };
  },
  computed: {
    ...mapState(["appId", "purview"]),
    disabled() {
      return this.loading || this.noMore;
    }
  },
  watch: {
    chooseItem() {
      this.page = 0;
      this.list = [];
      this.loading = false;
      this.noMore = false;
      this.load();
    }
  },
  mounted() {},
  destroyed() {},
  methods: {
    load() {
      this.page += 1;
      this.loading = true;
      this.noData = false;
      setTimeout(() => {
        this.$axios
          .fetchGet("/Home/Treatment/GetTestingsoilList", {
            page: this.page,
            appId: this.appId,
            purview: this.purview == (3 || 4) ? 1 : 0,
            teststatus: this.chooseItem
          })
          .then(res => {
            if (res.data.code == 200) {
              this.list = this.list.concat(res.data.data);
              this.loading = false;
              if (res.data.data.length == 0) {
                this.noMore = true;
                if (this.page == 1) {
                  this.noData = true;
                }
              }
            } else {
              this.noMore = true;
            }
          });
      }, 1000);
    },
    choose(item) {
      switch (item) {
        case "全部":
          this.chooseItem = "";
          break;
        case "检测中":
          this.chooseItem = "1";
          break;
        case "检测完成":
          this.chooseItem = "2";
          break;
        case "已给处方":
          this.chooseItem = "3";
          break;
      }
    },
    goToDetail(id) {
      this.$router.push({
        path: "/cetu_detail",
        query: { id: id }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.tu-container
  margin 50px 90px 0
  margin-bottom 150px
  min-height 724px
  .bar
    text-align left
    .item
      display inline-block
      border 1px solid rgba(255, 255, 255, 0.2)
      background rgba(27, 57, 93, 0.4)
      height 60px
      line-height 60px
      width 170px
      text-align center
      font-size 36px
      color rgba(181, 181, 181, 1)
      margin-right 52px
      cursor pointer
      &:hover
        outline 3px solid #FF6600
        box-shadow 0px 1px 26px #f60
        color #fff
      &.active
        border 1px solid #eee
        color #eee
        &:hover
          border 1px solid #eee
          color #eee
          outline none
          box-shadow none
  .tu-ul
    margin 30px auto
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
      background rgba(9, 29, 67, 0.4)
      border 1px solid rgba(255, 255, 255, 0.2)
      margin-bottom 11px
      padding 30px 0 20px
      display flex
      & > .icon
        width 30px
        height 40px
        background url('./31.png') no-repeat
        background-position center
        background-size 100%
        margin 0 28px 0 22px
      .text
        flex 1
        margin-bottom 10px
        text-align left
        .p1
          font-size 36px
          font-family SimHei
          font-weight 400
          color rgba(255, 255, 255, 1)
          line-height 1.2
          margin-top -3px
          margin-bottom 25px
          span
            margin-left 20px
            font-size 24px
            color rgba(181, 181, 181, 1)
        .p2, .p3
          color #B5B5B5
          font-size 24px
          line-height 1.2
          margin-bottom 10px
      .test-status
        min-width 260px
        line-height 141px
        & > .icon
          width 40px
          height 40px
          display inline-block
          margin-right 21px
          vertical-align middle
          &.icon-ing
            background url('./35.png') no-repeat
            background-position center
            background-size 100%
          &.icon-success
            background url('./36.png') no-repeat
            background-position center
            background-size 100%
          &.icon-way
            background url('./27.png') no-repeat
            background-position center
            background-size 100%
        p
          color #FF6500
          font-size 36px
          display inline-block
          vertical-align middle
    .noData
      font-size 26px
      color #7fb5f1
      line-height 60px
</style>
