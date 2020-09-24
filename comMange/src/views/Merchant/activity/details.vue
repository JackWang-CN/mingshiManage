<template>
  <!-- 活动发布 -->
  <div id="activity_create" class="shadow_container">
    <div class="pageTitle">编辑活动</div>
    <!-- 活动发布 -->
    <el-form id="activity_form" label-width="100px">
      <el-form-item label="活动名称">
        <el-input v-model="data_info.name"></el-input>
      </el-form-item>

      <el-form-item label="发起人类型">
        <el-select v-model="data_info.agentType">
          <el-option label="联合活动" value="1"></el-option>
          <el-option label="商家活动" value="2"></el-option>
        </el-select>
      </el-form-item>
      <!-- 备注：活动的类型取决于活动发起人类型，需要监听活动发起人类型的值，以请求不同值对应的不同活动类型列表。 -->
      <el-form-item label="活动类型">
        <el-select v-model="data_info.activityTypeID">
          <el-option
            v-for="type in type_list"
            :key="type.typeID"
            :label="type.name"
            :value="type.typeID"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="绑定委托">
        <el-select v-model="data_info.entrustID">
          <el-option
            v-for="item in entrust_list"
            :key="item.entrustID"
            :label="item.theme"
            :value="item.entrustID"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="开始时间">
        <el-date-picker v-model="data_info.startTime" type="datetime" placeholder="选择日期"></el-date-picker>
      </el-form-item>

      <el-form-item label="结束时间">
        <el-date-picker v-model="data_info.endTime" type="datetime" placeholder="选择日期"></el-date-picker>
      </el-form-item>

      <el-form-item label="活动图片">
        <el-upload
          :action="normal_url"
          :auto-upload="false"
          :on-preview="showPreview"
          :on-change="fileChange"
          :on-remove="removeFile"
        >
          <el-button size="small" type="primary">选择图片</el-button>
        </el-upload>
        <el-button type="success" @click="uploadImg" size="small">上传</el-button>
      </el-form-item>
      <el-form-item label="3D模型">
        <el-button type="primary" size="small" @click="showModel">选择模型</el-button>
        <span>模型名称：{{data_info.resName}}</span>
        <!-- <el-avatar :size="80" :src shape="square"></el-avatar> -->
      </el-form-item>
      <el-form-item label="活动描述:">
        <el-input type="textarea" v-model="data_info.describe" :rows="5"></el-input>
      </el-form-item>
      <el-form-item label="活动内容:">
        <el-input type="textarea" v-model="data_info.content" :rows="5"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="sendSubmit">提交申请</el-button>
        <el-button type="danger" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>

    <!-- 弹出框-图片预览 -->
    <el-dialog :visible.sync="show_preview">
      <img width="100%" :src="preview_url" alt />
    </el-dialog>

    <!-- 弹出框-模型列表 -->
    <el-dialog title="选择模型" :visible.sync="show_model">
      <!-- 模型 -->
      <ul id="model_list">
        <li
          v-for="(model,index) in model_list"
          :key="index"
          @click="selectModel(model)"
        >{{model.showResourceName}}</li>
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
        >{{select_model.showResourceName}}</el-tag>
      </div>
      <!-- 操作 -->
      <el-button type="primary" size="small" @click="confirmModel">确认</el-button>
      <el-button size="small" @click="show_model=false">取消</el-button>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { createGet, switchDateList } from "@/utils/common";
import {
  getDataList,
  getDataDetails,
  updateDataDetails,
  getFileList,
  uploadFiles,
} from "@/utils/api/apis";
export default {
  components: {
    Pagination,
  },
  mounted() {
    // 1.请求活动类型
    getDataList(
      this.model,
      this.model + "Type",
      1,
      createGet(1, 999),
      this,
      "type_list",
      "activityTypeList"
    );

    // 2.请求委托列表
    this.find_form = createGet();
    getDataList(
      "merchant",
      "merEntrustActivity",
      1,
      this.find_form,
      this,
      "entrust_list",
      "ongoing/list"
    );

    var activityID = this.$route.query.id;
    // 如果是修改就请求当前数据详情
    if (activityID) {
      this.operate = 1;
      getDataDetails(
        this.model,
        this.control,
        1,
        { activityID },
        this,
        "data_info",
        "getMerActivityDetail"
      );
    }

    this.activeName = "apply";
    this.find_form = createGet();
  },

  data() {
    return {
      operate: 0,
      // 申请援助数据对象
      data_info: {},
      // 搜索数据对象
      find_form: {},
      // 上传的图片列表
      img_list: [],
      type_list: [], // 活动类型列表
      // 模型列表
      model_list: [],
      entrust_list: [], // 委托列表

      // 选中的模型列表
      select_model: [],

      show_preview: false, // 预览图显隐
      preview_url: "", // 预览图地址
      show_model: false, // 3D模型列表
      normal_url: "#", // 普通资源上传地址

      select_date: [], // 有效日期

      model: "activity",
      control: "activityManage",
    };
  },

  methods: {
    switchMore() {
      this.showMore = !this.showMore;
    },

    // 打开模型列表框
    showModel() {
      this.show_model = true;
      this.find_form = createGet();
      getFileList("u3dResourceNameList", 1, this.find_form, this, "model_list");
    },

    // 点击模型添加到选中列表
    selectModel(id) {
      if (this.select_model.includes(id)) {
        return;
      } else {
        this.select_model.push(id);
      }
    },

    // 点击模型标签的X，取消选中模型
    unSelect(index) {
      this.select_model = {};
    },

    // 确认选择
    confirmModel() {
      if (this.select_model.resID) {
        this.data_info.resID = this.select_model.resID;
        this.data_info.resName = this.select_model.showResourceName;
        this.data_info.facadeImageID = this.select_model.mainImageID;
      } else {
        this.data_info.resID = "";
        this.data_info.resName = "";
        this.data_info.facadeImageID = "";
      }
      this.show_model = false;
    },

    // 文件状态改变
    fileChange(file, list) {
      this.img_list = [...list];
    },

    // 图片预览
    showPreview(file) {
      this.preview_url = file.url;
      this.show_preview = true;
    },

    // 文件移除
    removeFile(file) {
      this.img_list.forEach((item, index) => {
        if (item.uid == file.uid) {
          this.img_list.splice(index, 1);
        }
      });
    },

    // 点击上传文件（图片）
    uploadImg() {
      // 非空判断
      if (this.img_list.length < 1) {
        this.$message.error("请先选择需上传的图片文件");
        return;
      }
      // 执行上传
      uploadFiles(2, 1, this.img_list, "创建活动-测试图片").then((res) => {
        this.img_list = [];
        switch (res.code) {
          case "000000":
            this.$message.success("上传成功！");
            this.data_info.activtyIcoID = res.resultObject[0].resID;
        }
      });
    },

    // 取消操作回到上一页
    cancel() {
      this.$router.push("activity_list");
    },

    // 切换模型类型
    switchModelType(type) {
      if (type == 1) {
        this.secondary_index = "";
        var index = this.primary_index;
      } else {
      }
    },

    // 点击选中模型
    selectModel(mode) {
      this.select_model = { ...mode };
    },

    //  点击提交按钮
    sendSubmit() {
      console.log(this.data_info);

      updateDataDetails(
        this.model,
        this.control,
        1,
        this.data_info,
        this,
        "activity_list",
        "createActivityInfo"
      );
    },

    // 时间选择器值改变
    dateChange() {
      if (!this.select_date) {
        return;
      }
      var date = switchDateList(this.select_date);
      this.data_info.startTime = date.startTime;
      this.data_info.endTime = date.endTime;
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
#activity_create {
  #activity_form {
    padding-right: 10px;
    .el-form-item {
      .el-input,
      .el-textarea {
        width: 300px;
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