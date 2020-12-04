<template>
  <div id="login">
    <div class="wrap">
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="loginName">
          <el-input
            v-model="loginForm.loginName"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="loginPwd">
          <el-input
            v-model="loginForm.loginPwd"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item class="last_el">
          <el-button type="primary" @click="submitForm('loginForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { sendLogin } from "@/utils/api/api";
export default {
  mounted() {},
  data() {
    return {
      loginForm: {
        loginName: "",
        loginPwd: "",
      },
      rules: {
        account: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 12,
            message: "长度在 2 到 12 个字符",
            trigger: "blur",
          },
        ],
        passWord: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 32,
            message: "长度在 6 到 32 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var data = { ...this.loginForm };
          sendLogin(data)
            .then((res) => {
              res = res.data.resultObject;
              // 保存返回的token
              var token = res.accessToken,
                username = res.user.loginName,
                userId = res.user.userId;
              sessionStorage.setItem("token", token);
              sessionStorage.setItem("username", username);
              sessionStorage.setItem("userId", userId);
              this.$message({
                message: "登录成功！",
                type: "success",
              });
              this.$router.push("home");
            })
            .catch((err) => {});
        }
      });
    },
  },
};
</script>

<style lang="scss">
#login {
  background: url("../assets/images/login_bg.jpg");
  background-size: cover;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .wrap {
    width: 300px;
    padding: 2em 4em;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 1em;
  }
  .last_el {
    margin: 0;
    button {
      width: 100%;
    }
  }
}
</style>
