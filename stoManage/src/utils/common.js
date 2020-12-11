/* 公共方法 */
import Vue from "vue";

const fileUrl =
  "https://api.resources.scmsar.com/file/download/source/v1?Mark=";

const myVue = new Vue();

// 拼接文件URL
export const spliceImg = (arr, imgKey, flag) => {
  arr.forEach((item) => {
    if (item[imgKey]) {
      var url = flag ? arUrl : fileUrl;
      item.imgUrl = url + item[imgKey];
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

// 转换为二进制
export const toBinary = (num) => {
  var targets = [];
  targets[0] = num & 0xff;
  targets[1] = (num >> 8) & 0xff;
  targets[2] = (num >> 16) & 0xff;
  targets[3] = (num >> 24) & 0xff;
  return targets;
};

// byte数组转int
export const toInt = (newArr) => {
  var b3 = newArr[0] & 0xff;
  var b2 = newArr[1] & 0xff;
  var b1 = newArr[2] & 0xff;
  var b0 = newArr[3] & 0xff;
  return (b0 << 24) | (b1 << 16) | (b2 << 8) | b3;
};

// IM封包
export const toBeProto = (MsgID, parmas1, parmas2) => {
  // 1.创建IM登录包体
  var HeadLength = 20; //消息头长度
  var ClientVersion = 1; //客户端版本号
  var MsgID = MsgID; //消息码ID
  var Seq = Math.ceil(Math.random() * 10000); //消息序列

  // 2.实例消息体，并赋值
  var Body;
  var time = Math.ceil(new Date().getTime() / 1000);
  switch (MsgID) {
    // 心跳
    case 1:
      Body = new proto.Wang.TimeStamp();
      Body.setTime(time);
      console.log("发送心跳");
      break;

    // 用户登录
    case 3:
      Body = new proto.Wang.UserLogin();
      Body.setToken(parmas1);
      Body.setUsertype(1);
      Body.setTime(time);
      break;

    // 发送消息给用户
    case 10:
      console.log("发送消息给用户");
      Body = new proto.Wang.SendMsgToFriend();
      Body.setFriendid(parmas1);
      Body.setMsgtype(0);
      Body.setMsg(parmas2);
      Body.setTime(time);
      break;
  }

  // 3.将消息体转为二进制
  Body = Body.serializeBinary();
  var BodyLength = Body.length;
  var HeadLength = toBinary(HeadLength);
  var ClientVersion = toBinary(ClientVersion);
  var MsgID = toBinary(MsgID);
  var Seq = toBinary(Seq);
  var BodyLength = toBinary(BodyLength);

  // 4.拼接IM报文
  var IMMsg = `${HeadLength},${ClientVersion},${MsgID},${Seq},${BodyLength},${Body}`;

  // 5.发送IM报文
  window.websocket.onsend(IMMsg);
};

// IM解包
export const translateProto = (str) => {
  // 1.编译获得byte数组
  var arr = str.split(" ");
  var newArr = [];
  arr.forEach((item) => {
    if (item) {
      newArr.push(parseInt(item, 16));
    }
  });

  // 2.获取包头信息
  var HeadLength = toInt(newArr.splice(0, 4));
  var ClientVersion = toInt(newArr.splice(0, 4));
  var MsgID = toInt(newArr.splice(0, 4));
  var Seq = toInt(newArr.splice(0, 4));
  var BodyLength = toInt(newArr.splice(0, 4));
  var Body = newArr.splice(0, BodyLength);

  // 3.判断消息类型
  var res;
  switch (MsgID) {
    // 心跳
    case 1:
      res = proto.Wang.TimeStamp.deserializeBinary(Body);
      console.log("心跳回应", res);
      break;

    // 踢人(被挤下线)
    case 2:
      res = proto.Wang.TickUser.deserializeBinary(Body);
      console.log("被挤下线", res);
      break;

    // 用户登录
    case 3:
      res = proto.Wang.ResponseResult.deserializeBinary(Body);
      console.log("登录结果：", res.array[1], "准备发送心跳");
      myVue.$notify({
        title: "新消息",
        message: "IM登录成功",
        type: "success",
        position: "bottom-right",
      });

      if (res.array[1] == "ok") {
        toBeProto(1);
        setInterval(() => {
          toBeProto(1);
        }, 120000);
      }
      break;

    // 注销登陆
    case 4:
      console.log("注销登陆");
      break;

    // 接收好友申请
    case 7:
      console.log("接收好友申请");
      myVue.$notify({
        title: "好友申请",
        message: "有新的好友申请",
        type: "warning",
        position: "bottom-right",
      });
      break;

    // 处理好友申请
    case 8:
      console.log("处理好友申请");
      break;

    // 删除好友
    case 9:
      console.log("删除好友");
      break;

    // 发送消息
    case 10:
      console.log("发送消息");
      break;

    // 接收消息
    case 13:
      res = proto.Wang.ReceiveMsgInfo.deserializeBinary(Body);
      var res = res.array;
      var obj = {
        friendType: res[0] || 0,
        friendID: res[1],
        msgType: res[2] || 0,
        msg: res[3],
        time: res[4],
      };
      myVue.$notify({
        title: "新消息",
        message: "您有新的消息，请注意查收",
        type: "warning",
        position: "bottom-right",
      });
      return obj;

    // 已读设置
    case 14:
      console.log("已读设置");
      break;

    // 一键已读
    case 15:
      console.log("一键已读");
      break;

    // 删除会话
    case 16:
      console.log("删除会话");
      break;

    // 接收通知
    case 18:
      console.log("接收通知");
      break;
  }
};
