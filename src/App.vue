<template>
  <div id="app">
    <eleme-header :seller="seller">
      
    </eleme-header>
    <!--<nav>
      
    </nav>
    <foods-info></foods-info>
    <elem-counter>
        <discount></discount>
        <shop-cart></shop-cart>
    </elem-counter>-->
  </div>
</template>

<script>
import axios from 'axios'
import header from "./components/header/header"
export default {
  name: 'app',
  data(){
      return {
        //数据还没来的时候子组件就渲染进去了，来了数据又更新视图
        //如果值是null 在子组件用的时候就会报错
          seller: {}
      }
  },
  created(){
      var _this = this
      axios.get('/static/data.json')
      .then(function (res){
          _this.seller = res.data.seller
      })
  },
  components: {
    "eleme-header": header
  }
}
</script>

<style lang="stylus">
    
    
    
    
</style>
