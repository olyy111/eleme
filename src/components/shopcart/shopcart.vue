<template lang="html">
    <div class="shop-cart-wrapper">
      <div class="shopCart">
        <div class="cart-content">
          <div class="content-left"  @touchstart="toggleList">
            <div class="logo-wrapper">
              <div class="badge" v-if="totalPrice !== 0">
                {{foodsNum}}
              </div>
              <div class="logo" :class="{active: totalPrice>0}">
                <i class="icon-shopping_cart"></i>
              </div>
            </div>
            <div class="cart-empty" v-if="totalPrice === 0">
              购物车为空
            </div>
            <div class="price-info" v-else>
              <div class="price"  >
                ￥{{totalPrice}}
              </div>
              <div class="desc">
                另需配送费{{this.resInfo.seller.deliveryPrice}}元
              </div>
            </div>
          </div>
          <div class="content-right" 
            :class="{enough:totalPrice>(resInfo.seller&&resInfo.seller.minPrice)}"
          >
            {{shipfeeTips}}           
          </div>
        </div>
        <div class="ball-container">
        
            <transition name="drop" v-for="ball in balls" 
              @before-enter="beforeEnter"
              @enter="enter"
              @after-enter="afterEnter"
            >
              <div class="ball" v-show="ball.show">
                <div class="inner inner-hook"></div>
              </div>
            </transition>
          
        </div>
        <transition name="fold">
          <div class="shopcart-list" v-show="isFold">
            <div class="list-header">
              <h1 class="title">购物车</h1>
              <span class="empty" v-tap="{methods: clear}">清空</span>
            </div>
            <div class="list-content" ref="shopCartList" v-scroll>
                <transition-group
                  name="cartList"
                  @before-leave="beforeLeave"
                  @leave="leave"
                  @after-leave="afterLeave"
                  tag="ul"
                >
                  <li class="food" v-for="food in selectedFoods" :key="food">
                    <span class="name">{{food.name}}</span>
                    <div class="cartcontrol-wrapper">
                      <add-cart :food="food"></add-cart>
                    </div>
                    <div class="price">
                      <span class="hlight">￥</span>
                      <span>{{food.price}}</span>
                    </div>
                  </li>
                </transition-group>
            </div>
          </div>
        </transition>
      </div>
      <transition name="backdrop">
        <div class="backdrop" v-show="isFold" @touchstart="toggleBackdrop"></div>
      </transition>
      
    
    </div>
  
</template>

<script>
  import { mapState } from 'vuex'
  import { mapGetters } from 'vuex'
  import {mapMutations} from 'vuex'
  import addcart from '../add/add'
  import BScroll from 'better-scroll'
  import Velocity from 'velocity-animate'
  export default {
    props: {
      resInfo: {
        type:Object,
        default(){
          return {}
        }
      }
    },
    data(){
        return {
          balls: [
            {
              show: false
            },
            {
              show: false
            },
            {
              show: false
            },
            {
              show: false
            },
            {
              show: false
            },
          ],
          dropBalls: [],
          isFold: false
        }
    },
    created(){
      this.$root.eventHub.$on('cart.add', (ev) => {
        this.drop(ev.target)
      })
    },
    methods: {
      beforeLeave(el){
        el.style['box-shadow'] = 'inset 0px 1px 42px #333'
      },
      leave(el, done){
        Velocity(el, 
        { height: 0 }, 
        { 
          duration: 300,
          complete: done
        }
        )
      },
      afterLeave(el){
        if(this.selectedFoods.length === 0){
          this.isFold = false
        }
      },
      clear(){
        this.isFold = false
        this.$nextTick( () => {
            this.$store.commit('clear')
        })
      },
      toggleList(){
        if(!this.totalPrice){
          return
        }
        this.isFold = !this.isFold
      },
      toggleBackdrop(){
        this.isFold = !this.isFold
      },
      drop(el){
         var balls = document.getElementsByClassName("ball");
         for(var i = 0, l = this.balls.length; i < this.balls.length; i++){
           if(this.balls[i].show === false){
             this.balls[i].show = true
             this.balls[i].el = el
             this.dropBalls.push(this.balls[i])
             return
           }
         } 
      },
      beforeEnter(el){
          for( var i=0;i<this.balls.length;i++){
            if(this.balls[i].show){
              var rect = this.balls[i].el.parentNode.getBoundingClientRect(),
                  x = rect.left - 73 ,
                  y = window.innerHeight - rect.top - 171
              el.style.display = ''
              el.style.transform = `translate3d(${x}px, 0, 0)`
              el.style.webkitTransform = `translate3d(${x}px, 0, 0)`
              var child = el.querySelector('.inner-hook')
              child.style.transform = `translate3d(0, ${-y}px, 0)`
              child.style.webkitTransform = `translate3d(0, ${-y}px, 0)`
            }
          }
      },
      enter(el){
        el.offsetHeight
        this.$nextTick(() => {
          el.style.transform = 'translate3d(0, 0, 0)'
          el.style.webkitTransform = 'translate3d(0, 0, 0)'
          var child = el.querySelector('.inner-hook')
          child.style.transform = 'translate3d(0, 0, 0)'
          child.style.webkitTransform = 'translate3d(0, 0, 0)'
        })
      },
      afterEnter(el) {
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      }

    },
    computed: {
      ...mapState({
        selectedFoods: 'products',
        
      }),
      ...mapGetters({
        foodsNum: 'foodsNum'
      }),
      totalPrice(){
        var foods = this.selectedFoods,
            price = 0
        foods.forEach( item => {
          price += item.count*item.price
        })
        return price
      },
      shipfeeTips(){

        var foods = this.selectedFoods,
            price = 0,
            words = '',
            minPrice = this.resInfo.seller&&this.resInfo.seller.minPrice || ''
        foods.forEach( item => {
          price += item.count*item.price
        })
        if(price === 0){
          words = minPrice + '元起送'
        }else if (price < minPrice) {

          words = '还差￥' + (minPrice-price) + '起送'
        }else {
          words = '结算'
        }             
        return words    
      }
      
    },
    components: {
      'add-cart': addcart
    }

  }

</script>

<style lang="stylus" scoped>
.shop-cart-wrapper
  position: fixed;
  z-index: 50;
  left: 0;
  bottom: 0;
  width: (1242rem/20);
  height: (144rem/20);
.shopCart
  position relative
  z-index 50
  height 100%
  .cart-content
    position relative
    z-index 30
    display flex
    background rgba(20, 29, 39, .9)
    .content-left
      flex 1
      height (144rem/20)
      .logo-wrapper
        display inline-block
        vertical-align top
        position: relative
        height: (170rem/20)
        line-height: (170rem/20)
        border-radius: 50%
        width: (170rem/20)
        top: -(30rem/20)
        background: #141d27
        margin:0 (15rem/20) 0 (35rem/20)
        padding (14rem/20)
        box-sizing border-box
        text-align: center
        .badge
          position absolute
          top: 0;
          right 0
          background: rgb(240,20,20);
          color: white;
          width (44rem/20)
          height (36rem/20)
          line-height: (36rem/20)
          font-size: (30rem/20)
          box-shadow: 0px (6rem/20) (10rem/20) 0 rgba(0,0,0,0.4)
          font-weight: 700
          border-radius: (16rem/20)
          text-align center
        .logo
          width 100%
          height 100%
          background: #2b343c
          border-radius: 50%
          font-size: (84rem/20)
          color: #80858a
          line-height: (160rem/20)
          font-weight: 700
          &.active
            background: #3190e8;
            color: white;
      .cart-empty
        display: inline-block
        margin-top: (46rem/20)
        vertical-align: top
        font-size: (38rem/20)
        color: #a2a2a3
      .price-info
        display inline-block
        .price
          // display inline-block
          // vertical-align top
          font-size (50rem/20)
          margin-top (18rem/20)
          box-sizing border-box
          color rgba(255,255,255,1)
          font-weight 700
          &.active
            color white
        .desc
          position relative
          display inline-block
          vertical-align top
          margin (8rem/20) 0 0 (12rem/20)
          font-size (28rem/20)
          color #fff
          line-height (24rem/20)
    .content-right
      flex 0 0 (315rem/20)
      font-size (46rem/20)
      font-weight 700
      background #2b343c
      color rgba(255,255,255,0.4)
      line-height (144rem/20)
      text-align center
      &.enough
        background #00b43c
        color white
  .ball-container
    .ball
      position fixed
      left (123rem/20)
      bottom (91rem/20)
      width (80rem/20)
      height (80rem/20)
      z-index 200
      &.drop-enter,&.drop-enter-active
        transition all .4s linear
        .inner
          width (60rem/20)
          height (60rem/20)
          border-radius 50%
          background rgb(0,160,220)
          transition all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41)
  .shopcart-list
    position absolute
    z-index 10
    bottom (144rem/20)
    left 0
    width 100%
    background white
    transition: .3s linear
    &.fold-enter, &.fold-leave-active {
      transform: translate3d(0, 100%, 0)
    }
    .list-header
      height (120rem/20)
      background #ececee
      .title
        display inline-block
        vertical-align top
        margin-top (33rem/20)
        font-size (46rem/20)
        font-weight 700
        color #666666
        margin-left (60rem/20)
        padding-left (24rem/20)
        border-left (9rem/20) solid #0096ff
      .empty
        position absolute
        right (8rem/20)
        top (30rem/20)
        font-size (40rem/20)
        color #666666
        padding 0 (75rem/20)
    .list-content
      max-height (700rem/20)
      overflow hidden
      .food
        position relative
        height (160rem/20)
        padding 0 (60rem/20)
        border-bottom (1rem/20) solid rgba(7,17,27,0.1)
        overflow hidden
        .name
          float: left
          font-size (48rem/20)
          color #000000
          line-height (162rem/20)
          font-weight 700
        .price
          float: right
          font-size (52rem/20)
          font-weight 700
          color #ff6000
          padding 0 (32rem/20) 0 (38rem/20)
          line-height (160rem/20)
          .hlight
            font-size (42rem/20)
            margin-right -(20rem/20)
        .cartcontrol-wrapper
          float: right
          font-size (70rem/20)
          margin-top (25rem/20)
.backdrop
  position fixed
  top -(540rem/20)
  bottom 0
  left 0
  right 0
  background rgba(7,17,27,0.6)
  z-index 40
  transition all .3s linear
  &.backdrop-enter, &.backdrop-leave-active
    opacity 0
  &.backdrop-enter-active
    opacity 1
</style>
