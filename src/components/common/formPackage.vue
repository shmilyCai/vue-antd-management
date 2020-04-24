<template>
    <div class="form-modal" >
        <a-form :form = "form">
            <a-form-item 
                v-bind = "formItemLayout" 
                v-for = "(value,key,index) in formConfig"  
                v-if = "!value.isHide"
                :class="{'form-span':value.type === 'span','form-row':!!formItemLayout.labelCol}" 
                :key = "index" 
                :extra = "value.exrta"
                :label="value.label">
                <a-input
                    v-if = "value.type === 'input'"
                    :placeholder = "value.placeholder || `请输入${value.label}`"
                    :maxLength = "value.maxLength || 30"
                    :disabled = "value.disabled"
                    v-decorator="[key,{rules: value.rules,},]"
                >
                    <span v-if = "!!value.unit" slot="suffix">{{value.unit}}</span>
                </a-input>
                <div class="relative" v-if = "value.type === 'inputNumber'">
                    <a-input-number
                        :placeholder = "value.placeholder || `请输入${value.label}`"
                        :min = "value.min || 1"
                        :max = "value.max || 9999"
                        maxLength = "2"
                        v-decorator="[key,{rules: value.rules,},]"
                    >
                    </a-input-number>
                    <span class="num-unit" v-if = "!!value.unit" >{{value.unit}}</span>
                </div>
                <a-row class="relative flex" v-if = "value.type === 'inputRange'">
                    <a-col span = "10">
                        <a-form-item>
                            <div class="relative">
                                <a-input-number
                                    :placeholder = "value.placeholder[0] || `请输入${value.label}`"
                                    :min = "value.min || 1"
                                    :max = "value.max || 999999"
                                    maxLength = "5"
                                    v-decorator="[value.code[0],{rules: value.rules,},]"
                                >
                                </a-input-number>
                                <span class="num-unit" v-if = "!!value.unit" >{{value.unit}}</span>
                            </div>
                        </a-form-item>    
                    </a-col>     
                    <a-col class="text-center" span = "4">
                        <span>至</span>
                    </a-col>
                    <a-col span = "10">
                        <a-form-item>
                            <div class="relative">
                                <a-input-number
                                    :placeholder = "value.placeholder[1] || `请输入${value.label}`"
                                    :min = "value.min || 1"
                                    :max = "value.max || 999999"
                                    maxLength = "5"
                                    v-decorator="[value.code[1],{rules: value.rules,},]"
                                >
                                </a-input-number>
                                <span class="num-unit" v-if = "!!value.unit" >{{value.unit}}</span>
                            </div>
                        </a-form-item>
                    </a-col>
                    <p v-if = "value.tips" class="range-tips">
                        {{value.tips}}
                    </p>
                </a-row>
                <a-textarea
                    class="textarea"
                    v-if = "value.type === 'textarea'"
                    :maxLength = "value.maxLength || 30"
                    :placeholder = "value.placeholder || `请输入${value.label}`"
                    v-decorator="[key,{rules: value.rules,},]"
                />
                <a-select
                    v-if = "value.type === 'select'"
                    :placeholder = "value.placeholder || `请选择${value.label}`"
                    @change = "onSelectChange(arguments,value)"
                    v-decorator="[key,{rules: value.rules,},]"
                >
                    <a-select-option v-for = "(item) in value.option" :currentItem = "item.currentItem" :key = "(item[value.optionValue] || item.value)+''" :value="(item[value.optionValue] || item.value)+''">
                        {{item[value.optionName] || item.name}}
                    </a-select-option>
                </a-select>
                <a-radio-group 
                    v-if = "value.type == 'radio'"
                    v-decorator="[
                                    key,
                                    {rules: value.rules},
                                ]"
                    >
                   <a-radio 
                        v-for = "(item) in value.option" 
                        :currentItem = "item.currentItem"
                         :key = "(item[value.optionValue] || item.value)+''" 
                         :value="(item[value.optionValue] || item.value)+''">
                        {{item[value.optionName] || item.name}}
                    </a-radio>
                </a-radio-group>
                <a-date-picker
                    @change = "onDateChange(key,arguments)"
                    v-if = "value.type === 'dateTimePicker'"
                    style = "width:100%"
                    :placeholder = "value.placeholder || `请输入${value.label}`"
                    v-decorator="[key,{rules: value.rules,normalize},]"
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                />
                <a-date-picker
                    @change = "onDateChange(key,arguments)"
                    v-if = "value.type === 'datePicker'"
                    style = "width:100%"
                    :placeholder = "value.placeholder || `请输入${value.label}`"
                    v-decorator="[key,{rules: value.rules,normalize},]"
                    format="YYYY-MM-DD"
                />
                <a-range-picker
                    @change = "onDateChange(key,arguments)"
                    v-if = "value.type === 'dateRangePicker'"
                    :disabledDate = "value.disabledDate"
                    style = "width:100%"
                    v-decorator="[key,{rules: value.rules,normalize},]"
                    format="YYYY-MM-DD"
                />
                <a-upload
                    v-if = "value.type === 'upload'"
                    v-decorator="[
                        key,
                        {
                            rules: value.rules,
                            valuePropName: 'fileList',
                            getValueFromEvent: normFile,
                        },
                    ]"
                    :action="uploadAction"
                    list-type="picture-card"
                >
                    <div v-if = "(form.getFieldValue(key) || []).length<1">
                        <a-icon type = "plus"/>
                        <div class="ant-upload-text">上传</div>
                    </div>
                </a-upload>
                <span v-if = "value.type === 'span'">{{formData[key] || '-'}}</span>
                <ul v-if = "value.type == 'template'">
                    <a-radio-group
                        class="flex"
                        v-decorator="[
                                    key,
                                    {rules: value.rules},
                                ]"
                        >
                        <li class="temp-li">
                            <a-radio 
                                value = "a"
                                class="temp-radio"></a-radio>
                        </li>
                        <li class="temp-li">
                            <a-radio 
                                value = "b"
                                class="temp-radio"></a-radio>
                        </li>
                    </a-radio-group>
                    
                </ul>
                <quillEditor 
                    v-if = "value.type == 'editor'"
                    :options = "Object.assign(editorOption,{placeholder:value.placeholder || `请输入${value.label}`})"
                    v-decorator="[
                                    key,
                                    {
                                        rules: value.rules,
                                        valuePropName: 'content',
                                        getValueFromEvent:editorNormalize,
                                    },
                                ]"
                    @change = "onEditorChange(key,$event)"
                    />
            </a-form-item>

        </a-form>
    </div>
</template>

<script>
import moment from "moment";
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import 'quill/dist/quill.core.js'
import 'quill/dist/quill.js'
import * as Quill from 'quill'
import { quillEditor } from 'vue-quill-editor'
import {defaultUrl} from "@http/request";
    export default {
        components:{
            quillEditor,
        },
        props:{
            formConfig:{//form配置
                type:Object,
                default:{}
            },
            formData:{//填充数据源
                type:Object,
                default:{}
            },
            formItemLayout:{//布局配置项
                type:Object,
                default:{}
            }
        },
        data(){
            return{
                uploadAction:defaultUrl+"/file/uploadFile",
                editorOption:{
                    theme: 'snow',
                    placeholder:"请输入...",
                    modules:{
                        toolbar:[
                            // ["bold",{ 'list': 'ordered'}],
                        ]
                    }
                },
                form:this.$form.createForm(this, { name: 'formpackage' })
            }
        },
        mounted(){
         
        },
        methods:{
            moment,
            onEditorChange(key,e){
                let obj = {};
                obj[key] = e.html;
                this.form.setFieldsValue(obj);
            },
           
            /**
             * 序列化上传那个文件
             */
            normFile(e) {
                if (Array.isArray(e)) {
                    return e;
                }
                let f = [];
                let fileList = e.fileList || [];
                fileList.map((item)=>{
                    if(item.response){
                        let {fileDownloadUrl,fileName} = item.response.data;
                        f.push({
                            url:fileDownloadUrl,
                            name:fileName,
                            uid:new Date().getTime(),
                        })
                    }else{
                        f.push(item)
                    }
                })
                return f;
            },
            /**
             * 下拉onChange事件
             */
            onSelectChange(args,value){
                let {currentItem} = args[1].data.attrs;
                let {onChange} = value;
                onChange && onChange(currentItem);
            },
            /**
             * 日期onChange事件
             */
            onDateChange(key,arg){
                this.formData[key] = arg[1];
            },
            /**
             * 序列化富文本
             */
            editorNormalize(value){
                if(value){
                    return value.html
                }
                return value;
                // return value.html;
            },
            /**
             * 序列化日期格式
             */
            normalize(value){
                if( typeof value == "string"){
                    return moment(value);
                }else if(Array.isArray(value)){
                    return value.map((item)=>moment(item));
                }
                return value;
            },
            /**
             * 暴露出去的获取formData方法
             */
            getFormData(cb){
                  
                this.form.validateFieldsAndScroll((err, fieldsValue)=>{
                    if(err){
                        return;
                    }
                    let {formConfig} = this;
                    for(let i in formConfig){
                        let {type} = formConfig[i];
                        if (type == "dateTimePicker"){
                            fieldsValue[i] = moment(fieldsValue[i]).format("YYYY-MM-DD HH:mm:ss");
                        }else if(type == "datePicker"){
                            fieldsValue[i] = moment(fieldsValue[i]).format("YYYY-MM-DD");
                        }else if(type == "dateRangePicker"){
                            fieldsValue[i] = fieldsValue[i].map((item)=>{
                                return moment(item).format("YYYY-MM-DD");
                            })
                        }else if(type == "upload"){
                            let s = [];
                            fieldsValue[i].map((item)=>{
                                s.push(item.url)
                            });
                            fieldsValue[i] = s.join(",");
                        }
                    }
                    cb && cb(Object.assign(fieldsValue));
                })
            }
        },
        watch:{
            formData(v){
                setTimeout(()=>{
                    let {formConfig} = this;
                    let obj = {};
                    for(let i in formConfig){
                        let {type,code} = formConfig[i];
                        if(type == "inputRange"){
                            obj[code[0]] = v[code[0]];
                            obj[code[1]] = v[code[1]];
                        } else if(type == "upload"){
                            if(v[i]){
                                let strArr = v[i].split(","),arr = [];
                                strArr.map((url)=>{
                                    let lastIndex = url.lastIndexOf("/");
                                    let name = url.substr(lastIndex+1);
                                    arr.push({
                                        uid:new Date().getTime(),
                                        name,
                                        url,
                                    })
                                })
                                obj[i] = arr;
                            }
                        }else if(type != "span"){
                            obj[i] = v[i];
                        }
                    };
                    this.formData = v;
                    this.form && this.form.setFieldsValue(obj);
                },0)
            }
        },
    }
</script>

<style lang="scss" scoped>
.temp-li{
    height:80px;
    width:80px;
    background: #f7f8fa;
    position: relative;
    margin-right: 30px;
    .temp-radio{
        position: absolute;
        right: 0px;
        top: 4px;
    }
}
.range-input{
    width: 120px;
}
.range-to{
    margin:0 20px;
}
.range-tips{
    margin-left: 20px;
    position: absolute;
    top: 30px;
    left: -20px;
    color: #999;
}
.textarea{
    resize: none;
    height:110px;
}
.num-unit{
    position: absolute;
    right:10px;
    top:0px;
}
</style>