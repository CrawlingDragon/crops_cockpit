<template>
  <div class="search_expert-conatiner">
    <div class="module-title" v-show="!noData">共{{ amount }}个相关结果</div>
    <Expert
      v-for="item in expertList"
      :key="item.appid"
      :item="item"
      :adminFrom="true"
    ></Expert>
    <div class="noData" v-show="noData">暂无符合条件的结果</div>
    <div class="page-box " v-if="amount >= 11">
      <div class="wrap">
        <el-pagination
          small
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30]"
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
import Expert from "@/components/expert/expert";
export default {
  name: "search_expert",
  components: { Expert },
  props: ["searchValue", "nextSearch"],
  data() {
    return { expertList: [], page: 1, noData: false, amount: 0 };
  },
  computed: {
    ...mapState(["loginId"])
  },
  watch: {
    nextSearch() {
      if (this.page != 1) {
        this.page = 1;
      } else {
        this.getExpertData();
      }
    },
    page() {
      this.getExpertData();
    }
  },
  mounted() {
    this.getExpertData();
  },
  destroyed() {},
  methods: {
    handleSizeChange() {},
    handleCurrentChange(current) {
      this.page = current;
    },
    getExpertData() {
      this.openLoading();
      this.$axios
        .fetchPost("/Home/Search/getSearchModuleResults", {
          appId: this.loginId,
          keyword: this.searchValue,
          module: "expert",
          page: this.page,
          pagesize: 10
        })
        .then(res => {
          this.openLoading().close();
          if (res.data.code === "200") {
            this.expertList = res.data.data;
            this.amount = parseFloat(res.data.amount);
            this.noData = false;
          } else if (res.data.code === "500") {
            this.noData = true;
            this.expertList = [];
            this.amount = 0;
          }
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.search_expert-conatiner
  text-align left
  width 1330px
  margin 0 auto
  padding 30px 19px
  /deep/.expert-box
    margin-bottom 20px
    /deep/.text
      border: 2px solid rgba(255, 255, 255, 0.15);
      padding-top 15px
</style>
