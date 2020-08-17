/* 接口封装 */

import axios from "axios";
import { spliceUrl } from "../common";

const getData = (vision, control, action, info) => {
  var url = vision + "/" + control + "/" + action;
  return axios.post(url, info);
};

const addData = (vision, control, action, info) => {
  var url = vision + "/" + control + "/" + action;
  return axios.put(url, info);
};

const updateData = (vision, control, action, info) => {
  var url = vision + "/" + control + "/" + action;
  return axios.patch(url, info);
};

// 设置基础地址
// axios.defaults.baseURL = "https://api.merchant.scmsar.com:4430";
axios.defaults.baseURL = "http://192.168.0.89:9010";

/*
 *  1.ClientPlatform     ---- web ios android
 *  2.ClientScene        ---- official
 *  3.AmendAuthorization ---- 更换token使用
 *  4.CDEV               ----
 */
var imgArr = ["Productinfo", "Order", "Userinfo"]; // 需拼接图片Url的控制类型

// 1.登录
export const sendLogin = (info) => axios.post("/m1/Userinfo/pwdLogin", info);

// 2.获取列表
export const getDataList = (
  vision, // 版本
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
  getData(vision, control, action, info).then((res) => {
    _this.find_form.totalDataNum = res.totalDataNum;

    // 如果请求页数大于总页数，则重新请求最后一页数据
    if (info.currPage > res.totalPageNum) {
      info.currPage = res.totalPageNum;
      getData(vision, control, action, info).then((result) => {
        if (result.data) {
          // 判断是否需要拼接Url
          if (imgArr.includes(control)) {
            _this[list] = spliceUrl(result.data, imgKey);
            console.log(result);
          } else {
            _this[list] = result.data;
          }
        } else {
          _this[list] = [];
        }
      });
    } else {
      if (res.data) {
        // 判断是否需要拼接Url
        if (imgArr.includes(control)) {
          _this[list] = spliceUrl(res.data, imgKey);
        } else {
          _this[list] = res.data;
        }
      } else {
        _this[list] = [];
      }
    }

    // if (status) _this[status] = false; // 接触查询按钮的禁用
  });
};

// 3.获取详细
export const getDetailsInfo = (vision, control, info, list, _this, imgKey) => {
  var action = "details";
  getData(vision, control, action, info).then((res) => {
    if (imgArr.includes(control)) {
      _this[list] = spliceUrl([res], imgKey)[0];
    } else {
      _this[list] = res;
    }
  });
};

// 4.添加数据
export const addDataList = (vision, control, info, _this, path) => {
  var action = "create";
  addData(vision, control, action, info).then(() => {
    _this.$message.success("发布成功");
    _this.$router.push(path);
  });
};

// 5.更新数据
export const updateDataList = (vision, control, info, _this, path, fn) => {
  var action = "edit";
  updateData(vision, control, action, info).then((res) => {
    switch (res) {
      case 1:
        _this.$message.success("修改已生效！");

        if (path) {
          _this.$router.push(path);
        }

        if (fn) {
          debugger;
          // fn();
        }
    }
  });
};

// 6.删除数据
export const delData = (vision, control, action, info) => {
  var url = vision + "/" + control + "/" + action;
  return axios.delete(url, { data: info });
};

// 7.文件上传  place--上传目录  formdata--文件
export const upLoadFiles = (remarks, formdata) => {
  var url = `http://192.168.0.89:9001/f1/FileResources/WebUploadForm?Remarks=${remarks}`;
  return axios.post(url, formdata);
};
