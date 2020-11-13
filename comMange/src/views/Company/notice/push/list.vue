<template>
  <div id="push_list" class="shadow_container">
    <div class="pageTitle">
      推送记录
      <el-button type="success" @click="toDetails(0)">发布推送</el-button>
    </div>

    <!-- 查询表单 -->
    <el-form label-width="60px">
      <el-form-item label="标题">
        <el-input v-model="find_form.data.title"></el-input>
        <el-button type="primary" style="margin-left: 20px" @click="findData"
          >查询</el-button
        >
      </el-form-item>
    </el-form>

    <el-table :data="data_list" style="width: 100%" border>
      <el-table-column prop="infoID" label="编号" width="180"></el-table-column>
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column
        prop="content"
        label="内容"
        width="250"
      ></el-table-column>
      <el-table-column prop="ico" label="图标" width="120">
        <template slot-scope="scope">
          <el-avatar
            :size="70"
            :src="scope.row.imgUrl"
            shape="square"
          ></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 0">平台公告</span>
        </template>
      </el-table-column>
      <el-table-column prop="audience" label="受众类型" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.audience == 0">全体用户</span>
          <span v-else-if="scope.row.audience == 1">普通用户</span>
          <span v-else-if="scope.row.audience == 2">商户</span>
        </template></el-table-column
      >
      <el-table-column prop="isPublish" label="发布状态" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.isPublish == 0">待发布</span>
          <span v-else-if="scope.row.isPublish == 1">已发布</span>
          <span v-else-if="scope.row.isPublish == 2">已撤销</span>
        </template></el-table-column
      >
      <el-table-column
        prop="updateTime"
        label="更新时间"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="issue"
        label="发布人"
        width="150"
      ></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.isPublish == 0"
            type="warning"
            @click="toDetails(1, scope.row.infoID)"
            size="small"
            >修改</el-button
          >
          <el-button
            v-if="scope.row.isPublish == 0"
            type="success"
            @click="publishMsg(scope.row.infoID)"
            size="small"
            >发布</el-button
          >
          <el-button
            v-if="scope.row.isPublish == 1"
            type="danger"
            @click="repealMsg(scope.row.infoID)"
            size="small"
            >撤销</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <Pagination
      :find="find_form"
      @sizeChange="pageChange('size', $event)"
      @currChange="pageChange('curr', $event)"
    ></Pagination>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { createGet, filteObj, spliceImg } from "@/utils/common";
import { getDataList } from "@/utils/api/apis";
export default {
  components: {
    Pagination,
  },
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
      control: "pushInfo",
    };
  },

  methods: {
    // 跳转到详情页
    toDetails(type, id) {
      console.log(id);
      this.$router.push({
        path: "push_details",
        query: { id },
      });
    },

    // 查询列表
    findData() {
      var form = filteObj({ ...this.find_form });
      getDataList(this.model, this.control, 1, form, this, "data_list");
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
      var form = { ...this.find_form };
      getDataList(this.model, this.control, 1, form, this, "data_list");
    },
  },

  watch: {
    // 拼接图片url
    data_list() {
      this.data_list = spliceImg(this.data_list, "infoID");
    },
  },
};
</script>

<style lang='scss'>
#push_list {
  form {
    .el-input {
      width: 300px;
    }
  }
}
</style>