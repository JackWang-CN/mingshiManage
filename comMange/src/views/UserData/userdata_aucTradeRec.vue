<!-- 商户管理-商户列表 -->
<template>
  <div id="store" class="shadow_container">
    <div class="pageTitle">拍卖交易记录</div>
    <!-- 查询条件 -->
    <el-form ref="find_form" :model="find_form" label-width="80px">
      <el-form-item label="交易单号（数据ID）" label-width="100px">
        <el-input
          v-model="find_form.data.tradeId"
          placeholder="请输入交易单号（数据ID）"
        ></el-input>
      </el-form-item>
      <el-form-item label="资源id" label-width="100px">
        <el-input
          v-model="find_form.data.resId"
          placeholder="请输入资源id"
        ></el-input>
      </el-form-item>
      <el-form-item label="交易人" label-width="100px">
        <el-input
          v-model="find_form.data.trader"
          placeholder="请输入交易人"
        ></el-input>
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
      <!-- 日期查询 -->
      <div class="date_btn">
        <el-form-item class="btns_find">
          <el-button type="primary">查询</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
          <el-button
            type="success"
            style="margin-left:50px"
            @click="dialogFormVisibleOfAdd = true"
            >添加</el-button
          >
          <el-button type="danger" @click="delete_list">批量删除</el-button>
        </el-form-item>
      </div>
    </el-form>
    <!-- 商户列表 -->
    <el-table
      :data="store_list"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        fixed
        prop="tradeId"
        label="交易单号（数据ID）"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="resId"
        label="资源id"
        width="120"
      ></el-table-column>
      <el-table-column
        fixed
        prop="trader"
        label="交易人"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="tradeTime"
        label="交易时间"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="creationtime"
        label="创建时间"
        width="120"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="show_edit(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-button
            @click="user_delete(scope.row)"
            type="text"
            size="small"
            class="btns_delete"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { createGet, filteObj, spliceKey } from "@/utils/common";
import {
  getDataList,
  addData,
  deletelist,
  deleteuser,
  patchedit,
} from "@/api/api";
export default {
  data() {
    return {
      // 查找条件
      find_form: {
        currPage: 1,
        pageSize: 10,
        data: {},
      },
      select_list: [], //已选表单

      // 商户列表
      store_list: [],
    };
  },

  mounted() {
    var get_form = creatGet();
    getDataList("u1", "Auctraderec", get_form, "store_list", this);
  },

  methods: {
    // 重置
    resetForm() {
      this.find_form.data = {};
    },
  },
};
</script>

<style lang="scss">
#store {
  form {
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
