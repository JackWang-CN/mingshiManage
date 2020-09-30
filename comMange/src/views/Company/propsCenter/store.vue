<template>
  <div id="props_store" class="shadow_container">
    <!-- 商城道具 -->
    <div class="pageTitle">商城道具</div>

    <!-- tab分页 -->
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="房产道具" name="propHouse"></el-tab-pane>
      <el-tab-pane label="屋内道具" name="prop"></el-tab-pane>
      <el-tab-pane label="宠物道具" name="propPet"></el-tab-pane>
    </el-tabs>

    <!-- 表单 -->
    <el-form ref="find_form" :model="find_form" label-width="80px">
      <el-form-item label="道具名称" label-width="100px">
        <el-input
          v-model="find_form.data.name"
          placeholder="请输入道具名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="道具类型" label-width="100px">
        <el-select
          v-model="find_form.data.rpmtype"
          placeholder="请选择道具类型"
        >
          <el-option
            v-for="type in type_list"
            :key="type.typeID"
            :label="type.name"
            :value="type.typeID"
          ></el-option>
          <el-option label="全部" value></el-option>
        </el-select>
      </el-form-item>

      <!-- 按钮组 -->
      <el-form-item class="btns_find">
        <el-button type="primary" @click="findData">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="data_list" border style="width: 100%">
      <el-table-column
        prop="name"
        label="道具名称"
        width="120"
      ></el-table-column>
      <el-table-column prop="count" label="售卖数量" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.count == -1">无限制</span>
          <span v-else-if="scope.row.count !== -1">{{
            scope.row.count
          }}</span> </template
        >-->
      </el-table-column>
      <el-table-column prop="price" label="单价" width="120"></el-table-column>
      <el-table-column prop="typeID" label="道具类型" width="120">
        <!-- <template slot-scope="scope">
          <span v-if="scope.row.typeID==1">户型风格</span>
          <span v-else-if="scope.row.typeID==2">屋内道具</span>
          <span v-else-if="scope.row.typeID==3">AR宠物</span>
        </template>-->
      </el-table-column>
      <el-table-column prop="isEnable" label="道具状态" width="120">
        <template slot-scope="scope">
          <span v-if="(scope.row.isEnable = 1)">上架中</span>
          <span v-else-if="(scope.row.isEnable = 0)">已下架</span>
        </template>
      </el-table-column>
      <el-table-column prop="facadeImageID" label="道具缩略图" width="120">
        <template slot-scope="scope">
          <el-avatar
            v-if="scope.row.facadeImageID"
            shape="square"
            :size="80"
            :src="fileUrl + 'ar2d/v1?Mark=' + scope.row.facadeImageID"
          ></el-avatar>
        </template>
      </el-table-column>
      <el-table-column
        prop="describe"
        label="道具描述"
        width="300"
      ></el-table-column>
      <el-table-column
        prop="onShelfTime"
        label="上架时间"
        width="170"
      ></el-table-column>
      <el-table-column prop="validityTimestamp" label="有效期限" width="170">
        <template slot-scope="scope">
          <span v-if="scope.row.validityTimestamp == -1">永久有效</span>
          <span v-else-if="scope.row.validityTimestamp !== -1">{{
            scope.row.validityTimestamp
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280">
        <template slot-scope="scope">
          <el-button
            @click="unshelve(scope.row.storeID)"
            type="danger"
            size="small"
            >下架</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页插件 -->
    <Pagination
      :find="find_form"
      @sizeChange="pageChange('size', $event)"
      @currChange="pageChange('curr', $event)"
    ></Pagination>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import {
  createGet,
  spliceKey,
  filteObj,
  hintMessage,
  spliceImg,
} from "@/utils/common";
import { getDataList, updateData, delData } from "@/utils/api/apis";
export default {
  components: {
    Pagination,
  },
  mounted() {
    this.activeName = "propHouse";
    this.find_form = createGet();
  },

  data() {
    return {
      find_form: { data: {} },
      data_list: [],
      select_list: [], // 选中的列表
      type_list: [],
      activeName: "",
      fileUrl: "https://api.resources.scmsar.com/file/download/",

      model: "propMall",
      control: "propStore",
    };
  },

  methods: {
    // 查询
    findData() {
      var form = { ...this.find_form };
      form.data = { ...this.find_form.data };
      form.data = filteObj(form.data);
      // form.data = spliceKey(form.data);
      getDataList(
        this.model,
        this.control,
        1,
        form,
        this,
        "data_list",
        this.activeName
      );
    },

    // 跳转到详情页
    toDetails(id) {
      this.$router.push({
        path: "props_details",
        query: {
          id,
          type: this.model,
        },
      });
    },

    // 道具下架
    unshelve(storeID) {
      delData(
        this.model,
        this.control,
        1,
        { storeID, describe: "下架" },
        "offTheShelf"
      ).then((res) => {
        if (res) {
          hintMessage(this, res);
          var form = { ...this.find_form };
          getDataList(
            this.model,
            this.control,
            1,
            form,
            this,
            "data_list",
            this.activeName + "List"
          );
        }
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
        form,
        this,
        "data_list",
        this.activeName + "List"
      );
    },
  },

  watch: {
    // 监听激活页面以请求不同数据
    activeName() {
      var form = { ...this.find_form };

      // 请求商城道具列表
      getDataList(
        this.model,
        this.control,
        1,
        form,
        this,
        "data_list",
        this.activeName + "List"
      );

      // 请求道具类型
      getDataList(
        this.activeName,
        this.activeName + "Type",
        1,
        createGet(1, 99),
        this,
        "type_list"
      );
    },

    // 拼接图片url
    data_list() {
      this.data_list = spliceImg(this.data_list, "facadeImageID");
    },
  },
};
</script>

<style lang='scss'>
#props_store {
  form {
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