<template>
  <div id="merchant_list" class="shadow_container">
    <!-- 商户列表 -->

    <!-- tab分页 -->
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="待审核" name="check/applyingList">
        <!-- 表格 -->
        <el-table :data="data_list" border>
          <el-table-column
            prop="merchantName"
            label="商户名称"
            width="180"
          ></el-table-column>
          <el-table-column prop="headImage" label="商户头像" width="150">
            <template slot-scope="scope">
              <el-avatar
                :size="80"
                :src="scope.row.imgUrl"
                shape="square"
              ></el-avatar>
            </template>
          </el-table-column>
          <el-table-column
            prop="manageTypeName"
            label="经营类别"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="tel"
            label="联系电话"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="inteThrCode"
            label="统一社会信用代码"
            width="200"
          ></el-table-column>
          <el-table-column prop="accountType" label="账号类型" width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.accountType == 0">商户</span>
              <span v-else>商圈</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="tel"
            label="联系电话"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            width="300"
          ></el-table-column>
          <el-table-column
            label="操作"
            width="180"
            v-if="activeName == 'check/applyingList'"
          >
            <template slot-scope="scope">
              <el-button
                type="success"
                @click="showDetails(scope.row)"
                size="small"
                >审核</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="历史审核" name="check/recordList">
        <el-table :data="record_list" border>
          <el-table-column
            prop="merchantName"
            label="商户名称"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="checkeRemark"
            label="审核意见"
            width="200"
          ></el-table-column>
          <el-table-column prop="checkStatus" label="审核结果" width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.checkStatus == 0">未通过</span>
              <span v-else-if="scope.row.checkStatus == 1">已通过</span>
              <span v-else-if="scope.row.checkStatus == 2">申请中</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="checkerName"
            label="审核人员"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="checkTime"
            label="审核时间"
            width="200"
          ></el-table-column>
          <el-table-column label="操作" width="180">
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
      </el-tab-pane>
    </el-tabs>

    <!-- 分页插件 -->
    <Pagination
      :find="find_form"
      @sizeChange="pageChange('size', $event)"
      @currChange="pageChange('curr', $event)"
    ></Pagination>

    <!-- 弹出框 -->
    <el-dialog
      title="提示"
      :visible.sync="show_details"
      width="30%"
      @closed="clear"
    >
      <el-form label-width="100px">
        <el-form-item label="商户名称">
          <span>{{ data_info.merchantName }}</span>
        </el-form-item>
        <el-form-item label="商户头像">
          <el-avatar
            :size="80"
            :src="data_info.imgUrl"
            shape="square"
          ></el-avatar>
        </el-form-item>
        <el-form-item label="经营类别">
          <span>{{ data_info.manageTypeName }}</span>
        </el-form-item>
        <el-form-item label="联系电话">
          <span>{{ data_info.tel }}</span>
        </el-form-item>
        <el-form-item label="信用代码">
          <span>{{ data_info.inteThrCode }}</span>
        </el-form-item>
        <el-form-item label="身份证正面">
          <img
            :src="file_url + data_info.iDdFacePhoto"
            alt="身份证正面"
            class="info_img"
          />
        </el-form-item>
        <el-form-item label="身份证反面">
          <img
            :src="file_url + data_info.idBackPhoto"
            alt="身份证正面"
            class="info_img"
          />
        </el-form-item>
        <el-form-item label="身份证持证">
          <img
            :src="file_url + data_info.idLicense"
            alt="身份证持证"
            class="info_img"
          />
        </el-form-item>
        <el-form-item label="商户地址">
          <span>{{ data_info.address }}</span>
        </el-form-item>
        <el-form-item label="审核意见">
          <el-select v-model="check_form.checkeStatus">
            <el-option label="通过" :value="1"></el-option>
            <el-option label="拒绝" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核说明">
          <el-input
            type="textarea"
            v-model="check_form.checkeRemark"
            :rows="4"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sendSubmit">提交</el-button>
          <el-button type="info" @click="show_details = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { getDataList, updateData } from "@/utils/api/apis";
import { createGet, hintMessage, spliceImg } from "@/utils/common";
export default {
  components: {
    Pagination,
  },

  mounted() {
    this.activeName = "check/applyingList";
    this.file_url = window.baseUrl.normal_file;
  },

  data() {
    return {
      find_form: {},
      check_form: {},
      data_list: [],
      record_list: [],
      data_info: {},

      file_url: "",
      activeName: "",
      show_details: false,
      model: "merchant",
      control: "merchantInfo",
    };
  },

  methods: {
    // 展示详情
    showDetails(row) {
      this.show_details = true;
      this.data_info = { ...row };
      this.check_form.merchantID = row.merchantID;
    },

    // 清空弹出框
    clear() {
      this.data_info = {};
      this.check_form = {};
    },

    // 切换禁用启用
    switchState() {},

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

      var key =
        this.activeName == "check/recordList" ? "record_list" : "data_list";
      getDataList(
        this.model,
        this.control,
        1,
        form,
        this,
        key,
        this.activeName
      );
    },

    // 发送提交
    sendSubmit() {
      var form = { ...this.check_form };
      this.show_details = false;

      updateData(this.model, this.control, 1, form, "check/check").then(
        (res) => {
          hintMessage(this, res);
          var form = { ...this.find_form };
          getDataList(
            this.model,
            this.control,
            1,
            form,
            this,
            "data_list",
            this.activeName
          );
        }
      );
    },
  },

  watch: {
    // 监听激活页面改变
    activeName() {
      var key =
        this.activeName == "check/recordList" ? "record_list" : "data_list";

      this.find_form = createGet();
      getDataList(
        this.model,
        this.control,
        1,
        this.find_form,
        this,
        key,
        this.activeName
      );
    },

    // 图片拼接
    data_list() {
      this.data_list = spliceImg(this.data_list, "headImage");
    },
  },
};
</script>

<style lang='scss'>
.info_img {
  width: 60%;
  height: calc(60%);
  border-radius: 10px;
}
</style>