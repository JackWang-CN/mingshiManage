<template>
  <div id="props_details" class="shadow_container">
    <!-- 道具详情 -->
    <div class="pageTitle">道具详情</div>

    <el-form label-width="100px">
      <el-form-item label="道具名称">
        <span v-if="!mode">{{data_info.aname}}</span>
        <el-input v-else-if="mode" v-model="data_info.aname"></el-input>
      </el-form-item>
      <el-form-item label="缩略图" v-if="type">
        <el-avatar :size="100" :src="data_info.rpmico" shape="square"></el-avatar>
      </el-form-item>
      <el-form-item label="图片上传" v-if="mode">
        <el-upload
          list-type="picture-card"
          :auto-upload="false"
          :on-change="getFileList"
          :limit="1"
          action="#"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{ file }">
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="previewImg(file)">
                <i class="el-icon-zoom-in"></i>
              </span>
              <span class="el-upload-list__item-delete" @click="removeImg(file)">
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="数量">
        <span v-if="!mode">{{data_info.anum}}</span>
        <el-input v-else-if="mode" v-model="data_info.anum"></el-input>
      </el-form-item>
      <el-form-item label="单价">
        <span v-if="!mode">{{data_info.aunitp}}</span>
        <el-input v-if="mode" v-model="data_info.aunitp"></el-input>
      </el-form-item>
      <el-form-item label="道具状态">
        <span v-if="!mode">{{data_info.currentState}}</span>
        <el-select v-if="mode" v-model="data_info.currentState">
          <el-option label="正在售卖" :value="0"></el-option>
          <el-option label="已下架" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="道具类型">
        <span v-if="!mode">
          <i v-if="data_info.rpmtype==1">户型风格</i>
          <i v-else-if="data_info.rpmtype==2">屋内道具</i>
          <i v-else-if="data_info.rpmtype==3">AR宠物</i>
        </span>
        <el-select v-if="mode" v-model="data_info.rpmtype">
          <el-option label="户型风格" :value="1"></el-option>
          <el-option label="屋内道具" :value="2"></el-option>
          <el-option label="AR宠物" :value="3"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="上架时间">
        <el-date-picker v-if="mode" v-model="data_info.listingTime" type="date" placeholder="选择日期"></el-date-picker>
        <span v-if="!mode">{{data_info.listingTime}}</span>
      </el-form-item>

      <el-form-item label="下架时间">
        <el-date-picker v-if="mode" v-model="data_info.dismountTime" type="date" placeholder="选择日期"></el-date-picker>
        <span v-if="!mode">{{data_info.dismountTime}}</span>
      </el-form-item>

      <el-form-item label="道具说明">
        <span v-if="!mode">{{data_info.infoDes}}</span>
        <el-input v-if="mode" type="textarea" v-model="data_info.infoDes" :rows="3"></el-input>
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
import {
  getDetailsInfo,
  addDataList,
  updateDataList,
  upLoadFiles,
} from "@/utils/api/api";
import { filteObj, createFormData } from "@/utils/common";
export default {
  mounted() {
    this.dataId = this.$route.query.id;
    this.mode = this.$route.query.mode - 0;
    delete this.$route.query.mode;
    if (this.dataId) {
      this.type = 1;
      getDetailsInfo(
        this.$vision.user,
        this.control,
        { dataId: this.dataId },
        "data_info",
        this,
        "rpmico"
      );
    }
  },

  data() {
    return {
      control: "PropsCenter",
      data_info: {},
      dataId: "",
      type: 0, // 0新增 1修改
      mode: 0, // 0查看 1编辑
      show_imgUrl: "",
      show_img: false,
      file_list: [],
      remarks: "道具商城-道具缩略图",
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

    // 上传图片
    uploadImg(obj) {
      var formData = createFormData(this.file_list);
      upLoadFiles(this.remarks, formData, obj).then((res) => {
        obj.rpmico = res.list[0].resId;
        obj.resId = res.list[0].resId;

        if (this.type) {
          // 若为修改
          updateDataList(
            this.$vision.user,
            this.control,
            obj,
            this,
            "props_list"
          );
        } else {
          // 若为新增
          addDataList(this.$vision.user, this.control, obj, this, "props_list");
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