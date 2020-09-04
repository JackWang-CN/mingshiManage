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

// 引入样式
import "@/assets/css/reset.css";
import "@/assets/css/common.scss";

//路由守卫
router.beforeEach((to, from, next) => {
  // document.title = "名视商户营销平台";
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

Vue.prototype.$vision = {
  company: "c1",
  merchant: "m1",
  userdata: "u1",
};

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
