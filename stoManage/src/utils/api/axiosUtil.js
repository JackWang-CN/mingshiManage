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
    req.headers.ClientScene = "merchant ";
    return req;
  },
  (err) => Promise.reject(err)
);

// 响应拦截
axios.interceptors.response.use(
  (res) => {
    if (res.status == 200) {
      switch (res.data.code) {
        case "200":
          return res.data.resultObject;
        case "412":
          return "412";
        case "416":
          return 0;
      }
    }
  },
  (err) =>
    Promise.reject((err) => {
      console.log(err);
    })
);
