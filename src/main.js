import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/styles/global.css'
import './plugins/element.js'
import httpRequest from '@/utils/httpRequest'

Vue.config.productionTip = false

// 挂载全局
Vue.prototype.$http = httpRequest // ajax请求方法

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
