<template>
  <div id="ar_list" class="shadow_container">
    <!-- AR资源列表 -->
    <div class="pageTitle">
      AR资源列表
      <el-button type="primary" size="medium" @click="toUpload">上转AR资源</el-button>
    </div>

    <!-- 查询表单 -->
    <el-form :model="find_form" class="find_form" label-width="100px">
      <!-- 查询条件 -->
      <el-form-item label="文件后缀">
        <el-input v-model="find_form.data.resExtName" placeholder="如：jpg"></el-input>
      </el-form-item>
      <el-form-item label="是否禁用">
        <el-select v-model="find_form.data.isDelete" placeholder="请选择主分类">
          <el-option label="是" :value="1"></el-option>
          <el-option label="否" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上传用户">
        <el-input v-model="find_form.data.uploadId" placeholder="请输入上传用户ID"></el-input>
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
        <el-button type="danger" style="margin-left:50px">批量删除</el-button>
      </el-form-item>
    </el-form>

    <!-- 数据列表 -->
    <el-table :data="data_list" tooltip-effect="dark" :border="true">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="actuFileName" label="原文件名" width="150"></el-table-column>
      <el-table-column prop="storFileName" label="存储文件名" width="150"></el-table-column>
      <el-table-column prop="rpmico" label="资源缩略图" width="120">
        <template slot-scope="scope">
          <el-avatar :size="80" :src="scope.row.rpmico" shape="square"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="resExtName" label="资源后缀名" width="100"></el-table-column>
      <el-table-column prop="scene" label="业务场景" width="100"></el-table-column>
      <el-table-column prop="upLoadId" label="上传用户" width="100"></el-table-column>
      <el-table-column prop="isDelete" label="是否禁用" width="100">
        <template slot-scope="scope">{{scope.row.isDelete?'是':'否'}}</template>
      </el-table-column>
      <el-table-column prop="resNotes" label="资源说明" width="250"></el-table-column>
      <el-table-column prop="creationTime" label="上传时间" width="250"></el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-button @click="resource_update(scope.row)" type="primary" size="small">编辑</el-button>
          <el-button
            @click="delRow(scope.row.originally)"
            type="danger"
            size="small"
            v-if="!scope.row.isDelete"
          >禁用</el-button>
          <el-button
            @click="backDel(scope.row.originally)"
            type="warning"
            size="small"
            v-if="scope.row.isDelete"
          >恢复</el-button>
          <el-link class="btn_link" type="primary" :href="scope.row.resId">下载文件</el-link>
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
import { getFileList, downloadFile, delFile, backFile } from "@/utils/api/api";
import { createGet, filteObj, spliceKey } from "@/utils/common";
export default {
  components: {
    Pagination,
  },

  mounted() {
    // 首次加载
    this.find_form = createGet();
    var form = { ...this.find_form };
    getFileList(this.type, form, "data_list", this, "resId");
  },

  data() {
    return {
      // 查找条件
      type: "ar",
      find_form: {
        data: {},
      },
      data_list: [], // 数据列表
      data_info: {}, // 详情数据对象
      isShowDetails: false, // 是否显示详情
      delType: 2,
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
      getFileList(this.type, form, "data_list", this, "resId");
    },

    // 删除当前行
    delRow(resId) {
      delFile(this.delType, { resId }).then((res) => {
        this.$message.success("禁用成功！");
        var form = { ...this.find_form };
        getFileList(this.type, form, "data_list", this, "resId");
      });
    },

    // 恢复删除
    backDel(resId) {
      backFile({ resId }, true).then((res) => {
        this.$message.success("恢复成功！");
        var form = { ...this.find_form };
        getFileList(this.type, form, "data_list", this, "resId");
      });
    },

    // 跳转到上传页
    toUpload() {
      this.$router.push({
        path: "ar_upload",
      });
    },

    // 下载
    download(resId) {
      downloadFile(this.type, resId);
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
      getFileList(this.type, form, "data_list", this);
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