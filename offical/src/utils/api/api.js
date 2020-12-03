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
      url = "/config/case/list/v1";
      break;
    case "media":
      url = "/config/media/list/v1";
      break;
    case "recruit":
      url = "/config/recruit/list/v1";
      break;
    case "userinfo":
      url = "/offUser/userInfo/list/v1";
      break;
      case "companyInfo":
        url = "/config/companyInfo/list/v1";
        break;
  }
  return axios.post(url, info);
};

// 2.获取(详细)
export const getDetails = (type, info) => {
  var url = "";
  switch (type) {
    case "case":
      url = "/config/case/details/v1";
      break;
    case "media":
      url = "/config/media/details/v1";
      break;
    case "recruit":
      url = "/config/recruit/details/v1";
      break;
    case "userinfo":
      url = "/offUser/userInfo/details/v1";
      break;
    case "companyInfo":
      url = "/config/companyInfo/details/v1";
      break;
  }
  return axios.post(url, info);
};
