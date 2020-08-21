<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "app",

  mounted() {
    // 初始化
    this.init();
  },

  data() {
    return {
      socket: null,
      path: "ws://192.168.0.89:7774",
    };
  },

  methods: {
    init() {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      } else {
        // 实例化socket
        this.socket = new WebSocket(this.path);
        // 监听socket连接
        this.socket.onopen = this.open;
        // 监听socket错误信息
        this.socket.onerror = this.error;
        // 监听socket消息
        this.socket.onmessage = this.getMessage;
      }
    },

    open() {
      console.log("socket连接成功");
    },

    error() {
      console.log("连接错误");
    },

    getMessage(msg) {
      console.log(msg.data);
    },

    send() {
      this.socket.send(params);
    },

    close() {
      console.log("socket已经关闭");
    },
  },
};
</script>

<style></style>
