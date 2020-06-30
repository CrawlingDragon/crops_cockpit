/* eslint-disable semi */
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: () =>
      import(/* webpackChunkName: "index" */ "../views/index/index.vue")
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
    path: "/sit_detail",
    name: "sit_detail",
    component: () =>
      import(
        /* webpackChunkName: "sit_detail" */ "../views/sit_detail/sit_detail.vue"
      )
  },
  {
    path: "/video",
    name: "video",
    component: () =>
      import(/* webpackChunkName: "video" */ "../views/video/video.vue")
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
  routes
});

export default router;
