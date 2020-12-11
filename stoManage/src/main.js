import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// 引入字体样式
import "./assets/font/iconfont.css";

// 引入element组件
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// 引入拦截器
import "@/utils/api/axiosUtil";

import "@/utils/date";
import "@/utils/im/wang.js";

// 引入样式
import "@/assets/css/reset.css";
import "@/assets/css/common.scss";

//路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.notNeed) {
    // 判断该路由是否需要登录权限
    next();
  } else {
    if (sessionStorage.getItem("token")) {
      //判断本地是否存在token
      next();
    } else {
      new Vue().$message.error("请先登录再操作！");
      next({
        path: "/login",
      });
    }
  }
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
