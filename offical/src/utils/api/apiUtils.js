/* 拦截器 */

import axios from "axios";

// 请求拦截
axios.interceptors.request.use(
  (req) => {
    // 1. 统一为接口添加token
    // 2. 统一添加场景

    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = "Bearer " + token;
      req.headers.ClientPlatform = "web";
      req.headers.ClientScene = "official";
    }
    return req;
  },
  (err) => Promise.reject(err)
);

// 响应拦截
axios.interceptors.response.use(
  (res) => {
    switch (res.status) {
      case 200:
        // console.log(res.data);
        return res.data.resultObject;
      case 500:
        console.log(res.status);
        break;
      case 401:
        console.log(res.status);
        break;
    }
  },
  (err) => Promise.reject(err)
);
