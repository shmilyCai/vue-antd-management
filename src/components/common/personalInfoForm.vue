<template>
    <div class="personal-form" >
        <a-form :form = "form">
            <a-row>
                <a-col
                    v-for = "(value,key,index) in formConfig"
                    :key = "index"
                    class="form-col"
                    :class="{'personal-upload':value.type == 'uploadLogo','info-list':type == 'infoList','start-picker':value.type =='startEndtPicker'}"
                    :span = "value.span || 6">
                    <a-form-item 
                        :extra = "value.exrta"
                        :colon = "false"
                        :required = "(value.rules && !value.noRequired)?true:undefined"
                        :class = "{'input-radio-item':value.type == 'inputRadio'}"
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
                                :min = "value.min || 0"
                                :max = "value.max || 9999"
                                :precision = "value.precision==0?0:2"
                                v-decorator="[key,{rules: value.rules,},]"
                            >
                            </a-input-number>
                            <span class="num-unit" v-if = "!!value.unit" >{{value.unit}}</span>
                        </div>
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
                            <a-select-option v-for = "(item) in value.option" :currentItem = "{name:item[value.optionName] || item.name,value:item[value.optionValue] || item.value}" :key = "(item[value.optionValue] || item.value)+''" :value="(item[value.optionValue] || item.value)+''">
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
                        <a-checkbox-group 
                            v-if = "value.type == 'checkbox'"
                            v-decorator="[
                                            key,
                                            {rules: value.rules},
                                        ]"
                            >
                            <a-checkbox 
                                v-for = "(item) in value.option" 
                                :currentItem = "item.currentItem"
                                :key = "(item[value.optionValue] || item.value)+''" 
                                :value="(item[value.optionValue] || item.value)+''">
                                {{item[value.optionName] || item.name}}
                            </a-checkbox>
                        </a-checkbox-group>
                        <div v-if = "value.type == 'inputRadio'" class="input-radio">
                            <a-form-item v-for = "(item,itemKey,index) in value.options"  :key = "index">
                                <div v-if = "item.type == 'inputNumber'" class="relative flex">
                                    <label>{{item.label}}：</label>
                                    <div>
                                        <a-input-number
                                            :placeholder = "item.placeholder"
                                            :min = "item.min || 1"
                                            :max = "item.max || 999999"
                                            :precision = "0"
                                            maxLength = "5"
                                            class="radio-input"
                                            v-decorator="[itemKey,{rules: item.rules,},]"
                                        >
                                        </a-input-number>
                                    </div>
                                    <span class="num-unit" v-if = "!!item.unit" >{{item.unit}}</span>
                                </div>
                                <div v-if = "item.type == 'input'" class="relative flex">
                                    <label>{{item.label}}：</label>
                                    <div>
                                        <a-input
                                            :placeholder = "item.placeholder"
                                            :maxLength = "item.maxLength || 30"
                                            :disabled = "item.disabled"
                                            class="radio-input"
                                            v-decorator="[itemKey,{rules: item.rules,},]"
                                        >
                                        </a-input>
                                    </div>
                                </div>
                                <div v-if = "item.type == 'radio'">
                                    <label v-if = "item.label">{{item.label}}：</label>
                                    <a-radio-group 
                                        
                                        v-decorator="[
                                                        itemKey,
                                                        {rules: item.rules},
                                                    ]"
                                        >
                                        <a-radio 
                                            v-for = "(sItem) in item.option" 
                                            :currentItem = "item.currentItem"
                                            :key = "(sItem[item.optionValue] || sItem.value)+''" 
                                            :value="(sItem[item.optionValue] || sItem.value)+''">
                                            {{sItem[item.optionName] || sItem.name}}
                                        </a-radio>
                                    </a-radio-group>
                                </div>
                                <div v-if = "item.type == 'checkbox'">
                                    <label v-if = "item.label">{{item.label}}：</label>
                                    <a-checkbox-group 
                                        
                                        v-decorator="[
                                                        itemKey,
                                                        {rules: item.rules},
                                                    ]"
                                        >
                                        <a-checkbox 
                                            v-for = "(sItem) in item.option" 
                                            :currentItem = "item.currentItem"
                                            :key = "(sItem[item.optionValue] || sItem.value)+''" 
                                            :value="(sItem[item.optionValue] || sItem.value)+''">
                                            {{sItem[item.optionName] || sItem.name}}
                                        </a-checkbox>
                                    </a-checkbox-group>
                                </div>
                            </a-form-item>
                        </div>
                        <a-date-picker
                            @change = "onDateChange(value,key,arguments)"
                            v-if = "value.type === 'dateTimePicker'"
                            style = "width:100%"
                            :placeholder = "value.placeholder || `请选择${value.label}`"
                            v-decorator="[key,{rules: value.rules,normalize},]"
                            show-time
                            format="YYYY-MM-DD HH:mm:ss"
                        />
                        <a-date-picker
                            @change = "onDateChange(value,key,arguments)"
                            v-if = "value.type === 'datePicker'"
                            style = "width:100%"
                            :disabledDate = "value.disabledDate"
                            :placeholder = "value.placeholder || `请选择${value.label}`"
                            v-decorator="[key,{rules: value.rules,normalize},]"
                            format="YYYY-MM-DD"
                        />
                        <a-range-picker
                            @change = "onDateChange(value,key,arguments)"
                            v-if = "value.type === 'dateRangePicker'"
                            :disabledDate = "value.disabledDate"
                            style = "width:100%"
                            v-decorator="[key,{rules: value.rules,normalize},]"
                            format="YYYY-MM-DD"
                        />
                        <a-upload
                            v-if = "value.type === 'uploadLogo'"
                            v-decorator="[
                                key,
                                {
                                    rules: value.rules,
                                    valuePropName: 'fileList',
                                    getValueFromEvent: normFile,
                                },
                            ]"
                            :action="uploadAction"
                            :beforeUpload = "(file)=>{ return handleBeforeUpload(file,value)}"
                            list-type="picture-card"
                        >
                            <div v-if = "(form.getFieldValue(key) || []).length<1">
                                <!-- <a-icon type = "plus"/> -->
                                <img class="default-upload-img" :src="defaultUploadImg" alt="">
                            </div>
                        </a-upload>
                        <a-upload
                            v-if = "value.type === 'listUpload'"
                            @change = "onUploadChange($event,value)"
                            v-decorator="[
                                key,
                                {
                                    rules: value.rules,
                                    valuePropName: 'fileList',
                                    getValueFromEvent: (f)=>normFile(f,value),
                                },
                            ]"
                            :action="uploadAction"
                            :beforeUpload = "(file)=>{ return handleBeforeUpload(file,value)}"
                        >
                            <div v-if = "(form.getFieldValue(key) || []).length<3">
                                <a-button> <a-icon type="upload" /> 附件上传 </a-button>
                            </div>
                        </a-upload>
                        <a-row class="relative  flex" v-if = "value.type === 'startEndtPicker'">
                            <a-col span = "10">
                                <a-form-item>
                                    <div class="relative">
                                        <a-month-picker
                                            :disabledDate="(d)=>disabledStartDate(d,value.code[1])"
                                            :placeholder = "value.placeholder[0] || `请输入${value.label}`"
                                            v-decorator="[value.code[0],{rules: value.rules[0],},]"
                                        />
                                    </div>
                                </a-form-item>    
                            </a-col>     
                            <a-col class="text-center" span = "4">
                                <span>至</span>
                            </a-col>
                            <a-col span = "10">
                                <a-form-item>
                                    <div class="relative">
                                        <a-month-picker
                                            :ref = "`monthPicker${value.code[1]}`"
                                            :disabledDate="(d)=>disabledEndDate(d,value.code[0])"
                                            :placeholder = "value.placeholder[1] || `请输入${value.label}`"
                                            @change = "onMonthDateChange(value.code[1])"
                                            :open = "flagObj[`${value.code[1]}Open`]"
                                            @openChange = "onMonthDateOpenChange($event,value.code[1])"
                                            v-decorator="[value.code[1],{rules: value.rules[1],},]"
                                        >
                                            <template slot="renderExtraFooter">
                                                <a @click = "onAt(value.code[1])" class="on-at-yet">至今</a>
                                            </template>
                                        </a-month-picker>
                                        <span v-show = "!!flagObj[value.code[1]]" class="at-yet">
                                            至今
                                        </span>
                                    </div>
                                </a-form-item>
                            </a-col>
                            <p v-if = "value.tips" class="range-tips">
                                {{value.tips}}
                            </p>
                        </a-row>
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
                </a-col>
            </a-row>
            

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
import defaultUploadImg from "@assets/upload-user.png";
import {deepCopy} from "@utils";
    export default {
        components:{
            quillEditor
        },
        props:{
            formConfig:{//form配置
                type:Object,
                default:{}
            },
            type:null,
            formData:{//填充数据源
                type:Object,
                default:function(){
                    return {}
                }
            },
        },
        data(){
            return{
                uploadAction:defaultUrl+"/file/uploadFile",
                editorOption:{
                    theme: 'snow',
                    placeholder:"请输入...",
                    modules:{
                        toolbar:[
                            ["bold",{ 'list': 'ordered'}],
                        ]
                    }
                },
                form:this.$form.createForm(this, { name: 'formpackage' }),
                defaultUploadImg,
                flagObj:{},//flag
                selectObj:{},//记录选择的下拉选项

            }
        },
        mounted(){
            // this.initFormData();
        },
        methods:{
            /**
             * 暴露出去的设置form的方法
             */
            setFormData(obj){
                this.form && this.form.setFieldsValue(obj);
            },
            moment,
            /**
             * 初始化form表单数据
             */
            initFormData(){
                let {formConfig,formData} = this;
                let deepData = deepCopy(formData);
                let obj = {};
                for(let i in formConfig){
                    let {type,code} = formConfig[i];
                    if(type == "startEndtPicker"){
                        code.map((item)=>{
                            if(deepData[item] == "至今"){
                                obj[item] = deepData[item]?moment(moment().format("YYYY-MM")):undefined;
                                this.flagObj[item] = true;
                            }else {
                                this.flagObj[item] = false;
                                obj[item] = deepData[item]?moment(deepData[item],"YYYY-MM"):undefined;
                            }
                        })

                    }else if(type != "span"){
                        obj[i] = deepData[i];
                    }
                };
                this.form && this.form.setFieldsValue(obj);
                this.$forceUpdate();
            },
            onEditorChange(key,e){
                let obj = {};
                obj[key] = e.html;
                this.form.setFieldsValue(obj);
            },
            /**
             * month日历选择框onChange事件
             */
            onMonthDateChange(code){
                this.flagObj[code] = false;
            },
            /**
             * 为了处理日历选择框弹出问题。
             */
            onMonthDateOpenChange(e,code){
                this.flagObj[`${code}Open`] = e;
                this.$forceUpdate();
            },
            onAt(code){
                this.flagObj[code] = true;
                this.flagObj[`${code}Open`] = false;
                this.form.setFieldsValue({[code]:moment(moment().format("YYYY-MM"))});
                this.$forceUpdate();
            },
            /**
             * 不能选择的开始时间。
             */
            disabledStartDate(startValue,code) {
                const nextMonth = moment(moment().add(1, 'months').format("YYYY-MM"), "YYYY-MM")
                const endValue = this.form.getFieldValue(code);
                if (!startValue || !endValue) {
                    return startValue >= nextMonth;
                }
                return startValue.valueOf() > endValue.valueOf() || startValue >= nextMonth;
            },
            /**
             * 不能选择的结束时间。
             */
            disabledEndDate(endValue,code) {
                // const startValue = this.startValue;
                const nextMonth = moment(moment().add(1, 'months').format("YYYY-MM"), "YYYY-MM")

                const startValue = this.form.getFieldValue(code);
                if (!endValue || !startValue) {
                    return endValue >= nextMonth;
                }
                return startValue.valueOf() >= endValue.valueOf() || endValue >= nextMonth;
            },
            /**
             * 上传onChange
             */
            onUploadChange(f,value){
                let {file,fileList} = f;
                if(file.status == "done" || file.status == "removed"){
                    value.callback && value.callback(fileList);
                }
            },
             /**
             * 上传前的钩子函数
             */
            handleBeforeUpload(file,item){
                let {type,size,name} = file;
                let {uploadType = "image",maxSize = 1} = item;
                let typeObj = {
                    image:{reg:/.jpg|.jpeg|.png|.bmp/i,fileType:"图片"},
                    pdfDoc:{reg:/.pdf|.doc|.docx/i,fileType:"pdf或doc"},
                }
                let suffixStr = name.substring(name.lastIndexOf("."));
                if(!suffixStr.match(typeObj[uploadType].reg)){
                    this.$message.warning(`请上传正确的${typeObj[uploadType].fileType}格式`);
                    return false;
                }
                let fileSize = size/1024/1024;
                if(fileSize>maxSize){
                    this.$message.warning(`最大支持${maxSize}M文件上传`);
                    return false;
                }
                Promise.resolve(true);
            },
            /**
             * 序列化上传那个文件
             */
            normFile(e,value) {
                if (Array.isArray(e)) {
                    return e;
                }
                let f = [];
                let fileList = e.fileList || [];
                fileList.map((item)=>{
                    if(item.response){
                        let {fileDownloadUrl,fileName} = item.response.data;
                        f.push({
                            url:defaultUrl+"/file/downloadFile/"+fileName,
                            name:fileName,
                            uid:item.uid,
                            status:item.status,
                        })
                    }else if(item.status || item.url){
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
                let {onChange,selectedName} = value;
                if(selectedName){
                    this.selectObj[selectedName] = currentItem.name;
                }
                onChange && onChange(currentItem);
            },
            /**
             * 日期onChange事件
             */
            onDateChange(item,key,arg){
                this.formData[key] = arg[1];
                item.onChange && item.onChange(arg[1]);
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
                        let {type,code,selectedName} = formConfig[i];
                        if (type == "dateTimePicker"){
                            fieldsValue[i] = moment(fieldsValue[i]).format("YYYY-MM-DD HH:mm:ss");
                        }else if(type == "datePicker"){
                            fieldsValue[i] = moment(fieldsValue[i]).format("YYYY-MM-DD");
                        }else if(type == "dateRangePicker"){
                            fieldsValue[i] = fieldsValue[i].map((item)=>{
                                return moment(item).format("YYYY-MM-DD");
                            })
                        }else if(type == "startEndtPicker"){
                            code.map((item)=>{
                                if(this.flagObj[item]){
                                    fieldsValue[item] = "至今"
                                }else{
                                    fieldsValue[item] = moment(fieldsValue[item]).format("YYYY-MM");
                                }
                            })
                            // fieldsValue[i] = fieldsValue[i].map((item)=>{
                            //     console.log(item,"dddd")
                            //     return moment(item).format("YYYY-MM-DD");
                            // })
                        }else if(type == "uploadLogo" || type == "listUpload"){
                            let s = [];
                            fieldsValue[i].map((item)=>{
                                s.push(item.name)
                            });
                            fieldsValue[i] = s.join(",");
                        }else if(type == "select"){
                            if(selectedName && this.selectObj[selectedName]){
                                fieldsValue[selectedName] = this.selectObj[selectedName]
                            }
                        }
                    }
                    console.log(this.formData)
                    this.selectObj = {};
                    cb && cb(deepCopy(Object.assign(this.formData,fieldsValue)));
                })
            }
        },
        watch:{
            formData(v){
                this.formData = v;
                this.initFormData();
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
    // height:110px;
}
.num-unit{
    position: absolute;
    right:10px;
    top:0px;
}
.form-col{
    margin-right: 30px;
}
.personal-upload{
    width: 112px;
    position: absolute;
    right: -15px;
}
.default-upload-img{
    height:112px;
    width:112px;
    border-radius: 50%;
}
.at-yet{
    pointer-events: none;
    cursor: pointer;
    position: absolute;
    line-height: 26px;
    width: 100px;
    left: 5px;
    top: 7px;
    background: #fff;
    text-align: center;
}
.on-at-yet{
    display: block;
    text-align: center;
}
.info-list{
    margin-right: 0px;
    &:nth-child(odd){
        margin-right: 40px;
    }
}
.num-unit{
    position: absolute;
    right:10px;
    top:0px;
}
.input-radio{
    // border:1px solid #d9d9d9;
    display: flex;
}
.input-radio-item{
    margin-bottom: 0px;
}
.input-upload-button{
    // height: 26px;
    // width: 48px;
    // position: absolute;
    // cursor: pointer;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    // /* top: 0; */
    // right: 1px;
    // top: 6px;
    // background: #fff;
    // input{
    //     opacity: 0;
    //     z-index: 0;
    //     height: 32px;
    //     width: 48px;
    //     position: absolute;
    //     top: 0;
    // }
}
/**
给个固定宽度解决ie下，宽度变化的bug。
 */
.radio-input{
    width: 194px;
}
</style>