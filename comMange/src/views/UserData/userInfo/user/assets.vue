<template>
  <!-- 道具资产 -->
  <div id="assets" class="shadow_container">
    <div class="pageTitle">
      {{ nickname }}道具资产
      <el-button type="primary" size="small" @click="toDetails('auction')"
        >去拍卖行</el-button
      >
    </div>

    <!-- 标签页 -->
    <el-tabs type="card" v-model="activeName">
      <el-tab-pane label="道具列表" name="cusPropAsset">
        <!-- 表格 -->
        <el-table :data="data_list" border style="width: 100%">
          <el-table-column
            prop="assetID"
            label="资产ID"
            width="180"
          ></el-table-column>

          <el-table-column
            prop="propID"
            label="道具名称"
            width="180"
          ></el-table-column>

          <el-table-column
            prop="number"
            label="数量"
            width="100"
          ></el-table-column>

          <el-table-column prop="isFrozen" label="是否冻结" width="100">
            <template slot-scope="scope">
              {{ scope.row.isBind ? "是" : "否" }}
            </template>
          </el-table-column>

          <el-table-column prop="useState" label="使用状态" width="100">
          </el-table-column>

          <el-table-column
            prop="createTime"
            label="获取时间"
            width="180"
          ></el-table-column>

          <el-table-column prop="expireTime" label="有效期" width="200">
          </el-table-column>

          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="small"
                @click="showDetails(scope.row.dataId)"
                >详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="道具记录" name="cusPropLog">
        <!-- 表格 -->
        <el-table :data="log_list" border style="width: 100%">
          <el-table-column
            prop="assetID"
            label="资产ID"
            width="180"
          ></el-table-column>

          <el-table-column
            prop="changeActionID"
            label="道具变更ID"
            width="180"
          ></el-table-column>

          <el-table-column
            prop="changeTime"
            label="道具变更时间"
            width="180"
          ></el-table-column>

          <el-table-column
            prop="describe"
            label="变更描述"
            width="200"
          ></el-table-column>

          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="small"
                @click="showDetails(scope.row.dataId)"
                >详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!-- 分页 -->
    <Pagination
      :find="find_form"
      @sizeChange="pageChange('size', $event)"
      @currChange="pageChange('curr', $event)"
    ></Pagination>

    <!-- 按钮 -->
    <div class="bottom_btns">
      <el-button type="info" @click="cancel('user_details')">返回</el-button>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import {
  getDataList,
  getDetailsInfo,
  updateData,
  getData,
} from "@/utils/api/apis";
import { createGet } from "@/utils/common";
export default {
  components: {
    Pagination,
  },
  mounted() {
    this.nickname = this.$route.query.name;
    this.customerID = this.$route.query.id;
    this.find_form = createGet();
    this.find_form.data.customerID = this.customerID;
    this.activeName = "cusPropAsset";
  },

  data() {
    return {
      activeName: "", // 激活标签
      customerID: "",
      nickname: "",
      data_list: [], // 数据列表
      log_list: [],
      find_form: {}, // 详情数据对象

      show_details: false,

      rpmtype: 2, // 物品类型 1优惠券 2道具 3虚拟房产

      model: "cusProp",
      control: "",
    };
  },

  methods: {
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
      var list = this.control == "cusPropAsset" ? "data_list" : "log_list";
      getDataList(this.model, this.control, 1, this.find_form, this, list);
    },

    // 返回上一页
    cancel(path) {
      this.$router.push({
        path,
        query: {
          id: this.customerID,
        },
      });
    },

    // 跳转到拍卖行
    toDetails(path) {
      this.$router.push({
        path,
        query: { id: this.customerID },
      });
    },
  },

  watch: {
    // 监听变量以请求不同数据
    activeName(v) {
      this.control = v;
      var list = this.control == "cusPropAsset" ? "data_list" : "log_list";
      getDataList(this.model, this.control, 1, this.find_form, this, list);
    },
  },
};
</script>

<style></style>
