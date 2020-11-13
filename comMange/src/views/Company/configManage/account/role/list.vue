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
        <el-button type="success" @click="toDetails()">新增角色</el-button>
      </el-form-item>
    </el-form>

    <!-- 角色列表 -->
    <el-table :data="data_list" tooltip-effect="dark" :border="true">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        prop="name"
        label="角色名称"
        width="150"
      ></el-table-column>

      <el-table-column
        prop="updateTime"
        label="修改时间"
        width="180"
      ></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            @click="toDetails(scope.row.roleID)"
            type="primary"
            size="small"
            >编辑</el-button
          >
          <el-button
            @click="delRow(scope.row.roleID)"
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
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { createGet, filteObj, hintMessage } from "@/utils/common";
import { getDataList, delData } from "@/utils/api/apis";
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
      getDataList(this.model, this.control, 1, form, this);
    },

    // 跳转到详情页
    toDetails(id) {
      this.$router.push({
        path: "role_details",
        query: { id },
      });
    },

    // 删除当前行
    delRow(roleID) {
      delData(this.model, this.control, 1, { roleID }).then((res) => {
        hintMessage(this, res);
        var form = { ...this.find_form };
        getDataList(this.model, this.control, 1, form, this);
      });
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
      getDataList(this.model, this.control, 1, this.find_form, this);
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
