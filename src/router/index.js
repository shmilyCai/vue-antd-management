import Vue from 'vue'
import VueRouter from 'vue-router'
const Layout = () => import("@components/layout");
Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        redirect: "/demoList",
    },
    {
        path: "/login",
        component: () => import(/* webpackChunkName : "login"*/ "@views/Login"),
    },
    {
        path: "/register",
        component: () => import(/* webpackChunkName : "register"*/ "@views/register"),
    },
    {
        path: '/',
        name: 'home',
        component: Layout,
        children: [
            {
                path: "/demoList",
                meta: { bread: ["首页", "demoList"] },
                component: () => import(/* webpackChunkName : "demoList"*/ "@views/demo/list"),
            },
            {
                path: "/myAchievement",
                meta: { bread: ["首页", "我的业绩"] },
                component: () => import(/* webpackChunkName : "myAchievement"*/ "@views/myAchievement/list"),
            },
            {
                path: "/productManagement",
                meta: { bread: ["首页", "产品管理"] },
                component: () => import(/* webpackChunkName : "productManagement"*/ "@views/productManagement/list"),
            },
            {
                path: "/orderManagement",
                meta: { bread: ["首页", "订单管理"] },
                component: () => import(/* webpackChunkName : "orderManagement"*/ "@views/orderManagement/list"),
            },
            {
                path: "/activityManagement",
                meta: { bread: ["首页", "活动管理"] },
                component: () => import(/* webpackChunkName : "activityManagement"*/ "@views/activityManagement/list"),
            },
            {
                path: "/myInformation",
                meta: { bread: ["首页", "我的资料"],isEmpty:true, },
                component: () => import(/* webpackChunkName : "myInformation"*/ "@views/myInformation/index"),
            },
            {
                path: "/statisticsExamine",
                meta: { bread: ["首页", "统计考核"]},
                component: () => import(/* webpackChunkName : "statisticsExamine"*/ "@views/statisticsExamine/list"),
            },
            {
                path: "/customerDelaminationStatistics",
                meta: { bread: ["首页", "客户分层统计"]},
                component: () => import(/* webpackChunkName : "customerDelaminationStatistics"*/ "@views/customerDelaminationStatistics/list"),
            },
            {
                path: "/productConfiguration",
                meta: { bread: ["首页", "产品配置"]},
                component: () => import(/* webpackChunkName : "productConfiguration"*/ "@views/productConfiguration/list"),
            },
            {
                path: "/productAnalyze",
                meta: { bread: ["首页", "产品分析"]},
                component: () => import(/* webpackChunkName : "productAnalyze"*/ "@views/productAnalyze/list"),
            },
            {
                path: "*",
                meta: { bread: ["首页", "404"],isEmpty:true, },
                component: () => import(/* webpackChunkName : "404"*/ "@views/error/404"),
            },
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
