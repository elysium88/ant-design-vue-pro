import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import zhCN from "../locale/zhCN";
import enUS from "../locale/enUS";
//import Antd from "ant-design-vue";
//import 'ant-design-vue/dist/antd.less'
import VueI18n from "vue-i18n";
import queryString from "query-string";
import VueHighlightJS from "vue-highlightjs";

import {
  Button,
  Layout,
  Icon,
  Drawer,
  Radio,
  Menu,
  Form,
  Input,
  Select,
  Dropdown,
  DatePicker,
  ConfigProvider,
} from "ant-design-vue";
import Authorized from "./components/Authorized";
import Auth from "./directive/auth";
import "highlight.js/styles/github.css";

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Auth);
Vue.use(Form);
Vue.use(Input);
Vue.use(Select);
Vue.use(Dropdown);
Vue.use(DatePicker);
Vue.use(ConfigProvider);
Vue.use(VueHighlightJS);
Vue.component("Authorized", Authorized); //权限控制组件
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: queryString.parse(location.search).locale || "zhCN",
  messages: {
    zhCN: { message: zhCN },
    enUS: { message: enUS },
  },
});
// 引入阿里icon
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1729906_jac8106wnf.js",
});

Vue.component("IconFont", IconFont);
new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
