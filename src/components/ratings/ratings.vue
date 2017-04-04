<template>
    <div class="ratings-wrap" v-scroll>
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
                    <div class="content">
                        <span class="icon-wrap">
                            <i class="icon-thumb_up" v-if="rating.rateType === 0"></i>
                            <i class="icon-thumb_down" v-if="rating.rateType === 1"></i>
                        </span>
                        <p class="text">
                            {{rating.text}}
                        </p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    
</template>
<script>
    
    export default {
        props: {
            food: {
                type: Object,
                default(){
                    return {}
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
                    ratings = this.food.ratings
                }else if(this.commentsType === 0){
                    ratings = this.food.ratings.filter( rating => rating.rateType == 0)
                }else if(this.commentsType === 1){
                    ratings = this.food.ratings.filter( rating => rating.rateType == 1)
                }
                if(this.isOnlyShowContent){
                    ratings = ratings
                }else {
                    ratings = ratings.filter( rating => !!rating.text)
                }
                return ratings
            }
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
            border-top: 1px solid #f5f5f5
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
                .content
                    font-size: 42px
                    line-height: 58px
                    display: flex
                    .icon-wrap
                        margin-right: 16px
                        .icon-thumb_up
                            color: #ff6000
                        .icon-thumb_down
                            color: #999999
                    .text
                        flex: 1

                        
                
</style>