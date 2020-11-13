<template>
  <!-- 获奖记录 -->
  <div id="user_prize" class="shadow_container">
    <div class="pageTitle">{{ nickname }} 获奖记录</div>
    <el-table :data="data_list" border>
      <el-table-column
        prop="title"
        label="获奖标题"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="type"
        label="获奖类型"
        width="120"
      ></el-table-column>
      <el-table-column prop="signInDay" label="签到天数" width="120">
      </el-table-column>
      <el-table-column prop="describe" label="获奖描述" width="300">
      </el-table-column>
      <el-table-column prop="createTime" label="获奖时间" width="180">
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="showDetails(scope.row)"
            >备注</el-button
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

    <!-- 按钮 -->
    <div class="bottom_btns">
      <el-button type="info" @click="cancel('user_details')">返回</el-button>
    </div>

    <!-- 弹出框 -->
    <el-dialog title="获奖详情" :visible.sync="show_details" width="30%">
      <el-form>
        <el-form-item label="获奖标题">{{ data_info.title }}</el-form-item>
        <el-form-item label="获奖类型">{{ data_info.type }}</el-form-item>
        <el-form-item label="签到天数">{{ data_info.signInDay }}</el-form-item>
        <el-form-item label="获奖描述">{{ data_info.describe }}</el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { getDataList } from "@/utils/api/apis";
import { createGet } from "@/utils/common";
export default {
  components: {
    Pagination,
  },
  mounted() {
    this.customerID = this.$route.query.id;
    this.nickname = this.$route.query.name;
    getDataList(
      this.model,
      this.control,
      1,
      { customerID: this.customerID },
      this
    );
  },

  data() {
    return {
      find_form: { data: {} },
      customerID: "",
      nickname: "",
      data_list: [],
      data_info: {},
      show_details: false,
      model: "cusInfo",
      control: "cusWinningLog",
    };
  },

  methods: {
    // 展示详情
    showDetails(row) {
      this.show_details = true;
      this.data_info = { ...row };
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
        "Accflow",
        form,
        "data_list",
        this,
        null,
        "picourl"
      );
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
  },
};
</script>

<style lang='scss'>
</style>