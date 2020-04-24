export const searchConfig = {
    id1: {
        label: "产品名称",
        type: "input",
    },
    id2: {
        label: "产品状态",
        type: "select",
        option: []
    },
    id3: {
        label: "产品类型",
        type: "select",
        option:[
            {name:"类型1",value:1},
            {name:"类型2",value:2},
        ]
    },
    id4: {
        label: "有效日期",
        type: "dateRangePicker",
        codeName:["startTime","endTime"]
    },
    // id5: {
    //     label: "起存金额",
    //     type: "input",
    // },
    // id6: {
    //     label: "存款期限",
    //     type: "input",
    // },
    // id7: {
    //     label: "到期利率",
    //     type: "input",
    // },
}

export const listColumns = [
    {title:"产品名称",dataIndex:"id"},
    {title:"产品类型",dataIndex:"type"},
    {title:"起存金额",dataIndex:"content"},
    {title:"存款期限",dataIndex:"priority1"},
    {title:"到期年利率",dataIndex:"priority2"},
    {title:"产品状态",dataIndex:"productStatus",slot:"productStatus",scopedSlots: { customRender: 'productStatus' },},
    {title:"停售时间",dataIndex:"priority4"},
    {title:"起售时间",dataIndex:"priority5"},
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