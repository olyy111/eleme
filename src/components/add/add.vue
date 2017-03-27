<template>
    <div class="add-cart">
        <transition name="slide">
            <div class="reduce-wrapper" v-show="food.count>0">
                <span class="reduce icon-remove_circle_outline" @click="reduce"></span>
            </div>
        </transition>
        <span class="counter">{{food.count}}</span>
        <span class="plus icon-add_circle" @click="add"></span>
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
            // add(){
            //     this.$store.commit('add', this.food)
            // },
            // reduce(){
            //     this.$store.commit('reduce', this.food)
            // }
            add(){
                if(!this.food.count){
                    this.$set(this.food, 'count', 1)
                }else {
                    this.food.count ++
                }
            },
            reduce(){
                if(this.food.count){
                    this.food.count --
                    if(this.food.count === 0){
                        delete this.food.count
                    }
                }
            }
        },
        computed: {
            
        }

    }
</script>
<style lang="stylus" scoped>
    .add-cart
        diaplay: flex
        align-items: center
        .reduce-wrapper
            display: inline-block
            .reduce
                display: inline-block
                padding: 20px
                color: #3190e8
        .plus
            display: inline-block
            right: 0
            color: #3190e8
            padding: 20px
        .counter
            display: inline-block
            font-size: 34px
            vertical-align: 20px
        .slide-enter-active, .slide-leave-active 
            transition: all .3s ease
            transform: translate3d(0, 0, 0)
            .reduce
                transform: rotate(0)
                transition: all .3s ease
        .slide-enter, .slide-leave-active 
            transform: translate3d(130px, 0, 0)
            .reduce
                transform: rotate(180deg)
                opacity: 0
            
    
</style>