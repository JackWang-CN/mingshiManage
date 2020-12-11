<template>
  <div id="ar_upload" class="shadow_container">
    <div class="pageTitle">AR资源上传</div>

    <!-- 表单 -->
    <el-form label-width="100px">
      <!-- 文件上传 -->
      <el-form-item label="安卓模型">
        <el-upload
          class="upload-demo"
          action="#"
          :on-change="androidAr"
          :auto-upload="false"
          :file-list="file_android"
        >
          <el-button size="small" type="primary">添加模型</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item label="IOS模型">
        <el-upload
          class="upload-demo"
          action="#"
          :on-change="iosAr"
          :auto-upload="false"
          :file-list="file_ios"
        >
          <el-button size="small" type="primary">添加模型</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item label="模型主图">
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :on-change="mainChange"
          :auto-upload="false"
        >
          <img v-if="main_img" :src="main_img" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="模型子图">
        <el-upload
          class="upload-demo"
          action="#"
          :auto-upload="false"
          :on-remove="removeFile"
          :on-change="childrenChange"
          list-type="picture"
        >
          <el-button size="small" type="primary">添加子图</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item label="所属分类">
        <el-select v-model="data_info.TypeID">
          <el-option
            v-for="type in type_list"
            :key="type.typeID"
            :label="type.name"
            :value="type.typeID"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="模型名称">
        <el-input v-model="data_info.ShowResourceName" clearable></el-input>
      </el-form-item>

      <el-form-item label="备注信息">
        <el-input
          v-model="data_info.Remarks"
          type="textarea"
          :rows="3"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="sendSubmit">确认上传</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { uploadFiles, getFileList, getFile } from "@/utils/api/apis";
import { createFormData, createGet } from "@/utils/common";
export default {
  mounted() {
    // 请求ar资源类型列表
    getFileList("u3dTypeList", 1, createGet(1, 999), this, "type_list");
  },

  data() {
    return {
      data_info: {},
      type_list: [],
      file_android: [], // 安卓ar文件对象
      file_ios: [], // 苹果ar文件对象
      main_list: [], // 主缩略图文件对象
      main_img: "",
      children_list: [], // 子多图文件对象
    };
  },

  methods: {
    // 获取文件列表
    getFileList(file, list) {
      this.file_list = [...list];
    },

    // 发送请求
    async sendSubmit() {
      var { ShowResourceName, Remarks, TypeID } = this.data_info;

      // 验证文件名称是否重复
      var res = await getFile("hasU3DResNameV1", 1, {
        resourceName: ShowResourceName,
      });
      if (res.code == "000000") {
        this.$message.error("模型名称重复");
        return;
      }

      var flag = true;

      // 1.上传AR资源
      if (this.file_android.length > 0) {
        var arRes = await uploadFiles(
          3,
          1,
          this.file_android,
          TypeID,
          ShowResourceName,
          Remarks
        );
        if (arRes.code != "000000") flag = false;
      } else {
        this.$message.error("请先添加模型文件");
        return;
      }

      var { resID } = arRes.resultObject[0];
      // 2.上传主图、子图
      if (this.main_list.length > 0) {
        var mainRes = await uploadFiles(4, 1, this.main_list, true, resID);
        if (mainRes.code !== "000000") flag = false;
      }
      if (this.children_list.length > 0) {
        var childRes = await uploadFiles(
          4,
          1,
          this.children_list,
          false,
          resID
        );
        if (childRes.code !== "000000") flag = false;
      }

      // 3.根据标杆做提示
      if (flag) {
        this.$message.success("上传成功！");
        this.$router.push("ar_list");
      }
    },

    // 取消
    cancel() {
      this.$router.push("ar_list");
    },

    // 文件删除
    removeFile(file, list) {
      this.file_list = [...list];
    },

    // android AR文件状态改变
    androidAr(file, list) {
      var { name } = file;
      console.log(file);
      var index = name.indexOf(".");
      var suffix = name.substring(index + 1);
      if (suffix != "ab") {
        this.$message.warning("请上传有效的ab资源包");
        this.file_android = [];
        return;
      }
      var name = name.substring(0, index);
      this.data_info.ShowResourceName = name;
      var obj = { ...this.data_info };
      this.data_info = { ...obj };
      this.file_android = [file];
    },
    // 苹果 AR文件状态改变
    iosAr(file, list) {
      var { name } = file;
      console.log(file);
      var index = name.indexOf(".");
      var suffix = name.substring(index + 1);
      if (suffix != "ab") {
        this.$message.warning("请上传有效的ab资源包");
        this.file_ios = [];
        return;
      }
      var name = name.substring(0, index);
      this.data_info.ShowResourceName = name;
      var obj = { ...this.data_info };
      this.data_info = { ...obj };
      this.file_ios = [file];
    },

    // 主缩略图状态改变
    mainChange(file, list) {
      this.main_img = URL.createObjectURL(file.raw);
      this.main_list = [file];
    },
    // 子图文件状态改变
    childrenChange(file, list) {
      this.children_list = [...list];
    },
  },
};
</script>

<style lang='scss'>
#ar_upload {
  form {
    .el-form-item {
      width: 400px;
      .el-input,
      .el-textarea {
        width: 300px;
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
}
</style>