<template>
    <transition name="cloud">
        <div class="food-wrapper" v-show="isShowDetail" v-scroll="{method: _scroll,opts:scrollOpts}" ref="foodWrapper">
            <div class="food-scroll" ref="wrapper">
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
                        <div class="profile-wrapper" ref="profile">
                            <div class="info" v-show="showInfo">
                                <div class="title">{{food.name}}</div>
                                <div class="desc">
                                    <span>月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="unit">￥{{food.price}}</span>
                                    <span class="oldPrice">{{food.oldPrice}}</span>
                                </div>
                                <div class="shopCart">
                                    <transition name="fade">
                                        <div class="text" 
                                            v-show="!foodNum" 
                                            v-tap="{methods: _add}">
                                            加入购物车
                                        </div>
                                    </transition>
                                    <div class="add-cart-wrapper" v-show="foodNum">
                                        <add-cart :food="food" ref="cart"></add-cart>
                                    </div>
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
            <transition name="cart">
                <div class="cart-wrapper" v-show="isShowCart">
                    <shop-cart :resInfo="resInfo"></shop-cart>
                </div>
            </transition>
            <transition name="comments-slide">
                <div class="comments-wrapper" v-show="isShowComments">
                    <category-head @close="closeComments"></category-head>
                    <category-comments :category-desc="categoryDesc"></category-comments>
                    <ratings :ratings="food.ratings" class="border"></ratings>
                </div>
            </transition>
            <transition name=""></transition>
            <div class="returnToHomeWrapper" 
                v-show="isShowBtn"
                v-tap="{methods: returnToHome}">
                <div class="returnToHome">
                    <i class="icon icon-arrow_lift"></i>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    import addCart from '../add/add'
    import ratings from '../ratings/ratings'
    import categoryhead from "../categoryhead/categoryhead"
    import categorycomments from "../categorycomments/categorycomments"
    import shopcart from '../shopcart/shopcart'
    import Velocity from 'velocity-animate'
    import {mapState} from 'vuex'
    export default {
        props:{
            isShowDetail: {
                type: Boolean,
                default: false
            },
            resInfo: {
                type: Object,
                default(){
                    return {}
                }
            }
        },
        data(){
            return {
                food: {},
                showInfo: false,
                isShowContent: false,
                isShowMask: false,
                limitFlag: false,
                isShowCart: false,
                isShowBtn: false,
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
                profileHeight: 0
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
            
            //在dom渲染之后，重新指向_add方法为 `add-cart`组件的add方法
            //作为`添加购物车`按钮的点击处理函数, 使得自定义指令获取事件对象
            this.$nextTick( () => {
                this._add = this.$refs.cart.add
            })
        },
        methods: {
            returnToHome(){
                var el = this.$refs.food
                this.isShowCart= false
                this.isShowContent = false
                this.isShowBtn = false
                this.limitFlag = false
                el.style.width = this.targetEl.width + "px",
                el.style.height = this.targetEl.height + "px",
                el.style.top = this.targetEl.top + "px",
                el.style.left = this.targetEl.left + "px"
                this.$emit('food-hidden')
            },
            _add(){
                //声明一个空函数，在dom渲染完毕后会替换
            },
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
                        this.isShowCart= false
                        this.isShowContent = false
                        this.isShowBtn = false
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
                this.isShowBtn = true
                var el = this.$refs.food
                var foodDetailH = window.innerWidth
                Velocity(el, {
                    width: foodDetailH,
                    height: foodDetailH+this.profileHeight,
                    left: 0,
                    top: 0
                },{
                    duration: 300,
                    complete: () => {
                        this.limitFlag = true
                        this.isShowCart = true
                    }
                })
            },
            before(el){
                //获取目标盒模型信息
                el.style.display = "block"
                var rc = el.getBoundingClientRect()
                
                this.targetEl.left = rc.left
                this.targetEl.top= rc.top
                this.targetEl.width= rc.width
                this.targetEl.height= rc.height
                this.profileHeight = this.$refs.profile.clientHeight
                //设定初始位置
                el.style.position = "absolute"
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
                //先用小图显示， 等待大图缓存完在替换， 防止卡顿
                this.showInfo = true
                var img = new Image()
                img.src = this.food.image
                img.onload = () => {
                    this.$refs.imgWrap.style["background-image"] = "url("+ img.src +")"
                }  

                //在获得位置后，改弹性盒模型属性为`block`
                this.$refs.wrapper.style.display = "block"

                //此时取消要滚动元素的高度限制，使其被内容滚动，才能滚动
                this.$refs.wrapper.style.height = "auto"
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
            foodNum(){
                var num = 0,
                    products = this.$store.state.products
                products.forEach( food => {
                    if(food === this.food){
                        num = food.count
                    }
                })
                return num
            },
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
            'category-comments': categorycomments,
            "shop-cart":shopcart
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
            display: flex
            justify-content: center
            align-items: center
            z-index: 100
            width: 100%
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
        .content
            width: 100%
            padding-top: 100%
            padding-bottom: (144rem/20)
            transition: .3s
            background: #f5f5f5
            &.content-enter, &.content-leave-active
                transform: translate3d(0, (100rem/20), 0)
            &.content-leave-active
                opacity: 0
            .ratings-wrapper
                margin-top: (390rem/20)
                padding-left: (60rem/20)
                background: #fff
                .ratings-head
                    height: (130rem/20)
                    padding-right: (60rem/20)
                    line-height: (130rem/20)
                    color: #000
                    .title
                        float: left
                        font-size: (46rem/20)
                        margin-right: (4rem/20)
                    .percent
                        float: left
                        line-height: (136rem/20)
                        font-size: (38rem/20)
                    .rating-count
                        float: right
                        font-size: (40rem/20)
                        color: #9e9e9e
                        .icon-keyboard_arrow_right
                            font-size: (60rem/20)
                            vertical-align: -(12rem/20)
    .food
        z-index: 100
        width: (1060rem/20)
        height: (1390rem/20)
        border-radius: (18rem/20)
        overflow: hidden
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
            height: (360rem/20)
            background: #fff
            .info
                position: relative
                box-sizing: border-box
                width: 100%
                height: 100%
                padding: (40rem/20) (60rem/20)
                background: #fff
                box-sizing: border-box
                .title
                    font-size: (46rem/20)
                    font-weight: 700
                    color: rgb(7,17,27)
                    line-height: (46rem/20)
                .desc
                    display: flex
                    padding: 0
                    padding-top: (30rem/20)
                    font-size: (38rem/20)
                    color: rgb(147,153,159)
                    line-height: (38rem/20)
                    span:last-child
                        padding-left (12rem/20)
                .price
                    display: flex
                    padding-top: (90rem/20)
                    font-size: (14rem/20)
                    font-weight: 700
                    color: rgb(240,20,20)
                    line-height: (24rem/20)
                    .unit
                        font-size: (50rem/20)
                        font-weight: normal
                    .oldPrice
                        padding-left: (12rem/20)
                        font-size: (38rem/20)
                        font-weight: normal
                        text-decoration: line-through
                        color: rgb(147,153,159)
                .shopCart
                    position: absolute
                    right: (30rem/20)
                    bottom: (70rem/20)
                    height: (66rem/20)
                    text-align: center
                    z-index: 2
                    .text
                        box-sizing: border-box
                        height: 100%
                        line-height: (66rem/20)
                        color: white
                        font-size: (38rem/20)
                        padding: 0 (32rem/20)
                        border-radius: (30rem/20)
                        background: rgb(0,160,220)
                        transition: .3s linear
                        &.fade-enter, &.fade-leave-active
                            opacity: 0
                    .add-cart-wrapper
                        position: absolute
                        top: -(27rem/20)
                        right: -(22rem/20)
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
    .cart-wrapper
        position: relative
        z-index: 120
        .cart-enter, .cart-leave-active
            transition: .5s linear
            transform: translate3d(0, 100%, 0)
    .returnToHomeWrapper
        position: absolute
        z-index: 120
        left: 0
        top: 0
        padding: 30px
        .returnToHome
            width: 85px
            height: 85px
            text-align: center
            border-radius: 50%
            background: rgba(0, 0, 0, .5)
            .icon
                display: inline-block
                margin-left: -9px
                line-height: 85px
                font-size: 48px
                color: #fff
</style>