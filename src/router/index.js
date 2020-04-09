import Vue from 'vue'
import VueRouter from 'vue-router'
const Layout = () => import("@components/layout");
Vue.use(VueRouter)

const routes = [
    {
        path:"/",
        redirect:"/demoList",
    },
    {
        path: '/',
        name: 'home',
        component: Layout,
        children: [
           {
                path:"/demoList",
                meta:{bread:["首页","demoList"]},
                component:()=>import(/* webpackChunkName : "demoList"*/ "@views/demo/list"),
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
