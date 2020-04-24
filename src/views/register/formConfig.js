import {
    mailValid,
    idCardValid,
    phoneValid,
    accountValid,
} from "@utils/validator";

export const getPersonalInfoFormConfig = ()=>{
    let config = {
        name:{
            label:"姓名",
            type:"input",
            maxLength:10,
            rules:[{required:true,message:"请输入姓名"}]
        },
        sex:{
            label:"性别",
            type:"select",
            option:[
                {name:"男",value:1},
                {name:"女",value:0},
            ],
            rules:[{required:true,message:"请选择性别"}]
        },
        idCard:{
            label:"身份证号",
            maxLength:18,
            type:"input",
            rules:[
                {validator:idCardValid},
                {required:true,message:"请输入身份证号"},
            ]
        },
        jg:{
            label:"所属机构",
            type:"select",
            option:[
                {name:"机构1",value:1},
                {name:"机构2",value:2},
            ],
            rules:[{required:true,message:"请选择所属机构"}]
        },
        wechat:{
            label:"微信号",
            type:"input",
            maxLength:20,
            rules:[{required:true,message:"请输入微信号"}]
        },
        email:{
            label:"邮箱",
            type:"input",
            rules:[
                {validator:mailValid},
                {required:true,message:"请输入邮箱"},
            ]
        },
        phone:{
            label:"手机号",
            type:"input",
            maxLength:11,
            rules:[
                {validator:phoneValid},
                {required:true,message:"请输入手机号"},
            ]
        },
        logo:{
            label:"证件照",
            type:"logoUpload",
            rules:[
                {required:true,message:"请上传证件照"},
            ]
        },
    };
    return config;
}

export const getAccountFormConfig = ()=>{
    let config = {
        name:{
            label:"用户名",
            type:"input",
            maxLength:10,
            placeholder:"由6~20位英文、数字组成",
            rules:[
                {validator:accountValid},
                {required:true,message:"请输入用户名"},
            ]
        },
    };
    return config;
}