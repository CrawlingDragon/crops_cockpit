/* eslint-disable semi */
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
//*以下是驾驶舱新增的
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
//*
const routes = [
  //*以下是驾驶舱新增的
  {
    path: '/',
    component: () =>
      import(/* webpackChunkName: "WebForCounty" */ "../views/index_four/web-for-country.vue")
  },
  {
    path:'/findindex',
    component: () =>
      import(/* webpackChunkName: "findindex" */ "../views/find-index/find-index")
  },
  {
    path: '/home',
    name: 'home',
    component: () =>
      import(/* webpackChunkName: "WebForCounty" */ "../views/index_four/web-for-country.vue")
  },
  {
    path:'/nexthospital',
    name:'nexthospital',
    component: () =>
      import(/* webpackChunkName: "nexthospital" */ "../views/nexthospital/nexthospital.vue")
  },
  {
    path:'/expertlist',
    name:'expertlist',
    component: () =>
      import(/* webpackChunkName: "expertlist" */ "../views/expert-list/expert-list.vue")
  },
  {
    path:'/hospitalsort',
    name:'Hospitalsort',
    component: () =>
      import(/* webpackChunkName: "Hospitalsort" */ "../views/hospitalsort/hospitalsort"),
    'children':[
      {
          'path':'/hospitalsort',
          component: () =>
            import(/* webpackChunkName: "WebForCounty" */ "../views/defaultsort/defaultsort.vue"),
          'meta':{
            keepAlive:true
          },
      },
      {
          'path':'/defaultsort',
          'name':'defaultsort',
          component: () =>
            import(/* webpackChunkName: "defaultsort" */ "../views/defaultsort/defaultsort.vue"),
          'meta':{
            keepAlive:true
          },
     },
      {
          'path':'/multiplesort',
          'name':'multiplesort',
          component: () =>
            import(/* webpackChunkName: "multiplesort" */ "../views/multiplesort/multiplesort.vue"),
          'meta':{
            keepAlive:true
          },
      },
      {
          'path':'/selectsort',
          'name':'selectsort',
          component: () =>
            import(/* webpackChunkName: "selectsort" */ "../views/selectsort/selectsort.vue"),
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
      import(/* webpackChunkName: "expertranking" */ "../views/expert_ranking/expertranking.vue")
  },
  {
    path:'/discussscore',
    name:'Discussscore',
    component: () =>
      import(/* webpackChunkName: "discussscore" */ "../views/discuss_score/discussscore.vue")
  },
  {
    path: '/indexFour',
    name: 'IndexFour',
    component: () =>import(/* webpackChunkName: "index */ "../views/index_four/index.vue"),
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
