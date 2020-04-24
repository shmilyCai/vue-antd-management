<template>
    <div class="search-wrapper">
        <div v-if = "Object.keys(searchConfigList).length>0" class="search-form">
            <a-form :form="form" class="search-header-form">
                <a-row :gutter="24" v-for="(item,index) in searchConfigList" v-if="index<1 || expand" :key="index">
                    <a-col :lg = "8" :xl = "8" :xxl = "6" v-for="(sItem,sIndex) in item" v-if="sIndex<currSize || expand" :key="sItem.key">
                        <a-form-item :label="sItem.label">
                            <a-input v-if="sItem.type == 'input'" :placeholder="`请输入${sItem.label}`" v-decorator="[sItem.key]"></a-input>
                            <a-date-picker v-if="sItem.type == 'datePicker'" :placeholder="`请选择${sItem.label}`" v-decorator="[sItem.key]" style="width: 100%" />
                            <a-range-picker v-if="sItem.type == 'dateRangePicker'"  v-decorator="[sItem.key]" style="width: 100%" />
                            <a-select v-if="sItem.type == 'select'" :placeholder="`请选择${sItem.label}`" v-decorator="[sItem.key]">
                                <a-select-option v-for="(ssItem,index) in sItem.option" :key="index" :value="ssItem.value">
                                    {{ssItem.name}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <!-- <a-col :span="6" v-if="!expand">
                        <div class="search-btn-row">
                            <a-button type="primary" @click="onSearch" class="m-r-10">筛选</a-button>
                            <a-button class="m-r-10" @click="onReset">重置</a-button>
                            <a v-if="backupSearchConfigList.length>3" @click="toggleExpand">
                                展开
                                <a-icon :type="expand ? 'up' : 'down'" />
                            </a>
                        </div>
                    </a-col> -->
                </a-row>
            </a-form>
        </div>
        <div class="handle-btn-row">
            <!-- <div class="">
                <slot name="handleBtn"></slot>
            </div> -->
            <div>
                <div  class="handle-btn-wrapper">
                    <a-button type="primary" @click="onSearch" class="m-r-10">筛选</a-button>
                    <a-button class="m-r-10" @click="onReset">重置</a-button>
                    <a v-if="backupSearchConfigList.length>currSize" @click="toggleExpand">
                        {{expand?"收起":"展开"}}
                        <a-icon :type="expand ? 'up' : 'down'" />
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { chunkArr } from "@utils";
import moment from "moment";
export default {
    props: {
        searchConfig: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            form: this.$form.createForm(this, { name: "searchHeader" }),
            searchConfigList: [], //搜索栏配置文件
            backupSearchConfigList: [], //备份所有的搜索栏配置数组
            expand: false, //是否展开多余项
            currSize:4,//记录当前search显示4行还是3行。
        };
    },
    created() {
        this.initConfig();
    },
    methods: {
        /**
         * 初始化header配置
         */
        initConfig() {
            let { searchConfig } = this;
            let arr = [];
            for (let i in searchConfig) {
                searchConfig[i].key = i;
                arr.push(searchConfig[i]);
            }
            let s = document.body.clientWidth>=1600?4:3;
            this.backupSearchConfigList = arr;
            this.searchConfigList = chunkArr(arr, s);
            this.currSize = s;
        },
        toggleExpand() {
            this.expand = !this.expand;
        },
        /**
         * 搜索
         */
        onSearch(e) {
            e.preventDefault();
            this.form.validateFieldsAndScroll((err, fieldsValue) => {
                if (!err) {
                    let {searchConfig} = this;
                    for(let i in searchConfig){
                        let {type,codeName} = searchConfig[i];
                        if(type == "dateRangePicker"){
                            if(fieldsValue[i]){
                                fieldsValue[codeName[0]] = moment(fieldsValue[i][0]).format("YYYY-MM-DD");
                                fieldsValue[codeName[1]] = moment(fieldsValue[i][1]).format("YYYY-MM-DD");
                                delete fieldsValue[i];
                            }
                            
                            // fieldsValue[i] = fieldsValue[i].map((item)=>{
                            //     return moment(item).format("YYYY-MM-DD");
                            // })
                        }
                    }
                    console.log("查询参数: ", fieldsValue);
                    fieldsValue.current = 1;
                    this.$emit("search", fieldsValue);
                }
            });
        },
        /**
         * 重置
         */
        onReset() {
            this.form.resetFields();
            let { searchConfig = {} } = this;
            let keys = Object.keys(searchConfig) || [];
            let re = {};
            keys.map((key, index) => {
                re[key] = undefined;
            });
            re.current = 1;
            this.$emit("search", re);
        }
    },
    watch: {
        searchConfig: {
            handler(v, ov) {
                this.initConfig();
            },
            deep: true
        }
    }
};
</script>

<style lang="scss">
.search-btn-row {
    margin-left: 15px;
    padding-top: 4px;
}
.search-form{
    margin-bottom: 10px;
    flex:1;
    width: 0;
    .ant-form-item{
        margin-bottom: 15px;
    }
}
.handle-btn-row {
    // display: flex;
    // align-items: center;
    // justify-content: space-between;
}
.search-wrapper{
    padding:24px 24px 0 24px;
    background: #fff;
    display: flex;
}
.handle-btn-wrapper{
    height:40px;
    line-height: 40px;
    padding-left: 24px;
}
</style>