<template>
    <div class="login">
        <div class="top-bg"></div>
        <div class="login-box">
            <div class="login-title">
                <img src="../assets/login-logo.png" alt="">
                <span>金融小店管理系统</span>
            </div>
            <div class="login-form">
                <a-form
                    :form = "form"
                    >
                    <a-form-item>
                        <a-input
                            class="login-input"
                            v-decorator = "['loginName',{rules:[{required:true,message:'请输入用户名'}]}]"
                            placeholder = "请输入用户名"
                            maxLength = "30"
                            >
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-input
                            type = "password"
                            class="login-input"
                            v-decorator = "['password',{rules:[{required:true,message:'请输入密码'}]}]"
                            placeholder = "请输入密码"
                            maxLength = "30"
                            >
                        </a-input>
                    </a-form-item>
                    <a-button @click="onLogin" html-type = "submit" class="login-btn" type = "primary">登录</a-button>
                </a-form>
            </div>
        </div>
    </div>
</template>

<script>
import {login,getUserInfo} from "@api";
import VueCookies from "vue-cookies";
    export default {
        data(){
            return{
                form:this.$form.createForm(this, { name: 'loginForm' })
            }
        },
        methods:{
            /**
             * 登录
             */
            onLogin(){
                this.form.validateFieldsAndScroll((err, fieldsValue)=>{
                    if(err){
                        return;
                    }
                    this.loginRequest(fieldsValue);
                })
            },
            async loginRequest(request){
                let response = await login(request);
                VueCookies.set("token", response.token, "15min"); //延长token有效期
                this.getUser();
            },
            async getUser(){
                let response = await getUserInfo({});
                let {userName,permission} = response.user;
                VueCookies.set("userName",userName,"1d");
                VueCookies.set("permission",permission,"1d");
                this.$router.push("/home");
            }
        }
        
    }
</script>

<style lang="scss" scoped>
.login{
    height: 100vh;
    width: 100vw;
    background: #fff;
    position: relative;

    .top-bg{
        height:36vh;
        width: 100vw;
        background-image: linear-gradient(-21deg, 
		#b39d8d 0%, 
		#d1bdae 75%, 
		#efddce 100%), 
	linear-gradient(
		#836750, 
		#836750);
        background-blend-mode: normal,normal;
    }
    &-box{
        position: absolute;
        left:0;
        right:0;
        bottom:0;
        top:0;
        margin:0 auto;
        margin-top: 18vh;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    &-title{
        display: flex;
        align-items: center;
        justify-content: center;
        img{
            width: 194px;
        }
        span{
            font-size: 32px;
            color:#393836;
            position: relative;
            margin-left: 15px;
            padding-left: 15px;
            &::before{
                display: block;
                content:"";
                position: absolute;
                height:32px;
                width:1px;
                background: #000;
                left:0;
                top:8px;
            }
        }
    }
    &-form{
        width: 30vw;
        // height:30vh;
        padding:64px 100px;
        min-width: 438px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0px 6px 30px 0px rgba(181,181,185,.32);
        // padding:0 5vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-top: 4vh;
    }
    .login-btn{
        width: 100%;
        height:40px;
    }
    .login-input{
        height: 40px;
    }
}
</style>