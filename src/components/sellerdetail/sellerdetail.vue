<template>
    <div class="seller-detail"  v-scroll="{opts: scrollObj}">
        <div class="seller-detail-inner">
            <div class="seller-head">
                <div class="seller-profile">
                    <div class="seller-avatar-wrap">
                        <img :src="seller.avatar" alt="" class="seller-avatar">
                    </div>
                    <div class="seller-info">
                        <h3 class="seller-title">{{seller.name}}</h3>
                        <div class="seller-star">
                            <star :score="seller.score"></star>
                            <span class="seller-score hlight">4.1</span>
                            <span class="month-amount">月售{{seller.sellCount}}单</span>
                        </div>
                        <div class="seller-delivery">
                            0元起送
                            <span class="vertical-line"></span>
                            平均32分钟
                            <span class="vertical-line"></span>
                            1.89km
                        </div>
                    </div>
                </div>
                <div class="seller-bulletin">
                    <div class="delivery-fee">
                        配送费: {{seller.deliveryPrice}}元
                    </div>
                    <div class="seller-bulletin-inner">
                        {{seller.bulletin}}
                    </div>
                </div>
            </div>
            <division-bar></division-bar>
            <div class="comments-protal">
                <div class="comments-protal-head">
                    <h4 class="comments-protal-score">
                        <span>4.2</span>分
                    </h4>
                    <span class="comments-protal-desc">
                        低于周边商家100%
                    </span>
                    <div v-tap="{methods: turnComments}" class="comments-protal-amount">
                        <span class="comments-protal-num">{{seller.ratingCount}}条评价</span>
                        <span class="turnComments icon-keyboard_arrow_right"></span>
                    </div>
                </div>
                <ratings :ratings="fisrtRate"></ratings>
                <div class="comments-all" v-tap="{methods: turnComments}">
                    <span>查看全部评价</span>
                    <span class="icon-keyboard_arrow_right"></span>
                </div>
            </div>
            <division-bar></division-bar>
            <div class="seller-service">
                <header>活动与服务</header>
                <div class="seller-service-detail">
                    <div class="activity-wrapper">
                        <div class="activity-item" v-for="item in seller.supports">
                            <span class="activity-item-icon" :class="[sureClass(item.type)]"></span>
                            {{item.description}}
                        </div>
                    </div>
                </div>
            </div>
            <division-bar></division-bar>
            <div class="shop-scene">
                <header>商家实景</header>
                <ul class="scene-list clearfix">
                    <li class="scene-list-item" v-for="pic in seller.pics">
                        <img :src="pic" alt="">
                    </li>
                </ul>
            </div>
            <division-bar></division-bar>
            <div class="seller-foot">
                <header>商家信息</header>
                <ul class="seller-foot-list">
                    <li class="seller-foot-item" v-for="item in seller.infos">
                        {{item}}
                    </li>
                </ul>
            </div>
        </div>
        <div class="category-head-wrapper">
            <category-head @close="returnToHome" head-desc="商家详情"></category-head>
        </div>
    </div>
</template>
<script>
    import categoryhead from "../categoryhead/categoryhead"
    import divisionbar from "../divisionbar/divisionbar"
    import star from "../star/star"
    import ratings from "../ratings/ratings"
    export default {
        props: {
            seller: {
                type: Object,
                default(){
                    return {}
                }
            },
            ratings: {
                type: Array,
                default(){
                    return []
                }
            }
        },
        data(){
            return {
                scrollObj: {
                    bounce: false
                }
            }
        },
        created(){
            
        },
        updated(){
        },
        methods: {
            scroll(scroll){
                this.scroll = scroll
            },
            sureClass(typeNum){
                var rsClass = ''
                switch (typeNum) {
                    case 0 :
                        rsClass = "decrease_2"
                        break
                    case 1 :
                        rsClass = "discount_2"
                        break
                    case 2 :
                        rsClass = "special_2"
                        break
                    case 3 :
                        rsClass = "invoice_2"
                        break
                    case 4 :
                        rsClass = "guarantee_2"
                        break
                }
                return rsClass
            },
            returnToHome(){
                this.$emit('return-back')
            },
            turnComments(){
                this.$emit('show-com-detail')
            }
        },
        components: {
            "category-head": categoryhead,
            star,
            "division-bar": divisionbar,
            ratings
        },
        computed: {
            bcgObj(){
                var url = this.resInfo.seller&&this.resInfo.seller.avatar
                return {
                    "background-image": "url("+ url +")"
                }
            },
            fisrtRate(){
                return this.ratings&&this.ratings.slice(0, 1)
            }
        },
        
    }
</script>
<style lang="stylus" scoped>
    @import '../../common/stylus/mixin'
    .seller-detail
        position: fixed
        left: 0
        top: 0
        right: 0
        bottom: 0
        background: #f5f5f5
        .category-head-wrapper
            position:absolute
            width: 100%
            left: 0
            top: 0
        .seller-detail-inner
            position: absolute
            width: 100%
            padding-top: 138px
            padding-bottom: 144px
            left: 0
            top: 0
            background: #fff
        .seller-head
            padding: 45px 60px
            .seller-profile
                display: flex
                height: 225px
                margin-bottom: 30px
                .seller-avatar-wrap
                    margin-right: 32px
                .seller-avatar
                    width: 225px
                    height: 225px
                    border-radius: 8px
                .seller-info
                    flex: 1
                .seller-title
                    font-size: 48px
                    font-weight: 700
                    line-height: 93px
                    color: #363636
                .seller-star
                .seller-score
                    display: inline-block
                    vertical-align: top
                    font-size: 36px
                .month-amount
                    display: inline-block
                    vertical-align: top
                    font-size: 34px
                    color: #666
                .seller-delivery
                    font-size: 34px
                    span
                        display: inline-block
                        width: 3px
                        height: 26px
                        border-left: 3px solid #ccc
            .seller-bulletin
                padding: 30px
                background: #f8f8f8
                font-size: 34px
                line-height: 50px
                color: #666
                .delivery-fee
                    padding-bottom: 22px
                    border-bottom: 1px solid #e6e6e6
                .seller-bulletin-inner
                    padding-top: 15px
        .comments-protal-head
            height: 132px
            padding: 0 60px
            border-bottom: 1px solid #f5f5f5
            .comments-protal-score
                float: left
                color: #ff6000
                font-size: 42px
                line-height: 130px
                span
                    font-weight: 700
            .comments-protal-desc
                float: left
                line-height: 132px
                font-size: 40px
                color: #333333
            .comments-protal-amount
                float: right
                font-size: 40px
                color: #999999
                .icon-keyboard_arrow_right
                    display: inline-block
                    vertical-align: top
                    margin-top: 18px
                    margin-left: -20px
                    font-size: 80px
                .comments-protal-num
                    display: inline-block
                    vertical-align: top
                    margin-top: 34px
        .comments-all
            height: 130px
            text-align: center
            font-size: 40px
            color: #999
            line-height: 130px
            .icon-keyboard_arrow_right
                display: inline-block
                vertical-align: top
                margin-top: 26px
                font-size: 80px
    .seller-service
        padding-left: 60px
        padding-bottom: 20px
        header
            font-size: 46px
            line-height: 133px
            color: #333333
    .activity-wrapper
        padding-bottom: 8px
        font-size: 42px
        .activity-item 
            position:relative
            line-height: 94px
            height: 94px
            overflow: hidden 
            padding-left: 61px
            .activity-item-icon
                position: absolute
                width: 55px
                height: 55px
                left: 0
                top: 20px
                background-size: 100% 100%
                border-radius: 5px
                &.decrease_2 
                    bg-image("decrease_2")
                &.discount_2 
                    bg-image("discount_2")
                &.invoice_2 
                    bg-image("invoice_2")
                &.special_2 
                    bg-image("special_2")
                &.guarantee_2 
                    bg-image("guarantee_2")
    .shop-scene
        padding-left: 60px
        padding-bottom: 31px
        header
            height: 133px
            line-height: 133px
            color: #333333
            font-size: 46px
            border-bottom: 1px solid #f5f5f5
        .scene-list
            padding-top: 32px
            .scene-list-item
                float: left
                margin-right: 15px
                img
                    width: 276px
                    height: 276px
                    border-radius: 5px
    .seller-foot
        padding-left: 60px
        header
            height: 133px
            line-height: 133px
            font-size: 46px
            color: #333
            border-bottom: 1px solid #f5f5f5
        .seller-foot-item
            line-height: 134px
            font-size: 46px
            color: #666
            border-bottom: 1px solid #f5f5f5
</style>