<template>
  <!-- 我需要援助 -->
  <div id="entrust_details" class="card_container">
    <div class="tabs">
      <span :class="activeName=='apply'?'active':''" @click="switchTabs('apply')">申请援助</span>
      <span :class="activeName=='history'?'active':''" @click="switchTabs('history')">历史援助</span>
    </div>
    <!-- 申请援助 -->
    <div class="apply" v-show="activeName=='apply'">
      <el-form label-width="100px" class="apply_form">
        <el-form-item label="援助主题:">
          <el-input v-model="apply_form.assistanceTheme"></el-input>
        </el-form-item>
        <el-form-item label="活动描述:">
          <el-input type="textarea" v-model="apply_form.describe" :rows="7"></el-input>
        </el-form-item>
        <el-form-item label="活动内容:">
          <el-input type="textarea" v-model="apply_form.assistanceContent" :rows="7"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sendSubmit">提交申请</el-button>
          <el-button type="danger">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 历史援助 -->
    <div class="history" v-show="activeName=='history'">
      <el-table :data="data_list">
        <el-table-column prop="applyTime" label="申请时间" width="180"></el-table-column>
        <el-table-column prop="assistanceTheme" label="援助主题" width="180"></el-table-column>
        <el-table-column prop="assistanceContent" label="援助描述" width="250"></el-table-column>
        <el-table-column prop="customerManager" label="客户经理" width="180"></el-table-column>
        <el-table-column prop="progressStatus" label="处理进度" width="180"></el-table-column>
        <el-table-column prop="completeTime" label="完成时间" width="180"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="showDetail(scope.row.assistanceID)" type="primary" size="small">详情</el-button>
            <el-button
              v-if="scope.row.progressStatus=='完结待商户确认'"
              @click="confirm(scope.row.assistanceID)"
              type="success"
              size="small"
            >确认完结</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 弹出框 -->
    <el-dialog title="详情内容" :visible.sync="show_detail" @closed="clear">
      <el-table :data="progress_list" style="width: 100%">
        <el-table-column prop="customerManager" label="业务经理" width="180"></el-table-column>
        <el-table-column prop="describe" label="阶段描述" width="180"></el-table-column>
        <el-table-column prop="phaseStatus" label="阶段状态"></el-table-column>
        <el-table-column prop="time" label="更新时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="showFiles(scope.row.entrustProgressID)"
              size="small"
              type="primary"
            >查看附件</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 嵌套的弹出框 -->
      <el-dialog width="30%" title="附件列表" :visible.sync="show_files" append-to-body>
        <ul class="file_list">
          <li v-for="(item,index) in file_list" :key="index" style="margin:10px 0">
            <el-link>{{item.name}}</el-link>
          </li>
        </ul>
        <span v-if="file_list.length<1">暂无数据</span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import { getData, getDataList, addData } from "@/utils/api/apis";
import { createGet } from "@/utils/common";
export default {
  mounted() {
    this.activeName = "apply";
    this.find_form = createGet(1, 10, "applyTime");
    console.log(this.find_form);
  },

  data() {
    return {
      // 申请援助数据对象
      apply_form: {},
      // 搜索数据对象
      find_form: {},
      data_list: [],
      progress_list: [],
      file_list: [{ name: "文件1" }, { name: "文件2" }, { name: "文件3" }],

      activeName: "",
      show_detail: false,
      show_files: false,
      model: "MerActivity",
      control: "Assistance",
    };
  },

  watch: {
    // 监听激活页改变
    activeName() {
      switch (this.activeName) {
        case "history":
          var form = { ...this.find_form };
          getDataList(this.model, this.control, 1, form, this);
      }
    },
  },

  methods: {
    // 切换激活页
    switchTabs(name) {
      this.activeName = name;
    },

    // 点击提交按钮
    sendSubmit() {
      getData(this.model, this.control, 1, this.apply_form, "create").then(
        (res) => {
          switch (res.code) {
            case "000000":
              this.$message.success("申请成功！");
              this.activeName = "history";
          }
        }
      );
    },

    // 点击查看详情
    showDetail(value) {
      this.show_detail = true;
      // 请求进度数据
      getData(this.model, this.control, 1, { value }, "progress/list").then(
        (res) => {
          switch (res.code) {
            case "000000":
              this.progress_list = res.resultObject;
          }
        }
      );
    },

    // 清空进度列表
    clear() {
      this.progress_list = [];
    },

    // 点击查看附件
    showFiles(value) {
      console.log(value);
      this.show_files = true;
      getData(
        this.model,
        this.control,
        1,
        { value },
        "progress/affixList"
      ).then((res) => {
        switch (res.code) {
          case "000000":
          // this.file_list = res.resultObject;
        }
      });
    },

    // 点击确认完结
    confirm(value) {
      console.log(value);
      addData(this.model, this.control, 1, { value }, "confirm").then((res) => {
        switch (res.code) {
          case "000000":
            this.$message.success("援助已完成！");
        }
        var form = { ...this.find_form };
        getDataList(this.model, this.control, 1, form, this);
      });
    },
  },
};
</script>

<style lang='scss'>
#entrust_details {
  min-width: 300px;
  color: #666666;
  .tabs {
    font-size: 14px;
    padding-left: 30px;
    margin-bottom: 20px;
    span {
      display: inline-block;
      width: 100px;
      text-align: center;
      padding: 10px 0;
      background-color: #f7f7f7;
      margin-right: 10px;
      cursor: pointer;
      &.active {
        color: #00b3e4;
      }
      &:hover {
        color: #00b3e4;
      }
    }
  }
  // 申请援助
}
</style>