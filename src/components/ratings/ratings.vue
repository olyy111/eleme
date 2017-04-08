<template>
    <ul class="rating-list">
        <li v-for="rating in selectedComments" class="rating-item">
            <div class="avatar-wrap">
                <img :src="rating.avatar">
            </div>
            <div class="rating-info">
                <header class="head">
                    <span class="name">{{rating.username}}</span>
                    <span class="time">{{rating.rateTime|formatDate}}</span>
                </header>
                <div class="star-wrapper">
                    <star :score="rating.score"></star>
                </div>
                <div class="rating-content">
                    
                    <p class="text">
                        {{rating.text}}
                    </p>
                </div>
                <div class="ratings-tags">
                    <i class="icon-thumb_up" v-if="rating.rateType === 0"></i>
                    <span class="tags" v-for="recommend in rating.recommend">
                        {{recommend}}
                    </span>
                </div>
            </div>
        </li>
    </ul>
    
    <!--<span class="icon-wrap">
        <i class="icon-thumb_up" v-if="rating.rateType === 0"></i>
        <i class="icon-thumb_down" v-if="rating.rateType === 1"></i>
    </span>-->
</template>
<script>
    import star from "../star/star"
    export default {
        props: {
            ratings: {
                type: Array,
                default(){
                    return []
                }
            }
        },
        data (){
            return {
                commentsType: -1,
                isOnlyShowContent: true
            }
        },
        created(){
            this.$root.eventHub.$on('selectTag', (value) => {
                if(typeof value === 'number'){
                    this.commentsType = value
                }else if(typeof value === 'boolean'){
                    this.isOnlyShowContent = value
                }
                
            })
        },
        filters: {
            formatDate(time){
                var date = new Date(time),
                    year = date.getFullYear(),
                    month = date.getMonth() + 1,
                    day = date.getDate(),
                    hour = date.getHours(),
                    minute = date.getMinutes(),
                    dateStr = ''
                
                dateStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute 
                return dateStr
            }
        },
        computed: {
            selectedComments(){
                var ratings = []
                if(this.commentsType === -1){
                    ratings = this.ratings
                }else if(this.commentsType === 0){
                    ratings = this.ratings.filter( rating => rating.rateType == 0)
                }else if(this.commentsType === 1){
                    ratings = this.ratings.filter( rating => rating.rateType == 1)
                }
                if(this.isOnlyShowContent){
                    ratings = ratings
                }else {
                    ratings = ratings.filter( rating => !!rating.text)
                }
                return ratings
            }
        },
        components: {
            star
        }
    }
</script>
</script>
<style lang="stylus"></style>
<style lang="stylus" scoped >
    .rating-list
        padding: 0 (60rem/20) 
        background: #fff
        .rating-item
            width: 100%
            border-bottom: (1rem/20) solid #f5f5f5
            display: flex
            padding: (40rem/20) 0
            .avatar-wrap
                width: (102rem/20)
                padding-top: (4rem/20)
                margin-right: (50rem/20)
                img
                    width: (120rem/20)
                    height: (120rem/20)
                    border-radius: 50%
            .rating-info
                flex: 1
                .head
                    display: flex
                    justify-content: space-between
                    height: (48rem/20)
                    line-height: (48rem/20)
                    color: #999999
                    font-size: (36rem/20)
                    margin-bottom: (12rem/20)
                .rating-content
                    font-size: (42rem/20)
                    line-height: (58rem/20)
                    display: flex
                    flex-wrap: wrap
                    .icon-wrap
                        margin-right: (16rem/20)
                        .icon-thumb_up
                            color: #ff6000
                        .icon-thumb_down
                            color: #999999
                    .text
                        flex: 1
                .ratings-tags
                    margin-top: (35rem/20)
                    .icon-thumb_up
                        font-size: (44rem/20)
                        color: #ff6000
                    .tags
                        display: inline-block
                        padding: 0 (16rem/20)
                        margin-right: (10rem/20)
                        font-size: (34rem/20)
                        line-height: (64rem/20)
                        border: (1rem/20) solid #dddddd
                        border-radius: (8rem/20)
                        color: #999999
                        
                
</style>