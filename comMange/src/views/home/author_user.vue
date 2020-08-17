<!-- 用户管理 -->
<template>
  <div id="author_user" class="shadow_container">
    <div class="pageTitle">用户管理</div>
    <!-- 查询表单 -->
    <el-form ref="find_form" :model="find_form" label-width="100px">
      <!-- 查询条件 -->
      <el-form-item label="用户名">
        <el-input v-model="find_form.data._like_userName" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="用户状态">
        <el-select v-model="find_form.data.isEnable" placeholder="请选择状态">
          <el-option label="启用" value="0"></el-option>
          <el-option label="禁用" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属用户组">
        <el-select v-model="find_form.data.RoleGroupId" placeholder="请选择用户组">
          <el-option label="全部" value></el-option>
          <el-option
            v-for="item in role_Group"
            :key="item.roleId"
            :label="item.roleGrName"
            :value="item.roleId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="安全邮箱">
        <el-input v-model="find_form.data.email" placeholder="请输入安全邮箱"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名">
        <el-input v-model="find_form.data._like_realName" placeholder="请输入真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="find_form.data._like_idCard" placeholder="请输入身份证号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryData">查询</el-button>
        <el-button type="info" @click="resetForm">重置</el-button>
        <el-button type="success" style="margin-left:50px" @click="dialogFormVisible = true">添加用户</el-button>
        <el-button type="danger" @click="delete_list">批量删除</el-button>
      </el-form-item>
    </el-form>

    <!-- 角色列表 -->
    <el-table
      ref="user_list"
      :data="user_list"
      tooltip-effect="dark"
      :border="true"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="userName" label="用户名" width="200"></el-table-column>
      <el-table-column prop="isEnable" label="用户状态" width="100">
        <template slot-scope="scope">
          {{
          scope.row.isEnable == "1" ? "禁用" : "启用"
          }}
        </template>
      </el-table-column>
      <el-table-column prop="groupName" label="所属用户组" width="150"></el-table-column>
      <el-table-column prop="email" label="安全邮箱" width="250"></el-table-column>
      <el-table-column prop="userId" label="用户ID" width="150"></el-table-column>
      <el-table-column prop="isAdministrator" label="是否超级管理员" width="150">
        <template slot-scope="scope">
          {{
          scope.row.isAdministrator == "1" ? "是" : "否"
          }}
        </template>
      </el-table-column>
      <el-table-column prop="realName" label="真实姓名" width="100"></el-table-column>
      <el-table-column prop="idCard" label="身份证号" width="250"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="user_update(scope.row)" type="primary" size="small">编辑</el-button>
          <el-button
            @click="user_delete(scope.row)"
            type="danger"
            size="small"
            class="btns_delete"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加弹出框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible" width="40%">
      <!-- 新增表单 -->
      <el-form ref="add_form" :model="add_form" label-width="120px">
        <el-form-item label="用户名">
          <el-input v-model="add_form.userName" placeholder="请输入用户名" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码">
          <el-input
            v-model="add_form.password"
            placeholder="请输入用户ID"
            show-password
            autocomplete="new-password"
          ></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="add_form.realName" placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="add_form.idCard" placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item label="安全邮箱">
          <el-input v-model="add_form.email" placeholder="请输入安全邮箱"></el-input>
        </el-form-item>
        <el-form-item label="用户状态">
          <el-select v-model="add_form.isEnable" placeholder="请选择状态">
            <el-option label="启用" value="0"></el-option>
            <el-option label="禁用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属用户组">
          <el-select v-model="add_form.roleGroupId" placeholder="请选择用户组">
            <el-option
              v-for="item in role_Group"
              :key="item.roleId"
              :label="item.roleGrName"
              :value="item.roleId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否超级管理员">
          <el-select v-model="add_form.isAdministrator" placeholder="请选择用户组">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd">取 消</el-button>
        <el-button type="primary" @click="user_add">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { creatGet, createObj, deletcondition } from "@/api/Common";
import { getDataList, putcreate, deletelist, deleteuser } from "@/api/api";
export default {
  data() {
    return {
      find_form: {
        currPage: 1,
        pageSize: 10,
        data: {},
      },
      add_form: {},
      dialogFormVisible: false,
      select_list: [],
      user_list: [],
      role_Group: [],
      multipleSelection: [],
    };
  },
  mounted() {
    var get_form = creatGet();
    getDataList("c1", "Userinfo", get_form, "user_list", this);
    var get_role = creatGet();
    getDataList("c1", "Rolegroup", get_role, "role_Group", this);
  },
  methods: {
    queryData() {
      this.find_form.data = createObj(this.find_form.data);
      getDataList("c1", "Userinfo", this.find_form, "user_list", this);
    },
    user_add() {
      putcreate("c1", "Userinfo", this.add_form).then((res) => {
        if (res != null) {
          this.$message.success("添加成功");
          this.resetForm();
          this.queryData();
          this.dialogFormVisible = false;
        } else {
          this.$message.success("添加失败");
        }
      });
    },
    // 修改当前
    user_update() {},
    // 删除当前
    user_delete(val) {
      var del = {
        tableId: val["tableId"],
        userId: val["userId"],
      };
      deleteuser("c1", "Userinfo", del).then((res) => {
        if (res != null) {
          this.$message.success("删除成功");
          this.resetForm();
          this.queryData();
        } else {
          this.$message.success("删除失败");
        }
      });
    },
    // 批量添加
    user_batchAdd() {},
    // 批量删除
    delete_list() {
      var dellist = deletcondition(this.select_list);
      deletelist("c1", "Userinfo", dellist).then((res) => {
        if (res != null) {
          this.$message.success("删除成功");
          this.resetForm();
          this.queryData();
        } else {
          this.$message.success("删除失败");
        }
      });
    },
    // 取消新增
    cancelAdd() {
      this.$confirm("确定要取消吗(｀・ω・´)", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            message: "取消新增!",
          });
          this.dialogFormVisible = false;
        })
        .catch((err) => {});
    },
    // 提交新增
    sendAdd() {
      alert("新增成功");
      this.dialogFormVisible = false;
    },
    // 重置
    resetForm() {
      this.find_form.data = {
        _like_userName: "",
        _like_userId: "",
        isEnable: "",
        RoleGroupId: "",
        email: "",
        _like_realName: "",
        _like_idCard: "",
      };
    },
    handleSelectionChange(val) {
      this.select_list = val;
    },
  },
};
</script>

<style lang="scss">
#author_user {
  // 查询表单
  form {
    .el-form-item {
      display: inline-block;
      .el-input,
      .el-select {
        width: 200px;
      }
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
