/* 公共方法 */

const fileUrl = "http://192.168.0.89:9001/f1/FileResources/";

// 拼接文件URL
export const spliceUrl = (arr, imgKey, type) => {
  arr.forEach((item) => {
    if (item[imgKey]) {
      item.originally = item[imgKey];
      item[imgKey] = fileUrl + "DownLoad?pathtemp=" + item[imgKey];
    }
  });
  return arr;
};

// 拼接模糊查询字段
const notSplice = ["type", "Id", "State", "scene", "resExtName", "is"];

export const spliceKey = (obj) => {
  var newObj = {};
  for (const key in obj) {
    // 判断是否需要拼接
    for (var item of notSplice) {
      if (key.includes(item)) {
        var flag = true;
        break;
      } else {
        var flag = false;
      }
    }
    if (flag) {
      newObj[key] = obj[key];
    } else if (key == "creationTime") {
      obj[key].forEach((item, index) => {
        var date = new Date(item);
        obj[key][index] = date.toJSON();
      });
      newObj._ge_creationTime = obj[key][0];
      newObj._le_creationTime = obj[key][1];
    } else {
      newObj["_like_" + key] = obj[key];
    }
  }
  return newObj;
};

// 创建一个getform对象
export const createGet = (currPage, pageSize, order) => {
  var obj = {};
  obj.currPage = currPage || 1;
  obj.pageSize = pageSize || 10;
  obj.orderByFileds = order || "creationtime desc";
  obj.totalDataNum = 0;
  obj.data = {};

  return obj;
};

// 创建一个formData对象
export const createFormData = (file) => {
  var formData = new window.FormData();
  file.forEach((item, index) => {
    formData.append("files" + index, item.raw);
  });
  return formData;
};

// 过滤Json
export const filteObj = (obj) => {
  var newObj = {};
  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== "") {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};
