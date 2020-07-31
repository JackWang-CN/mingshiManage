<template>
  <!-- 用户详情页 -->
  <div id="user_details" class="shadow_container">
    <div class="pageTitle">添加用户</div>
    <el-form label-width="100px">
      <el-form-item label="用户名">
        <el-input type="text" v-model="data_info.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="text" v-model="data_info.password"></el-input>
      </el-form-item>
      <el-form-item label="用户组">
        <el-select v-model="data_info.roleGroupId">
          <el-option label="财务组" value="1"></el-option>
          <el-option label="开发组" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="启用状态">
        <el-select v-model="data_info.isEnable">
          <el-option label="启用" :value="1"></el-option>
          <el-option label="禁用" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button type="danger" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { filteObj, spliceKey } from "@/utils/common";
import { getDetailsInfo, addDataList, updateDataList } from "@/utils/api/api";
export default {
  mounted() {
    var userId = this.$route.query.id;
    if (userId) {
      this.type = 1;
      var get_form = { userId };
      getDetailsInfo(
        this.$vision.merchant,
        "Userinfo",
        get_form,
        "data_info",
        this
      );
    }
  },
  data() {
    return {
      data_info: {},

      type: 0, // 0新增 1修改
    };
  },

  methods: {
    // 发布
    submit() {
      switch (this.type) {
        case 0:
          addDataList(
            this.$vision.merchant,
            "Userinfo",
            this.data_info,
            this,
            "user_list"
          );
          break;
        case 1:
          console.log(this.data_info);
          updateDataList(
            this.$vision.merchant,
            "Userinfo",
            this.data_info,
            this,
            "user_list"
          );
          break;
      }
    },

    // 取消
    cancel() {
      this.$router.push("user_list");
    },
  },
};
</script>

<style lang='scss'>
#user_details {
  form {
    .el-form-item {
      width: 20%;
    }
  }
}
</style>