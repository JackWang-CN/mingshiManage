import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// 引入字体样式
import "./assets/font/iconfont.css";

// 引入element组件
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// 引入拦截器
import "./utils/axiosUtil";

// 引入样式重置
import "./assets/css/reset.css";
import "./assets/css/common.scss";

Vue.use(ElementUI);

Vue.prototype.$vision = {
  merchant: "m1",
  company: "c1",
  user: "u1",
};

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
