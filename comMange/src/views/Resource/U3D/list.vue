<template>
  <div id="ar_list" class="shadow_container">
    <!-- AR资源列表 -->
    <div class="pageTitle">
      AR资源列表
      <el-button type="primary" size="medium" @click="toUpload"
        >上转AR资源</el-button
      >
    </div>

    <!-- 查询表单 -->
    <el-form :model="find_form" class="find_form" label-width="100px">
      <!-- 查询条件 -->
      <el-form-item label="模型名称">
        <el-input v-model="find_form.data.showResourceName"></el-input>
      </el-form-item>
      <el-form-item label="是否禁用">
        <el-select v-model="find_form.data.isDelete" placeholder="启用状态">
          <el-option label="是" :value="1"></el-option>
          <el-option label="否" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上传用户">
        <el-input
          v-model="find_form.data.uploadID"
          placeholder="上传用户名"
        ></el-input>
      </el-form-item>

      <!-- 日期查询 -->
      <el-form-item label="上传时间" label-width="100px">
        <el-date-picker
          v-model="find_form.data.creationTime"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>

      <!-- 按钮组 -->
      <el-form-item>
        <el-button type="primary" @click="findData">查询</el-button>
        <el-button type="info" @click="resetForm">重置</el-button>
        <el-button type="danger" style="margin-left: 50px">批量删除</el-button>
      </el-form-item>
    </el-form>

    <!-- 数据列表 -->
    <el-table :data="data_list" tooltip-effect="dark" :border="true">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        prop="showResourceName"
        label="模型名称"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="uploadFileName"
        label="原文件名"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="storeFileName"
        label="存储文件名"
        width="150"
      ></el-table-column>
      <el-table-column prop="mainImageID" label="资源缩略图" width="120">
        <template slot-scope="scope">
          <el-avatar
            v-if="scope.row.mainImageID"
            :size="80"
            :src="fileUrl + 'ar2d/v1?Mark=' + scope.row.mainImageID"
            shape="square"
            fit="contain"
          ></el-avatar>
        </template>
      </el-table-column>
      <el-table-column
        prop="resExtName"
        label="资源后缀名"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="scene"
        label="业务场景"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="uploadUName"
        label="上传用户"
        width="100"
      ></el-table-column>
      <el-table-column prop="isDelete" label="是否禁用" width="100">
        <template slot-scope="scope">{{
          scope.row.isDelete ? "是" : "否"
        }}</template>
      </el-table-column>
      <el-table-column
        prop="describe"
        label="资源说明"
        width="250"
      ></el-table-column>
      <el-table-column
        prop="creationTime"
        label="上传时间"
        width="250"
      ></el-table-column>
      <el-table-column label="操作" width="220" fixed="right">
        <template slot-scope="scope">
          <el-button
            @click="disableRow(scope.row.resID)"
            type="danger"
            size="small"
            v-if="!scope.row.isDelete"
            >禁用</el-button
          >
          <el-button
            @click="enableRow(scope.row.resID)"
            type="success"
            size="small"
            v-if="scope.row.isDelete"
            >恢复</el-button
          >
          <el-link
            class="btn_link"
            type="primary"
            :href="fileUrl + 'aru3d/v1?Mark=' + scope.row.resID"
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
import {
  getFileList,
  downloadFile,
  disableFile,
  enableFile,
} from "@/utils/api/apis";
import { createGet, filteObj, spliceKey, spliceImg } from "@/utils/common";
export default {
  components: {
    Pagination,
  },

  mounted() {
    // 首次加载
    this.find_form = createGet(1, 10, "tableID desc");
    var form = { ...this.find_form };
    getFileList("u3dInfoList", 1, form, this);
  },

  data() {
    return {
      // 查找条件
      type: "ar",
      find_form: { data: {} },
      data_list: [], // 数据列表
      data_info: {}, // 详情数据对象
      isShowDetails: false, // 是否显示详情
      delType: 2,

      fileUrl: "https://api.resources.scmsar.com/file/download/",
    };
  },

  methods: {
    // 查询
    findData() {
      this.find_form.currPage = 1;
      var form = { ...this.find_form };
      form.data = { ...this.find_form.data };
      form.data = filteObj(form.data);
      // form.data = spliceKey(form.data);
      if (form.data.resExtName) {
        form.data.resExtName = "." + form.data.resExtName;
      }
      delete form.totalDataNum;
      getFileList("u3dInfoList", 1, form, this);
    },

    // 禁用文件
    disableRow(resID) {
      disableFile(2, 1, { resID }).then((res) => {
        switch (res.code) {
          case "000000":
            this.$message.info("已禁用");
            var form = { ...this.find_form };
            getFileList("u3dInfoList", 1, form, this);
            break;
        }
      });
    },

    // 恢复禁用
    enableRow(resId) {
      enableFile(2, 1, { resId }).then((res) => {
        switch (res.code) {
          case "000000":
            var form = { ...this.find_form };
            this.$message.success("恢复成功！");
            getFileList("u3dInfoList", 1, form, this);
            break;
        }
      });
    },

    // 跳转到上传页
    toUpload() {
      this.$router.push({
        path: "ar_upload",
      });
    },

    // 重置
    resetForm() {
      this.find_form.data = {};
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
      getFileList("u3dInfoList", 1, form, this);
    },
  },
};
</script>

<style lang="scss">
#ar_list {
  .find_form {
    .el-form-item {
      display: inline-block;
      .el-input,
      .el-select {
        width: 200px;
      }
    }
  }
}
</style>