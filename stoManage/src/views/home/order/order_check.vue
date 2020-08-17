<template>
  <div id="order_check" class="shadow_container">
    <div class="pageTitle">商户审核</div>
    <!-- 查询表单 -->
    <el-form ref="find_form" :model="find_form" label-width="100px">
      <!-- 查询条件 -->
      <el-form-item label="商家名称">
        <el-input
          v-model="find_form.name"
          placeholder="请输入商家名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="商家ID">
        <el-input
          v-model="find_form.code"
          placeholder="请输入商家ID"
        ></el-input>
      </el-form-item>
      <el-form-item label="审核状态">
        <el-select v-model="find_form.check_status" placeholder="请选择状态">
          <el-option label="待审核" value="待审核"></el-option>
          <el-option label="已拒绝" value="已拒绝"></el-option>
          <el-option label="已通过" value="已通过"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="业务经理">
        <el-input
          v-model="find_form.manager"
          placeholder="请选择业务经理"
        ></el-input>
      </el-form-item>
      <!-- 按钮组 -->
      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button type="info" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 资源列表 -->
    <el-table
      ref="order_list"
      :data="order_list"
      tooltip-effect="dark"
      :border="true"
    >
      <el-table-column
        prop="name"
        label="商家名称"
        width="150"
      ></el-table-column>
      <el-table-column prop="code" label="商家ID" width="150"></el-table-column>
      <el-table-column
        prop="manager"
        label="业务经理"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="file_name"
        label="附件名称"
        width="300"
      ></el-table-column>
      <el-table-column
        prop="file_address"
        label="附件地址"
        width="300"
      ></el-table-column>
      <el-table-column
        prop="upload_date"
        label="上传时间"
        width="300"
      ></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="check(scope.row)" type="success" size="small"
            >审核</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      find_form: {
        name: "",
        code: "",
        upload_date: "",
        check_status: "",
        manager: "",
      },
      order_list: [
        {
          name: "快乐柠檬",
          check_status: "已通过",
          code: "001",
          manager: "李子维",
          file_name: "广告彩页",
          file_address: "www.baidu.com",
          upload_date: "2020-06-09 09:00",
        },
        {
          name: "书亦烧仙草",
          check_status: "已通过",
          code: "002",
          manager: "李子维",
          file_name: "广告彩页",
          file_address: "www.baidu.com",
          upload_date: "2020-06-09 09:00",
        },
        {
          name: "茶百道",
          check_status: "已通过",
          code: "003",
          manager: "李子维",
          file_name: "广告彩页",
          file_address: "www.baidu.com",
          upload_date: "2020-06-09 09:00",
        },
        {
          name: "coco奶茶",
          check_status: "已通过",
          code: "004",
          manager: "李子维",
          file_name: "广告彩页",
          file_address: "www.baidu.com",
          upload_date: "2020-06-09 09:00",
        },
        {
          name: "奈雪の茶",
          check_status: "已通过",
          code: "005",
          manager: "李子维",
          file_name: "广告彩页",
          file_address: "www.baidu.com",
          upload_date: "2020-06-09 09:00",
        },
      ],
      multipleSelection: [],
    };
  },
  methods: {
    user_add() {
      this.$router.push("author_userAdd");
    },
    user_update() {},
    user_delete() {},
    user_batchAdd() {},
    // 重置
    resetForm() {
      this.find_form = {
        name: "",
        code: "",
        upload_date: "",
        check_status: "",
        manager: "",
      };
    },
  },
};
</script>

<style lang="scss">
#order_check {
  // 查询表单
  form {
    .el-form-item {
      display: inline-block;
    }
  }
  // 资源列表
  .el-table {
    display: inline-block;
    &::before {
      height: 0;
    }
  }
}
</style>
