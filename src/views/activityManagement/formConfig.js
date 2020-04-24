export const searchConfig = {
    id1: {
        label: "创建人",
        type: "input",
    },
    id2: {
        label: "推送内容",
        type: "input",
    },
    id4: {
        label: "活动时间",
        type: "dateRangePicker",
        codeName:["startTime","endTime"]
    },
    d21: {
        label: "关联url",
        type: "input",
    },
    d22: {
        label: "推送状态",
        type: "select",
        option:[],
    },
}

export const listColumns = [
    {title:"创建人",dataIndex:"id"},
    {title:"活动标题",dataIndex:"type"},
    {title:"主图",dataIndex:"content",slot:"masterMap",scopedSlots:{customRender:"masterMap"}},
    {title:"关联url",dataIndex:"priority1"},
    {title:"开始时间",dataIndex:"priority2"},
    {title:"结束时间",dataIndex:"priority4"},
    {title:"活动状态",dataIndex:"activityStatus",slot:"activityStatus",scopedSlots: { customRender: 'activityStatus' },},
    {title:"操作",dataIndex:"aa",slot:"opreation",scopedSlots: { customRender: 'opreation' },},

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