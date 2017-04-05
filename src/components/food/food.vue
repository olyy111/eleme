<template>
    <transition name="cloud">
        <div class="food-wrapper" v-show="isShowDetail" v-scroll="{method: _scroll,opts:scrollOpts}" ref="foodWrapper">
            <div class="food-scroll">
                <transition name="foodShow"
                    @before-enter="before"
                    @enter="enter"
                    @after-enter="afterEnter"
                    @leave="leave"
                >
                    <div class="food" 
                        ref="food"
                        v-show="isShowDetail"
                        v-tap="{methods: showFood}"
                        
                    >   
                        <div class="avatar-wrap"　:style="bcg" ref="imgWrap">
                        </div>
                            <div class="profile-wrapper">
                                <div class="info" v-show="showInfo">
                                    <div class="title">{{food.name}}</div>
                                    <div class="desc">
                                        <span>{{food.sellCount}}</span>
                                        <span>{{food.rating}}%</span>
                                    </div>
                                    <div class="price">
                                        <span class="unit">{{food.price}}</span>
                                        <span class="oldPrice">{{food.oldPrice}}111111</span>
                                    </div>
                                    <div class="shopCart">
                                        <transition name="fade">
                                            <div class="text">加入购物车</div>
                                        </transition>
                                        <!--<add-cart class="add-cart"></add-cart>-->
                                        
                                    </div>
                                </div>
                            </div>
                    </div>
                </transition>
                <transition name="content">
                    <div class="content" v-if="isShowContent">
                        <div class="ratings-wrapper">
                            <div class="ratings-head">
                                    <h3 class="title">商品评价</h3>
                                    <span class="percent">好评率(97%)</span>
                                    <div class="rating-count" v-tap="{methods: showComments}">
                                        30条评价
                                        
                                        <i class="icon-keyboard_arrow_right"></i>
                                    </div>
                            </div>
                            <div class="rating-list-wrapper">
                                <ratings :ratings="food.ratings"></ratings>
                            </div>
                        </div>
                    </div>
                </transition>
                
            </div>
            <transition name="comments-slide">
                <div class="comments-wrapper" v-show="isShowComments">
                    <category-head @close-comments="closeComments"></category-head>
                    <category-comments :category-desc="categoryDesc"></category-comments>
                    <ratings :ratings="food.ratings" class="border"></ratings>
                </div>
            </transition>
            
        </div>
    </transition>
</template>
<script>
    import addCart from '../add/add'
    import Velocity from 'velocity-animate'
    import {mapState} from 'vuex'
    import ratings from '../ratings/ratings'
    import BScroll from "better-scroll"
    import categoryhead from "../categoryhead/categoryhead"
    import categorycomments from "../categorycomments/categorycomments"

    export default {
        props:{
            isShowDetail: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                food: {},
                showInfo: false,
                isShowContent: false,
                isShowMask: false,
                limitFlag: false,
                clickedEl: {
                    width: 0,
                    height: 0,
                    left: 0,
                    top: 0
                },
                targetEl: {
                    width: 0,
                    height: 0,
                    left: 0,
                    top: 0
                },
                screenWidth: 0,
                scroll: {},
                scrollOpts: {
                    probeType: 2,
                    bounce: false
                },
                isShowComments: false,
                categoryDesc: {
                    type0: "满意",
                    type1: "不满意"
                },
                
            }
            
        },
        created() {
            //点击goods某一个食物， 获取图片的屏幕位置
            this.$root.eventHub.$on('foodEv', (el, food) => {
                var el = el.parentNode.querySelector(".img"),
                    rect = el.getBoundingClientRect()
                this.clickedEl.width = rect.width
                this.clickedEl.height = rect.height
                this.clickedEl.top = rect.top
                this.clickedEl.left = rect.left
                this.$emit('appblur')
                this.isShowMask = true
                this.food = food
            })
        },
        methods: {
            showComments(){
                this.isShowComments = true
            },
            closeComments(){
                this.isShowComments = false
            },
            _scroll(scroll){
                this.scroll = scroll
                //切出动画
                this.scroll.on('scroll', (pos) => {
                    if(pos.y===0){

                        //防止在分界点重复动画
                        if(!this.isShowContent){
                            return
                        }
                        this.isShowContent = false
                         Velocity(this.$refs.food, {
                            width: this.targetEl.width,
                            height: this.targetEl.height,
                            top: this.targetEl.top,
                            left: this.targetEl.left

                        }, {
                            duration: 300,
                            complete: () => {
                                this.limitFlag = false
                            }
                        })
                        this.$emit('appblur')
                    }
                })
            },
            showFood(){
                if(this.limitFlag){
                    return
                }
                this.isShowMask = false
                this.isShowContent = true
                var el = this.$refs.food
                var foodDetailH = window.innerWidth
                Velocity(el, {
                    width: foodDetailH,
                    height: foodDetailH,
                    left: 0,
                    top: 0
                },{
                    duration: 300,
                    complete: () => {
                        this.limitFlag = true
                    }
                })
            },
            before(el){
                //获取目标盒模型信息
                var tarEl = this.$refs.food
                el.style.display = "block"
                var rc = tarEl.getBoundingClientRect()  
                this.targetEl.left = rc.left
                this.targetEl.top= rc.top
                this.targetEl.width= rc.width
                this.targetEl.height= rc.height
                //设定初始位置
                el.style.width = this.clickedEl.width + "px"
                el.style.height = this.clickedEl.height + "px"
                el.style.top = this.clickedEl.top + "px"
                el.style.left = this.clickedEl.left + "px"
                this.showInfo = false
                
            },
            enter(el, done){
                Velocity(el, {
                    width: this.targetEl.width,
                    height: this.targetEl.height,
                    top: this.targetEl.top,
                    left: this.targetEl.left

                }, {
                    duration: 300,
                    complete: done
                })
            },
            afterEnter(){
                this.showInfo = true
                var img = new Image()
                img.onload = () => {
                    this.$refs.imgWrap.style["background-image"] = "url("+ img.src +")"
                } 
                img.src = this.food.image
            },
            leave(el, done){
                Velocity(el, {opacity:0}, {
                    duration: 300,
                    complete: function(){
                        el.style.opacity = "1"
                        done()
                    }
                })
            }
        },
        computed:{
            ...mapState(['products']),
            bcg(){
                return {
                    "background-image": "url("+ this.food.icon +")"
                }
            }
        },
        components: {
            'add-cart': addCart,
            'ratings': ratings,
            "category-head": categoryhead,
            'category-comments': categorycomments
        }
    }
</script>
<style lang="stylus" scoped>
    .food-wrapper
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        transition: .3s linear
        &.cloud-leave-active
            opacity: 0
        .food-scroll
            position: relative
            z-index: 100
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
        .content
            width: 100%
            padding-top: 100%
            padding-bottom: 144px
            transition: .3s
            background: #f5f5f5
            &.content-enter, &.content-leave-active
                transform: translate3d(0, 100px, 0)
            &.content-leave-active
                opacity: 0
            .ratings-wrapper
                margin-top: 390px
                padding-left: 60px
                background: #fff
                .ratings-head
                    height: 130px
                    padding-right: 60px
                    line-height: 130px
                    color: #000
                    .title
                        float: left
                        font-size: 46px
                        margin-right: 4px
                    .percent
                        float: left
                        line-height: 136px
                        font-size: 38px
                    .rating-count
                        float: right
                        font-size: 40px
                        color: #9e9e9e
                        .icon-keyboard_arrow_right
                            font-size: 60px
                            vertical-align: -12px
                

    .food
        position: absolute
        z-index: 100
        left: 90px
        top: 400px
        right:90px
        bottom: 400px
        border-radius: 18px
        &.foodShow-leave-active
            opacity: 0
        .avatar-wrap
            position: relative
            width: 100%
            height: 0
            padding-top: 100%
            background-size: cover
            background-position: center center
        .profile-wrapper
            height 360px
            background #fff
            .info
                position relative
                box-sizing border-box
                width 100%
                padding 40px 60px
                background #fff
                .title
                    font-size 46px
                    font-weight 700
                    color rgb(7,17,27)
                    line-height 46px
                .desc
                    display flex
                    padding 0
                    padding-top 30px
                    font-size 38px
                    color rgb(147,153,159)
                    line-height 38px
                    span:last-child
                        padding-left 12px
                .price
                    display flex
                    padding-top 90px
                    font-size 14px
                    font-weight 700
                    color rgb(240,20,20)
                    line-height 24px
                    .unit
                        font-size 50px
                        font-weight normal
                    .oldPrice
                        padding-left 12px
                        font-size 38px
                        font-weight normal
                        color rgb(147,153,159)
                .shopCart
                    position absolute
                    right 30px
                    bottom 30px
                    height 66px
                    text-align center
                    z-index 2
                    .text

                        box-sizing border-box
                        height 100%
                        line-height 66px
                        color white
                        font-size 38px
                        padding 0 32px
                        border-radius 30px
                        background rgb(0,160,220)
                        &.fade-enter-active,&.fade-leave-active{
                        transition opacity .2s
                        }
                        &.fade-enter,&.fade-leave-active{
                        opacity 0
                        }
                    .add-cart
                        position absolute
                        top 0
                        left 0
    
    .comments-wrapper
        position: fixed
        z-index: 110
        left: 0
        top: 0
        right: 0
        bottom: 0
        background: #f5f5f5
        transition: .3s linear
        &.comments-slide-enter, &.comments-slide-leave-active
            transform: translate3d(100%, 0, 0)

</style>