<template>
    <div class="form-modal" >
        <a-form :form = "form">
            <a-form-item 
                v-bind = "formItemLayout" 
                v-for = "(value,key,index) in formConfig"  
                :class="{'form-span':value.type === 'span','form-row':!!formItemLayout.labelCol}" 
                :key = "index" 
                :label="value.label">
                <a-input
                    v-if = "value.type === 'input'"
                    :placeholder = "value.placeholder || `请输入${value.label}`"
                    v-decorator="[key,{rules: value.rules,},]"
                />
                <a-select
                    v-if = "value.type === 'select'"
                    :placeholder = "value.placeholder || `请选择${value.label}`"
                    v-decorator="[key,{rules: value.rules,},]"
                >
                    <a-select-option v-for = "(item) in value.option" :key = "item.value" :value="item.value">
                        {{item.name}}
                    </a-select-option>
                </a-select>
                <a-date-picker
                    @change = "onDateChange(key,arguments)"
                    v-if = "value.type === 'dateTimePicker'"
                    style = "width:100%"
                    v-decorator="[key,{rules: value.rules,normalize},]"
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                />
                <a-date-picker
                    @change = "onDateChange(key,arguments)"
                    v-if = "value.type === 'datePicker'"
                    style = "width:100%"
                    v-decorator="[key,{rules: value.rules,normalize},]"
                    format="YYYY-MM-DD"
                />
                <a-upload
                    v-if = "value.type === 'upload'"
                    v-decorator="[
                        key,
                        {
                            valuePropName: 'fileList',
                            getValueFromEvent: normFile,
                        },
                    ]"
                    name="logo"
                    action="/upload.do"
                    list-type="picture"
                >
                    <a-button> <a-icon type="upload" /> Click to upload </a-button>
                </a-upload>
                <span v-if = "value.type === 'span'">{{formData[key] || '-'}}</span>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
import moment from "moment";
    export default {
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
                form:this.$form.createForm(this, { name: 'formpackage' })
            }
        },
        methods:{
            moment,
             normFile(e) {
                console.log('Upload event:', e);
                if (Array.isArray(e)) {
                    return e;
                }
                return e && e.fileList;
            },
            onDateChange(key,arg){
                this.formData[key] = arg[1];
            },
            normalize(value){
                if( typeof value == "string"){
                    return moment(value);
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
                    cb && cb(Object.assign(fieldsValue,this.formData));
                })
            }
        },
        watch:{
            formData(v){
                setTimeout(()=>{
                    let {formConfig} = this;
                    let obj = {};
                    for(let i in formConfig){
                        if(formConfig[i].type != "span"){
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

</style>