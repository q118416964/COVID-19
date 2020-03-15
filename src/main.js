import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
Vue.config.productionTip = false

import ECharts from 'vue-echarts'

import 'echarts/map/js/china.js';
Vue.component('chart', ECharts)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
