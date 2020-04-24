import {
    mailValid,
    idCardValid,
    phoneValid,
    accountValid,
} from "@utils/validator";
export const getBaseInfoFormConfig = ()=>{
    let config = {
        phone:{
            label:"手机号码",
            type:"input",
            maxLength:11,
            span:12,
            rules:[
                {validator:phoneValid},
                {required:true,message:"请输入手机号"},
            ]
        },
        email:{
            label:"邮箱",
            type:"input",
            span:12,
            rules:[
                {validator:mailValid},
                {required:true,message:"请输入邮箱"},
            ]
        },
        wechat:{
            label:"微信号码",
            type:"input",
            maxLength:20,
            span:12,
            rules:[
                {required:true,message:"请输入微信号码"},
            ]
        },
        createTime:{
            label:"入驻时间",
            type:"input",
            disabled:true,
            span:12,
            rules:[
                {required:true,message:"请输入入驻时间"},
            ]
        },
    };
    return config;
}