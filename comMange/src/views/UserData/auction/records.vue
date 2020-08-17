<template>
  <div id="auction_records" class="shadow_container">
    <!-- 道具交易记录 -->
    <div class="pageTitle">交易记录</div>

    <!-- 表单 -->
    <el-form ref="find_form" :model="find_form" label-width="80px">
      <el-form-item label="道具名称" label-width="100px">
        <el-input v-model="find_form.data.aname" placeholder="请输入道具名称"></el-input>
      </el-form-item>
      <el-form-item label="道具类型" label-width="100px">
        <el-select v-model="find_form.data.rpmtype" placeholder="请选择房产类型">
          <el-option label="户型风格" :value="1"></el-option>
          <el-option label="屋内道具" :value="2"></el-option>
          <el-option label="AR宠物" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="交易金额" label-width="100px">
        <el-input v-model="find_form.data.aunitp" placeholder="请输入交易金额"></el-input>
      </el-form-item>
      <el-form-item label="买家昵称" label-width="100px">
        <el-input v-model="find_form.data.name1" placeholder="请输入买家昵称"></el-input>
      </el-form-item>
      <el-form-item label="卖家昵称" label-width="100px">
        <el-input v-model="find_form.data.name2" placeholder="请输入卖家昵称"></el-input>
      </el-form-item>
      <el-form-item label="交易时间" label-width="100px">
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
      <el-table-column prop="creationtime" label="创建时间" width="180"></el-table-column>
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
import { getDataList, updateData, delData } from "@/utils/api/api";
export default {
  components: {
    Pagination,
  },
  mounted() {
    this.find_form = createGet();
    var form = { ...this.find_form };
    // 首次加载
    getDataList(
      this.$vision.user,
      this.control,
      form,
      "data_list",
      this,
      null,
      "resId"
    );
  },

  data() {
    return {
      find_form: {
        data: {},
      },
      data_list: [],
      control: "Auctraderec",
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
        this.$vision.user,
        this.control,
        form,
        "data_list",
        this,
        null,
        "rpmico"
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
        this.$vision.user,
        this.control,
        form,
        "data_list",
        this,
        null,
        "resId"
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