<template>
  <!-- 用户详情 -->
  <div id="userInfo_details" class="shadow_container">
    <div class="pageTitle">用户详情</div>

    <div class="wrap">
      <!-- 表单 -->
      <el-form label-width="100px">
        <el-form-item label="用户ID">
          <span>{{data_info.userId}}</span>
        </el-form-item>

        <el-form-item label="用户昵称">
          <el-input type="text" v-model="data_info.nickname"></el-input>
        </el-form-item>

        <el-form-item label="手机号">
          <el-input type="text" v-model="data_info.mobileNum"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-select v-model="data_info.sex">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
          <el-select v-model="data_info.isDisable">
            <el-option label="启用" value="0"></el-option>
            <el-option label="禁用" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="登录密码">
          <el-input type="text" v-model="data_info.loginPwd" show-password></el-input>
        </el-form-item>

        <el-form-item label="安全密码">
          <el-input type="text" v-model="data_info.safePwd" show-password></el-input>
        </el-form-item>

        <el-form-item label="用户邮箱">
          <el-input type="text" v-model="data_info.userEmail"></el-input>
        </el-form-item>

        <el-form-item label="个性签名">
          <el-input type="textarea" v-model="data_info.perSign"></el-input>
        </el-form-item>

        <el-form-item label="创建时间">
          <span>{{data_info.creationTime}}</span>
        </el-form-item>

        <el-form-item label="真实姓名">
          <el-input type="text" v-model="data_info.name"></el-input>
        </el-form-item>

        <el-form-item label="身份证号">
          <span>{{data_info.idCard||'无'}}</span>
        </el-form-item>

        <el-form-item label="是否实名">
          <span>{{data_info.isRealNameSys?'是':'否'}}</span>
        </el-form-item>

        <el-form-item label="资金账户">
          <span>（占位）金币</span>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="sendSubmit">保存</el-button>
          <el-button type="danger" @click="cancel">返回</el-button>
        </el-form-item>
      </el-form>

      <!-- 链接 -->
      <div class="btns">
        <el-button type="primary" size="small" @click="toDetails('account_flow')">个人流水</el-button>
        <el-button type="warning" size="small" @click="toDetails('assets')">个人道具</el-button>
        <el-button type="danger" size="small" @click="toDetails('auction')">拍卖行数据</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getDetailsInfo, updateDataList } from "@/utils/api/api";
import { filteObj } from "@/utils/common";
export default {
  mounted() {
    this.userId = this.$route.query.id;
    // 首次请求数据
    getDetailsInfo(
      this.$vision.user,
      "Userinfo",
      { userId: this.userId },
      "data_info",
      this
    );
  },

  data() {
    return {
      data_info: {}, // 数据对象
      userId: "",
    };
  },

  methods: {
    // 提交保存
    sendSubmit() {
      updateDataList(
        this.$vision.user,
        "UserInfo",
        filteObj(this.data_info),
        this,
        "userdata_userList"
      );
    },

    // 取消
    cancel() {
      this.$router.push("user_list");
    },

    // 跳转到详情页
    toDetails(path) {
      this.$router.push({
        path,
        query: {
          id: this.userId,
        },
      });
    },
  },
};
</script>

<style lang='scss'>
#userInfo_details {
  .wrap {
    display: flex;
    align-items: flex-start;
    .el-form {
      margin-right: 100px;
      .el-input,
      .el-textarea {
        width: 250px;
      }
    }
  }
}
</style>
