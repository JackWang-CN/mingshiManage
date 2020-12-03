<template>
  <div id="personal" class="shadow_container">
    <div class="pageTitle">个人中心</div>

    <!-- 表单 -->
    <el-form label-width="80px">
      <el-form-item label="账号">{{ data_info.account }}</el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="data_info.name"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :on-change="imgChange"
        >
          <img v-if="headImg" :src="headImg" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="data_info.email"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名">
        <el-input v-model="data_info.trueName"></el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="data_info.idCard"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sendSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const fileUrl = window.baseUrl.normal_file;
import { getDetails, updateData, uploadFiles } from "@/utils/api/apis";
import { createGet, hintMessage } from "@/utils/common";
export default {
  mounted() {
    this.userID = sessionStorage.getItem("id");
    getDetails(this.model, this.control, 1, { userID: this.userID }).then(
      (res) => {
        this.data_info = res.resultObject;
        this.headImg = fileUrl + res.resultObject.headIco;
      }
    );
  },

  data() {
    return {
      data_info: {
        userID: "",
        name: "",
        account: "",
        password: "",
        headIco: "",
        roleGroupID: "",
        email: "",
        isEnable: "",
        isAdmin: "",
        trueName: "",
        idCard: "",
      },

      img_list: [],
      headImg: "",

      model: "comUser",
      control: "comUserInfo",
    };
  },

  methods: {
    // 发送提交
    async sendSubmit() {
      // 是否上传图片
      if (this.img_list.length > 0) {
        var res = await uploadFiles(1, 1, this.img_list);
        this.data_info.headIco = res.resultObject[0].resID;
      }

      // 执行修改
      updateData(this.model, this.control, 1, this.data_info).then((res) => {
        hintMessage(this, res);
        getDetails(this.model, this.control, 1, { userID: this.userID }).then(
          (res) => {
            this.data_info = res.resultObject;
            this.headImg = fileUrl + res.resultObject.headIco;

            sessionStorage.setItem("headImg", this.data_info.headIco);
            sessionStorage.setItem("userName", this.data_info.name);
          }
        );
      });
    },

    // 图片状态改变
    imgChange(file) {
      this.headImg = URL.createObjectURL(file.raw);
      this.img_list = [file];
    },
  },
};
</script>

<style lang='scss'>
// 头像上传
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  &:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
}
</style>