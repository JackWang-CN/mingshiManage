import axios from "axios";

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
  });
};

// 2) 创建数据
export const addDataList = (model, control, version, info, _this, key) => {
  addData(model, control, version, info).then((res) => {
    console.log(res);
    switch (res.code) {
      case "000000":
        _this.$message.success("创建成功！");
        break;
    }
  });
};

// 3) 获取详情
export const getDataDetail = (model, control, version, info, _this, key) => {
  getDetail(model, control, version, info, _this).then((res) => {
    _this[key] = res.resultObject;
  });
};
