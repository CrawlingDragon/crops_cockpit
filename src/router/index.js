/* eslint-disable semi */
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
//*以下是驾驶舱新增的
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
import store from '../store/index'
import axios from '../http'
//*
const routes = [
  //*以下是驾驶舱新增的
  {
    path: '/',
    component: () =>
      import(/* webpackChunkName: "WebForCounty" */ "../views/index/web-for-country.vue")
  },
  {
    path:'/findindex',
    component: () =>
      import(/* webpackChunkName: "findindex" */ "../components/business-components/find_components/find-index/find-index")
  },
  {
    path: '/home',
    name: 'home',
    component: () =>
      import(/* webpackChunkName: "WebForCounty" */ "../views/index/web-for-country.vue")
  },
  {
    path:'/nexthospital',
    name:'nexthospital',
    component: () =>
      import(/* webpackChunkName: "nexthospital" */ "../components/business-components/find_components/nexthospital/nexthospital.vue")
  },
  {
    path:'/expertlist',
    name:'expertlist',
    component: () =>
      import(/* webpackChunkName: "expertlist" */ "../components/business-components/find_components/expert-list/expert-list.vue")
  },
  {
    path:'/hospitalsort',
    name:'Hospitalsort',
    component: () =>
      import(/* webpackChunkName: "Hospitalsort" */ "../components/business-components/find_components/hospitalsort/hospitalsort"),
    'children':[
      {
          'path':'/hospitalsort',
          component: () =>
            import(/* webpackChunkName: "WebForCounty" */ "../components/business-components/find_components/defaultsort/defaultsort.vue"),
          'meta':{
            keepAlive:true
          },
      },
      {
          'path':'/defaultsort',
          'name':'defaultsort',
          component: () =>
            import(/* webpackChunkName: "defaultsort" */ "../components/business-components/find_components/defaultsort/defaultsort.vue"),
          'meta':{
            keepAlive:true
          },
     },
      {
          'path':'/multiplesort',
          'name':'multiplesort',
          component: () =>
            import(/* webpackChunkName: "multiplesort" */ "../components/business-components/find_components/multiplesort/multiplesort.vue"),
          'meta':{
            keepAlive:true
          },
      },
      {
          'path':'/selectsort',
          'name':'selectsort',
          component: () =>
            import(/* webpackChunkName: "selectsort" */ "../components/business-components/find_components/selectsort/selectsort.vue"),
          'meta':{
            keepAlive:true
          },
      }
  ]
  },
  {
    path:'/expertranking',
    name:'Expertranking',
    component: () =>
      import(/* webpackChunkName: "expertranking" */ "../components/business-components/find_components/expert_ranking/expertranking.vue")
  },
  {
    path:'/discussscore',
    name:'Discussscore',
    component: () =>
      import(/* webpackChunkName: "discussscore" */ "../components/business-components/find_components/discuss_score/discussscore.vue")
  },
  {
<<<<<<< HEAD
    path: "/index",
    name: "Index",
    component: () =>
      import(/* webpackChunkName: "discussscore" */ "../views/index/index.vue"),
=======
    path: '/index',
    name: 'Index',
    component: () =>import(/* webpackChunkName: "index */ "../views/index/index.vue"),
>>>>>>> origin/dev_xiaobai
    beforeEnter: (to, from, next) => {
      // console.log('from:', from.name)
      // console.log('to:', to)
      let userName = store.state.sessionUsername ? store.state.sessionUsername : window.sessionStorage.getItem('userName')
      let password = store.state.sessionPassword ? store.state.sessionPassword : window.sessionStorage.getItem('passWord')
      if (to.name == 'Index' || from.path == '/') {
        axios
          .fetchPost(
            "Home/Login/login",
            {username:userName,password:password}
          ).then(res => {
            if (res.data.code == 200) {
              let userid = res.data.data.userid;
              let level = res.data.data.level;
              let secondLevel = 0;
              if (level >= 3) {
                secondLevel = level - 1;
              } else {
                secondLevel = level;
              }
              if (level <= 3) {
                store.commit('getPicAddress', res.data.data.address);
                window.sessionStorage.setItem('getPicAddress', JSON.stringify(res.data.data.address))
              }
              let arr = res.data.data.area;
              let areaname = res.data.data.areaname;
              let defaultName = res.data.data.default;
              let letter = res.data.data.letter;
              window.sessionStorage.setItem('letter',letter)
              store.commit('getDefaultProvince', areaname); // 获取全网页地址
              store.commit('getGlobalLevel', level); //获取全网页等级
              store.commit('getDefaultCity', defaultName); // 获取二级方块地址
              store.commit('getSecondGlobalLevel', secondLevel); //获取二级方块等级
              store.commit('getDefaultAddressArr', arr); // 获取默认导航列表
              store.commit('getGlobalFstusername', res.data.data.Fstusername); //获取益农通账号
              store.commit('getGlobalFstuserpw', res.data.data.Fstuserpw); //获取益农通密码
              store.commit('getGlobalFstRoomid', res.data.data.FstRoomid); //获取益农通id
              store.commit('getAccountName', res.data.data.areaname);
              store.commit('getLoginId', level);
              store.commit('getBreadArr', res.data.data.nav);
              window.sessionStorage.setItem('getDefaultProvince', areaname)// 获取全网页地址
              window.sessionStorage.setItem('getGlobalLevel', level)//获取全网页等级
              window.sessionStorage.setItem('getDefaultAddressArr',JSON.stringify(res.data.data.area))//获取默认导航列表
              window.sessionStorage.setItem('getSecondGlobalLevel',secondLevel)//获取二级方块等级
              window.sessionStorage.setItem('getDefaultCity', res.data.data.default) // 获取二级方块地址
              window.sessionStorage.setItem('getGlobalFstusername', res.data.data.Fstusername)//获取益农通账号
              window.sessionStorage.setItem('getGlobalFstuserpw', res.data.data.Fstuserpw)//获取益农通密码
              window.sessionStorage.setItem('getGlobalFstRoomid', res.data.data.FstRoomid); //获取益农通id
              next({
                query: {
                  userid: userid,
                  areaname: areaname,
                  level: level,
                  letter: letter
                }
              });
            }
          })
      } else {
        store.commit('getDefaultAddressArr', JSON.parse(window.sessionStorage.getItem('getDefaultAddressArr'))); //获取默认导航列表
        store.commit('getGlobalLevel', window.sessionStorage.getItem('getGlobalLevel')); //获取全网页等级
        store.commit('getDefaultProvince', window.sessionStorage.getItem('getDefaultProvince')); // 获取全网页地址
        store.commit('getLoginId', window.sessionStorage.getItem('getGlobalLevel'));//获取当前登录者的id
        store.commit('getDefaultCity', window.sessionStorage.getItem('getDefaultCity')); // 获取二级方块地址
        store.commit('getGlobalFstusername',window.sessionStorage.getItem('getGlobalFstusername')); //获取益农通账号
        store.commit('getGlobalFstuserpw',window.sessionStorage.getItem('getGlobalFstuserpw')); //获取益农通密码
        store.commit('getGlobalFstRoomid', window.sessionStorage.getItem('getGlobalFstRoomid')); //获取益农通id
        let level = window.sessionStorage.getItem('getGlobalLevel')
        let secondLevel = 0;
        if (level >= 3) {
          secondLevel = level - 1;
        } else {
          secondLevel = level;
        }
        store.commit('getSecondGlobalLevel', secondLevel); //获取二级方块等级
        if(level<= 3){
          store.commit('getPicAddress', JSON.parse(window.sessionStorage.getItem('getPicAddress')));
        }
        next()
      }

    }
  },
  //** */
  // {
  //   path: "/",
  //   name: "indexFirst",
  //   component: () =>
  //     import(/* webpackChunkName: "index_first" */ "../views/index_first/index_first.vue")
  // },
  {
    path: "/indexFirst",
    name: "indexFirst",
    component: () =>
      import(/* webpackChunkName: "index" */ "../views/index_first/index_first.vue")
  },
  {
    path: "/channel",
    name: "channel",
    component: () =>
      import(/* webpackChunkName: "channel" */ "../views/channel/channel.vue")
  },
  {
    path: "/online_hospital_channel",
    name: "online_hospital_channel",
    component: () =>
      import(/* webpackChunkName: "online_hospital_channel" */ "../views/online_hospital_channel/online_hospital_channel.vue")
  },
  {
    path: "/expert",
    name: "expert",
    component: () =>
      import(/* webpackChunkName: "expert" */ "../views/expert/expert.vue")
  },
  {
    path: "/expert_hospital",
    name: "expert_hospital",
    component: () =>
      import(
        /* webpackChunkName: "expert_hospital" */ "../views/expert_hospital/expert_hospital.vue"
      )
  },
  {
    path: "/expert_detail",
    name: "expert_detail",
    component: () =>
      import(
        /* webpackChunkName: "expert_detail" */ "../views/expert_detail/expert_detail.vue"
      )
  },
  {
    path: "/expert_ranking",
    name: "expert_ranking",
    component: () =>
      import(
        /* webpackChunkName: "expert_ranking" */ "../views/expert_ranking/expert_ranking.vue"
      )
  },
  {
    path: "/find",
    name: "find",
    component: () =>
      import(/* webpackChunkName: "find" */ "../views/find/find.vue")
  },
  {
    path: "/goods_detail",
    name: "goods_detail",
    component: () =>
      import(
        /* webpackChunkName: "goods_detail" */ "../views/goods_detail/goods_detail.vue"
      )
  },
  {
    path: "/goods_list",
    name: "goods_list",
    component: () =>
      import(
        /* webpackChunkName: "goods_list" */ "../views/goods_list/goods_list.vue"
      )
  },
  {
    path: "/history",
    name: "history",
    component: () =>
      import(/* webpackChunkName: "history" */ "../views/history/history.vue")
  },
  {
    path: "/hospital",
    name: "hospital",
    component: () =>
      import(
        /* webpackChunkName: "hospital" */ "../views/hospital/hospital.vue"
      )
  },
  {
    path: "/index_second",
    name: "index_second",
    component: () =>
      import(
        /* webpackChunkName: "index_second" */ "../views/index_second/index_second.vue"
      )
  },
  {
    path: "/index_third",
    name: "index_third",
    component: () =>
      import(
        /* webpackChunkName: "index_third" */ "../views/index_third/index_third.vue"
      )
  },
  {
    path: "/me",
    name: "me",
    component: () => import(/* webpackChunkName: "me" */ "../views/me/me.vue")
  },
  {
    path: "/online_detail",
    name: "online_detail",
    component: () =>
      import(
        /* webpackChunkName: "online_detail" */ "../views/online_detail/online_detail.vue"
      )
  },
  {
    path: "/find_detail",
    name: "find_detail",
    component: () =>
      import(
        /* webpackChunkName: "find_detail" */ "../views/find_detail/find_detail.vue"
      )
  },
  {
    path: "/search",
    name: "search",
    component: () =>
      import(/* webpackChunkName: "search" */ "../views/search/search.vue")
  },
  {
    path: "/module_detail",
    name: "module_detail",
    component: () =>
      import(
        /* webpackChunkName: "module_detail" */ "../views/module_detail/module_detail.vue"
      )
  },
  {
    path: "/video",
    name: "video",
    component: () =>
      import(/* webpackChunkName: "video" */ "../views/video/video.vue")
  },
  {
    path: "/video_detail",
    name: "video_detail",
    component: () =>
      import(
        /* webpackChunkName: "video_detail" */ "../views/video_detail/video_detail.vue"
      )
  },
  {
    path: "/vip",
    name: "vip",
    component: () =>
      import(/* webpackChunkName: "vip" */ "../views/vip/vip.vue")
  },
  {
    path: "/vip_diagnosis",
    name: "vip_diagnosis",
    component: () =>
      import(
        /* webpackChunkName: "vip_diagnosis" */ "../views/vip_diagnosis/vip_diagnosis.vue"
      )
  },
  {
    path: "/vip_hospital",
    name: "vip_hospital",
    component: () =>
      import(
        /* webpackChunkName: "vip_hospital" */ "../views/vip_hospital/vip_hospital.vue"
      )
  },
  {
    path: "/second_wang",
    component: () =>
      import(
        /* webpackChunkName: "second_wang" */ "../views/second_wang/second_wang.vue"
      )
  },
  {
    path: "/diagnosis",
    component: () =>
      import(
        /* webpackChunkName: "diagnosis" */ "../views/diagnosis/diagnosis.vue"
      ),
    children: [
      {
        path: "",
        component: () =>
          import(
            /* webpackChunkName: "second_tu" */ "../views/second_tu/second_tu.vue"
          )
      },
      {
        path: "/diagnosis/second_tu",
        component: () =>
          import(
            /* webpackChunkName: "second_tu" */ "../views/second_tu/second_tu.vue"
          )
      },
      {
        path: "/diagnosis/second_wang",
        component: () =>
          import(
            /* webpackChunkName: "second_wang" */ "../views/second_wang/second_wang.vue"
          )
      },
      {
        path: "/diagnosis/second_zuo",
        component: () =>
          import(
            /* webpackChunkName: "second_zuo" */ "../views/second_zuo/second_zuo.vue"
          )
      },
      {
        path: "/diagnosis/second_xun",
        component: () =>
          import(
            /* webpackChunkName: "second_tu" */ "../views/second_xun/second_xun.vue"
          )
      }
    ]
  }
];

const router = new VueRouter({
  routes,
  mode: "hash"
});

export default router;
