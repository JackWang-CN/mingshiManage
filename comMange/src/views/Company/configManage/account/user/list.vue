<!-- 用户管理 -->
<template>
  <div id="author_user" class="shadow_container">
    <div class="pageTitle">账号管理</div>
    <!-- 查询表单 -->
    <el-form class="find_form" :model="find_form" label-width="100px">
      <!-- 查询条件 -->
      <el-form-item label="用户名">
        <el-input
          v-model="find_form.data.account"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户状态">
        <el-select v-model="find_form.data.isEnable" placeholder="请选择状态">
          <el-option label="启用" value="0"></el-option>
          <el-option label="禁用" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属角色组">
        <el-select
          v-model="find_form.data.roleGroupID"
          placeholder="请选择角色组"
        >
          <el-option label="全部" value></el-option>
          <el-option
            v-for="role in role_list"
            :key="role.roleID"
            :label="role.name"
            :value="role.roleID"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="身份证号">
        <el-input
          v-model="find_form.data.idCard"
          placeholder="请输入身份证号"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="findData">查询</el-button>
        <el-button type="info" @click="resetForm">重置</el-button>
        <el-button
          type="success"
          style="margin-left: 50px"
          @click="showDetails('0')"
          >添加用户</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 角色列表 -->
    <el-table :data="data_list" tooltip-effect="dark" :border="true">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="昵称" width="150"></el-table-column>
      <el-table-column prop="imgUrl" label="头像" width="150">
        <template slot-scope="scope">
          <el-avatar
            :size="80"
            :src="scope.row.imgUrl"
            shape="square"
          ></el-avatar>
        </template>
      </el-table-column>
      <el-table-column
        prop="account"
        label="用户名"
        width="150"
      ></el-table-column>
      <el-table-column prop="isEnable" label="用户状态" width="100">
        <template slot-scope="scope">{{
          scope.row.isEnable ? "启用" : "禁用"
        }}</template>
      </el-table-column>
      <el-table-column
        prop="roleGroupID"
        label="所属角色组"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="email"
        label="安全邮箱"
        width="220"
      ></el-table-column>
      <el-table-column prop="isAdministrator" label="用户级别" width="120">
        <template slot-scope="scope">{{
          scope.row.isAdministrator == "1" ? "超级管理员" : "普通用户"
        }}</template>
      </el-table-column>
      <el-table-column
        prop="trueName"
        label="真实姓名"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="idCard"
        label="身份证号"
        width="250"
      ></el-table-column>
      <el-table-column
        prop="updateTime"
        label="修改时间"
        width="250"
      ></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            @click="showDetails('1', scope.row)"
            type="primary"
            size="small"
            >编辑</el-button
          >
          <el-button
            v-if="!scope.row.isAdministrator"
            @click="delRow(scope.row)"
            type="danger"
            size="small"
            >删除</el-button
          >
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
    <el-dialog title="详情" :visible.sync="show_details" @closed="clear">
      <el-form class="details_form" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="data_info.account"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="data_info.password"></el-input>
        </el-form-item>
        <el-form-item label="角色组">
          <el-select v-model="data_info.roleGroupID">
            <el-option
              v-for="role in role_list"
              :key="role.roleID"
              :label="role.name"
              :value="role.roleID"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-select v-model="data_info.isEnable">
            <el-option label="启用" :value="0"></el-option>
            <el-option label="禁用" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sendSubmit">提交</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { createGet, spliceKey, filteObj, spliceImg } from "@/utils/common";
import { getDataList, addData, delData, updateData } from "@/utils/api/apis";
export default {
  components: {
    Pagination,
  },
  mounted() {
    // 请求账号列表
    this.find_form = createGet();
    var form = { ...this.find_form };
    getDataList(this.model, this.control, 1, form, this, "data_list");

    // 请求角色组列表
    getDataList(this.model, "comUserRole", 1, form, this, "role_list");
  },

  data() {
    return {
      find_form: {
        data: {},
      },
      role_list: [],
      data_list: [],
      data_info: {},

      model: "comUser",
      control: "comUserInfo",
      show_details: false,
      operate_type: "0", // 操作类型
    };
  },

  methods: {
    // 查询
    findData() {
      var form = { ...this.find_form };
      form.data = { ...this.find_form.data };
      form.data = filteObj(form.data);
      form.data = spliceKey(form.data);
      getDataList(this.model, this.control, 1, form, this, "data_list");
    },

    // 发送创建请求
    sendSubmit() {
      this.show_details = false;
      if (this.operate_type == "0") {
        addData(this.model, this.control, 1, this.data_info).then((res) => {
          switch (res.code) {
            case "000000":
              this.$message.success("创建成功！");
              getDataList(
                this.model,
                this.control,
                1,
                this.find_form,
                this,
                "data_list"
              );
              break;
          }
        });
      } else {
        updateData(this.model, this.control, 1, this.data_info).then((res) => {
          switch (res.code) {
            case "000000":
              this.$message.success("修改成功！");
              getDataList(
                this.model,
                this.control,
                1,
                this.find_form,
                this,
                "data_list"
              );
              break;
          }
        });
      }
    },

    // 删除单条数据
    delRow(row) {
      var { userID } = row;
      delData(this.model, this.control, 1, { userID }).then((res) => {
        switch (res.code) {
          case "000000":
            this.$message.success("删除成功");
        }
        getDataList(
          this.model,
          this.control,
          1,
          this.find_form,
          this,
          "data_list"
        );
      });
    },

    // 取消 关闭弹出框
    cancel() {
      this.show_details = false;
    },

    // 展示详情 type: 0-新增 1-修改
    showDetails(type, row) {
      this.show_details = true;
      this.operate_type = type;
      if (this.operate_type == "1") {
        this.data_info = { ...row };
      }
    },

    // 清空弹出框
    clear() {
      this.data_info = {};
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
      getDataList(this.model, this.control, 1, form, this, "data_list");
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
  },

  watch: {
    data_list() {
      this.data_list = spliceImg(this.data_list, "headIco");
    },
  },
};
</script>

<style lang="scss">
#author_user {
  // 查询表单
  .find_form {
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

  // 弹出框详情表单
  .details_form {
    .el-input,
    .el-select {
      width: 300px;
    }
  }
}
</style>
