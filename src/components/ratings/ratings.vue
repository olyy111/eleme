<template>
    <ul class="rating-list">
        <li v-for="rating in food.ratings" class="rating-item">
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
        created(){
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
        }
    }
</script>

<style lang="stylus" scoped >
    .rating-list
        .rating-item
            width: 100%
            border-top: 1px solid #f5f5f5
            display: flex
            padding: 40px 0
            .avatar-wrap
                width: 102px
                padding-top: 4px
                margin-right: 30px
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