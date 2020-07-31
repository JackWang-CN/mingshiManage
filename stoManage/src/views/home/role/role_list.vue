<!-- 角色管理 -->
<template>
  <div id="author_roleList" class="shadow_container">
    <div class="pageTitle">角色管理</div>
    <!-- 查询表单 -->
    <el-form ref="find_form" :model="find_form" label-width="80px">
      <!-- 查询条件 -->
      <el-form-item label="角色名称">
        <el-input v-model="find_form.roleGrName"></el-input>
      </el-form-item>
      <el-form-item label="角色状态">
        <el-select v-model="find_form.status" placeholder="请选择角色状态">
          <el-option label="禁用" value="1"></el-option>
          <el-option label="启用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <!-- 按钮组 -->
      <el-form-item>
        <el-button type="primary">查询角色</el-button>
        <el-button type="success" @click="toDetails()">新增角色</el-button>
      </el-form-item>
    </el-form>

    <!-- 角色列表 -->
    <el-table ref="role_list" :data="role_list" tooltip-effect="dark" :border="true">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="roleId" label="角色编号" width="100"></el-table-column>
      <el-table-column prop="roleGrName" label="角色名称" width="150">
        <template slot-scope="scope">
          <i
            :class="scope.row.roleGrName=='管理组'?'el-icon-user-solid gold': 'el-icon-user-solid blue' "
          ></i>
          {{scope.row.roleGrName}}
        </template>
      </el-table-column>
      <el-table-column label="角色权限" width="300">
        <template slot-scope="scope">
          <span
            class="jurisdiction"
            v-for="(item,index) in scope.row.rolegrauth"
            :key="index"
          >{{index+1+'、'+item}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="creationTime" label="创建时间" width="200"></el-table-column>

      <el-table-column prop="message" label="详细说明" width="500"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="toDetails(scope.row.roleId)" type="primary" size="small">修改</el-button>
          <el-button @click="delRow(scope.row.roleId)" type="danger" size="small">删除</el-button>
          <el-button @click="role_batchAdd(scope.row)" type="text" size="small">批量添加成员</el-button>
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
      "Rolegroup",
      createGet(1, 10),
      "role_list",
      this
    );
  },
  data() {
    return {
      find_form: {
        currPage: 1,
        pageSize: 10,
        totalDataNum: 0,
      },

      role_list: [],
    };
  },
  methods: {
    // 跳转到详情页 0:新增  1:修改
    toDetails(id) {
      this.$router.push({
        path: "role_details",
        query: { id },
      });
    },

    // 删除当前
    delRow(roleId) {
      var obj = { roleId };
      // delData(this.$vision.merchant, "Rolegroup", "del", obj).then((res) => {
      //   if (res) {
      //     this.$message.success("删除成功！");
      //     getDataList(
      //       this.$vision.merchant,
      //       "Rolegroup",
      //       this.find_form,
      //       "role_list",
      //       this
      //     );
      //   }
      // });
    },
    role_batchAdd() {
      console.log("点击了批量添加");
    },
  },
};
</script>

<style lang='scss'>
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