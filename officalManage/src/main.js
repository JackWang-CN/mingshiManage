import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/reset.css";
import "./utils/api/apiUtils";
import "./utils/other/date"; // 解决时间对象转字符串出现的时差问题

Vue.use(ElementUI);

// 通过路由钩子设置网页名称
router.beforeEach((to, from, next) => {
  document.title = "四川名视人工智能" + to.meta.title;
  next();
});

Vue.config.productionTip = true;

new Vue({
  router,
  render: (h) => h(App),
  components: {
    App,
  },
}).$mount("#app");
