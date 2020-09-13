<!-- 公告记录 -->
<template>
  <div id="notice_list" class="shadow_container">
    <div class="pageTitle">
      公告记录
      <el-button type="success" @click="toDetails(0)">发布公告</el-button>
    </div>

    <!-- 查询表单 -->
    <el-form label-width="60px">
      <el-form-item label="标题">
        <el-input v-model="find_form.data.title"></el-input>
        <el-button type="primary" style="margin-left:20px" @click="findData">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="data_list" style="width: 100%" border>
      <el-table-column prop="date" label="编号" width="180"></el-table-column>
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column prop="content" label="内容" width="250"></el-table-column>
      <el-table-column prop="ico" label="图标" width="120"></el-table-column>
      <el-table-column prop="type" label="类型" width="120"></el-table-column>
      <el-table-column prop="audience" label="受众类型" width="120"></el-table-column>
      <el-table-column prop="isPublish" label="是否公布" width="120"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间" width="180"></el-table-column>
      <el-table-column prop="issue" label="发布人" width="150"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" @click="toDetails(1,scope.row.noticeID)" size="small">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { createGet, filteObj } from "@/utils/common";
import { getDataList } from "@/utils/api/apis";
export default {
  mounted() {
    this.find_form = createGet();
    var form = { ...this.find_form };
    getDataList(this.model, this.control, 1, form, this, "data_list");
  },

  data() {
    return {
      find_form: { data: {} },
      data_list: [],

      model: "notify",
      control: "notice",
    };
  },

  methods: {
    // 跳转到详情页
    toDetails(type, id) {
      this.$router.push({
        path: "notice_details",
        query: { id },
      });
    },

    // 查询列表
    findData() {
      var form = filteObj({ ...this.find_form });
      getDataList(this.model, this.control, 1, form, this, "data_list");
    },
  },
};
</script>

<style lang="scss">
#notice_list {
  form {
    .el-input {
      width: 300px;
    }
  }
}
</style>