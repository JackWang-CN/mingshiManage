<!-- 商品列表 -->
<template>
  <div id="goods_list" class="shadow_container">
    <div class="pageTitle">
      商品列表
      <el-button type="success" style="margin-left:50px" @click="toDetails()">添加商品</el-button>
    </div>
    <!-- 查询表单 -->
    <el-form ref="find_form" :model="find_form" label-width="100px">
      <!-- 查询条件 -->
      <el-form-item label="商品名称">
        <el-input v-model="find_form.productName" placeholder="请输入商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品ID">
        <el-input v-model="find_form.productId" placeholder="请输入商品ID"></el-input>
      </el-form-item>
      <el-form-item label="商品类型">
        <el-select v-model="find_form.productType" placeholder="请选择商品类型">
          <el-option label="大类一" value="大类一"></el-option>
          <el-option label="大类二" value="大类二"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否禁用">
        <el-select v-model="find_form.isDisable" placeholder="请选择商品状态">
          <el-option label="禁用" :value="false"></el-option>
          <el-option label="启用" :value="true"></el-option>
        </el-select>
      </el-form-item>

      <!-- 日期查询 -->
      <el-form-item label="到期时间" label-width="100px">
        <el-date-picker
          v-model="find_form.dismountTime"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>

      <!-- 按钮组 -->
      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button type="info" @click="resetForm">重置</el-button>
        <el-button type="danger" @click="delList">批量删除</el-button>
      </el-form-item>
    </el-form>

    <!-- 商品列表 -->
    <el-table
      ref="goods_list"
      :data="goods_list"
      tooltip-effect="dark"
      :border="true"
      @selection-change="select"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="productId" label="商品ID" width="200" sortable></el-table-column>
      <el-table-column prop="productName" label="商品名称" width="150" sortable></el-table-column>
      <el-table-column prop="productIco" label="商品图片" width="150">
        <template slot-scope="scope">
          <img height="100" :src="scope.row.productIco" alt />
        </template>
      </el-table-column>
      <el-table-column prop="detailDes" label="详情描述" width="300"></el-table-column>
      <el-table-column prop="productType" label="商品类型" width="150"></el-table-column>
      <el-table-column prop="dismountTime" label="下架时间" width="200"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间" width="200"></el-table-column>
      <el-table-column prop="isDisable" label="是否禁用" width="100">
        <template slot-scope="scope">{{scope.row.isDisable?'是':'否'}}</template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="toDetails(scope.row.productId)" type="primary" size="small">编辑</el-button>
          <el-button @click="delRow(scope.row.productId)" type="danger" size="small">删除</el-button>
          <el-button @click="resource_batchAdd(scope.row)" type="text" size="small">添加优惠券</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页插件 -->
    <pagination
      :find="find_form"
      @sizeChange="pageChange('size',$event)"
      @currChange="pageChange('curr',$event)"
    ></pagination>
  </div>
</template>

<script>
import { createGet } from "@/utils/common";
import { getDataList, delData } from "@/utils/api/api";
import pagination from "@/components/Pagination";

export default {
  components: {
    pagination,
  },
  created() {
    // 首次加载
    getDataList(
      this.$vision.merchant,
      "Productinfo",
      createGet(1, 10),
      "goods_list",
      this,
      null,
      "productIco"
    );
  },
  data() {
    return {
      // 查询条件
      find_form: {
        currPage: 1,
        pageSize: 10,
        totalDataNum: 0,
      },

      // 数据列表
      goods_list: [],

      // 多选列表
      select_list: [],
    };
  },

  methods: {
    // 跳转到详情页
    toDetails(id) {
      this.$router.push({
        path: "goods_details",
        query: { id },
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
      getDataList(
        this.$vision.merchant,
        "Productinfo",
        this.find_form,
        "goods_list",
        this,
        null,
        "productIco"
      );
    },

    // 删除当前
    delRow(productId) {
      var obj = { productId };
      delData(this.$vision.merchant, "Productinfo", "del", obj).then((res) => {
        if (res) {
          this.$message.success("删除成功！");
          getDataList(
            this.$vision.merchant,
            "Productinfo",
            this.find_form,
            "goods_list",
            this,
            null,
            "productIco"
          );
        }
      });
    },
    // 删除批量
    delList() {
      if (this.select_list.length) {
        delData(
          this.$vision.merchant,
          "Productinfo",
          "delList",
          this.select_list
        ).then((res) => {
          if (res) {
            this.$message.success("删除成功！");
            getDataList(
              this.$vision.merchant,
              "Productinfo",
              this.find_form,
              "goods_list",
              this,
              null,
              "productIco"
            );
          }
        });
      } else {
        this.$message.error("请勾选至少一项");
        return;
      }
    },

    // 获取选中项
    select(list) {
      this.select_list = list.map((item) => {
        return { productId: item.productId };
      });
    },

    // 重置
    resetForm() {
      this.find_form = {
        name: "",
        primary_type: "",
        secondary_type: "",
        create_date: "",
      };
    },
  },
};
</script>

<style lang='scss'>
#goods_list {
  // 查询表单
  form {
    .el-form-item {
      display: inline-block;
    }
  }
  // 商品列表
  .el-table {
    display: inline-block;
    &::before {
      height: 0;
    }
  }
}
</style>