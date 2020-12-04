<template>
  <div class="container" id="recruit_change">
    <h1>职位修改</h1>

    <!-- 查询表单 -->
    <el-form ref="form" :model="data_info" label-width="100px">
      <!-- 查询条件 -->
      <el-form-item label="职位名称">
        <el-input
          v-model="data_info.title"
          placeholder="请输入职位名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="工作经验">
        <el-select v-model="data_info.term" placeholder="请选择工作经验">
          <el-option label="1年以内" value="1年以内"></el-option>
          <el-option label="1~2年" value="1~2年"></el-option>
          <el-option label="2~3年" value="2~3年"></el-option>
          <el-option label="3年以上" value="3年以上"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工作地点">
        <el-select v-model="data_info.address" placeholder="请选择工作经验">
          <el-option label="成都" value="成都"></el-option>
          <el-option label="贵阳" value="贵阳"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="招聘人数">
        <el-input
          v-model="data_info.regmen"
          placeholder="请输入招聘人数"
        ></el-input>
      </el-form-item>
      <!-- 文本域 -->
      <div class="longText">
        <el-form-item label="岗位职责" style="display: block">
          <el-input
            type="textarea"
            :rows="2"
            v-model="data_info.duties"
            placeholder="请输入岗位职责"
          ></el-input>
        </el-form-item>
      </div>
      <div class="longText">
        <el-form-item label="岗位能力">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="data_info.power"
          ></el-input>
        </el-form-item>
      </div>
      <el-form-item label="联系方式">
        <el-input
          v-model="data_info.contact"
          placeholder="请输入联系方式"
        ></el-input>
      </el-form-item>
      <el-form-item label="企业邮箱">
        <el-input
          v-model="data_info.email"
          placeholder="请输入企业邮箱"
        ></el-input>
      </el-form-item>

      <!-- 日期查询 -->
      <div class="date_btn">
        <!-- 按钮组 -->
        <el-form-item>
          <el-button type="primary" @click="saveChange">保存修改</el-button>
          <el-button type="danger" @click="cancel">取消</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import { getDataDetails, updateDetails } from "@/utils/api/apis";
export default {
  mounted() {
    // 接收参数
    var recruitID = this.$route.query.id;
    getDataDetails(this.model, this.control, 1, { recruitID }, this);
  },
  data() {
    return {
      data_info: {},

      model: "config",
      control: "recruit",
    };
  },

  methods: {
    cancel() {
      this.$message.info("取消操作");
      this.$router.push("recruit_list");
    },

    // 保存修改
    saveChange() {
      updateDetails(
        this.model,
        this.control,
        1,
        this.data_info,
        this,
        "recruit_list"
      );
    },
  },
};
</script>

<style lang='scss'>
#recruit_change {
  form {
    width: 1800px;
    padding-top: 25px;
    padding-right: 25px;
    margin-bottom: 20px;
    box-shadow: 0 0 5px -2px;
    .el-form-item {
      display: inline-block;
    }
    .longText {
      .el-form-item {
        width: 100%;
        textarea {
          height: 200px;
          font-family: "微软雅黑";
          font-size: 15px;
          line-height: 30px;
        }
      }
    }
  }
}
</style>