<template>
  <div class="message_list">
    <div
      class="message"
      v-for="(item, index) in list"
      :key="item.id"
      v-show="changeIndex === index"
      @click="goToMessageDetail(item.module, item.id, item.appid, item.mpname)"
    >
      <div class="icon"></div>
      <p class="p1">{{ item.title }}</p>
      <p class="p2">{{ item.mess }}</p>
      <div class="times">{{ item.datetime }}</div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "message_list",
  components: {},
  props: {
    list: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      changeIndex: 0,
      setinterval: ""
    };
  },
  computed: {},
  watch: {
    list(newVal) {
      this.changeIndex = 0;
      clearInterval(this.setinterval);
      this.changeIndexFunction();
    }
  },
  mounted() {},
  destroyed() {
    clearInterval(this.setinterval);
  },
  methods: {
    ...mapMutations(["setAppId", "setIsLowerHospital", "setLowerHospital"]),
    changeIndexFunction() {
      // 3s变换index，按顺序显示通知信息
      const len = this.list.length;
      this.setinterval = setInterval(() => {
        this.changeIndex += 1;
        if (this.changeIndex >= len) {
          this.changeIndex = 0;
        }
      }, 6000);
    },
    goToMessageDetail(module, id, appId, mpname) {
      // 点击通知列表，去相应的详情页
      this.setAppId(appId);
      this.setIsLowerHospital("true");
      this.setLowerHospital(mpname);
      setTimeout(() => {
        this.chooseDetailModule(module, id);
      }, 100);
    },
    chooseDetailModule(type, id) {
      // 解析去对应module type
      switch (type) {
        case "testingsoil":
          // 测土详情
          // this.setLowerHospital("true");
          const router1 = this.$router.resolve({
            path: "/cetu_detail",
            query: { id: id }
          });
          window.open(router1.href, "_blank");
          break;
        case "forum_post":
          // 去网诊详情
          this.setLowerHospital("false");
          this.$router.push({
            path: "/wangzhen_detail",
            query: { tid: id }
          });
          // const router2 = this.$router.resolve({
          //   path: "/wangzhen_detail",
          //   query: { tid: id }
          // });
          // window.open(router2.href, "_blank");
          break;
        case "wenzhen":
          const router4 = this.$router.resolve({
            path: `/zuozhen_detail`,
            query: { tid: id }
          });
          window.open(router4.href, "_blank");
          // this.$router.push({
          //   path: `/zuozhen_detail`,
          //   query: { tid: id }
          // });
          break;
        case "xunzhen":
          const router5 = this.$router.resolve({
            path: `/xunzhen_detail`,
            query: { tid: id }
          });

          window.open(router5.href, "_blank");
          // this.$router.push({
          //   path: `/xunzhen_detail`,
          //   query: { tid: id }
          // });
          break;
        case "mp":
          // 去医院的网诊列表
          // this.setLowerHospital("true");
          const router3 = this.$router.resolve({
            path: "/diagnosis/second_wang"
          });
          window.open(router3.href, "_blank");
          break;
      }
    }
  }
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
