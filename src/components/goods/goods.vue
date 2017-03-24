<template>
    <div class="goods">
        <div class="sidebar-wrapper">
            <ul class="sidebar">
                <li class="item" v-for="item in resInfo.goods">
                    <span class="item-text">
                        {{item.name}}
                    </span>
                    <!--<i class="item-count">
                        
                    </i>-->
                </li>
            </ul>
        </div>
        <div class="goods-wrapper">
            <div class="goods">

            </div>
        </div>   
    </div>
</template>

<script>
export default {
   props: {
       resInfo: Object
   }
}
</script>
<style lang="stylus">
    .goods
        display: flex
        flex-direction: row
        .sidebar-wrapper
            width: 240px
            .item
                position: relative
                display: flex
                border-left: 10px solid #f8f8f8
                padding: 60px 0 60px 32px
                background-color: #f8f8f8 
                .item-text
                    font-size: 40px
                .item-count
                    position: absolute
                    right: 15px
                    top: 9px
                    width: 51px
                    height: 36px
                    font-size: 30px
                    line-height: 36px
                    color: #fff
                    text-align: center
                    border-radius: 18px
                    background-color: #ff461d
        .goods-wrapper
            flex-grow: 1
</style>