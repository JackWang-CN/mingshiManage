<template>
  <div id="biology_details" class="shadow_container">
    <div class="pageTitle">生物对象详情</div>

    <!-- 生物对象表单 -->
    <el-form label-width="100px">
      <el-form-item label="生物对象名称">
        <el-input v-model="data_info.name"></el-input>
      </el-form-item>

      <el-form-item label="生物对象类型">
        <el-select v-model="data_info.typeID">
          <el-option
            v-for="type in type_list"
            :key="type.typeID"
            :value="type.typeID"
            :label="type.typeName"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="生物对象性别">
        <el-select v-model="data_info.gender">
          <el-option :value="0" label="女"></el-option>
          <el-option :value="1" label="男"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="生物对象速度">
        <el-input v-model="data_info.speed"></el-input>
      </el-form-item>

      <el-form-item label="能否被攻击">
        <el-select v-model="data_info.attacked">
          <el-option :value="0" label="是"></el-option>
          <el-option :value="1" label="否"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="最大血量">
        <el-input-number v-model="data_info.maxHp"></el-input-number>
      </el-form-item>

      <el-form-item label="最小血量">
        <el-input-number v-model="data_info.minHp"></el-input-number>
      </el-form-item>

      <el-form-item label="暴击几率">
        <el-input v-model="data_info.criticalChance"></el-input>
      </el-form-item>

      <el-form-item label="是否会回血">
        <el-select v-model="data_info.backBlood">
          <el-option :value="1" label="是"></el-option>
          <el-option :value="0" label="否"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="脱战回血量" v-show="data_info.backBlood">
        <el-input v-model="data_info.normalBackCount"></el-input>
      </el-form-item>

      <el-form-item label="战斗回血量" v-show="data_info.backBlood">
        <el-input v-model="data_info.attackedBackCount"></el-input>
      </el-form-item>

      <el-form-item label="生物对象模型">
        <el-button type="success" size="small" @click="showModel"
          >选择模型</el-button
        >
        <el-tag style="margin-left: 5px" v-if="data_info.resName">{{
          data_info.resName
        }}</el-tag>
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
import Pagination from "@/components/Pagination";
import {
  getDataList,
  getDataDetails,
  addDataList,
  updateDetails,
  getFileList,
} from "@/utils/api/apis";
import { createGet, spliceImg } from "@/utils/common";
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
      var form = { creatureInfoID: id };
      getDataDetails(this.model, this.control, 1, form, this, "data_info");
    }
  },

  data() {
    return {
      find_form: {},
      data_info: { backBlood: 0, attacked: 1 },
      show_mode: false,
      type_list: [], // 游戏对象类型
      model_list: [], // 模型列表
      select_model: {},

      operate: "0", // 0-新增 1-修改
      model: "ARGame",
      control: "biologyObj",
    };
  },

  methods: {
    // 点击提交按钮
    sendSubmit() {
      console.log(this.data_info);
      //   return;
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
      getFileList("u3dResourceNameList", 1, this.find_form, this, "model_list");
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
#biology_details {
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
}
</style>