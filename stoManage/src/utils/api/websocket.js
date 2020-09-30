const imUrl = "ws://192.168.0.168:7774";

// 连接到IM
export const ws = new WebSocket(imUrl);

// 客户端接收服务端数据时触发
ws.onmessage;

// 连接建立时触发
ws.onopen;

// 通信发生错误时触发
ws.onerror;

// 连接关闭时触发
ws.onclose;
// 监听（接收数据）
// ws.onmessage = (messageEvent) => {
//   console.log(messageEvent, messageEvent.data);
// };

// 初始化websocket
export const initWebsocket=()=> {
  this.websocket = new WebSocket("ws://192.168.0.168:7774");
  this.websocket.onmessage = webMessage;
  this.websocket.onopen = webConnect;
  this.websocket.onsend =webSend;
  this.websocket.onerror = webError;
  this.websocket.onclose = webClose;
},



// 发送请求 type(string)：6-登录 8-发送信息 0-注销
export const sendIm = (info) => {
  var str = JSON.stringify(info);
  console.log(str);
  ws.send(str);
};
