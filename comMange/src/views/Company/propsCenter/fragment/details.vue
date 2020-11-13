<template>
  <div id="event_details" class="shadow_container">
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
      });
    }
  },

  data() {
    return {
      find_form: {},
      data_info: {},
      img_list: [], // 待上传图片列表

      imageUrl: "",
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

    // 取消回到列表页
    cancel() {
      this.$router.push("props_fragmentList");
    },
  },
};
</script>

<style lang='scss'>
#event_details {
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
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
  }
}
</style>