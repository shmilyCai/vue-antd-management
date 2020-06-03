<template>
    <a-modal
        :title = "modalTitle"
        :footer = "null"
        :visible = "visible"
        v-if = "visible"
        @cancel = "onClose"
        >
        <div class="form-modal">
            <a-form :form = "form">
                <a-form-item 
                    v-bind="formItemLayout"
                    v-for = "(value,key,index) in formConfig"  
                    :class="{'form-span':value.type === 'span','form-row':!!formItemLayout.labelCol}" 
                    :key = "index" 
                    :label="value.label">
                    <a-input
                        v-if = "value.type === 'input'"
                        :maxLength = "value.maxLength || 30"
                        :placeholder = "value.placeholder || `请输入${value.label}`"
                        v-decorator="[key,{rules: value.rules,},]"
                    />
                    <a-input-password
                        v-if = "value.type === 'password'"
                        :maxLength = "value.maxLength || 30"
                        :placeholder = "value.placeholder || `请输入${value.label}`"
                        v-decorator="[key,{rules: value.rules,},]"
                    />
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
                    <a-textarea
                        v-if = "value.type === 'textarea'"
                        :maxLength = "value.maxLength || 30"
                        :placeholder = "value.placeholder || `请输入${value.label}`"
                        v-decorator="[key,{rules: value.rules,},]"
                    />
                    <a-range-picker
                        @change = "onDateChange(key,arguments)"
                        v-if = "value.type === 'dateRangePicker'"
                        :disabledDate = "value.disabledDate"
                        style = "width:100%"
                        v-decorator="[key,{rules: value.rules,dateNormalize},]"
                        format="YYYY-MM-DD"
                    />
                    <!-- <a-input
                        type = "password"
                        :maxLength = "value.maxLength || 30"
                        :placeholder = "value.placeholder || `请输入${value.label}`"
                        v-if = "value.type === 'password'"
                        v-decorator="[key,{rules: value.rules,},]"
                    /> -->
                    <a-select
                        v-if = "value.type === 'select'"
                        :placeholder = "value.placeholder || `请选择${value.label}`"
                        v-decorator="[key,{rules: value.rules,},]"
                    >
                        <a-select-option v-for = "(item) in value.option" :key = "item.value" :value="item.value">
                            {{item.name}}
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
                    <span v-if = "value.type === 'span'">{{formData[key] || '-'}}</span>
                </a-form-item>
            </a-form>
            <slot></slot>    
            <div class="footer-row">
                <a-button @click = "submit" type = "primary">确定</a-button>
                <a-button @click = "onClose">取消</a-button>
            </div>
        </div>
    </a-modal>
</template>

<script>
import moment from "moment";
    export default {
        props:{
            formConfig:{
                type:Object,
                default:()=>{
                    return {}
                }
            },
            formData:{
                type:Object,
                default:()=>{
                    return {}
                }
            },
            formItemLayout:{
                type:Object,
                default:()=>{
                    return {}
                }
            },
            visible:{
                type:Boolean,
                default:false
            },
            title:{
                type:String,
            },
            fixedTitle:{//是否是固定title
                type:Boolean,
                default:false,
            }
        },
        data(){
            return{
                form:this.$form.createForm(this, { name: 'formModal' }),
                modalTitle:this.title,
            }
        },
        created(){
            if(!this.fixedTitle){
                this.modalTitle = `新增${this.modalTitle}`;
            }
        },
        watch:{
            formData(v){
                setTimeout(()=>{
                    let {formConfig} = this;
                    let obj = {};
                    for(let i in formConfig){
                        let {type,codeName} = formConfig[i];
                        if(type != "span"){
                            if(type === "dateRangePicker"){
                                if(v[codeName[0]]){
                                    v[i] = [moment(v[codeName[0]]),moment(v[codeName[1]])];
                                }
                            }
                            obj[i] = v[i];
                        }
                    };
                    this.formData = v;
                    this.form && this.form.setFieldsValue(obj);
                    if(!this.fixedTitle){
                        let type = Object.keys(v).length?"编辑":"新增";
                        this.modalTitle = `${type}${this.title}`;
                    }
                },0)
            }
        },
        methods:{
            onClose(){
                this.$emit("onClose");
            },
            /**
             * 序列化日期格式
             */
            dateNormalize(value){
                if( typeof value == "string"){
                    return moment(value);
                }else if(Array.isArray(value)){
                    return value.map((item)=>moment(item));
                }
                return value;
            },
             /**
             * 日期onChange事件
             */
            onDateChange(key,arg){
                this.formData[key] = arg[1];
            },
            /**
             * 表单提交
             */
            submit(e){
                e.preventDefault();
                this.form.validateFields((err, fieldsValue) => {
                    if (!err) {
                        let {formConfig} = this;
                        for(let i in formConfig){
                            let {type,codeName} = formConfig[i];
                            if (type == "dateTimePicker"){
                                fieldsValue[i] = moment(fieldsValue[i]).format("YYYY-MM-DD HH:mm:ss");
                            }else if(type == "datePicker"){
                                fieldsValue[i] = moment(fieldsValue[i]).format("YYYY-MM-DD");
                            }else if(type == "dateRangePicker"){
                                if(fieldsValue[i]?.length){
                                    fieldsValue[codeName[0]] = moment(fieldsValue[i][0]).format("YYYY-MM-DD");
                                    fieldsValue[codeName[1]] = moment(fieldsValue[i][1]).format("YYYY-MM-DD");
                                    delete fieldsValue[i];
                                }else{
                                    fieldsValue[codeName[0]] = undefined;
                                    fieldsValue[codeName[1]] = undefined;
                                }
                            }
                        }
                        this.$emit("onSubmit",Object.assign(fieldsValue));
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
.form-modal{
    padding:6px 40px;
    .footer-row{
        display: flex;
        justify-content: flex-end;
        padding-top: 15px;
        button{
            margin-right: 12px;
            &:last-child{
                margin-right: 0;
            }
        }
    }
}
</style>