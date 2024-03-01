import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {regionData} from "element-china-area-data/dist/app";
import echarts from 'echarts'
import 'echarts/map/js/china.js';
import VueCookies from 'vue-cookies'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.use(ElementUI)
Vue.use(VueCookies)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
