<template lang="html">
  <div class="">
    <div class="shopCart">
      <div class="content">
        <div class="content-left" >
          <div class="logo-wrapper">
            <div class="badge" v-if="totalPrice !== 0">
            </div>
            <div class="logo">
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
        <div class="content-right">
          {{shipfeeTips}}           
        </div>
      </div>
      <div class="ball-container">
      
          <div class="ball" v-show="">
            <div class="inner inner-hook"></div>
          </div>
        
      </div>
    
      <div class="shopcart-list" v-show="">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" >清空</span>
        </div>
        <div class="list-content" ref="">
          <ul>
            <li class="food" v-for="">
              <span class="name"></span>
              <div class="price">
                <span></span>
              </div>
              <div class="cartcontrol-wrapper">
              </div>
            </li>
          </ul>
        </div>
      </div>
      
    </div>
    
    <div class="backdrop" v-show=""></div>
  
  </div>
</template>

<script>


  export default {
    props: {
      resInfo: {
        type:Object,
        default(){
          return {}
        }
      },
      selectedFoods: {
        type: Array,
        default(){
          return []
        }
      }
    },
    computed: {
      totalPrice(){
        var foods = this.selectedFoods,
            price = 0
            console.log(this.selectedFoods)
        foods.forEach( item => {
          price += item.count*item.price
          console.log(price)
        })
        return price
      },
      shipfeeTips(){
          
        var foods = this.selectedFoods,
            price = 0,
            words = '',
            minPrice = this.resInfo.seller&&this.resInfo.seller.minPrice
        foods.forEach( item => {
          price += item.count*item.price
          console.log(price)
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
    methods: {
      
    }

  }

</script>

<style lang="stylus" scoped>
.shopCart
  position fixed
  left 0
  bottom 0
  width 100%
  height 144px
  z-index 50
  .content
    display flex
    background rgba(20, 29, 39, .9)
    .content-left
      flex 1
      height 144px
      .logo-wrapper
        display inline-block
        vertical-align top
        position: relative
        height: 170px
        line-height: 170px
        border-radius: 50%
        width: 170px
        top: -30px
        background: #141d27
        margin:0 15px 0 35px
        padding 14px
        box-sizing border-box
        text-align: center
        .badge
          position absolute
          top: 0;
          right 0
          background: rgb(240,20,20);
          color: white;
          width 66px
          height 36px
          line-height: 36px;
          font-size: 266px;
          box-shadow: 0px 6px 10px 0px rgba(0,0,0,0.4);
          font-weight: 700;
          border-radius: 16px;
          text-align center
        .logo
          width 100%
          height 100%
          background: #2b343c
          border-radius: 50%
          font-size: 84px
          color: #80858a
          line-height: 140px
          font-weight: 700
          &.active
            background: rgb(0,160,220);
            color: white;
      .cart-empty
        display: inline-block
        font-size: 38px
        color: #a2a2a3
      .price-info
        display inline-block
        .price
          // display inline-block
          // vertical-align top
          font-size 50px
          margin-top 18px
          box-sizing border-box
          color rgba(255,255,255,1)
          font-weight 700
          &.active
            color white
        .desc
          position relative
          display inline-block
          vertical-align top
          margin 8px 0 0 12px
          font-size 28px
          color #fff
          line-height 24px
    .content-right
      flex 0 0 315px
      font-size 46px
      font-weight 700
      background #2b343c
      color rgba(255,255,255,0.4)
      line-height 144px
      text-align center
      &.enough
        background #00b43c
        color white
  .ball-container
    .ball
      position fixed
      left 32px
      bottom 22px
      z-index 200
      &.drop-enter,&.drop-enter-active
        transition all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41)
        .inner
          width 16px
          height 16px
          border-radius 50%
          background rgb(0,160,220)
          transition all 0.4s linear
  .shopcart-list
    position absolute
    top 0
    left 0
    width 100%
    background white
    transform translate3d(0,-100%,0)
    z-index -1
    &.transHeight-enter-active,&.transHeight-leave-active
      transition all 0.5s
    &.transHeight-enter,&.transHeight-leave-active
      transform translate3d(0,0,0)
    .list-header
      height 40px
      line-height 40px
      background #f3f5f7
      border-bottom 1px solid rgba(7,17,27,0.1)
      .title
        display inline-block
        font-size 14px
        font-weight 200
        color rgb(7,17,27)
        padding-left 18px
      .empty
        position absolute
        right 8px
        font-size 12px
        color rgb(0,160,220)
        padding 0 10px
    .list-content
      max-height 217px
      overflow hidden
      .food
        position relative
        display flex
        height 48px
        margin 0 18px
        border-bottom 1px solid rgba(7,17,27,0.1)
        .name
          flex 1
          font-size 14px
          color rgb(7,17,27)
          line-height 48px
          font-weight 700
        .price
          font-size 14px
          font-weight 700
          color rgb(240,20,20)
          padding 0 12px 0 18px
          line-height 48px
        .cartcontrol-wrapper
          font-size 14px
          margin-top 6px
.backdrop
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  background rgba(7,17,27,0.6)
  backdrop-filter blur(10px)
  z-index 40
  &.fade-backdrop-enter-active,&.fade-backdrop-leave-active
    transition opacity 0.5s
  &.fade-backdrop-enter,&.fade-backdrop-leave-active
    opacity 0
</style>
