<!-- 账号管理 -->
<template>
  <div id="author_user" class="shadow_container">
    <div class="pageTitle">
      账号管理
      <el-button type="success" style="margin-left:50px" @click="showDetails(0)">添加用户</el-button>
    </div>
    <!-- 查询表单 -->
    <el-form ref="find_form" :model="find_form" label-width="100px">
      <!-- 查询条件 -->
      <el-form-item label="用户名">
        <el-input v-model="find_form.name" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="用户ID">
        <el-input v-model="find_form.code" placeholder="请输入用户ID"></el-input>
      </el-form-item>
      <el-form-item label="用户状态">
        <el-select v-model="find_form.primary_type" placeholder="请选择状态">
          <el-option label="启用" value="启用"></el-option>
          <el-option label="禁用" value="禁用"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属用户组">
        <el-select v-model="find_form.group" placeholder="请选择用户组">
          <el-option label="用户组一" value="用户组一"></el-option>
          <el-option label="用户组二" value="用户组二"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="安全邮箱">
        <el-input v-model="find_form.email" placeholder="请输入安全邮箱">
          <template slot="append">.com</template>
        </el-input>
      </el-form-item>
      <el-form-item label="真实姓名">
        <el-input v-model="find_form.real_name" placeholder="请输入真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="find_form.idcard" placeholder="请输入身份证号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button type="info" @click="resetForm">重置</el-button>
        <el-button type="danger">批量删除</el-button>
      </el-form-item>
    </el-form>

    <!-- 角色列表 -->
    <el-table ref="user_list" :data="user_list" tooltip-effect="dark" :border="true">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="userName" label="用户名" width="100"></el-table-column>
      <el-table-column prop="userAccount" label="用户账号" width="120"></el-table-column>
      <el-table-column prop="enable" label="用户状态" width="100">
        <template slot-scope="scope">
          {{
          scope.row.enable ? "启用" : "禁用"
          }}
        </template>
      </el-table-column>
      <el-table-column prop="roleGroupName" label="所属用户组" width="150"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="250"></el-table-column>
      <el-table-column prop="isAdministrator" label="账号权限" width="150">
        <template slot-scope="scope">
          {{
          scope.row.isAdministrator ? "超级管理员" : "普通管理员"
          }}
        </template>
      </el-table-column>
      <el-table-column prop="trueName" label="真实姓名" width="100"></el-table-column>
      <el-table-column prop="idCard" label="身份证号" width="250"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="showDetails(1,scope.row)" type="primary" size="small">编辑</el-button>
          <el-button
            @click="delRow(scope.row.userID)"
            type="danger"
            size="small"
            v-if="!scope.row.isAdministrator"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出框 -->
    <el-dialog title="用户详情" :visible.sync="show_details" @closed="clear">
      <el-form label-width="90px" id="details_form">
        <el-form-item label="用户名">
          <el-input v-model="data_info.userName"></el-input>
        </el-form-item>
        <el-form-item label="用户账号">
          <el-input v-model="data_info.userAccount"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="data_info.passWord"></el-input>
        </el-form-item>
        <el-form-item label="启用状态">
          <el-select v-model="data_info.enable">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属用户组">
          <el-select v-model="data_info.roleGroupName">
            <el-option label="用户组1" :value="1"></el-option>
            <el-option label="用户组2" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="sendSubmit">保存</el-button>
          <el-button size="small" type="cancel" @click="show_details=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getData, addData, getDataList, delData } from "@/utils/api/apis";
import { createGet } from "@/utils/common";
export default {
  mounted() {
    this.find_form = { createGet };
    var form = { ...this.find_form };
    getDataList(this.model, this.control, 1, form, this, "user_list");
  },
  data() {
    return {
      find_form: {
        currPage: 1,
        pageSize: 10,
      },
      data_info: {},
      user_list: [],
      show_details: false,

      operate: 0, // 0-新增 1-修改

      model: "authority",
      control: "user",
    };
  },
  methods: {
    // 跳转到详情页
    showDetails(type, row) {
      this.show_details = true;
      this.operate = type;
      if (type) {
        this.data_info = { ...row };
      }
    },

    // 删除当前
    delRow(value) {
      delData(this.model, this.control, 1, { value }).then((res) => {
        switch (res.code) {
          case "000000":
            this.$message.success("删除成功");
            var form = { ...this.find_form };
            getDataList(this.model, this.control, 1, form, this, "user_list");
            break;
        }
      });
    },

    // 发送提交修改
    sendSubmit() {
      console.log(this.data_info);
      switch (this.operate) {
        // 新增
        case 0:
          getData(this.model, this.control, 1, this.data_info, "create").then(
            (res) => {
              this.show_details = false;
              var form = { ...this.find_form };
              getDataList(this.model, this.control, 1, form, this, "user_list");
            }
          );
          break;
        // 修改
        case 1:
          addData(this.model, this.control, 1, this.data_info, "update").then(
            (res) => {
              this.show_details = false;
              var form = { ...this.find_form };
              getDataList(this.model, this.control, 1, form, this, "user_list");
            }
          );
          break;
      }
    },

    // 重置
    resetForm() {
      this.find_form = {};
    },

    // 清空详情表单
    clear() {
      this.data_info = {};
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
    }
  }
  // 角色列表
  .el-table {
    display: inline-block;
    &::before {
      height: 0;
    }
  }

  // 详情表单
  #details_form {
    .el-form-item {
      display: block;
      .el-input {
        width: 300px;
      }
    }
  }
}
</style>
