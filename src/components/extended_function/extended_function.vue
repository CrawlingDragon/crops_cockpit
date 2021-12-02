<template>
  <!-- 扩展功能-组件 -->
  <div class="extended-function-box">
    <div class="small-title">{{ smallTitle }}</div>
    <ul class="clearfix">
      <li
        v-for="(item, index) in dataArray"
        :key="index"
        @click="clickItem(item)"
        :class="{ 'li-download': item.module === 'hweb' }"
      >
        <template v-if="item.module !== 'hweb'">
          {{ item.name }}
        </template>
        <template v-else>
          <div class="down-text">{{ item.name }}</div>
          <img :src="item.thumb" class="code-img" />
        </template>
      </li>
      <!-- <li>评分</li>
      <li class="li-download">
        <div class="down-text">为农服务<br />平台H5</div>
        <img src="" alt="" class="code-img" />
      </li> -->
    </ul>
    <scanCodes
      @changeFlaw="changeFlaw"
      v-show="codeBoxFlaw"
      :url="url"
      :title="title"
    ></scanCodes>
  </div>
</template>
<script>
import scanCodes from "@/components/scanCodes/scanCodes.vue";
export default {
  components: { scanCodes },
  props: {
    dataArray: {
      type: Array,
      default: function() {
        return [];
      }
    },
    smallTitle: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      codeBoxFlaw: false,
      // 扫一扫 弹窗的显示隐藏
      url: "",
      title: ""
    };
  },
  methods: {
    clickItem(item) {
      // 点击item
      console.log("item", item);
      this.switchItem(item);
    },
    switchItem(item) {
      // 每个item 对应的功能
      const module = item.module;
      switch (module) {
        case "web":
          // 站内路由到专家网诊榜
          this.$router.push({
            path: "/expertranking"
          });
          //
          break;
        case "score":
          // 站内路由到评分
          this.$router.push({
            path: "/discussscore"
          });
          //
          break;
        case "hweb":
          // 扫一扫为农服务平台
          this.codeBoxFlaw = true;
          this.url = item.thumb;
          this.title = item.name;
          break;
        default:
          // 去资讯详情
          if (item.catid === "0") {
            // catid 缺失，跳转外部链接
            window.open(item.linkurl, "_blank");
          } else {
            // 根据catId跳转对应的资讯详情页
            this.$router.push({
              path: "/info_list",
              query: { catId: item.catid }
            });
          }
      }
    },
    changeFlaw(boolean) {
      this.codeBoxFlaw = boolean;
    }
  }
};
</script>
<style scoped lang="stylus">
.extended-function-box
    margin-top 30px
    text-align: left
    padding: 0 40px
    .small-title
      font-size: 26px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 1.2
      margin-bottom 15px
    ul
      & > li
        float left
        width 18.4%
        height: 150px
        margin-right: 2%
        text-align: center
        line-height: 150px
        font-size: 25px;
        color #fff
        cursor pointer
        margin-bottom: 20px
        background: #0F3A96
        overflow: hidden
        text-overflow: ellipsis
        word-break: break-all
        white-space: nowrap
        padding 0 5px
        @media screen and (min-width:1900px){
          font-size: 40px;
        }
        &:nth-child(5n)
          margin-right: 0
        &.li-download
          font-size 20px
          line-height: 1.2
          align-items: center
          display: flex
          @media screen and (min-width:1900px){
            font-size: 30px;
          }
          .down-text
            // width 50px
            flex 1
            display: block
            vertical-align: middle
            // overflow hidden
            // word-break:break-all
            // word-wrap:break-word;
            white-space: pre-line
          .code-img
            width: 90px
            height: 90px
            margin 0 10px
            @media screen and (min-width:1900px){
              width: 116px
              height: 116px
            }
</style>
