// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import BScroll from 'better-scroll'
import vueTap from 'v-tap';
Vue.config.productionTip = false
Vue.use(vueTap);
Vue.use(Vuex)
var store = new Vuex.Store({
  state:{
    products: [],
    allProducts: []
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
      getAllProducts(state, products){
          state.allProcuts
      },
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

//滚动条指令
Vue.directive('scroll', {
    inserted(el, binding, vnode){
      var method = null, 
          opts = null
      
      if(binding.value&&({}.toString.call(binding.value.opts) === "[object Object]")){
          opts = binding.value.opts
      }

      el.addEventListener('touchmove', function (ev){
        ev.preventDefault()
      })

      el.scroll = new BScroll(el, opts)
      if(binding.value&&({}.toString.call(binding.value.method) === "[object Function]")){
          method = binding.value.method
          method.call(vnode.context, el.scroll)
          
      }
    },
    update(el){
      setTimeout(() => {
          el.scroll.refresh()
      },0)
    },
    unbind(el){
      el.scroll.destroy()
      el.scroll = null
    }
})



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
