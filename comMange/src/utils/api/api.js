/* 接口封装 */

import axios from "axios";
import { spliceUrl } from "../common";

const getData = (version, control, action, info) => {
  var url = version + "/" + control + "/" + action;
  return axios.post(url, info);
};

const addData = (version, control, action, info) => {
  var url = version + "/" + control + "/" + action;
  return axios.put(url, info);
};

const updateData = (version, control, action, info) => {
  var url = version + "/" + control + "/" + action;
  return axios.patch(url, info);
};

export { getData, addData, updateData };

// 设置基础地址
// axios.defaults.baseURL = "https://api.company.scmsar.com:4430";
axios.defaults.baseURL = "http://192.168.0.89:9011";

// 需拼接图片Url的控制类型
var imgArr = [
  "Productinfo",
  "Order",
  "Userinfo",
  "Accflow", // 账户流水
  "Auctiondata", // 拍品列表
  "Auctraderec", // 拍卖记录
  "Asset", // 道具资产
  "Spahousepro", // 个人房产
  "PropsCenter", // 道具商城
  "PropsCenterRecord", // 道具商城交易记录
];

// 1.登录
export const sendLogin = (info) => axios.post("/c1/Userinfo/pwdLogin", info);

// 2.获取列表
export const getDataList = (
  version, // 版本
  control, // 控制
  info, // 参数
  list, // 接收数据的列表名
  _this, // vue实例对象
  status, // 按钮禁用状态
  imgKey // 需拼接的图片key
) => {
  var action = "list";

  // 若data为空对象，则删除data属性
  if (info.data && Object.keys(info.data).length == 0) delete info.data;
  getData(version, control, action, info).then((res) => {
    _this.find_form.totalDataNum = res.resultObject.totalDataNum;

    // 如果请求页数大于总页数，则重新请求最后一页数据
    if (info.currPage > res.totalPageNum && info.currPage > 1) {
      info.currPage = res.totalPageNum;
      getData(version, control, action, info).then((result) => {
        if (result.data) {
          // 判断是否需要拼接Url
          if (imgArr.includes(control)) {
            _this[list] = spliceUrl(result.data, imgKey);
          } else {
            _this[list] = result.data;
          }
        } else {
          _this[list] = [];
        }
      });
    } else {
      var data = res.resultObject.data;
      if (data) {
        // 判断是否需要拼接Url
        if (imgArr.includes(control)) {
          _this[list] = spliceUrl(data, imgKey);
        } else {
          _this[list] = data;
        }
      } else {
        _this[list] = [];
      }
    }
    // if (status) _this[status] = false; // 接触查询按钮的禁用
  });
};

// 3.获取详细
export const getDetailsInfo = (version, control, info, list, _this, imgKey) => {
  var action = "details";
  getData(version, control, action, info).then((res) => {
    var res = res.resultObject;
    if (imgArr.includes(control)) {
      _this[list] = spliceUrl([res], imgKey)[0];
    } else {
      _this[list] = res;
    }
    console.log(_this[list]);
  });
};

// 4.添加数据
export const addDataList = (version, control, info, _this, path) => {
  var action = "create";
  addData(version, control, action, info).then(() => {
    _this.$message.success("发布成功");
    _this.$router.push(path);
  });
};

// 5.更新数据
export const updateDataList = (version, control, info, _this, path) => {
  var action = "edit";
  updateData(version, control, action, info).then((res) => {
    switch (res) {
      case 1:
        _this.$message.success("修改已生效！");

        if (path) {
          _this.$router.push(path);
        }
    }
  });
};

// 6.删除数据
export const delData = (version, control, action, info) => {
  var url = version + "/" + control + "/" + action;
  return axios.delete(url, { data: info });
};

const fileUrl = "http://192.168.0.89:9001/f1/FileResources/";

// 7.普通文件上传  place--上传目录  formdata--文件
export const upLoadFiles = (remarks, formdata) => {
  var url = fileUrl + `WebUploadForm?Remarks=${remarks}`;
  return axios.post(url, formdata);
};

// 8.U3D文件上传
export const uploadArFiles = (resourceName, Remarks, formdata) => {
  var url =
    fileUrl + `U3DUploadForm?resourceName=${resourceName}&Remarks=${Remarks}`;
  return axios.post(url, formdata);
};

// 9.获取文件列表 type = normal || ar
export const getFile = (type, info) => {
  switch (type) {
    case "normal":
      var action = "ResourcesList";
      break;
    case "ar":
      var action = "U3DResourcesList";
      break;
  }
  var url = fileUrl + action;
  return axios.post(url, info);
};
export const getFileList = (type, info, list, _this, imgKey) => {
  getFile(type, info).then((res) => {
    _this.find_form.totalDataNum = res.totalDataNum;
    _this[list] = spliceUrl(res.data, imgKey);
  });
};

// 9.删除文件 type = 0-普通真删 1-普通假删 2-U3D假删
export const delFile = (type, info) => {
  switch (type) {
    case 0:
      var action = "DeleteFileIrreversible";
      break;
    case 1:
      var action = "DeleteResources";
      break;
    case 2:
      var action = "U3DDeleteResources";
      break;
  }
  var url = fileUrl + action;
  return axios.post(url, info);
};

// 10.恢复文件
export const backFile = (info, isU3D) => {
  if (isU3D) {
    var action = "U3DRecoveryResources";
  } else {
    var action = "RecoveryResources";
  }
  var url = fileUrl + action;
  return axios.post(url, info);
};

// 11.下载文件
export const downloadFile = (type, info) => {
  switch (type) {
    case "normal":
      var action = "DownLoad";
      break;
    case "ar":
      var action = "U3DDownLoad";
      break;
  }
  var url = fileUrl + action + `?pathtemp=${info}`;
  return axios.post(url);
};
