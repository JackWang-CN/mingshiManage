<!-- 首页 -->
<template>
  <div id="index">
    <!-- 上方盒子 -->
    <div class="top">
      <!-- 左边 -->
      <div class="left card_container">
        <h3 class="title_first">我的收益</h3>
        <!-- 收益数 -->
        <div class="earnings">
          <span class="num">5435</span>
          <span>当日收益</span>
        </div>
        <!-- 总金币数 -->
        <div class="gold">
          <span>总金币</span>
          <span class="num">3450</span>
        </div>
      </div>

      <!-- 右边 -->
      <div class="right">
        <!-- 官网公告 -->
        <div class="card_container">
          <h3 class="title_second">
            <img width="23" height="23" src="@/assets/images/icon/notice.png" alt />
            官方公告
            <div class="btn">
              <button>更多</button>
            </div>
          </h3>
          <ul class="list">
            <li v-for="(item,index) in notice_list" :key="index" @click="showNotice('details')">
              <p>{{item.title}}</p>
              <span>{{item.creationTime}}</span>
            </li>
          </ul>
        </div>

        <!-- 消息通知 -->
        <div class="card_container">
          <h3 class="title_second">
            <img width="23" height="23" src="@/assets/images/icon/message.png" alt />
            消息通知
            <div class="btn">
              <button>更多</button>
            </div>
          </h3>
          <ul class="list">
            <li v-for="(item,index) in message_list" :key="index" @click="showNotice('details')">
              <p>{{item.title}}</p>
              <span>{{item.creationTime}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 下方盒子 -->
    <div class="bottom card_container">
      <h3 class="title_first">当前订单:</h3>
      <el-table :data="order_list" style="width: 100%">
        <el-table-column prop="creationTime" label="日期" width="180"></el-table-column>
        <el-table-column prop="aName" label="商品名称" width="180"></el-table-column>
        <el-table-column prop="price" label="金额"></el-table-column>
      </el-table>
    </div>

    <!-- 弹出框 公告详情 -->
    <el-dialog title="详情" :visible.sync="showNoticeDetails" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showNoticeDetails = false">确 定</el-button>
        <el-button @click="showNoticeDetails = false">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 弹出框 公告列表 -->
    <el-dialog title="官方公告" :visible.sync="showNoticeList" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showNoticeList = false">确 定</el-button>
        <el-button @click="showNoticeList = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 消息通知
      message_list: [
        {
          title: "菲律宾6.6级地震",
          creationTime: "2天前",
        },
        {
          title: "美国新冠肺炎确诊累计超560万",
          creationTime: "2天前",
        },
        {
          title: "新冠肺炎灭活疫苗预计12月底上市",
          creationTime: "2天前",
        },
        {
          title: "江苏盐城一面包车内发现女尸",
          creationTime: "2天前",
        },
      ],
      // 官方公告
      notice_list: [
        {
          title: "中国铁建董事长陈奋健坠楼身亡中国铁建董事长陈奋健坠楼身亡",
          creationTime: "1小时前",
        },
        {
          title: "四川首次启动I级防汛应急响应四川首次启动I级防汛应急响应",
          creationTime: "1小时前",
        },
        {
          title: "蒙古国送的3万只羊会变成羊肉蒙古国送的3万只羊会变成羊肉",
          creationTime: "1小时前",
        },
        {
          title: "特朗普所乘专机险与无人机相撞特朗普所乘专机险与无人机相撞",
          creationTime: "1小时前",
        },
      ],
      // 当前订单
      order_list: [
        {
          aName: "巧乐兹",
          creationTime: "2020-08-18 12:00",
          price: "50",
        },
        {
          aName: "冰工厂",
          creationTime: "2020-08-18 13:00",
          price: "25",
        },
        {
          aName: "冰工厂",
          creationTime: "2020-08-18 13:00",
          price: "25",
        },
        {
          aName: "冰工厂",
          creationTime: "2020-08-18 13:00",
          price: "25",
        },
      ],
      // 弹出框数据对象
      data_info: {},

      showNoticeDetails: false, // 官方公告详情框
      showNoticeList: false, // 官方公告列表框
    };
  },

  methods: {
    showNotice(type) {
      switch (type) {
        case "details":
          this.showNoticeDetails = true;
          break;
        case "list":
          this.showNoticeList = true;
          break;
      }
    },
  },
};
</script>

<style lang='scss'>
#index {
  h6 {
    font-size: 20px;
    margin: 20px 0 30px 0;
    display: flex;
    justify-content: space-between;
    font-weight: bold;
  }
  // 上方盒子
  .top {
    display: flex;
    margin-bottom: 50px;
    // 我的收益
    .left {
      min-width: 400px;
      margin-right: 20px;
      height: 100%;
      .title_one {
        margin-bottom: 40px;
      }
      .earnings {
        border-radius: 12px;
        padding: 90px 0;
        background-color: #dce5ff;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 40px;
        span {
          color: #6e6e6e;
          &.num {
            font-size: 32px;
            color: #ff4715;
            margin-bottom: 12px;
          }
        }
      }
      .gold {
        padding: 60px;
        display: flex;
        flex-direction: column;
        align-items: center;
        span {
          color: #6e6e6e;
          &.num {
            color: #fcba72;
            font-size: 20px;
            margin-top: 10px;
          }
        }
      }
    }
    // 右
    .right {
      flex: 1 0 auto;
      display: flex;
      flex-direction: column;
      > :first-child {
        margin-bottom: 15px;
      }
      .card_container {
        flex: 1 0 auto;
      }
    }
  }

  // 下方盒子
  .bottom {
    .el-table {
      margin-top: 30px;
    }
  }
}
</style>