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

                //当DOM更新完毕，通知引用此组件的可滚动组件重新计算高度
                his.$nextTick( () => {
                    this.$root.eventHub.$emit('refreshScroll')
                })
                this.$root.eventHub.$emit('selectTag', this.isOnlyContentShow)
            },
            selectTag(params){
                this.currentType = params.type
                this.$nextTick( () => {
                    this.$root.eventHub.$emit('refreshScroll')
                })
                this.$root.eventHub.$emit('selectTag', params.type)
            }
        }
    }
</script>
<style lang="stylus" scoped>
    .category-comments
        padding: (30rem/20) (30rem/20) (20rem/20) (60rem/20)
        font-size: (40rem/20)
        background: #fff
        .tags
            display: flex
            justify-content: flex-start
            flex-wrap: wrap
            padding-bottom: (30rem/20)
            border-bottom: (1rem/20) dashed #eeeeee
            .tag
                padding: 0 (40rem/20)
                margin-bottom: (30rem/20)
                margin-right: (20rem/20)
                line-height: (92rem/20)
                color: #6d7885
                background: #ebf5ff
                border-radius: (18rem/20)
                &.bad
                    color: #aaaaaa
                    background: #f5f5f5
                &.active
                    color: #fff
                    background: #0096ff
        .content-toggle
            color: #666
            line-height: (100rem/20)
            .icon
                display: inline-block
                font-size: (60rem/20)
                vertical-align: -(10rem/20)
                &.active
                    color: #4cd964


        
</style>