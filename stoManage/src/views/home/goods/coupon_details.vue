<template>
  <!-- 优惠券详情 -->
  <div id="coupon_details" class="shadow_container">
    <div class="pageTitle">优惠券详情</div>

    <!-- 表单 -->
    <el-form label-width="100px">
      <el-form-item label="广告编号" v-if="type=='update'">{{data_info.reqId}}</el-form-item>
      <el-form-item label="创建时间" v-if="type=='update'">{{data_info.creationTime}}</el-form-item>
      <el-form-item label="资源预览" v-if="type=='update'">
        <img :src="data_info.adUrl" alt height="300" />
      </el-form-item>

      <el-form-item label="券类型">
        <el-select v-model="data_info.couponType" placeholder="请选择">
          <el-option label="折扣券" :value="0"></el-option>
          <el-option label="抵扣券" :value="1"></el-option>
          <el-option label="兑换券" :value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="满减金额">
        <el-input v-model="data_info.eXchangeMoney" placeholder="请输入金额"></el-input>
      </el-form-item>

      <el-form-item label="面值金额">
        <el-input v-model="data_info.couponValue" placeholder="请输入金额"></el-input>
      </el-form-item>

      <el-form-item label="有效日期" label-width="100px">
        <el-date-picker
          v-model="data_info.validTime"
          type="datetimerange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
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
export default {
  data() {
    return {
      type: 0, // 标识当前是"新增"或"修改"
      data_info: {}, // 数据对象
      file_list: [], // 上传文件列表
    };
  },

  methods: {
    getFileList() {},

    sendSubmit() {
      console.log(this.data_info);
    },
  },
};
</script>

<style lang='scss'>
#coupon_details {
  .el-form {
    .el-form-item__content {
      width: 200px;
    }
  }
}
</style>