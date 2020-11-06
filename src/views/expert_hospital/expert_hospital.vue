<template>
  <!-- // 暂时用不到 -->
  <div class="expert_hospital-container">
    <Header title="专家:黄莲蓉" :right_show_bar="false"></Header>
    <div class="nav">
      <div class="item">简介</div>
      <div class="item">TA加入的医院</div>
    </div>
    <ul class="hospital-ul">
      <li></li>
    </ul>
  </div>
</template>
<script>
import Header from "../../components/headers/headers"
export default {
  name: "expert_hospital",
  components: { Header },
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  destroyed() {},
  methods: {}
}
</script>
<style lang="stylus" scoped></style>
