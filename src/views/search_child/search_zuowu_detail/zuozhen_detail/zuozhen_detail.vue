<template>
  <div class="content zuozhen container-wrap">
    <div class="noData" v-show="amountZuozhen == 0">
      暂无符合条件的结果
    </div>
    <Xunzhen
      iszuozhen="zuozhen"
      v-for="item in zuozhen"
      :key="item.id"
      :item="item"
    ></Xunzhen>
    <div class="page-box " v-if="amountZuozhen >= 1">
      <div class="wrap">
        <div class="acount-bar">共{{ amountZuozhen }}个结果</div>
        <el-pagination
          v-if="amountZuozhen >= 11"
          small
          @current-change="handleCurrentChangeZuozhen"
          layout="prev, pager, next"
          :total="amountZuozhen"
          :page-size="10"
          class="paginatin"
          :currentPage="pageZuozhen"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import Xunzhen from "@/components/search_xunzhen/search_xunzhen";
import { mapState } from "vuex";

export default {
  name: "zuozhen_detail",
  components: { Xunzhen },
  props: {
    zuowuName: {
      type: String,
      default: ""
    }
  },
  data() {
    return { zuozhen: [], amountZuozhen: 0, pageZuozhen: 1 };
  },
  computed: { ...mapState(["loginId"]) },
  watch: {
    pageZuozhen() {
      this.getZuowuZuozhen();
    },
    zuowuName() {
      if (this.pageZuozhen != 1) {
        this.pageZuozhen = 1;
        return;
      }
      this.getZuowuZuozhen();
    }
  },
  mounted() {
    this.getZuowuZuozhen();
  },
  destroyed() {},
  methods: {
    getZuowuZuozhen() {
      this.openLoading();
      this.$axios
        .fetchPost("/Home/Search/getSearchModuleResults", {
          appId: this.loginId,
          keyword: this.zuowuName,
          module: "zuozhen",
          page: this.pageZuozhen,
          pagesize: 10
        })
        .then(res => {
          this.openLoading().close();
          if (res.data.code === "200") {
            this.zuozhen = res.data.data;
            this.amountZuozhen = parseFloat(res.data.amount);
            this.noData = false;
          } else if (res.data.code === "500") {
            this.zuozhen = [];
            this.amountZuozhen = 0;
            this.noData = true;
          }
        });
    },
    handleCurrentChangeZuozhen(page) {
      this.pageZuozhen = page;
    }
  }
};
</script>
<style lang="stylus" scoped></style>
