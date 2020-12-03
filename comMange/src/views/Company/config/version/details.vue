<template>
  <div id="version_details" class="shadow_container">
    <!-- 版本详情 -->
    <div class="pageTitle">版本详情</div>

    <!-- 表单 -->
    <el-form label-width="80px">
      <el-form-item label="大版本号">
        <el-input v-model="data_info.versionNum"></el-input>
      </el-form-item>
      <el-form-item label="版本名称">
        <el-input v-model="data_info.versionName"></el-input>
      </el-form-item>
      <el-form-item label="更新设备">
        <el-select v-model="data_info.device">
          <el-option label="Android" value="android"></el-option>
          <el-option label="IOS" value="ios"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="更新标题">
        <el-input v-model="data_info.title"></el-input>
      </el-form-item>

      <el-form-item label="缩略图">
        <el-upload
          class="avatar-uploader"
          action="#"
          :on-change="imgChange"
          :auto-upload="false"
          :show-file-list="false"
        >
          <img v-if="appImg" :src="appImg" class="preImg" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="安装包" v-if="operate == 0">
        <el-upload
          class="upload-demo"
          action="#"
          :on-change="packageChange"
          :auto-upload="false"
        >
          <el-button size="small" type="primary">添加文件</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item label="更新内容">
        <el-input
          v-model="data_info.content"
          type="textarea"
          :rows="3"
        ></el-input>
      </el-form-item>
      <el-form-item label="受众类型">
        <el-select v-model="data_info.audience">
          <el-option label="白嫖用户" :value="2"></el-option>
          <el-option label="付费用户" :value="3"></el-option>
          <el-option label="全部商户" :value="100"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="强制更新">
        <el-select v-model="data_info.isForce">
          <el-option label="是" :value="0"></el-option>
          <el-option label="否" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sendSubmit">保存</el-button>
        <el-button type="danger" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
var fileUrl = window.baseUrl.normal_file;
import {
  getDetails,
  addDataList,
  updateDetails,
  uploadFiles,
} from "@/utils/api/apis";
export default {
  mounted() {
    var { id } = this.$route.query;
    if (id) {
      this.operate = 1;
      this.data_info.versionID = id;
      getDetails(this.model, this.control, 1, { versionID: id }).then((res) => {
        this.data_info = res.resultObject;
        this.appImg = fileUrl + res.resultObject.appLogo;
      });
    }
  },

  data() {
    return {
      data_info: {},
      package_file: [],
      img_file: [],
      operate: 0, // 0-新增 1-修改
      appImg: "",

      model: "config",
      control: "versionConfig",
    };
  },

  methods: {
    // 提交修改
    async sendSubmit() {
      // 是否上传图片
      if (this.img_file.length > 0) {
        var res = await uploadFiles(1, 1, this.img_file);
        this.data_info.appLogo = res.resultObject[0].resID;
      }

      // 是否上传资源文件
      if (this.package_file.length > 0) {
        var res = await uploadFiles(1, 1, this.package_file);
        this.data_info.resID = res.resultObject[0].resID;
      }

      this.data_info.versionNum = this.data_info.versionNum - 0;
      var form = { ...this.data_info };
      if (this.operate) {
        updateDetails(this.model, this.control, 1, form, this, "version_list");
      } else {
        addDataList(this.model, this.control, 1, form, this, "version_list");
      }
    },

    // 缩略图文件
    imgChange(file) {
      this.appImg = URL.createObjectURL(file.raw);
      this.img_file = [file];
    },

    // 文件状态改变
    packageChange(file) {
      this.package_file = [file];
    },

    // 返回上一页
    cancel() {
      this.$router.push("version_list");
    },
  },
};
</script>

<style lang='scss'>
#version_details {
  form {
    .el-input,
    .el-textarea {
      width: 300px;
    }
  }

  // 上传
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
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
  .preImg {
    width: 150px;
    height: 150px;
    display: block;
  }
}
</style>