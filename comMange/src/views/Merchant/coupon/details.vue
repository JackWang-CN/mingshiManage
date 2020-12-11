<template>
  <div id="coupon_create" class="shadow_container">
    <!-- 创建优惠券 -->
    <div class="pageTitle">编辑优惠券</div>

    <!-- 表单 -->
    <el-form class="create_form" label-width="100px">
      <el-form-item label="活动绑定">
        <el-select
          v-model="data_info.activityID"
          clearable
          :disabled="!!operate"
        >
          <el-option
            v-for="item in activity_list"
            :key="item.activityID"
            :value="item.activityID"
            :label="item.activityName"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="优惠券名称">
        <el-input v-model="data_info.name" clearable></el-input>
      </el-form-item>

      <el-form-item label="券类型">
        <el-select
          v-model="data_info.couponTypeID"
          clearable
          @change="selectChange('couponType')"
        >
          <el-option
            v-for="item in type_list"
            :key="item.typeID"
            :label="item.name"
            :value="item.typeID"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- 券图片 -->
      <el-form-item label="券图片">
        <el-upload
          class="img-upload"
          action="#"
          :auto-upload="false"
          :on-change="fileChange"
          :show-file-list="false"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="是否叠加">
        <el-select v-model="data_info.plexRuleID" clearable>
          <el-option label="不允许" :value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="生效类型">
        <el-select
          v-model="data_info.effectYype"
          clearable
          @change="selectChange('effectYype')"
        >
          <el-option label="直接生效" :value="0"></el-option>
          <el-option label="满额生效" :value="1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="门槛金额" v-show="showLimitQuota">
        <el-input v-model="data_info.limitQuota"></el-input>
      </el-form-item>

      <el-form-item label="折扣金额">
        <el-input v-model="data_info.discountQuota"></el-input>
      </el-form-item>

      <el-form-item label="启用状态">
        <el-select v-model="data_info.isEnable" clearable>
          <el-option label="启用" :value="1">启用</el-option>
          <el-option label="禁用" :value="0">禁用</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="总数量">
        <el-input-number
          v-model="data_info.totalCount"
          @change="countChange"
          :min="1"
          :max="1000"
          label="描述文字"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="优惠券描述">
        <el-input
          type="textarea"
          :rows="3"
          v-model="data_info.describe"
        ></el-input>
      </el-form-item>

      <el-form-item label="开始时间">
        <el-date-picker
          v-model="data_info.startTime"
          type="datetime"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="结束时间">
        <el-date-picker
          v-model="data_info.endTime"
          type="datetime"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>

      <!-- AR资源 -->
      <el-form-item label="AR资源">
        <el-button size="small" type="primary" @click="showModel"
          >选择模型</el-button
        >
        <div class="mode_img" v-show="data_info.resID">
          <el-avatar :size="80" :src="modeImg" shape="square"></el-avatar>
          <el-tag>{{ data_info.resName }}</el-tag>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="sendSubmit">提交</el-button>
        <el-button type="info" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>

    <!-- 弹出框-模型列表 -->
    <el-dialog title="选择模型" :visible.sync="show_model">
      <!-- 模型 -->
      <ul class="model_list">
        <li
          v-for="(model, index) in model_list"
          :key="index"
          @click="selectModel(model)"
        >
          <el-avatar
            :size="70"
            :src="model.imgUrl"
            shape="square"
            class="model_ico"
          ></el-avatar>
          <div class="model_name">{{ model.showResourceName }}</div>
        </li>
      </ul>
      <!-- 分页插件 -->
      <Pagination
        :find="find_form"
        @sizeChange="pageChange('size', $event)"
        @currChange="pageChange('curr', $event)"
      ></Pagination>
      <!-- 选中模型 -->
      <div class="select_model" v-show="Object.keys(select_model).length">
        <div class="title">已选择</div>
        <div class="ico" @click="unSelect" title="点击删除">
          <el-avatar
            :size="70"
            :src="select_model.imgUrl"
            shape="square"
            class="model_ico"
          ></el-avatar>
          <div class="model_name">{{ select_model.showResourceName }}</div>
        </div>
      </div>
      <!-- 操作 -->
      <el-button type="primary" size="small" @click="confirmModel"
        >确认</el-button
      >
      <el-button size="small" @click="show_model = false">取消</el-button>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { createGet, hintMessage, spliceImg } from "@/utils/common";
import {
  getDataList,
  getDataDetails,
  getFileList,
  updateDataDetails,
  updateData,
  uploadFiles,
} from "@/utils/api/apis";
export default {
  components: {
    Pagination,
  },
  mounted() {
    var form = createGet(1, 999);
    delete form.data;
    delete form.orderByFileds;
    // 请求活动列表
    getDataList(
      this.model,
      this.control,
      1,
      form,
      this,
      "activity_list",
      "getActivityList"
    );
    // 请求券类型
    getDataList(this.model, this.control + "Type", 1, form, this, "type_list");
    // 请求优惠券规则
    getDataList(
      this.model,
      this.control + "ClacRule",
      1,
      form,
      this,
      "rule_list",
      "getClacRuleList"
    );

    // 获取优惠券ID，值为假则为新增操作
    this.couponID = this.$route.query.id;
    this.operate = this.couponID ? 1 : 0;
    if (this.operate) {
      getDataDetails(
        this.model,
        this.control,
        1,
        { couponID: this.couponID },
        this
      );
    }
  },
  data() {
    return {
      data_info: { totalCount: 1 },
      find_form: {},
      select_date: [],
      select_model: {},
      activity_list: [], // 活动列表
      type_list: [], // 类型列表
      rule_list: [], // 规则列表
      file_list: [],
      model_list: [], // 模型列表
      show_model: false, // 3D模型列表
      operate: 0,
      showLimitQuota: false, // 门槛金额显隐
      imageUrl: "",
      modeImg: "",

      model: "coupon",
      control: "coupon",
    };
  },

  methods: {
    // 监听数量改变
    countChange(v) {},

    // 打开模型列表框
    showModel() {
      this.show_model = true;
      this.find_form = createGet();
      getFileList("u3dResourceNameList", 1, this.find_form, this, "model_list");
    },

    // 点击选中模型
    selectModel(mode) {
      this.select_model = { ...mode };
    },

    // 点击模型标签的X，取消选中模型
    unSelect(index) {
      this.select_model = {};
    },

    // 提交
    async sendSubmit() {
      this.data_info.ruleName = this.data_info.name;

      // 判断是否绑定模型
      if (!this.data_info.resID) {
        this.$message.error("请选择绑定的模型");
        return;
      }

      // 判断是否上传图片
      if (this.file_list.length > 0) {
        var fileRes = await uploadFiles(2, 1, this.file_list);
        this.data_info.imageID = fileRes.resultObject[0].resID;
      }

      var operate = this.operate ? "edit" : "createActivityCoupon";
      updateData("activity", "activityManage", 1, this.data_info, operate).then(
        (res) => {
          hintMessage(this, res);
          this.$router.push("coupon_list");
        }
      );
    },

    // 文件状态改变
    fileChange(file, list) {
      this.file_list = [file];
      this.imageUrl = URL.createObjectURL(file.raw);
    },

    // 确认选择
    confirmModel() {
      if (this.select_model.resID) {
        this.data_info.resID = this.select_model.resID;
        this.data_info.resName = this.select_model.showResourceName;
        this.modeImg = this.select_model.imgUrl;
      } else {
        this.data_info.resID = "";
      }
      this.show_model = false;
    },

    // 下拉框状态改变触发
    selectChange(type) {
      switch (type) {
        case "effectYype":
          this.showLimitQuota = !!this.data_info.effectYype;
          break;
        case "couponType":
          // 抵扣券
          if (
            this.data_info.couponTypeID == "20100913374479831440037790705422"
          ) {
            this.data_info.discountType = 1;
            // 折扣券
          } else if (
            this.data_info.couponTypeID == "20100913374479831440037790705421"
          )
            this.data_info.discountType = 2;
          break;
      }
    },

    // 返回上一页
    cancel() {
      this.$router.push("coupon_list");
    },

    // 分页属性改变
    pageChange(type, page) {
      switch (type) {
        case "size":
          this.find_form.pageSize = page;
          break;
        case "curr":
          this.find_form.currPage = page;
          break;
      }
      getFileList("u3dResourceNameList", 1, this.find_form, this, "model_list");
    },
  },

  watch: {
    model_list() {
      spliceImg(this.model_list, "mainImageID", true);
    },
  },
};
</script>

<style lang='scss'>
#coupon_create {
  form {
    .el-form-item {
      width: 400px;
      .el-input {
        width: 300px;
      }
      .el-input-number {
        width: 300px;
      }
    }
  }

  // 图片上传
  .img-upload {
    .el-upload {
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

      img {
        width: 150px;
        height: 150px;
        display: block;
      }
    }
  }
}
</style>