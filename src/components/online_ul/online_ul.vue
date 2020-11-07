<template>
  <!-- 网院网诊的ul -->
  <div class="second_wang-container">
    <ul
      class="wang-ul infinite-list"
      v-infinite-scroll="load"
      style="overflow:auto;"
      infinite-scroll-disabled="disabled"
    >
      <li v-for="item in list" :key="item.tid" class="infinite-list-item">
        <OnlineItem :item="item"></OnlineItem>
      </li>
      <p v-if="loading">加载中...</p>
      <p v-if="noMore">没有更多了</p>
    </ul>
  </div>
</template>
<script>
import { mapState } from "vuex";
import OnlineItem from "@/components/online_item/online_item";
export default {
  name: "online_ul",
  components: {
    OnlineItem
  },
  props: {
    expertId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      list: [],
      page: 0,
      loading: false,
      noMore: false,
      count: 0
    };
  },
  computed: {
    ...mapState(["appId"]),
    disabled() {
      return this.loading || this.noMore;
    }
  },
  watch: {},
  mounted() {},
  destroyed() {},
  methods: {
    load() {
      this.page += 1;
      this.loading = true;
      setTimeout(() => {
        this.$axios
          .fetchPost("/Home/Treatment/GetWenList", {
            page: this.page,
            appId: this.appId
          })
          .then(res => {
            if (res.data.code == 200) {
              this.list = this.list.concat(res.data.data);
              this.loading = false;
              this.count = res.data.count;
              if (res.data.data.length == 0) {
                this.noMore = true;
              }
            } else {
              this.noMore = true;
            }
          });
      }, 1000);
    }
  }
};
</script>
<style lang="stylus" scoped>
.second_wang-container
  max-width 1900px
  margin 0 auto
  height 100%
  max-height 100%
  overflow hidden
  .wang-ul
    padding-bottom 155px
    max-height 690px
    padding 0 40px
</style>
