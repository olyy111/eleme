<template>
    <div class="star">
        <i class="icon" v-for="starClass in starClasses" ref="star" :class="starClass"></i>
    </div>
</template>
<script>
    export default {
        props:['score', 'desc'],
        computed: {
            starClasses(){
                var rs = []
                var isInt = this.score % 1 === 0
                var flag = false 
                for(var i=0;i<5;i++){
                    if( i+1 <= this.score){
                        rs.push('on')
                    }else {
                        if(!flag){
                            if(isInt){
                                rs.push('off')
                            }else {
                                rs.push('half')
                            }
                            flag = true
                        }else {
                            rs.push('off')
                        }
                        
                    }
                }
                flag = true
                return　rs
            }
        }
    }
    
</script>
<style lang="stylus" scoped>
    .star
        height: 38px
        line-height: 38px
        display: inline-block
        vertical-align: top
        .icon
            display: inline-block
            vertical-align: top
            width: 34px
            height: 34px
            background-size: 100% 100%
            &.on
                background-image: url("img/star36_on@3x.png")
            &.off
                background-image: url("img/star36_off@3x.png")
            &.half
                background-image: url("img/star36_half@3x.png")
                
        
</style>
