<template>
  <div id="ar_upload" class="shadow_container">
    <div class="pageTitle">AR资源上传</div>

    <!-- 表单 -->
    <el-form label-width="100px">
      <!-- 文件上传 -->
      <el-form-item label="AR文件">
        <el-upload
          class="upload-demo"
          action="#"
          :on-change="arChange"
          :auto-upload="false"
        >
          <el-button size="small" type="primary">添加模型</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item label="模型主图">
        <el-upload
          class="upload-demo"
          action="#"
          :auto-upload="false"
          :on-remove="removeFile"
          :on-change="mainChange"
          list-type="picture"
        >
          <el-button size="small" type="primary">添加主图</el-button>
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
import { uploadFiles, getFileList } from "@/utils/api/apis";
import { createFormData, createGet } from "@/utils/common";
export default {
  mounted() {
    // 请求ar资源类型列表
    this.find_form = createGet(1, 999);
    getFileList("u3dTypeList", 1, this.find_form, this, "type_list");
  },

  data() {
    return {
      data_info: {},
      type_list: [],
      file_ar: [], // ar文件对象
      img_main: [], // 主缩略图文件对象
      img_children: [], // 子多图文件对象
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
      var flag = true;

      // 1.上传AR资源
      if (this.file_ar.length > 0) {
        var arRes = await uploadFiles(
          3,
          1,
          this.file_ar,
          TypeID,
          ShowResourceName,
          Remarks
        );
        if (arRes.code !== "000000") flag = false;
      } else {
        this.$message.error("请先添加模型文件");
        return;
      }

      var { resID } = arRes.resultObject[0];
      // 2.上传主图、子图
      if (this.img_main.length > 0) {
        var mainRes = await uploadFiles(4, 1, this.img_main, true, resID);
        if (mainRes.code !== "000000") flag = false;
      }
      if (this.img_children.length > 0) {
        var childRes = await uploadFiles(4, 1, this.img_children, false, resID);
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

    // ar文件状态改变
    arChange(file, list) {
      this.file_ar = [...list];
    },
    // 主缩略图状态改变
    mainChange(file, list) {
      this.img_main = [...list];
    },
    // 子图文件状态改变
    childrenChange(file, list) {
      this.img_children = [...list];
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
    }
  }
}
</style>