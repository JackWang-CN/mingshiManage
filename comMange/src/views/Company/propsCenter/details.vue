<template>
  <div id="props_details" class="shadow_container">
    <!-- 道具商城 -->
    <div class="pageTitle">道具详情</div>

    <el-form label-width="100px" id="details_form">
      <el-form-item label="道具名称">
        <el-input v-model="data_info.name"></el-input>
      </el-form-item>

      <el-form-item label="绑定模型">
        <el-button type="success" size="small" @click="showModel"
          >选择模型</el-button
        >
        <el-tag style="margin-left: 5px" v-if="data_info.resName">{{
          data_info.resName
        }}</el-tag>
      </el-form-item>

      <el-form-item label="道具状态">
        <el-select v-model="data_info.isEnable">
          <el-option label="正在售卖" :value="1"></el-option>
          <el-option label="已下架" :value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="道具类型">
        <el-select v-model="data_info.typeID">
          <el-option
            v-for="type in type_list"
            :key="type.typeID"
            :label="type.name"
            :value="type.typeID"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="道具说明">
        <el-input
          type="textarea"
          v-model="data_info.describe"
          :rows="3"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="房屋风格"
        v-show="model == 'propHouse' && operate == 0"
      >
        <el-checkbox-group v-model="data_info.houseStyleIDList">
          <el-checkbox
            v-for="item in style_list"
            :label="item.propID"
            :key="item.propID"
            >{{ item.name }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="过期时间">
        <el-date-picker
          v-model="data_info.pastDate"
          type="datetime"
          placeholder="选择日期时间"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="创建时间" v-if="operate">{{
        data_info.createTime
      }}</el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sendSubmit">保存</el-button>
        <el-button type="info" @click="cancel">返回</el-button>
      </el-form-item>
    </el-form>

    <!-- 弹出框-模型列表 -->
    <el-dialog title="选择模型" :visible.sync="show_mode">
      <!-- 模型 -->
      <ul id="model_list">
        <li
          v-for="model in model_list"
          :key="model.resID"
          @click="selectModel(model)"
        >
          {{ model.showResourceName }}
        </li>
      </ul>
      <!-- 分页插件 -->
      <Pagination
        :find="find_form"
        @sizeChange="pageChange('size', $event)"
        @currChange="pageChange('curr', $event)"
      ></Pagination>
      <!-- 标签 -->
      <div class="select_model">
        <span>已选择</span>
        <el-tag
          closable
          v-if="select_model.showResourceName"
          @close="unSelect"
          >{{ select_model.showResourceName }}</el-tag
        >
      </div>
      <!-- 操作 -->
      <el-button type="primary" size="small" @click="confirmMode"
        >确认</el-button
      >
      <el-button size="small" @click="show_mode = false">取消</el-button>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import {
  getDataDetails,
  updateDetails,
  getFileList,
  uploadFiles,
  getDataList,
  addDataList,
  geFile,
} from "@/utils/api/apis";
import { filteObj, createFormData, createGet } from "@/utils/common";
export default {
  components: {
    Pagination,
  },
  async created() {
    var propID = this.$route.query.id;
    this.model = this.$route.query.type;
    this.control = this.$route.query.type;
    if (propID) {
      this.operate = 1;
      getDataDetails(this.model, this.control, 1, { propID }, this);
    }

    // 请求当前道具分支的所有类型
    getDataList(
      this.model,
      this.control + "Type",
      1,
      createGet(1, 90),
      this,
      "type_list"
    );

    // 如果是房屋，请求风格列表
    if (this.model == "propHouse" && this.operate == 0) {
      getDataList(
        this.model + "Style",
        this.model + "Style",
        1,
        createGet(1, 999),
        this,
        "style_list"
      );
    }
  },

  data() {
    return {
      data_info: { houseStyleIDList: [] },
      find_form: {},
      operate: 0, // 0新增 1修改
      show_mode: false,
      model_list: [], // 模型列表
      type_list: [], // 道具类型
      style_list: [], // 房屋风格列表

      // 上传的图片列表
      img_list: [],

      select_model: {},

      model: "",
      control: "",
    };
  },

  methods: {
    // 提交修改
    sendSubmit() {
      // 计算过期时间戳
      var date = this.data_info.pastDate,
        form = { ...this.data_info };
      form.validityTimestamp = new Date(date).getTime();

      switch (this.operate) {
        case 0:
          addDataList(this.model, this.control, 1, form, this, "props_list");
          break;
        case 1:
          updateDetails(this.model, this.control, 1, form, this, "props_list");
          break;
      }
    },

    // 返回上一页
    cancel() {
      this.$router.push("props_list");
    },

    // 打开模型列表框
    showModel() {
      this.show_mode = true;
      this.find_form = createGet();
      getFileList("u3dResourceNameList", 1, this.find_form, this, "model_list");
    },

    // 点击选中模型
    selectModel(mode) {
      this.select_model = { ...mode };
      console.log(this.select_model);
    },

    // 取消选中
    unSelect() {
      this.select_model = {};
    },

    // 确认选择
    confirmMode() {
      if (this.select_model.resID) {
        this.data_info.resID = this.select_model.resID;
        this.data_info.resName = this.select_model.showResourceName;
        this.data_info.facadeImageID = this.select_model.mainImageID;
      }
      this.show_mode = false;
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
};
</script>

<style lang='scss'>
#props_details {
  #details_form {
    .el-input,
    .el-textarea {
      width: 250px;
    }
  }

  // 模型列表
  #model_list {
    margin-bottom: 20px;
    li {
      padding: 10px;
      margin: 5px;
      display: inline-block;
      background-color: rgb(230, 230, 230);
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        color: #409eff;
      }
    }
  }

  .select_model {
    margin: 20px 0;
    span {
      margin-right: 10px;
      line-height: 32px;
    }
  }
}
</style>