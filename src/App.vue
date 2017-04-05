<template>
  <div id="app">
    <section class="app-inner"  :style="blurBcg" >
        <eleme-header :seller="seller">
        </eleme-header>
        <section class="eleme-bd" >
            <div class="eleme-nav">
                <div class="nav-item-wrap" v-tap="{methods:moveToGoods}">
                    <a>商品</a>
                </div>
                <div class="nav-item-wrap" v-tap="{methods:moveToComments}">
                    <a>评价</a>
                    <span class="hlight">({{seller.score}})</span>
                </div>
                <span class="line" ref="line"></span>
            </div>
            <section class="content-wrap" v-scroll="{method:scrollFn, opts:scrollOpts}">
                <section class="content"  ref="scrollWrap">
                    <eleme-goods :resInfo="resInfo" ref="goods"></eleme-goods>
                    <eleme-comments :resInfo="resInfo" ref="comments"></eleme-comments>
                </section>
            </section>
            
        </section>
    </section>
    <food :is-show-detail="isBlur"  @appblur="blur"></food>
    <shop-cart :resInfo="resInfo" :shop-cart="shopCart"></shop-cart>
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
import shopcart from "./components/shopcart/shopcart"
import BScroll from "better-scroll"
import food from "./components/food/food"
import Velocity from "velocity-animate"
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
            shopCart: {},
            scrollOpts: {
                scrollX: true,
                probeType: 3,
                momentum: false
            },
            scroll: {},
            screenX: 0
        }
    },
    created(){
        var _this = this
        axios.get('/static/data.json')
        .then((res) => {
            this.seller = res.data.seller
            this.resInfo = res.data
        }).catch( (err) => {
            console.log(err)
        } )
        this.screenX = window.screen.width*3
        
    },
    methods: {
        moveToComments(){
            Velocity(this.$refs.line, {
                translateX: this.screenX/2,
                scaleX: 2
            }, 200)
            console.log(this.scroll)
            this.scroll.scrollTo(-this.screenX, 0, 300)
        },
        moveToGoods(){
            Velocity(this.$refs.line, {
                translateX: 0,
                scaleX: 1
            }, 200)
            this.scroll.scrollTo(0, 0, 300)
        },
        scrollFn(scroll){
            this.scroll = scroll
            var screenX = this.screenX
            var oriX = 0
            var oriTime = 0
            var line = this.$refs.line
            var lineArea = screenX/2
            var lineEnd = 2
            var scrollArea = screenX
            var moveflag = false
            var endCount = 0
            scroll.on('scrollStart', (pos) => {
                moveflag = true
                oriX = this.$refs.scrollWrap.getBoundingClientRect().left
                oriTime = +new Date()
            })
            scroll.on('scroll', (pos) => {
                console.log(11111)
                line.style.transform = "translateX("+ Math.abs(pos.x)/2 +"px) scaleX("+ (Math.abs(pos.x)/screenX + 1) +")"    
            })
            scroll.on('scrollEnd', () => {
                endCount ++
                if(endCount === 2){
                    endCount = 0
                    return
                }
                var endX = this.$refs.scrollWrap.getBoundingClientRect().left
                var endTime = +new Date()
                var speed = Math.abs(endX - oriX)/(endTime - oriTime)
                if(speed > 2){
                    if(endX < oriX){
                        Velocity(line, {
                            translateX: lineArea,
                            scaleX: 2
                        }, 300)
                        scroll.scrollTo(-screenX, 0, 300)
                    }else {
                        Velocity(line, {
                            translateX: 0,
                            scaleX: 1
                        }, 300)
                        scroll.scrollTo(0, 0, 300)
                    }
                    return
                }else {
                    
                    if(-endX < screenX/2){
                        Velocity(line, {
                            translateX: 0,
                            scaleX: 1
                        }, 200)
                        scroll.scrollTo(0, 0, 300)
                    }else {
                        Velocity(line, {
                            translateX: lineArea,
                            scaleX: 2
                        }, 200)
                        scroll.scrollTo(-screenX, 0, 300)
                    }
                }
                
                moveflag = false
            })
        },
        blur(){
            this.isBlur = true
            this.isShowMask = true
        },
        closeMask(){
            this.isBlur = false
            this.isShowMask = false
        }
    },
    computed: {
        blurBcg(){
            var rs = ''
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
        "food": food,
        'shop-cart': shopcart
    }
}
</script>

<style lang="stylus">
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
        .line
            position: absolute
            left: 267px
            top: 95px
            width: 86px
            height: 6px
            background : #0096ff
            // transform: translateX(621px) scaleX(2)
            border-radius: 4px
     .eleme-bd
        position: absolute
        width: 100%
        top: 420px
        bottom: 0
        .content-wrap
            position: absolute
            width: 100%
            top: 121px
            bottom: 0
            .content
                position: absolute
                width: 200%
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
