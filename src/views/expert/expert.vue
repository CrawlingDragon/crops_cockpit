<template>
  <div class="expert-container">
    <Header title="所有专家"></Header>
    <ul class="expert-ul">
      <li v-for="item in 6" :key="item">
        <div class="li-wrap">
          <Expert></Expert>
        </div>
      </li>
    </ul>
    <Nav :showNav="false" number="1"></Nav>
  </div>
</template>
<script>
import Header from "@/components/headers/headers";
import Expert from "@/components/expert/expert";
import Nav from "@/components/nav_list/nav_list";
export default {
  name: "expert",
  components: { Header, Expert, Nav },
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  destroyed() {},
  methods: {}
};
</script>
<style lang="stylus" scoped>
.expert-container
  max-width 1900px
  margin 0 auto
  .expert-ul
    margin 0 90px
    width 100%
    display flex
    flex-wrap wrap
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
