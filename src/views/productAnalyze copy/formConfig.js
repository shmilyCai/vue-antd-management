export const searchConfig = {
    id1: {
        label: "产品名称",
        type: "input",
    },
    id4: {
        label: "产品类型",
        type: "select",
        option:[],
    },
    id5: {
        label: "统计日期",
        type: "dateRangePicker",
        option:[],
    },
}

export const listColumns = [
    {title:"产品名称",dataIndex:"id"},
    {title:"产品类型",dataIndex:"type"},
    {title:"购买渠道",dataIndex:"content"},
    {title:"持仓客户数",dataIndex:"priority"},
    {title:"产品余额",dataIndex:"verify_status"},
    {title:"日均余额",dataIndex:"time1"},
    // {title:"操作",dataIndex:"opreation",slot:"opreation",scopedSlots: { customRender: 'opreation' },},
]
