<template>
<div class="hospital_list-wrap">
  <div class="item" v-for="item in 3" :key="item">
    <div class="title">黄泽黄桃专科医院</div>
    <ul>
      <li>
        专家<br>9999
      </li>
      <li>
        网诊<br>99
      </li>
      <li>
        处方<br>99
      </li>
    </ul>
  </div>
</div>
</template>
<script>
export default {
  name: "hospital_list",
  components: {},
  props: {},
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  mounted () {},
  destroyed () {},
  methods: {}
}
</script>
<style lang="stylus" scoped>
.hospital_list-wrap
  .item
    width 100%
    height 190px
    margin-bottom 8px
    background #2494DE
    text-align left
    padding-left 30px
    padding-top 34px
    .title
      font-size 38px
      line-height 1.1
      font-family:SimHei;
      margin-bottom 18px
    ul
      li
        display inline-block
        font-family:SimHei;
        width 33.33%
        font-size 30px
        color #CECECE
        line-height 1.1
</style>
