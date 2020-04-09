// import Antd from 'ant-design-vue';
import Vue from "vue";
import { 
    Button,
    Breadcrumb,
    Checkbox,
    Col,
    DatePicker,
    Icon,
    Input,
    InputNumber,
    Layout,
    LocaleProvider,
    Pagination,
    Slider,
    Row,
    Radio,
    Select,
    Table,
    Empty,
    Upload,
    message,
    Menu,
    Modal,
    Form,
    Dropdown,
    Divider,
} from 'ant-design-vue';


import 'ant-design-vue/dist/antd.less';

Vue.use(Breadcrumb);
Vue.use(Button);
Vue.use(Checkbox);
Vue.use(Col);
Vue.use(DatePicker);
Vue.use(Form);
Vue.use(Icon);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Layout);
Vue.use(Select);
Vue.use(LocaleProvider);
Vue.use(Pagination);
Vue.use(Radio);
Vue.use(Row);
Vue.use(Slider);
Vue.use(Table);
Vue.use(Upload);
Vue.use(Empty);
Vue.use(Menu);
Vue.use(Dropdown);
Vue.use(Modal);
Vue.use(Divider);


Vue.prototype.$message = message;
Vue.prototype.$info = Modal.info;
Vue.prototype.$success = Modal.success;
Vue.prototype.$error = Modal.error;
Vue.prototype.$warning = Modal.warning;
Vue.prototype.$confirm = Modal.confirm;
