/* 请求接口 */

import axios from "axios";

// 配置默认端口
axios.defaults.baseURL = "http://192.168.0.89:9011";
// axios.defaults.baseURL = "https://localhost:44360";

/* 登录 */
export const sendLogin = (info) => axios.post("/c1/Userinfo/pwdLogin", info);

// export const getList = (group, item, info) => {
//     var url = "/" + group + "/" + item + "/datalist";
//     return axios.post(url, info);
// }

/* 1.获取列表*/
const getList = (role, type, info) => {
  var url = role + "/" + type + "/list";
  return axios.post(url, info);
};

// 加载列表(角色,类型,参数,list名,this)
export const getDataList = (role, type, info, list, _this) => {
  getList(role, type, info).then((res) => {
    if (res.data) {
      _this[list] = res.data;
    } else {
      _this[list] = [];
    }
  });
};

/* 3.获取新增*/
export const putcreate = (role, type, info) => {
  var url = role + "/" + type + "/create";
  return axios.put(url, info);
};

/* 4.获取修改*/
export const patchedit = (role, type, info) => {
  var url = role + "/" + type + "/edit";
  return axios.patch(url, info);
};

/* 5.批量删除*/
export const deletelist = (role, type, info) => {
  var url = role + "/" + type + "/delList";
  return axios.delete(url, { data: info });
};

/* 6.单个删除*/
export const deleteuser = (role, type, info) => {
  var url = role + "/" + type + "/del";
  return axios.delete(url, { data: info });
};
