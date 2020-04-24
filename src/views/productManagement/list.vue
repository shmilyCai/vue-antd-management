<template>
    <div class="content-wrapper">
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
                        <div>
                            <a-button class = "m-r-20">
                                批量上架
                            </a-button>
                            <a-button>
                                批量下架
                            </a-button>
                        </div>
                        <div>
                            <a-button icon = "export" @click = "onExport">
                                导出
                            </a-button>
                        </div>
                    </div>
                </template>
                <template slot = "productStatus" slot-scope="props">
                    <div class="item-center">
                        <span class="circle c2"></span>
                        {{getProductStatusStr(props)}}
                    </div>
                </template>
                <template slot = "opreation" slot-scope="props">
                    <a-button>
                        上架
                    </a-button>
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
            this.dataSource = [
                {productStatus:1}
            ]
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
             * 转换产品状态
             */
            getProductStatusStr(props){
                return "在售中"
            },
        }
    }
</script>

<style lang="scss" scoped>
.circle{
    display: block;
    height: 8px;
    width: 8px;
    border-radius: 8px;
    margin-right: 5px;
    &.c1{
        background: #dac6b7;
    }
    &.c2{
        background: #52c41a;
    }
    &.c3{
        background: #d9d9d9;
    }
}
</style>