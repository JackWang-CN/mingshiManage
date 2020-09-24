<!-- 角色管理 -->
<template>
  <div id="author_roleList" class="shadow_container">
    <div class="pageTitle">角色管理</div>
    <!-- 查询表单 -->
    <el-form ref="find_form" :model="find_form" label-width="80px">
      <!-- 查询条件 -->
      <el-form-item label="角色名称">
        <el-input v-model="find_form.data._like_RoleGrName"></el-input>
      </el-form-item>

      <!-- 按钮组 -->
      <el-form-item>
        <el-button type="primary" @click="findData">查询角色</el-button>
        <el-button type="success" @click="toDetails">新增角色</el-button>
      </el-form-item>
    </el-form>

    <!-- 角色列表 -->
    <el-table :data="data_list" tooltip-effect="dark" :border="true">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="角色名称" width="150"></el-table-column>
      <el-table-column label="角色权限" width="300">
        <template slot-scope="scope">{{ scope.row.roleList }}</template>
      </el-table-column>
      <el-table-column prop="updateTime" label="修改时间" width="180"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="toDetails(scope.row)" type="primary" size="small">编辑</el-button>
          <el-button @click="delRow(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { createGet, filteObj } from "@/utils/common";
import { getDataList } from "@/utils/api/apis";
export default {
  mounted() {
    // 首次加载
    this.find_form = createGet();
    var form = { ...this.find_form };
    getDataList(this.model, this.control, 1, form, this);
  },

  data() {
    return {
      find_form: { data: {} },
      data_list: [],

      show_details: false,
      model: "comUser",
      control: "comUserRole",
    };
  },

  methods: {
    // 查询
    findData() {
      var form = { ...this.find_form };
      form.data = { ...this.find_form.data };
      form.data = filteObj(form.data);
      form.data = spliceKey(form.data);
      getDataList(this.model, this.control, null, form, this);
    },

    // 跳转到详情页
    toDetails() {
      this.$router.push("role_details");
    },

    // 删除当前行
    delRow() {
      console.log("删除");
    },
  },
};
</script>

<style lang="scss">
#author_roleList {
  // 查询表单
  form {
    .el-form-item {
      display: inline-block;
    }
  }
  // 角色列表
  .el-table {
    display: inline-block;
    &::before {
      height: 0;
    }
  }
}
</style>
