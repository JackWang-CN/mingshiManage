<template>
  <div id="login" v-loading="loading" element-loading-text="登录中,请稍候...">
    <div class="container">
      <!-- 标题 -->
      <div class="title">
        <img src="../assets/images/icon/logo1.png" alt />
        名视AR资源管理系统
      </div>
      <!-- 登录框 -->
      <div class="center">
        <el-form
          class="loginForm"
          :model="loginForm"
          :rules="loginRules"
          ref="loginForm"
        >
          <h2>登录</h2>
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input
              placeholder="请输入您的邮箱/电话/登录名"
              v-model="loginForm.username"
            >
              <i slot="prefix" class="el-input__icon iconfont icon-user1"></i>
            </el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              placeholder="请输入您的密码"
              v-model="loginForm.password"
              show-password
            >
              <i slot="prefix" class="el-input__icon iconfont icon-lock"></i>
            </el-input>
          </el-form-item>
          <!-- 验证 -->
          <div class="verify_bar">
            <Verify @slideSuc="slideVerify"></Verify>
          </div>
          <!-- 忘记密码 -->
          <div class="forgetPwd">
            <a href>忘记密码？</a>
          </div>
          <!-- 登录按钮 -->
          <el-button class="btn_login" @click="submitLogin('loginForm')"
            >立即登录</el-button
          >
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Verify from "@/components/verify.vue";
import { getData } from "@/utils/api/apis";
import { store } from "@/utils/store";
import { spliceImg } from "@/utils/common";
export default {
  created() {
    document.addEventListener("keydown", (e) => {
      var { keyCode } = e;
      if (keyCode == 13) {
        console.log("登录");
      }
    });
  },

  components: { Verify },
  data() {
    return {
      bodyHeight: 0, // 屏幕高度

      // 输入框
      loginForm: {
        username: "",
        password: "",
      },
      // 验证规则
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 12,
            message: "长度在 2 到 12 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
      },

      model: "signIn",
      control: "signIn",
      vision: 1,
      // 滑动验证成功判断
      confirmSuccess: false,
      // 加载
      loading: false,
    };
  },
  methods: {
    // 登录
    submitLogin(form) {
      this.$refs[form].validate((valid) => {
        // 表单验证
        if (valid) {
          // 滑动验证
          if (this.confirmSuccess) {
            /* 【发送请求预留位置】 */
            this.loading = true;
            var loginJson = {
              account: this.loginForm.username,
              passWord: this.loginForm.password,
            };
            getData(
              this.model,
              this.control,
              this.vision,
              loginJson,
              "pwd"
            ).then((res) => {
              var res = res.resultObject;
              if (res) {
                console.log(res);
                var token = res.accessToken;
                var headImg = res.user.headIco;
                var userName = res.user.name;
                var userID = res.user.userID;
                var nodeList = JSON.stringify(res.roleAuthList);
                sessionStorage.setItem("token", token);
                sessionStorage.setItem("userName", userName);
                sessionStorage.setItem("headImg", headImg);
                sessionStorage.setItem("id", userID);
                sessionStorage.setItem("nodeList", nodeList);
                this.$message.success("登录成功");
                this.$router.replace("home");
              } else {
                this.$message.error("账号或密码错误，登录失败");
              }
            });
          } else {
            this.$message.error("请进行验证！");
          }
        } else {
          this.$message.error("登录失败，请检查用户名及密码");
          return false;
        }
      });
    },

    //滑动事件
    slideVerify(value) {
      this.confirmSuccess = value;
    },
  },
};
</script>

<style lang="scss">
#login {
  background: url("../assets/images/bg/background_1.png") no-repeat;
  height: 100%;
  min-height: 900px;
  background-size: 100% 100%;
  .container {
    min-width: 1300px;
    margin: 0 auto;
    height: 100%;
    .title {
      width: 1200px;
      margin: 0 auto;
      padding-top: 40px;
      box-sizing: border-box;
      font-size: 44px;
      font-weight: 500;
      color: #0d51d6;
      img {
        vertical-align: middle;
        margin-right: 20px;
      }
    }
    .center {
      width: 1200px;
      background: url("../assets/images/bg/background_2.png") no-repeat;
      background-size: 100% 100%;
      border-radius: 20px;
      margin: 0 auto;
      margin-top: 4rem;
      padding: 7rem 0;
      box-shadow: 0px 0px 15px #006b6e;
      // 表单
      .loginForm {
        margin: 0 8rem 0 4rem;
        width: 38%;
        h2 {
          font-size: 1.8rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #d2d2d2;
          margin-bottom: 3rem;
        }
        // 输入框组件
        .el-form-item {
          margin-bottom: 40px;
          .el-input {
            height: 50px;

            // 图标
            span.el-input__prefix {
              left: 10px;
              margin-right: 10px;
              top: 3px;
            }

            // 输入框
            input {
              padding-left: 40px;
              height: 50px;
              border-radius: 0;
              font-size: 1rem;
            }
          }
        }
        // 验证条
        .verify_bar {
          margin-bottom: 40px;
        }
        // 忘记密码
        .forgetPwd {
          margin-bottom: 20px;
          text-align: right;
          a {
            color: #20a4f5;
            text-decoration: none;
          }
        }
        // 登录按钮
        .btn_login {
          font-family: "微软雅黑";
          width: 100%;
          height: 50px;
          font-size: 1.2rem;
          border: none;
          border-radius: 0;
          background-color: #38dde3;
          color: #fff;
          outline: none;
          cursor: pointer;
          &:hover {
            background-color: #00d9e0;
          }
          &:active {
            background-color: #019ba0;
          }
        }
      }
    }
  }
}
</style>
