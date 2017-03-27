// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
Vue.config.productionTip = false
Vue.use(Vuex)
var store = new Vuex.Store({
  state:{
    products: []
  },
  getters: {
    foodsNum(state){
      var num = 0
      state.products.forEach( food => {
        num += food.count
      })
      return num
    }
  },
  mutations: {
      add(state, food){
        
          var product = state.products.find( product => product === food)
          if(!product){
            product = food
            Vue.set(product, 'count', 1)
            state.products.push(product)
          }else {
            product.count ++
          }
      },
      reduce(state, food){
          var product = state.products.find( product => product === food)
          if(product){
              product.count --
              if(product.count === 0){
                  var index = state.products.findIndex( product => product === food)
                  state.products.splice(index, 1)
              }
          }
      }
  }

})

var eventHub = new Vue()
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  data: {
      eventHub: eventHub
  }
})
