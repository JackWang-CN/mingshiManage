import axios from "axios";

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

// 8.文件上传 resourceType = backAR || backWEB || app
const fileUrl = "https://api.resources.scmsar.com/";

export const uploadFiles = (
  resourceType, // 文件类型
  version, // 版本
  resourceName, // 文件名称
  remarks, // 备注
  fileList // 文件列表
) => {
  var formData = createFormData(fileList);
  var url =
    fileUrl +
    `file/upload/${resourceType}/v${version}?ResourceName=${resourceName}&Remarks=${remarks}`;
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
    console.log(_this[key]);
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
