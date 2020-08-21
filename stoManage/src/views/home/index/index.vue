<!-- 首页 -->
<template>
  <div id="index" class="shadow_container">
    <!-- 上方盒子 -->
    <div class="top">
      <!-- 消息通知 -->
      <div class="left">
        <h6>我的收益:</h6>
        <div class="today">当日收益:5435</div>
        <div class="total">总金币:3450</div>
        <h6>消息通知:</h6>
        <ul class="notice">
          <li v-for="(item,index) in message_list" :key="index">
            <p>{{item.title}}</p>
            <div>{{item.creationTime}}</div>
          </li>
        </ul>
      </div>
      <!-- 官方公告 -->
      <div class="right">
        <h6>
          官方公告:
          <el-button type="primary" size="small" @click="showNotice('list')">更多</el-button>
        </h6>
        <ul class="notice">
          <li v-for="(item,index) in notice_list" :key="index" @click="showNotice('details')">
            <p>{{item.title}}</p>
            <div>
              <span>{{item.creationTime}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 下方盒子 -->
    <div class="bottom">
      <h6>当前订单:</h6>
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
        {
          title: "初中生把西游记画成81难通关图",
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
        {
          title: "京雄城际年底贯通京雄城际年底贯通",
          creationTime: "1小时前",
        },
        {
          title: "24岁抗洪牺牲消防员赵丹被评烈士24岁抗洪牺牲消防员赵丹被评烈士",
          creationTime: "1小时前",
        },
        {
          title: "全球新冠累计超2199万例",
          creationTime: "1小时前",
        },
        {
          title: "航班延误100多名中国乘客滞留美国",
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
  padding-left: 50px;
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
    .notice {
      width: 80%;
      padding: 0 15px;
      li {
        margin: 20px 0;
        p {
          cursor: pointer;
          line-height: 20px;
          &:hover {
            color: #409eff;
          }
        }
        div {
          font-size: 14px;
          color: rgb(153, 152, 152);
          margin-top: 8px;
        }
      }
    }
    // 左
    .left {
      width: 50%;
      .today {
        font-size: 45px;
        margin-left: 10%;
      }
      .total {
        margin: 50px 10%;
        font-size: 17px;
      }
      .notice {
        border: 1px solid #000;
      }
    }
    // 右
    .right {
      width: 30%;
      .notice {
        width: 100%;
      }
    }
  }

  // 下方盒子
  .bottom {
    width: 80%;
  }
}
</style>