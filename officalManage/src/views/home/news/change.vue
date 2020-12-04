<template>
  <div class="container">
    <h1>修改新闻</h1>
    <el-form ref="form" :model="data_info" label-width="100px">
      <!-- 查询条件 -->
      <el-form-item label="新闻标题">
        <el-input
          v-model="data_info.title"
          placeholder="请输入新闻标题"
        ></el-input>
      </el-form-item>
      <el-form-item label="封面地址">
        <el-input
          v-model="data_info.mainMediaUrl"
          placeholder="请输入封面URL"
        ></el-input>
      </el-form-item>
      <el-form-item label="主页显示">
        <el-select v-model="data_info.isStick" placeholder="请选择">
          <el-option label="是" :value="1"></el-option>
          <el-option label="否" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="新闻正文">
        <tinymceEditor
          v-model="data_info.content"
          :params="upParams"
        ></tinymceEditor>
      </el-form-item>

      <!-- 按钮组 -->
      <el-form-item>
        <el-button type="primary" @click="submitNews">发表</el-button>
        <el-button type="danger" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import tinymceEditor from "@/components/Tinymce/tinymce";
import { getDataDetails, updateDetails } from "@/utils/api/apis";

export default {
  mounted() {
    this.upParams.upLoadId = sessionStorage.getItem("userId");

    // 接收参数
    var caseID = this.$route.query.id;

    // 请求数据
    getDataDetails(this.model, this.control, 1, { caseID }, this);
  },
  components: {
    tinymceEditor,
  },
  data() {
    return {
      data_info: {},
      upParams: {
        upLoadId: "",
        typeName: "offical_case_article",
        remarks: "产品案例-插图",
      },

      model: "config",
      control: "case",
    };
  },

  methods: {
    // 提交修改
    submitNews() {
      updateDetails(
        this.model,
        this.control,
        1,
        this.data_info,
        this,
        "news_list"
      );
    },

    // 取消操作
    cancel() {
      this.$message({
        message: "取消操作",
      });
      this.$router.push("news_list");
    },
  },
};
</script>
