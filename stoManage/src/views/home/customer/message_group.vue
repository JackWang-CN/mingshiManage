<template>
  <!-- 消息群发 -->
  <div id="message_group" class="shadow_container">
    <el-tabs v-model="activeName" type="border-card">
      <!-- 消息群发 -->
      <el-tab-pane label="发送新消息" name="apply">
        <el-form label-width="100px">
          <el-form-item label="发送客户:">
            <el-input v-model="apply_form.title"></el-input>
            <el-button type="primary" size="medium" @click="showCustomerList">选择客户</el-button>
          </el-form-item>
          <el-form-item label="发送内容:">
            <el-input type="textarea" v-model="apply_form.content" :rows="20"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">提交申请</el-button>
            <el-button type="danger">取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <!-- 历史发送 -->
      <el-tab-pane label="历史发送" name="history">
        <!-- 表单 -->

        <div class="search">
          <el-input v-model="find_form.info" placeholder="客户、信息内容" prefix-icon="el-icon-search"></el-input>
        </div>

        <!-- 表格 -->
        <el-table :data="data_list" max-height="250">
          <el-table-column fixed prop="date" label="发送日期" width="200"></el-table-column>
          <el-table-column prop="friendList" label="接收好友" width="300"></el-table-column>
          <el-table-column prop="content" label="发送内容" width="500"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!-- 弹出框 -->
    <el-dialog title="选择客户" :visible.sync="showCustomer">
      <el-checkbox-group v-model="select_list">
        <el-checkbox
          v-for="item in friend_list"
          :label="item.userId"
          :key="item.nickname"
        >{{item.nickname}}</el-checkbox>
      </el-checkbox-group>
      <el-button type="primary" @click="confirm" size="medium" style="margin-top:40px">确定</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  mounted() {
    this.activeName = "apply";
  },

  data() {
    return {
      // 申请援助数据对象
      apply_form: {},
      // 搜索数据对象
      find_form: {},
      // 历史记录
      data_list: [
        {
          date: "2020-08-18 12:00",
          friendList: "李白、王维、王安石",
          content: "诗歌征集大赛马上开始了，各位有意向的请私聊我报名",
        },
        {
          date: "2020-08-18 12:00",
          friendList: "李白、王维、王安石",
          content: "诗歌征集大赛马上开始了，各位有意向的请私聊我报名",
        },
        {
          date: "2020-08-18 12:00",
          friendList: "李白、王维、王安石",
          content: "诗歌征集大赛马上开始了，各位有意向的请私聊我报名",
        },
        {
          date: "2020-08-18 12:00",
          friendList: "李白、王维、王安石",
          content: "诗歌征集大赛马上开始了，各位有意向的请私聊我报名",
        },
      ],

      // 好友列表
      friend_list: [
        { nickname: "李白", userId: 1 },
        { nickname: "王伟", userId: 2 },
      ],

      // 选中的列表
      select_list: [],

      activeName: "",
      showMore: false,
      showCustomer: false,
    };
  },

  watch: {
    activeName() {
      console.log(this.activeName);
    },
  },

  methods: {
    switchMore() {
      this.showMore = !this.showMore;
    },

    confirm() {
      console.log(this.select_list);
      this.showCustomer = false;
    },

    // 打开顾客列表
    showCustomerList() {
      this.showCustomer = true;
    },
  },
};
</script>

<style lang='scss'>
#entrust_details {
  .find_form {
    width: 50%;
    .el-input {
      width: 300px;
      height: 24px;
    }
    .search {
      margin-bottom: 20px;
    }
    .el-form-item {
      display: inline-block;
      margin-right: 50px;
    }
  }
}
</style>