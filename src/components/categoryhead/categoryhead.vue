<template>
    <div class="category-head">
        <span class="return-wrap" v-tap="{methods: _return}">
            <i class="return icon-arrow_lift"></i>
        </span>
        <h3 class="title">商品评价</h3>
    </div>
</template>
<script>
    export default {
        methods: {
            _return(){
                this.$emit('close-comments')
            }
        }
    }
</script>
<style lang="stylus">
    .category-head
        left: 0
        right: 0
        height: 138px
        line-height: 138px
        background: #0398ff
        .return-wrap
            position: absolute
            padding: 0 60px
            top: 0
            font-size: 62px
            color: #fff
        .title
            text-align: center
            font-size: 56px
            font-weight: 700
            color: #fff
</style>