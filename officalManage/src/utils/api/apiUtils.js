/* 拦截器 */
import axios from "axios";

// 请求拦截
axios.interceptors.request.use(
  (req) => {
    // 1. 统一为接口添加token
    const token = sessionStorage.getItem("token");

    if (token) {
      req.headers.Authorization = "Bearer " + token;
    }

    // 2. 统一添加场景
    req.headers.ClientPlatform = "web";
    req.headers.ClientScene = "official";
    return req;
  },
  (err) => Promise.reject(err)
);

// 响应拦截
axios.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) =>
    Promise.reject((err) => {
      console.log(err);
    })
);
