<!-- 活动列表 -->
<template>
  <div id="activity_list" class="shadow_container">
    <div class="pageTitle">
      活动列表
      <el-button type="success" @click="toDetails()">创建活动</el-button>
    </div>

    <!-- tab分页 -->
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="进行中活动" name="0"></el-tab-pane>
      <el-tab-pane label="历史活动" name="1"></el-tab-pane>
    </el-tabs>

    <!-- 查询条件 -->
    <el-form
      ref="find_form"
      class="find_form"
      :model="find_form"
      label-width="80px"
    >
      <el-form-item label="活动名称" label-width="100px">
        <el-input
          v-model="find_form.data.name"
          placeholder="请输入活动名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="活动类型" label-width="100px">
        <el-select
          v-model="find_form.data.activityTypeID"
          placeholder="请选择活动类型"
        >
          <el-option label="全部" value></el-option>
          <el-option
            v-for="type in type_list"
            :key="type.typeID"
            :label="type.name"
            :value="type.typeID"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="findData">查询</el-button>
        <el-button type="info" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 数据列表 -->
    <el-table :data="data_list" border>
      <el-table-column
        prop="merchantName"
        label="商户名称"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="活动名称"
        width="200"
      ></el-table-column>
      <el-table-column prop="activityIcoID" label="活动图标" width="120">
        <template slot-scope="scope">
          <el-avatar
            :size="80"
            :src="scope.row.imgUrl"
            shape="square"
          ></el-avatar>
        </template>
      </el-table-column>
      <el-table-column
        prop="activityTypeName"
        label="活动类型"
        width="120"
      ></el-table-column>
      <el-table-column prop="isEnable" label="状态" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.isEnable == 1">正常</span>
          <span v-else-if="scope.row.isEnable == 2">已过期</span>
          <span v-else>停止</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="describe"
        label="活动描述"
        width="300"
      ></el-table-column>
      <el-table-column
        prop="startTime"
        label="开始时间"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="endTime"
        label="结束时间"
        width="180"
      ></el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button @click="showDetails(scope.row)" type="primary" size="small"
            >详情</el-button
          >
          <el-button
            v-if="scope.row.isEnable == 1"
            @click="switchState('closeTheActivity', scope.row.activityID)"
            type="danger"
            size="small"
            >停止</el-button
          >
          <el-button
            v-else-if="scope.row.isEnable == 0"
            @click="switchState('launchActivities', scope.row.activityID)"
            type="success"
            size="small"
            >启动</el-button
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

    <!-- 弹出框 -->
    <el-dialog title="道具详情" :visible.sync="show_details" width="50%">
      <el-form label-width="100px">
        <el-form-item label="商户名称">{{
          data_info.merchantName
        }}</el-form-item>
        <el-form-item label="活动名称">{{ data_info.name }}</el-form-item>
        <el-form-item label="活动类型">{{
          data_info.activityTypeName
        }}</el-form-item>
        <el-form-item label="活动描述">{{ data_info.describe }}</el-form-item>
        <el-form-item label="状态">{{ data_info.isEnable }}</el-form-item>
        <el-form-item label="开始时间">{{ data_info.startTime }}</el-form-item>
        <el-form-item label="结束时间">{{ data_info.endTime }}</el-form-item>
        <el-form-item label="活动图标">
          <el-avatar
            :size="120"
            :src="data_info.imgUrl"
            shape="square"
          ></el-avatar>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="show_details = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { getDataDetail, getDataList, updateData } from "@/utils/api/apis";
import {
  createGet,
  filteObj,
  spliceKey,
  spliceImg,
  hintMessage,
} from "@/utils/common";
export default {
  components: {
    Pagination,
  },
  mounted() {
    // 首次加载
    this.find_form = createGet();
    var form = { ...this.find_form };

    // 请求活动类型列表
    getDataList(
      this.model,
      this.model + "Type",
      1,
      createGet(1, 999),
      this,
      "type_list",
      "activityTypeList"
    );

    var { tab } = this.$route.params;
    this.activeName = tab || "0";
  },

  data() {
    return {
      // 查找条件
      find_form: { data: {} },
      data_list: [], // 数据列表
      data_info: {}, // 详情数据对象
      type_list: [],

      activeName: "",
      show_details: false,
      model: "activity",
      control: "activityManage",
      operate: "getMerActivityList",
    };
  },

  methods: {
    // 查询
    findData() {
      getDataList(
        this.model,
        this.control,
        1,
        this.find_form,
        this,
        "data_list",
        this.operate
      );
    },

    // 展示详情
    showDetails(row) {
      var { assetsId } = row;
      // 1.打开模态框
      this.show_details = true;
      // 2.请求详情数据并渲染
      this.data_info = { ...row };
    },

    // 跳转到详情页
    toDetails(id) {
      this.$router.push({
        path: "activity_details",
        query: { id, type: this.activeName },
      });
    },

    // 发布或停止活动
    switchState(operate, activityID) {
      updateData(
        this.model,
        this.control,
        1,
        { activityID, openType: 0 },
        operate
      ).then((res) => {
        hintMessage(this, res);
        getDataList(
          this.model,
          this.control,
          1,
          this.find_form,
          this,
          "data_list",
          this.operate
        );
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
      getDataList(
        this.model,
        this.control,
        1,
        this.find_form,
        this,
        "data_list",
        this.operate
      );
    },
  },

  watch: {
    // 监听tab切换
    activeName() {
      this.find_form = createGet();
      this.find_form.data.isHistory = this.activeName;
      getDataList(
        this.model,
        this.control,
        1,

        this.find_form,
        this,
        "data_list",
        this.operate
      );
    },

    // 拼接图片url
    data_list() {
      this.data_list = spliceImg(this.data_list, "activityIcoID");
    },
  },
};
</script>

<style lang="scss">
#activity_list {
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
