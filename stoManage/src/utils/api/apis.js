import axios from "axios";
import { createFormData } from "@/utils/common";

// 设置基础地址
// axios.defaults.baseURL = "http://192.168.0.139:800";
axios.defaults.baseURL = "https://api.merchant.scmsar.com/";

/* 基础接口 */
// 1.查询列表
export const getData = (
  model,
  control,
  version,
  info,
  operate = "list",
  method
) => {
  var url = `${model}/${control}/${operate}/v${version}`;
  switch (method) {
    case "get":
      return axios.get(url, info);
    default:
      return axios.post(url, info);
  }
};

// 2.创建数据
export const addData = (model, control, version, info, operate = "create") => {
  var url = `${model}/${control}/${operate}/v${version}`;
  return axios.put(url, info);
};

// 3.详情数据
export const getDetail = (
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
export const delData = (model, control, version, info, operate = "delete") => {
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

// 8.文件上传 type: 1-账号资源 2-公共资源 3-AR模型资源 4-AR媒体资源
const fileUrl = "https://api.resources.scmsar.com/";

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
      var path = `file/upload/aru3d/v${version}?ShowResourceName=${parameter1}&&Remarks=${parameter2}`;
      break;
    case 4:
      var path = `file/upload/ar2d/v${version}?IsMain=${parameter1}&&MainARResID=${parameter2}`;
      break;
  }
  var url = fileUrl + path;
  return axios.put(url, formData);
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

    if (operate == "flowList" || control == "goods") {
      _this[key] = res.resultObject.data;
      return;
    }
    _this[key] = res.resultObject;
  });
};

// 2) 创建数据
export const addDataList = (model, control, version, info, _this, path) => {
  addData(model, control, version, info).then((res) => {
    switch (res.code) {
      case "000000":
        _this.$message.success("创建成功！");
        _this.$router.push(path);
        break;
    }
  });
};

// 3) 获取详情
export const getDataDetail = (
  model,
  control,
  version,
  info,
  _this,
  key,
  operate
) => {
  getDetail(model, control, version, info, operate).then((res) => {
    switch (res.code) {
      case "000000":
        if (!key) {
          key = "data_info";
        }
        _this[key] = res.resultObject;
    }
  });
};
