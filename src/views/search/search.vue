<template>
  <div class="search-container">
    <div class="left-bar">
      <div class="title">会员搜索</div>
      <el-autocomplete
        v-model="state"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入内容"
        @select="handleSelect"
        class="input-box"
      >
        <i slot="prepend" class="el-icon-search"></i>
      </el-autocomplete>
      <div class="small-title">支持医院、专家、会员首拼搜索</div>
      <div class="btns">
        <div class="btn-clean">清除</div>
        <div class="del">删除</div>
      </div>
      <ul class="code-ul">
        <li>A</li>
        <li>B</li>
        <li>C</li>
        <li>D</li>
        <li>E</li>
        <li>F</li>
        <li>G</li>
        <li>H</li>
        <li>I</li>
        <li>J</li>
        <li>K</li>
        <li>L</li>
        <li>M</li>
        <li>N</li>
        <li>O</li>
        <li>P</li>
        <li>Q</li>
        <li>R</li>
        <li>S</li>
        <li>T</li>
        <li>U</li>
      </ul>
    </div>
    <div class="right-bar">
      <div class="title">你可能在找？</div>
      <div class="result-num">1/1</div>
      <ul class="result">
        <li></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "search",
  components: {},
  props: {},
  data() {
    return {
      restaurants: [],
      state: "",
      timeout: null
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.restaurants = this.loadAll()
  },
  destroyed() {},
  methods: {
    loadAll() {
      return [
        { value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" },
        {
          value: "Hot honey 首尔炸鸡（仙霞路）",
          address: "上海市长宁区淞虹路661号"
        },
        {
          value: "新旺角茶餐厅",
          address: "上海市普陀区真北路988号创邑金沙谷6号楼113"
        },
        { value: "泷千家(天山西路店)", address: "天山西路438号" }
      ]
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    handleSelect(item) {
      console.log(item)
    }
  }
}
</script>
<style lang="stylus" scoped>
.search-container
  display flex
  font-family SimHei
  text-align left
  .left-bar
    width 670px
    padding 58px 80px 0 90px
    & > .title
      font-size 36px
      font-weight 400
      color #B5B5B5
      margin-bottom 40px
    .input-box
      /deep/.el-input
        /deep/.el-input__inner
          background-color rgba(1, 9, 41, 0.5)
          border none
          width 540px
          height 80px
          box-sizing border-box
          font-size 48px
          color #FFFDFD
      /deep/.el-input-group__prepend
        background none
        border none
        background-color rgba(1, 9, 41, 0.5)
        color rgba(255, 255, 255, 0.5)
        font-size 40px
  .right-bar
    flex 1
</style>
