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
                        <span>订单明细表</span>
                        <div>
                            <a-button icon = "export" @click = "onExport">
                                导出
                            </a-button>
                        </div>
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
</style>