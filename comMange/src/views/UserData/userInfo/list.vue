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
        <el-input v-model="find_form.data.phone" placeholder="请输入手机号（帐号）"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" label-width="100px">
        <el-input v-model="find_form.data.trueName" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="用户性别" label-width="100px">
        <el-select v-model="find_form.data.sex" placeholder="请选择性别">
          <el-option label="男" :value="1"></el-option>
          <el-option label="女" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否启用" label-width="100px">
        <el-select v-model="find_form.data.isEnable" placeholder="请选择是否禁用">
          <el-option label="是" :value="1"></el-option>
          <el-option label="否" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="btns_find">
        <el-button type="primary" @click="findData">查询</el-button>
        <el-button type="info" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 用户列表 -->
    <el-table :data="data_list" border style="width: 100%" @selection-change="select">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="nickname" label="用户昵称" width="120"></el-table-column>
      <el-table-column prop="headImage" label="用户头像" width="120">
        <template slot-scope="scope">
          <el-avatar :size="70" :src="scope.row.headImage" shape="square"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="perSign" label="个性签名" width="200"></el-table-column>
      <el-table-column prop="phone" label="手机号码" width="120"></el-table-column>
      <el-table-column prop="email" label="用户邮箱" width="150"></el-table-column>
      <el-table-column prop="isRealNameSys" label="是否实名" width="120">
        <template slot-scope="scope">{{ scope.row.isRealNameSys ? "是" : "否" }}</template>
      </el-table-column>
      <el-table-column prop="trueName" label="真实姓名" width="120"></el-table-column>
      <el-table-column prop="sex" label="用户性别" width="120">
        <template slot-scope="scope">{{ scope.row.sex ? "女" : "男" }}</template>
      </el-table-column>
      <el-table-column prop="idCard" label="身份证号" width="150"></el-table-column>
      <el-table-column prop="isEnable" label="是否启用" width="120">
        <template slot-scope="scope">{{ scope.row.isEnable ? "是" : "否" }}</template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="200"></el-table-column>
      <el-table-column fixed="right" label="操作" width="220">
        <template slot-scope="scope">
          <el-button @click="toDetails(scope.row.customerID)" type="primary" size="small">详情</el-button>
          <el-button
            @click="switchState(scope.row)"
            :type="scope.row.isEnable?'danger':'success'"
            size="small"
          >{{scope.row.isEnable?"禁用":'启用'}}</el-button>
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
import { getDataList, updateData } from "@/utils/api/apis";
import { createGet, spliceKey, filteObj, hintMessage } from "@/utils/common";
export default {
  components: {
    Pagination,
  },

  mounted() {
    // 首次加载
    this.find_form = createGet();
    var form = { ...this.find_form };
    getDataList(this.model, this.control, 1, form, this);
  },

  data() {
    return {
      // 查找条件
      find_form: { data: {} },

      model: "cusInfo",
      control: "customerInfo",

      select_list: [], //已选表单
      data_list: [], // 用户列表
    };
  },

  methods: {
    // 查询
    findData() {
      var form = { ...this.find_form };
      form.data = filteObj(form.data);
      getDataList(this.model, this.control, 1, form, this);
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
      getDataList(this.model, this.control, 1, form, this);
    },

    // 跳转到详情
    toDetails(id) {
      this.$router.push({
        path: "user_details",
        query: { id },
      });
    },

    // 禁用启用操作
    switchState(row) {
      console.log(row);
      var { customerID, isEnable } = row;
      isEnable = !isEnable - 0;
      switch (isEnable) {
        case 0:
          updateData(
            this.model,
            this.control,
            1,
            {
              customerID,
              isEnable,
            },
            "disable"
          ).then((res) => {
            hintMessage(this, res);
            var form = { ...this.find_form };
            getDataList(this.model, this.control, 1, form, this);
          });
          break;
        case 1:
          updateData(
            this.model,
            this.control,
            1,
            {
              customerID,
              isEnable,
            },
            "enable"
          ).then((res) => {
            hintMessage(this, res);
            var form = { ...this.find_form };
            getDataList(this.model, this.control, 1, form, this);
          });
          break;
      }
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
