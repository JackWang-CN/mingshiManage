import axios from "axios";
import { createFormData } from "@/utils/common";

// 设置基础地址
// axios.defaults.baseURL = "http://192.168.0.89:9018";
axios.defaults.baseURL = "https://api.company.scmsar.com/";

/* 基础接口 */
// 1.查询列表
export const getData = (model, control, version, info, operate = "list") => {
  var url = `${model}/${control}/${operate}/v${version}`;
  return axios.post(url, info);
};

// 2.创建数据
export const addData = (model, control, version, info, operate = "create") => {
  var url = `${model}/${control}/${operate}/v${version}`;
  return axios.put(url, info);
};

// 3.详情数据
export const getDetails = (
  model,
  control,
  version,
  info,
  operate = "details"
) => {
  var url = `${model}/${control}/${operate}/v${version}`;
  return axios.post(url, info);
};

// 4.修改数据
export const updateData = (model, control, version, info, operate = "edit") => {
  var url = `${model}/${control}/${operate}/v${version}`;
  return axios.patch(url, info);
};

// 5.删除数据（单行）
export const delData = (model, control, version, info, operate = "del") => {
  var url = `${model}/${control}/${operate}/v${version}`;
  return axios.delete(url, { data: info });
};

// 6.删除数据（多行）
export const delList = (model, control, version, info, operate = "delList") => {
  var url = `${model}/${control}/${operate}/v${version}`;
  return axios.delete(url, { data: info });
};

// 7.拍卖行下架
export const offTheShelf = (version, info) => {
  var url = `auction/auction/offTheShelf/v${version}`;
  return axios.post(url, info);
};

/* ========================================================== */
/* 懒人版 */
// 1) 获取列表
export const getDataList = (
  model,
  control,
  version,
  info,
  _this,
  key,
  operate = "list"
) => {
  getData(model, control, version, info, operate).then((res) => {
    switch (res.code) {
      case "C00501":
        _this.$message.info(res.resultMessage);
        res = { resultObject: { data: [] } };
        break;
      case "000000":
        break;
    }
    if (!key) {
      key = "data_list";
    }
    _this[key] = res.resultObject.data;
    _this.find_form.totalDataNum = res.resultObject.totalDataNum;
  });
};

// 2) 创建数据
export const addDataList = (model, control, version, info, _this, path) => {
  addData(model, control, version, info).then((res) => {
    switch (res.code) {
      case "000000":
        _this.$message.success("创建成功！");
        if (path) {
          _this.$router.push(path);
        }
        break;
    }
  });
};

// 3) 获取详情
export const getDataDetails = (
  model,
  control,
  version,
  info,
  _this,
  key = "data_info"
) => {
  getDetails(model, control, version, info).then((res) => {
    switch (res.code) {
      case "000000":
        _this[key] = res.resultObject;
        console.log(_this[key]);
        break;
    }
  });
};

// 4) 修改数据
export const updateDataDetails = (
  model,
  control,
  version,
  info,
  _this,
  path,
  operate
) => {
  updateData(model, control, version, info, operate).then((res) => {
    switch (res.code) {
      case "000000":
        _this.$message.success("修改成功！");
        _this.$router.push(path);
        break;
    }
  });
};

/* 文件接口 */
const fileUrl = "https://api.resources.scmsar.com/";

// 1.获取文件
export const geFile = (operate = "infoList", version, info) => {
  var url = fileUrl + `file/info/${operate}/v${version}`;
  return axios.post(url, info);
};

// 2.获取文件-自动填充
export const getFileList = (
  operate = "infoList",
  version,
  info,
  _this,
  key
) => {
  geFile(operate, version, info).then((res) => {
    switch (res.code) {
      case "C00501":
        _this.$message.info(res.resultMessage);
        res = { resultObject: { data: [] } };
        break;
      case "000000":
        break;
    }
    if (!key) {
      key = "data_list";
    }
    _this[key] = res.resultObject.data;
    _this.find_form.totalDataNum = res.resultObject.totalDataNum;
  });
};

// 3.下载文件 type: 1-普通资源 2-AR资源
export const downloadFile = (type, version, resId) => {
  switch (type) {
    case 1:
      var url = fileUrl + `file/download/source/v${version}?Mark=${resId}`;
      break;
    case 2:
      var url = fileUrl + `file/download/u3d/v${version}?Mark=${resId}`;
      break;
  }

  return axios.get(url);
};

// 4.文件禁用
export const disableFile = (version, info) => {
  var url = fileUrl + `file/info/disable/v${version}`;
  return axios.delete(url, { data: info });
};

// 5.文件恢复
export const enableFile = (version, info) => {
  var url = fileUrl + `file/info/enable/v${version}`;
  return axios.patch(url, info);
};

// 8.文件上传 type: 1-账号资源 2-公共资源 3-AR资源
export const uploadFiles = (
  type, // 文件类型
  version, // 版本
  fileList, // 文件列表
  parameter1, // 参数1
  parameter2 // 参数2
) => {
  var formData = createFormData(fileList);

  switch (type) {
    case 1:
      var path = `file/upload/self/v${version}`;
      break;
    case 2:
      var path = `file/upload/common/v${version}?Remarks=${parameter1}`;
      break;
    case 3:
      var path = `file/upload/u3d/v${version}?ShowResourceName=${parameter1}&&Remarks=${parameter2}`;
      break;
  }
  var url = fileUrl + path;
  return axios.put(url, formData);
};
