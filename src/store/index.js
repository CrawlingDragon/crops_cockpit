import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appId: localStorage.getItem("appId"),
    purview: localStorage.getItem("purview"),
    // 以下是管理驾驶舱加入的
    accountName: "", // 登陆账号（其实是地址）
    defaultProvince: "", // 全网请求地址
    globalLevel: 5, // 获取请求的地址等级
    defaultCity: "", // 方块二级请求地址
    secondGlobalLevel: "", // 方块二级请求等级
    secondMapIndex: 0, // 每次请求地图的默认数据的索引
    defaultAddressArr: [], // 登陆之后给定的导航列表
    baseCity: "", // 地图选择地址
    clickCity: "", // 获取数据选择的地址,
    globalActiveName: "", // 登陆之后的地图右边数据显示 = 点击之后的右边数据显示
    globalFstusername: "", // 益农通账号
    globalFstuserpw: "", // 益农通密码
    globalFstRoomid: "", // 益农通房间id
    noData: false, // 没数据时
    // picAddress: {},//记录当前登录账号管理院的位置信息
    // loginId: {}, //登陆时，保存地图参数id
    sessionUsername: "", // 账号
    sessionPassword: "", // 密码
    breadArr: [], // 面包屑导航数组
    bviousName: "", // 县级的名字
    bviousLevel: 0, // 县级等级
    isnav: 1,
    isstore: window.sessionStorage.getItem("isstore"), // null为全国数据，1为新院数据
    huiyuanName: "", // 新院我的会员名字
    huiyuanId: "", // 新院我的会员id
    lowerHospital: window.localStorage.getItem("lowerHospital"),
    prevroute: "", // 专家列表记录上一层返回的地址
    precount:-1,//记录要返回的页面在历史的第几个页面
    hospitalIsstore: window.localStorage.getItem('hospitalIsstore'),
    adminRoute:window.localStorage.getItem('adminRoute')
  },
  mutations: {
    setAdminRoute (state, data) {
      state.adminRoute = data
      window.localStorage.setItem('adminRoute',data)
     },
    setHospitalIsstore (state, data) {
      //用于设置医院的isstore 属性，是否是网院还是新院
      state.hospitalIsstore = data
      window.localStorage.setItem('hospitalIsstore',data)
     },
    getPrevroute(state, data) { // 专家页面获取上一层返回的路由
      state.prevroute = data;
      localStorage.setItem("prevroute",data)
    },
    getPrecount(state,data){
      if(data ==1){
        state.precount = state.precount-1
      }else if(data == 0){
        state.precount = -1
      }
    },
    setLowerHospital (state, data) {
      state.lowerHospital = data;
      window.localStorage.getItem("lowerHospital", data);
    },
    setAppId(state, data) {
      state.appId = data;
      localStorage.setItem("appId", data);
    },
    getPurview(state, data) {
      state.purview = data;
      localStorage.setItem("purview", data);
    },
    // 以下是管理驾驶舱新加入的
    getIsnav(state, data) {
      state.isnav = data;
    },
    getBviousName(state, data) {
      // 县级的名字
      state.bviousName = data;
    },
    getBviousLevel(state, data) {
      // 县级等级
      state.bviousLevel = data;
    },
    getDefaultProvince(state, data) {
      // 全网请求地址
      state.defaultProvince = data;
    },
    getGlobalLevel(state, data) {
      // 获取请求的地址等级
      state.globalLevel = data;
    },
    getDefaultCity(state, data) {
      // 方块二级请求地址
      state.defaultCity = data;
    },
    getSecondGlobalLevel(state, data) {
      // 获取请求的地址等级
      state.secondGlobalLevel = data;
    },
    getClickCity(state, city) {
      // 点击地址获取数据的地址
      state.clickCity = city;
    },
    changeBaseCity(state, data) {
      // 地图获取点击地址
      state.baseCity = data;
    },
    getDefaultAddressArr(state, data) {
      // 登陆之后给定的导航列表
      state.defaultAddressArr = data;
    },
    getGlobalActiveName(state, data) {
      // 登陆之后的地图右边数据显示 = 点击之后的右边数据显示
      state.globalActiveName = data;
    },

    getGlobalFstusername(state, data) {
      // 益农通账号
      state.globalFstusername = data;
      window.localStorage.setItem("globalFstusername",data)
    },
    getGlobalFstuserpw(state, data) {
      // 益农通密码
      state.globalFstuserpw = data;
      window.localStorage.setItem("globalFstuserpw",data)
    },
    getGlobalFstRoomid(state, data) {
      state.globalFstRoomid = data;
      window.localStorage.setItem("globalFstRoomid",data)
    },
    getNoData(state, data) {
      state.noData = data;
    },
    // getPicAddress(state, data) { //获取县级地址的
    //   state.picAddress = data
    // },
    getAccountName(state, data) {
      state.accountName = data;
    },
    getSecondMapIndex(state, data) {
      state.secondMapIndex = data;
    },
    // getLoginId(state, data) {
    //   //登陆时，保存地图参数id
    //   state.loginId = data
    // },
    getBreadArr(state, data) { // 获取面包屑导航
      state.breadArr = data;
    },
    getSessionUsername(state, data) { // 改变账号，和把账号保存在session中
      state.sessionUsername = data;
      window.sessionStorage.setItem("userName", data);
    },
    getSessionPassword(state, data) { // 改变密码，和把密码写入到session中
      state.sessionPassword = data;
      window.sessionStorage.setItem("passWord", data);
    },
    getIsstore(state, data) {
      state.isstore = data;
      window.sessionStorage.setItem("isstore", data);
    },
    getHuiyuanName(state, data) { // 新院 获取我的会员的名字
      state.huiyuanName = data;
    },
    getHuiyuanId(state, data) { // 新院 获取我的会员的ID
      state.huiyuanId = data;
    }
  },
  actions: {},
  modules: {}
});
