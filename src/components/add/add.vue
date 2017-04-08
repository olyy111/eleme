<template>
    <div class="add-cart">
        <transition name="slide">
            <div class="reduce-wrapper" v-show="food.count>0">
                <span class="reduce icon-remove_circle_outline" 
                    v-tap="{methods: reduce}"
                ></span>
            </div>
        </transition>
        <span class="counter" v-show="food.count>0">{{food.count}}</span>
        <div class="add-wrapper">
            <span class="plus icon-add_circle" 
                v-tap="{methods: add}"
            ></span>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            food: {
                type: Object,
                default(){
                    return {}
                }
            }
        },
        methods: {
            add(params){
                this.$store.commit('add', this.food)
                this.$root.eventHub.$emit('cart.add', params.event)
            },
            reduce(){
                this.$store.commit('reduce', this.food)
            }
        }
    }
</script>
<style lang="stylus" scoped>
    .add-cart
        display: flex
        align-items: center
        .reduce-wrapper
            display: inline-block
            .reduce
                display: inline-block
                padding: (20rem/20)
                font-size: (80rem/20)
                color: #3190e8
        .add-wrapper
            display: inline-block
            .plus
                display: inline-block
                right: 0
                color: #3190e8
                font-size: (80rem/20)
                padding: (20rem/20)
        .counter
            display: inline-block
            font-size: (34rem/20)
            vertical-align: (20rem/20)
        .slide-enter-active, .slide-leave-active 
            transition: all .3s ease
            transform: translate3d(0, 0, 0)
            .reduce
                transform: rotate(0)
                transition: all .3s ease
        .slide-enter, .slide-leave-active
            transform: translate3d((130rem/20), 0, 0)
            .reduce
                transform: rotate(180deg)
                opacity: 0
            
    
</style>