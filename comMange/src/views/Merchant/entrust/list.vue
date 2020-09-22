<!-- 商户管理-商户请求 -->
<template>
  <div id="entrust_list" class="shadow_container">
    <div class="pageTitle">商户委托</div>

    <!-- tab分页 -->
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="进行中委托" name="ongoing/list"></el-tab-pane>
      <el-tab-pane label="历史委托" name="history/list"></el-tab-pane>
    </el-tabs>

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
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <!-- 未处理阶段 -->
          <span v-if="scope.row.phaseStatus=='待受理'||!scope.row.phaseStatus">
            <el-button @click="switchOperate(scope.row.entrustID,0)" type="warning" size="small">处理</el-button>
            <el-button @click="switchOperate(scope.row.entrustID,1)" type="danger" size="small">拒绝</el-button>
          </span>
          <!-- 已接受未完成阶段 -->
          <span v-if="update_list.includes(scope.row.phaseStatus)">
            <el-button
              @click="switchOperate(scope.row.entrustID,3)"
              type="success"
              size="small"
            >更新进度</el-button>
          </span>
          <!-- 待回访阶段 -->
          <span v-if="scope.row.phaseStatus=='终止'">
            <el-button @click="switchOperate(scope.row.entrustID,3)" type="warning" size="small">回访</el-button>
          </span>
          <!-- 回访已完成 -->
          <span v-if="scope.row.phaseStatus=='回访'">
            <el-button
              @click="switchOperate(scope.row.entrustID,3)"
              type="primary"
              size="small"
            >查看记录</el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出框 -->
    <el-dialog title="委托处理" :visible.sync="show_details" width="30%" @close="closeOperate">
      <el-form label-width="80px">
        <el-form-item label="任务分配" v-show="this.operate==0">
          <el-radio-group v-model="data_info.managerID" @change="selectManger">
            <el-radio
              v-for="item in manager_list"
              :key="item.managerID"
              :label="item.managerID"
            >{{item.managerName}}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="拒绝理由" v-show="this.operate==1">
          <el-input type="textarea" v-model="data_info.describe" :rows="5"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="sendSubmit">确认</el-button>
          <el-button type="info" @click="show_details=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 分页插件 -->
    <Pagination
      :find="find_form"
      @sizeChange="pageChange('size', $event)"
      @currChange="pageChange('curr', $event)"
    ></Pagination>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { createGet, hintMessage } from "@/utils/common";
import { getDataList, updateData } from "@/utils/api/apis";
export default {
  components: {
    Pagination,
  },

  mounted() {
    // 首次加载
    this.find_form = createGet();
    this.activeName = "ongoing/list";
  },

  data() {
    return {
      update_list: [
        "受理",
        "需求确认",
        "签订合同",
        "策划执行",
        "完结待商户确认",
        "商户确认完结",
      ],

      // 查找条件
      find_form: { data: {} },
      select_list: [],
      data_list: [],
      data_info: {},
      manager_list: [
        {
          managerName: "德玛西亚",
          managerID: "20082814315634805620491050059783724634",
        },
        {
          managerName: "痛仰",
          managerID: "20080616234772245440491010032207854874",
        },
      ],
      activeName: "",

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
    switchOperate(entrustID, type) {
      if (type == 3) {
        this.$router.push({
          path: "entrust_details",
          query: {
            id: entrustID,
          },
        });
      } else {
        this.show_details = true;
        this.operate = type;
        this.data_info.entrustID = entrustID;
        console.log(this.data_info);
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
      // 1.判断操作是接收还是拒绝
      if (this.operate == 0) {
        var operate = "accept";
      } else {
        var operate = "reject";
      }
      // 2.执行对应的操作
      updateData(this.model, this.control, 1, this.data_info, operate).then(
        (res) => {
          hintMessage(this, res);
          var form = { ...this.find_form };
          getDataList(this.model, this.control, this.vision, form, this);
        }
      );
    },

    // 勾选客户经理
    selectManger(v) {
      console.log(v);
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
      delete form.totalDataNum;
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
  },

  watch: {
    activeName() {
      var form = { ...this.find_form };
      getDataList(
        this.model,
        this.control,
        1,
        form,
        this,
        null,
        this.activeName
      );
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
