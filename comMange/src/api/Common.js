/*公共方法*/





// 拼接文件URL
export const spliceUrl = (arr, imgKey) => {
      arr.forEach((item) => {
        item[imgKey] =
          "http://192.168.0.89:9007/f1/FileResources/DownLoad?pathtemp=" +
          item[imgKey];
      });
      return arr;
    };



// 创建一个getform对象
export const creatGet = (currPage, pageSize, scene, caseScene) => {
      var obj = {};
      obj.currPage = currPage || 1;
      obj.pageSize = pageSize || 10;
      obj.data = {}; 
      if (scene) obj.data.scene = scene;
      if (caseScene) obj.data.caseScene = caseScene;
      return obj;
    };

// 筛选Json
export const createObj =(obj)=>{
    var newObj={}
    for(const key in obj){
        if(obj[key]){
            newObj[key]=obj[key]
        }
    }
    return newObj;
}

export const deletcondition = (list) =>{
    var newObj = [];    
    list.forEach(item => {
        var json = {
            "tableId":item["tableId"],
            "userId":item["userId"]
        }
        newObj.push(json);
    });

    return newObj;
}

export const deletconditionofbusiness = (list) =>{
    var newObj = [];    
    list.forEach(item => {
        var json = {
            "tableId":item["tableId"],
            "bcId":item["bcId"]
        }
        newObj.push(json);
    });

    return newObj;
}


// 拼接模糊查询字段
export const spliceKey = (obj) => {
      var newObj = {};
      for (const key in obj) {
        if (key == "creationTime") {
          obj[key].forEach((item, index) => {
            obj[key][index] = item.toJSON();
          });
          newObj._ge_creationTime = obj[key][0];
          newObj._le_creationTime = obj[key][1];
        } else {
          newObj["_likel_" + key] = obj[key];
        }
      }
      return newObj;
    };
    