export const searchConfig = {
    id1: {
        label: "模板ID",
        type: "input",
    },
    id2: {
        label: "模板名称",
        type: "input",
        option: []
    },
    id3: {
        label: "短信内容",
        type: "input",
    },
    id4: {
        label: "审核状态",
        type: "select",
        option:[],
    },
    id5: {
        label: "使用状态",
        type: "select",
        option:[],
    },
    id6: {
        label: "优先级",
        type: "select",
        option:[],
    },
    id7: {
        label: "渠道",
        type: "select",
        option:[],
    },
    id8: {
        label: "创建人",
        type: "input",
    },
}

export const listColumns = [
    {title:"模板ID",dataIndex:"id"},
    {title:"模板名称",dataIndex:"type"},
    {title:"消息内容",dataIndex:"content"},
    {title:"优先级",dataIndex:"priority"},
    {title:"审核状态",dataIndex:"verify_status"},
    {title:"使用状态",dataIndex:"use_status"},
    {title:"创建人",dataIndex:"user"},
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