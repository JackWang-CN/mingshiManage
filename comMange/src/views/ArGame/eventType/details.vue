<template>
  <div id="eventType_details" class="shadow_container">
    <div class="pageTitle">类型详情</div>
    <el-form label-width="100px">
      <el-form-item label="类型名称">
        <el-input v-model="data_info.contentName"></el-input>
      </el-form-item>

      <el-form-item label="类型道具">
        <el-select v-model="data_info.assetsID">
          <el-option label="道具一" :value="0"></el-option>
          <el-option label="道具二" :value="1"></el-option>
          <el-option label="道具三" :value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="类型类型">
        <el-select v-model="data_info.contentType">
          <el-option label="小型炮" :value="0"></el-option>
          <el-option label="中型炮" :value="1"></el-option>
          <el-option label="重型炮" :value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="绑定模型">
        <el-button type="success" size="small" @click="showModel"
          >选择模型</el-button
        >
        <el-tag style="margin-left: 5px" v-if="data_info.resName">{{
          data_info.resName
        }}</el-tag>
      </el-form-item>

      <el-form-item label="类型数量">
        <el-input-number v-model="data_info.count" :step="10"></el-input-number>
      </el-form-item>

      <el-form-item label="最小数量">
        <el-input v-model="data_info.minCount"></el-input>
      </el-form-item>
      <el-form-item label="最大数量">
        <el-input v-model="data_info.maxCount"></el-input>
      </el-form-item>

      <el-form-item label="掉落几率">
        <el-input v-model="data_info.change"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="sendSubmit">提交</el-button>
        <el-button type="info" @click="cancel">取消</el-button>
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
  addDataList,
  updateDetails,
  getFileList,
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
      getDataDetails(
        this.model,
        this.control,
        1,
        { noticeID: id },
        this,
        "data_info"
      );
    }
  },

  data() {
    return {
      find_form: {},
      data_info: {},
      show_mode: false,
      model_list: [], // 模型列表
      select_model: {},

      operate: "0", // 0-新增 1-修改
      model: "notify",
      control: "pushInfo",
    };
  },

  methods: {
    // 点击提交按钮
    sendSubmit() {
      console.log(this.data_info);
      return;
      switch (this.operate) {
        // 新增
        case "0":
          addDataList(
            this.model,
            this.control,
            1,
            this.data_info,
            this,
            "content_list"
          );
          break;
        // 修改
        case "1":
          updateDetails(
            this.model,
            this.control,
            1,
            this.data_info,
            this,
            "content_list"
          );
          break;
      }
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
        this.data_info.resourcesID = this.select_model.resID;
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

    // 取消回到列表页
    cancel() {
      this.$router.push("eventType_list");
    },
  },
};
</script>

<style lang='scss'>
#eventType_details {
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