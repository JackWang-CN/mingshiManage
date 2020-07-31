<template>
  <div id="case_publish" class="container">
    <h1>案例发布</h1>
    <el-form ref="form" :model="form" label-width="100px">
      <!-- 查询条件 -->
      <el-form-item label="案例标题">
        <el-input v-model="form.title" placeholder="请输入案例标题"></el-input>
      </el-form-item>
      <el-form-item label="封面图片">
        <!-- 图片上传 -->
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :on-change="getFileList"
          :limit="1"
          ref="upload"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="previewImg(file)">
                <i class="el-icon-zoom-in"></i>
              </span>
              <span class="el-upload-list__item-delete" @click="removeImg(file)">
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="案例正文">
        <tinymceEditor v-model="form.content" :params="upParams"></tinymceEditor>
      </el-form-item>

      <!-- 按钮组 -->
      <el-form-item>
        <el-button type="primary" @click="submitCase">发表</el-button>
        <el-button type="danger" @click="cancel">取消</el-button>
      </el-form-item>

      <!-- 图片预览 -->
      <el-dialog :visible.sync="show_img">
        <img width="100%" :src="show_imgUrl" alt />
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
import tinymceEditor from "@/components/Tinymce/tinymce";
import { addList, upLoadFiles } from "@/utils/api/api";

export default {
  mounted() {
    this.upParams.upLoadId = sessionStorage.getItem("userId");
  },
  components: {
    tinymceEditor
  },
  data() {
    return {
      form: {},
      upParams: {
        upLoadId: "",
        typeName: "offical_case_article",
        remarks: "产品案例-插图"
      },
      show_img: false,
      show_imgUrl: "", // 预览图地址
      fileList: [],

      upLoadId: "",
      typeName: "offical_case_article",
      remarks: "产品案例-文章"
    };
  },

  methods: {
    // 发布
    submitCase() {
      this.form.caseScene = "1";
      var file = this.fileList;
      var formData = this.creatFormData(file);

      upLoadFiles(this.upLoadId, this.typeName, this.remarks, formData).then(
        res => {
          this.form.mainMediaUrl = res.temp[0].resId;
          addList("case", this.form)
            .then(res => {
              if (res) {
                this.$message({
                  type: "success",
                  message: "发布成功！"
                });
                this.$router.push("case_list");
              }
            })
            .catch(err => {});
        }
      );
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
    getFileList(file, fileList) {
      this.fileList = [];
      for (var i = 0; i < fileList.length; i++) {
        var obj = fileList[i].raw;
        this.fileList.push(obj);
      }
    },

    // 创建一个formData对象
    creatFormData(file) {
      var formData = new window.FormData();
      file.forEach((item, index) => {
        formData.append("files" + index, item);
      });
      return formData;
    }
  }
};
</script>
