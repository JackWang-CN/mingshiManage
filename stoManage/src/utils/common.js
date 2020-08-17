/* 公共方法 */

// 拼接文件URL
export const spliceUrl = (arr, imgKey) => {
  arr.forEach((item) => {
    if (item[imgKey]) {
      item[imgKey] =
        "https://api.resources.scmsar.com/f1/FileResources/DownLoad?pathtemp=" +
        item[imgKey];
    }
  });
  return arr;
};

// 拼接模糊查询字段
export const spliceKey = (obj) => {
  var newObj = {};
  for (const key in obj) {
    if (key == "creationTime") {
      obj[key].forEach((item, index) => {
        obj[key][index] = item.toJSON();
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
export const createGet = (currPage, pageSize) => {
  var obj = {};
  obj.currPage = currPage || 1;
  obj.pageSize = pageSize;

  return obj;
};

// 创建一个formData对象
export const creatFormData = (file) => {
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
    if (obj[key]) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};
