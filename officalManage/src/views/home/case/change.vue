<template>
  <div id="case_publish" class="container">
    <h1>修改案例</h1>
    <el-form ref="form" :model="form" label-width="100px">
      <!-- 查询条件 -->
      <el-form-item label="案例标题">
        <el-input v-model="form.title" placeholder="请输入案例标题"></el-input>
      </el-form-item>
      <el-form-item label="封面地址">
        <el-input
          v-model="form.mainMediaUrl"
          placeholder="请输入封面URL"
        ></el-input>
      </el-form-item>
      <el-form-item label="主页显示">
        <el-select v-model="form.isMainPage" placeholder="请选择">
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="案例正文">
        <tinymceEditor
          v-model="form.content"
          :params="upParams"
        ></tinymceEditor>
      </el-form-item>

      <!-- 按钮组 -->
      <el-form-item>
        <el-button type="primary" @click="submitCase">发表</el-button>
        <el-button type="danger" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import tinymceEditor from "@/components/Tinymce/tinymce";
import { getDetails, update } from "@/utils/api/api";

export default {
  mounted() {
    this.upParams.upLoadId = sessionStorage.getItem("userId");

    // 接收参数
    var caseId = this.$route.query;
    // 请求数据
    getDetails("case", caseId)
      .then((res) => {
        this.form = res;
      })
      .catch((err) => {});
  },
  components: {
    tinymceEditor,
  },
  data() {
    return {
      form: {},
      upParams: {
        upLoadId: "",
        typeName: "offical_case_article",
        remarks: "产品案例-插图",
      },
    };
  },

  methods: {
    // 提交修改
    submitCase() {
      update("case", this.form)
        .then((res) => {
          if (res == "1") {
            this.$message({
              type: "success",
              message: "修改成功！",
            });
            this.$router.push("case_list");
          }
        })
        .catch((err) => {});
    },

    // 取消操作
    cancel() {
      this.$message({
        message: "取消操作",
      });
      this.$router.push("case_list");
    },
  },
};
</script>
