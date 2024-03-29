/* eslint-disable semi */
import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
Vue.use(VueRouter);
//* 以下是驾驶舱新增的
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
//*
const routes = [
  //* 以下是驾驶舱新增的
  {
    path: "/",
    redirect: "/home"
    // component: () =>
    //   import(/* webpackChunkName: "WebForCounty" */ "../views/login/login")
  },
  {
    path: "/findindex",
    component: () =>
      import(
        /* webpackChunkName: "findindex" */ "../views/find-index/find-index"
      ),
    meta: {
      adminRoute: true
    }
  },
  {
    path: "/find_detail",
    component: () =>
      import(
        /* webpackChunkName: "find_detail" */ "../views/find_detail/find_detail"
      )
  },
  {
    path: "/index_channel",
    component: () =>
      import(
        /* webpackChunkName: "index_channel" */ "../views/index_channel/index_channel"
      )
  },
  {
    path: "/threeLogin",
    component: () =>
      import(
        /* webpackChunkName: "threeLogin" */ "../views/threeLogin/threeLogin"
      ),
    meta: {
      adminRoute: true
    }
  },
  {
    path: "/home",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "WebForCounty" */ "../views/login/login"),
    meta: {
      adminRoute: true
    }
  },
  {
    path: "/nexthospital",
    name: "nexthospital",
    component: () =>
      import(
        /* webpackChunkName: "nexthospital" */ "../views/nexthospital/nexthospital.vue"
      ),
    meta: {
      adminRoute: true
    }
  },
  {
    path: "/expertlist",
    name: "expertlist",
    component: () =>
      import(
        /* webpackChunkName: "expertlist" */ "../views/expert-list/expert-list.vue"
      )
  },
  {
    path: "/expert_all",
    name: "expert_all",
    component: () =>
      import(
        /* webpackChunkName: "expert_all" */ "../views/expert_all/expert_all.vue"
      )
  },
  // {
  //   path: "/expertlist",
  //   name: "expertlist",
  //   component: () =>
  //     import(/* webpackChunkName: "expertlist" */ "../views/expert_list/expert_list.vue")
  // },
  {
    path: "/hospitalsort",
    name: "Hospitalsort",
    component: () =>
      import(
        /* webpackChunkName: "Hospitalsort" */ "../views/hospitalsort/hospitalsort"
      ),
    meta: {
      adminRoute: true
    },
    children: [
      {
        path: "/hospitalsort",
        component: () =>
          import(
            /* webpackChunkName: "defaultsort" */ "../views/defaultsort/defaultsort.vue"
          ),
        meta: {
          keepAlive: true,
          adminRoute: true
        }
      },
      {
        path: "/defaultsort",
        name: "defaultsort",
        component: () =>
          import(
            /* webpackChunkName: "defaultsort" */ "../views/defaultsort/defaultsort.vue"
          ),
        meta: {
          keepAlive: true,
          adminRoute: true
        }
      },
      {
        path: "/multiplesort",
        name: "multiplesort",
        component: () =>
          import(
            /* webpackChunkName: "multiplesort" */ "../views/multiplesort/multiplesort.vue"
          ),
        meta: {
          keepAlive: true,
          adminRoute: true
        }
      },
      {
        path: "/selectsort",
        name: "selectsort",
        component: () =>
          import(
            /* webpackChunkName: "selectsort" */ "../views/selectsort/selectsort.vue"
          ),
        meta: {
          keepAlive: true,
          adminRoute: true
        }
      }
    ]
  },
  {
    path: "/expertranking",
    name: "Expertranking",
    component: () =>
      import(
        /* webpackChunkName: "expertranking" */ "../views/expert_ranking/expertranking.vue"
      )
  },
  {
    path: "/discussscore",
    name: "Discussscore",
    component: () =>
      import(
        /* webpackChunkName: "discussscore" */ "../views/discuss_score/discussscore.vue"
      )
  },
  {
    path: "/expert_detail_four",
    name: "expert_detail_four",
    component: () =>
      import(
        /* webpackChunkName: "expert_detail_four" */ "../views/expert_detail_four/expert_detail_four.vue"
      )
  },
  {
    path: "/indexFour",
    name: "IndexFour",
    component: () =>
      import(/* webpackChunkName: "index */ "../views/index_four/index.vue"),
    meta: {
      adminRoute: true
    }
  },
  {
    path: "/indexFirst",
    name: "indexFirst",
    component: () =>
      import(
        /* webpackChunkName: "index" */ "../views/index_first/index_first.vue"
      )
  },
  {
    path: "/channel",
    name: "channel",
    component: () =>
      import(/* webpackChunkName: "channel" */ "../views/channel/channel.vue"),
    meta: {
      adminRoute: true
    }
  },
  {
    path: "/online_hospital_channel_gather",
    name: "online_hospital_channel_gather",
    component: () =>
      import(
        /* webpackChunkName: "online_hospital_channel_gather" */ "../views/online_hospital_channel_gather/online_hospital_channel_gather.vue"
      ),
    meta: {
      adminRoute: true
    }
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
    path: "/info_list",
    component: () =>
      import(
        /* webpackChunkName: "info_list" */ "../views/info_list/info_list.vue"
      )
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
    path: "/index_first",
    name: "index_first",
    component: () =>
      import(
        /* webpackChunkName: "index_first" */ "../views/index_first/index_first.vue"
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
    path: "/online_hospital_channel_second",
    name: "online_hospital_channel_second",
    component: () =>
      import(
        /* webpackChunkName: "online_hospital_channel_second" */ "../views/online_hospital_channel_second/online_hospital_channel_second"
      )
  },
  {
    path: "/second_wang",
    name: "second_wang",
    component: () =>
      import(
        /* webpackChunkName: "second_wang" */ "../views/second_wang/second_wang.vue"
      )
  },
  {
    path: "/me",
    name: "me",
    component: () => import(/* webpackChunkName: "me" */ "../views/me/me.vue")
  },
  {
    path: "/village_me",
    name: "village_me",
    component: () =>
      import(
        /* webpackChunkName: "village_me" */ "../views/village_me/village_me.vue"
      )
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
    path: "/online_hospital_channel",
    name: "online_hospital_channel",
    component: () =>
      import(
        /* webpackChunkName: "online_hospital_channel" */ "../views/online_hospital_channel/online_hospital_channel.vue"
      )
  },
  {
    path: "/search",
    name: "search",
    component: () =>
      import(/* webpackChunkName: "search" */ "../views/search/search.vue"),
    children: [
      {
        path: "/search",
        name: "search_all",
        component: () =>
          import(
            /* webpackChunkName: "search_all" */ "../views/search_child/search_all/search_all.vue"
          )
      },
      {
        path: "/search/search_all",
        component: () =>
          import(
            /* webpackChunkName: "search_all" */ "../views/search_child/search_all/search_all.vue"
          )
      },
      {
        path: "/search/search_expert",
        name: "search_expert",
        component: () =>
          import(
            /* webpackChunkName: "search_expert" */ "../views/search_child/search_expert/search_expert.vue"
          )
      },
      {
        path: "/search/search_hospital",
        name: "search_hospital",
        component: () =>
          import(
            /* webpackChunkName: "search_hospital" */ "../views/search_child/search_hospital/search_hospital.vue"
          )
      },
      {
        path: "/search/search_vip",
        name: "search_vip",
        component: () =>
          import(
            /* webpackChunkName: "search_vip" */ "../views/search_child/search_vip/search_vip.vue"
          )
      },
      {
        path: "/search/search_wangzhen",
        name: "search_wangzhen",
        component: () =>
          import(
            /* webpackChunkName: "search_wangzhen" */ "../views/search_child/search_wangzhen/search_wangzhen.vue"
          )
      },
      {
        path: "/search/search_xunzhen",
        name: "search_xunzhen",
        component: () =>
          import(
            /* webpackChunkName: "search_xunzhen" */ "../views/search_child/search_xunzhen/search_xunzhen.vue"
          )
      },
      {
        path: "/search/search_zuowu",
        name: "search_zuowu",
        component: () =>
          import(
            /* webpackChunkName: "search_zuowu" */ "../views/search_child/search_zuowu/search_zuowu.vue"
          ),
        children: [
          {
            path: "/search/search_zuowu/search_zuowu_detail",
            name: "search_zuowu_detail",
            component: () =>
              import(
                /* webpackChunkName: "search_zuowu_detail" */ "../views/search_child/search_zuowu_detail/search_zuowu_detail.vue"
              ),
            children: [
              {
                path: "/search_zuowu_detail/hospital_detail",
                name: "hospital_detail",
                component: () =>
                  import(
                    /* webpackChunkName: "hospital_detail" */ "../views/search_child/search_zuowu_detail/hospital_detail/hospital_detail.vue"
                  )
              },
              {
                path: "/search_zuowu_detail/zuowu_expert_detail",
                name: "zuowu_expert_detail",
                component: () =>
                  import(
                    /* webpackChunkName: "expert_detail" */ "../views/search_child/search_zuowu_detail/expert_detail/expert_detail.vue"
                  )
              },
              {
                path: "/search_zuowu_detail/wangzhen_detail",
                name: "wangzhen_detail",
                component: () =>
                  import(
                    /* webpackChunkName: "wangzhen_detail" */ "../views/search_child/search_zuowu_detail/wangzhen_detail/wangzhen_detail.vue"
                  )
              },
              {
                path: "/search_zuowu_detail/zuozhen_detail",
                name: "zuozhen_detail",
                component: () =>
                  import(
                    /* webpackChunkName: "zuozhen_detail" */ "../views/search_child/search_zuowu_detail/zuozhen_detail/zuozhen_detail.vue"
                  )
              },
              {
                path: "/search_zuowu_detail/xunzhen_detail",
                name: "xunzhen_detail",
                component: () =>
                  import(
                    /* webpackChunkName: "xunzhen_detail" */ "../views/search_child/search_zuowu_detail/xunzhen_detail/xunzhen_detail.vue"
                  )
              },
              {
                path: "/search_zuowu_detail/cetu_detail",
                name: "cetu_detail",
                component: () =>
                  import(
                    /* webpackChunkName: "cetu_detail" */ "../views/search_child/search_zuowu_detail/cetu_detail/cetu_detail.vue"
                  )
              }
            ]
          }
        ]
      },
      {
        path: "/search/search_zuozhen",
        name: "search_zuozhen",
        component: () =>
          import(
            /* webpackChunkName: "search_zuozhen" */ "../views/search_child/search_zuozhen/search_zuozhen.vue"
          )
      }
    ]
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
    path: "/data_analysis",
    name: "data_analysis",
    component: () =>
      import(
        /* webpackChunkName: "data_analysis" */ "../views/data_analysis/data_analysis.vue"
      )
  },
  {
    path: "/answer_data_detail",
    name: "answer_data_detail",
    component: () =>
      import(
        /* webpackChunkName: "answer_data_detail" */ "../views/answer_data_detail/answer_data_detail.vue"
      )
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
      ),
    children: [
      {
        path: "/vip_diagnosis/huiyuan_wang",
        name: "huiyuan_wang",
        component: () =>
          import(
            /* webpackChunkName: "huiyuan_wang" */ "../views/huiyuan_wang/huiyuan_wang.vue"
          )
      }
    ]
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
  },
  {
    path: "/diagnosis_general",
    component: () =>
      import(
        /* webpackChunkName: "diagnosis_general" */ "../views/diagnosis_general/diagnosis_general.vue"
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
        path: "/diagnosis_general/second_tu",
        component: () =>
          import(
            /* webpackChunkName: "second_tu" */ "../views/second_tu/second_tu.vue"
          )
      },
      {
        path: "/diagnosis_general/second_wang",
        component: () =>
          import(
            /* webpackChunkName: "second_wang" */ "../views/second_wang/second_wang.vue"
          )
      },
      {
        path: "/diagnosis_general/second_zuo",
        component: () =>
          import(
            /* webpackChunkName: "second_zuo" */ "../views/second_zuo/second_zuo.vue"
          )
      },
      {
        path: "/diagnosis_general/second_xun",
        component: () =>
          import(
            /* webpackChunkName: "second_tu" */ "../views/second_xun/second_xun.vue"
          )
      }
    ]
  },
  {
    path: "/second_huiyuan_list",
    component: () =>
      import(
        /* webpackChunkName: "second_huiyuan_list" */ "../views/second_huiyuan_list/second_huiyuan_list.vue"
      )
  },
  {
    path: "/second_huiyuan_itro",
    component: () =>
      import(
        /* webpackChunkName: "second_huiyuan_itro" */ "../views/second_huiyuan_itro/second_huiyuan_itro.vue"
      ),
    children: [
      {
        path: "/second_huiyuan_itro/huiyuan_wang",
        component: () =>
          import(
            /* webpackChunkName: "huiyun_wang" */ "../views/huiyuan_wang/huiyuan_wang.vue"
          ),
        meta: {
          keepAlive: true
        }
      },
      {
        path: "/second_huiyuan_itro/huiyuan_tu",
        component: () =>
          import(
            /* webpackChunkName: "huiyuan_tu" */ "../views/huiyuan_tu/huiyuan_tu.vue"
          ),
        meta: {
          keepAlive: true
        }
      },
      {
        path: "/second_huiyuan_itro/huiyuan_jianjie",
        component: () =>
          import(
            /* webpackChunkName: "huiyuan_intro" */ "../views/huiyuan_jianjie/huiyuan_jianjie.vue"
          ),
        meta: {
          keepAlive: true
        }
      },
      {
        path: "/second_huiyuan_itro/huiyuan_dingdan",
        component: () =>
          import(
            /* webpackChunkName: "huiyuan_dingdan" */ "../views/huiyuan_dingdan/huiyuan_dingdan.vue"
          ),
        meta: {
          keepAlive: true
        }
      }
    ]
  },
  {
    path: "/huiyuan_dingdan/second_order_detail",
    component: () =>
      import(
        /* webpackChunkName: "second_order_detail" */ "../views/second_order_detail/second_order_detail.vue"
      )
  },
  {
    path: "/wangzhen_detail",
    component: () =>
      import(
        /* webpackChunkName: "wangzhen_detail" */ "../views/wangzhen_detail/wangzhen_detail.vue"
      )
  },
  {
    path: "/cetu_detail",
    component: () =>
      import(
        /* webpackChunkName: "cetu_detail" */ "../views/cetu_detail/cetu_detail.vue"
      )
  },
  {
    path: "/xunzhen_detail",
    component: () =>
      import(
        /* webpackChunkName: "xunzhen_detail" */ "../views/xunzhen_detail/xunzhen_detail.vue"
      )
  },
  {
    path: "/zuozhen_detail",
    component: () =>
      import(
        /* webpackChunkName: "zuozhen_detail" */ "../views/zuozhen_detail/zuozhen_detail.vue"
      )
  },
  {
    path: "/expert_paihang",
    component: () =>
      import(
        /* webpackChunkName: "expert_paihang" */ "../views/expert_paihang/expert_paihang.vue"
      )
  },
  {
    path: "/expert_paihang_general",
    component: () =>
      import(
        /* webpackChunkName: "expert_paihang_general" */ "../views/expert_paihang_general/expert_paihang_general.vue"
      )
  },
  {
    path: "/expert_paihang_xiaji",
    component: () =>
      import(
        /* webpackChunkName: "expert_paihang_xiaji" */ "../views/expert_paihang_xiaji/expert_paihang_xiaji.vue"
      )
  },
  {
    path: "/sao_yinongbao",
    component: () =>
      import(
        /* webpackChunkName: "sao_yinongbao" */ "../views/sao_yinongbao/sao_yinongbao.vue"
      )
  },
  {
    path: "/binchonghai_detail",
    component: () =>
      import(
        /* webpackChunkName: "binchonghai_detail" */ "../views/binchonghai_detail/binchonghai_detail.vue"
      )
  },
  {
    path: "/base_list",
    component: () =>
      import(
        /* webpackChunkName: "base_list" */ "../views/base_list/base_list.vue"
      )
  },
  {
    path: "/base_detail",
    component: () =>
      import(
        /* webpackChunkName: "base_detail" */ "../views/base_detail/base_detail.vue"
      )
  }
];

const router = new VueRouter({
  routes,
  mode: "hash",
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});
router.beforeEach((to, from, next) => {
  // ...
  if (to.meta.adminRoute) {
    // console.log('store :>> ', to);
    store.commit("setAdminRoute", to.path);
  }
  next();
});
export default router;
