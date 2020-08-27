const imUrl = "ws://192.168.0.89:7774";

// 连接到IM
export const ws = new WebSocket("ws://192.168.0.89:7774");
// 监听（接收数据）
// ws.onmessage = (messageEvent) => {
//   console.log(messageEvent, messageEvent.data);
// };

// 发送请求 type(string)：6-登录 8-发送信息 0-注销
export const sendIm = (info) => {
  var str = JSON.stringify(info);
  ws.send(str);
};

// 2.监听
