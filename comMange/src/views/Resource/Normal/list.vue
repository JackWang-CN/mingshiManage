<template>
  <div id="normal_list" class="shadow_container">
    <!-- 普通资源列表 -->
    <div class="pageTitle">普通资源列表</div>

    <!-- 查询表单 -->
    <el-form :model="find_form" class="find_form" label-width="80px">
      <!-- 查询条件 -->
      <el-form-item label="上传端" v-if="activeName!='company'">
        <el-select v-model="find_form.data.client" placeholder="用户/商户/公司">
          <el-option label="用户" :value="0"></el-option>
          <el-option label="商户" :value="1"></el-option>
          <el-option label="公司" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文件后缀">
        <el-input v-model="find_form.data.resExtName" placeholder="如：jpg"></el-input>
      </el-form-item>
      <el-form-item label="是否禁用" v-if="activeName =='user'">
        <el-select v-model="find_form.data.isDelete" placeholder="启用状态">
          <el-option label="是" :value="1"></el-option>
          <el-option label="否" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上传用户">
        <el-input v-model="find_form.data.uploadId" placeholder="上传用户ID"></el-input>
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
      </el-form-item>
    </el-form>

    <!-- 数据列表 -->
    <el-table :data="data_list" tooltip-effect="dark" :border="true">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="uploadFileName" label="原文件名" width="150"></el-table-column>
      <el-table-column prop="storeFileName" label="存储文件名" width="150"></el-table-column>
      <el-table-column prop="resExtName" label="资源后缀名" width="100"></el-table-column>
      <el-table-column prop="scene" label="业务场景" width="100"></el-table-column>
      <el-table-column prop="clientIdentity" label="上传端口" width="100"></el-table-column>
      <el-table-column prop="uploadID" label="上传用户" width="100"></el-table-column>
      <el-table-column prop="isDelete" label="是否禁用" width="100">
        <template slot-scope="scope">{{scope.row.isDelete?'是':'否'}}</template>
      </el-table-column>
      <el-table-column prop="describe" label="资源说明" width="250"></el-table-column>
      <el-table-column prop="creationTime" label="上传时间" width="250"></el-table-column>
      <el-table-column label="操作" width="210" fixed="right">
        <template slot-scope="scope">
          <el-button
            @click="disableRow(scope.row.resID)"
            type="danger"
            size="small"
            v-if="!scope.row.isDelete"
          >禁用</el-button>
          <el-button
            @click="enableRow(scope.row.resID)"
            type="success"
            size="small"
            v-if="scope.row.isDelete"
          >恢复</el-button>
          <el-link
            class="btn_link"
            type="primary"
            :href="fileUrl+'file/download/source/v1?Mark='+scope.row.resID"
          >下载文件</el-link>
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
import { createGet, filteObj, spliceKey } from "@/utils/common";
export default {
  components: {
    Pagination,
  },

  mounted() {
    this.find_form = createGet();
    // 首次加载
    this.activeName = "company";
  },

  data() {
    return {
      type: "normal",
      // 查找条件
      find_form: {
        data: {},
      },
      data_list: [], // 数据列表
      data_info: {}, // 详情数据对象
      isShowDetails: false, // 是否显示详情
      activeName: "",
      fileUrl: "https://api.resources.scmsar.com/",

      model: "file",
      control: "info",
    };
  },

  methods: {
    // 查询
    findData() {
      var form = { ...this.find_form };
      form.data = { ...this.find_form.data };
      form.data = filteObj(form.data);
      form.data = spliceKey(form.data);
      if (form.data.resExtName) {
        form.data.resExtName = "." + form.data.resExtName;
      }
      delete form.totalDataNum;
      getFileList(undefined, 1, form, this);
    },

    // 禁用文件
    disableRow(resID) {
      disableFile(1, 1, { resID }).then((res) => {
        switch (res.code) {
          case "000000":
            this.$message.info("已禁用");
            var form = { ...this.find_form };
            getFileList(undefined, 1, form, this);
            break;
        }
      });
    },

    // 恢复禁用
    enableRow(resId) {
      enableFile(1, 1, { resId }).then((res) => {
        switch (res.code) {
          case "000000":
            var form = { ...this.find_form };
            this.$message.success("恢复成功！");
            getFileList(undefined, 1, form, this);
            break;
        }
      });
    },

    // 重置
    resetForm() {
      this.find_form.data = { scene: "company" };
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
      getFileList(undefined, 1, form, this);
    },
  },

  watch: {
    //   监听激活页请求不同数据
    activeName() {
      var form = { ...this.find_form };
      getFileList(undefined, 1, form, this);
    },
  },
};
</script>

<style lang="scss">
#normal_list {
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