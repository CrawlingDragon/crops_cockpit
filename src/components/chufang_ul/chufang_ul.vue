<template>
  <!-- 网院网诊的ul -->
  <div class="second_wang-container">
    <ul
      class="wang-ul infinite-list scroll"
      v-infinite-scroll="load"
      style="overflow:auto;"
      infinite-scroll-disabled="disabled"
    >
      <li v-for="item in list" :key="item.tid" class="infinite-list-item">
        <ChufangItem :item="item"></ChufangItem>
      </li>
      <p v-if="loading" class="p1">加载中...</p>
      <p v-if="noMore" class="p1">没有更多了</p>
    </ul>
  </div>
</template>
<script>
import { mapState } from "vuex";
import ChufangItem from "@/components/chufang_item/chufang_item";
export default {
  name: "chufang_ul",
  components: {
    ChufangItem
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
  mounted() {
    this.load();
  },
  destroyed() {},
  methods: {
    load() {
      this.page += 1;
      this.loading = true;
      setTimeout(() => {
        this.$axios
          .fetchPost("/Home/Treatment/GetRecipetemList", {
            page: this.page,
            appId: this.appId,
            uId: this.expertId == "" ? "" : this.expertId
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
.p1
  width 100%
  text-align center
</style>
