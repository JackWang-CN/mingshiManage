<template>
  <div id="entrust_details" class="shadow_container">
    <!-- 委托进度详情 -->
    <div class="pageTitle">委托详情</div>

    <el-tabs v-model="activeName" type="card">
      <!-- 当前阶段 -->
      <el-tab-pane label="当前阶段" name="current">
        <!-- 进度条 -->
        <el-steps :active="1" finish-status="success" :space="170">
          <el-step title="待受理" @click="clickStep"></el-step>
          <el-step title="受理" @click="clickStep"></el-step>
          <el-step title="需求确认" @click="clickStep"></el-step>
          <el-step title="签订合同" @click="clickStep"></el-step>
          <el-step title="策划执行" @click="clickStep"></el-step>
          <el-step title="完结待商户确认" @click="clickStep"></el-step>
          <el-step title="商户确认完结" @click="clickStep"></el-step>
          <el-step title="回访" @click="clickStep"></el-step>
        </el-steps>

        <!-- 表单 -->
        <el-form label-width="80px">
          <el-form-item label="文件上传">
            <el-upload class="upload-demo" :auto-upload="false" action="#" multiple :limit="3">
              <el-button size="small" type="primary">选择文件</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="阶段描述">
            <el-input type="textarea" :rows="3"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success">保存当前进度</el-button>
            <el-button type="primary">保存进入下一步</el-button>
            <el-button type="info">返回</el-button>
            <el-button type="text" @click="show_more=!show_more">{{show_more?'收起∧':'更多∨'}}</el-button>
            <el-button type="danger" v-show="show_more">终止</el-button>
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
import { watch } from "fs";
export default {
  mounted() {
    this.activeName = "current";
  },

  data() {
    return {
      data_list: [
        {
          TableID: 2,
          EntrustID: "CODE0002",
          MerchantName: "测试商家2",
          MerchantID: "000000000031615602",
          Theme: "测试活动2",
          Content: "参与本活动可获得优惠券哦",
          PhaseStatus: "1",
          ManagerName: "小刘",
          ManagerID: "20080616234772245440491010032207854874",
          ApplyTime: "2020-08-31 14:32:21",
          FinishTime: null,
        },
      ],

      activeName: "",
      show_details: false, // 展示详情
      show_more: false, // 显示隐藏按钮
    };
  },

  watch: {
    activeName() {
      console.log(1);
    },
  },

  methods: {
    //   展示详情
    showDetails() {
      this.show_details = true;
    },

    clickStep() {
      console.log(1);
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