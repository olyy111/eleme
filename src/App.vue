<template>
  <div id="app">
    <eleme-header :seller="seller">
      
    </eleme-header>
    <nav class="eleme-nav">
        <div class="nav-item-wrap">
            <router-link to="/goods">商品</router-link>
        </div>
        <div class="nav-item-wrap">
            <router-link to="/comments">
                评价
                <span class="hlight">({{seller.score}})</span>
            </router-link>
        </div>
        
    </nav>
    <section class="content-wrap">
        <section class="content">
            <eleme-goods :resInfo="resInfo"></eleme-goods>
            <eleme-comments :seller="seller"></eleme-comments>
        </section>
    </section>
    <!--<elem-counter>
        <discount></discount>
        <shop-cart></shop-cart>
    </elem-counter>-->
  </div>
</template>

<script>
import axios from 'axios'
import header from "./components/header/header"
import goods from "./components/goods/goods"
import comments from "./components/comments/comments"
export default {
  name: 'app',
  data(){
      return {
        //数据还没来的时候子组件就渲染进去了，来了数据又更新视图
        //如果值是null 在子组件用的时候就会报错
          seller: {},
          resInfo: {}
      }
  },
  created(){
      var _this = this
      axios.get('/static/data.json')
      .then(function (res){
          _this.seller = res.data.seller
          _this.resInfo = res.data
      })
  },
  components: {
    "eleme-header": header,
    "eleme-goods": goods,
    "eleme-comments": comments
  }
}
</script>

<style lang="stylus">
    //根组件中加入依赖树
    @import 'common/stylus/index'
    .eleme-nav 
        display: flex;
        flex-direction: row
        border-bottom: 1px solid #eeeeee
        .nav-item-wrap
            display: block
            width:50%
            height:120px
            text-align: center
            font-size: 42px
            line-height: 120px
            a
                display: inline-block
                color: #333333
            
    
    
</style>
