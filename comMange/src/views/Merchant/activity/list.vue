<!-- 活动列表 -->
<template>
  <div id="activity_list" class="shadow_container">
    <div class="pageTitle">
      活动列表
      <el-button type="success" @click="toDetails">创建活动</el-button>
    </div>

    <!-- tab分页 -->
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="商户列表" name="propHouse"></el-tab-pane>
    </el-tabs>

    <!-- 查询条件 -->
    <el-form ref="find_form" class="find_form" :model="find_form" label-width="80px">
      <el-form-item label="活动名称" label-width="100px">
        <el-input v-model="find_form.data.aname" placeholder="请输入活动名称"></el-input>
      </el-form-item>
      <el-form-item label="活动类型" label-width="100px">
        <el-select v-model="find_form.data.rpmtype" placeholder="请选择活动类型">
          <el-option label="全部" value></el-option>
          <el-option label="优惠券" value="1"></el-option>
          <el-option label="道具" value="2"></el-option>
          <el-option label="虚拟房产" value="3"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="findData">查询</el-button>
        <el-button type="info" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 数据列表 -->
    <el-table :data="data_list" border>
      <el-table-column prop="aname" label="活动名称" width="150"></el-table-column>
      <el-table-column prop="rpmtype" label="活动类型" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.rpmtype==1">优惠券</span>
          <span v-else-if="scope.row.rpmtype==2">道具</span>
          <span v-else-if="scope.row.rpmtype==3">虚拟房产</span>
        </template>
      </el-table-column>
      <el-table-column prop="anum" label="数量" width="120"></el-table-column>
      <el-table-column prop="aunitp" label="价格" width="120"></el-table-column>
      <el-table-column prop="infoDes" label="活动描述" width="200"></el-table-column>
      <el-table-column prop="expireTime" label="到期时间" width="160"></el-table-column>
      <el-table-column prop="creationtime" label="创建时间" width="160"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="showDetails(scope.row)" type="primary" size="small">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <Pagination
      :find="find_form"
      @sizeChange="pageChange('size', $event)"
      @currChange="pageChange('curr', $event)"
    ></Pagination>

    <!-- 弹出框 -->
    <el-dialog title="道具详情" :visible.sync="show_details" width="50%">
      <el-form label-width="100px">
        <el-form-item label="物品名称">{{data_info.aname}}</el-form-item>
        <el-form-item label="道具类型">{{data_info.rpmtype}}</el-form-item>
        <el-form-item label="活动数量">{{data_info.anum}}</el-form-item>
        <el-form-item label="拍品单价">{{data_info.aunitp}}</el-form-item>
        <el-form-item label="拍品描述">{{data_info.infoDes}}</el-form-item>
        <el-form-item label="上架时间">{{data_info.listingTime}}</el-form-item>
        <el-form-item label="到期时间">{{data_info.expireTime}}</el-form-item>
        <el-form-item label="卖家昵称">{{data_info.owner}}</el-form-item>
        <el-form-item label="道具图片">
          <el-avatar :size="80" :src="data_info.rpmico" shape="square"></el-avatar>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="show_details = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { getDataList } from "@/utils/api/apis";
import { createGet, filteObj, spliceKey } from "@/utils/common";
export default {
  components: {
    Pagination,
  },
  mounted() {
    // 首次加载
    this.find_form = createGet();
    var form = { ...this.find_form };
  },

  data() {
    return {
      // 查找条件
      find_form: { data: {} },
      data_list: [], // 数据列表
      data_info: {}, // 详情数据对象

      show_details: false,
      model: "",
      control: "",
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

    // 展示详情
    showDetails(row) {
      var { assetsId } = row;
      // 1.打开模态框
      this.show_details = true;
      // 2.请求详情数据并渲染
      getDataDetail(
        this.model,
        this.control,
        this.vision,
        { assetsId },
        this,
        "data_info"
      );
    },

    // 跳转到详情页
    toDetails() {
      this.$router.push("merchant_activityCreate");
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

<style lang="scss">
#activity_list {
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
