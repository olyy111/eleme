<template>
    <div class="goods">
        <div class="sidebar-wrapper" ref="sideWrapper">
            <ul class="sidebar" ref="sideBar">
                <li class="item" 
                    v-for="(item, index) in resInfo.goods"
                    :class="{active: activeIndex === index}"
                    @click="dest(index, $event)"
                >
                    <span class="item-text">
                        {{item.name}}
                    </span>
                    <!--<i class="item-count">
                        
                    </i>-->
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
            <div class="foods">
                <div class="category-foods" v-for="item in goods">
                    <div class="kind-top">
                        <h5 class="kind-title">{{item.name}}</h5> 
                        <!--<span class="kind-title-text">大家喜欢吃在叫真好吃</span>-->
                    </div>
                    <ul class="kind-list">
                        <li class="kind-list-item" 
                            v-for="(food, index) in item.foods"
                            @click="show"
                             ref="test"
                        >
                        
                            <div class="food-avatar-wrap">
                                <img :src="food.icon" class="img">
                            </div>
                            <div class="food-intro">
                                <h5 class="food-name">{{food.name}}</h5>
                                <p class="food-remark">{{food.description}}</p>
                                <p class="food-addition">
                                    月售{{food.sellCount}}份
                                    好评率{{food.rating}}
                                </p>
                                <div class="price">
                                    <strong class="price-new">
                                        <span class="hlight sign">￥</span>
                                        <span class="hlight num">{{food.price}}</span>
                                    </strong>
                                    
                                    <strong class="price-old" v-if="food.oldPrice">
                                        ￥{{food.price}}
                                    </strong>
                                </div>
                                
                            </div>
                            <div class="layout-click" @touchend="showFood($event, food)"></div>
                            <add-cart class="add-pos" :food="food"></add-cart>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <shop-cart :resInfo="resInfo" ref="shopCart"></shop-cart>  
        <transition name="maskFood">
            <div class="food-wrapper" v-show="isFoodShow" >
                <div class="mask"
                    
                ></div>
                <div class="food-profile" @click="notFoodShow($event)">
                    <!--<food></food>-->
                </div>
            </div>
        </transition> 
            
        </div> 
        
        
    </div>
</template>

<script>
    import add from "../add/add"
    import iscroll from "iscroll" 
    import BScroll from 'better-scroll'
    import axios from 'axios'
    import shopcart from '../shopcart/shopcart'
    import food from '../food/food'
    export default {
        props: {
            resInfo: Object
        },
        created() {
            this.$nextTick(() => {
                axios.get('static/data.json').then((res) => {
                    this.$nextTick(() => {
                        this._initScroll()
                        this.getSegTop()
                        this.computedSideBarSize()
                    })
                });
           })
        },
        data(){
            return {
                segTopArr: [],
                activeIndex: 0,
                foodScroll: {},
                sideScroll: {},
                isParMove: true,
                isFoodShow: false,
                sideEl: {
                    wrapperHeight: 0,
                    innerHeight: 0,
                    showHeight: 0,
                    min:0
                },
                sideNotMove: false //如果是点击sidebar的区块， 不会自动校正位置
            }
        },
        computed: {
            goods(){
                return this.resInfo.goods
            }
        },
        components: {
            "add-cart": add,
            "shop-cart": shopcart,
            "food": food
        },
        watch: {
            activeIndex() {
                if(this.sideNotMove){
                    return
                }
                //计算sidebar区块居中
                var currentSideEl = this.$refs.sideBar.querySelectorAll('.sidebar .item')[this.activeIndex],
                    currentSideElHeight = currentSideEl.offsetHeight,
                    destTop = (this.sideEl.showHeight-currentSideElHeight)/2,
                    h = 0,
                    move = 0
                for(var i=0;i<this.activeIndex; i++){
                    h += this.$refs.sideBar.querySelectorAll('.item')[i].offsetHeight
                }
                move = h - destTop
                if(move > 0 && move<this.min){
                    if(move + currentSideElHeight >this.min){
                        move = this.min                    }
                    if( move - currentSideElHeight < 0){
                        move = 0
                    }
                    this.sideScroll.scrollTo(0, -move, 800)
                }
            }
        },
        methods: {
            show(){
            },
            showFood(ev, food){
                this.isFoodShow = true
                this.$root.eventHub.$emit('foodEv', ev.target, food)
            },
            notFoodShow(ev){
                this.isFoodShow = false
            },
            computedSideBarSize(){
                this.sideEl.wrapperHeight = this.$refs.sideWrapper.clientHeight
                this.sideEl.innerHeight = this.$refs.sideBar.clientHeight
                this.sideEl.showHeight = this.sideEl.wrapperHeight - this.$refs.shopCart.$el.clientHeight
                this.min = this.sideEl.innerHeight - this.sideEl.wrapperHeight
            },
            _initScroll() {
                this.foodScroll = new BScroll(this.$refs.foodsWrapper, {
                    click: true,
                    probeType: 3,
                    bounce: false
                })
                this.sideScroll = new BScroll(this.$refs.sideWrapper, {
                    click: true,
                    probeType: 3
                })
                this.foodScroll.on('scroll', (pos) => {
                    var currentY = Math.abs(pos.y),
                        len = this.segTopArr.length,
                        arr = this.segTopArr
                    for(var i=0;i<len-1;i++){
                        if(currentY>=arr[i]&&currentY<arr[i+1]){
                            this.activeIndex = i
                        }  
                    }
                    if(currentY === arr[len-1]){
                        this.activeIndex = len-1
                    }
                })
                this.foodScroll.on('scrollStart', (pos) => {
                    this.sideNotMove = false
                })
            },
            getSegTop(){
                var foods = document.getElementsByClassName("category-foods"),
                    len = foods.length,
                    top = 0
                this.segTopArr.push(top)  
                for(var i=0;i<len;i++){
                    top += foods[i].clientHeight
                    this.segTopArr.push(top)            
                }
            },
            dest(index, ev){
                if(!ev._constructed){
                    return
                }
                this.sideNotMove = true
                var foods = document.getElementsByClassName("category-foods") 
                this.foodScroll.scrollToElement(foods[index], 300)
            }
        }
    }
</script>
<style lang="stylus">
    .goods
        height: 100%
        display: flex
        flex-direction: row
        .sidebar-wrapper
            width: 240px
            height: 100%
            overflow: hidden
            .sidebar
                padding-bottom: 144px
            .item
                position: relative
                display: flex
                border-left: 10px solid #f8f8f8
                padding: 60px 0 60px 32px
                background-color: #f8f8f8 
                border-bottom: 1px solid #eaeaea
                .item-text
                    font-size: 40px
                .item-count
                    position: absolute
                    right: 15px
                    top: 9px
                    width: 51px
                    height: 36px
                    font-size: 30px
                    line-height: 36px
                    color: #fff
                    text-align: center
                    border-radius: 18px
                    background-color: #ff461d
            .active
                border-left: 10px solid #3190e8
                background-color: #ffffff
        .foods-wrapper
            width: 1002px
            height: 100%
            overflow: hidden
    .kind-list-item
        display: flex
        flex-direction: row
        .img
            width: 100%
            height: 100%
    .kind-top
        display: flex
        flex-direction: row
        align-items: center
        justify-content: flex-start
        height: 78px
        border-left: 9px solid #eeeeee
        padding-left: 26px
        background-color: #f8f8f8
        .kind-title
            margin-right: 15px
            font-size: 40px
            font-weight: bold
            color: #666666
        .kind-title-text
            font-size: 34px
            color: #999999
    .kind-list-item
        position: relative
        padding: 42px 30px 0 42px
        .layout-click
            position: absolute
            left: 0
            top: 0
            width: 100%
            height: 100%
            opacity: 0
        .food-avatar-wrap
            width: 171px
            height: 171px
            background: red
            margin-right: 30px
    .food-intro
        flex-shrink: 1
        .food-name
            width: 545px
            margin-bottom: 17px
            font-size: 46px
            line-height: 46px
            color: #333333
            font-weight: bold
        .food-remark
            width: 700px
            line-height: 63px
            font-size: 32px
            color:#999999
        .food-addition
            line-height: 63px
            font-size: 32px
            color: #666666
        .price
            display: flex
            position: relative
            align-items: flex-end
            margin-top: 8px
            padding-bottom: 17px
            height: 70px
            box-sizing: border-box
            .price-new
                font-size: 0
                margin-right: 10px
                .sign
                    font-size: 28px
                    font-family: arial
                    line-height: 40px
                .num
                    font-size: 50px
                    font-family: arial
                    font-weight: bold
             .price-old
                color: #dddddd
                text-decoration: line-through
                font-size: 36px
                font-family: arial
                line-height: 52px
    .add-pos
        position: absolute
        right: 0
        bottom: 0
    .food-wrapper
        right: 0
        left: 0
        top: 0
        bottom: 0
        background: rgba(0, 0, 0, .5)
        transition: .3s
        &.maskFood-enter, &.maskFood-leave-active
            opacity: 0
        .mask
            position: absolute
            width: 100%
            height: 100%
            background: rgba(7,17,27,0.6)
            filter: blur(10px)
            transition: .5s linear
            
        .food-profile
            .food
                position: absolute
                left: 90px 
                right: 90px
                top: 405px
                bottom: 405px
                align-items: center
                justify-content: space-around
                background: #fff
                border-radius: 20px
            
            
</style>