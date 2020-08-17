<!-- 拍卖列表 -->
<template>
  <div id="store" class="shadow_container">
    <div class="pageTitle">拍卖列表</div>
    <!-- 查询条件 -->
    <el-form ref="find_form" class="find_form" :model="find_form" label-width="80px">
      <el-form-item label="物品名称" label-width="100px">
        <el-input v-model="find_form.data.aname" placeholder="请输入拍卖品名称"></el-input>
      </el-form-item>
      <el-form-item label="道具类型" label-width="100px">
        <el-select v-model="find_form.data.rpmtype" placeholder="请选择道具类型">
          <el-option label="优惠券" value="1"></el-option>
          <el-option label="道具" value="2"></el-option>
          <el-option label="虚拟房产" value="3"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="拍品单价" label-width="100px">
        <el-input v-model="find_form.data.aunitp" placeholder="请输入拍卖品单价"></el-input>
      </el-form-item>
      <el-form-item label="卖家昵称" label-width="100px">
        <el-input v-model="find_form.data.owner"></el-input>
      </el-form-item>

      <el-form-item label="当前状态" label-width="100px">
        <el-select v-model="find_form.data.currentState">
          <el-option label="拍卖中" :value="0"></el-option>
          <el-option label="已下架" :value="1"></el-option>
          <el-option label="已卖出" :value="2"></el-option>
        </el-select>
      </el-form-item>

      <!-- 日期查询 -->
      <el-form-item label="上架时间" label-width="100px">
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

      <el-form-item>
        <el-button type="primary" @click="findData">查询</el-button>
        <el-button type="info" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 数据列表 -->
    <el-table :data="data_list" border style="width: 100%">
      <el-table-column prop="aname" label="拍品名称" width="150"></el-table-column>
      <el-table-column prop="currentState" label="当前状态" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.currentState==0">拍卖中</span>
          <span v-else-if="scope.row.currentState==1">已下架</span>
          <span v-else-if="scope.row.currentState==2">已卖出</span>
        </template>
      </el-table-column>
      <el-table-column prop="rpmtype" label="道具类型" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.rpmtype==1">优惠券</span>
          <span v-else-if="scope.row.rpmtype==2">道具</span>
          <span v-else-if="scope.row.rpmtype==3">虚拟房产</span>
        </template>
      </el-table-column>
      <el-table-column prop="rpmico" label="拍品图片" width="120">
        <template slot-scope="scope">
          <el-avatar :size="80" :src="scope.row.rpmico" shape="square"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="anum" label="剩余数量" width="120"></el-table-column>
      <el-table-column prop="aunitp" label="单价" width="120"></el-table-column>
      <el-table-column prop="infoDes" label="拍品描述" width="200"></el-table-column>
      <el-table-column prop="listingTime" label="上架时间" width="160"></el-table-column>
      <el-table-column prop="dismountTime" label="下架时间" width="160"></el-table-column>
      <el-table-column prop="expireTime" label="到期时间" width="160"></el-table-column>
      <el-table-column prop="creationtime" label="创建时间" width="160"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="showDetails(scope.row)" type="primary" size="small">详情</el-button>
          <el-button @click="switchState(scope.row)" type="warning" size="small">下架</el-button>
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
    <el-dialog title="道具详情" :visible.sync="isShowDetails" width="50%">
      <el-form label-width="100px">
        <el-form-item label="物品名称">{{data_info.aname}}</el-form-item>
        <el-form-item label="道具类型">{{data_info.rpmtype}}</el-form-item>
        <el-form-item label="拍卖数量">{{data_info.anum}}</el-form-item>
        <el-form-item label="拍品单价">{{data_info.aunitp}}</el-form-item>
        <el-form-item label="拍品描述">{{data_info.infoDes}}</el-form-item>
        <el-form-item label="上架时间">{{data_info.listingTime}}</el-form-item>
        <el-form-item label="到期时间">{{data_info.expireTime}}</el-form-item>
        <el-form-item label="卖家昵称">{{data_info.owner}}</el-form-item>
        <el-form-item label="道具图片">
          <el-avatar :size="80" :src="data_info.rpmico" shape="square"></el-avatar>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="isShowDetails = false">关闭</el-button>
      </span>
    </el-dialog>

    <el-dialog title="下架理由" :visible.sync="isShowShelf">
      <el-input type="textarea" :rows="3" v-model="data_shelf.remarks"></el-input>
      <span slot="footer">
        <el-button @click="offShelf" type="primary">确定</el-button>
        <el-button @click="isShowShelf = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { getData, getDataList, getDetailsInfo } from "@/utils/api/api";
import { createGet, filteObj, spliceKey } from "@/utils/common";
export default {
  components: {
    Pagination,
  },
  mounted() {
    // 首次加载
    this.find_form = createGet();
    var form = { ...this.find_form };
    getDataList(
      this.$vision.user,
      this.control,
      form,
      "data_list",
      this,
      null,
      "rpmico"
    );
  },

  data() {
    return {
      // 查找条件
      find_form: {
        data: {},
      },
      control: "Auctiondata",
      data_list: [], // 数据列表
      data_info: {}, // 详情数据对象
      data_shelf: {}, // 下架操作
      isShowDetails: false, // 是否显示详情
      isShowShelf: false, // 是否显示下架弹窗
    };
  },

  methods: {
    // 查询
    findData() {
      var form = { ...this.find_form };
      form.data = { ...this.find_form.data };
      form.data = filteObj(form.data);
      form.data = spliceKey(form.data);
      getDataList(
        this.$vision.user,
        this.control,
        form,
        "data_list",
        this,
        null,
        "rpmico"
      );
    },

    // 展示详情
    showDetails(row) {
      var { assetsId } = row;
      // 1.打开模态框
      this.isShowDetails = true;
      // 2.请求详情数据并渲染
      getDetailsInfo(
        this.$vision.user,
        this.control,
        { assetsId },
        "data_info",
        this,
        "rpmico"
      );
    },

    // 点击下架
    switchState(row) {
      var { owner, assetsId } = row;
      // 1.打开模态框 2.填写下架理由 3.提交关闭模态框并重新加载
      this.isShowShelf = true;
      this.data_shelf.owner = owner;
      this.data_shelf.dataId = assetsId;
    },

    // 提交下架操作
    offShelf() {
      this.isShowShelf = false;
      getData(
        this.$vision.user,
        this.control,
        "offTheShelf",
        this.data_shelf
      ).then((res) => {
        this.$message.success("下架成功！");
        var form = { ...this.find_form };
        getDataList(
          this.$vision.user,
          this.control,
          form,
          "data_list",
          this,
          null,
          "rpmico"
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
      delete form.totalDataNum;
      getDataList(
        this.$vision.user,
        this.control,
        form,
        "data_list",
        this,
        null,
        "rpmico"
      );
    },
  },
};
</script>

<style lang="scss">
#store {
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
