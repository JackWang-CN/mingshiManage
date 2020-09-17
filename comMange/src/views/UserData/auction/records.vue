<template>
  <div id="auction_records" class="shadow_container">
    <!-- 道具交易记录 -->
    <div class="pageTitle">交易记录</div>

    <!-- 表单 -->
    <el-form ref="find_form" :model="find_form" label-width="80px">
      <el-form-item label="道具名称" label-width="100px">
        <el-input v-model="find_form.data.aname" placeholder="请输入道具名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="道具类型" label-width="100px">
        <el-select v-model="find_form.data.rpmtype" placeholder="请选择房产类型">
          <el-option label="全部" value></el-option>
          <el-option label="优惠券" :value="1"></el-option>
          <el-option label="道具" :value="2"></el-option>
          <el-option label="虚拟房产" :value="3"></el-option>
        </el-select>
      </el-form-item>

      <!-- 按钮组 -->
      <el-form-item class="btns_find">
        <el-button type="primary" @click="findData">查询</el-button>
        <el-button type="info" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="data_list" border style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="tradeId" label="交易单号" width="120"></el-table-column>
      <el-table-column prop="traderNickname" label="买家昵称" width="120"></el-table-column>
      <el-table-column prop="aname" label="道具名称" width="120"></el-table-column>
      <el-table-column prop="rpmtype" label="道具类型" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.rpmtype==1">户型风格</span>
          <span v-else-if="scope.row.rpmtype==2">屋内道具</span>
          <span v-else-if="scope.row.rpmtype==3">AR宠物</span>
          <el-avatar :size="50" :src="scope.row.rpmico"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="anum" label="数量" width="120"></el-table-column>
      <el-table-column prop="aunitp" label="单价" width="120"></el-table-column>
      <el-table-column prop="resId" label="道具缩略图" width="120">
        <template slot-scope="scope">
          <el-avatar shape="square" :size="80" :src="scope.row.resId"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="ownerNickname" label="卖家昵称" width="120"></el-table-column>
      <el-table-column prop="tradePrice" label="交易金额" width="120"></el-table-column>
      <el-table-column prop="tradeTime" label="交易时间" width="180"></el-table-column>
      <el-table-column fixed="right" label="操作" width="280">
        <template slot-scope="scope">
          <el-button @click="toDetails(scope.row.dataId,0)" type="primary" size="small">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

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
import { createGet, spliceKey, filteObj } from "@/utils/common";
import { getDataList } from "@/utils/api/apis";
export default {
  components: {
    Pagination,
  },
  mounted() {
    this.find_form = createGet();
    var form = { ...this.find_form };
    // 首次加载
    getDataList(this.model, this.control, this.vision, form, this, "data_list");
  },

  data() {
    return {
      find_form: {
        data: {},
      },
      data_list: [
        {
          tradeId: "00145475714521001",
          traderNickname: "疾风剑豪",
          aname: "欧式洋房",
          rpmtype: "1",
          anum: 1,
          aunitp: 3500,
          ownerNickname: "奥恩",
          tradePrice: "3500",
          tradeTime: "2020-08-20 15:00:00",
        },
        {
          tradeId: "00145475714521002",
          traderNickname: "安妮",
          aname: "中式四合院",
          rpmtype: "1",
          anum: 1,
          aunitp: 1250,
          ownerNickname: "奥恩",
          tradePrice: "1250",
          tradeTime: "2020-08-20 15:00:00",
        },
        {
          tradeId: "00145475714521003",
          traderNickname: "塞恩",
          aname: "普通住房",
          rpmtype: "1",
          anum: 1,
          aunitp: 2800,
          ownerNickname: "黑默丁格",
          tradePrice: "2800",
          tradeTime: "2020-08-20 15:00:00",
        },
      ],
      model: "auction",
      control: "auctionLog",
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
      getDataList(
        this.model,
        this.control,
        this.vision,
        form,
        this,
        "data_list"
      );
    },

    // 重置
    resetForm() {
      this.find_form.data = {};
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
        "data_list"
      );
    },
  },
};
</script>

<style lang='scss'>
#auction_records {
  form {
    .el-form-item {
      display: inline-block;
      .el-input,
      .el-select {
        width: 200px;
      }
    }
  }
}
</style>