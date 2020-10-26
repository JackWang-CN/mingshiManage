<!-- 我的广告 -->
<template>
  <div id="advertising" class="shadow_container">
    <div class="pageTitle">
      我的广告
      <el-button type="success" size="medium" @click="toDetails()"
        >添加</el-button
      >
    </div>
    <!-- 查询表单 -->
    <el-form ref="find_form" :model="find_form" label-width="100px">
      <!-- 查询条件 -->
      <el-form-item label="广告编号">
        <el-input
          v-model="find_form.data.reqId"
          placeholder="请输入广告编号"
        ></el-input>
      </el-form-item>

      <el-form-item label="广告状态">
        <el-select v-model="find_form.data.reqStatus" placeholder="请选择状态">
          <el-option label="启用" :value="0"></el-option>
          <el-option label="禁用" :value="1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="创建时间" label-width="100px">
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
        <el-button type="primary" @click="findList" :disabled="btn_status"
          >查询</el-button
        >
        <el-button type="info" @click="resetForm">重置</el-button>
        <el-button type="danger" @click="delList" style="margin-left: 50px"
          >批量删除</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 广告列表 -->
    <el-table
      :data="data_list"
      tooltip-effect="dark"
      :border="true"
      @selection-change="select"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        prop="reqId"
        label="编号"
        width="200"
        sortable
      ></el-table-column>
      <el-table-column
        prop="desInfo"
        label="描述"
        width="250"
      ></el-table-column>
      <el-table-column prop="reqStatus" label="状态" width="100">
        <template slot-scope="scope">
          {{ scope.row.reqStatus ? "禁用" : "启用" }}
        </template>
      </el-table-column>
      <el-table-column
        prop="creationTime"
        label="创建时间"
        width="200"
      ></el-table-column>
      <el-table-column prop="adUrl" label="资源地址" width="130">
        <template slot-scope="scope">
          <el-avatar
            :size="100"
            :src="scope.row.adUrl"
            shape="square"
          ></el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="toDetails(scope.row.reqId)"
            type="primary"
            size="small"
            >编辑</el-button
          >
          <el-button @click="delRow(scope.row.reqId)" type="danger" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页插件 -->
    <pagination
      :find="find_form"
      @sizeChange="pageChange('size', $event)"
      @currChange="pageChange('curr', $event)"
    ></pagination>
  </div>
</template>

<script>
import { getDataList, delData, updateDataList } from "@/utils/api/apis";
import { createGet, filteObj, spliceKey } from "@/utils/common";
import pagination from "@/components/Pagination";

export default {
  components: {
    pagination,
  },
  mounted() {
    // 首次加载
    getDataList(
      this.$vision.merchant,
      "Meraddata",
      createGet(1, 10),
      "data_list",
      this
    );
  },

  data() {
    return {
      find_form: {
        currPage: 1,
        pageSize: 10,
        data: {},
        totalDataNum: 0,
      },
      data_list: [],
      select_list: [],
      btn_status: false,
    };
  },
  methods: {
    // 跳转到详情页
    toDetails(id) {
      this.$router.push({
        path: "adv_details",
        query: { id },
      });
    },

    // pageSize改变时触发
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
      getDataList(
        this.$vision.merchant,
        "Meraddata",
        form,
        "data_list",
        this,
        null
      );
    },

    // 删除当前
    delRow(reqId) {
      var obj = { reqId };
      delData(this.$vision.merchant, "Meraddata", "del", obj).then((res) => {
        if (res) {
          this.$message.success("删除成功！");
          getDataList(
            this.$vision.merchant,
            "Meraddata",
            createGet(1, 10),
            "data_list",
            this
          );
        }
      });
    },
    // 删除批量
    delList() {
      if (this.select_list.length) {
        delData(
          this.$vision.merchant,
          "Meraddata",
          "delList",
          this.select_list
        ).then((res) => {
          if (res) {
            this.$message.success("删除成功！");
            getDataList(
              this.$vision.merchant,
              "Meraddata",
              this.find_form,
              "data_list",
              this
            );
          }
        });
      } else {
        this.$message.error("请勾选至少一项");
        return;
      }
    },

    // 查询
    findList() {
      this.btn_status = true;
      setTimeout(() => {
        this.btn_status = false;
      }, 500);

      var form = { ...this.find_form };
      form.data = filteObj(form.data);
      form.data = spliceKey(form.data);
      getDataList(
        this.$vision.merchant,
        "Meraddata",
        form,
        "data_list",
        this,
        "btn_status"
      );
    },

    // 重置
    resetForm() {
      this.find_form = {
        currPage: 1,
        pageSize: 10,
        data: {},
      };
    },

    // 获取选中项
    select(list) {
      this.select_list = list.map((item) => {
        return { reqId: item.reqId };
      });
    },
  },
};
</script>

<style lang="scss">
#advertising {
  // 查询表单
  form {
    .el-form-item {
      display: inline-block;
    }
  }
}
</style>
