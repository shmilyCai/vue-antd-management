export const searchConfig = {
    id1: {
        label: "客户姓名",
        type: "input",
    },
    id2: {
        label: "手机号码",
        type: "input",
        option: []
    },
    id3: {
        label: "来源渠道",
        type: "select",
        option:[
            {name:"渠道1",value:1},
            {name:"渠道2",value:2},
        ]
    },
    id4: {
        label: "绑定时间",
        type: "dateRangePicker",
        codeName:["startTime","endTime"]
    },
}

export const listColumns = [
    {title:"客户姓名",dataIndex:"id"},
    {title:"手机号码",dataIndex:"type"},
    {title:"来源渠道",dataIndex:"content"},
    {title:"绑定时间",dataIndex:"priority"},
]

export const formModalConfig = ()=>{
    let config = {
         test:{
            label:"test",
            type:"span",
        },
        type:{
            label:"短信业务类型",
            type:"input",
            rules:[
                {required:true,message:"请输入短信类型"},
            ]
        },
       
        level:{
            label:"绑定优先级",
            type:"select",
            option:[
                {name:"优先级1",value:1},
                {name:"优先级2",value:2},
                {name:"优先级3",value:3},
            ],
            rules:[
                {required:true,message:"请选择绑定优先级"},
            ]
        },
    };
    return config;
}