<template>
  <div class="message_list">
    <div class="message" v-for="(item,index) in list" :key="item.id" v-show="changeIndex === index" @click="
    goToMessageDetail(item.module,item.id)">
      <!--测土 -->
      <div class="icon"></div>
      <p class="p1">{{item.title}}</p>
      <p class="p2">{{item.mess}}</p>
      <div class="times">{{item.datetime}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "message_list",
  components: {},
  props: {
    list: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      changeIndex: 0,
      setinterval: "",
    };
  },
  computed: {},
  watch: {
    list(newVal) {
      this.changeIndex = 0;
      clearInterval(this.setinterval);
      this.changeIndexFunction();
    },
  },
  mounted() {},
  destroyed() {},
  methods: {
    changeIndexFunction() {
      // 3s变换index，按顺序显示通知信息
      const len = this.list.length;
      this.setinterval = setInterval(() => {
        this.changeIndex += 1;
        if (this.changeIndex >= len) {
          this.changeIndex = 0;
        }
      }, 3000);
    },
    goToMessageDetail(module, id) {
      // 点击通知列表，去相应的详情页
      // const router = this.chooseDetailModule(module);
      this.$router.push({
        path: `/module_detail`,
        query: { module: module, id: id },
      });
    },
    chooseDetailModule(type) {
      // 解析去对应module type
      switch (type) {
        case "mp":
          return "医院";
          break;
        case "cetu":
          return "测土";
          break;
        case "zuochen":
          return "坐珍";
          break;
        case "xunzhen":
          return "巡诊";
          break;
      }
    },
  },
};
</script>
<style lang="stylus" scoped>
.message_list
  height 190px
  overflow hidden
  .message
    height 190px
    background rgba(218, 50, 102, 0.5)
    position relative
    padding-left 90px
    padding-top 44px
    text-align left
    .icon
      width 50px
      height 42px
      background url('./7.png') no-repeat
      background-position center
      background-size 100%
      position absolute
      top 44px
      left 20px
    .p1
      font-size 30px
      line-height 1.2
      margin-bottom 25px
      color #CECECE
    .p2
      font-size 30px
      color #FFFEFE
      width 100%
      overflow hidden
      text-overflow ellipsis
      word-break break-all
      white-space nowrap
    .times
      position absolute
      right 21px
      top 25px
      font-size 28px
      color #CECECE
</style>
