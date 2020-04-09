<template>
    <a-modal
        :title = "'新增'"
        :footer = "null"
        :visible = "visible"
        @cancel = "onClose"
        >
        <div class="form-modal">
            <a-form :form = "form">
                <a-form-item v-for = "(value,key,index) in formConfig"  :class="{'form-span':value.type === 'span'}" :key = "index" :label="value.label">
                    <a-input
                        v-if = "value.type === 'input'"
                        :maxLength = "value.maxLength || 30"
                        :placeholder = "value.placeholder || `请输入${value.label}`"
                        v-decorator="[key,{rules: value.rules,},]"
                    />
                    <a-textarea
                        v-if = "value.type === 'textarea'"
                        :maxLength = "value.maxLength || 30"
                        :placeholder = "value.placeholder || `请输入${value.label}`"
                        v-decorator="[key,{rules: value.rules,},]"
                    />
                    <a-input
                        type = "password"
                        :maxLength = "value.maxLength || 30"
                        :placeholder = "value.placeholder || `请输入${value.label}`"
                        v-if = "value.type === 'password'"
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
                    <span v-if = "value.type === 'span'">{{formData[key] || '-'}}</span>
                </a-form-item>
            </a-form>
            <div class="footer-row">
                <a-button @click = "submit" type = "primary">确定</a-button>
                <a-button @click = "onClose">取消</a-button>
            </div>
        </div>
    </a-modal>
</template>

<script>
    export default {
        props:{
            formConfig:{
                type:Object,
                default:{}
            },
            formData:{
                type:Object,
                default:{}
            },
            visible:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return{
                form:this.$form.createForm(this, { name: 'formModal' })
            }
        },
        created(){
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
        methods:{
            onClose(){
                this.$emit("onClose");
            },
            /**
             * 表单提交
             */
            submit(e){
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log(values,"vvv")
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
.form-modal{
    padding:6px 56px;
    .footer-row{
        display: flex;
        justify-content: flex-end;
        margin-top: 30px;
        button{
            margin-right: 12px;
            &:last-child{
                margin-right: 0;
            }
        }
    }
}
</style>