import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import store from './store/store.js'
import "bootstrap/dist/css/bootstrap.min.css";


Vue.config.productionTip = false
console.log(store)
Vue.use(BootstrapVue)
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
