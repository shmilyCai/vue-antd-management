<template>
    <div class="register">
        <div class="register-wrapper">
            <div class="register-header">
                <div class="register-logo pointer">
                    <img src="../../assets/login-logo.png" alt="">
                    <p>金融小店</p>
                </div>
                <div class="register-back">
                    已有账号，
                    <button>返回登录</button>
                </div>
            </div>
            <div class="register-box">
                
                <div class="register-title">
                    欢迎您注册成为客户经理
                </div>
                <div class="register-content">
                    <LineLabel label = "编辑个人信息"/>
                    <div class="flex">
                        <div class="flex1">
                            <RegisterForm 
                                :formData = "{}" 
                                :formConfig = "personalInfoFormConfig"/>
                        </div>
                        <div class="upload-blank">
                        </div>
                    </div>
                    <LineLabel label = "编辑账户信息"/>
                    <div class="flex">
                        <div class="flex1">
                            <RegisterForm 
                                :formData = "{}" 
                                :formConfig = "accountFormConfig"/>
                        </div>
                        <div class="account-blank">
                        </div>
                    </div>
                    <button class="register-btn">注册</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LineLabel from "@components/common/lineLabel";
import RegisterForm from "@components/register/registerForm";
import {getPersonalInfoFormConfig,getAccountFormConfig} from "./formConfig";
    export default {
        components:{
            LineLabel,
            RegisterForm,
        },
        data(){
            return{
                personalInfoFormConfig:getPersonalInfoFormConfig(),
                accountFormConfig:getAccountFormConfig(),
            }
        },
    }
</script>

<style lang="scss" scoped>
.register{
    height:100%;
    width: 100%;
    background: #f5f5f5;
    overflow: auto;
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    // justify-content: center;
    &-box{
        width: 1100px;
        background: #fff;
        margin:0 auto;
        border-radius: 8px;
        position: relative;
        // flex:1;
        // display: flex;
        // flex-direction: column
    }
    &-title{
        color:#655041;
        background: #dac6b7;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        line-height: 56px;
        text-align: center;
        font-size: 18px;
    }
    &-header{
        line-height: 56px;
        height: 56px;
        // position: absolute;
        // top:-56px;
        display: flex;
        justify-content: space-between;
        width: 1100px;
        margin:0 auto;
    }
    &-logo {
        display: flex;
        align-items: center;
        font-size: 18px;
        color: #383736;
        img {
            height: 30px;
            margin-right: 10px;
        }
        p{
            position: relative;
            padding-left: 10px;
            font-weight: bold;
            &:before{
                content:"";
                display: block;
                position:absolute;
                top: 18px;
                left: 0;
                height: 20px;
                width: 1px;
                background: rgba(#42413e,.6);
            }
        }
    }
    &-back{
        color:rgba(0,0,0,.65);
        button{
            color:#775935;
        }
    }
    &-content{
        padding:30px 80px;
    }
    .upload-blank{
        width: 120px;
        height: 120px;
    }
    .account-blank{
        width: 120px;
        height: 30px;
    }
    &-btn{
        height: 36px;
        width: 90px;
        background: #dac6b7;
        color:#655041;
        margin-top: 20px;
        border-radius: 4px;
    }
    &-wrapper{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: auto;
    }
}
</style>