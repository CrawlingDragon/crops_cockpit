<template>
  <div class="search_hospital-conatiner">
    <div class="module-title" v-show="!noData">共{{ amount }}个相关结果</div>
    <div class="noData" v-show="noData">暂无符合条件的结果</div>
    <OnlineItem
      v-for="item in onlineList"
      :key="item.appid"
      :item="item"
    ></OnlineItem>
    <div class="page-box " v-show="amount >= 11">
      <div class="wrap">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 5, 20, 30, 40]"
          :page-size="10"
          :currentPage="page"
          layout="prev, pager, next"
          :total="amount"
          class="paginatin"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import OnlineItem from "@/components/online_item/online_item";
export default {
  name: "search_wangzhen",
  components: { OnlineItem },
  props: ["searchValue", "nextSearch"],
  data() {
    return {
      page: 1,
      onlineList: [],
      amount: 0,
      noData: false
    };
  },
  computed: {
    ...mapState(["loginId"])
  },
  watch: {
    nextSearch() {
      if (this.page != 1) {
        this.page = 1;
      } else {
        this.getWangzhenData();
      }
    },
    page() {
      this.getWangzhenData();
    }
  },
  mounted() {
    this.getWangzhenData();
  },
  destroyed() {},
  methods: {
    handleSizeChange() {},
    handleCurrentChange(current) {
      this.page = current;
    },
    getWangzhenData() {
      this.openLoading();
      this.$axios
        .fetchPost("/Home/Search/getSearchModuleResults", {
          appId: this.loginId,
          keyword: this.searchValue,
          module: "wen",
          page: this.page,
          pagesize: 10
        })
        .then(res => {
          this.openLoading().close();
          if (res.data.code === "200") {
            this.onlineList = res.data.data;
            this.amount = parseFloat(res.data.amount);
            this.noData = false;
          } else if (res.data.code === "500") {
            this.noData = true;
            this.onlineList = [];
            this.amount = 0;
          }
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.search_hospital-conatiner
  text-align left
  width 1330px
  margin 0 auto
  /deep/.online_item-container
    padding 0
</style>
