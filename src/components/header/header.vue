<template>
    <section class="hd">
        <div class="turn"></div>
        <div class="seller-info clearfix">
            <div class="avatar">
                <img :src="seller.avatar">
            </div>
            <div class="intro">
                <div class="title">
                    {{seller.name}}
                </div>
                <p class="des">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </p>
                <p class="notice">
                    {{seller.bulletin|wordsLengthLimit}}
                </p>
            </div>
            <div class="seller-detail-turn" v-tap="{methods: goSellerDetail}">
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="activity-wrapper" :style="heightObj">
            <div class="activity-info-wrapper">
                <div class="activity-item" v-for="item in seller.supports">
                    <span class="activity-item-icon" :class="[sureClass(item.type)]"></span>
                    {{item.description}}
                </div>
            </div>
            <span class="activity-count">
                {{seller.supports&&seller.supports.length}}个活动
                <i v-if="seller.supports&&seller.supports.length" 
                    class="icon-keyboard_arrow_right"
                    @click="flag"
                ></i>
            </span>
        </div>
        <div class="bcg">
            <img :src="seller.avatar">
        </div>
        
    </section>
</template>
<script>
    export default {
        props: {
            seller: Object
        },
        data(){
            return {
                classMap: [],
                isShowAllActivities: true,
                height: ''
            }
        },
        created() {
                            
        },
        methods: {
            goSellerDetail(){
                this.$emit('show-detail')
            },
            sureClass(typeNum){
                var rsClass = ''
                switch (typeNum) {
                    case 0 :
                        rsClass = "decrease_1"
                        break
                    case 1 :
                        rsClass = "discount_1"
                        break
                    case 2 :
                        rsClass = "special_1"
                        break
                    case 3 :
                        rsClass = "invoice_1"
                        break
                    case 4 :
                        rsClass = "guarantee_1"
                        break
                }
                return rsClass
            },
            flag(){
               this.isShowAllActivities = !this.isShowAllActivities
            }
        },
        computed: {
            heightObj(){
                if(this.isShowAllActivities){
                    this.height = ''
                }else {
                    this.height = this.seller.supports.length*54 + 'px'
                }
                return {
                    height: this.height
                }
            }
        },
        filters: {
            wordsLengthLimit(words){
                if(words&&words.length > 18){
                    var limitWords = words.slice(0, 19) + "..."
                }
                return limitWords || words
            }
        }
    }
</script>
<style lang="stylus" scoped>
    @import '../../common/css/tools.stylus'
    @import '../../common/stylus/mixin'
    .hd 
        position: relative
        padding: 0 (45rem/20)
        box-sizing: border-box
        color: #fff
        background-color: rgba(7,17,27,0.5)
        background-size: 100% 100%
        overflow: hidden
    .turn
        padding: (39rem/20) 0
    .seller-info
        position: relative
        display: flex
        flex-direction: row
        justify-content: space-between
        margin-bottom: (49rem/20)
        .title
            font-size: (48rem/20)
            line-height: (88rem/20)
        .avatar
            width: (240rem/20)
            height: (240rem/20)
            margin-right: (47rem/20)
            font-weight: bold
            img 
                width: 100%
                height: 100%
                border-radius: (10rem/20)
        .intro 
            margin-left: -(30rem/20) 
        .des 
            font-size: (36rem/20)
            line-height: (44rem/20)   
            margin-bottom: (43rem/20)
        .notice 
            font-size: (36rem/20)
            line-height: (65rem/20) 
        .seller-detail-turn
            align-self: center
            margin-top: -(100rem/20)
            i 
                font-size: (100rem/20)
    .bcg 
        position: absolute
        z-index: -1
        top: 0
        left: 0
        width: 100%
        height: 100%
        filter: blur(24px)
        img
            width: 100%
            height: 100%
    .activity-wrapper
        height: (54rem/20)
        display: flex
        flex-direction: row
        justify-content: space-between
        padding-bottom: (8rem/20)
        font-size: (32rem/20)
        transition: 1s
        .activity-item 
            position:relative
            line-height: (54rem/20)
            padding-left: (52rem/20)
            .activity-item-icon
                position: absolute
                width: (39rem/20)
                height: (39rem/20)
                left: 0
                top: (8rem/20)
                background-size: 100% 100%
                border-radius: (5rem/20)
                &.decrease_1 
                    bg-image("decrease_1")
                &.discount_1 
                    bg-image("discount_1")
                &.invoice_1 
                    bg-image("invoice_1")
                &.special_1 
                    bg-image("special_1")
                &.guarantee_1 
                    bg-image("guarantee_1")
            
        .activity-count
            padding: (40rem/20) 0 0 (40rem/20)
            margin: -(40rem/20) 0 0 -(40rem/20)
            .icon-keyboard_arrow_right
                display: inline-block
                font-family: "sell-icon"
                font-size: (40rem/20)
                vertical-align: top
                
        .hidden
            overflow: hidden
    
</style>