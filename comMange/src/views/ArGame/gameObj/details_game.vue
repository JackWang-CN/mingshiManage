<template>
  <div id="prize_details" class="shadow_container">
    <div class="pageTitle">游戏对象详情</div>
    <!-- 游戏对象表单 -->
    <el-form label-width="100px">
      <el-form-item label="游戏对象名称">
        <el-input v-model="data_info.name"></el-input>
      </el-form-item>
      <el-form-item label="游戏对象类型">
        <el-select v-model="data_info.typeID">
          <el-option
            v-for="type in type_list"
            :key="type.typeID"
            :value="type.typeID"
            :label="type.typeName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="游戏对象速度">
        <el-input v-model="data_info.speed"></el-input>
      </el-form-item>
      <el-form-item label="游戏对象模型">
        <el-button type="success" size="small" @click="showModel"
          >选择模型</el-button
        >

        <div class="mode_img" v-show="data_info.modeImg">
          <el-avatar
            :size="80"
            :src="data_info.modeImg"
            shape="square"
            v-if="data_info.resName"
          ></el-avatar>
          <el-tag>{{ data_info.resName }}</el-tag>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sendSubmit">提交</el-button>
        <el-button type="info" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>

    <!-- 弹出框-模型列表 -->
    <el-dialog title="选择模型" :visible.sync="show_mode">
      <!-- 模型 -->
      <ul class="model_list">
        <li
          v-for="model in model_list"
          :key="model.resID"
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
      <el-button type="primary" size="small" @click="confirmMode"
        >确认</el-button
      >
      <el-button size="small" @click="show_mode = false">取消</el-button>
    </el-dialog>
  </div>
</template>

<script>
const fileUrl = window.baseUrl.ar_2d;
import Pagination from "@/components/Pagination";
import {
  getDataList,
  getDetails,
  addDataList,
  updateDetails,
  getFileList,
} from "@/utils/api/apis";
import { createGet, filteObj, spliceImg } from "@/utils/common";
export default {
  components: {
    Pagination,
  },

  mounted() {
    // 请求游戏对象类型
    getDataList(
      this.model,
      "objectType",
      1,
      createGet(1, 999),
      this,
      "type_list",
      "getTypeNameList"
    );

    // 判断当前是修改或新增
    var { id } = this.$route.query;
    if (id) {
      this.operate = "1";
      var form = { objectInfoID: id };
      getDetails(this.model, this.control, 1, form).then((res) => {
        this.data_info = res.resultObject;
        this.data_info.modeImg = fileUrl + this.data_info.mainImageID;
        this.data_info.resName = this.data_info.showResourceName;
        console.log(this.data_info);
      });
    }
  },

  data() {
    return {
      find_form: {},
      data_info: {},
      show_mode: false,
      type_list: [], // 游戏对象类型
      model_list: [], // 模型列表
      select_model: {},

      operate: "0", // 0-新增 1-修改
      model: "ARGame",
      control: "gameObj",
    };
  },

  methods: {
    // 点击提交按钮
    sendSubmit() {
      switch (this.operate) {
        // 新增
        case "0":
          addDataList(
            this.model,
            this.control,
            1,
            this.data_info,
            this,
            "gameObj_list"
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
            "gameObj_list"
          );
          break;
      }
    },

    // 打开模型列表框
    showModel() {
      this.show_mode = true;
      this.find_form = createGet(1, 20);
      var form = filteObj({ ...this.find_form });
      getFileList("u3dResourceNameList", 1, form, this, "model_list");
    },

    // 点击选中模型
    selectModel(mode) {
      this.select_model = { ...mode };
    },

    // 取消选中
    unSelect() {
      this.select_model = {};
    },

    // 确认选择
    confirmMode() {
      if (this.select_model.resID) {
        this.data_info.resourceID = this.select_model.resID;
        this.data_info.resName = this.select_model.showResourceName;
        this.data_info.modeImg = this.select_model.imgUrl;
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
      this.$router.push("gameObj_list");
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
#prize_details {
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