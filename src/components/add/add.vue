<template>
    <div class="add-cart">
        <span class="reduce icon-remove_circle_outline"></span>
        <span class="counter">1</span>
        <span class="plus icon-add_circle"></span>
    </div>
</template>
<script>
    export default {

    }
</script>
<style lang="stylus" scoped>
    .add-cart
        diaplay: flex
        align-items: center
        .reduce
            display: inline-block
            color: #3190e8
        .plus
            color: #3190e8
        .counter
            display: inline-block
            font-size: 34px
            vertical-align: 20px
</style>