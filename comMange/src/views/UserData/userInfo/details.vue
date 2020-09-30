<template>
  <!-- 用户详情 -->
  <div id="userInfo_details" class="shadow_container">
    <div class="pageTitle">用户详情</div>
    <div class="wrap">
      <!-- 表单 -->
      <el-form label-width="100px">
        <el-form-item label="用户ID">
          <span>{{ data_info.customerID }}</span>
        </el-form-item>

        <el-form-item label="用户昵称">
          <span>{{ data_info.nickname }}</span>
        </el-form-item>

        <el-form-item label="手机号">
          <span>{{ data_info.phone }}</span>
        </el-form-item>

        <el-form-item label="性别">
          <span>{{ data_info.sex }}</span>
        </el-form-item>

        <el-form-item label="状态">
          <span>{{ data_info.isEnable }}</span>
        </el-form-item>

        <el-form-item label="用户邮箱">
          <span>{{ data_info.email }}</span>
        </el-form-item>

        <el-form-item label="个性签名">
          <span>{{ data_info.perSign }}</span>
        </el-form-item>

        <el-form-item label="创建时间">
          <span>{{ data_info.createTime }}</span>
        </el-form-item>

        <el-form-item label="更新时间">
          <span>{{ data_info.updateTime }}</span>
        </el-form-item>

        <el-form-item label="真实姓名">
          <span>{{ data_info.trueName }}</span>
        </el-form-item>

        <el-form-item label="身份证号">
          <span>{{ data_info.idCard || "无" }}</span>
        </el-form-item>

        <el-form-item label="是否实名">
          <span>{{ data_info.isRealNameSys ? "是" : "否" }}</span>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="sendSubmit">保存</el-button>
          <el-button type="danger" @click="toDetails('customer_list')"
            >返回</el-button
          >
        </el-form-item>
      </el-form>

      <!-- 链接 -->
      <ul class="btns">
        <li>
          金币余额：{{ gold_info.goldNum }}
          <el-button
            type="primary"
            size="small"
            @click="toDetails('account_flow')"
            >查看流水</el-button
          >
        </li>
        <li>
          <el-button type="primary" size="small" @click="showList('cusWinning')"
            >获奖记录</el-button
          >
        </li>

        <el-button type="danger" size="small" @click="showList('cusCoupon')"
          >优惠券</el-button
        >
        <li>
          <el-button type="warning" size="small" @click="toDetails('assets')"
            >个人道具</el-button
          >
        </li>
        <li>
          <el-button type="warning" size="small" @click="toDetails('assets')"
            >个人房产</el-button
          >
        </li>
        <li>
          <el-button type="warning" size="small" @click="showList('cusPropPet')"
            >个人宠物</el-button
          >
        </li>
      </ul>
    </div>

    <!-- 弹出框 -->
    <el-dialog :title="title" :visible.sync="show_details" width="30%">
      <el-table :data="data_list" style="width: 100%">
        <el-table-column
          prop="title"
          label="标题"
          width="100"
        ></el-table-column>
        <el-table-column prop="type" label="类型" width="100"></el-table-column>
        <el-table-column
          prop="describe"
          label="说明"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="获奖时间"
          width="180"
        ></el-table-column>
        <el-table-column prop="signInDay" label="签到天数"></el-table-column>
      </el-table>
      <!-- 分页插件 -->
      <Pagination
        :find="find_form"
        @sizeChange="pageChange('size', $event)"
        @currChange="pageChange('curr', $event)"
      ></Pagination>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import {
  getDataList,
  getDataDetails,
  updateDataDetails,
} from "@/utils/api/apis";
import { createGet, filteObj } from "@/utils/common";
export default {
  components: {
    Pagination,
  },
  mounted() {
    this.customerID = this.$route.query.id;
    // 首次请求数据
    getDataDetails(
      this.model,
      this.control,
      1,
      { customerID: this.customerID },
      this
    );
    // 请求金币余额
    getDataDetails(
      this.model,
      "cusGoldAccount",
      1,
      { customerID: this.customerID },
      this,
      "gold_info"
    );
  },

  data() {
    return {
      data_info: {}, // 数据对象
      find_form: {},
      data_list: [],
      customerID: "",

      title: "",

      gold_info: "", // 金币余额
      show_details: false,
      model: "cusInfo",
      control: "customerInfo",
    };
  },

  methods: {
    // 提交保存
    sendSubmit() {
      updateDataDetails(
        this.model,
        this.control,
        filteObj(this.data_info),
        this,
        "userdata_userList"
      );
    },

    // 跳转到详情页
    toDetails(path) {
      this.$router.push({
        path,
        query: {
          id: this.customerID,
        },
      });
    },

    // 弹窗展示详情信息
    showList(type) {
      this.show_details = true;
      this.find_form = createGet();
      var form = { ...this.find_form };
      form.data.customerID = this.customerID;

      switch (type) {
        case "cusWinning":
          this.title = "获奖记录";
          getDataList(this.model, type + "Log", 1, form, this);
          break;
        case "cusCoupon":
          this.title = "个人优惠券";
          getDataList(type, type + "Log", 1, form, this);
          break;
        case "cusPropPet":
          this.title = "个人宠物";
          getDataList("cusPet", type, 1, form, this);
          break;
      }
    },

    // 分页属性改变
    pageChange(type, page) {
      switch (type) {
        case "size":
          this.find_form.pageSize = page;
          break;
        case "curr":
          this.find_form.currPage = page;
          break;
      }
      var form = { ...this.find_form };
      getDataList(this.model, "cusWinningLog", 1, form, this);
    },
  },
};
</script>

<style lang='scss'>
#userInfo_details {
  .wrap {
    display: flex;
    align-items: flex-start;
    .el-form {
      margin-right: 100px;
      .el-input,
      .el-textarea {
        width: 250px;
      }
    }
  }

  .btns {
    li {
      margin: 20px 0;
    }
  }
}
</style>
