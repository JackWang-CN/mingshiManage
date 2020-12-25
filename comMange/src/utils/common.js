/* 公共方法 */

const fileUrl = window.baseUrl.normal_file;
const arUrl = window.baseUrl.ar_2d;

// 拼接图片URL
export const spliceImg = (arr, imgKey, isAr = false) => {
  arr.forEach((item) => {
    if (item[imgKey]) {
      var url = isAr ? arUrl : fileUrl;
      item.imgUrl = url + item[imgKey];
    }
  });
  return arr;
};

// 转译时间戳为日期
export const translateTime = (arr, timeKey) => {
  // debugger;
  arr.forEach((item) => {
    if (item[timeKey] !== "-1") {
      item.pastDate = new Date(item[timeKey] - 0).toJSON();
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
    } else if (key == "createTime") {
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
  obj.pageSize = pageSize || 5;
  if (order) {
    obj.orderByFileds = order;
  }
  obj.totalDataNum = 0;
  obj.data = {};

  return obj;
};

// 创建一个formData对象
export const createFormData = (file) => {
  var formData = new window.FormData();
  file.forEach((item, index) => {
    if (item.raw) {
      formData.append("files" + index, item.raw);
    } else {
      formData.append("files" + index, item);
    }
  });

  return formData;
};

// 过滤Json
export const filteObj = (obj) => {
  // 判断data中有无属性
  if (Object.keys(obj.data).length == 0) {
    delete obj.data;
    return obj;
  }

  // 有具体属性则进行过滤
  var newObj = {},
    data = obj.data;
  for (const key in data) {
    if (data[key] !== null && data[key] !== "") {
      newObj[key] = data[key];
    }
  }
  if (Object.keys(newObj).length > 0) {
    obj.data = newObj;
  } else {
    delete obj.data;
  }
  return obj;
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
export const hintMessage = (_this, res, message = "操作成功！") => {
  switch (res.code) {
    case "000000":
      _this.$message.success(message);
      break;
    default:
      _this.$message.error(res.resultMessage);
      break;
  }
};
