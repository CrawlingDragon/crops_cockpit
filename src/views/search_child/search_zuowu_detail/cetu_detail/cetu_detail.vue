<template>
  <div class="tab-content container-wrap">
    <div class="content cetu">
      <div class="noData" v-show="amountCetu == 0">
        暂无符合条件的结果
      </div>
      <CetuList v-for="item in cetu" :item="item" :key="item.id"></CetuList>
      <div class="page-box " v-if="amountCetu >= 1">
        <div class="wrap">
          <div class="acount-bar">共{{ amountCetu }}个结果</div>
          <el-pagination
            v-if="amountCetu >= 11"
            small
            @current-change="handleCurrentChangeCetu"
            layout="prev, pager, next"
            :total="amountCetu"
            :page-size="10"
            class="paginatin"
            :currentPage="pageCetu"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CetuList from "@/components/search_cetu/search_cetu";
import { mapState } from "vuex";

export default {
  name: "cetu_detail",
  components: { CetuList },
  props: ["zuowuName"],
  data() {
    return {
      cetu: [],
      amountCetu: 0,
      pageCetu: 1
    };
  },
  computed: { ...mapState(["loginId"]) },
  watch: {
    pageCetu() {
      this.getZuowuCetu();
    },
    zuowuName() {
      if (this.pageCetu != 1) {
        this.pageCetu = 1;
        return;
      }
      this.getZuowuCetu();
    }
  },
  mounted() {
    this.getZuowuCetu();
  },
  destroyed() {},
  methods: {
    getZuowuCetu() {
      this.openLoading();
      this.$axios
        .fetchPost("/Home/Search/getSearchModuleResults", {
          appId: this.loginId,
          keyword: this.zuowuName,
          module: "testingsoil",
          page: this.pageCetu,
          pagesize: 10
        })
        .then(res => {
          this.openLoading().close();
          if (res.data.code === "200") {
            this.cetu = res.data.data;
            this.amountCetu = parseFloat(res.data.amount);
            this.noData = false;
          } else if (res.data.code === "500") {
            this.noData = true;
            this.cetu = [];
            this.amountCetu = 0;
          }
        });
    },
    handleCurrentChangeCetu(page) {
      this.pageCetu = page;
    }
  }
};
</script>
<style lang="stylus" scoped></style>
