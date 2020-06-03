

import {invalid} from "@utils/regExp";
export const getModifyPwdConfig = ($this)=>{
    let validateToNextPassword = (rule,value,callback)=>{
        let form = $this.$refs["modifyPwdModal"].form;

        if (value) {
            if(!invalid.accountReg.test(value)){
                callback("密码由6~20位字母和数字组成");
            }else if(invalid.numReg.test(value)){
                callback("密码不能是纯数字")
            }else if(value === form.getFieldValue('oldPassword')){
                callback("新密码不能和原密码一样")
            }else{
                form.validateFields(['password'], { force: true });
            }
          }
          callback();
    };
    let compareToFirstPassword = (rule,value,callback)=>{
        let form = $this.$refs["modifyPwdModal"].form;

        if (value && value !== form.getFieldValue('newPassword')) {
            callback('2次密码不一致,请重新输入');
          } else {
            callback();
          }
    };
    let config = {
        oldPassword:{
            label:"旧密码",
            type:"password",
            maxLength:20,
            rules:[
                {
                    required: true,
                    message: '请输入旧密码',
                },
            ]
    
        },
        newPassword:{
            label:"新密码",
            type:"password",
            maxLength:20,
            rules: [
                {
                    required: true,
                    message: '请输入新密码',
                },
                {
                    validator: validateToNextPassword,
                },
            ],
        },
        password:{
            label:"确认密码",
            type:"password",
            maxLength:20,
            rules: [
                {
                    required: true,
                    message: '请输入确认密码',
                },
                {
                    validator: compareToFirstPassword,
                },
            ],
        },
    }
    return config;
}