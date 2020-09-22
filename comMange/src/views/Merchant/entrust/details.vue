<template>
  <div id="entrust_details" class="shadow_container">
    <!-- 委托进度详情 -->
    <div class="pageTitle">委托详情</div>

    <el-tabs v-model="activeName" type="card">
      <!-- 当前阶段 -->
      <el-tab-pane label="当前阶段" name="current">
        <!-- 进度条 -->
        <el-steps :active="activeState" finish-status="success" :space="170">
          <el-step v-for="item in progress_list" :key="item.stateID" :title="item.stateName"></el-step>
        </el-steps>

        <!-- 表单 -->
        <el-form label-width="80px">
          <el-form-item label="文件上传">
            <el-upload class="upload-demo" :auto-upload="false" action="#" multiple :limit="3">
              <el-button size="small" type="primary">选择文件</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="阶段描述">
            <el-input type="textarea" :rows="3" v-model="data_info.describe"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="updateProgress(0)">保存当前进度</el-button>
            <el-button type="primary" @click="updateProgress(1)">保存进入下一步</el-button>
            <el-button type="info" @click="cancel">返回</el-button>
            <el-button type="text" @click="show_more=!show_more">{{show_more?'收起∧':'更多∨'}}</el-button>
            <el-button type="danger" v-show="show_more" @click="shutdownEntrust">终止</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <!-- 历史进度 -->
      <el-tab-pane label="历史进度" name="history">
        <el-table :data="data_list" border>
          <el-table-column prop="EntrustID" label="委托编号" width="150"></el-table-column>
          <el-table-column prop="MerchantName" label="商户名称" width="120"></el-table-column>
          <el-table-column prop="Theme" label="委托主题" width="150"></el-table-column>
          <el-table-column prop="PhaseStatus" label="处理阶段" width="120"></el-table-column>
          <el-table-column prop="PhaseStatus" label="阶段描述" width="120"></el-table-column>
          <el-table-column prop="ApplyTime" label="申请日期" width="200"></el-table-column>
          <el-table-column prop="ManagerName" label="客户经理" width="100"></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="showDetails(scope.row)" type="primary" size="small">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!-- 弹出框-历史阶段详情 -->
    <el-dialog title="阶段详情" width="30%" :visible.sync="show_details">
      <el-form label-width="80px">
        <el-form-item label="附件资源">
          <div class="file_list">
            <a href="#">商户营业执照</a>
            <a href="#">身份证正面照</a>
            <a href="#">身份证反面照</a>
            <a href="#">手持证件照</a>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getDataList,
  getData,
  updateData,
  updateDataDetails,
} from "@/utils/api/apis";
import { createGet, hintMessage } from "@/utils/common";
export default {
  created() {
    this.entrustID = this.$route.query.id;

    // 1.获取商家委托阶段列表（一共有几个阶段）
    getDataList(
      this.model,
      this.control,
      1,
      createGet(1, 99),
      this,
      "progress_list",
      "stage/list"
    );

    // 2.获取委托进度信息列表
    this.activeName = "current";
  },

  data() {
    return {
      data_list: [],
      data_info: {},
      progress_list: [], // 商家委托列表
      entrustID: "",
      activeName: "",
      show_details: false, // 展示详情
      show_more: false, // 显示隐藏按钮
      activeObj: {}, // 当前的委托阶段数据对象
      activeState: 0, // 当前的委托阶段
      model: "merchant",
      control: "merEntrustActivity",
    };
  },

  watch: {
    // 监听页面激活
    activeName() {
      switch (this.activeName) {
        case "current":
          getData(
            this.model,
            this.control,
            1,
            { value: this.entrustID },
            "progress/current"
          ).then((res) => {
            this.activeObj = res.resultObject;
            var phaseStatus = this.activeObj.phaseStatus;
            // 获取当前的阶段名称，遍历所有阶段，取得当前阶段在所有阶段中的序号
            this.progress_list.some((item, index) => {
              if (item.stateName == phaseStatus) {
                this.activeState = index;
              }
              // 满足条件终止循环
              return item.stateName == phaseStatus;
            });
          });
          break;
        case "history":
          getData(
            this.model,
            this.control,
            1,
            { value: this.entrustID },
            "progress/list"
          ).then((res) => {});
          break;
      }
    },
  },

  methods: {
    // 展示详情
    showDetails() {
      this.show_details = true;
    },

    // 更新进度 0-当前 1-下一个阶段
    updateProgress(type) {
      var index = this.activeState;
      this.data_info.entrustID = this.entrustID;
      this.data_info.stateID = this.progress_list[index].stateID;

      // 判断是保存当前进度，还是进入下一阶段
      if (type) {
        index++;
        this.data_info.nextStateID = this.progress_list[index].stateID;
        var operate = "update/next";
      } else {
        var operate = "update";
      }
      var form = { ...this.data_info };
      this.data_info = {};
      updateData(this.model, this.control, 1, form, operate).then((res) => {
        hintMessage(this, res);
        getData(
          this.model,
          this.control,
          1,
          { value: this.entrustID },
          "progress/current"
        ).then((res) => {
          this.activeObj = res.resultObject;
          var phaseStatus = this.activeObj.phaseStatus;
          // 获取当前的阶段名称，遍历所有阶段，取得当前阶段在所有阶段中的序号
          this.progress_list.some((item, index) => {
            if (item.stateName == phaseStatus) {
              this.activeState = index;
            }
            // 满足条件终止循环
            return item.stateName == phaseStatus;
          });
        });
      });
    },

    // 终止委托
    shutdownEntrust() {
      this.data_info.entrustID = this.entrustID;
      console.log(this.data_info);
      updateDataDetails(
        this.model,
        this.control,
        1,
        this.data_info,
        this,
        "merchant_entrustList",
        "end"
      );
    },

    // 返回上一页
    cancel() {
      this.$router.push("entrust_list");
    },
  },
};
</script>

<style lang='scss'>
.el-steps {
  padding: 0 20px;
  margin: 40px 0;
}

form {
  .file_list {
    display: flex;
    flex-direction: column;
  }
}
</style>