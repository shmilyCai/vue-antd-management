<template>
    <div class="content-wrapper">
        <div class="base-info">
            <div class="base-row flex1">
                <img src="../../assets/photo.jpg" alt="">
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
                            <div class="bind-customer m-r-30">
                                <a-icon type="check-circle" />
                                <span>绑定客户 39989</span>
                            </div>
                            <div class="bind-customer">
                                <a-icon type="smile-circle" />
                                <span>有效客户 39989</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex1">
                <div class="base-time">
                    <span>2020-03-20</span>
                    <span class="division">></span>
                    <span>2020-05-20</span>
                </div>
                <div class="base-data">
                    <div class="data-row">
                        <p class="row-name">店铺访问量</p>
                        <p class="row-num">9999999</p>
                    </div>
                    <div class="data-row">
                        <p class="row-name">活动浏览量</p>
                        <p class="row-num" title = "9999999">9999999</p>
                    </div>
                    <div class="data-row">
                        <p class="row-name">产品浏览量</p>
                        <p class="row-num" title = "99999">99999</p>
                    </div>
                    <div class="data-row">
                        <p class="row-name">产品销售余额</p>
                        <p class="row-num" title = "3131334.00">3131334.00</p>
                    </div>
                </div>
            </div>
        </div>
        <search-header
            :searchConfig = "searchConfig"
            @search = "getList"
            >
        </search-header>
        <table-list 
            @getList = "getList" 
            :columns = "listColumns"
            :dataSource = "dataSource"
            :pageInfo = "pagination">
                <template  slot = "handleBtn" slot-scope="props">
                    <div class="table-label-row">
                        <span>我的客户表</span>
                        <div>
                            <a-button icon = "export" @click = "onExport(props)">
                                导出
                            </a-button>
                        </div>
                    </div>
                </template>
                <template slot = "opreation" slot-scope="props">
                    <a @click = "modifyFuc(props)">修改</a>
                    <a @click = "deleteFuc(props)">删除</a>
                </template>
        </table-list>
        <add-modal 
            :formData = "formData" 
            :visible = "formModalVisible"
            :formConfig = "formConfig"
            @onClose = "formModalVisible = false"
            />
    </div>
</template>

<script>

import {searchConfig,listColumns,formModalConfig} from "./formConfig";
import {listMixin} from "@mixins/listMixin";
import {listApi,listDeleteApi} from "@api"
    export default {
        mixins:[listMixin],
        data(){
            return{
                handleList:[
                    {name:"添加模板",buttonType:"primary",icon:"plus",handleFuc:"addFuc"},
                    {name:"批量删除",handleFuc:"batchDeleteFuc"},
                ],
                searchConfig,
                listColumns,
                formConfig:formModalConfig(),
                api:{
                    listApi,
                    listDeleteApi,
                }
            }
        },
        created(){
        },
        methods:{
            /**
             * search-header按钮事件
             */
            handleFn(item,props){
                let {handleFuc} = item;
                this[handleFuc](item,props);
            },
        }
    }
</script>

<style lang="scss" scoped>
.base-info{
    background: #fff;
    padding:20px 25px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    .base-row{
        display: flex;
        align-items: center;
        img{
            height: 120px;
            width: 90px;
            margin-right: 20px;
        }
        .name{
            font-size: 26px;
            color:#444;
            margin-right: 10px;
        }
        .title{
            background: #dac6b7;
            border-radius: 20px;
            padding: 4px 15px;
            display: flex;
            align-items: center;
            color:#655041;
            span{
                margin-left: 5px;
            }
        }
        .site{
            display: flex;
            align-items: center;
            color:rgba(0,0,0,.75);
            margin:20px 0 10px 0;
            span{
                margin-left: 5px;
            }
        }
        .customer{
            color:rgba(0,0,0,.75);
        }
        .bind-customer{
            color:rgba(0,0,0,.6);
            span{
                margin-left: 5px;
            }
        }
    }
    .base-time{
        display: flex;
        justify-content: center;
        color:rgba(0,0,0,.6);
        font-size: 12px;
        margin-top: 10px;
        margin-bottom: 25px;
    }
    .division{
        margin:0 25px;
    }
    .base-data{
        display: flex;
        .data-row{
            flex:1;
            width: 0;
            position: relative;
            text-align: center;
            &:not(:last-child){
                &:after{
                    content:"";
                    position: absolute;
                    display: block;
                    height:50px;
                    width: 1px;
                    background: #e9e9e9;
                    right: 0;
                    top:8px;
                }
            }
        }
        .row-name{
            color:rgba(0,0,0,.6);
        }
        .row-num{
            font-size: 28px;
            color:#000;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
    }
    
}
</style>