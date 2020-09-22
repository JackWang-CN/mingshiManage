<!-- 商户管理-商户列表 -->
<template>
  <div id="version" class="shadow_container">
    <div class="pageTitle">
      版本控制
      <el-button type="primary" @click="toDetails(0)">发布新版本</el-button>
    </div>

    <!-- 商户列表 -->
    <el-table :data="data_list" border>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="versionNum" label="当前版本号" width="120"></el-table-column>
      <el-table-column prop="title" label="更新标题" width="120"></el-table-column>
      <el-table-column prop="content" label="更新描述" width="300"></el-table-column>
      <el-table-column prop="device" label="更新设备" width="120"></el-table-column>
      <el-table-column prop="resID" label="更新资源" width="120"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间" width="180"></el-table-column>
      <el-table-column prop="openTime" label="版本公开时间" width="120"></el-table-column>
      <el-table-column prop="prevVersionNum" label="上一版本号" width="120"></el-table-column>
      <el-table-column prop="audience" label="消息受众类型" width="300"></el-table-column>
      <el-table-column prop="isForce" label="强制更新" width="120">
        <template slot-scope="scope">
          {{
          scope.row.isForce == "1" ? "是" : "否"
          }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="toDetails(1,scope.row.versionID)" type="primary" size="small">编辑</el-button>
          <el-button @click="delRow(scope.row.versionID)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { createGet } from "@/utils/common";
import { getDataList, delData } from "@/utils/api/apis";
export default {
  mounted() {
    // 首次加载
    this.find_form = createGet();
    var form = { ...this.find_form };
    getDataList(this.model, this.control, 1, form, this, "data_list");
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
    delRow(id) {
      delData(this.model, this.control, 1, { versionID: id }).then((res) => {
        switch (res.code) {
          case "000000":
            this.$message.success("删除成功！");
            var form = { ...this.find_form };
            getDataList(this.model, this.control, 1, form, this);
            break;
        }
      });
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
