<template>
  <!-- 活动发布 -->
  <div id="activity_create" class="shadow_container">
    <div class="pageTitle">编辑活动</div>
    <!-- 活动发布 -->
    <el-form id="activity_form" label-width="100px">
      <el-form-item label="活动名称">
        <el-input v-model="apply_form.name"></el-input>
      </el-form-item>

      <el-form-item label="发起人类型">
        <el-select v-model="apply_form.agentType">
          <el-option label="联合活动" value="1"></el-option>
          <el-option label="商家活动" value="2"></el-option>
        </el-select>
      </el-form-item>
      <!-- 备注：活动的类型取决于活动发起人类型，需要监听活动发起人类型的值，以请求不同值对应的不同活动类型列表。 -->
      <el-form-item label="活动类型">
        <el-select v-model="apply_form.activtyTypeID">
          <el-option label="联合活动" value="1"></el-option>
          <el-option label="商家活动" value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="绑定委托">
        <el-select v-model="apply_form.entrustID">
          <el-option label="委托1" value="CODE0001"></el-option>
          <el-option label="委托2" value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="活动期限:">
        <el-date-picker
          @change="dateChange"
          v-model="select_date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
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
        <span>{{select_model.name}}</span>
        <el-button type="primary" size="small" @click="showModel">选择模型</el-button>
      </el-form-item>
      <el-form-item label="活动描述:">
        <el-input type="textarea" v-model="apply_form.describe" :rows="5"></el-input>
      </el-form-item>
      <el-form-item label="活动内容:">
        <el-input type="textarea" v-model="apply_form.content" :rows="5"></el-input>
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
      <el-form>
        <el-form-item>
          <!-- 模型列表 -->
          <ul>
            <li>最近上传模型：</li>
            <li
              v-for="(item,index) in model_list"
              :key="index"
              @click="selectModel(item.resID)"
            >{{item.resID}}1</li>
          </ul>
        </el-form-item>
        <el-form-item>
          <div>已选模型</div>
          <el-tag
            v-for="(tag,index) in select_model"
            :key="tag"
            closable
            @close="unSelect(index)"
          >{{tag}}</el-tag>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="checkModel">确定</el-button>
          <el-button @click="show_model=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { createGet, switchDateList } from "@/utils/common";
import { updateDataDetails, getFileList, uploadFiles } from "@/utils/api/apis";
export default {
  mounted() {
    this.activeName = "apply";
    this.find_form = createGet();
  },

  data() {
    return {
      // 申请援助数据对象
      apply_form: {},
      // 搜索数据对象
      find_form: {},
      // 上传的图片列表
      img_list: [],

      // 模型列表
      model_list: [],

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

    // 点击显示模型按钮
    showModel() {
      // 1.打开弹出框
      this.show_model = true;
      var form = { ...this.find_form };
      form.data.isArRes = 1;
      // 2.请求模型列表并展示
      getFileList(undefined, 1, form, this, "model_list");
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
      this.select_model.splice(index, 1);
    },

    // 确认模型
    checkModel() {
      this.show_model = false;
      this.apply_form.resID = this.select_model;
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
            this.apply_form.activtyIcoID = res.resultObject;
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

    //  点击提交按钮
    sendSubmit() {
      console.log(this.apply_form);

      updateDataDetails(
        this.model,
        this.control,
        1,
        this.apply_form,
        this,
        "merchant_activityList",
        "createActivityInfo"
      );
      // updateData(
      //   this.model,
      //   this.control,
      //   1,
      //   this.apply_form,
      //   "createActivityInfo"
      // ).then((res) => {
      //   console.log(res);
      //   switch (res.code) {
      //     case "000000":
      //       this.$message.success("活动创建成功！");
      //       this.$router.push("merchant_activityList");
      //   }
      // });
    },

    // 时间选择器值改变
    dateChange() {
      if (!this.select_date) {
        return;
      }
      var date = switchDateList(this.select_date);
      this.apply_form.startTime = date.startTime;
      this.apply_form.endTime = date.endTime;
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
}
</style>