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
            <el-button @click="showDetail(scope.row)" type="primary" size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 弹出框 -->
    <el-dialog title="详情内容" :visible.sync="show_detail"></el-dialog>
  </div>
</template>

<script>
import { getData } from "@/utils/api/apis";
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

      activeName: "",
      show_detail: false,
      model: "MerActivity",
      control: "Assistance",
    };
  },

  watch: {
    // 监听激活页改变
    activeName() {
      console.log(1);
      switch (this.activeName) {
        case "history":
          var form = { ...this.find_form };
          getData(this.model, this.control, 1, form).then((res) => {
            switch (res.code) {
              case "000000":
                this.data_list = res.resultObject.data;
                console.log(this.data_list);
                break;
            }
          });
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
    showDetail(row) {
      this.show_detail = true;
      var { assistanceID } = row;
      console.log(assistanceID);
      getData(
        this.model,
        this.control,
        1,
        { assistanceID },
        "progress/list"
      ).then((res) => {
        console.log(res);
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