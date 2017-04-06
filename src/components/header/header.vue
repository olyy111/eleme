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
        padding: 0 45px
        box-sizing: border-box
        color: #fff
        background-color: rgba(7,17,27,0.5)
        background-size: 100% 100%
        overflow: hidden
    .turn
        padding: 39px 0
    .seller-info
        position: relative
        display: flex
        flex-direction: row
        justify-content: space-between
        margin-bottom: 40px
        .title
            font-size: 48px
            line-height: 88px
        .avatar
            width: 240px
            height: 240px
            margin-right: 47px
            font-weight: bold
            img 
                width: 100%
                height: 100%
                border-radius: 10px
        .intro 
            margin-left: -30px  
        .des 
            font-size: 36px
            line-height: 44px   
            margin-bottom: 43px
        .notice 
            font-size: 36px
            line-height: 65px 
        .seller-detail-turn
            align-self: center
            margin-top: -100px
            i 
                font-size: 100px
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
        height: 54px
        display: flex
        flex-direction: row
        justify-content: space-between
        padding-bottom: 8px
        font-size: 32px
        transition: 1s
        .activity-item 
            position:relative
            line-height: 54px 
            padding-left: 52px
            .activity-item-icon
                position: absolute
                width: 39px
                height: 39px
                left: 0
                top: 8px
                background-size: 100% 100%
                border-radius: 5px
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
            padding: 40px 0 0 40px
            margin: -40px 0 0 -40px
            .icon-keyboard_arrow_right
                display: inline-block
                font-family: "sell-icon"
                font-size: 40px
                vertical-align: top
                
        .hidden
            overflow: hidden
    
</style>