<!-- 用户管理-用户列表 -->
<template>
  <div id="userInfo_list" class="shadow_container">
    <div class="pageTitle">用户列表</div>
    <!-- 查询条件 -->
    <el-form ref="find_form" :model="find_form" label-width="80px">
      <el-form-item label="用户昵称" label-width="100px">
        <el-input v-model="find_form.data.nickname" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" label-width="100px">
        <el-input v-model="find_form.data.mobileNum" placeholder="请输入手机号（帐号）"></el-input>
      </el-form-item>
      <el-form-item label="是否实名" label-width="100px">
        <el-select v-model="find_form.data.isRealNameSys" placeholder="请选择是否实名制">
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="真实姓名" label-width="100px">
        <el-input v-model="find_form.data.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="用户性别" label-width="100px">
        <el-select v-model="find_form.data.sex" placeholder="请选择性别">
          <el-option label="男" value="1"></el-option>
          <el-option label="女" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否禁用" label-width="100px">
        <el-select v-model="find_form.data.isDisable" placeholder="请选择是否禁用">
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
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

      <el-form-item class="btns_find">
        <el-button type="primary" @click="findData">查询</el-button>
        <el-button type="info" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 用户列表 -->
    <el-table :data="data_list" border style="width: 100%" @selection-change="select">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="nickname" label="用户昵称" width="120"></el-table-column>
      <el-table-column prop="userHeadpng" label="用户头像" width="120">
        <template slot-scope="scope">
          <el-avatar :size="70" :src="scope.row.userHeadpng" shape="square"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="perSign" label="个性签名" width="150"></el-table-column>
      <el-table-column prop="mobileNum" label="手机号码" width="120"></el-table-column>
      <el-table-column prop="userEmail" label="用户邮箱" width="120"></el-table-column>
      <el-table-column prop="safePwd" label="安全密码" width="120"></el-table-column>
      <el-table-column prop="isRealNameSys" label="是否实名" width="120">
        <template slot-scope="scope">{{ scope.row.isRealNameSys == "1" ? "是" : "否" }}</template>
      </el-table-column>
      <el-table-column prop="name" label="真实姓名" width="120"></el-table-column>
      <el-table-column prop="sex" label="用户性别" width="120">
        <template slot-scope="scope">{{ scope.row.sex == "1" ? "男" : "女" }}</template>
      </el-table-column>
      <el-table-column prop="iDCard" label="身份证号" width="120"></el-table-column>
      <el-table-column prop="isDisable" label="是否禁用" width="120">
        <template slot-scope="scope">{{ scope.row.isDisable == "1" ? "是" : "否" }}</template>
      </el-table-column>
      <el-table-column prop="extendLogin" label="三方登录预留字段" width="150"></el-table-column>
      <el-table-column prop="isDelete" label="是否删除标志" width="120">
        <template slot-scope="scope">{{ scope.row.isDelete == "1" ? "是" : "否" }}</template>
      </el-table-column>
      <el-table-column prop="inteThrCode" label="三证合一代码" width="120"></el-table-column>
      <el-table-column prop="creationtime" label="创建时间" width="200"></el-table-column>
      <el-table-column fixed="right" label="操作" width="220">
        <template slot-scope="scope">
          <el-button @click="toDetails(scope.row.userId)" type="primary" size="small">详情</el-button>
          <el-button @click="toDetails(scope.row.userId)" type="warning" size="small">编辑</el-button>
          <el-button @click="switchState(scope.row)" type="danger" size="small">禁用</el-button>
        </template>
      </el-table-column>
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
import { delData, getDataList } from "@/utils/api/api";
import { createGet, spliceKey, filteObj } from "@/utils/common";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      // 查找条件
      find_form: {
        currPage: 1,
        pageSize: 10,
        totalDataNum: 0,
        // orderByFileds: "creationtime desc",
        data: {},
      },
      control: "Userinfo",
      select_list: [], //已选表单

      data_list: [], // 用户列表
    };
  },
  mounted() {
    // 首次加载
    getDataList(
      this.$vision.user,
      this.control,
      createGet(),
      "data_list",
      this,
      null,
      "userHeadpng"
    );
  },
  methods: {
    // 查询
    findData() {
      var form = { ...this.find_form };
      form.data = filteObj(form.data);
      getDataList(
        this.$vision.user,
        this.control,
        form,
        "data_list",
        this,
        null,
        "userHeadpng"
      );
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
        this.$vision.user,
        "Userinfo",
        form,
        "data_list",
        this,
        null,
        "userHeadpng"
      );
    },

    // 跳转到详情
    toDetails(id) {
      this.$router.push({
        path: "user_details",
        query: { id },
      });
    },

    // 删除当前
    delRow(row) {
      var form = {
        userId: row.userId,
      };
      deleteuser(this.$vision.user, "Userinfo", form).then((res) => {
        if (res) {
          this.$message.success("删除成功");
          this.resetForm();
          getDataList(
            this.$vision.user,
            "Userinfo",
            this.find_form,
            "data_list",
            this
          );
        } else {
          this.$message.success("删除失败");
        }
      });
    },

    // 重置
    resetForm() {
      this.find_form = { currPage: 1, pageSize: 10, data: {} };
    },
    // 获取选中项
    select(list) {
      this.select_list = list;
    },
  },
};
</script>

<style lang="scss">
#userInfo_list {
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
