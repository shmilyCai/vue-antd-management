<template>
    <div class="content-wrapper">
        <table-list 
            @getList = "getList" 
            :isSelectRow = "false"
            :columns = "listColumns"
            :dataSource = "dataSource"
            :pageInfo = "pagination">
                <template  slot = "handleBtn" slot-scope="props">
                    <div class="table-label-row">
                        <span>客户分层表</span>
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
                <template slot = "opreation" slot-scope="props">
                    <a @click = "modifyFuc(props)">修改</a>
                    <a @click = "deleteFuc(props)">删除</a>
                </template>
                
        </table-list>
    </div>
</template>

<script>

import {listColumns} from "./formConfig";
import {listMixin} from "@mixins/listMixin";
import {listApi,listDeleteApi} from "@api"
    export default {
        mixins:[listMixin],
        data(){
            return{
                handleList:[
                    {name:"导出",icon:"export",handleFuc:"exportFuc"},
                ],
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
                    {id:"id1",priority:"",level:1,content:"消息内容",
                    user:"张哥",type:"模板1",verify_status:"待审核",
                    use_status:"已使用",
                    },
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
        }
    }
</script>

<style lang="scss" scoped>

</style>