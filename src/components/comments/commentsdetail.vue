<template>
    <section class="comments-detail" v-scroll="{method: _scroll}">
        <comments :resInfo="resInfo" class="ratings-wrapper"></comments>
        <div class="category-head-wrapper">
            <category-head  @close="returnToSeller" head-desc="评价"></category-head>
        </div>
    </section>
</template>
<script>
    import categoryhead from "../categoryhead/categoryhead"
    import comments from "../comments/comments"
    export default {
       props: {
           resInfo: {
               type: Object,
               defalut(){
                   return {}
               }
           }
       },
       methods: {
           _scroll(scroll){
               this.$root.eventHub.$on('refreshScroll', () => {
                   scroll.refresh()
               })
           },
           returnToSeller (){
               this.$emit('from-comments')
           }
       },
       components: {
           "category-head": categoryhead,
           comments
       }
    }
</script>
<style lang="stylus" scoped>
    .comments-detail
        position: fixed
        left: 0
        top: 0
        right: 0
        bottom: 0
        background: #f5f5f5
        .return-back
            postition: absolute
            left: (10rem/20)
            top: (10rem/20)
            .icon
                font-size: (60rem/20)
        .category-head-wrapper
            position: absolute
            width: 100%
            left: 0
            top: 0
        .ratings-wrapper
            padding-top: (138rem/20)
            width: 200%
            box-sizing: border-box
</style>