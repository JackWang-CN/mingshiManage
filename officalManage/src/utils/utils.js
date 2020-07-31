/* 小工具整合 */

/* 上传文件返回的数据为一个数组,需将每个文件的字段resId变为mediaId以进行文件的场景分配 */
export const switchKeyName = (obj = {}, oldName, newName, scene) => {
  var arr = obj.temp;
  var newArr = [];
  arr.forEach((item) => {
    var obj = { scene };
    obj[newName] = item[oldName];
    newArr.push(obj);
  });
  return newArr;
};

// 拼接文件URL
export const spliceUrl = (arr, imgKey) => {
  arr.forEach((item) => {
    item[imgKey] =
      "http://192.168.0.89:9007/f1/FileResources/AppWebDownLoad?pathtemp=" +
      item[imgKey];
  });
  return arr;
};

// 创建一个getform对象
export const creatGet = (curpage, pagesize, scene, caseScene) => {
  var obj = {};
  obj.curpage = curpage || 1;
  obj.pagesize = pagesize;
  obj.data = {};
  if (scene) obj.data.scene = scene;
  if (caseScene) obj.data.caseScene = caseScene;
  return obj;
};
