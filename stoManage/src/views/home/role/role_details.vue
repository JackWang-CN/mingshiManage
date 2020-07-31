<!-- 新增角色 -->
<template>
  <div id="author_roleAdd" class="shadow_container">
    <div class="pageTitle">{{type?'修改角色':'新增角色'}}</div>
    <!-- 查询表单 -->
    <el-form ref="data_info" :model="data_info" label-width="80px">
      <div>
        <el-form-item label="角色名称">
          <el-input v-model="data_info.roleGrName" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色状态">
          <el-select v-model="data_info.isDisable" placeholder="请选择角色状态">
            <el-option label="禁用" :value="1"></el-option>
            <el-option label="启用" :value="0"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <!-- 权限配置 -->
      <div style="margin-bottom:20px">权限配置</div>
      <el-tabs tab-position="left" style="height:auto">
        <el-tab-pane v-for="v in author_list" :key="v.type" :label="v.type">
          <el-checkbox-group v-model="checkList">
            <el-checkbox
              v-for="(item,index) in v.children_dom"
              :key="index"
              :name="v.type"
              :label="item"
              :value="item"
            ></el-checkbox>
          </el-checkbox-group>
        </el-tab-pane>
      </el-tabs>

      <!-- 已选择 -->
      <div class="checkboxList">
        <h5>已选择</h5>
        <el-tag
          v-for="(tag,index) in checkList"
          :key="index"
          type="primary"
          closable
          @close="delTag(index)"
        >{{tag}}</el-tag>
      </div>

      <!-- 详细说明 -->
      <el-form-item style="display:block;margin-top:30px" label="详细说明">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 10}"
          placeholder="请输入内容"
          v-model="data_info.description"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sendSubmit">提交</el-button>
        <el-button type="danger" @click="cancle">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getDetailsInfo, addDataList, updateDataList } from "@/utils/api/api";
export default {
  created() {
    // 获取roleId
    var roleId = this.$route.query.id;
    if (roleId) {
      this.type = 1;
      var get_form = { roleId };
      getDetailsInfo(
        this.$vision.merchant,
        "Rolegrauth",
        get_form,
        "data_info",
        this
      );
    }
  },
  data() {
    return {
      type: 0, // 0表示新增,1表示修改

      data_info: {},
      author_list: [
        { type: "首页", children_dom: ["首页"] },
        { type: "公告", children_dom: ["公告"] },
        { type: "权限管理", children_dom: ["角色管理", "后台管理"] },
        { type: "资源管理", children_dom: ["资源管理"] },
        { type: "商户管理", children_dom: ["商户列表", "商户审核"] },
        { type: "客户管理", children_dom: ["客户管理"] },
      ],
      checkList: [],
    };
  },
  methods: {
    // 删除已选择权限
    delTag(index) {
      this.checkList.splice(index, 1);
    },

    // 提交
    sendSubmit() {
      console.log("立即创建");
      switch (this.type) {
        case 0:
          addDataList(
            this.$vision.merchant,
            "Rolegrauth",
            this.data_info,
            this,
            "role_list"
          );
          break;
        case 1:
          this.updateDataList(
            this.$vision.merchant,
            "Rolegrauth",
            this.data_info,
            this,
            "role_list"
          );
          break;
      }
    },
    // 取消创建
    cancle() {
      this.$confirm("确认取消操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
          this.$router.push("role_list");
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang='scss'>
#author_roleAdd {
  // 查询表单
  form {
    .el-form-item {
      display: inline-block;
      textarea {
        height: 100px !important;
        width: 800px;
      }
    }
    // 权限配置
    .el-tabs {
      display: inline-block;
      vertical-align: top;
      .el-tabs__content {
        width: 200px;
        display: inline-block;
        padding: 20px;
        border: 1px solid #dcdfe6;
        height: 100%;
      }
    }
    .checkboxList {
      min-width: 250px;
      max-width: 500px;
      padding: 20px;
      border: 1px solid #dcdfe6;
      margin-left: 20px;
      display: inline-block;
      min-height: 40px;
      h5 {
        margin-bottom: 10px;
        font-size: 14px;
      }
      .el-tag {
        margin: 0 10px 10px 0;
      }
    }
  }
}
</style>