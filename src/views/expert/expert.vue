<template>
  <div class="expert-container">
    <Header title="所有专家"></Header>
    <ul
      class="expert-ul infinite-list"
      v-infinite-scroll="load"
      style="overflow:auto;"
      infinite-scroll-disabled="disabled"
    >
      <li v-for="item in list" :key="item.uid" class="infinite-list-item">
        <div class="li-wrap">
          <Expert :item="item"></Expert>
        </div>
      </li>
    </ul>
    <p v-if="loading">加载中...</p>
    <p v-if="noMore">没有更多了</p>
    <Nav :showNav="false" :number="count"></Nav>
  </div>
</template>
<script>
import Header from "@/components/online_hospital_header/online_hospital_header";
import Expert from "@/components/expert/expert";
import Nav from "@/components/nav_list/nav_list";
import { mapState } from "vuex";

export default {
  name: "expert",
  components: { Header, Expert, Nav },
  props: {},
  data() {
    return {
      page: 0,
      list: [],
      loading: false,
      noMore: false,
      count: 0
    };
  },
  computed: {
    ...mapState(["appId"]),
    disabled() {
      return this.loading || this.noMore;
    }
  },
  watch: {},
  mounted() {},
  destroyed() {},
  methods: {
    load() {
      this.loading = true;
      setTimeout(() => {
        this.getExpertListData();
      }, 1000);
    },
    getExpertListData() {
      this.page += 1;
      this.$axios
        .fetchPost("/Home/Expert/GetMpExpertList", {
          appId: this.appId,
          page: this.page
        })
        .then(res => {
          if (res.data.code == 200) {
            this.loading = false;
            this.count = res.data.maxitem;
            if (res.data.data.length == 0) {
              this.noMore = true;
            }
            const data = res.data.data;
            this.list = this.list.concat(data);
          }
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.expert-container
  max-width 1900px
  margin 0 auto
  padding 101px 0 150px
  .expert-ul
    padding 0 40px
    width 100%
    display flex
    flex-wrap wrap
    max-height 740px
    li
      width 50%
      padding-right 10px
      margin-bottom 20px
      &:nth-child(2n)
        padding-left 10px
      .li-wrap
        border 2px solid rgba(255, 255, 255, 0.15)
  .result-num
    margin 20px 90px
    text-align left
    color #B5B5B5
    font-size 30px
</style>
