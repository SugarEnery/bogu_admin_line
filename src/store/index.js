import modules from './modules'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

const store = new Vuex.Store({
    modules: modules,//模块
    plugins: [vuexLocal.plugin],//插件
    state: {
        // 存储token
        Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
      },
      mutations: {
        // 修改token，并将token存入localStorage
        changeLogin (state, user) {
          state.Authorization = user.Authorization;
          localStorage.setItem('Authorization', user.Authorization);
        }
      }
})
//刷新加载的方法
const refresh=function(){
    //页面刷新重新加载路由
    store.dispatch('add_Routes_Fresh');
}
console.log("页面刷新,刷入路由");
refresh();
export default store;
