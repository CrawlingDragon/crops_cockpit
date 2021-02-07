<template>
  <div class="content expert container-wrap">
    <div class="noData" v-show="amountExpert == 0">
      暂无符合条件的结果
    </div>
    <Expert v-for="item in expert" :key="item.uid" :item="item"></Expert>
    <div class="page-box " v-if="amountExpert >= 1">
      <div class="wrap">
        <div class="acount-bar">共{{ amountExpert }}个结果</div>
        <el-pagination
          v-if="amountExpert >= 11"
          small
          @current-change="handleCurrentChangeExpert"
          layout="prev, pager, next"
          :total="amountExpert"
          :page-size="10"
          class="paginatin"
          :currentPage="pageExpert"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import Expert from "@/components/expert/expert";
import { mapState } from "vuex";

export default {
  name: "zuowu_expert_detail",
  components: { Expert },
  props: ["zuowuName"],
  data() {
    return { expert: [], amountExpert: 0, pageExpert: 1 };
  },
  computed: { ...mapState(["loginId"]) },
  watch: {
    pageExpert() {
      this.getZuowuExpert();
    },
    zuowuName() {
      if (this.pageExpert != 1) {
        this.pageExpert = 1;
        return;
      }
      this.getZuowuExpert();
    }
  },
  mounted() {
    this.getZuowuExpert();
  },
  destroyed() {},
  methods: {
    handleCurrentChangeExpert(page) {
      this.pageExpert = page;
    },
    getZuowuExpert() {
      this.openLoading();
      this.$axios
        .fetchPost("/Home/Search/getSearchModuleResults", {
          appId: this.loginId,
          keyword: this.zuowuName,
          module: "expert",
          page: this.pageExpert,
          pagesize: 10
        })
        .then(res => {
          this.openLoading().close();
          if (res.data.code === "200") {
            this.expert = res.data.data;
            this.amountExpert = parseFloat(res.data.amount);
            this.noData = false;
          } else if (res.data.code === "500") {
            this.noData = true;
            this.expert = [];
            this.amountExpert = 0;
          }
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
/deep/.text
  border: 2px solid rgba(255,255,255,0.15);
/deep/
  .expert-box
    margin-bottom 10px
</style>
