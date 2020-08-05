<template>
  <!-- 个人中心 -->
  <div id="personal_center" class="shadow_container">
    <div class="pageTitle">个人中心</div>
    <el-form label-width="100px">
      <el-form-item label="用户ID">
        <span>{{data_info.userId}}</span>
      </el-form-item>
      <el-form-item label="用户名">
        <span>{{data_info.userName}}</span>
      </el-form-item>
      <el-form-item label="商户名称">
        <span>{{data_info.merchantname}}</span>
      </el-form-item>
      <el-form-item label="角色组">
        <span v-if="data_info.roleGroupId==1">财务组</span>
        <span v-else-if="data_info.roleGroupId==2">开发组</span>
      </el-form-item>
      <el-form-item label="安全邮箱">
        <span v-show="mode">{{data_info.email}}</span>
        <el-input v-model="data_info.email" v-show="!mode"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <span>{{data_info.isEnable-0?'启用':'禁用'}}</span>
      </el-form-item>
      <el-form-item label="权限等级">
        <span>{{data_info.isAdministrator-0?'超级管理员':'普通管理员'}}</span>
      </el-form-item>
      <el-form-item label="真实姓名">
        <span v-show="mode">{{data_info.realName}}</span>
        <el-input v-model="data_info.realName" v-show="!mode"></el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <span v-show="mode">{{data_info.idCard}}</span>
        <el-input v-model="data_info.idCard" v-show="!mode"></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <span>{{data_info.creationTime}}</span>
      </el-form-item>

      <el-form-item label="用户头像">
        <el-avatar :src="data_info.headIco" :size="90"></el-avatar>
      </el-form-item>
      <el-form-item label="上传头像" v-show="!mode">
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

      <!-- 按钮组 -->
      <el-form-item>
        <el-button type="primary" @click="switchModel(0)" v-show="mode">编辑</el-button>
        <el-button type="primary" @click="sendSubmit" v-show="!mode">保存</el-button>
        <el-button type="danger" @click="switchModel(1)" v-show="!mode">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getDetailsInfo, updateDataList, upLoadFiles } from "@/utils/api/api";
import { creatFormData, spliceUrl } from "@/utils/common";
export default {
  inject: ["reload"],
  mounted() {
    var userId = sessionStorage.getItem("userId"),
      merchantname = sessionStorage.getItem("merchantname");
    this.get_form = { userId, merchantname };
    getDetailsInfo(
      this.$vision.merchant,
      "Userinfo",
      this.get_form,
      "data_info",
      this,
      "headIco"
    );
  },

  data() {
    return {
      get_form: {},
      data_info: {},
      imageUrl: "", // 图片预览
      mode: 1, // 0 编辑模式, 1 查阅模式
      backup_info: {}, // 备份数据对象，备份data_info
      file_list: [],
    };
  },

  methods: {
    switchModel(mode) {
      this.mode = mode;
      if (!mode) {
        this.backup_info = { ...this.data_info };
      } else {
        this.data_info = { ...this.backup_info };
      }
    },

    // 提交修改
    sendSubmit() {
      this.mode = 1;
      if (this.file_list.length) {
        upLoadFiles("用户头像", creatFormData(this.file_list)).then((res) => {
          this.data_info.headIco = res.list[0].resId;
          var headImg = spliceUrl(res.list, "resId")[0].resId;
          sessionStorage.setItem("headImg", headImg);
          updateDataList(
            this.$vision.merchant,
            "UserInfo",
            this.data_info,
            this
          );
        });
      } else {
        delete this.data_info.headIco;
        updateDataList(
          this.$vision.merchant,
          "UserInfo",
          this.data_info,
          this,
          null,
          getDetailsInfo(
            this.$vision.merchant,
            "Userinfo",
            this.get_form,
            "data_info",
            this,
            "headIco"
          )
        );
      }
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
.el-form {
  .el-form-item {
    .el-form-item__label {
      font-size: 15px;
      font-weight: bold;
      margin-left: 20px;
      margin-right: 30px;
    }
    .el-form-item__content {
      .el-input {
        width: 200px;
      }
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
</style>