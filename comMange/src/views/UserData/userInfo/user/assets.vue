<template>
  <!-- 道具资产 -->
  <div id="assets" class="shadow_container">
    <div class="pageTitle">{{ nickname }}道具资产</div>

    <!-- 标签页 -->
    <el-tabs type="card" v-model="activeName">
      <el-tab-pane label="道具列表" name="funMyProps">
        <!-- 表格 -->
        <el-table :data="data_list" border style="width: 100%">
          <el-table-column
            prop="name"
            label="名称"
            width="120"
          ></el-table-column>

          <el-table-column prop="facadeImageID" label="缩略图" width="120">
            <template slot-scope="scope">
              <el-avatar
                :size="80"
                :src="scope.row.imgUrl"
                shape="square"
              ></el-avatar>
            </template>
          </el-table-column>

          <el-table-column prop="propType" label="类型" width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.propType == 0">道具</span>
              <span v-else-if="scope.row.propType == 1">宠物</span>
              <span v-else-if="scope.row.propType == 4">碎片</span>
              <span v-else-if="scope.row.propType == 5">配方</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="describe"
            label="描述"
            width="280"
          ></el-table-column>

          <el-table-column
            prop="number"
            label="数量"
            width="80"
          ></el-table-column>

          <el-table-column prop="isEnable" label="启用状态" width="100">
            <template slot-scope="scope">
              {{ scope.row.isEnable ? "启用" : "禁用" }}
            </template>
          </el-table-column>

          <el-table-column prop="isFrozen" label="是否冻结" width="100">
            <template slot-scope="scope">
              {{ scope.row.isFrozen ? "是" : "否" }}
            </template>
          </el-table-column>

          <el-table-column prop="useState" label="是否绑定" width="100">
            <template slot-scope="scope">
              {{ scope.row.useState ? "是" : "否" }}
            </template>
          </el-table-column>

          <el-table-column prop="auctionStatus" label="拍卖状态" width="100">
            <template slot-scope="scope">
              {{ scope.row.auctionStatus ? "拍卖" : "资产" }}
            </template>
          </el-table-column>

          <!-- <el-table-column prop="isAuctionPack" label="跟随拍卖" width="100">
             <template slot-scope="scope">
             <span v-if="scope.row.auctionStatus"> {{ scope.row.isAuctionPack ? "跟随" : "非跟随" }}</span>
             <span v-else>-</span>
            </template>
          </el-table-column> -->

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
                @click="showDetails(scope.row)"
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

    <!-- 弹出框 -->
    <el-dialog
      title="道具详情"
      :visible.sync="show_details"
      width="30%"
      @closed="clear"
    >
      <el-form label-width="80px">
        <el-form-item label="名称">
          {{ data_info.name }}
        </el-form-item>

        <el-form-item label="类型">
          <span v-if="data_info.propType == 0">道具</span>
          <span v-else-if="data_info.propType == 1">宠物</span>
          <span v-else-if="data_info.propType == 4">碎片</span>
          <span v-else-if="data_info.propType == 5">配方</span>
        </el-form-item>

        <el-form-item label="缩略图">
          <el-avatar
            :size="100"
            :src="data_info.imgUrl"
            shape="square"
          ></el-avatar>
        </el-form-item>

        <el-form-item label="描述">
          {{ data_info.describe }}
        </el-form-item>
      </el-form>
    </el-dialog>
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
import { createGet, spliceImg } from "@/utils/common";
export default {
  components: {
    Pagination,
  },
  mounted() {
    this.nickname = this.$route.query.name;
    this.customerID = this.$route.query.id;
    this.find_form = createGet();
    this.find_form.data.customerID = this.customerID;
    this.activeName = "funMyProps";
  },

  data() {
    return {
      activeName: "", // 激活标签
      customerID: "",
      nickname: "",
      data_list: [], // 数据列表
      data_info: {},
      log_list: [],
      find_form: {}, // 详情数据对象

      show_details: false,

      rpmtype: 2, // 物品类型 1优惠券 2道具 3虚拟房产

      model: "cusProp",
      control: "cusProp",
      operate: "",
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
      var list = this.control == "funMyProps" ? "data_list" : "log_list";
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

    // 展示详情
    showDetails(row) {
      this.show_details = true;
      this.data_info = { ...row };
    },

    // 清空
    clear() {
      this.data_info = {};
    },
  },

  watch: {
    // 监听变量以请求不同数据
    activeName(v) {
      this.operate = v;
      var list = this.operate == "funMyProps" ? "data_list" : "log_list";
      getDataList(
        this.model,
        this.control,
        1,
        this.find_form,
        this,
        list,
        this.operate
      );
    },

    data_list() {
      spliceImg(this.data_list, "facadeImageID", true);
    },
  },
};
</script>

<style></style>
