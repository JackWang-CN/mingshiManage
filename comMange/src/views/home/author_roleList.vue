<!-- 角色管理 -->
<template>
  <div id="author_roleList" class="shadow_container">
    <div class="pageTitle">角色管理</div>
    <!-- 查询表单 -->
    <el-form ref="find_role" :model="find_role" label-width="80px">
      <!-- 查询条件 -->
      <el-form-item label="角色名称">
        <el-input v-model="find_role.data._like_RoleGrName"></el-input>
      </el-form-item>
      <!-- <el-form-item label="角色状态">
        <el-select v-model="find_role.status" placeholder="请选择角色状态">
          <el-option label="禁用" value="1"></el-option>
          <el-option label="启用" value="0"></el-option>
        </el-select>
      </el-form-item> -->
      <!-- 按钮组 -->
      <el-form-item>
        <el-button type="primary" @click="queryData">查询角色</el-button>
        <el-button type="success" @click="role_add">新增角色</el-button>
        <el-button type="danger" style="margin-left:50px">批量删除</el-button>
      </el-form-item>
    </el-form>

    <!-- 角色列表 -->
    <el-table
      ref="role_list"
      :data="role_list"
      tooltip-effect="dark"
      :border="true"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        prop="roleGrName"
        label="角色名称"
        width="150"
      ></el-table-column>
      <el-table-column label="角色权限" width="300">
        <template slot-scope="scope">{{ scope.row.roleList }}</template>
      </el-table-column>
      <el-table-column
        prop="creationTime"
        label="创建时间"
        width="180"
      ></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="role_update(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-button
            @click="role_delete(scope.row)"
            type="text"
            size="small"
            class="btns_delete"
            >删除</el-button
          >
          <el-button @click="role_batchAdd(scope.row)" type="text" size="small"
            >批量添加成员</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { creatGet, createObj } from "@/api/Common";
import { getDataList } from "@/api/api";
export default {
  data() {
    return {
      find_role: {
        currPage: 1,
        pageSize: 10,
        data: {
          RoleGrName: "",
        },
      },
      role_list: [],
      multipleSelection: [],
    };
  },
  mounted() {
    var get_form = creatGet();
    getDataList("c1", "Rolegroup", get_form, "role_list", this);
  },
  methods: {
    queryData() {
      this.find_role.data = createObj(this.find_role.data);
      getDataList("c1", "Rolegroup", this.find_role, "role_list", this);
    },
    role_add() {
      this.$router.push("author_roleAdd");
    },
    role_update() {},
    role_delete() {},
    role_batchAdd() {},
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
