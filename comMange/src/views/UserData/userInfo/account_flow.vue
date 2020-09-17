<template>
  <!-- 个人流水 -->
  <div id="account_flow" class="shadow_container">
    <div class="pageTitle">个人流水</div>
    <el-table :data="data_list" border style="width: 100%" @selection-change="select">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="accountFlowID" label="用户ID" width="180"></el-table-column>
      <el-table-column prop="traderName" label="交易方名称" width="120"></el-table-column>
      <el-table-column prop="traderType" label="交易方类型" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.traderType==0">商家</span>
          <span v-else-if="scope.row.traderType==1">用户</span>
          <span v-else-if="scope.row.traderType==2">公司</span>
        </template>
      </el-table-column>
      <el-table-column prop="payMethod" label="消费方式" width="90">
        <template slot-scope="scope">
          <span v-if="scope.row.payMethod==0">商家</span>
          <span v-else-if="scope.row.payMethod==1">用户</span>
          <span v-else-if="scope.row.payMethod==2">公司</span>
        </template>
      </el-table-column>
      <el-table-column prop="incomeExpensesType" label="流水类型" width="90">
        <template slot-scope="scope">{{scope.row.incomeExpensesType==1?'收入':'支出'}}</template>
      </el-table-column>

      <el-table-column prop="picourl" label="图标" width="80">
        <template slot-scope="scope">
          <el-avatar :size="50" :src="scope.row.picourl"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="goldCoinVal" label="金币数量" width="100">
        <template slot-scope="scope">
          {{scope.row.incomeExpensesType==1?'+':'-'}}
          {{scope.row.gold}}
        </template>
      </el-table-column>
      <el-table-column prop="describe" label="描述" width="200"></el-table-column>
      <el-table-column prop="currTotalGold" label="当前总金额" width="120"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="200"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="warning" size="small" @click="mark(scope.row)">备注</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页插件 -->
    <Pagination
      :find="find_form"
      @sizeChange="pageChange('size',$event)"
      @currChange="pageChange('curr',$event)"
    ></Pagination>

    <!-- 按钮 -->
    <div class="bottom_btns">
      <el-button type="info" @click="cancel('user_details')">返回</el-button>
    </div>
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

      data_list: [],

      model: "cusInfo",
      control: "cusGoldAccountFlow",
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
          id: this.find_form.data.userId,
        },
      });
    },
  },
};
</script>

<style lang='scss'>
</style>