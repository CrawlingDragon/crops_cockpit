<template>
  <div class="search_hospital-conatiner">
    <div class="module-title" v-show="!noData">共{{ amount }}个相关结果</div>
    <div
      v-for="item in zuowuList"
      :key="item.fid"
      @click="showDetail(item)"
      class="zuowu_li"
    >
      <Zuowu :item="item"></Zuowu>
    </div>
    <div class="noData" v-show="noData">暂无符合条件的结果</div>
    <div class="page-box " v-if="amount >= 11">
      <div class="wrap">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 5, 20, 30, 40]"
          :page-size="10"
          layout="prev, pager, next"
          :total="amount"
          :currentPage="page"
          class="paginatin"
        >
        </el-pagination>
      </div>
    </div>
    <router-view></router-view>
    <!-- <SearchZuoWuDetail
      v-if="zuowuShow"
      @zuowuDetail="zuowuDetailShow"
      :zuowu="zuowuName"
    ></SearchZuoWuDetail> -->
  </div>
</template>
<script>
import { mapState } from "vuex";
import Zuowu from "@/components/search_zuowu/search_zuowu";
import SearchZuoWuDetail from "@/views/search_child/search_zuowu_detail/search_zuowu_detail";
export default {
  name: "search_zuozhen",
  components: { Zuowu, SearchZuoWuDetail },
  props: ["searchValue", "nextSearch"],
  data() {
    return {
      page: 1,
      zuowuList: [],
      noData: false,
      amount: 0,
      zuowuName: "",
      zuowuShow: false
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
        this.getZuowuData();
      }
    },
    page(newVal, oldVal) {
      this.getZuowuData();
    }
  },
  mounted() {
    this.getZuowuData();
  },
  destroyed() {},
  methods: {
    showDetail(item) {
      this.$router.push({
        path: "/search_zuowu_detail/hospital_detail",
        query: { zuowuName: item.name }
      });
    },
    zuowuDetailShow(boolean) {
      this.zuowuShow = boolean;
    },
    handleSizeChange() {},
    handleCurrentChange(current) {
      this.page = current;
    },
    getZuowuData() {
      this.openLoading();
      this.$axios
        .fetchPost("/Home/Search/getSearchModuleResults", {
          appId: this.loginId,
          keyword: this.searchValue,
          module: "zuowu",
          page: this.page,
          pagesize: 10
        })
        .then(res => {
          this.openLoading().close();
          if (res.data.code === "200") {
            this.zuowuList = res.data.data;
            this.amount = parseFloat(res.data.amount);
            this.noData = false;
          } else if (res.data.code === "500") {
            this.noData = true;
            this.zuowuList = [];
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
  .zuowu_li
    margin-bottom 20px
</style>
