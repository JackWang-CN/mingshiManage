<template>
  <div id="props_details" class="shadow_container">
    <!-- 道具详情 -->
    <div class="pageTitle">道具详情</div>

    <el-form label-width="100px">
      <el-form-item label="道具名称">
        <el-input v-model="data_info.name"></el-input>
      </el-form-item>
      <el-form-item label="缩略图">
        <el-avatar :size="100" :src="data_info.facadeImageID" shape="square"></el-avatar>
      </el-form-item>

      <el-form-item label="图片上传">
        <el-upload action="#" :auto-upload="false" :on-change="fileChange" :on-remove="removeFile">
          <el-button size="small" type="primary">选择图片</el-button>
        </el-upload>
        <el-button type="success" @click="uploadImg" size="small">上传</el-button>
      </el-form-item>

      <el-form-item label="数量">
        <el-input v-model="data_info.anum"></el-input>
      </el-form-item>
      <el-form-item label="单价">
        <el-input v-model="data_info.aunitp"></el-input>
      </el-form-item>
      <el-form-item label="道具状态">
        <el-select v-model="data_info.isEnable">
          <el-option label="正在售卖" :value="1"></el-option>
          <el-option label="已下架" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="道具类型">
        <el-select v-model="data_info.typeID">
          <el-option label="户型风格" :value="1"></el-option>
          <el-option label="屋内道具" :value="2"></el-option>
          <el-option label="AR宠物" :value="3"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="上架时间">
        <el-date-picker v-model="data_info.listingTime" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>

      <el-form-item label="下架时间">
        <el-date-picker v-model="data_info.dismountTime" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>

      <el-form-item label="道具说明">
        <el-input type="textarea" v-model="data_info.describe" :rows="3"></el-input>
      </el-form-item>

      <el-form-item label="创建时间" v-if="type">{{data_info.creationTime}}</el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sendSubmit" v-if="mode">保存</el-button>
        <el-button type="info" @click="cancel">返回</el-button>
      </el-form-item>
    </el-form>

    <!-- 图片预览 -->
    <el-dialog :visible.sync="show_img">
      <img width="100%" :src="show_imgUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
// import {
//   getDetailsInfo,
//   addDataList,
//   updateDataList,
//   upLoadFiles,
// } from "@/utils/api/api";
import {
  getDataDetails,
  updateDataDetails,
  getFileList,
  uploadFiles,
} from "@/utils/api/apis";
import { filteObj, createFormData } from "@/utils/common";
export default {
  mounted() {
    var propID = this.$route.query.id;
    if (propID) {
      getDataDetails(this.model, this.control, 1, { propID }, this);
    }
  },

  data() {
    return {
      data_info: {},
      type: 0, // 0新增 1修改
      mode: 0, // 0查看 1编辑
      show_imgUrl: "",
      show_img: false,
      // 上传的图片列表
      img_list: [],

      remarks: "道具商城-道具缩略图",

      model: "prop",
      control: "prop",
    };
  },

  methods: {
    // 提交修改
    sendSubmit() {
      var form = filteObj({ ...this.data_info });
      form.tradePrice = form.anum * form.aunitp;
      if (this.file_list.length) {
        // 如果有上传图片
        this.uploadImg(form);
      } else {
        // 若未上传图片
        switch (this.type) {
          // 添加
          case 0:
            addDataList(
              this.$vision.user,
              this.control,
              form,
              this,
              "props_list"
            );
            break;
          case 1:
            // 修改
            delete form.rpmico; // 避免改动图片
            updateDataList(
              this.$vision.user,
              this.control,
              form,
              this,
              "props_list"
            );
            break;
        }
      }
    },

    // 文件状态改变
    fileChange(file, list) {
      this.img_list = [...list];
    },

    // 点击上传文件（图片）
    uploadImg() {
      // 非空判断
      if (this.img_list.length < 1) {
        this.$message.error("请先选择需上传的图片文件");
        return;
      }
      // 执行上传
      uploadFiles(2, 1, this.img_list, "创建活动-测试图片").then((res) => {
        this.img_list = [];
        switch (res.code) {
          case "000000":
            this.$message.success("上传成功！");
            this.data_info.facadeImageID = res.resultObject;
        }
      });
    },

    // 返回上一页
    cancel() {
      this.$router.push("props_list");
    },

    // 获取文件列表
    getFileList(file, list) {
      this.file_list = list;
    },

    // 文件移除
    removeFile(file) {
      this.img_list.forEach((item, index) => {
        if (item.uid == file.uid) {
          this.img_list.splice(index, 1);
        }
      });
    },

    // 切换模式（编辑、只读）
    switchMode() {
      this.mode = !this.mode - 0;
    },
  },
};
</script>

<style lang='scss'>
#props_details {
  .el-form {
    .el-input,
    .el-textarea {
      width: 250px;
    }
  }
}
</style>