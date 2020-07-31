<template>
  <!-- 详情页  -->
  <div id="adv_details" class="shadow_container">
    <div class="pageTitle">{{type=='add'?'新增广告':'修改广告'}}</div>

    <!-- 表单 -->
    <el-form label-width="100px">
      <el-form-item label="广告编号" v-if="type=='update'">{{data_info.reqId}}</el-form-item>
      <el-form-item label="创建时间" v-if="type=='update'">{{data_info.creationTime}}</el-form-item>
      <el-form-item label="资源预览" v-if="type=='update'">
        <img :src="data_info.adUrl" alt height="300" />
      </el-form-item>

      <el-form-item label="启用状态">
        <el-select v-model="data_info.reqStatus" placeholder="请选择">
          <el-option label="启用" :value="0"></el-option>
          <el-option label="禁用" :value="1"></el-option>
        </el-select>
      </el-form-item>

      <!-- 图片上传 -->
      <el-form-item label="资源上传">
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :on-change="getFileList"
          :multiple="false"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                <i class="el-icon-zoom-in"></i>
              </span>
              <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="广告描述">
        <el-input type="textarea" v-model="data_info.desInfo"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sendSubmit">提交</el-button>
        <el-button type="danger" @click="toPath('advertising')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  getDetailsInfo,
  upLoadFiles,
  addDataList,
  updateDataList,
} from "@/utils/api/api";
import { creatFormData, spliceUrl } from "@/utils/common";
export default {
  created() {
    // 获取reqId
    var id = this.$route.query.id;
    if (id) {
      this.type = "update";
      var get_form = { reqId: id };
      getDetailsInfo(
        this.$vision.merchant,
        "Meraddata",
        get_form,
        "data_info",
        this
      );
    }
  },

  data() {
    return {
      type: "add", // 标识当前是"新增"或"修改"
      data_info: {}, // 数据对象
      file_list: [], // 上传文件列表
    };
  },
  methods: {
    // 跳转到指定路由
    toPath(path) {
      this.$confirm("退出将不保存修改，确定吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message.info("取消操作");
          this.$router.push(path);
        })
        .catch(() => {});
    },

    /* 文件上传 */
    // 1.获取文件列表
    getFileList(file, list) {
      this.file_list = list;
    },

    // 提交
    sendSubmit() {
      switch (this.type) {
        case "add":
          // 1) 上传图片并获取url
          if (this.file_list.length) {
            upLoadFiles("广告", creatFormData(this.file_list)).then((res) => {
              this.data_info.adUrl = spliceUrl(res.list, "resId")[0].resId;
              // 2) 添加广告
              addDataList(
                this.$vision.merchant,
                "Meraddata",
                this.data_info,
                this,
                "advertising"
              );
            });
          } else {
            this.$message.error("请上传广告资源");
          }
          break;
        case "update":
          // 1) 判断是否修改资源
          if (this.file_list.length) {
            upLoadFiles("广告", creatFormData(this.file_list)).then((res) => {
              this.data_info.adUrl = spliceUrl(res.list, "resId")[0].resId;
              updateDataList(
                this.$vision.merchant,
                "Meraddata",
                this.data_info,
                this,
                "advertising"
              );
            });
          } else {
            updateDataList(
              this.$vision.merchant,
              "Meraddata",
              this.data_info,
              this,
              "advertising"
            );
          }
          break;
      }
    },
  },
};
</script>

<style lang='scss'>
#adv_details {
  .el-form-item__label {
    margin-right: 20px;
  }
  .el-textarea {
    width: 30%;
    textarea {
      height: 100px;
    }
  }
}
</style>