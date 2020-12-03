<template>
  <!-- 详情页  -->
  <div id="goods_details" class="card_container">
    <div class="pageTitle">{{ type == "add" ? "新增商品" : "修改商品" }}</div>

    <!-- 表单 -->
    <el-form :model="data_info" label-width="100px">
      <el-form-item label="商品编号" v-if="type == 'update'">{{
        data_info.productId
      }}</el-form-item>

      <el-form-item label="创建时间" v-if="type == 'update'">{{
        data_info.creationTime
      }}</el-form-item>

      <el-form-item label="商品名称">
        <el-input
          v-model="data_info.productName"
          placeholder="请输入商品名称"
        ></el-input>
      </el-form-item>

      <el-form-item label="商品类型">
        <el-select v-model="data_info.productType" placeholder="请选择">
          <el-option label="类型一" :value="0"></el-option>
          <el-option label="类型二" :value="1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="启用状态">
        <el-select v-model="data_info.isDisable" placeholder="请选择">
          <el-option label="启用" :value="0"></el-option>
          <el-option label="禁用" :value="1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="下架时间">
        <el-date-picker
          v-model="data_info.dismountTime"
          type="datetime"
          placeholder="选择时间"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="资源预览">
        <img :src="data_info.productIco" alt height="300" />
      </el-form-item>

      <!-- 图片上传 -->
      <el-form-item label="资源上传">
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :on-change="getFileList"
          :multiple="false"
          :file-list="file_list"
          :disabled="!!file_list.length"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{ file }">
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="imgPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                class="el-upload-list__item-delete"
                @click="imgRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input type="textarea" v-model="data_info.detailDes"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sendSubmit">提交</el-button>
        <el-button type="danger" @click="toPath('goods_list')">取消</el-button>
      </el-form-item>
    </el-form>

    <!-- 图片预览 -->
    <el-dialog :visible.sync="previewBox">
      <img width="100%" :src="previewUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
import {
  getDataDetail,
  uploadFiles,
  addDataList,
  updateDetails,
} from "@/utils/api/apis";
import { createFormData, spliceUrl } from "@/utils/common";
export default {
  beforeMount() {
    // 获取reqId
    var id = this.$route.query.id;
    if (id) {
      this.type = "update";
      var get_form = { productId: id };
      getDataDetail(
        this.$vision.merchant,
        "Productinfo",
        get_form,
        "data_info",
        this,
        "productIco"
      );
    }
  },

  data() {
    return {
      type: "add", // 标识当前是"新增"或"修改"
      data_info: {}, // 数据对象
      file_list: [], // 上传文件列表
      previewBox: false, // 图片预览
      previewUrl: "", // 图片预览url
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
            upLoadFiles("商品图片", creatFormData(this.file_list)).then(
              (res) => {
                this.data_info.productIco = res.list[0].resId;
                // 2) 添加商品
                addDataList(
                  this.$vision.merchant,
                  "Productinfo",
                  this.data_info,
                  this,
                  "goods_list"
                );
              }
            );
          } else {
            this.$message.error("请上传商品资源");
          }
          break;
        case "update":
          // 1) 判断是否修改资源
          if (this.file_list.length) {
            upLoadFiles("商品", creatFormData(this.file_list)).then((res) => {
              this.data_info.productIco = res.list[0].resId;
              updateDetails(
                this.$vision.merchant,
                "Productinfo",
                this.data_info,
                this,
                "goods_list"
              );
            });
          } else {
            var form = { ...this.data_info };
            delete form.productIco;
            updateDetails(
              this.$vision.merchant,
              "Productinfo",
              form,
              this,
              "goods_list"
            );
          }
          break;
      }
    },

    // 预览图片
    imgPreview(file) {
      this.previewBox = true;
      this.previewUrl = file.url;
    },

    // 删除图片
    imgRemove(file) {
      var id = file.uid,
        length = this.file_list.length;
      for (var i = 0; i < length; i++) {
        if (this.file_list[i].uid == id) {
          this.file_list.splice(i, 1);
          break;
        }
      }
    },
  },
};
</script>

<style lang='scss'>
#goods_details {
  .el-form-item__label {
    margin-right: 20px;
  }
  .el-input {
    width: auto;
  }
  .el-textarea {
    width: 30%;
    textarea {
      height: 100px;
    }
  }
}
</style>