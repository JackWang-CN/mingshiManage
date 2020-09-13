<template>
  <div id="ar_upload" class="shadow_container">
    <div class="pageTitle">AR资源上传</div>

    <!-- 表单 -->
    <el-form label-width="100px">
      <!-- 文件上传 -->
      <el-form-item label="文件上传">
        <el-upload class="upload-demo" action="#" :on-change="getFileList" :auto-upload="false">
          <el-button size="small" type="primary">选择文件</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item label="模型名称">
        <el-input v-model="data_info.ShowResourceName" clearable></el-input>
      </el-form-item>

      <el-form-item label="备注信息">
        <el-input v-model="data_info.Remarks" type="textarea" :rows="3"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="sendSubmit">确认上传</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { uploadFiles } from "@/utils/api/apis";
import { createFormData } from "@/utils/common";
export default {
  mounted() {},

  data() {
    return {
      data_info: {},
      file_list: [],
    };
  },

  methods: {
    // 获取文件列表
    getFileList(file, list) {
      this.file_list = [...list];
    },

    // 发送请求
    sendSubmit() {
      var { ShowResourceName, Remarks } = this.data_info;
      uploadFiles(3, 1, this.file_list, ShowResourceName, Remarks).then(
        (res) => {
          switch (res.code) {
            case "000000":
              this.$message.success("上传成功！");
              this.$router.push("ar_list");
              break;
          }
        }
      );
    },

    // 取消
    cancel() {
      this.$router.push("ar_list");
    },
  },
};
</script>

<style lang='scss'>
#ar_upload {
  form {
    .el-input,
    .el-textarea {
      width: 300px;
    }
  }
}
</style>