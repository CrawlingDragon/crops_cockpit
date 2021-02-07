<template>
  <div class="content wangzhen">
    <div class="noData" v-show="amountWangzhen == 0">
      暂无符合条件的结果
    </div>
    <OnlineItem
      v-for="item in online"
      :key="item.tid"
      :item="item"
    ></OnlineItem>
    <div class="page-box " v-if="amountWangzhen >= 1">
      <div class="wrap">
        <div class="acount-bar">共{{ amountWangzhen }}个结果</div>
        <el-pagination
          v-if="amountWangzhen >= 11"
          small
          @current-change="handleCurrentChangeWangzhen"
          layout="prev, pager, next"
          :total="amountWangzhen"
          :page-size="10"
          class="paginatin"
          :currentPage="pageWangzhen"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import OnlineItem from "@/components/online_item/online_item";
import { mapState } from "vuex";

export default {
  name: "wangzhen_detail",
  components: { OnlineItem },
  props: {
    zuowuName: {
      type: String,
      default: ""
    }
  },
  data() {
    return { online: [], amountWangzhen: 0, pageWangzhen: 1 };
  },
  computed: { ...mapState(["loginId"]) },
  watch: {
    pageWangzhen() {
      this.getZuowuWangzhen();
    },
    zuowuName() {
      if (this.pageWangzhen != 1) {
        this.pageWangzhen = 1;
        return;
      }
      this.getZuowuWangzhen();
    }
  },
  mounted() {
    this.getZuowuWangzhen();
  },
  destroyed() {},
  methods: {
    getZuowuWangzhen() {
      this.openLoading();
      this.$axios
        .fetchPost("/Home/Search/getSearchModuleResults", {
          appId: this.loginId,
          keyword: this.zuowuName,
          module: "wen",
          page: this.pageWangzhen,
          pagesize: 10
        })
        .then(res => {
          this.openLoading().close();
          if (res.data.code === "200") {
            this.online = res.data.data;
            this.amountWangzhen = parseFloat(res.data.amount);
            this.noData = false;
          } else if (res.data.code === "500") {
            this.noData = true;
            this.online = [];
            this.amountWangzhen = 0;
          }
        });
    },
    handleCurrentChangeWangzhen(page) {
      this.pageWangzhen = page;
    }
  }
};
</script>
<style lang="stylus" scoped></style>
