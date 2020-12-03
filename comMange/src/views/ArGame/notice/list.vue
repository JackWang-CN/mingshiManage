<!-- 游戏公告 -->
<template>
  <div id="notice_list" class="shadow_container">
    <div class="pageTitle">
      游戏公告
      <el-button type="success" @click="toDetails(0)">新建公告</el-button>
    </div>

    <!-- 查询表单 -->
    <el-form label-width="80px">
      <el-form-item label="公告标题">
        <el-input v-model="find_form.data.title" clearable></el-input>
        <el-button type="primary" style="margin-left: 20px" @click="findData"
          >查询</el-button
        >
      </el-form-item>
    </el-form>

    <el-table :data="data_list" style="width: 100%" border>
      <el-table-column
        prop="noticeID"
        label="公告编号"
        width="180"
      ></el-table-column>

      <el-table-column
        prop="title"
        label="公告标题"
        width="180"
      ></el-table-column>

      <el-table-column prop="cityName" label="城市名称" width="120">
      </el-table-column>

      <el-table-column prop="activityName" label="活动名称" width="180">
      </el-table-column>

      <el-table-column
        prop="content"
        label="推送内容"
        width="250"
      ></el-table-column>

      <el-table-column prop="isPublish" label="公告状态" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.isPublish == 0">待发布</span>
          <span v-else-if="scope.row.isPublish == 1">已发布</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="publisherName"
        label="发布人"
        width="150"
      ></el-table-column>

      <el-table-column
        prop="updateTime"
        label="更新时间"
        width="180"
      ></el-table-column>

      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.isPublish == 0"
            type="warning"
            @click="toDetails(1, scope.row.noticeID)"
            size="small"
            >修改</el-button
          >
          <el-button
            v-if="scope.row.isPublish == 0"
            type="success"
            @click="publishMsg(scope.row.noticeID)"
            size="small"
            >发布</el-button
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
import { createGet, filteObj, spliceImg, hintMessage } from "@/utils/common";
import { getDataList, addData } from "@/utils/api/apis";
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

      model: "ARGame",
      control: "aRNotice",
    };
  },

  methods: {
    // 跳转到详情页
    toDetails(type, id) {
      this.$router.push({
        path: "gameNotice_details",
        query: { id },
      });
    },

    // 发布公告
    publishMsg(noticeID) {
      addData(this.model, this.control, 1, { noticeID }, "send").then((res) => {
        hintMessage(this, res);

        // 重新加载列表
        var form = { ...this.find_form };
        getDataList(this.model, this.control, 1, form, this, "data_list");
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

<style lang="scss">
#notice_list {
  form {
    .el-input {
      width: 300px;
    }
  }
}
</style>