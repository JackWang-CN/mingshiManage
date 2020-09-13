<!-- 商户管理-商户请求 -->
<template>
  <div id="entrust_list" class="shadow_container">
    <div class="pageTitle">商户委托</div>
    <!-- 查询条件 -->
    <el-form class="find_form" :model="find_form" label-width="80px">
      <el-form-item label="请求编号" label-width="100px">
        <el-input v-model="find_form.data.reqId" placeholder="请输入请求编号"></el-input>
      </el-form-item>
      <el-form-item label="客户经理" label-width="100px">
        <el-input v-model="find_form.data.customManager" placeholder="请输入客户经理"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" label-width="100px">
        <el-date-picker
          v-model="find_form.data.creationTime"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <!-- 商户列表 -->
    <el-table :data="data_list" border style="width: 100%" @selection-change="select">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="entrustID" label="委托编号" width="120"></el-table-column>
      <el-table-column prop="merchantName" label="商户名称" width="150"></el-table-column>
      <el-table-column prop="theme" label="委托主题" width="200"></el-table-column>
      <el-table-column prop="content" label="委托描述" width="300"></el-table-column>
      <el-table-column prop="phaseStatus" label="阶段状态" width="150"></el-table-column>
      <el-table-column prop="applyTime" label="申请时间" width="200"></el-table-column>
      <el-table-column prop="finishTime" label="完成时间" width="200"></el-table-column>
      <el-table-column prop="managerName" label="客户经理" width="120"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.PhaseStatus==0">
            <el-button @click="switchOperate(scope.row,0)" type="warning" size="small">处理</el-button>
            <el-button @click="switchOperate(scope.row,1)" type="danger" size="small">拒绝</el-button>
          </span>
          <el-button
            v-else-if="scope.row.PhaseStatus!==0"
            @click="switchOperate(scope.row,3)"
            type="success"
            size="small"
          >更新进度</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出框 -->
    <el-dialog title="委托处理" :visible.sync="show_details" width="30%" @close="closeOperate">
      <el-form label-width="80px">
        <el-form-item label="任务分配" v-show="this.operate==0">
          <div>
            <el-button>选择业务经理</el-button>
            <el-tag v-show="data_info.manager">{{data_info.manager}}</el-tag>
          </div>
          <el-radio-group v-model="data_info.manager" @change="selectManger">
            <el-radio v-for="item in manager_list" :key="item" :label="item">{{item}}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="拒绝理由" v-show="this.operate==1">
          <el-input type="textarea" v-model="data_info.refuse" :rows="5"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="sendSubmit">确认</el-button>
          <el-button type="info" @click="show_details=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { createGet } from "@/utils/common";
import { getDataList } from "@/utils/api/apis";
export default {
  mounted() {
    // 首次加载
    var form = createGet();
    getDataList(
      this.model,
      this.control,
      this.vision,
      form,
      this,
      null,
      "activityEntrustList"
    );
  },

  data() {
    return {
      // 查找条件
      find_form: { data: {} },
      select_list: [],
      data_list: [
        {
          TableID: 1,
          EntrustID: "CODE0001",
          MerchantName: "测试商家",
          MerchantID: "000000000031615601",
          Theme: "测试活动",
          Content: "参与本活动可获得优惠券哦",
          PhaseStatus: "0",
          ManagerName: "痛仰",
          ManagerID: "20080616234772245440491010032207854874",
          ApplyTime: "2020-08-31 14:32:21",
          FinishTime: null,
        },
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
      data_info: {},
      manager_list: ["贾克斯", "凯特琳", "图奇", "莎拉", "卡莎"],

      operate: 0, // 0-接收 1-拒绝
      show_details: false,
      model: "merchant",
      control: "merEntrustActivity",
      vision: 1,
    };
  },

  methods: {
    // 查询
    findData() {
      var form = { ...this.find_form };
      form.data = { ...this.find_form.data };
      form.data = filteObj(form.data);
      form.data = spliceKey(form.data);
      getDataList(this.model, this.control, this.vision, form, this);
    },

    // 点击处理按钮
    switchOperate(row, type) {
      if (type == 3) {
        console.log(row);
        var { EntrustID } = row;

        this.$router.push({
          path: "merchant_entrustDetails",
          query: {
            id: EntrustID,
          },
        });
      } else {
        this.show_details = true;
        this.operate = type;
      }
    },

    // 关闭弹出框的回调
    closeOperate() {
      this.data_info = {};
    },

    // 获取选中列表
    select(list) {
      this.select_list = list;
    },

    // 确认提交
    sendSubmit() {
      this.show_details = false;
    },

    // 勾选客户经理
    selectManger(v) {
      console.log(v);
    },
    // 重置
    resetForm() {
      this.find_form.data = {};
    },
  },
};
</script>

<style lang="scss">
#entrust_list {
  form.find_form {
    .el-form-item {
      display: inline-block;
    }
    .date_btn {
      div {
        vertical-align: middle;
      }
    }
  }
}
</style>
