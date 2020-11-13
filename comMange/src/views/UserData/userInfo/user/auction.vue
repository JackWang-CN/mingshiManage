<template>
  <!-- 拍卖行 -->
  <div id="auction" class="shadow_container">
    <div class="pageTitle">
      拍卖行
      <el-button type="primary" size="small" @click="toDetails('assets')">查看资产</el-button>
    </div>

    <!-- 标签页 -->
    <el-tabs type="card" v-model="activeName">
      <el-tab-pane label="用户上架道具" name="Auctiondata"></el-tab-pane>
      <el-tab-pane label="用户购买道具" name="Auctraderec"></el-tab-pane>
      <!-- <el-tab-pane label="交易记录" name="Auctraderec"></el-tab-pane> -->
    </el-tabs>

    <!-- 表格 -->
    <el-table :data="data_list" border style="width: 100%" @selection-change="select">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="aname" label="物品名称" width="120"></el-table-column>
      <el-table-column label="道具类型" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.rpmtype == 1">优惠券</span>
          <span v-else-if="scope.row.rpmtype == 2">道具</span>
          <span v-else-if="scope.row.rpmtype == 3">虚拟房产</span>
        </template>
      </el-table-column>
      <el-table-column prop="rpmico" label="资源缩略图" width="120">
        <template slot-scope="scope">
          <el-avatar :size="80" :src="scope.row.rpmico" shape="square"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="anum" label="数量" width="90"></el-table-column>
      <el-table-column prop="aunitp" label="单价" width="90"></el-table-column>
      <el-table-column prop="infoDes" label="信息简述" width="200"></el-table-column>
      <el-table-column prop="expireTime" label="到期时间" width="180"></el-table-column>
      <el-table-column prop="tradePrice" label="交易价格" width="120"></el-table-column>
      <el-table-column prop="listingTime" label="上架时间" width="180"></el-table-column>
      <el-table-column prop="dismountTime" label="下架时间" width="180"></el-table-column>
      <el-table-column prop="currentState" label="当前状态" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.currentState == 0" class="warning">拍卖中</span>
          <span v-else-if="scope.row.currentState == 1" class="danger">已下架</span>
          <span v-else-if="scope.row.currentState == 2" class="success">已卖出</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="warning" size="small" @click="showDetails(scope.row.dataId)">详情</el-button>
          <el-button
            @click="downShelf(scope.row)"
            type="danger"
            size="small"
            v-if="scope.row.currentState == 0"
          >下架</el-button>
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
      <el-button type="info" @click="cancel('user_details')">返回</el-button>
    </div>

    <!-- 弹出框 -->
    <el-dialog :visible.sync="isShowDetails">
      <el-form label-width="100px">
        <el-form-item label="物品名称">{{ data_info.aname }}</el-form-item>
        <el-form-item label="剩余数量">{{ data_info.anum }}</el-form-item>
        <el-form-item label="单价">{{ data_info.aunitp }}</el-form-item>
        <el-form-item label="信息简述">{{ data_info.infoDes }}</el-form-item>
        <el-form-item label="交易价格">{{ data_info.tradePrice }}</el-form-item>
        <el-form-item label="拍卖数据ID">{{ data_info.dataId }}</el-form-item>
        <el-form-item label="道具ID">{{ data_info.assetsId }}</el-form-item>
        <el-form-item label="资源ID">{{ data_info.resId }}</el-form-item>
        <el-form-item label="道具类型">{{ data_info.rpmtype }}</el-form-item>
        <el-form-item label="资源缩略图">
          <el-avatar :size="80" :src="data_info.rpmico" shape="square"></el-avatar>
        </el-form-item>
        <el-form-item label="拥有人ID">{{ data_info.owner }}</el-form-item>
        <el-form-item label="上架时间">
          {{
          data_info.listingTime
          }}
        </el-form-item>
        <el-form-item label="下架时间">
          {{
          data_info.dismountTime
          }}
        </el-form-item>
        <el-form-item label="到期时间">{{ data_info.expireTime }}</el-form-item>
        <el-form-item label="当前状态">
          <span v-if="data_info.currentState == 0">拍卖中</span>
          <span v-else-if="data_info.currentState == 1">已下架</span>
          <span v-else-if="data_info.currentState == 2">已卖出</span>
        </el-form-item>
        <el-form-item label="创建时间">
          {{
          data_info.creationTime
          }}
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="isShowDetails = false">关闭</el-button>
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
    this.activeName = "Auctiondata";
  },
  data() {
    return {
      find_form: {},
      data_list: [], // 数据列表
      activeName: "", // 激活标签
      data_info: {}, // 详情数据对象
      userId: "",

      isShowDetails: false, // 弹出框显隐
    };
  },

  methods: {
    // 获取选中项
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
        "rpmico"
      );
    },

    // 返回上一页
    cancel(path) {
      this.$router.push({
        path,
        query: {
          id: this.find_form.data.owner,
        },
      });
    },

    // 查看详情
    showDetails(dataId) {
      this.isShowDetails = true;
      var form = { dataId };
      getDetailsInfo(
        this.$vision.user,
        this.activeName,
        form,
        "data_info",
        this,
        "rpmico"
      );
    },

    // 拍卖品下架
    downShelf(row) {
      var { assetsId, owner } = row;
      var form = {
        owner,
        dataId: assetsId,
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

    // 跳转到详情页
    toDetails(path) {
      this.$router.push({
        path,
        query: { id: this.userId },
      });
    },
  },

  watch: {
    // 监听变量以请求不同数据
    activeName() {
      switch (this.activeName) {
        case "Auctiondata":
          this.find_form.data = { owner: this.userId };
          break;
        case "Auctraderec":
          this.find_form.data = { trader: this.userId };
          break;
      }
      getDataList(
        this.$vision.user,
        this.activeName,
        this.find_form,
        "data_list",
        this,
        null,
        "rpmico"
      );
    },
  },
};
</script>

<style lang="scss"></style>
