<template>
  <!-- 用户详情页 -->
  <div id="user_details" class="shadow_container">
    <div class="pageTitle">{{type?'修改信息':'添加用户'}}</div>
    <el-form label-width="100px">
      <el-form-item label="用户名">
        <el-input type="text" v-model="data_info.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          type="password"
          autocomplete="new-password"
          show-password
          v-model="data_info.password"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户组">
        <el-select v-model="data_info.roleGroupId">
          <el-option label="财务组" value="1"></el-option>
          <el-option label="开发组" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="启用状态">
        <el-select v-model="data_info.isEnable">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input type="text" v-model="data_info.email"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名">
        <el-input type="text" v-model="data_info.realName"></el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input type="text" v-model="data_info.idCard"></el-input>
      </el-form-item>
      <el-form-item label="头像预览">
        <el-avatar :size="100" :src="data_info.headIco"></el-avatar>
      </el-form-item>
      <el-form-item label="上传头像">
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="getFileList"
          :multiple="false"
          :limit="1"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button type="danger" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { filteObj, spliceKey, creatFormData } from "@/utils/common";
import {
  getDetailsInfo,
  addDataList,
  updateDataList,
  upLoadFiles,
} from "@/utils/api/api";
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
        this,
        "headIco"
      );
    }
  },
  data() {
    return {
      data_info: {},

      type: 0, // 0新增 1修改

      imageUrl: "", // 图片预览

      file_list: [], // 上传的文件列表
    };
  },

  methods: {
    // 发布
    submit() {
      switch (this.type) {
        case 0:
          if (this.file_list.length) {
            upLoadFiles("用户头像", creatFormData(this.file_list)).then(
              (res) => {
                this.data_info.headIco = res.list[0].resId;
                addDataList(
                  this.$vision.merchant,
                  "Userinfo",
                  this.data_info,
                  this,
                  "user_list"
                );
              }
            );
          } else {
            addDataList(
              this.$vision.merchant,
              "Userinfo",
              this.data_info,
              this,
              "user_list"
            );
          }

          break;
        case 1:
          if (this.file_list.length) {
            upLoadFiles("用户头像", creatFormData(this.file_list)).then(
              (res) => {
                this.data_info.headIco = res.list[0].resId;
                updateDataList(
                  this.$vision.merchant,
                  "Userinfo",
                  this.data_info,
                  this,
                  "user_list"
                );
              }
            );
          } else {
            delete this.data_info.headIco;
            updateDataList(
              this.$vision.merchant,
              "Userinfo",
              this.data_info,
              this,
              "user_list"
            );
          }
          break;
      }
    },

    // 取消
    cancel() {
      this.$router.push("user_list");
    },

    // 获取上传文件列表
    getFileList(file, list) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.file_list = list;
    },
  },
};
</script>

<style lang='scss'>
#user_details {
  form {
    .el-form-item {
      width: 20%;
      .el-input {
        width: 300px;
      }

      // 头像上传
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409eff;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 200px;
        height: 200px;
        line-height: 200px;
        text-align: center;
      }
      .avatar {
        width: 200px;
        height: 200px;
      }
    }
  }
}
</style>