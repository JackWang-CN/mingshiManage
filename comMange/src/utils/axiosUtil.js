/* 拦截器 */

import axios from "axios";

// 请求拦截器
axios.interceptors.request.use((req) => {
  // 1.统一为接口添加token
  var token = sessionStorage.getItem("token");
  if (token) {
    token = "Bearer " + token;
    req.headers.Authorization = token;
  }
  req.headers.ClientPlatform = "web";
  req.headers.ClientScene = "company";

  return req;
});

// 响应拦截器
axios.interceptors.response.use((res) => {
  switch (res.data.code) {
    case "200":
      return res.data.resultObject;
    case "416":
      return null;
  }
});
