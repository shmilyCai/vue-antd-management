

export const getModifyPwdConfig = ($this)=>{
    let validateToNextPassword = (rule,value,callback)=>{
        let form = $this.$refs["modifyPwdModal"].form;

        if (value) {
            form.validateFields(['password'], { force: true });
          }
          callback();
    };
    let compareToFirstPassword = (rule,value,callback)=>{
        let form = $this.$refs["modifyPwdModal"].form;

        if (value && value !== form.getFieldValue('newPassword')) {
            callback('2次密码不一致');
          } else {
            callback();
          }
    };
    let config = {
        oldPassword:{
            label:"旧密码",
            type:"password",
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