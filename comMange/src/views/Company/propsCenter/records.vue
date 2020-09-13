<template>
  <div id="props_records" class="shadow_container">
    <!-- 道具交易记录 -->
    <div class="pageTitle">交易记录</div>

    <!-- 表单 -->
    <el-form ref="find_form" class="find_form" :model="find_form" label-width="80px">
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
        <el-input v-model="find_form.data.name1" placeholder="买家昵称"></el-input>
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
      <el-table-column prop="buyID" label="买家昵称" width="120"></el-table-column>
      <el-table-column prop="name" label="道具名称" width="120"></el-table-column>
      <el-table-column prop="propTypeID" label="道具类型" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.propTypeID==1">户型风格</span>
          <span v-else-if="scope.row.propTypeID==2">屋内道具</span>
          <span v-else-if="scope.row.propTypeID==3">AR宠物</span>
          <el-avatar :size="50" :src="scope.row.rpmico"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="sellNum" label="数量" width="120"></el-table-column>
      <el-table-column prop="unitPrice" label="单价" width="120"></el-table-column>
      <el-table-column prop="propIco" label="道具缩略图" width="120">
        <template slot-scope="scope">
          <el-avatar shape="square" :size="80" :src="scope.row.resId"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="describe" label="描述" width="120"></el-table-column>
      <el-table-column prop="tradeTime" label="交易时间" width="180"></el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="showDetails(scope.row.logID)" type="primary" size="small">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页插件 -->
    <Pagination
      :find="find_form"
      @sizeChange="pageChange('size', $event)"
      @currChange="pageChange('curr', $event)"
    ></Pagination>

    <!-- 弹出框 -->
    <el-dialog title="交易详情" :visible.sync="isShowDetails">
      <el-form label-width="100px">
        <el-form-item label="交易单号">{{data_info.logID}}</el-form-item>
        <el-form-item label="道具名称">{{data_info.name}}</el-form-item>
        <el-form-item label="道具类型">{{data_info.propTypeID}}</el-form-item>
        <el-form-item label="道具缩略图">
          <el-avatar :size="80" :src="data_info.propIco" shape="square"></el-avatar>
        </el-form-item>
        <el-form-item label="交易金额">{{data_info.totalPrice}}</el-form-item>
        <el-form-item label="交易时间">{{data_info.tradeTime}}</el-form-item>
        <el-form-item>
          <el-button @click="isShowDetails=false">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { createGet, spliceKey, filteObj } from "@/utils/common";
import { getDataList, getDataDetails } from "@/utils/api/apis";
export default {
  components: {
    Pagination,
  },
  mounted() {
    this.find_form = createGet();
    var form = { ...this.find_form };
    // 首次加载
    getDataList(this.model, this.control, 1, form, this);
  },

  data() {
    return {
      find_form: {
        data: {},
      },
      data_list: [],
      data_info: [],
      control: "PropsCenterRecord",
      isShowDetails: false,

      model: "prop",
      control: "propStoreDealLog",
    };
  },

  methods: {
    // 查询
    findData() {
      var form = { ...this.find_form };
      form.data = filteObj(form.data);
      form.data = spliceKey(form.data);
      getDataList(this.model, this.control, 1, form, this);
    },

    // 查看详情
    showDetails(id) {
      this.isShowDetails = true;
      var logID = id;
      getDataDetails(this.model, this.control, 1, { logID }, this);
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
      getDataList(this.model, this.control, 1, form, this);
    },
  },
};
</script>

<style lang='scss'>
#props_records {
  .find_form {
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