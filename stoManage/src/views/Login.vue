<template>
  <div id="login" v-loading="loading" element-loading-text="登录中,请稍候...">
    <div class="top">
      <img src="../assets/images/icon/logo1.png" alt />
      名视商户营销平台
    </div>
    <div class="center">
      <el-form
        class="loginForm"
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
      >
        <h2>登录</h2>
        <!-- 商户名 -->
        <el-form-item prop="merchantName">
          <el-input placeholder="请输入商户名" v-model="loginForm.merchantName">
            <i slot="prefix" class="el-input__icon iconfont el-icon-s-shop"></i>
          </el-input>
        </el-form-item>
        <!-- 账号 -->
        <el-form-item prop="account">
          <el-input placeholder="请输入您的账号" v-model="loginForm.account">
            <i slot="prefix" class="el-input__icon iconfont icon-user1"></i>
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="passWord">
          <el-input
            placeholder="请输入您的密码"
            v-model="loginForm.passWord"
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
</template>

<script>
import Verify from "@/components/verify.vue";
import { getData } from "@/utils/api/apis";
import { spliceImg, hintMessage } from "@/utils/common";
export default {
  components: { Verify },
  data() {
    return {
      // 输入框
      loginForm: {
        merchantName: "",
        account: "",
        passWord: "",
      },
      // 验证规则
      rules: {
        merchantName: [
          { required: true, message: "请输入商家名称", trigger: "blur" },
        ],
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
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
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
      // 滑动验证成功判断
      confirmSuccess: false,
      // 加载
      loading: false,
      model: "merLogin",
      control: "login",
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
            this.loading = true;
            var timer = setTimeout(() => {
              this.loading = false;
              this.$message.error("登录超时，请重试");
            }, 5000);
            getData(
              this.model,
              this.control,
              1,
              this.loginForm,
              "account"
            ).then((res) => {
              switch (res.code) {
                case "000000":
                  this.loading = false;
                  clearTimeout(timer);
                  var data = res.resultObject;
                  var token = data.accessToken,
                    headImg = spliceImg([data.user], "headIco")[0].headIco,
                    userName = data.user.name,
                    userId = data.user.userId,
                    merchantname = this.loginForm.merchantname;
                  sessionStorage.setItem("token", token);
                  sessionStorage.setItem("headImg", headImg);
                  sessionStorage.setItem("userName", userName);
                  sessionStorage.setItem("userId", userId);
                  sessionStorage.setItem("merchantname", merchantname);
                  this.$message.success("登录成功");
                  this.$router.replace("home");
                  break;
              }
              hintMessage(this, res, "登录成功！");
              this.loading = false;
              clearTimeout(timer);
            });
          } else {
            this.$message.error("请进行验证！");
          }
        } else {
          this.$message.error("请检查用户名及密码");
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
  height: 100%;
  min-height: 900px;
  background: url("../assets/images/bg/background_1.png") no-repeat;
  background-size: 100% 100%;
  .top {
    width: 80%;
    margin-left: 10%;
    box-sizing: border-box;
    font-size: 2.5rem;
    font-weight: 500;
    color: #0d51d6;
    padding: 3rem;
    img {
      vertical-align: middle;
      margin-right: 1rem;
    }
  }
  .center {
    width: 80%;
    background: url("../assets/images/bg/background_2.png") no-repeat;
    background-size: 100% 100%;
    border-radius: 20px;
    margin: 0 auto;
    padding: 5rem 0;
    box-sizing: border-box;
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
</style>
