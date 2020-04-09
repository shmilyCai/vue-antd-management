<template>
    <div class="table-list">
        <div class="">
            <slot name="handleBtn" :selectedRowKeys = "selectedRowKeys"></slot>
        </div>
        <div v-if = "isSelectRow" class="select-row">
            <a-icon class="tips-icon" type="exclamation-circle" theme="filled" />
            <span>已选择</span>
            <span class="selected-num">{{selectedRowKeys.length}}</span>
            <span>项</span>
            <a @click = "cancelSelected" class="cancel-selected">取消选中项</a>
        </div>
        <div class="list-wrapper">
            <a-table 
                :columns="columns" 
                :rowSelection = "isSelectRow?{selectedRowKeys,onChange:onSelectedChange}:null"
                :rowKey="(record,index) => index" 
                :dataSource="dataSource" 
                :pagination = "false"
                :loading="loading" 
                @change="handleTableChange">
                <template 
                    v-for = "(item) in columns" 
                    :slot="item.slot" 
                    slot-scope="text,record" >
                    <slot v-if="!!item.slot" :record = "record" :name = "item.slot"></slot>
                </template>
            </a-table>
            
        </div>
        <div class="p-footer">
            <a-pagination
                showSizeChanger
                showQuickJumper
                @showSizeChange="onShowSizeChange"
                @change="onPageChange"
                :total="pageInfo.total"
                :size="pageInfo.size+''"
                :current="pageInfo.current"
                />
        </div>
    </div>
</template>

<script>
export default {
    props:{
        pageInfo:{//分页信息
            type:Object,
            default:()=>{
                return {
                    current:1,
                    size:10,
                    total:0,
                }
            }
        },
        isSelectRow:{//是否显示选择行
            type:Boolean,
            default:true,
        },
        dataSource:{//数据源
            type:Array,
            default:()=>[],
        },
        columns:{//列数据
            type:Array,
            default:()=>[],
        }
       
    },
    data(){
        return{
            selectedRowKeys:[],
            loading:false,
        }
    },
    created(){
        this.columns.map((item)=>{
            if(!item.customRender && !item.scopedSlots){
                item.customRender = (text,)=>{
                    return text || "-"
                }
            }
        })
    },
    methods:{
        /**
         * 取消选中
         */
        cancelSelected(){
            this.selectedRowKeys = [];
        },
        /**
         * 列表选中事件
         */
        onSelectedChange(e){
            this.selectedRowKeys = e;
        },
        /**
         * 翻页事件
         */
        onPageChange(current){
            this.$emit("getList",{current});
        },
        /**
         * table header tab事件
         */
        handleTableChange(e){
            console.log(e)
        },
        /**
         * pageSize change 事件
         */
        onShowSizeChange(current,size){
            this.$emit("getList",{current,size});
        }
    }
};
</script>

<style lang="scss" scoped>
.table-list {
    margin-top: 10px;
    background: #fff;
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding:24px 24px 0 24px ;
    overflow: auto;
    .list-wrapper{
        display: flex;
        flex-direction: column;
        flex:1;
        overflow: auto;
    }
    .select-row {
        width: 100%;
        height: 36px;
        line-height: 36px;
        padding-left: 15px;
        background-color: rgba(#ece3db, 0.35);
        border-radius: 4px;
        border: solid 1px #c7b5a7;
        margin-bottom: 15px;
    }
    .tips-icon {
        color: #b08b70;
        margin-right: 5px;
    }
    .selected-num {
        color: #b08b70;
        margin: 0 5px;
    }
    .cancel-selected {
        margin-left: 35px;
    }
    .p-footer{
        display: flex;
        justify-content: flex-end;
        padding:20px 0;
    }
}
</style>