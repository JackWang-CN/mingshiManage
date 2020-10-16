<!-- 商户详情 -->
<template>
  <div id="store_details" class="shadow_container">
    <div class="pageTitle">商户详情</div>

    <el-form label-width="120px">
      <el-form-item label="商户名称">
        <el-input v-model="data_info.merchantName"></el-input>
      </el-form-item>

      <el-form-item label="商户头像">
        <el-upload
          class="avatar-uploader"
          action="#"
          :on-change="headChange"
          :auto-upload="false"
          :show-file-list="false"
        >
          <img v-if="headImg" :src="headImg" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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

      <el-form-item label="身份证正面照">
        <el-upload
          class="avatar-uploader"
          action="#"
          :on-change="idFaceChange"
          :auto-upload="false"
          :show-file-list="false"
        >
          <img v-if="idFaceImg" :src="idFaceImg" class="idcard" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="身份证反面照">
        <el-upload
          class="avatar-uploader"
          action="#"
          :on-change="idBackChange"
          :auto-upload="false"
          :show-file-list="false"
        >
          <img v-if="idBackImg" :src="idBackImg" class="idcard" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="身份证持证照">
        <el-upload
          class="avatar-uploader"
          action="#"
          :on-change="idHoldChange"
          :auto-upload="false"
          :show-file-list="false"
        >
          <img v-if="idHoldImg" :src="idHoldImg" class="idcard" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="营业执照">
        <el-upload
          class="avatar-uploader"
          action="#"
          :on-change="businessChange"
          :auto-upload="false"
          :show-file-list="false"
        >
          <img v-if="businessImg" :src="businessImg" class="idcard" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="业务经理ID">
        <el-input v-model="data_info.officeManagerID"></el-input>
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
  updateDetails,
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
      headImg: "", // 头像预览
      idFaceImg: "", // 身份证正面预览
      idBackImg: "", // 身份证反面预览
      idHoldImg: "", // 身份证持证预览
      businessImg: "", // 营业执照预览

      head_file: [],
      idFace_file: [],
      idBack_file: [],
      idHold_file: [],
      business_file: [],
      model: "merchant",
      control: "merchantInfo",
    };
  },

  methods: {
    //   发送提交
    async sendSubmit() {
      // 验证是否上传头像
      if (this.head_file.length === 0) {
        this.$message.error("请上传商户头像");
        return;
      }
      // 验证是否上传身份证
      if (
        this.idFace_file.length === 0 ||
        this.idBack_file.length === 0 ||
        this.idHold_file.length === 0
      ) {
        this.$message.error("请上传商户业主身份证照片");
        return;
      }

      console.log(
        this.head_file,
        this.idFace_file,
        this.idBack_file,
        this.idHold_file
      );
      // 上传图片
      var head = await uploadFiles(1, 1, this.head_file);
      var idFace = await uploadFiles(1, 1, this.idFace_file);
      var idBack = await uploadFiles(1, 1, this.idBack_file);
      var idHold = await uploadFiles(1, 1, this.idHold_file);
      var business = await uploadFiles(1, 1, this.business_file);

      this.data_info.headImage = head.resultObject[0].resID;
      this.data_info.iDdFacePhoto = idFace.resultObject[0].resID;
      this.data_info.idBackPhoto = idBack.resultObject[0].resID;
      this.data_info.idLicense = idHold.resultObject[0].resID;
      this.data_info.thrAttaPhoto = business.resultObject[0].resID;

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
          updateDetails(
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

    // 头像上传状态改变
    headChange(file, list) {
      this.headImg = URL.createObjectURL(file.raw);
      this.head_file = [file];
    },
    // 身份证正面上传状态改变
    idFaceChange(file, list) {
      this.idFaceImg = URL.createObjectURL(file.raw);
      this.idFace_file = [file];
    },
    // 身份证反面上传状态改变
    idBackChange(file, list) {
      this.idBackImg = URL.createObjectURL(file.raw);
      this.idBack_file = [file];
    },
    // 身份证持证上传状态改变
    idHoldChange(file, list) {
      this.idHoldImg = URL.createObjectURL(file.raw);
      this.idHold_file = [file];
    },
    // 营业执照上传状态改变
    businessChange(file, list) {
      this.businessImg = URL.createObjectURL(file.raw);
      this.business_file = [file];
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
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
      }
      .avatar {
        width: 120px;
        height: 120px;
        display: block;
      }
      .idcard {
        width: 230px;
        height: 140px;
        display: block;
      }
    }
  }
}
</style>