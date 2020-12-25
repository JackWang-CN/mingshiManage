<template>
  <div id="message_center" class="shadow_container">
    <!-- 消息中心 -->
    <el-container id="chat_box">
      <!-- 会话列表 -->
      <el-aside width="300px">
        <ul>
          <li class="search">
            <input type="text" />
          </li>
          <li
            v-for="item in data_list"
            :key="item.nickname"
            @mousedown="rightClick($event, item)"
            @click="
              item.chatType == 'Notice'
                ? getNoctice(item)
                : switchCustomer(item)
            "
            :class="item.isActive ? 'active chat_list' : 'chat_list'"
          >
            <el-avatar
              :size="50"
              :src="item.imgUrl"
              shape="square"
              class="headImg"
            ></el-avatar>
            <div class="chat">
              <!-- 昵称 -->
              <span class="nickname">{{ item.nickname }}</span>
              <!-- 消息 -->
              <span class="message" v-if="item.draft && !item.isActive">
                <span>[草稿]</span>
                {{ item.draft }}
              </span>
              <span class="message" v-else-if="!item.draft || item.isActive">{{
                item.bulletin
              }}</span>
            </div>
          </li>
        </ul>
      </el-aside>

      <!-- 会话窗口 -->
      <el-main>
        <h3>{{ data_info.nickname }}</h3>
        <div class="chat_details">
          <ul class="message_box">
            <li
              v-for="(item, index) in message_list"
              :key="index"
              :class="item.chatMode == 'out' ? 'send' : ''"
            >
              <el-avatar
                :size="50"
                :src="item.imgUrl"
                shape="square"
              ></el-avatar>
              <p :class="item.chatMode == 'out' ? 'send' : ''">
                {{ item.msg }}
              </p>
            </li>
          </ul>
          <!-- 输入框 -->
          <div class="message_input">
            <textarea v-model="data_info.draft" @input="saveDraft"></textarea>
            <button :disabled="sendBtn_status" @click="sendMessage">
              发送
            </button>
          </div>
        </div>
      </el-main>
    </el-container>

    <!-- 右键菜单 -->
    <ul
      id="rightMenu"
      :style="`top:${menu_y};left:${menu_x}`"
      v-show="showMenu"
    >
      <li>标为未读</li>
      <li>删除</li>
    </ul>
  </div>
</template>

<script>
import { spliceImg, createGet, toBeProto } from "@/utils/common";
import { getData, getDataList, getDetail } from "@/utils/api/apis";
export default {
  created() {
    document.oncontextmenu = () => {
      return false;
    };

    document.onmousedown = (e) => {
      var className = e.target.className;
      console.log(className);
      if (
        !className.includes("chat_list") &&
        !className.includes("nickname") &&
        !className.includes("message") &&
        !className.includes("chat")
      )
        this.showMenu = false;
    };
  },

  props: ["message"],

  mounted() {
    this.my_headIco = sessionStorage.getItem("headImg");

    // 请求会话列表
    getDataList(
      this.model,
      this.control,
      1,
      {},
      this,
      "data_list",
      "merChatList"
    );
  },

  data() {
    return {
      my_headIco: "",
      model: "social",
      control: "chatLog",
      find_form: {},
      data_info: {},
      data_list: [
        {
          isActive: false,
          headIco: "",
          nickname: "林青檀",
        },
      ],

      sendBtn_status: false, // 发送按钮禁用状态

      receiveID: "", // 当前聊天的客户ID
      message_list: [], // 聊天记录
      chatHeight: 0, // 聊天窗口偏移值

      menu_x: "0", // 右键菜单偏移值
      menu_y: "0", // 右键菜单偏移值
      showMenu: false,
    };
  },

  methods: {
    // 切换聊天窗口
    async switchCustomer(customer) {
      this.sendBtn_status = false;

      var { nickname, receiveID } = customer;
      this.receiveID = receiveID;
      // 1.保存草稿
      if (this.data_info.draft) {
        this.saveDraft(this.data_info);
      }
      // 2.激活点击的会话
      this.data_info = { ...customer };
      this.data_list.forEach((item) => {
        if (item.nickname == nickname) {
          item.isActive = true;
        } else {
          item.isActive = false;
        }
      });
      // 3.请求点击会话的聊天记录
      var chat_list = sessionStorage.getItem(receiveID);
      if (chat_list) {
        // 已保存
        this.message_list = JSON.parse(chat_list) || [];
      } else {
        // 未保存
        this.find_form = createGet(1, 20);
        this.find_form.data = { receiveID: this.data_info.receiveID };
        var res = await getData(
          this.model,
          this.control,
          1,
          this.find_form,
          "userChatLogList"
        );
        this.message_list = res.resultObject || [];
        sessionStorage.setItem(receiveID, JSON.stringify(res.resultObject));
      }
      // 窗口向下偏移
      this.rollBottom();
    },

    // 保存草稿
    saveDraft(obj) {
      var { userID, draft } = obj;

      this.data_list.forEach((item) => {
        if (item.userID == userID) {
          item.draft = draft;
        }
      });
    },

    // 发送消息
    sendMessage() {
      var { draft, receiveID, userID } = this.data_info;
      this.data_info.draft = "";
      console.log(receiveID, draft);
      toBeProto(10, receiveID, draft);

      // 存入緩存
      var userHeadpng = sessionStorage.getItem("headImg");
      var dateTime = new Date().toJSON();
      var obj = {
        chatMode: "out",
        dateTime,
        msg: draft,
        userHeadpng,
        userId: userID,
      };
      this.saveRecord(obj);
      this.message_list = JSON.parse(sessionStorage.getItem(receiveID));

      // 窗口向下偏移
      this.rollBottom();
    },

    // 存储聊天记录
    saveRecord(obj) {
      // 1.获取用户ID
      var receiveID = this.receiveID;

      // 2.判断是否已存在
      var chat_list = sessionStorage.getItem(receiveID);
      if (!!chat_list) {
        // 3-1.已存
        chat_list = JSON.parse(chat_list);
      } else {
        // 3-2.未存
        chat_list = [];
      }
      // 4.追加到记录中
      chat_list.push(obj);
      chat_list = JSON.stringify(chat_list);
      sessionStorage.setItem(receiveID, chat_list);
    },

    // 获取消息长度并滚到最下
    rollBottom() {
      this.$nextTick(() => {
        this.chatHeight = document.querySelector(".message_box").scrollHeight;
        document.querySelector(".message_box").scrollTop = this.chatHeight;
      });
    },

    // 获取公告
    getNoctice(customer) {
      var { nickname } = customer;
      this.data_list.forEach((item) => {
        if (item.nickname == nickname) {
          item.isActive = true;
        } else {
          item.isActive = false;
        }
      });

      this.sendBtn_status = true;
      getDataList(
        this.model,
        this.control,
        1,
        this.find_form,
        this,
        "message_list",
        "getPashInfo"
      );
    },

    // 鼠标右击事件
    rightClick(e) {
      this.showMenu = false;
      if (e.button == 2) {
        console.log(e.clientX, e.clientY);
        this.menu_x = e.clientX + "px";
        this.menu_y = e.clientY + "px";
        this.showMenu = true;
      }
    },
  },

  watch: {
    data_list() {
      spliceImg(this.data_list, "userHeadpng");
      console.log(this.data_list);
    },

    message_list() {
      spliceImg(this.message_list, "userHeadpng");
    },

    // 当来新消息时触发
    message(msg) {
      if (!msg) return;
      console.log(msg);
      var receiveID = msg.friendID;

      // 1.判断用户是否已在会话列表中
      var flag = false;
      var sort = null;
      this.data_list.some((item, index) => {
        if (item.receiveID == receiveID) {
          flag = true;
          sort = index;
        }
        return item.receiveID == receiveID;
      });

      if (flag) {
        // 已存在则更新消息预览
        this.data_list[sort].bulletin = msg.msg;
      } else {
        // 不存在则重新请求会话
        getDataList(
          this.model,
          this.control,
          1,
          {},
          this,
          "data_list",
          "merChatList"
        );
      }

      // 2.判断消息来源是否为当前激活会话
      if (this.receiveID == receiveID) {
        var userHeadpng = this.data_info.userHeadpng;
        console.log(this.data_info);
        var dateTime = new Date(msg.time * 1000).toJSON();
        // 编译并保存
        var obj = {
          chatMode: "in",
          dateTime,
          msg: msg.msg,
          userHeadpng,
          userId: receiveID,
        };
        this.saveRecord(obj);
        var chat_list = sessionStorage.getItem(receiveID);
        this.message_list = JSON.parse(chat_list);

        // 窗口向下偏移
        this.rollBottom();
      }
    },
  },
};
</script>

<style lang='scss'>
#message_center {
  width: 1500px;
  padding: 0;
  #chat_box {
    // height: 800px;

    // 左侧会话列表
    aside {
      height: 100%;
      background-color: rgb(241, 241, 241);
      li {
        padding: 15px 10px;
        display: flex;
        align-items: center;
        &:hover {
          background-color: rgb(219, 218, 217);
        }
        &.active {
          background-color: rgb(200, 199, 199);
        }
        &.search {
          height: 30px;
          background-color: rgb(237, 234, 232);
        }
        // 头像
        .el-avatar {
          margin-right: 10px;
        }
        // 昵称&消息
        .chat {
          display: flex;
          flex-direction: column;
          width: 220px;
          span {
            display: block;
            display: flex;
            align-items: center;
            &.message {
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              margin-top: 10px;
              font-size: 14px;
              color: rgb(156, 156, 156);
              span {
                color: rgb(214, 0, 0);
              }
            }
          }
        }
      }
    }

    // 右侧聊天窗口
    main {
      padding: 0;
      background-color: rgb(245, 245, 245);

      h3 {
        height: 59px;
        line-height: 60px;
        font-size: 20px;
        border-bottom: 1px solid #e7e7e7;
        padding-left: 30px;
      }
      .chat_details {
        display: flex;
        flex-direction: column;
        height: 750px;
        &::-webkit-scrollbar  {
          display: none;
        }

        // 聊天窗口
        .message_box {
          flex-grow: 1;
          padding: 0 20px;
          border-bottom: 1px solid #e7e7e7;
          max-height: 680px;
          overflow: scroll;
          &::-webkit-scrollbar {
            display: none;
          }
          li {
            display: flex;
            align-items: center;
            margin: 20px 0;
            &.send {
              flex-direction: row-reverse;
            }
            p {
              margin: 0 10px;
              padding: 10px;
              background-color: #fff;
              border: 1px solid #ececec;
              border-radius: 4px;
              &:hover {
                background-color: rgb(245, 245, 245);
              }
              &.send {
                background-color: rgb(158, 234, 106);
                &:hover {
                  background-color: rgb(133, 224, 71);
                }
              }
            }
          }
        }

        // 输入框
        .message_input {
          min-height: 200px;
          max-height: 500px;
          background-color: #fff;
          display: flex;
          flex-direction: column;
          padding: 8px 15px;
          textarea {
            height: 200px;
            border: none;
            outline: none;
            resize: none;
            font-size: 15px;
            font-family: "微软雅黑";
          }
          button {
            cursor: pointer;
            align-self: flex-end;
            outline: none;
            border: 1px solid rgb(229, 229, 229);
            background-color: rgb(245, 245, 245);
            font-size: 14px;
            padding: 6px 25px;
            &:hover {
              background-color: rgb(18, 150, 17);
              color: #fff;
            }
            &:active {
              background-color: rgb(24, 207, 24);
              color: #fff;
            }
          }
        }
      }
    }
  }

  // 右键菜单
  #rightMenu {
    position: absolute;
    background-color: #fff;
    border: 1px solid #dadada;
    li {
      padding: 5px 30px;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        background-color: rgb(226, 226, 226);
      }
    }
  }
}
</style>