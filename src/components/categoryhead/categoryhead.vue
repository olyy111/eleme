<template>
    <div class="category-head">
        <span class="return-wrap" v-tap="{methods: _return}">
            <i class="return icon-arrow_lift"></i>
        </span>
        <h3 class="title">{{headDesc}}</h3>
    </div>
</template>
<script>
    export default {
        props: ["headDesc"],
        methods: {
            _return(){
                this.$emit('close')
            }
        }
    }
</script>
<style lang="stylus">
    .category-head
        position: relative
        height: (138rem/20)
        width: 100%
        line-height: (138rem/20)
        background: #0398ff
        .return-wrap
            position: absolute
            left: 0
            top: 0
            padding: 0 (45rem/20)
            font-size: (62rem/20)
            color: #fff
        .title
            text-align: center
            font-size: (56rem/20)
            font-weight: 700
            color: #fff
</style>