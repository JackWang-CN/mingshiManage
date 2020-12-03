// 字符串换行转译
export const toWrap = (str) => {
  var arr = str.split("\n");
  return arr;
};

// 拼接文件URL
export const spliceUrl = (arr, key) => {
  arr.forEach((item) => {
    item[key] =
      "https://api.resources.scmsar.com/file/download/source/v1?mark=" +
      item[key];
  });
  return arr;
};

// 匹配删除字符串里的img标签
export const removeImg = (arr) => {
  var reg = /<[^<]*img[^>]*>/g;

  arr.forEach((item) => {
    var str = item.content;
    item.content = str.replace(reg, "");
  });
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
