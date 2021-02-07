<template>
  <div class="content xunzhen container-wrap">
    <div class="noData" v-show="amountXunzhen == 0">
      暂无符合条件的结果
    </div>
    <Xunzhen
      iszuozhen="xunzhen"
      v-for="item in xunzhen"
      :key="item.id"
      :item="item"
    ></Xunzhen>
    <div class="page-box " v-if="amountXunzhen >= 1">
      <div class="wrap">
        <div class="acount-bar">共{{ amountXunzhen }}个结果</div>
        <el-pagination
          v-if="amountXunzhen >= 11"
          small
          @current-change="handleCurrentChangeXunzhen"
          layout="prev, pager, next"
          :total="amountXunzhen"
          :page-size="10"
          class="paginatin"
          :currentPage="pageXunzhen"
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
  name: "xunzhen_detail",
  components: { Xunzhen },
  props: {
    zuowuName: {
      type: String,
      default: ""
    }
  },
  data() {
    return { xunzhen: [], amountXunzhen: 0, pageXunzhen: 1 };
  },
  computed: { ...mapState(["loginId"]) },
  watch: {
    pageXunzhen() {
      this.getZuowuXunzhen();
    },
    zuowuName() {
      if (this.pageXunzhen != 1) {
        this.pageXunzhen = 1;
        return;
      }

      this.getZuowuXunzhen();
    }
  },
  mounted() {
    this.getZuowuXunzhen();
  },
  destroyed() {},
  methods: {
    getZuowuXunzhen() {
      this.openLoading();
      this.$axios
        .fetchGet("/Home/Search/getSearchModuleResults", {
          appId: this.loginId,
          keyword: this.zuowuName,
          module: "xunzhen",
          page: this.pageXunzhen,
          pagesize: 10
        })
        .then(res => {
          this.openLoading().close();
          if (res.data.code === "200") {
            this.xunzhen = res.data.data;
            this.amountXunzhen = parseFloat(res.data.amount);
            this.noData = false;
          } else if (res.data.code === "500") {
            this.noData = true;
            this.xunzhen = [];
            this.amountXunzhen = 0;
          }
        });
    },
    handleCurrentChangeXunzhen(page) {
      this.pageXunzhen = page;
    }
  }
};
</script>
<style lang="stylus" scoped></style>
