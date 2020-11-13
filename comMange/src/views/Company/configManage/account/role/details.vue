<!-- 新增角色 -->
<template>
  <div id="author_roleAdd" class="shadow_container">
    <div class="pageTitle">新增角色</div>
    <!-- 查询表单 -->
    <el-form ref="data_info" :model="data_info" label-width="80px">
      <div>
        <el-form-item label="角色名称">
          <el-input
            v-model="data_info.name"
            placeholder="请输入角色名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色状态">
          <el-select v-model="data_info.enable" placeholder="请选择角色状态">
            <el-option label="禁用" :value="0"></el-option>
            <el-option label="启用" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <!-- 权限配置 -->
      <div style="margin-bottom: 20px">权限配置</div>
      <!-- <el-tabs tab-position="left" style="height: auto">
        <el-tab-pane
          v-for="(v, index) in author_list"
          :key="v.authNodeID"
          :label="v.name"
        >
          <el-checkbox
            @change="selectChange(index)"
            v-for="item in v.childNodeList"
            :key="item.authNodeID"
            name="node"
            :label="item.name"
            v-model="item.checked"
          ></el-checkbox>
        </el-tab-pane>
      </el-tabs> -->
      <!-- <div class="checkboxList">
        <el-form-item label="已选择：">
          <el-tag
            v-for="(item, index) in checkList"
            :key="index"
            type="primary"
            >{{ item.name }}</el-tag
          >
        </el-form-item>
      </div> -->
      <el-tree
        :props="props"
        node-key="authNodeID"
        :default-checked-keys="default_list"
        :data="author_list"
        show-checkbox
        @check="selectChange"
      >
      </el-tree>

      <el-form-item>
        <el-button type="primary" @click="sendSubmit">立即创建</el-button>
        <el-button type="danger" @click="cancle">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addDataList, getDetails, updateDetails } from "@/utils/api/apis";
import tree from "@/assets/json/tree.json";
export default {
  async created() {
    this.author_list = [...tree];
    var roleID = this.$route.query.id;
    if (roleID) {
      this.operate = 1;
      await getDetails(this.model, this.control, 1, { roleID }).then((res) => {
        this.data_info = res.resultObject;
        this.default_list = res.resultObject.roleAuthNodeIDList;
      });
    } else {
      this.operate = 0;
    }
  },

  data() {
    return {
      data_info: {},

      author_list: [],
      default_list: [],

      props: {
        label: "name",
        children: "childNodeList",
      },
      select_list: [],
      operate: 0,
      model: "comUser",
      control: "comUserRole",
    };
  },
  methods: {
    // 权限勾选状态改变
    selectChange(data, obj, node) {
      this.select_list = [...obj.checkedNodes];
    },

    // 创建角色
    sendSubmit() {
      var list = [];
      if (this.select_list.length > 0) {
        this.select_list.forEach((item) => {
          list.push(item.authNodeID);
        });
      } else {
        list = this.default_list;
      }
      this.data_info.roleAuthNodeIDList = list;
      console.log(this.data_info.roleAuthNodeIDList);
      return;
      switch (this.operate) {
        // 新增操作
        case 0:
          addDataList(
            this.model,
            this.control,
            1,
            this.data_info,
            this,
            "role_list"
          );
          break;

        // 修改操作
        case 1:
          updateDetails(
            this.model,
            this.control,
            1,
            this.data_info,
            this,
            "role_list"
          );
          break;
      }
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
