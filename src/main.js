import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;
import router from './router.js';
import api from './utils/api.js';
import store from '@/store/store.js';
Vue.prototype.$api=api;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
