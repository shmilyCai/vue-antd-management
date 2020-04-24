<template>
    <div class="content-wrapper">
        <search-header
            :searchConfig = "searchConfig"
            @search = "getList"
            >
            
        </search-header>
        <table-list 
            :isSelectRow = "false"
            @getList = "getList" 
            :columns = "listColumns"
            :dataSource = "dataSource"
            :pageInfo = "pagination">
                <template  slot = "handleBtn" slot-scope="props">
                    <div class="table-label-row">
                        <span>产品仓库</span>
                        <div>
                            <a-button 
                                v-for = "(item,index) in handleList"
                                class="m-r-10" 
                                :key = "index" 
                                @click = "handleFn(item,props)"
                                :type="item.buttonType || ''" 
                                :icon="item.icon">{{item.name}}</a-button>
                        </div>
                    </div>
                </template>
                <template slot = "productStatus" slot-scope="props">
                    <div class="product-status" :class="getProductStatusClass(props)">{{getProductStatusStr(props)}}</div>
                </template>
                <template slot = "send">
                    <a-switch></a-switch>
                </template>
                <template slot = "opreation" slot-scope="props">
                    <a-button @click = "modifyFuc(props)">入店</a-button>
                </template>
        </table-list>
    </div>
</template>

<script>

import {searchConfig,listColumns} from "./formConfig";
import {listMixin} from "@mixins/listMixin";
import {listApi,listDeleteApi} from "@api"
    export default {
        mixins:[listMixin],
        data(){
            return{
                handleList:[
                    {name:"导出",icon:"export",handleFuc:"exportFuc"},
                ],
                searchConfig,
                listColumns,
                api:{
                    listApi,
                    listDeleteApi,
                }
            }
        },
        created(){
            setTimeout(()=>{
                this.dataSource = [
                    {id:"id1",priority:"",productStatus:1,level:1,content:"消息内容",user:"张哥",type:"模板1",verify_status:"待审核",use_status:"已使用"},
                    {id:"id2",priority:"",productStatus:2,level:1,content:"消息内容",user:"张哥",type:"模板1",verify_status:"待审核",use_status:"已使用"},
                    {id:"id3",priority:"",productStatus:3,level:1,content:"消息内容",user:"张哥",type:"模板1",verify_status:"待审核",use_status:"已使用"},
                    {id:"id4",priority:"",productStatus:4,level:1,content:"消息内容",user:"张哥",type:"模板1",verify_status:"待审核",use_status:"已使用"},
                ]
            })
        },
        methods:{
            /**
             * search-header按钮事件
             */
            handleFn(item,props){
                let {handleFuc} = item;
                this[handleFuc](item,props);
            },
            /**
             * 获取产品状态
             */
            getProductStatusStr(props){
                let {productStatus} = props.record;
                let statusStr = ["","未入店","已过期","已退店","已入店"]
                return statusStr[productStatus]
            },
            /**
             * 获取产品状态class
             */
            getProductStatusClass(props){
                let {productStatus} = props.record;
                return `status${productStatus}`
            },
        }
    }
</script>

<style lang="scss" scoped>
.product-status{
    padding-left: 15px;
    position: relative;
    display: flex;
    align-items: center;
    &::before{
        position: absolute;
        content:"";
        display: block;
        height:6px;
        width: 6px;
        border-radius: 6px;
        left: 0;
    }
    &.status1{
        &::before{
            background: #f5222d;
        }
    }
    &.status2{
        &::before{
            background: #faad14;
        }
    }
    &.status3{
        &::before{
            background: #d9d9d9;
        }
    }
    &.status4{
        &::before{
            background: #52c41a;
        }
    }
}
</style>