<template>
  <div class="search_hospital-conatiner">
    <div class="module-title" v-show="!noData">共{{ amount }}个相关结果</div>
    <Hospital
      v-for="item in hospitalList"
      :key="item.appid"
      :item="item"
    ></Hospital>
    <div class="noData" v-show="noData">暂无符合条件的结果</div>
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
import Hospital from "@/components/search_hospital_item/search_hospital_item";

export default {
  name: "search_hospital",
  components: { Hospital },
  props: ["searchValue", "nextSearch"],
  data() {
    return {
      page: 1,
      hospitalList: [],
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
        this.getHospitalData();
      }
    },
    page() {
      this.getHospitalData();
    }
  },
  mounted() {
    this.getHospitalData();
  },
  destroyed() {},
  methods: {
    handleSizeChange() {},
    handleCurrentChange(current) {
      this.page = current;
    },
    getHospitalData() {
      this.openLoading();
      this.$axios
        .fetchPost("/Home/Search/getSearchModuleResults", {
          appId: this.loginId,
          keyword: this.searchValue,
          module: "mpublic",
          page: this.page,
          pagesize: 10
        })
        .then(res => {
          this.openLoading().close();
          if (res.data.code === "200") {
            this.hospitalList = res.data.data;
            this.amount = parseFloat(res.data.amount);
            this.noData = false;
          } else if (res.data.code === "500") {
            this.noData = true;
            this.hospitalList = [];
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
