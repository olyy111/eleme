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
            padding-top: (138rem/20)
            padding-bottom: (144rem/20)
            left: 0
            top: 0
            background: #fff
        .seller-head
            padding: (45rem/20) (60rem/20)
            .seller-profile
                display: flex
                height: (225rem/20)
                margin-bottom: (30rem/20)
                .seller-avatar-wrap
                    margin-right: (32rem/20)
                .seller-avatar
                    width: (225rem/20)
                    height: (225rem/20)
                    border-radius: (8rem/20)
                .seller-info
                    flex: 1
                .seller-title
                    font-size: (48rem/20)
                    font-weight: 700
                    line-height: (93rem/20)
                    color: #363636
                .seller-star
                .seller-score
                    display: inline-block
                    vertical-align: top
                    font-size: (36rem/20)
                .month-amount
                    display: inline-block
                    vertical-align: top
                    font-size: (34rem/20)
                    color: #666
                .seller-delivery
                    font-size: (34rem/20)
                    span
                        display: inline-block
                        width: (3rem/20)
                        height: (26rem/20)
                        border-left: (3rem/20) solid #ccc
            .seller-bulletin
                padding: (30rem/20)
                background: #f8f8f8
                font-size: (34rem/20)
                line-height: (50rem/20)
                color: #666
                .delivery-fee
                    padding-bottom: (22rem/20)
                    border-bottom: (1rem/20) solid #e6e6e6
                .seller-bulletin-inner
                    padding-top: (15rem/20)
        .comments-protal-head
            height: (132rem/20)
            padding: 0 (60rem/20)
            border-bottom: (1rem/20) solid #f5f5f5
            .comments-protal-score
                float: left
                color: #ff6000
                font-size: (42rem/20)
                line-height: (130rem/20)
                span
                    font-weight: 700
            .comments-protal-desc
                float: left
                line-height: (132rem/20)
                font-size: (40rem/20)
                color: #333333
            .comments-protal-amount
                float: right
                font-size: (40rem/20)
                color: #999999
                .icon-keyboard_arrow_right
                    display: inline-block
                    vertical-align: top
                    margin-top: (18rem/20)
                    margin-left: -(20rem/20)
                    font-size: (80rem/20)
                .comments-protal-num
                    display: inline-block
                    vertical-align: top
                    margin-top: (34rem/20)
        .comments-all
            height: (130rem/20)
            text-align: center
            font-size: (40rem/20)
            color: #999
            line-height: (130rem/20)
            .icon-keyboard_arrow_right
                display: inline-block
                vertical-align: top
                margin-top: (26rem/20)
                font-size: (80rem/20)
    .seller-service
        padding-left: (60rem/20)
        padding-bottom: (20rem/20)
        header
            font-size: (46rem/20)
            line-height: (133rem/20)
            color: #333333
    .activity-wrapper
        padding-bottom: (8rem/20)
        font-size: (42rem/20)
        .activity-item 
            position:relative
            line-height: (94rem/20)
            height: (94rem/20)
            overflow: hidden 
            padding-left: (61rem/20)
            .activity-item-icon
                position: absolute
                width: (55rem/20)
                height: (55rem/20)
                left: 0
                top: (20rem/20)
                background-size: 100% 100%
                border-radius: (5rem/20)
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
        padding-left: (60rem/20)
        padding-bottom: (31rem/20)
        header
            height: (133rem/20)
            line-height: (133rem/20)
            color: #333333
            font-size: 46px
            border-bottom: (1rem/20) solid #f5f5f5
        .scene-list
            padding-top: (32rem/20)
            .scene-list-item
                float: left
                margin-right: (15rem/20)
                img
                    width: (276rem/20)
                    height: (276rem/20)
                    border-radius: (5rem/20)
    .seller-foot
        padding-left: (60rem/20)
        header
            height: (133rem/20)
            line-height: (133rem/20)
            font-size: (46rem/20)
            color: #333
            border-bottom: (1rem/20) solid #f5f5f5
        .seller-foot-item
            line-height: (134rem/20)
            font-size: (46rem/20)
            color: #666
            border-bottom: (1rem/20) solid #f5f5f5
</style>