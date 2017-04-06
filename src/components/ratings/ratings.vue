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
        padding: 0 60px
        background: #fff
        .rating-item
            width: 100%
            border-bottom: 1px solid #f5f5f5
            display: flex
            padding: 40px 0
            .avatar-wrap
                width: 102px
                padding-top: 4px
                margin-right: 50px
                img
                    width: 120px
                    height: 120px
                    border-radius: 50%
            .rating-info
                flex: 1
                .head
                    display: flex
                    justify-content: space-between
                    height: 48px
                    line-height: 48px
                    color: #999999
                    font-size: 36px
                    margin-bottom: 12px
                .rating-content
                    font-size: 42px
                    line-height: 58px
                    display: flex
                    flex-wrap: wrap
                    .icon-wrap
                        margin-right: 16px
                        .icon-thumb_up
                            color: #ff6000
                        .icon-thumb_down
                            color: #999999
                    .text
                        flex: 1
                .ratings-tags
                    margin-top: 35px
                    .icon-thumb_up
                        font-size: 44px
                        color: #ff6000
                    .tags
                        display: inline-block
                        padding: 0 16px
                        margin-right: 10px
                        font-size: 34px
                        line-height: 64px
                        border: 1px solid #dddddd
                        border-radius: 8px
                        color: #999999
                        
                
</style>