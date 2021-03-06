import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/login',
      component: resolve => require(['@/components/login.vue'], resolve),
      meta: {
        title: '登陆'
      }
    },
    {
      path: '/select',
      component: resolve => require(['@/components/select.vue'], resolve),
      meta: {
        title: '微信平台'
      }
    },
    {
      path: '/bottom',
      component: resolve => require(['../components/flex/bottom.vue'], resolve)
    },
    {
      path: '/404',
      component: resolve => require(['../components/common/404.vue'], resolve)
    },
    {
      path: '/403',
      component: resolve => require(['../components/common/403.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/index'//404
    }
  ],
  // mode: 'history'//history
});

/**
 * 请求拦截器,添加请求头token
 */
axios.interceptors.request.use(
  config => {
    // console.log('>>>请求url:', config.url);
    var headers = config.headers;
    // console.log('headers',headers)
    // console.log(sessionStorage.getItem("token"))
    if (sessionStorage.getItem("token")) {
        headers.userToken = sessionStorage.getItem("token")
        headers.uid = sessionStorage.getItem("uid")
    }else{
      console.log("失效！");

    }
    return config;
  },
  error => {
    console.log('>>>请求异常:', error.message);
    return Promise.reject(error);
  });
//接口请求超时设置
axios.defaults.timeout = 5000;//毫秒
/**
 * 应答拦截器,添加请求头token
 */
axios.interceptors.response.use(function (response) {
  // Do something with response data
  // console.log('<<<请求成功');
  // console.log(response);
  if(response.data.code == '-1'){
    console.log('<<<请求失败');
    return response;
  }else{
    console.log('<<<请求成功');
    return response;
  }

}, error => {
  // Do something with response error
  console.log('<<<异常信息:', error.message);
  return Promise.reject(error);
});

router.beforeEach((to, from, next) => {
  console.log('跳转到:', to.fullPath);
  if (to.path == '/login') {
    next();
  }
  else {
    var uid = sessionStorage.getItem('uid');
    // console.log(uid,'uid')
    //如果没登录,都导向登录页
    if (uid === null || uid === '') {
      if (to.path !== '/login') {
        next({ path: '/login' })
      }
      else {
        next();
      }
    }
    else {
      next();
    }
  }

})
//全局路由守卫
// router.beforeEach((to, from, next) => {
//   //debugger
//   console.log('跳转到:', to.fullPath);
//   if (to.path == '/tree') {
//     next();
//   }
//   else {
//     var token = sessionStorage.getItem('token');
//     //如果没登录,都导向登录页
//     if (!token) {
//       if (to.path !== '/login') {
//         next({ path: '/login' })
//       }
//       else {
//         next();
//       }
//     }
//     else {
//       next();
//     }
//   }

// })

export default router
