<!-- 拍卖列表 -->
<template>
  <div id="store" class="shadow_container">
    <div class="pageTitle">拍卖列表</div>

    <!-- tab分页 -->
    <el-tabs v-model="activeName" type="card">
      <!-- 查询条件 -->
      <el-form
        ref="find_form"
        class="find_form"
        :model="find_form"
        label-width="80px"
      >
        <el-form-item label="道具名称">
          <el-input
            v-model="find_form.data.assetsName"
            placeholder="请输入道具名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="道具类型" v-show="activeName == 'propList'">
          <el-select
            v-model="find_form.data.assetType"
            placeholder="请选择道具类型"
          >
            <el-option label="全部" value></el-option>
            <el-option label="道具" :value="0"></el-option>
            <!-- <el-option label="宠物" :value="1"></el-option>
          <el-option label="房产" :value="2"></el-option>
          <el-option label="地产" :value="2"></el-option> -->
            <el-option label="道具碎片" :value="4"></el-option>
            <el-option label="道具配方" :value="5"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="卖家昵称">
          <el-input v-model="find_form.data.userName"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="findData">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- <el-tab-pane label="房产道具" name="houseList"></el-tab-pane> -->

      <!-- 屋内道具 -->
      <el-tab-pane label="屋内道具" name="propList">
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
          <el-table-column prop="propTypeEnum" label="道具类型" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.propTypeEnum == 0">道具</span>
              <span v-else-if="scope.row.propTypeEnum == 1">宠物</span>
              <span v-else-if="scope.row.propTypeEnum == 2">房产</span>
              <span v-else-if="scope.row.propTypeEnum == 3">地产</span>
              <span v-else-if="scope.row.propTypeEnum == 4">碎片</span>
              <span v-else-if="scope.row.propTypeEnum == 5">配方</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="num"
            label="数量"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="price"
            label="价格"
            width="120"
          ></el-table-column>
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
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <!-- <el-button
            @click="showDetails(scope.row.auctionID)"
            type="primary"
            size="small"
            >详情</el-button
          > -->
              <el-button
                @click="switchState(scope.row)"
                type="warning"
                size="small"
                >下架</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <!-- 优惠券 -->
      <el-tab-pane label="优惠券" name="couponList">
        <el-table :data="data_list" border>
          <el-table-column
            prop="name"
            label="优惠券名称"
            width="150"
          ></el-table-column>

          <el-table-column prop="imgUrl" label="优惠券图片" width="120">
            <template slot-scope="scope">
              <el-avatar
                :size="80"
                :src="scope.row.imgUrl"
                shape="square"
              ></el-avatar>
            </template>
          </el-table-column>

          <el-table-column
            prop="typeName"
            label="券类型"
            width="120"
          ></el-table-column>

          <el-table-column prop="limitQuoat" label="门槛金额" width="120">
            <template slot-scope="scope">
              {{ scope.row.limitQuoat }}金币
            </template>
          </el-table-column>

          <el-table-column prop="discountQuota" label="面值" width="120">
            <template slot-scope="scope">
              <!-- 1.抵扣 -->
              <span v-if="scope.row.discountType == 1"
                >{{ scope.row.discountQuota }}金币</span
              >

              <!-- 2.折扣 -->
              <span v-else-if="scope.row.discountType == 2"
                >{{ scope.row.discountQuota }}折</span
              >
            </template>
          </el-table-column>

          <el-table-column
            prop="merName"
            label="商户名称"
            width="120"
          ></el-table-column>

          <el-table-column
            prop="count"
            label="数量"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="price"
            label="价格"
            width="120"
          ></el-table-column>
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
            prop="auctionTime"
            label="上架时间"
            width="180"
          ></el-table-column>
          <el-table-column prop="expireTime" label="有效期限" width="160">
            <template slot-scope="scope">
              <span>
                {{ scope.row.startTime }}至
                <br />
                {{ scope.row.endTime }}
              </span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <!-- <el-button
            @click="showDetails(scope.row.auctionID)"
            type="primary"
            size="small"
            >详情</el-button
          > -->
              <el-button
                @click="switchState(scope.row)"
                type="warning"
                size="small"
                >下架</el-button
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
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { getDataList, getDataDetails, getData } from "@/utils/api/apis";
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
      filteObj(form);
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
      var { userID, propTypeEnum, auctionID } = row;
      this.data_shelf.customerID = userID;
      this.data_shelf.assetTypeEnum = propTypeEnum;
      this.data_shelf.auctionID = auctionID;
      getData(this.model, this.control, 1, this.data_shelf, "onaway").then(
        (res) => {
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
        }
      );
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
      var flag = this.activeName == "propList";
      if (flag) {
        spliceImg(this.data_list, "facadeImageID", flag);
      } else {
        spliceImg(this.data_list, "imageID");
      }
    },

    // 监听页面激活
    activeName(v) {
      this.operate = v;
      getDataList(
        this.model,
        this.control,
        1,
        this.find_form,
        this,
        "data_list",
        v
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
