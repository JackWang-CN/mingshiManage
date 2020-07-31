import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// 引入字体样式
import "./assets/font/iconfont.css";

// 引入element组件
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// 引入拦截器
import "@/utils/api/axiosUtil";

import "@/assets/css/reset.css";
Vue.use(ElementUI);

Vue.prototype.$vision = {
  company: "c1",
  merchant: "m1",
  userdata: "u1",
};

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
