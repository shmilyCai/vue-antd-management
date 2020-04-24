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
    id4: {
        label: "产品类型",
        type: "select",
        option:[],
    },
    id5: {
        label: "有效日期",
        type: "dateRangePicker",
        option:[],
    },
}

export const listColumns = [
    {title:"产品名称",dataIndex:"id"},
    {title:"产品类型",dataIndex:"type"},
    {title:"起存金额",dataIndex:"content"},
    {title:"存款期限",dataIndex:"priority"},
    {title:"到期年利率",dataIndex:"verify_status"},
    {title:"产品状态",dataIndex:"productStatus",slot:"productStatus",scopedSlots: { customRender: 'productStatus' }},
    {title:"停售时间",dataIndex:"time1"},
    {title:"起售时间",dataIndex:"time2"},
    {title:"顶级推送",dataIndex:"user",slot:"send",scopedSlots:{customRender:"send"}},
    {title:"操作",dataIndex:"opreation",slot:"opreation",scopedSlots: { customRender: 'opreation' },},
]
