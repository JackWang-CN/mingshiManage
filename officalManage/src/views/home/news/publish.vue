<template>
  <div class="container">
    <h1>新闻发布</h1>
    <el-form ref="form" :model="data_info" label-width="100px">
      <!-- 查询条件 -->
      <el-form-item label="新闻标题">
        <el-input
          v-model="data_info.title"
          placeholder="请输入新闻标题"
        ></el-input>
      </el-form-item>
      <el-form-item label="封面图片">
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :on-change="getFileList"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="是否置顶">
        <el-select v-model="data_info.isStick" placeholder="请选择">
          <el-option label="是" :value="1"></el-option>
          <el-option label="否" :value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="新闻正文">
        <tinymceEditor
          v-model="data_info.content"
          :params="upParams"
        ></tinymceEditor>
      </el-form-item>

      <!-- 按钮组 -->
      <el-form-item>
        <el-button type="primary" @click="submitNews">发表</el-button>
        <el-button type="danger" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import tinymceEditor from "@/components/Tinymce/tinymce";
import { addData, uploadFiles } from "@/utils/api/apis";
import { hintMessage } from "@/utils/common";

export default {
  components: {
    tinymceEditor,
  },
  data() {
    return {
      data_info: {},
      upParams: {
        remarks: "新闻中心-文章",
      },
      remarks: "新闻中心-文章",

      imageUrl: "", // 预览封面图

      model: "config",
      control: "case",
    };
  },

  methods: {
    // 提交发布
    async submitNews() {
      this.data_info.caseScene = "0";

      var file = this.img_list;
      var res = await uploadFiles(2, 1, file);
      this.data_info.mainMediaUrl = res[0].resID;

      console.log(this.data_info);
      addData(this.model, this.control, 1, this.data_info).then((res) => {
        hintMessage(this, res, "发布成功！");
        this.$router.push("news_list");
      });
    },

    // 取消
    cancel() {
      this.$message("取消操作");
      this.$router.push("news_list");
    },

    // 预览上传的图片
    previewImg(file) {
      this.show_imgUrl = file.url;
      this.show_img = true;
    },

    // 点击删除按钮-删除上传列表中的图片
    removeImg(file) {
      this.$refs.upload.uploadFiles = [];
    },

    // 点击'+'号按钮-获取文件列表
    getFileList(file, list) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.img_list = [file];
    },
  },
};
</script>

<style lang="scss">
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
</style>
