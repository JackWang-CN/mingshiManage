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
            :key="item.headIco"
            @click="switchCustomer(item, $event)"
            :class="item.isActive ? 'active' : ''"
          >
            <el-avatar
              :size="50"
              :src="item.headIco"
              shape="square"
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
                item.message[item.message.length - 1].content
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
              v-for="(item, index) in data_info.message"
              :key="index"
              :class="item.type == 0 ? 'send' : ''"
            >
              <el-avatar
                :size="50"
                :src="item.type == 0 ? my_headIco : data_info.headIco"
                shape="square"
              ></el-avatar>
              <p :class="item.type == 0 ? 'send' : ''">{{ item.content }}</p>
            </li>
          </ul>
          <!-- 输入框 -->
          <div class="message_input">
            <textarea v-model="data_info.draft" @input="saveDraft"></textarea>
            <button @click="sendMessage">发送</button>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// import "@/utils/api/imApi";
import { getDataList } from "@/utils/api/apis";
export default {
  mounted() {
    this.my_headIco = sessionStorage.getItem("headImg");

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

      data_info: {},
      data_list: [
        {
          isActive: true,
          headIco:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=924062807,3669172550&fm=26&gp=0.jpg",
          nickname: "王俊凯",
          message: [
            { type: "16", content: "正哥，在干什么呢", create: "" },
            { type: "0", content: "啊，我上班呢，咋了兄弟", create: "" },
            { type: "0", content: "有啥事儿吗", create: "" },
            { type: "16", content: "哦哦 没事 最近要来成都", create: "" },
            { type: "16", content: "想来看看你", create: "" },
            { type: "0", content: "最近任务有点重，怕是不得空哟", create: "" },
            { type: "0", content: "你几号到嘛", create: "" },
            {
              type: "16",
              content: "我可能是月底的那一到两天到，到时候行程出来了我跟你讲",
              create: "",
            },
            {
              type: "16",
              content: "你想好咋个招待我没得，我想吃火锅，还想打英雄联盟",
              create: "",
            },
            { type: "16", content: "提前准备好哈", create: "" },
            { type: "0", content: "你莫来了", create: "" },
          ],
        },
        {
          isActive: false,
          headIco:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597832144962&di=3cdb9b44557f354e6e647105e1841190&imgtype=0&src=http%3A%2F%2Fpics5.baidu.com%2Ffeed%2Fc9fcc3cec3fdfc03c415e10cfd049193a5c226d2.png%3Ftoken%3D9421e79df9e4b686efd365a26c0d0a02",
          nickname: "林可儿",
          message: [
            { type: "16", content: "正哥，在干什么呢", create: "" },
            { type: "0", content: "啊，我上班呢，咋了兄弟", create: "" },
            { type: "0", content: "有啥事儿吗", create: "" },
            { type: "16", content: "哦哦 没事 最近要来成都", create: "" },
            { type: "16", content: "想来看看你", create: "" },
          ],
        },
        {
          isActive: false,
          headIco:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597832125083&di=bffb4559f7fd706b877a42b1dd4ab95b&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F1707a8e86693a27217ab27c24462e7109217ee00.jpg",
          nickname: "林青檀",
          message: [
            { type: "16", content: "正哥，在干什么呢", create: "" },
            { type: "0", content: "啊，我上班呢，咋了兄弟", create: "" },
            { type: "0", content: "有啥事儿吗", create: "" },
            { type: "16", content: "哦哦 没事 最近要来成都", create: "" },
            { type: "16", content: "想来看看你", create: "" },
          ],
        },
      ],
    };
  },

  methods: {
    // 切换聊天窗口
    switchCustomer(customer, event) {
      // 1.保存草稿
      this.saveDraft(this.data_info);

      // 2.激活点击的会话
      this.data_info = { ...customer };
      var { nickname } = customer;

      this.data_list.forEach((item) => {
        if (item.nickname == nickname) {
          item.isActive = true;
        } else {
          item.isActive = false;
        }
      });
    },

    // 保存草稿
    saveDraft(obj) {
      var { nickname, draft } = obj;
      this.data_list.forEach((item) => {
        if (item.nickname == nickname) {
          item.draft = draft;
        }
      });
    },

    // 发送消息
    sendMessage() {
      console.log(this.data_info);
      var content = this.data_info.draft;
      var nickname = this.data_info.nickname;
      var create = new Date().toJSON();
      var obj = {
        type: "0",
        content,
        create,
      };

      // 添加到列表中
      for (var item of this.data_list) {
        if (item.nickname == nickname) {
          item.message.push(obj);
          break;
        }
      }
      this.data_info.draft = "";
    },

    // 测试
    printA(v) {
      console.log("测试成功", v);
    },
  },
};
</script>

<style lang='scss'>
#message_center {
  width: 1500px;
  padding: 0;
  #chat_box {
    height: 1000px;

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
        height: 940px;

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
}
</style>