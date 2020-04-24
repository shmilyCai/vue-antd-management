<template>
    <div class="layout">
        <a-layout-header class="layout-header">
            <div class="item-center">
                <div class="layout-logo pointer" @click = "goLogin">
                    <img src="../assets/login-logo.png" alt="">
                    <p>金融小店</p>
                </div>
                <!-- <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="()=> collapsed = !collapsed" /> -->
            </div>
            <div class="item-center">
                <div class = "user-name">
                    <a-dropdown>
                        <span class="pointer" href="#">
                            欢迎，张三
                            <a-icon type="caret-down" />
                        </span>
                        <a-menu slot="overlay">
                            <a-menu-item @click = "onOrgListChange(item)"  v-for="(item,index) in orgList" :key="index">
                                <a href="javascript:;">{{item.name}}</a>
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </div>
                <div class="layout-user">
                    <a-icon type = "logout"></a-icon>
                    <span>退出登录</span>
                </div>
            </div>
        </a-layout-header>
        <a-layout class="layout-wrapper">
            <a-layout-sider :trigger="null" collapsible v-model="collapsed">
                <a-menu @click="onMenuChange" mode="inline" :openKeys.sync="openKeys" :defaultSelectedKeys="[$route.path]">
                    <template v-for="(item) in menuList">
                        <a-menu-item v-if="!item.children" :key="item.path">
                            <a-icon :type="item.icon" />
                            <span>{{item.name}}</span>
                        </a-menu-item>
                        <a-sub-menu v-else :key="item.path">
                            <span slot="title">
                                <a-icon :type="item.icon" />
                                <span>{{item.name}}</span>
                            </span>
                            <a-menu-item v-for="(item,) in item.children" :key="item.path">
                                {{item.name}}
                            </a-menu-item>
                        </a-sub-menu>
                    </template>
                </a-menu>
            </a-layout-sider>
            <a-layout>
                <div class="bread-row" v-if="breadList.length">
                    <a-breadcrumb>
                        <a-breadcrumb-item v-for="(item,index) in breadList" :key="index">{{item}}</a-breadcrumb-item>
                    </a-breadcrumb>
                </div>
                <a-layout-content class="layout-content" v-if = "!isEmpty">
                    <transition name="fade">
                        <keep-alive>
                            <router-view/>
                        </keep-alive>
                    </transition>
                </a-layout-content>
                <a-layout-content v-else>
                    <transition name="fade">
                        <keep-alive>
                            <router-view/>
                        </keep-alive>
                    </transition>
                </a-layout-content>
            </a-layout>
        </a-layout>
        <a-modal 
            :footer = "null"
            :visible = "tipModifyPwdVisible">
            <div class="pwd-wrapper">
                <img class="pwd-tip" src="../assets/pwd-tip.png" alt="">
                <p class="tip1">当前密码为默认密码</p>
                <p class="tip2">为保证您的账户安全，请尽快修改</p>
                <div>
                    <a-button class="m-r-20" @click = "tipModifyPwdVisible = false;pwdVisible = true;" type = "primary">立即修改</a-button>
                    <a-button @click = "tipModifyPwdVisible = false">下次再说</a-button>
                </div>
            </div>
        </a-modal>
        <add-modal 
            ref = "modifyPwdModal"
            title = "修改密码"
            fixedTitle
            @onClose = "pwdVisible = false"
            :formItemLayout = "formItemLayout"
            :visible = "pwdVisible"
            :formConfig = "modifyPwdConfig">

        </add-modal>
    </div>

</template>
<script>
import { menuList } from "../config/menuConfig";
import {getModifyPwdConfig} from "./layoutFormConfig";
export default {
    data() {
        return {
            collapsed: false,
            menuList, //模拟菜单列表
            breadList: [], //面包屑
            isEmpty:false,//是否是空的container
            openKeys: [], //默认展开sub-menu的项
            orgList: [
                { name: "修改密码" ,type:"modifyPassword"},
            ], //组织列表
            currentOrg: "管理后台", //当前组织
            tipModifyPwdVisible:false,
            pwdVisible:false,
            formItemLayout:{
                labelCol: { span: 6 },
                wrapperCol: { span: 16 },
            },
            modifyPwdConfig:getModifyPwdConfig(this),
        };
    },
    created() {
        this.getPath();
        let path = this.$route.path.split("/");
        this.openKeys = [`/${path[1]}`];
    },
    methods: {
        /**
         * 去登录页面
         */
        goLogin(){
            this.$router.push("/login");
        },
        /**
         * 路由切换
         */
        onMenuChange(e) {
            this.$router.push(e.key);
        },
        /**
         * 监听路由变化事件
         */
        getPath() {
            let { bread = [],isEmpty } = this.$router.history.current.meta;
            this.breadList = bread;
            this.isEmpty = isEmpty;
            let path = this.$route.path.split("/");
            this.openKeys = [`/${path[1]}`];
        },
        onOrgListChange(e){
            let {type} = e;
            if(type == "modifyPassword"){
                this.pwdVisible = true;
            }
        }
    },
    watch: {
        $route: "getPath"
    }
};
</script>
<style lang = "scss" scope>
.layout {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #f0f2f5;
    &-logo {
        width: 200px;
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #0e1118;
        img {
            height: 22px;
            margin-right: 10px;
        }
        p{
            position: relative;
            padding-left: 10px;
            &:before{
                content:"";
                display: block;
                position:absolute;
                top:22px;
                left: 0;
                height: 18px;
                width: 1px;
                background: rgba(#42413e,.6);
            }
        }
    }
    &-content {
        /* background: #fff; */
        /* padding: 24px; */
        margin: 20px 20px 0 20px;
        overflow: auto;
    }
    &-header {
        background: #fff !important;
        padding-left: 20px !important;
        text-align: left;
        margin-bottom: 2px;
        /* box-shadow: 0px 0px 8px 0px rgba(175, 177, 186, 0.2); */
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    &-user {
        display: flex;
        align-items: center;
        margin-left: 25px;
        color:#5f5f5f;
        cursor: pointer;
        span {
            margin-left: 5px;
        }
    }
    .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;
        color: #cdbbad;
        &:hover {
            color: #cdbbad;
        }
    }
    &-wrapper {
        height: 100%;
    }
    .user-name{
        color:#5f5f5f;
    }
}
.bread-row {
    text-align: left;
    padding: 17px;
    background: #fff;
    margin-left: 3px;
}
.pwd-wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
    padding-bottom:50px;
    .pwd-tip{
        height: 60px;
        margin:30px 0 40px 0;
    }
    .tip1{
        font-size: 22px;
        color:#000;
        font-weight: bold;
    }
    .tip2{
        color:rgba(0,0,0,.4);
        margin:5px 0 30px 0;
    }
}
</style>