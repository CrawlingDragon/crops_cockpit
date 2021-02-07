<template>
  <div class="search_hospital-conatiner">
    <div class="module-title" v-show="!noData">共{{ amount }}个相关结果</div>
    <div class="noData" v-show="noData">暂无符合条件的结果</div>
    <Xunzhen
      v-for="item in xunzhenList"
      :key="item.appid"
      :item="item"
      iszuozhen="xunzhen"
    ></Xunzhen>
    <div class="page-box " v-show="amount >= 11">
      <div class="wrap">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 5, 20, 30, 40]"
          :page-size="10"
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
import { mapState } from "vuex";
import Xunzhen from "@/components/search_xunzhen/search_xunzhen";

export default {
  name: "search_hospital",
  components: { Xunzhen },
  props: ["searchValue", "nextSearch"],
  data() {
    return {
      page: 1,
      xunzhenList: [],
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
        this.getXunzhenData();
      }
    },
    page() {
      this.getXunzhenData();
    }
  },
  mounted() {
    this.getXunzhenData();
  },
  destroyed() {},
  methods: {
    handleSizeChange() {},
    handleCurrentChange(current) {
      this.page = current;
    },
    getXunzhenData() {
      this.openLoading();
      this.$axios
        .fetchPost("/Home/Search/getSearchModuleResults", {
          appId: this.loginId,
          keyword: this.searchValue,
          module: "xunzhen",
          page: this.page,
          pagesize: 10
        })
        .then(res => {
          this.openLoading().close();
          if (res.data.code === "200") {
            this.xunzhenList = res.data.data;
            this.amount = parseFloat(res.data.amount);
            this.noData = false;
          } else if (res.data.code === "500") {
            this.noData = true;
            this.xunzhenList = [];
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
</style>
