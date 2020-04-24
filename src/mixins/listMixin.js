export const listMixin = {
    data() {
        return {
            listRequest: {//请求参数
                size: 10,
                current: 1,
            },
            pagination: {//分页信息
                size: 10,
                current: 1,
                total: 0
            },
            dataSource: [],//列表数据源
            formModalVisible: false,//新增/编辑弹窗是否弹出
            formData:{},//新增/编辑弹窗的数据。
        }
    },
    created() {
        this.getList();
    },
    methods: {
        /**
         * 新增
         */
        addFuc(e,v){
            this.formModalVisible = true;
            this.formData = {};
        },
        /**
         * 编辑
         * @param {*} e 
         * @param {*} v 
         */
        modifyFuc(e,v){
            this.formData = e.record;
            this.formModalVisible = true;
        },
        /**
         * 删除
         */
        deleteFuc(e){
            if(!this.api.listDeleteApi){
                this.$message.warn("请先设置api.listDeleteApi");
                return;
            }
            if(typeof this.api.listDeleteApi !== "function"){
                this.$message.warn("api.listDeleteApi不是有效的function");
                return;
            }
            this.api.listDeleteApi().then(()=>{
                this.$message.success("删除成功");
            });
        },
        /**
         * 批量删除
         */
        batchDeleteFuc(i,v = {}){
            alert(`删除的id${v.selectedRowKeys.join(",")}`)
        },
        /**
         * 获取列表
         * @param {}} req 
         */
        getList(req = {}){
            if(!this.api.listApi){
                this.$message.warn("请先设置api.listApi");
                return;
            }
            if(typeof this.api.listApi !== "function"){
                this.$message.warn("api.listApi不是有效的function");
                return;
            }
            let request = Object.assign(this.listRequest, req);
            this.api.listApi(request).then(()=>{
                //逻辑处理
                this.dataSource = [];
            })
            .catch(()=>{
                this.dataSource = [];
            })
        },
        /**
         * 导出
         */
        onExport(){

        },
    },
}