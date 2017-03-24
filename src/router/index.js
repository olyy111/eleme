import Vue from 'vue'
import Router from 'vue-router'
import goods from '../components/goods/goods'
import comments from '../components/comments/comments'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/goods',
            name: "goods",
            component: goods    
        },
        {
            path: '/comments',
            name: "comments",
            component: comments    
        }       
    ]
})
