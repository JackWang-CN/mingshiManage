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

      <!-- <el-form-item label="资源类型">
        <el-select v-model="data_info.type">
          <el-option label="房屋" value="0"></el-option>
          <el-option label="宠物" value="1"></el-option>
          <el-option label="室内道具" value="2"></el-option>
          <el-option label="活动道具" value="3"></el-option>
        </el-select>
      </el-form-item>-->

      <el-form-item label="目录别名">
        <el-input v-model="data_info.hierarchy" clearable></el-input>
        <div class="el-upload__tip">例：/Models/House/Reveal</div>
      </el-form-item>

      <el-form-item label="备注信息">
        <el-input v-model="data_info.remarks" type="textarea" :rows="3"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="sendSubmit">确认上传</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { uploadArFiles } from "@/utils/api/api";
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
      var { hierarchy, remarks } = this.data_info;
      var formData = createFormData(this.file_list);
      uploadArFiles(hierarchy, remarks, formData).then((res) => {
        this.$message.success("上传成功！");
        this.$router.push("ar_list");
      });
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