<template>
  <!-- 个人流水 -->
  <div id="account_flow" class="shadow_container">
    <div class="pageTitle">个人流水</div>
    <el-table :data="flow_list" border style="width: 100%" @selection-change="select">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="userId" label="用户ID" width="150"></el-table-column>
      <el-table-column prop="iename" label="交易方" width="90"></el-table-column>
      <el-table-column prop="payType" label="交易类型" width="90"></el-table-column>
      <el-table-column prop="flowType" label="流水类型" width="90">
        <template slot-scope="scope">{{scope.row.flowType==1?'收入':'支出'}}</template>
      </el-table-column>

      <el-table-column prop="picourl" label="图标" width="80">
        <template slot-scope="scope">
          <el-avatar :size="50" :src="scope.row.picourl"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="goldCoinVal" label="金币数量" width="100">
        <template slot-scope="scope">
          {{scope.row.flowType==1?'+':'-'}}
          {{scope.row.goldCoinVal}}
        </template>
      </el-table-column>
      <el-table-column prop="describe" label="描述" width="90"></el-table-column>
      <el-table-column prop="totalGoldCoinVal" label="当前总金额" width="120"></el-table-column>
      <el-table-column prop="creationtime" label="创建时间" width="200"></el-table-column>
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
import { getDataList } from "@/utils/api/api";
import { createGet } from "@/utils/common";
export default {
  components: {
    Pagination,
  },
  mounted() {
    var userId = this.$route.query.id;
    this.find_form.data.userId = userId;
    var get_form = createGet();
    get_form.data = { userId };
    getDataList(
      this.$vision.user,
      "Accflow",
      get_form,
      "flow_list",
      this,
      null,
      "picourl"
    );
  },

  data() {
    return {
      find_form: {
        currPage: 1,
        pageSize: 10,
        totalDataNum: 0,
        // orderByFileds: "creationtime desc",
        data: {
          userId: "",
        },
      },

      flow_list: [],
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
        "flow_list",
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