import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import './helpers/VueUse';

Vue.config.productionTip = false;

Vue.prototype.$vueEventBus = new Vue();

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app');
