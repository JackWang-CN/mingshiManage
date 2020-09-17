<!-- 商户详情 -->
<template>
  <div id="store_details" class="shadow_container">
    <div class="pageTitle">商户详情</div>

    <el-form label-width="120px">
      <el-form-item label="商户名称">
        <el-input v-model="data_info.name"></el-input>
      </el-form-item>

      <el-form-item label="经营类型">
        <el-select v-model="data_info.manageTypeID">
          <el-option
            v-for="item in type_list"
            :key="item.typeID"
            :label="item.typeName"
            :value="item.typeID"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="账号类型">
        <el-select v-model="data_info.accountType">
          <el-option label="商户" :value="0"></el-option>
          <el-option label="商圈" :value="1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商家地址">
        <el-input v-model="data_info.address"></el-input>
      </el-form-item>

      <el-form-item label="联系方式">
        <el-input v-model="data_info.tel"></el-input>
      </el-form-item>

      <el-form-item label="社会信用代码">
        <el-input v-model="data_info.inteThrCode"></el-input>
      </el-form-item>

      <el-form-item label="业务经理ID">
        <el-input v-model="data_info.officeManager"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="sendSubmit">提交</el-button>
        <el-button type="danger" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  uploadFiles,
  addDataList,
  getDetails,
  updateDataDetails,
  getDataList,
} from "@/utils/api/apis";
import { createGet } from "@/utils/common";
export default {
  mounted() {
    // 请求商户经营类型
    getDataList(
      this.model,
      this.control,
      1,
      createGet(1, 999),

      this,
      "type_list",
      "managerType/list"
    );

    var merchantID = this.$route.query.id;
    if (merchantID) {
      this.opreate = 1;
      getDetails(this.model, this.control, 1, { value: merchantID }).then(
        (res) => {
          this.data_info = res.resultObject.result;
        }
      );
    }
  },

  data() {
    return {
      data_info: {},
      type_list: [],
      fileList: [],
      opreate: 0,
      model: "merchant",
      control: "merchantInfo",
    };
  },

  methods: {
    //   发送提交
    sendSubmit() {
      switch (this.opreate) {
        case 0:
          addDataList(
            this.model,
            this.control,
            1,
            this.data_info,
            this,
            "merchant_list"
          );
          break;
        case 1:
          updateDataDetails(
            this.model,
            this.control,
            1,
            this.data_info,
            this,
            "merchant_list"
          );
          break;
      }
    },

    // 获取文件
    getFile(file) {
      if (this.fileList.length > 0) {
        this.fileList = [];
      }
      this.fileList.push(file);
    },

    // 文件移出
    removeFile(e) {
      console.log(e);
    },

    // 返回上一页
    cancel() {
      this.$router.push("merchant_list");
    },
  },
};
</script>

<style lang='scss'>
#store_details {
  form {
    .el-form-item {
      width: 500px;
      .el-input {
        width: 300px;
      }

      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
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