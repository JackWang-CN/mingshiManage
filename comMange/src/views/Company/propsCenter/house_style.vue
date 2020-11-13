<template>
  <div id="house_style" class="shadow_container">
    <div class="pageTitle">
      房屋风格
      <el-button type="success" @click="showDetails(0)">添加风格</el-button>
    </div>

    <!-- 列表 -->
    <el-table :data="data_list" border>
      <el-table-column
        prop="name"
        label="风格名称"
        width="180"
      ></el-table-column>

      <el-table-column prop="imgUrl" label="缩略图" width="120">
        <template slot-scope="scope">
          <el-avatar
            v-show="scope.row.mainImageID"
            :size="80"
            :src="scope.row.imgUrl"
            shape="square"
          ></el-avatar>
        </template>
      </el-table-column>
      <el-table-column
        prop="goldPrice"
        label="价格"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="switchGoldPrice"
        label="额外购买价格"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="describe"
        label="描述"
        width="300"
      ></el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="updateTime"
        label="修改时间"
        width="180"
      ></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            @click="showDetails(1, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="delRow(scope.row.propID)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页插件 -->
    <Pagination
      :find="find_form"
      @sizeChange="pageChange('size', $event)"
      @currChange="pageChange('curr', $event)"
    ></Pagination>

    <!-- 弹出框 -->
    <el-dialog
      title="风格详情"
      :visible.sync="show_details"
      @closed="clear"
      width="30%"
    >
      <el-form label-width="70px" class="details_form">
        <el-form-item label="风格名称">
          <el-input v-model="data_info.name"></el-input>
        </el-form-item>

        <el-form-item label="初选价格">
          <el-input v-model="data_info.goldPrice"></el-input>
        </el-form-item>

        <el-form-item label="购买价格">
          <el-input v-model="data_info.switchGoldPrice"></el-input>
        </el-form-item>

        <el-form-item label="风格描述">
          <el-input
            v-model="data_info.describe"
            type="textarea"
            :rows="3"
          ></el-input>
        </el-form-item>

        <el-form-item label="AR资源">
          <el-button size="small" type="primary" @click="showModel"
            >选择模型</el-button
          >
          <el-tag
            style="margin-left: 10px"
            v-if="data_info.resID"
            @close="unSelect"
            >{{
              data_info.resName ? data_info.resName : data_info.resID
            }}</el-tag
          >
        </el-form-item>

        <el-form-item>
          <el-button size="small" type="primary" @click="sendSubmit"
            >提交</el-button
          >
          <el-button size="small" type="info" @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 弹出框-模型列表 -->
    <el-dialog title="选择模型" :visible.sync="show_model">
      <!-- 模型 -->
      <ul id="model_list">
        <li
          v-for="(model, index) in model_list"
          :key="index"
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
        <el-tag closable v-if="select_model.resID" @close="unSelect">{{
          select_model.showResourceName
            ? select_model.showResourceName
            : select_model.resID
        }}</el-tag>
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
import {
  getDataList,
  addData,
  updateData,
  delData,
  getFileList,
  getFile,
} from "@/utils/api/apis";
import { createGet, hintMessage, spliceImg } from "@/utils/common";
export default {
  components: {
    Pagination,
  },
  mounted() {
    this.find_form = createGet();
    getDataList(this.model, this.control, 1, this.find_form, this, "data_list");
  },

  data() {
    return {
      find_form: {},
      data_list: [],
      select_model: {},
      data_info: {},
      model_list: [], // 模型列表
      show_model: false, // 3D模型列表

      operate: 0,
      show_details: false,
      model: "propHouseStyle",
      control: "propHouseStyle",
    };
  },

  methods: {
    // 展示详情
    showDetails(type, row) {
      this.operate = type;
      this.show_details = true;
      if (type) {
        this.data_info = { ...row };
      }
    },

    // 打开模型列表框
    showModel() {
      this.show_model = true;
      this.find_form = createGet();
      getFileList("u3dResourceNameList", 1, this.find_form, this, "model_list");
    },

    // 点击选中模型
    selectModel(mode) {
      this.select_model = { ...mode };
      console.log(mode);
    },

    // 点击模型标签的X，取消选中模型
    unSelect(index) {
      this.select_model = {};
    },

    // 确认选择
    async confirmModel() {
      if (this.select_model.resID) {
        this.data_info.resID = this.select_model.resID;
        this.data_info.resName = this.select_model.showResourceName;
        this.data_info.mainImageID = this.select_model.mainImageID;
        // 请求子图列表
        var res = await getFile("u3dChildrenInfo", 1, {
          resID: this.data_info.resID,
        });
        var new_list = [];
        res.resultObject.forEach((item, index) => {
          var { describe, resID } = item;
          new_list.push({ describe, imgSort: index, imgID: resID });
        });
        this.data_info.childImgList = new_list;

        console.log(this.data_info);
      } else {
        this.data_info.resID = "";
      }
      this.show_model = false;
    },

    // 删除当前行
    async delRow(propID) {
      console.log(propID);
      var res = await delData(this.model, this.control, 1, { propID });
      hintMessage(this, res);
      var form = { ...this.find_form };
      getDataList(this.model, this.control, 1, form, this, "data_list");
    },

    // 清空内容
    clear() {
      this.data_info = {};
    },

    // 发送提交
    async sendSubmit() {
      var data = { ...this.data_info };
      console.log(data);
      // return;
      this.show_details = false;
      switch (this.operate) {
        case 0:
          var res = await addData(this.model, this.control, 1, data);
          break;
        case 1:
          var res = await updateData(this.model, this.control, 1, data);
          break;
      }
      hintMessage(this, res);
      var form = createGet(1, 999);
      getDataList(this.model, this.control, 1, form, this, "data_list");
    },

    // 取消
    cancel() {
      this.show_details = false;
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
      if (this.show_model) {
        getFileList(
          "u3dResourceNameList",
          1,
          this.find_form,
          this,
          "model_list"
        );
      } else {
        var form = { ...this.find_form };
        getDataList(this.model, this.control, 1, form, this, "data_list");
      }
    },
  },

  watch: {
    // 拼接图片url
    data_list() {
      this.data_list = spliceImg(this.data_list, "mainImageID", true);
      console.log(this.data_list);
    },
  },
};
</script>

<style lang='scss'>
#house_style {
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