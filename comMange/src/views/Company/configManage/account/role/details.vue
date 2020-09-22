<!-- 新增角色 -->
<template>
  <div id="author_roleAdd" class="shadow_container">
    <div class="pageTitle">新增角色</div>
    <!-- 查询表单 -->
    <el-form ref="data_info" :model="data_info" label-width="80px">
      <div>
        <el-form-item label="角色名称">
          <el-input v-model="data_info.name" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色状态">
          <el-select v-model="data_info.isEnable" placeholder="请选择角色状态">
            <el-option label="禁用" :value="0"></el-option>
            <el-option label="启用" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <!-- 权限配置 -->
      <div style="margin-bottom:20px">权限配置</div>
      <el-tabs tab-position="left" style="height:auto">
        <el-tab-pane v-for="v in author_list" :key="v.type" :label="v.type">
          <el-checkbox-group v-model="checkList">
            <el-checkbox
              v-for="(item, index) in v.children_dom"
              :key="index"
              :name="v.type"
              :label="item"
              :value="item"
            ></el-checkbox>
          </el-checkbox-group>
        </el-tab-pane>
      </el-tabs>
      <div class="checkboxList">
        <el-form-item label="已选择：">
          <el-checkbox
            v-for="(item, index) in checkList"
            :key="index"
            :label="item"
            checked
            @change="deleteBox(item)"
          ></el-checkbox>
        </el-form-item>
      </div>
      <!-- 详细说明 -->
      <el-form-item style="display:block;margin-top:30px" label="详细说明">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 10 }"
          placeholder="请输入内容"
          v-model="data_info.description"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sendSubmit">立即创建</el-button>
        <el-button type="danger" @click="cancle">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addDataList } from "@/utils/api/apis";
export default {
  data() {
    return {
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

      model: "comUser",
      control: "comUserRoleAuth",
    };
  },
  methods: {
    deleteBox(content) {
      var index = this.checkList.indexOf(content);
      this.checkList.splice(index, 1);
    },

    // 创建角色
    sendSubmit() {
      console.log(this.data_info);
      addDataList(
        this.model,
        this.control,
        1,
        this.data_info,
        this,
        "role_list"
      );
    },

    // 取消创建
    cancle() {
      this.$message.info("操作取消");
      this.$router.push("role_list");
    },
  },
};
</script>

<style lang="scss">
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
      padding: 20px;
      border: 1px solid #dcdfe6;
      margin-left: 20px;
      display: inline-block;
      height: 100px;
    }
  }
}
</style>
