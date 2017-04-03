<template>
  <div id="app">
    <section class="app-inner"  :style="blurBcg">
        <eleme-header :seller="seller">
        </eleme-header>
        <section class="eleme-bd" >
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
            
        </section>
    </section>
    
    <!--<elem-counter>
        <discount></discount>
        <shop-cart></shop-cart>
    </elem-counter>-->
    <food :is-show-detail="isBlur"  @appblur="blur"></food>
    <transition name="mask" >
        <div class="mask" 
            v-show="isShowMask"
            v-tap="{methods: closeMask}"
        ></div>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import header from "./components/header/header"
import goods from "./components/goods/goods"
import comments from "./components/comments/comments"
import BScroll from "better-scroll"
import food from "./components/food/food"

var eventHub = new Vue();
export default {
  name: 'app',
  data(){
      return {
        //数据异步获取时候子组件已经渲染完毕，数据更新后视图在更新
        //如果值是null 在子组件用的时候就会报错
          seller: {},
          resInfo: {},
          eventHub: eventHub,
          isBlur: false,
          isShowMask: false,

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
  methods: {
      blur(){
          this.isBlur = true
          this.isShowMask = true
      },
      closeMask(){
          this.isBlur = false
          this.isShowMask = false
          console.log(this.isBlur)
      }
  },
  computed: {
      blurBcg(){
          var rs = ''
          console.log(this.isBlur)
          if(this.isBlur){
              rs="blur(100px)"
          }else {
              rs="none"
          }
          return {
              filter: rs
          }
      }
  },
  components: {
    "eleme-header": header,
    "eleme-goods": goods,
    "eleme-comments": comments,
    "food": food
  }
}
</script>

<style lang="stylus" scoped>
    //根组件中加入依赖树
    @import 'common/stylus/index'
    body, html
        position: relative
        height: 100%
        overflow: hidden
        font-family: Helvetica 
    #app
        width: 100%
        height: 100%
        .app-inner
            width: 100%
            height: 100%
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
     .eleme-bd
        position: absolute
        width: 100%
        top: 420px
        bottom: 0
        .content-wrap
            position: absolute
            top: 121px
            bottom: 0
            .content
                height: 100%
     .mask
            position: absolute
            left: 0
            top: 0
            width: 100%
            height: 100%
            background: rgba(7,17,27,0.5)
            filter: blur(10px)
            transition: .3s linear
            &.mask-enter, &.mask-leave-active
                opacity: 0
</style>
