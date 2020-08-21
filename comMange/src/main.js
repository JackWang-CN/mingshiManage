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
import "./utils/axiosUtil";

// 引入样式重置
import "./assets/css/reset.css";
import "./assets/css/common.scss";

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

Vue.prototype.$vision = {
  merchant: "m1",
  company: "c1",
  user: "u1",
};

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
