<template>
    <transition name="foodShow"
        @before-enter="before"
        @enter="enter"
        
    >
    <div class="food" 
        v-if="isShowDetail" 
        @touchstart="isShowDetail=!isShowDetail"
         ref="foodWrapper"
    >
        <div class="avatar-wrap">
        </div>
        <div class="profile-wrapper">
            <div class="info">
                <div class="title">食物名称</div>
                <div class="desc">
                    <span>月售10分</span>
                    <span>好评率100%</span>
                </div>
                <div class="price">
                    <span class="unit">￥10</span>
                    <span class="oldPrice">￥20</span>
                </div>
                <div class="shopCart">
                    <transition name="fade">
                    <div class="text">加入购物车</div>
                    </transition>
                </div>
            </div>
        </div>
    </div>
    </transition>
</template>
<script>
    import Velocity from 'velocity-animate'
    export default {
        data(){
            return {
                isShowDetail: false,
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
                }
            }
        },
        created() {
            this.$root.eventHub.$on('foodEv', (el, food) => {
                var el = el.parentNode.querySelector(".img"),
                    rect = el.getBoundingClientRect()
                this.clickedEl.width = rect.width
                this.clickedEl.height = rect.height
                this.clickedEl.top = rect.top
                this.clickedEl.left = rect.left
                // this.$nextTick(() => {
                //     var el = this.$refs.foodWrapper
                //     var rc = el.getBoundingClientRect()  
                //         this.targetEl.left = rc.left
                //         this.targetEl.top= rc.top
                //         this.targetEl.width= rc.width
                //         this.targetEl.height= rc.height
                //         console.log(this.targetEl)
                // })
                console.log(this.clickedEl.width)
                this.isShowDetail = true
            })
        },
        updated(){
            var el = this.$refs.foodWrapper
            console.log(el)
            var rc = el.getBoundingClientRect()  
                this.targetEl.left = rc.left
                this.targetEl.top= rc.top
                this.targetEl.width= rc.width
                this.targetEl.height= rc.height
                console.log(this.targetEl)
        },
        methods: {
            before(el){
                console.log(this.clickedEl.width)
                el.style.width = this.clickedEl.width + "px"
                el.style.height = this.clickedEl.height + "px"
                el.style.top = this.clickedEl.top + "px"
                el.style.top = this.clickedEl.top + "px"
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
            }
        }
    }
</script>
<style lang="stylus" scoped>
    .food
        position: absolute
        z-index: 100
        left: 90px
        top: 400px
        right:90px
        bottom: 400px
        transition: .5s
        transform: translate3d(100px, 100px, 0) scale(.5, .5)
        &.foodShow-enter, &.foodShow-leave-active
            opacity: 0
        .avatar-wrap
            width: 100%
            height: 0
            padding-top: 100%
            background: red
        .profile-wrapper
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
                    .cartcontrol
                        position absolute
                        right 30px
                        bottom 30px
</style>