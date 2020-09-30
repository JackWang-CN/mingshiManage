/* 公共方法 */

const fileUrl = "https://api.resources.scmsar.com/";

// 拼接文件URL
export const spliceUrl = (arr, imgKey) => {
  arr.forEach((item) => {
    if (item[imgKey]) {
      item.originally = item[imgKey];
      item[imgKey] = fileUrl + "file/download/source/v1?Mark=" + item[imgKey];
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
  if (order) {
    obj.orderByFileds = order + " desc";
  } else {
    obj.orderByFileds = "creationtime desc";
  }

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
    if (obj[key]) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

// 转换日期选择器的数组
export const switchDateList = (
  dateList,
  startKey = "startTime",
  endKey = "endTime"
) => {
  var obj = {};
  obj[startKey] = dateList[0].toJSON();
  obj[endKey] = dateList[1].toJSON();

  return obj;
};

// 判断结果，进行提示
export const hintMessage = (_this, code, message = "操作成功！") => {
  switch (code) {
    case "000000":
      _this.$message.success(message);
      break;
  }
};
