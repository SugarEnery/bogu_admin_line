
/**
 * 这里配置开发环境写死的路由和菜单，方便开发
 */

//静态路由
const name = localStorage.getItem("name");
var routeDevList = [
    // {
    //     path: '/routedev',
    //     component: resolve => require(['../components/test/RouteDev'], resolve),
    //     meta: {
    //         title: '静态菜单路由'
    //     }
    // },
    {
      name: 'index',
      path: '/index',
      component: resolve => require(['@/components/index.vue'], resolve),
      meta: {
        title: '系统首页'
      }
    },
    {
      name: 'clients_list',
      path: '/clients_list',
      component: resolve => require(['@/components/clients/clients_list.vue'], resolve),
      meta: {
        title: '客户列表'
      }
    },
    {
      name: 'auction_add',
      path: '/auction_add',
      component: resolve => require(['@/components/auction/auction_add.vue'], resolve),
      meta: {
        title: '拍卖添加'
      }
    },
    {
      name: 'auction_list',
      path: '/auction_list',
      component: resolve => require(['@/components/auction/auction_list.vue'], resolve),
      meta: {
        title: '拍卖列表'
      }
    },
    {
      name: 'auction_edit',
      path: '/auction_edit',
      component: resolve => require(['@/components/auction/auction_edit.vue'], resolve),
      meta: {
        title: '拍卖修改'
      }
    },
    {
      name: 'order_list',
      path: '/order_list',
      component: resolve => require(['@/components/auction/order_list.vue'], resolve),
      meta: {
        title: '拍卖订单列表'
      }
    },
    {
      name: 'platformidentifi_list',
      path: '/platformidentifi_list',
      component: resolve => require(['@/components/identifi/platformidentifi_list.vue'], resolve),
      meta: {
        title: '平台鉴定列表'
      }
    },
    {
      name: 'expertsidentifi_list',
      path: '/expertsidentifi_list',
      component: resolve => require(['@/components/identifi/expertsidentifi_list.vue'], resolve),
      meta: {
        title: '专家鉴定列表'
      }
    },
    {
      name: 'platformidentifi_detail',
      path: '/platformidentifi_detail',
      component: resolve => require(['@/components/identifi/platformidentifi_detail.vue'], resolve),
      meta: {
        title: '平台鉴定'
      }
    },
    {
      name: 'expertidentifi_detail',
      path: '/expertidentifi_detail',
      component: resolve => require(['@/components/identifi/expertidentifi_detail.vue'], resolve),
      meta: {
        title: '专家鉴定'
      }
    },
    {
      name: 'advert_add',
      path: '/advert_add',
      component: resolve => require(['@/components/advert/advert_add.vue'], resolve),
      meta: {
        title: '广告添加'
      }
    },
    {
      name: 'advert_list',
      path: '/advert_list',
      component: resolve => require(['@/components/advert/advert_list.vue'], resolve),
      meta: {
        title: '广告列表'
      }
    },
    {
      name: 'advert_edit',
      path: '/advert_edit',
      component: resolve => require(['@/components/advert/advert_edit.vue'], resolve),
      meta: {
        title: '广告修改'
      }
    },
    {
      name: 'infor_add',
      path: '/infor_add',
      component: resolve => require(['@/components/infor/infor_add.vue'], resolve),
      meta: {
        title: '资讯添加'
      }
    },
    {
      name: 'infor_list',
      path: '/infor_list',
      component: resolve => require(['@/components/infor/infor_list.vue'], resolve),
      meta: {
        title: '资讯列表'
      }
    },
    {
      name: 'infor_edit',
      path: '/infor_edit',
      component: resolve => require(['@/components/infor/infor_edit.vue'], resolve),
      meta: {
        title: '资讯修改'
      }
    },
    {
      name: 'experts_add',
      path: '/experts_add',
      component: resolve => require(['@/components/experts/experts_add.vue'], resolve),
      meta: {
        title: '专家添加'
      }
    },
    {
      name: 'experts_list',
      path: '/experts_list',
      component: resolve => require(['@/components/experts/experts_list.vue'], resolve),
      meta: {
        title: '专家列表'
      }
    },
    {
      name: 'experts_edit',
      path: '/experts_edit',
      component: resolve => require(['@/components/experts/experts_edit.vue'], resolve),
      meta: {
        title: '专家修改'
      }
    },
];
//静态菜单
var menuDevList = [
    {
        icon: 'el-icon-date',
        index: Math.random()+'',
        title: '静态菜单Demo',
        subs: [
            {
                index: 'routedev',
                title: '静态菜单和路由'
            },
        ]
    }
]


var routeDev = {
    ROUTE_DEV: true,//是否写入静态路由（开关）
    routeDevList: routeDevList,
    MENU_DEV: true,//是否写入静态菜单（开关）
    menuDevList: menuDevList,
}
export default routeDev;
