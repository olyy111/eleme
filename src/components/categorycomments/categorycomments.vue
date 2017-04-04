<template>
    <div class="category-comments">
        <div class="tags">
            <span class="tag" 
                :class="{active: type.all===currentType}"
                v-tap="{methods: selectTag, type: type.all}">
                全部
            </span>
            <span class="tag"  
                :class="{active: type.good===currentType}"
                v-tap="{methods: selectTag, type: type.good}">
                {{categoryDesc.type0}}
            </span>
            <span class="tag bad" 
                :class="{active: type.bad===currentType}"
                v-tap="{methods: selectTag, type: type.bad}">
                {{categoryDesc.type1}}
             </span>
        </div>
        <div class="content-toggle" @touchend="toggleContent" >
            <i class="icon icon-check_circle" :class="{active: isOnlyContentShow}"></i>
            只看有内容的评价
        </div>
    </div>
</template>
<script>
    const ALL = -1
    const GOOD = 0
    const BAD = 1
    export default {
        props: {
            food: {
                type: Object,
                default(){
                    return {}
                }
            },
            categoryDesc: {
                type:Object,
                default(){
                    return {}
                }
            }
        },
        data(){
            return {
                isOnlyContentShow: true,
                type: {
                    all: ALL,
                    good: GOOD,
                    bad: BAD
                },
                currentType: ALL
            }
        },
        methods: {
            toggleContent(){
                this.isOnlyContentShow = !this.isOnlyContentShow
                this.$root.eventHub.$emit('selectTag', this.isOnlyContentShow)
            },
            selectTag(params){
                this.currentType = params.type
                this.$root.eventHub.$emit('selectTag', params.type)
            }
        }
    }
</script>
<style lang="stylus" scoped>
    .category-comments
        padding: 30px 30px 20px 60px
        font-size: 40px
        background: #fff
        .tags
            display: flex
            justify-content: flex-start
            flex-wrap: wrap
            padding-bottom: 30px
            border-bottom: 1px dashed #eeeeee
            .tag
                padding: 0 40px
                margin-bottom: 30px
                margin-right: 20px
                line-height: 92px
                color: #6d7885
                background: #ebf5ff
                border-radius: 18px
                &.bad
                    color: #aaaaaa
                    background: #f5f5f5
                &.active
                    color: #fff
                    background: #0096ff
        .content-toggle
            color: #666
            line-height: 100px
            .icon
                display: inline-block
                font-size: 60px
                vertical-align: -10px
                &.active
                    color: #4cd964


        
</style>