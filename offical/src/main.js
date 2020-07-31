import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// 引入elementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// 引入阿里图标
import "@/assets/font/iconfont.css";

// 引入拦截器和其他工具
import "@/utils/api/apiUtils";
import "@/utils/other/date";

// 引入重置、公共样式
import "./assets/css/reset.css";

// 通过路由钩子设置网页名称
router.beforeEach((to, from, next) => {
  document.title = "四川名视人工智能" + to.meta.title;
  next();
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
