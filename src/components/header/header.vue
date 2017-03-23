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
        </div>
        <div class="activity-wrapper"></div>
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
                
            }
        },
        methods: {
        },
        computed: {
        },
        filters: {
            wordsLengthLimit(words){
                if(words&&words.length > 20){
                    var limitWords = words.slice(0, 21) + "..."
                }
                return limitWords || words
            }
        }
    }
</script>
<style lang="stylus">
    @import '../../common/css/tools.stylus'
    .hd 
        position: relative
        height: 400px
        padding: 0 45px
        box-sizing: border-box
        color: #fff
        background-color: rgba(7,17,27,0.5)
        background-size: 100% 100%
        overflow: hidden
    .turn
        padding: 39px 0
    .seller-info
        .title
            font-size: 48px
            line-height: 88px
        .avatar
            float: left 
            width: 240px
            height: 240px
            margin-right: 47px
            font-weight: bold
            img 
                width: 100%
                height: 100%
        .intro 
            float: left  
        .des 
            font-size: 36px
            line-height: 44px   
            margin-bottom: 43px
        .notice 
            font-size: 36px
            line-height: 65px 
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
            
    
</style>