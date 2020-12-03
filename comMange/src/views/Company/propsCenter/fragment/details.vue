<template>
  <div id="fragment_details" class="shadow_container">
    <div class="pageTitle">碎片详情</div>
    <el-form label-width="100px">
      <el-form-item label="碎片名称">
        <el-input v-model="data_info.name"></el-input>
      </el-form-item>

      <el-form-item label="碎片图片">
        <el-upload
          :auto-upload="false"
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :on-change="imgChange"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="图片(未集齐)">
        <el-upload
          :auto-upload="false"
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :on-change="imgNoFullChange"
        >
          <img v-if="imageUrl_noFull" :src="imageUrl_noFull" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="碎片描述">
        <el-input
          type="textarea"
          :rows="5"
          v-model="data_info.describe"
        ></el-input>
      </el-form-item>

      <el-form-item label="到期时间">
        <el-date-picker
          v-model="data_info.expireTime"
          type="datetime"
          placeholder="选择到期时间"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="sendSubmit">保存</el-button>
        <el-button type="info" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  getDetails,
  addDataList,
  updateDetails,
  uploadFiles,
} from "@/utils/api/apis";
import { createGet } from "@/utils/common";
export default {
  mounted() {
    var { id } = this.$route.query;
    if (id) {
      this.operate = "1";
      getDetails(this.model, this.control, 1, { chipID: id }).then((res) => {
        this.data_info = res.resultObject;
        this.imageUrl = window.baseUrl.ar_2d + res.resultObject.imgID;
        this.imageUrl_noFull =
          window.baseUrl.ar_2d + res.resultObject.nonFullImgID;
      });
    }
  },

  data() {
    return {
      find_form: {},
      data_info: {},
      img_list: [], // 待上传图片列表
      imgNoFull_list: [], // 待上传图片列表

      imageUrl: "",
      imageUrl_noFull: "",
      operate: "0", // 0-新增 1-修改
      model: "propChip",
      control: "propChip",
    };
  },

  methods: {
    // 点击提交按钮
    async sendSubmit() {
      switch (this.operate) {
        // 新增
        case "0":
          // 是否上传文件
          if (this.img_list.length > 0) {
            var res = await uploadFiles(4, 1, this.img_list, false, "道具碎片");
            this.data_info.imgID = res.resultObject[0].resID;
          } else {
            this.$message.error("请添加碎片缩略图");
            return;
          }
          // 是否上传文件
          if (this.imgNoFull_list.length > 0) {
            var res = await uploadFiles(
              4,
              1,
              this.imgNoFull_list,
              false,
              "道具碎片(未集齐)"
            );
            this.data_info.nonFullImgID = res.resultObject[0].resID;
          }
          // 新增数据
          addDataList(
            this.model,
            this.control,
            1,
            this.data_info,
            this,
            "props_fragmentList"
          );
          break;
        // 修改
        case "1":
          // 是否上传文件
          if (this.img_list.length > 0) {
            var res = await uploadFiles(4, 1, this.img_list, false, "道具碎片");
            this.data_info.imgID = res.resultObject[0].resID;
          }
          // 是否上传文件
          if (this.imgNoFull_list.length > 0) {
            var res = await uploadFiles(
              4,
              1,
              this.imgNoFull_list,
              false,
              "道具碎片(未集齐)"
            );
            this.data_info.nonFullImgID = res.resultObject[0].resID;
          }
          // 修改数据
          updateDetails(
            this.model,
            this.control,
            1,
            this.data_info,
            this,
            "props_fragmentList"
          );
          break;
      }
    },

    // 图片状态改变
    imgChange(file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.img_list = [file];
    },
    // 图片状态改变
    imgNoFullChange(file) {
      this.imageUrl_noFull = URL.createObjectURL(file.raw);
      this.imgNoFull_list = [file];
    },

    // 取消回到列表页
    cancel() {
      this.$router.push("props_fragmentList");
    },
  },
};
</script>

<style lang='scss'>
#fragment_details {
  form {
    .el-form-item__content {
      width: 300px;
      .el-input,
      .el-input-number,
      .el-select,
      .el-textarea {
        width: 100%;
      }
    }

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
  }
}
</style>