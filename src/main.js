// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
import '../theme/index.css'
import VueLazyload from 'vue-lazyload'
import './assets/font/iconfont.css'
import './assets/css/reset.css'
import store from '@/vuex/store'
import cookieOperate from '@/assets/js/common'
// 挂载cookie相关操作方法
Vue.prototype.$cookie = cookieOperate

Vue.config.productionTip = false

Vue.use($)
Vue.use(ElementUI)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/static/images/grey.gif',
  loading: '/static/images/grey.gif',
  attempt: 1,
  // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend'] 
  // listenEvents: [ 'scroll' ]
})



/* eslint-disable no-new */
let Href;

if(!window.location.origin){

    Href =  window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');

}else{

    Href = window.location.origin;

}



if(Href == 'http://localhost:8083')
{
	store.state.paylink = 'http://dev.anchumall.cc:9546';
 	store.state.apilink = '/local.php';
}

else if(Href == 'http://dev.anchumall.cc:9550'){
	store.state.paylink = 'http://dev.anchumall.cc:9546';
	store.state.apilink = '/api.php';
}
else{
 	store.state.paylink = 'http://b2bapi.anchumall.cc'
  store.state.apilink = '/api.php';
}


new Vue({
  el: '#app',
  store:store,
  router,
  template: '<App/>',
  components: { App }
})