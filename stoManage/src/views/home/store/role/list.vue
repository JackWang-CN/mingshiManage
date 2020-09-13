<!-- 角色管理 -->
<template>
  <div id="author_roleList" class="shadow_container">
    <div class="pageTitle">角色管理</div>
    <!-- 查询表单 -->
    <el-form ref="find_form" :model="find_form" label-width="80px">
      <!-- 查询条件 -->
      <el-form-item label="角色名称">
        <el-input v-model="find_form.name"></el-input>
      </el-form-item>
      <el-form-item label="角色状态">
        <el-select v-model="find_form.enable" placeholder="请选择角色状态">
          <el-option label="禁用" value="1"></el-option>
          <el-option label="启用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <!-- 按钮组 -->
      <el-form-item>
        <el-button type="primary" @click="findData">查询角色</el-button>
        <el-button type="success" @click="showDetails(0)">新增角色</el-button>
      </el-form-item>
    </el-form>

    <!-- 角色列表 -->
    <el-table ref="role_list" :data="role_list" tooltip-effect="dark" :border="true">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="roleID" label="角色编号" width="200"></el-table-column>
      <el-table-column prop="name" label="角色名称" width="150">
        <template slot-scope="scope">
          <i
            :class="
              scope.row.roleGrName == '管理组'
                ? 'el-icon-user-solid gold'
                : 'el-icon-user-solid blue'
            "
          ></i>
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="角色权限" width="300">
        <template slot-scope="scope">
          <span
            class="jurisdiction"
            v-for="(item, index) in scope.row.rolegrauth"
            :key="index"
          >{{ index + 1 + "、" + item }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="enable" label="状态" width="200">
        <template slot-scope="scope">{{scope.row.enable==1?'启用':'禁用'}}</template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="showDetails(1,scope.row)" type="primary" size="small">修改</el-button>
          <el-button @click="delRow(scope.row.roleID)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出框 -->
    <el-dialog title="角色详情" :visible.sync="show_details" @closed="clear">
      <el-form label-width="90px" id="details_form">
        <el-form-item label="角色名称">
          <el-input v-model="data_info.name"></el-input>
        </el-form-item>
        <el-form-item label="启用状态">
          <el-select v-model="data_info.enable">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>权限-待完善</el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="sendSubmit">保存</el-button>
          <el-button size="small" type="cancel" @click="show_details=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getData, addData, delData, getDataList } from "@/utils/api/apis";
import { createGet } from "@/utils/common";

export default {
  mounted() {
    this.find_form = { createGet };
    var form = { ...this.find_form };
    getDataList(this.model, this.control, 1, form, this, "role_list");
  },
  data() {
    return {
      find_form: {
        currPage: 1,
        pageSize: 10,
        totalDataNum: 0,
      },

      role_list: [],
      data_info: {},
      operate: 0,
      show_details: false,

      model: "authority",
      control: "role",
    };
  },
  methods: {
    // 查询
    findData() {
      var form = { ...this.find_form };
      getDataList(this.model, this.control, 1, form, this, "role_list");
    },

    // 展示详情 0:新增  1:修改
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
            getDataList(this.model, this.control, 1, form, this, "role_list");
            break;
        }
      });
    },

    // 发送提交修改
    sendSubmit() {
      switch (this.operate) {
        // 新增
        case 0:
          getData(this.model, this.control, 1, this.data_info, "create").then(
            (res) => {
              this.show_details = false;
              var form = { ...this.find_form };
              getDataList(this.model, this.control, 1, form, this, "role_list");
            }
          );
          break;
        // 修改
        case 1:
          addData(this.model, this.control, 1, this.data_info, "update").then(
            (res) => {
              this.show_details = false;
              var form = { ...this.find_form };
              getDataList(this.model, this.control, 1, form, this, "role_list");
            }
          );
          break;
      }
    },

    // 清空详情表单
    clear() {
      this.data_info = {};
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
    .cell {
      .el-icon-user-solid {
        font-size: 18px;
        &.blue {
          color: rgb(0, 225, 255);
        }
        &.gold {
          color: rgb(235, 225, 42);
        }
      }
      // 权限
      span.jurisdiction {
        margin-right: 15px;
      }
    }
  }
}
</style>
