import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { store } from './store'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
