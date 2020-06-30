<template>
  <div class="history-container">
    <div class="title">浏览历史</div>
    <div class="box">
      <Item></Item>
    </div>
  </div>
</template>
<script>
import Item from "@/components/hospital_list_item/hospital_list_item"
export default {
  name: "history.vue",
  components: { Item },
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
<style lang="stylus" scoped>
.history-container
  .title
    padding 50px 90px 60px
    font-size 44px
    font-family SimHei
    font-weight 400
    color rgba(181, 181, 181, 1)
    text-align left
  .box
    margin 0 90px
</style>
