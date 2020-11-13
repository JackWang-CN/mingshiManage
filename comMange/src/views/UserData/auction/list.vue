<!-- 拍卖列表 -->
<template>
  <div id="store" class="shadow_container">
    <div class="pageTitle">拍卖列表</div>

    <!-- tab分页 -->
    <el-tabs v-model="activeName" type="card">
      <!-- <el-tab-pane label="房产道具" name="houseList"></el-tab-pane> -->
      <el-tab-pane label="屋内道具" name="propList"></el-tab-pane>
      <el-tab-pane label="优惠券" name="couponList"></el-tab-pane>
    </el-tabs>

    <!-- 查询条件 -->
    <el-form
      ref="find_form"
      class="find_form"
      :model="find_form"
      label-width="80px"
    >
      <el-form-item label="道具名称" label-width="100px">
        <el-input
          v-model="find_form.data.name"
          placeholder="请输入道具名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="道具类型" label-width="100px">
        <el-select
          v-model="find_form.data.assetType"
          placeholder="请选择道具类型"
        >
          <el-option label="全部" value></el-option>
          <el-option label="优惠券" :value="1"></el-option>
          <el-option label="道具" :value="2"></el-option>
          <el-option label="虚拟房产" :value="3"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="卖家昵称" label-width="100px">
        <el-input v-model="find_form.data.userName"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="findData">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 数据列表 -->
    <el-table :data="data_list" border>
      <el-table-column
        prop="name"
        label="拍品名称"
        width="150"
      ></el-table-column>

      <el-table-column prop="imgUrl" label="拍品图片" width="120">
        <template slot-scope="scope">
          <el-avatar
            :size="80"
            :src="scope.row.imgUrl"
            shape="square"
          ></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="assetType" label="道具类型" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.assetType == 1">优惠券</span>
          <span v-else-if="scope.row.assetType == 2">道具</span>
          <span v-else-if="scope.row.assetType == 3">虚拟房产</span>
        </template>
      </el-table-column>
      <el-table-column prop="count" label="数量" width="120"></el-table-column>
      <el-table-column prop="price" label="价格" width="120"></el-table-column>
      <el-table-column
        prop="describe"
        label="拍品描述"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="userName"
        label="卖家昵称"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="addedTime"
        label="上架时间"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="expireTime"
        label="到期时间"
        width="160"
      ></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <!-- <el-button
            @click="showDetails(scope.row.auctionID)"
            type="primary"
            size="small"
            >详情</el-button
          > -->
          <el-button @click="switchState(scope.row)" type="warning" size="small"
            >下架</el-button
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
        <el-form-item label="物品名称">{{ data_info.propName }}</el-form-item>
        <el-form-item label="道具类型">{{ data_info.assetType }}</el-form-item>
        <el-form-item label="拍卖数量">{{ data_info.count }}</el-form-item>
        <el-form-item label="拍品单价">{{ data_info.price }}</el-form-item>
        <el-form-item label="拍品描述">{{ data_info.describe }}</el-form-item>
        <el-form-item label="上架时间">{{ data_info.addedTime }}</el-form-item>
        <el-form-item label="到期时间">{{ data_info.expireTime }}</el-form-item>
        <el-form-item label="卖家昵称">{{ data_info.owner }}</el-form-item>
        <el-form-item label="道具图片">
          <el-avatar
            :size="80"
            :src="data_info.rpmico"
            shape="square"
          ></el-avatar>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="show_details = false">关闭</el-button>
      </span>
    </el-dialog>

    <el-dialog title="下架理由" :visible.sync="show_shelf">
      <el-input
        type="textarea"
        :rows="3"
        v-model="data_shelf.remarks"
      ></el-input>
      <span slot="footer">
        <el-button @click="offShelf" type="primary">确定</el-button>
        <el-button @click="show_shelf = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { getDataList, getDataDetails, offTheShelf } from "@/utils/api/apis";
import {
  createGet,
  filteObj,
  spliceKey,
  hintMessage,
  spliceImg,
} from "@/utils/common";
export default {
  components: {
    Pagination,
  },
  mounted() {
    // 首次加载
    this.find_form = createGet();

    this.activeName = "propList";
    var form = { ...this.find_form };
  },

  data() {
    return {
      // 查找条件
      find_form: {
        data: {},
      },
      // 数据列表
      data_list: [],
      data_info: {}, // 详情数据对象
      data_shelf: {}, // 下架操作

      activeName: "",
      show_details: false, // 是否显示详情
      show_shelf: false, // 是否显示下架弹窗
      model: "auction",
      control: "auction",
      operate: "",
    };
  },

  methods: {
    // 查询
    findData() {
      var form = { ...this.find_form };
      form.data = { ...this.find_form.data };
      form.data = filteObj(form.data);
      getDataList(
        this.model,
        this.control,
        1,
        form,
        this,
        "data_list",
        this.operate
      );
    },

    // 展示详情
    showDetails(id) {
      // 1.打开模态框
      this.show_details = true;
      // 2.请求详情数据并渲染
      getDataDetails(this.model, this.control, 1, { auctionID: id }, this);
    },

    // 点击下架
    switchState(row) {
      var { owner, assetsID } = row;
      console.log(row);
      // 1.打开模态框 2.填写下架理由 3.提交关闭模态框并重新加载
      this.data_shelf.owner = owner;
      this.data_shelf.auctionID = assetsID;
      this.show_shelf = true;
    },

    // 提交下架操作
    offShelf() {
      this.show_shelf = false;
      offTheShelf(1, this.data_shelf).then((res) => {
        hintMessage(this, res);
        var form = { ...this.find_form };
        getDataList(
          this.model,
          this.control,
          1,
          form,
          this,
          "data_list",
          this.operate
        );
      });
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
        this.model,
        this.control,
        1,
        form,
        this,
        "data_list",
        this.operate
      );
    },
  },

  watch: {
    // 拼接道具图片url
    data_list() {
      this.data_list = spliceImg(this.data_list, "facadeImageID");
    },

    // 监听页面激活
    activeName() {
      this.operate = this.activeName;
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
