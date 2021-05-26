import Vue from 'vue';
import App from '@/App.vue';

import store from '@/store';

import router from '@/router';
import '@/router/guard';

import '@/directives/action';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
