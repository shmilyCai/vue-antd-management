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
                        <div>活动列表</div>
                        <div>
                            <a-button icon = "export" @click = "onExport(props)">
                                导出
                            </a-button>
                        </div>
                    </div>
                </template>
                <template slot = "activityStatus" slot-scope="props">
                    <div class="item-center">
                        <span class="circle c2"></span>
                        {{getactivityStatusStr(props)}}
                    </div>
                </template>
                <template slot="masterMap" slot-scope="props">
                    <div>
                        <img @click = "onPreviewImage(props)" class="master-img" src="../../assets/photo.jpg" alt="">
                    </div>
                </template>
                <template slot = "opreation" >
                    <a-button>
                        上线
                    </a-button>
                </template>
        </table-list>
        <add-modal 
            :formData = "formData" 
            :visible = "formModalVisible"
            :formConfig = "formConfig"
            @onClose = "formModalVisible = false"
            />
        <a-modal :visible = "previewVisible" :footer = "null" @cancel = "previewVisible = false">
            <img :src="currentImg" class="preview-img" alt="">
        </a-modal>
    </div>
</template>

<script>

import {searchConfig,listColumns,formModalConfig} from "./formConfig";
import {listMixin} from "@mixins/listMixin";
import {listApi,listDeleteApi} from "@api"
import testImg from "@assets/photo.jpg";
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
                },
                currentImg:null,//当前预览图片
                previewVisible:false,//是否显示预览图片modal。
            }
        },
        created(){
            this.dataSource = [
                {activityStatus:1}
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
            getactivityStatusStr(props){
                return "在线"
            },
            /**
             * 查看大图
             */
            onPreviewImage(){
                this.previewVisible = true;
                this.currentImg = testImg;
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
.master-img{
    height:40px;
    width: 40px;
    border-radius: 4px;
}
.preview-img{
    max-height: 500px;
    max-width: 500px;
    margin: 0 auto;
}
</style>