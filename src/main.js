// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import vueTap from 'v-tap';
import vscroll from 'v-scroll'
import store from './store/index.js'
import Velocity from "velocity-animate"
Vue.config.productionTip = false

Vue.use(vueTap);
Vue.use(vscroll)

var eventHub = new Vue()

new Vue({
  router,
  store,
  template: '<App/>',
  components: { App },
  data: {
      eventHub: eventHub
  }
}).$mount('#app')
