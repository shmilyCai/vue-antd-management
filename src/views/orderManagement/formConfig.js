export const searchConfig = {
    id1: {
        label: "订单编号",
        type: "input",
    },
    id2: {
        label: "客户名称",
        type: "input",
    },
    id21: {
        label: "客户经理",
        type: "input",
    },
    id4: {
        label: "交易时间",
        type: "dateRangePicker",
        codeName:["startTime","endTime"]
    },
    id221: {
        label: "产品名称",
        type: "input",
    },
    id3: {
        label: "订单状态",
        type: "select",
        option:[
            {name:"状态1",value:1},
            {name:"状态2",value:2},
        ]
    },
    id41: {
        label: "余额统计日期",
        type: "dateRangePicker",
        codeName:["startTime","endTime"]
    },
}

export const listColumns = [
    {title:"订单编号",dataIndex:"id"},
    {title:"客户姓名",dataIndex:"type"},
    {title:"客户经理",dataIndex:"content"},
    {title:"产品名称",dataIndex:"priority"},
    {title:"交易金额",dataIndex:"priority"},
    {title:"当前余额",dataIndex:"priority"},
    {title:"起售时间",dataIndex:"priority"},
    {title:"当前是否为有效客户",dataIndex:"priority"},

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