// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
Vue.config.productionTip = false
// Vue.use(Vuex)
// var store = new Vuex.Store({
//   state:{
//     Allproducts: {},
//     products: [1]
//   },
//   getters: {
//   },
//   mutations: {
//       add(state, food){
//           var product = state.products.find( product => product.name === food.name)
//           if(!product){
//             product = food
//             product.count = 1
//             state.products.push(product)
//           }else {
//             product.count ++
//           }
//       },
//       reduce(state, food){
//           var product = state.products.find( product => product.name === food.name)
//           if(product){
//               product.count --
//               if(product.count === 0){
//                   var index = state.products.findIndex( product => product.name === food.name)
//                   state.products.splice(index, 1)
//               }
//           }
//       }
//   }

// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
