<template>
  <div id="weapon_details" class="shadow_container">
    <div class="pageTitle">武器详情</div>
    <el-form label-width="100px">
      <el-form-item label="武器名称">
        <el-input v-model="data_info.weaponName"></el-input>
      </el-form-item>

      <el-form-item label="武器类型">
        <el-select v-model="data_info.weaponType">
          <el-option label="小型炮" :value="1"></el-option>
          <el-option label="中型炮" :value="2"></el-option>
          <el-option label="重型炮" :value="3"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="武器图片">
        <el-upload
          :auto-upload="false"
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :on-change="imgChange"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="最小伤害">
        <el-input v-model="data_info.minDamage"></el-input>
      </el-form-item>
      <el-form-item label="最大伤害">
        <el-input v-model="data_info.maxDamage"></el-input>
      </el-form-item>

      <el-form-item label="暴击几率">
        <el-input
          v-model="data_info.criticalChance"
          placeholder="如：0.25"
        ></el-input>
      </el-form-item>

      <el-form-item label="暴击伤害倍数">
        <el-input v-model="data_info.criticalMultiple"></el-input>
      </el-form-item>

      <el-form-item label="金币花费/次">
        <el-input-number v-model="data_info.spendGlod"></el-input-number>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="sendSubmit">提交</el-button>
        <el-button type="info" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import {
  getDetails,
  addDataList,
  updateDetails,
  uploadFiles,
} from "@/utils/api/apis";
import { createGet } from "@/utils/common";
export default {
  components: {
    Pagination,
  },
  mounted() {
    var { id } = this.$route.query;
    if (id) {
      this.operate = "1";
      getDetails(this.model, this.control, 1, { weaponID: id }).then((res) => {
        this.data_info = res.resultObject;
        this.imageUrl = window.baseUrl.ar_2d + res.resultObject.resourcesID;
      });
    }
  },

  data() {
    return {
      find_form: {},
      img_list: [],
      data_info: {},

      imageUrl: "",
      operate: "0", // 0-新增 1-修改
      model: "ARGame",
      control: "armsConfig",
    };
  },

  methods: {
    // 点击提交按钮
    async sendSubmit() {
      switch (this.operate) {
        // 新增
        case "0":
          // 是否上传文件
          if (this.img_list.length > 0) {
            var res = await uploadFiles(4, 1, this.img_list, false, "武器图片");
            this.data_info.resourcesID = res.resultObject[0].resID;
          } else {
            this.$message.error("请添加武器图片");
            return;
          }
          addDataList(
            this.model,
            this.control,
            1,
            this.data_info,
            this,
            "weapon_list"
          );
          break;

        // 修改
        case "1":
          // 是否上传文件
          if (this.img_list.length > 0) {
            var res = await uploadFiles(4, 1, this.img_list, false, "道具碎片");
            this.data_info.resourcesID = res.resultObject[0].resID;
          }
          updateDetails(
            this.model,
            this.control,
            1,
            this.data_info,
            this,
            "weapon_list"
          );
          break;
      }
    },

    // 图片状态改变
    imgChange(file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.img_list = [file];
    },

    // 取消回到列表页
    cancel() {
      this.$router.push("weapon_list");
    },
  },
};
</script>

<style lang='scss'>
#weapon_details {
  form {
    .el-form-item__content {
      width: 300px;
      .el-input,
      .el-input-number,
      .el-select,
      .el-textarea {
        width: 100%;
      }
    }
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
</style>