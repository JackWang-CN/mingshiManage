<!-- 商户管理-商户列表 -->
<template>
  <div id="version" class="shadow_container">
    <div class="pageTitle">
      版本控制
      <el-button type="success" @click="toDetails(0)">发布新版本</el-button>
    </div>

    <!-- 商户列表 -->
    <el-table :data="data_list" border>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        prop="versionName"
        label="当前版本号"
        width="120"
      ></el-table-column>

      <el-table-column
        prop="title"
        label="更新标题"
        width="120"
      ></el-table-column>
      <el-table-column label="缩略图" width="120">
        <template slot-scope="scope">
          <el-avatar
            :size="80"
            :src="scope.row.imgUrl"
            shape="square"
          ></el-avatar>
        </template>
      </el-table-column>

      <el-table-column prop="isRelase" label="发布状态" width="120">
        <template slot-scope="scope">
          {{ scope.row.isRelase ? "已发布" : "未发布" }}
        </template>
      </el-table-column>

      <el-table-column
        prop="content"
        label="更新描述"
        width="300"
      ></el-table-column>
      <el-table-column prop="device" label="更新设备" width="120">
      </el-table-column>

      <el-table-column
        prop="updateTime"
        label="更新时间"
        width="160"
      ></el-table-column>

      <el-table-column
        prop="relaseTime"
        label="版本公开时间"
        width="160"
      ></el-table-column>

      <el-table-column prop="audience" label="受众类型" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.audience == 0">全部用户</span>
          <span v-else-if="scope.row.audience == 2">未付费用户</span>
          <span v-else-if="scope.row.audience == 3">已付费用户</span>
          <span v-else-if="scope.row.audience == 100">全部商户</span>
        </template>
      </el-table-column>
      <el-table-column prop="isForce" label="强制更新" width="120">
        <template slot-scope="scope">
          {{ scope.row.isForce == "1" ? "是" : "否" }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.isRelase == 0"
            @click="toDetails(1, scope.row.versionID)"
            type="primary"
            size="small"
            >编辑</el-button
          >
          <el-button
            v-if="scope.row.isRelase == 0"
            @click="release(scope.row.versionID)"
            type="success"
            size="small"
            >发布</el-button
          >
          <el-link
            class="btn_link"
            type="primary"
            :href="fileUrl + 'file/download/source/v1?Mark=' + scope.row.resID"
            >下载文件</el-link
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
import { createGet, hintMessage, spliceImg } from "@/utils/common";
import { getDataList, updateData } from "@/utils/api/apis";
export default {
  components: {
    Pagination,
  },
  mounted() {
    // 首次加载
    this.find_form = createGet();
    var form = { ...this.find_form };
    getDataList(this.model, this.control, 1, form, this);
  },

  data() {
    return {
      // 查找条件
      find_form: {
        currPage: 1,
        pageSize: 10,
        data: {},
      },

      // 商户列表
      data_list: [],
      fileUrl: "https://api.resources.scmsar.com/",
      model: "config",
      control: "versionConfig",
    };
  },

  methods: {
    // 跳转到详情页
    toDetails(type, id) {
      if (type) {
        this.$router.push({
          path: "version_details",
          query: {
            id,
          },
        });
      } else {
        this.$router.push("version_details");
      }
    },

    // 删除当前行
    release(id) {
      updateData(this.model, this.control, 1, { versionID: id }, "relase").then(
        (res) => {
          hintMessage(this, res);
          var form = { ...this.find_form };
          getDataList(this.model, this.control, 1, form, this);
        }
      );
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
      delete form.totalDataNum;
      getDataList(this.model, this.control, 1, this.find_form, this);
    },
  },

  watch: {
    data_list() {
      this.data_list = spliceImg(this.data_list, "appLogo");
    },
  },
};
</script>

<style lang="scss">
#version {
  form {
    .el-form-item {
      display: inline-block;
    }
    .date_btn {
      div {
        vertical-align: middle;
      }
    }
  }
}
</style>
