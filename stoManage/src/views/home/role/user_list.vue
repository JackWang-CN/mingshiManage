<!-- 用户管理 -->
<template>
  <div id="author_user" class="shadow_container">
    <div class="pageTitle">
      用户管理
      <el-button type="success" style="margin-left:50px" @click="toDetails()">添加用户</el-button>
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
      <el-table-column prop="userId" label="用户ID" width="120"></el-table-column>
      <el-table-column prop="userName" label="用户名" width="100"></el-table-column>
      <el-table-column prop="headIco" label="用户头像" width="100">
        <template slot-scope="scope">
          <el-avatar :src="scope.row.headIco" :size="70"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="merchantname" label="所属商户" width="150"></el-table-column>
      <el-table-column prop="isEnable" label="用户状态" width="100">
        <template slot-scope="scope">{{scope.row.isEnable-0?'启用':'禁用'}}</template>
      </el-table-column>
      <el-table-column prop="roleGroupId" label="所属用户组" width="150">
        <template slot-scope="scope">
          <i v-if="scope.row.roleGroupId=='0'">XX组</i>
          <i v-else-if="scope.row.roleGroupId=='1'">财务组</i>
          <i v-else-if="scope.row.roleGroupId=='2'">开发组</i>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="250"></el-table-column>
      <el-table-column prop="isAdministrator" label="账号权限" width="150">
        <template slot-scope="scope">{{scope.row.isAdministrator-0?'超级管理员':'普通管理员'}}</template>
      </el-table-column>
      <el-table-column prop="realName" label="真实姓名" width="100"></el-table-column>
      <el-table-column prop="idCard" label="身份证号" width="250"></el-table-column>
      <el-table-column prop="creationTime" label="创建时间" width="250"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="toDetails(scope.row.userId)" type="primary" size="small">编辑</el-button>
          <el-button
            @click="delRow(scope.row.userId)"
            type="danger"
            size="small"
            v-if="!scope.row.isAdministrator-0"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getDataList, delData } from "@/utils/api/api";
import { createGet } from "@/utils/common";
export default {
  mounted() {
    getDataList(
      this.$vision.merchant,
      "Userinfo",
      createGet(1, 10),
      "user_list",
      this,
      null,
      "headIco"
    );
  },
  data() {
    return {
      find_form: {
        currPage: 1,
        pageSize: 10,
      },
      add_form: {
        username: "",
        password: "",
        status: "",
        grounp: "",
        is_superuser: "",
        real_name: "",
        idcard: "",
      },
      user_list: [],
    };
  },
  methods: {
    // 跳转到详情页
    toDetails(id) {
      this.$router.push({
        path: "user_details",
        query: { id },
      });
    },

    // 删除当前
    delRow(userId) {
      var form = { userId };
      delData(this.$vision.merchant, "Userinfo", "del", form).then((res) => {
        if (res) {
          this.$message.success("删除成功");
          getDataList(
            this.$vision.merchant,
            "Userinfo",
            this.find_form,
            "user_list",
            this,
            null,
            "headIco"
          );
        }
      });
    },
    // 批量添加
    user_batchAdd() {
      console.log("点击了批量添加");
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
          this.maskBox = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 提交新增
    sendAdd() {
      alert("新增成功");
      this.maskBox = false;
    },
    // 重置
    resetForm() {
      this.find_form = {};
    },
  },
};
</script>

<style lang='scss'>
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
}
</style>