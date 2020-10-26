<template>
  <div id="auction_records" class="shadow_container">
    <!-- 道具交易记录 -->
    <div class="pageTitle">交易记录</div>

    <!-- 表单 -->
    <el-form ref="find_form" :model="find_form" label-width="80px">
      <el-form-item label="道具名称" label-width="100px">
        <el-input
          v-model="find_form.data.aname"
          placeholder="请输入道具名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="道具类型" label-width="100px">
        <el-select
          v-model="find_form.data.assetType"
          placeholder="请选择房产类型"
        >
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
      <el-table-column
        prop="logID"
        label="交易单号"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="assetsName"
        label="道具名称"
        width="120"
      ></el-table-column>
      <el-table-column prop="assetType" label="道具类型" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.assetType == 1">优惠券</span>
          <span v-else-if="scope.row.assetType == 2">道具</span>
          <span v-else-if="scope.row.assetType == 3">虚拟房产</span>
        </template>
      </el-table-column>
      <el-table-column prop="number" label="数量" width="120"></el-table-column>
      <el-table-column
        prop="describe"
        label="交易描述"
        width="180"
      ></el-table-column>
      <el-table-column prop="imageID" label="道具缩略图" width="120">
        <template slot-scope="scope">
          <el-avatar
            shape="square"
            :size="80"
            :src="scope.row.imageID"
          ></el-avatar>
        </template>
      </el-table-column>
      <el-table-column
        prop="ownerName"
        label="卖家昵称"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="buyName"
        label="买家昵称"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="price"
        label="交易金额"
        width="120"
      ></el-table-column>

      <el-table-column
        prop="createTime"
        label="交易时间"
        width="180"
      ></el-table-column>
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
      data_list: [],
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