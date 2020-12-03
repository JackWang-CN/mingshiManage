/* 接口封装 */

import axios from "axios";

// 设置基础地址
axios.defaults.baseURL = "https://api.official.scmsar.com";

/*
 *  1.ClientPlatform     ---- web ios android
 *  2.ClientScene        ---- official
 *  3.AmendAuthorization ---- 更换token使用
 *  4.CDEV               ----
 */

/* 登录 */
export const sendLogin = (info) =>
  axios.post("/signIn/userInfo/pwdLogin/v1", info);

/* 其他操作 */

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
  }
  return axios.post(url, info);
};

// 2.获取(详细)
export const getDetails = (type, info) => {
  var url = "";
  switch (type) {
    case "case":
      url = "/config/Case/details";
      break;
    case "media":
      url = "/config/Media/details";
      break;
    case "recruit":
      url = "/config/Recruit/details";
      break;
    case "userinfo":
      url = "/offUser/Userinfo/details";
      break;
  }
  return axios.post(url, info);
};

// 3.更新数据
export const update = (type, info) => {
  var url = "";
  switch (type) {
    case "case":
      url = "/o1/Case/edit";
      break;
    case "media":
      url = "/o1/Media/edit";
      break;
    case "recruit":
      url = "/o1/Recruit/edit";
      break;
    case "userinfo":
      url = "/o1/Userinfo/edit";
      break;
  }
  return axios.patch(url, info);
};

// 4.添加数据
export const addList = (type, info) => {
  var url = "";
  switch (type) {
    case "case":
      url = "/o1/Case/create";
      break;
    case "media":
      url = "/o1/Media/create";
      break;
    case "recruit":
      url = "/o1/Recruit/create";
      break;
    case "userinfo":
      url = "/o1/Userinfo/create";
      break;
  }
  return axios.put(url, info);
};

// 5.删除数据(单行)
export const delList = (type, info) => {
  var url = "";
  switch (type) {
    case "case":
      url = "/o1/Case/del";
      break;
    case "media":
      url = "/o1/Media/del";
      break;
    case "recruit":
      url = "/o1/Recruit/del";
      break;
    case "userinfo":
      url = "/o1/Userinfo/del";
      break;
  }
  return axios.delete(url, { data: info });
};

// 6.删除数据(批量)
export const delManyList = (type, info) => {
  var url = "";
  switch (type) {
    case "case":
      url = "/o1/Case/delList";
      break;
    case "media":
      url = "/o1/Media/delList";
      break;
    case "recruit":
      url = "/o1/Recruit/delList";
      break;
    case "userinfo":
      url = "/o1/Userinfo/delList";
      break;
  }
  return axios.delete(url, { data: info });
};

/* 媒体资源 */

// 7.文件上传  place--上传目录  formdata--文件
export const upLoadFiles = (remarks, formdata) => {
  var url = `https://api.resources.scmsar.com/f1/FileResources/WebUploadForm?Remarks=${remarks}`;
  return axios.post(url, formdata);
};

// 8.文件场景分配（分配sence）
export const classifyFiles = (info) => axios.put("/o1/Media/createList", info);
