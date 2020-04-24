<template>
    <div class="content-wrapper">
        <div class="info-wrapper">
            <div class="base-header">
                <img class="base-img" src="../../assets/photo.jpg" alt="" />
                <div class="base-row flex1">
                    <div class="img-blank"></div>
                    <div>
                        <div class="item-center">
                            <span class="name">王志国</span>
                            <div class="title">
                                <a-icon type="crown" />
                                <span>王牌经理</span>
                            </div>
                        </div>
                        <div class="site">
                            <a-icon type="environment" />
                            <span>达州银行渠县万兴广场支行</span>
                        </div>
                        <div class="customer">
                            <div class="flex">
                                <div class="bind-customer">
                                    <a-icon type="user" />
                                    <span>身份证 51312419232394201</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-wrapper">
                <Tab :tabList="tabList"></Tab>
            </div>
            <div class="base-form">
                <div class="base-form-wrapper">
                    <div class="flex1">
                        <RegisterForm 
                            ref = "formComp"
                            :formData = "formData"
                            :formConfig="formConfig" />
                    </div>
                    <div class="flex1"></div>
                </div>
                <a-button @click = "onUpdate" class = "up-button" type="primary">
                    更新个人信息
                </a-button>
            </div>
        </div>
    </div>
</template>

<script>
import Tab from "@components/common/tab";
import RegisterForm from "@components/register/registerForm";
import { getBaseInfoFormConfig } from "./formConfig";
export default {
    components: {
        Tab,
        RegisterForm,
    },
    data() {
        return {
            tabList: [{ name: "基本信息" }],
            formConfig: getBaseInfoFormConfig(),
            formData:{},
        };
    },
    created() {
        setTimeout(()=>{
            this.formData = {
            phone:"13588888888",
            email:"123@qq.com",
            createTime:"2020-04-20 11:52:13"
        }
        },0)
    },
    methods: {
        /**
         * 更新个人信息
         */
        onUpdate(){
            this.$refs["formComp"].getFormData((r)=>{
                console.log(r,"rrr")
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.content-wrapper {
    margin: 40px 20px 0 20px;
    .info-wrapper{
        flex:1;
        background: #fff;

    }
    .base-header {
        background: #fff;
        padding: 20px 25px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        position: relative;
        .base-img {
            position: absolute;
            height: 160px;
            width: 130px;
            border: 4px solid #fff;
            border-radius: 4px;
            top: -17px;
        }
        .base-row {
            display: flex;
            align-items: center;
            .img-blank {
                height: 120px;
                width: 120px;
                margin-right: 30px;
            }
            .name {
                font-size: 26px;
                color: #444;
                margin-right: 10px;
            }
            .title {
                background: #dac6b7;
                border-radius: 20px;
                padding: 4px 15px;
                display: flex;
                align-items: center;
                color: #655041;
                span {
                    margin-left: 5px;
                }
            }
            .site {
                display: flex;
                align-items: center;
                color: rgba(0, 0, 0, 0.75);
                margin: 20px 0 10px 0;
                span {
                    margin-left: 5px;
                }
            }
            .customer {
                color: rgba(0, 0, 0, 0.75);
            }
            .bind-customer {
                color: rgba(0, 0, 0, 0.6);
                span {
                    margin-left: 5px;
                }
            }
        }
    }
    .tab-wrapper {
        border-bottom: 1px solid #f0f2f5;
        padding-left: 15px;
        background: #fff;
    }
    .base-form {
        background: #fff;
        padding: 30px 25px;
    }
    .base-form-wrapper {
        display: flex;
    }
    .up-button{
        margin-top: 20px;
    }
}
</style>
