<!-- 订单管理 -->
<template>
  <div id="order_list" class="card_container">
    <div class="pageTitle">订单管理</div>
    <!-- 查询条件 -->
    <el-form
      ref="find_form"
      :model="find_form"
      label-width="100px"
      class="find_form"
    >
      <el-form-item label="订单编号">
        <el-input
          v-model="find_form.data.orderId"
          placeholder="请输入订单编号"
        ></el-input>
      </el-form-item>

      <el-form-item label="订单状态">
        <el-select v-model="find_form.orderStatus" placeholder="请选择订单状态">
          <el-option label="已通过" value="已通过"></el-option>
          <el-option label="已拒绝" value="已拒绝"></el-option>
          <el-option label="审核中" value="审核中"></el-option>
        </el-select>
      </el-form-item>

      <!-- 日期查询 -->
      <el-form-item label="下单时间" label-width="100px">
        <el-date-picker
          v-model="find_form.data.orderTime"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="findList" :disabled="btn_status"
          >查询</el-button
        >
        <el-button type="info" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 订单列表 -->
    <el-table :data="order_list" border style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        fixed
        prop="orderId"
        label="订单编号"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="goodsName"
        label="商品名称"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="number"
        label="商品数量"
        width="120"
      ></el-table-column>
      <el-table-column prop="goodsIco" label="商品图片" width="200">
        <template slot-scope="scope">
          <img :src="scope.row.goodsIco" height="100" alt />
        </template>
      </el-table-column>
      <el-table-column
        prop="paidAmount"
        label="实付金额"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="amount"
        label="订单金额"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="customerInfo"
        label="客户昵称"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="userId"
        label="客户ID"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="orderTime"
        label="下单日期"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="details"
        label="订单详情"
        width="250"
      ></el-table-column>
      <el-table-column prop="orderStatus" label="订单状态" width="120">
        <!-- <template slot-scope="scope">{{scope.row.orderStatus}}</template> -->
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            @click="toDetails(scope.row.orderId)"
            type="primary"
            size="small"
            >详细</el-button
          >
          <el-button @click="remark(scope.row)" type="warning" size="small"
            >备注</el-button
          >
          <el-button
            @click="delRow(scope.row.orderId)"
            type="danger"
            size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页插件 -->
    <pagination
      :find="find_form"
      @sizeChange="pageChange('size', $event)"
      @currChange="pageChange('curr', $event)"
    ></pagination>

    <!-- 弹出框 -->
    <el-dialog title="订单备注" :visible.sync="show_remark">
      <el-form label-width="100px">
        <el-form-item label="订单编号">{{ remark_data.orderId }}</el-form-item>
        <el-form-item label="下单日期">
          {{ remark_data.orderTime }}
        </el-form-item>
        <el-form-item label="商品名称">
          {{ remark_data.goodsName }}
        </el-form-item>
        <el-form-item label="添加备注">
          <el-input
            type="textarea"
            v-model="remark_data.remark"
            :rows="3"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small">保存</el-button>
          <el-button type="danger" @click="cancel" size="small">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getDataList } from "@/utils/api/apis";
import { createGet, filteObj, spliceKey } from "@/utils/common";
import pagination from "@/components/Pagination";
export default {
  components: {
    pagination,
  },
  mounted() {
    getDataList(
      this.model,
      "Order",
      createGet(1, 10),
      "order_list",
      this,
      null,
      "goodsIco"
    );
  },
  data() {
    return {
      // 查找条件
      find_form: {
        currPage: 1,
        pageSize: 10,
        data: {},
      },

      // 商户列表
      order_list: [],

      // 按钮禁用状态
      btn_status: false,

      // 备注弹出框
      show_remark: false,
      remark_data: {},

      model: "",
      control: "",
    };
  },
  methods: {
    // 查询
    findList() {
      this.btn_status = true;
      setTimeout(() => {
        this.btn_status = false;
      }, 500);

      var form = { ...this.find_form };
      delete form.totalDataNum;
      form.data = filteObj(form.data);
      form.data = spliceKey(form.data);
      getDataList(
        this.$vision.merchant,
        "Order",
        form,
        "order_list",
        this,
        "btn_status",
        "goodsIco"
      );
    },

    // 删除当前
    delRow(orderId) {
      var obj = { orderId };
      delData(this.$vision.merchant, "Order", "del", obj).then((res) => {
        if (res) {
          this.$message.success("删除成功！");
          getDataList(
            this.$vision.merchant,
            "Order",
            this.find_form,
            "order_list",
            this,
            null,
            "goodsIco"
          );
        }
      });
    },

    // pageSize改变时触发
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
      getDataList(
        this.$vision.merchant,
        "Order",
        form,
        "order_list",
        this,
        null,
        "goodsIco"
      );
    },

    // 跳转到详情页
    toDetails(id) {
      this.$router.push({
        path: "order_details",
        query: { id },
      });
    },

    // 备注
    remark(row) {
      this.remark_data = row;
      this.show_remark = true;
    },

    // 取消备注
    cancel() {
      this.show_remark = false;
    },

    // 重置
    resetForm() {
      this.find_form = {
        merId: "",
        merName: "",
        officeManager: "",
        create_date: "",
        checkStatus: "",
      };
    },
  },
};
</script>

<style lang="scss">
#order_list {
  .find_form {
    .el-form-item {
      display: inline-block;
    }
  }

  // 弹出框
  .el-dialog__body {
    .el-form-item__label {
      font-weight: bold;
      margin-right: 20px;
    }
    .el-textarea {
      width: 80%;
    }
  }
}
</style>
