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

import "./assets/css/reset.css";
Vue.use(ElementUI);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
