<template>
    <div class="comments">
        <div class="star-wrapper">
            <div class="summary">
                <h4 class="score hlight">4.2</h4>
                <p class="desc"> 综合评分  </p>
                <p class="compare">低于周边商家100%</p>
            </div>
            <div class="detail">
                <div class="dist">
                    <strong class="desc">服务态度</strong>
                    <star :score="resInfo.seller&&resInfo.seller.serviceScore"></star>
                    <span class="score hlight">{{resInfo.seller&&resInfo.seller.serviceScore}}</span>
                </div>
                
                <div class="dist">
                    <strong class="desc">商品评分</strong>
                    <star :score="resInfo.seller&&resInfo.seller.foodScore"></star>
                    <span class="score hlight">{{resInfo.seller&&resInfo.seller.foodScore}}</span>
                </div>
                
                <p class="delivery-time">
                    <span class="title">
                        送达时间
                    </span><span class="time">
                        32分钟
                    </span>
                </p>
            </div>
        </div>
        <divsion-bar></divsion-bar>
        <category-comments :categoryDesc="categoryDesc">

        </category-comments>
        <div class="ratings-wrapper">
            <ratings :ratings="resInfo.ratings"></ratings>
        </div>
    </div> 
</template>
<script>
    import divisionbar from "../divisionbar/divisionbar"
    import categorycomments from "../categorycomments/categorycomments"
    import ratings from "../ratings/ratings"
    import star from "../star/star"
    export default {
        props: {
            resInfo: {
                type: Object,
                default(){
                    return {}
                }
            }
        },
        data(){
            return {
                categoryDesc: {
                    type0: "满意",
                    type1: "不满意"
                }
            }
        },
        components: {
            "divsion-bar" : divisionbar,
            "category-comments": categorycomments,
             "ratings": ratings,
             "star": star
        }
    }
</script>
<style lang="stylus" scoped>
    .comments
        background: #fff
        .star-wrapper
            display: flex
            padding-top: (36rem/20)
            padding-bottom: (23rem/20)
            border-bottom: (1rem/20) solid #eeeeee
            .summary
                width: (436rem/20)
                text-align: center
                .score
                    font-size: (60rem/20)
                    font-weight: 700
                    line-height: (80rem/20)
                .desc
                    font-size: (32rem/20)
                    line-height: (58rem/20)
                    color: #696969
                .compare
                    font-size: (32rem/20)
                    line-height: (58rem/20)
                    color: #999999
            .detail
                flex: 1
                height: (162rem/20)
                padding-left: (158rem/20)
                border-left: (1rem/20) solid #e6e6e6
                .dist
                    font-size: 0
                    padding-bottom: (24rem/20)
                    .desc
                        display: inline-block
                        margin-right: (60rem/20)
                        font-size: (34rem/20)
                        color: #666666
                    .score
                        font-size: (34rem/20)
                        margin-left: (60rem/20)
                .delivery-time
                    font-size: (32rem/20)
                    .title
                        color: #666666
                        margin-right: (60rem/20)
                    .time
                        color: #999999
                    
</style>