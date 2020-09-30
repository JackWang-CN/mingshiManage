<template>
  <!-- 店铺信息 -->
  <div id="merchant_info" class="shadow_container">
    <div class="pageTitle">店铺信息</div>
    <el-form label-width="100px">
      <el-form-item label="店铺名称">
        <span>{{ data_info.name }}</span>
      </el-form-item>
      <el-form-item label="店铺类型">{{ data_info.manageTypeID }}</el-form-item>
      <el-form-item label="手机号">
        <span v-show="mode">{{ data_info.tel }}</span>
        <el-input v-model="data_info.tel" v-show="!mode"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <span>{{ data_info.isEnable ? "启用" : "禁用" }}</span>
      </el-form-item>
      <el-form-item label="身份证正面">
        <span v-show="mode">{{ data_info.iDdFacePhoto }}</span>
        <el-input v-model="data_info.iDdFacePhoto" v-show="!mode"></el-input>
      </el-form-item>
      <el-form-item label="身份证反面">
        <span v-show="mode">{{ data_info.idBackPhoto }}</span>
        <el-input v-model="data_info.idBackPhoto" v-show="!mode"></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <span>{{ data_info.createTime }}</span>
      </el-form-item>
      <el-form-item label="审核状态">
        <span>{{ data_info.checkStatus }}</span>
      </el-form-item>
      <el-form-item label="审核人员">
        <span>{{ data_info.checker }}</span>
      </el-form-item>
      <el-form-item label="审核时间">
        <span>{{ data_info.checkTime }}</span>
      </el-form-item>

      <el-form-item label="商户头像">
        <el-avatar :src="data_info.headImage" :size="90"></el-avatar>
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

      <el-form-item label="商户地址">
        <span>{{ data_info.address }}</span>
      </el-form-item>

      <!-- 按钮组 -->
      <el-form-item>
        <el-button type="primary" @click="switchModel(0)" v-show="mode"
          >编辑</el-button
        >
        <el-button type="primary" @click="sendSubmit" v-show="!mode"
          >保存</el-button
        >
        <el-button type="danger" @click="switchModel(1)" v-show="!mode"
          >取消</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getDataList } from "@/utils/api/apis";
import { createGet, createFormData, spliceUrl } from "@/utils/common";
export default {
  mounted() {
    var form = createGet();
    console.log(1);
    // 请求公告列表
    getDataList("global", "merchant", 1, form, this, "data_info", "info");
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
#merchant_info {
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
}
</style>