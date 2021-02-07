<template>
  <div class="content hospital container-wrap">
    <div class="noData" v-show="amountHospital == 0">
      暂无符合条件的结果
    </div>
    <Hospital
      v-for="item in hospital"
      :key="item.appid"
      :item="item"
    ></Hospital>
    <div class="page-box " v-if="amountHospital >= 1">
      <div class="wrap">
        <div class="acount-bar">共{{ amountHospital }}个结果</div>
        <el-pagination
          v-if="amountHospital >= 11"
          small
          @current-change="handleCurrentChangeHospital"
          layout="prev, pager, next"
          :total="amountHospital"
          :page-size="10"
          class="paginatin"
          :currentPage="pageHospital"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import Hospital from "@/components/search_hospital_item/search_hospital_item";
import { mapState } from "vuex";
export default {
  name: "hospital_detail",
  components: { Hospital },
  props: ["zuowuName"],
  data() {
    return {
      hospital: [],
      pageHospital: 1,
      amountHospital: 0
    };
  },
  computed: { ...mapState(["loginId"]) },
  watch: {
    pageHospital() {
      this.getZuowuHospital();
    },
    zuowuName() {
      if (this.pageHospital != 1) {
        this.pageHospital = 1;
        return;
      }
      this.getZuowuHospital();
    }
  },
  mounted() {
    this.getZuowuHospital();
  },
  destroyed() {},
  methods: {
    handleCurrentChangeHospital(page) {
      this.pageHospital = page;
    },
    getZuowuHospital() {
      this.openLoading();
      this.$axios
        .fetchPost("/Home/Search/getSearchModuleResults", {
          appId: this.loginId,
          keyword: this.zuowuName,
          module: "mpublic",
          page: this.pageHospital,
          pagesize: 10
        })
        .then(res => {
          this.openLoading().close();
          if (res.data.code === "200") {
            this.hospital = res.data.data;
            this.amountHospital = parseFloat(res.data.amount);
            this.noData = false;
          } else if (res.data.code === "500") {
            this.noData = true;
            this.hospital = [];
            this.amountHospital = 0;
          }
        });
    }
  }
};
</script>
<style lang="stylus" scoped></style>
