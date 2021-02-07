<template>
  <div class="search_hospital-conatiner">
    <div class="module-title" v-show="!noData">共{{ amount }}个相关结果</div>
    <div class="noData" v-show="noData">暂无符合条件的结果</div>
    <Vip v-for="item in vipList" :key="item.appid" :item="item"></Vip>
    <div class="page-box " v-if="amount >= 11">
      <div class="wrap">
        <el-pagination
          small
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[9, 20, 30]"
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
import Vip from "@/components/search_vip/search_vip";

export default {
  name: "search_hospital",
  components: { Vip },
  props: ["searchValue", "nextSearch"],
  data() {
    return {
      page: 1,
      vipList: [],
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
        this.getVipData();
      }
    },
    page() {
      this.getVipData();
    }
  },
  mounted() {
    this.getVipData();
  },
  destroyed() {},
  methods: {
    handleSizeChange() {},
    handleCurrentChange(current) {
      this.page = current;
    },
    getVipData() {
      this.openLoading();
      this.$axios
        .fetchPost("/Home/Search/getSearchModuleResults", {
          appId: this.loginId,
          keyword: this.searchValue,
          module: "user",
          page: this.page,
          pagesize: 10
        })
        .then(res => {
          this.openLoading().close();
          if (res.data.code === "200") {
            this.vipList = res.data.data;
            this.amount = parseFloat(res.data.amount);
            this.noData = false;
          } else if (res.data.code === "500") {
            this.noData = true;
            this.vipList = [];
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
