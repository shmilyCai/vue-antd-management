export const searchConfig = {
    id1: {
        label: "客户经理",
        type: "input",
    },
    id2: {
        label: "归属机构",
        type: "select",
        option: [
            {name:"机构1",value:2}
        ]
    },
    id8: {
        label: "统计日期",
        type: "dateRangePicker",
        codeName:["startTime","endTime"]
    },
}

export const listColumns = [
    {title:"机构名称",dataIndex:"id"},
    {title:"店铺访问量",dataIndex:"type"},
    {title:"活动浏览量",dataIndex:"content"},
    {title:"产品浏览量",dataIndex:"priority"},
    {title:"绑定客户数量",dataIndex:"verify_status"},
    {title:"当前有效客户数",dataIndex:"use_status"},
    {title:"订单数量",dataIndex:"user"},
    {title:"当前余额",dataIndex:"amout"},
    // {title:"操作",dataIndex:"aa",slot:"opreation",scopedSlots: { customRender: 'opreation' },},
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