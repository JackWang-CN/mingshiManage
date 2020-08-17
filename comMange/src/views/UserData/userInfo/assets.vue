<template>
  <!-- 道具资产 -->
  <div id="assets" class="shadow_container">
    <div class="pageTitle">
      个人资产
      <el-button type="primary" size="small" @click="toDetails('auction')"
        >去拍卖行</el-button
      >
    </div>

    <!-- 标签页 -->
    <el-tabs type="card" v-model="activeName" @tab-click="switchTab">
      <el-tab-pane label="个人道具" name="Asset" :rpmtype="2"></el-tab-pane>
      <el-tab-pane
        label="优惠券"
        name="PersonalCoupon"
        :rpmtype="1"
      ></el-tab-pane>
      <el-tab-pane
        label="个人房产"
        name="SpaHousePro"
        :rpmtype="3"
      ></el-tab-pane>
    </el-tabs>

    <!-- 表格 -->

    <el-table
      :data="data_list"
      border
      style="width: 100%"
      @selection-change="select"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        prop="aId"
        label="道具资产表id"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="assName"
        label="道具名称"
        width="120"
      ></el-table-column>
      <el-table-column prop="resId" label="道具图片" width="150">
        <template slot-scope="scope">
          <el-avatar
            :size="80"
            :src="scope.row.resId"
            shape="square"
          ></el-avatar>
        </template>
      </el-table-column>
      <el-table-column
        prop="number"
        label="拥有数量"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="getFrom"
        label="获得途径"
        width="200"
      ></el-table-column>
      <el-table-column prop="isBind" label="是否绑定" width="100">
        <template slot-scope="scope">{{
          scope.row.isBind ? "是" : "否"
        }}</template>
      </el-table-column>
      <el-table-column prop="isFrozen" label="道具状态" width="90">
        <template slot-scope="scope">
          <span v-if="scope.row.isFrozen == 0" class="primary">正常</span>
          <span v-else-if="scope.row.isFrozen == 1" class="warning"
            >拍卖中</span
          >
          <span v-else-if="scope.row.isFrozen == 2" class="success"
            >使用中</span
          >
        </template>
      </el-table-column>
      <el-table-column prop="isForever" label="期限" width="200">
        <template slot-scope="scope">{{
          scope.row.isForever ? scope.row.isForever : "永久"
        }}</template>
      </el-table-column>
      <el-table-column
        prop="creationtime"
        label="创建日期"
        width="180"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="warning"
            size="small"
            @click="showDetails(scope.row.dataId)"
            >详情</el-button
          >
          <el-button
            @click="downShelf(scope.row)"
            type="danger"
            size="small"
            v-if="scope.row.isBind == 0 && scope.row.isFrozen == 1"
            >下架</el-button
          >
          <el-button
            @click="upShelf(scope.row)"
            type="primary"
            size="small"
            v-if="scope.row.isBind == 0 && scope.row.isFrozen == 0"
            >上架</el-button
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

    <!-- 按钮 -->
    <div class="bottom_btns">
      <el-button type="info" @click="cancel('userdata_userDetails')"
        >返回</el-button
      >
    </div>

    <!-- 上架弹出框 -->
    <el-dialog :visible.sync="isShowDetails">
      <el-form label-width="100px">
        <el-form-item label="物品名称">{{ up_form.assName }}</el-form-item>
        <el-form-item label="售价">
          <el-input v-model="up_form.aunitp"></el-input>
        </el-form-item>
        <el-form-item label="上架期限"></el-form-item>
        <el-form-item label="上架数量"></el-form-item>
        <el-form-item>
          <el-button @click="sendSubmit" type="primary">提交</el-button>
          <el-button @click="isShowDetails = false">取消</el-button>
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
} from "@/utils/api/api";
import { createGet } from "@/utils/common";
export default {
  components: {
    Pagination,
  },
  mounted() {
    this.userId = this.$route.query.id;
    this.find_form = createGet();
    this.find_form.data.userId = this.userId;
    this.activeName = "Asset";
  },

  data() {
    return {
      activeName: "", // 激活标签
      userId: "",
      data_list: [], // 数据列表
      find_form: {}, // 详情数据对象
      up_form: {}, // 上架信息对象

      isShowDetails: false,

      rpmtype: 2, // 物品类型 1优惠券 2道具 3虚拟房产
    };
  },

  methods: {
    select() {},

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
      getDataList(
        this.$vision.user,
        this.activeName,
        form,
        "data_list",
        this,
        null,
        "resId"
      );
    },

    // 返回上一页
    cancel(path) {
      this.$router.push({
        path,
        query: {
          id: this.userId,
        },
      });
    },

    // 物品上架-1.显示弹出框
    upShelf(row) {
      var { aId, userId, assName } = row;
      this.up_form = {
        assName,
        dataId: aId,
        owner: userId,
        rpmtype: this.rpmtype,
        aunitp: 0,
      };
      this.isShowDetails = true;
    },
    // 物品上架-2.确认上架
    sendSubmit() {
      getData(
        this.$vision.user,
        "Auctiondata",
        "onTheShelf",
        this.up_form
      ).then((res) => {
        this.isShowDetails = false;
        this.$message.success("道具上架成功！");
        getDataList(
          this.$vision.user,
          this.activeName,
          this.find_form,
          "data_list",
          this,
          null,
          "resId"
        );
      });
    },

    // 拍卖品下架
    downShelf(row) {
      var { aId, userId } = row;
      var form = {
        owner: userId,
        dataId: aId,
      };
      getData(this.$vision.user, "Auctiondata", "offTheShelf", form).then(
        (res) => {
          this.$message.info("道具已下架！");
          getDataList(
            this.$vision.user,
            this.activeName,
            this.find_form,
            "data_list",
            this,
            null,
            "resId"
          );
        }
      );
    },

    // 跳转到拍卖行
    toDetails(path) {
      this.$router.push({
        path,
        query: { id: this.userId },
      });
    },

    // 切换标签页
    switchTab(tab) {
      this.rpmtype = tab.$attrs.rpmtype;
    },
  },

  watch: {
    // 监听变量以请求不同数据
    activeName() {
      getDataList(
        this.$vision.user,
        this.activeName,
        this.find_form,
        "data_list",
        this,
        null,
        "resId"
      );
    },
  },
};
</script>

<style></style>
