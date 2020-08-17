/* 接口封装 */

import axios from "axios";

// 设置基础地址
axios.defaults.baseURL = "https://api.official.scmsar.com/";

/*
 *  1.ClientPlatform     ---- web ios android
 *  2.ClientScene        ---- official
 *  3.AmendAuthorization ---- 更换token使用
 *  4.CDEV               ----
 */

/* 首页轮播列表 */

// 1.获取
// 1.获取列表 type(类型：case || media || recruit || userinfo)
export const getList = (type, info) => {
  var url = "";
  switch (type) {
    case "case":
      url = "/o1/Case/list";
      break;
    case "media":
      url = "/o1/Media/list";
      break;
    case "recruit":
      url = "/o1/Recruit/list";
      break;
    case "userinfo":
      url = "/o1/Userinfo/list";
      break;
  }
  return axios.post(url, info);
};

// 2.获取(详细)
export const getDetails = (type, info) => {
  var url = "";
  switch (type) {
    case "case":
      url = "/o1/Case/details";
      break;
    case "media":
      url = "/o1/Media/details";
      break;
    case "recruit":
      url = "/o1/Recruit/details";
      break;
    case "userinfo":
      url = "/o1/Userinfo/details";
      break;
  }
  return axios.post(url, info);
};
