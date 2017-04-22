import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
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
      },
      clear(state){
        state.products.forEach( food => {food.count = 0})
        state.products = []
      }
  }

})