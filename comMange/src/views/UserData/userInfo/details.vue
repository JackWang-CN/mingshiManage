<template>
  <!-- 用户详情 -->
  <div id="userInfo_details" class="shadow_container">
    <div class="pageTitle">用户详情 {{ data_info.nickname }}</div>
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
          <span>{{ data_info.sex ? "男" : "女" }}</span>
        </el-form-item>

        <el-form-item label="状态">
          <span>{{ data_info.isEnable ? "启用" : "禁用" }}</span>
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
          <el-button type="info" @click="toDetails('customer_list')"
            >返回</el-button
          >
        </el-form-item>
      </el-form>

      <!-- 链接 -->
      <ul class="btns">
        <li>金币余额：{{ gold_info.goldNum }}</li>
        <li>
          <el-button
            type="primary"
            size="small"
            @click="toDetails('account_flow')"
            >查看流水</el-button
          >
        </li>
        <li>
          <el-button
            type="primary"
            size="small"
            @click="toDetails('account_prize')"
            >获奖记录</el-button
          >
          <el-button size="small" @click="showList('cusCampaign')"
            >活动参与</el-button
          ><el-button type="danger" size="small" @click="showList('cusCoupon')"
            >优惠券</el-button
          >
        </li>

        <li>
          <el-button
            type="success"
            size="small"
            @click="toDetails('user_assets')"
            >用户道具</el-button
          >
          <el-button type="info" size="small" @click="showList('cusHouse')"
            >用户房产</el-button
          >
          <el-button type="warning" size="small" @click="showList('cusPropPet')"
            >用户宠物</el-button
          >
        </li>
      </ul>
    </div>

    <!-- 弹出框 -->
    <el-dialog :title="title" :visible.sync="show_details" width="30%">
      <!-- 优惠券列表 -->
      <el-table v-show="dialog_type == 1" :data="data_list" style="width: 100%">
        <el-table-column
          prop="cusCouponID"
          label="优惠券ID"
          width="180"
        ></el-table-column>
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
      </el-table>

      <!-- 宠物列表 -->
      <el-table v-show="dialog_type == 2" :data="data_list" style="width: 100%">
        <el-table-column
          prop="assetID"
          label="宠物ID"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="number"
          label="数量"
          width="120"
        ></el-table-column>
        <el-table-column prop="useState" label="绑定状态" width="120">
          <template slot-scope="scope">
            {{ scope.row.useState ? "否" : "是" }}
          </template></el-table-column
        >
        <el-table-column prop="isFrozen" label="是否冻结">
          <template slot-scope="scope">
            {{ scope.row.isFrozen ? "否" : "是" }}
          </template>
        </el-table-column>
      </el-table>

      <!-- 房产列表 -->
      <el-table v-show="dialog_type == 4" :data="data_list" style="width: 100%">
        <el-table-column
          prop="assetID"
          label="房产ID"
          width="180"
        ></el-table-column>
        <el-table-column prop="type" label="类型" width="100"></el-table-column>
        <el-table-column
          prop="number"
          label="数量"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="useState"
          label="绑定状态"
          width="120"
        ></el-table-column>
        <el-table-column prop="isFrozen" label="是否冻结"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="showDetails(scope.row)"
              size="small"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 活动参与 -->
      <el-table v-show="dialog_type == 5" :data="data_list" style="width: 100%">
        <el-table-column
          prop="campaignID"
          label="参与活动ID"
          width="180"
        ></el-table-column>
        <el-table-column prop="type" label="类型" width="100"></el-table-column>

        <el-table-column
          prop="joinTime"
          label="参加时间"
          width="180"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="showDetails(scope.row)"
              size="small"
              >详情</el-button
            >
          </template>
        </el-table-column>
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
import { getDataList, getDataDetails, updateDetails } from "@/utils/api/apis";
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
      dialog_type: 0, // 弹出框表格类型 0-获奖记录 1-优惠券 2-个人宠物

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
      updateDetails(
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
          name: this.data_info.nickname,
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
          this.model = "cusInfo";
          this.control = type + "Log";
          this.dialog_type = 0;
          break;
        case "cusCoupon":
          this.title = "个人优惠券";
          this.model = type;
          this.control = type + "Log";
          this.dialog_type = 1;
          break;
        case "cusPropPet":
          this.title = "个人宠物";
          this.model = "cusPet";
          this.control = type;
          this.dialog_type = 2;
          break;
        case "cusPropAsset":
          this.title = "个人道具";
          this.model = "cusProp";
          this.control = "cusPropAsset";
          this.dialog_type = 3;
          break;
        case "cusHouse":
          this.title = "个人房产";
          this.model = type;
          this.control = type;
          this.dialog_type = 4;
          break;
        case "cusCampaign":
          this.title = "个人房产";
          this.model = "cusInfo";
          this.control = type;
          this.dialog_type = 5;
          break;
      }
      getDataList(this.model, this.control, 1, form, this);
    },

    // 二级弹窗
    showDetails() {},

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
      getDataList(this.model, this.control, 1, form, this);
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
