<template>
  <div id="history" class="shadow_container">
    <!-- 历史活动 -->
    <div class="pageTitle">历史活动</div>
    <!-- 表单 -->
    <el-form class="find_form">
      <div class="search">
        <el-input v-model="find_form.info" placeholder="主题、描述、客户经理" prefix-icon="el-icon-search"></el-input>
        <el-button type="text" @click="switchMore">{{showMore?'收起∧':'筛选∨'}}</el-button>
      </div>

      <el-form-item label="状态" label-width="70px" v-if="showMore">
        <el-input placeholder="输入状态"></el-input>
      </el-form-item>
      <el-form-item v-if="showMore">
        <el-date-picker
          v-model="find_form.creationTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item v-if="showMore">
        <el-button type="primary">搜索</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="data_list" max-height="250">
      <el-table-column fixed prop="activityTheme" label="主题" width="150"></el-table-column>
      <el-table-column prop="couponName" label="券名称" width="150"></el-table-column>
      <el-table-column prop="validDay" label="持续天数" width="120">
        <!-- <template slot-scope="scope">{{scope.row.endTime-scope.row.startTime}}</template> -->
      </el-table-column>
      <el-table-column prop="total" label="总数" width="120"></el-table-column>
      <el-table-column prop="receiveAmount" label="领取率" width="120">
        <template slot-scope="scope">{{scope.row.receiveAmount/scope.row.total}}%</template>
      </el-table-column>
      <el-table-column prop="useAmount" label="使用率" width="150">
        <template slot-scope="scope">{{scope.row.useAmount/scope.row.total}}%</template>
      </el-table-column>
      <el-table-column prop="describe" label="券详情" width="300"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getData, getDataList, delData } from "@/utils/api/apis";
import { createGet } from "@/utils/common";
export default {
  mounted() {
    this.find_form = createGet();
    var form = { ...this.find_form };
    // 首次加载
    getData(this.model, this.control, 1, form).then((res) => {
      this.data_list = res.data;
    });
  },

  data() {
    return {
      data_list: [],
      find_form: {},

      showMore: false,

      model: "activity",
      control: "history",
    };
  },

  methods: {
    // 隐藏&收起筛选条件
    switchMore() {
      this.showMore = !this.showMore;
    },
  },

  watch: {
    // 监听数据列表
    data_list() {
      this.data_list.forEach((item) => {
        var time = new Date(item.endTime) - new Date(item.startTime);
        item.validDay = Math.floor(time / 1000 / 3600 / 24);
      });
    },
  },
};
</script>

<style lang='scss'>
#history {
  .el-input {
    width: 300px;
    height: 24px;
  }
  .search {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .el-form-item {
    display: inline-block;
    margin-right: 50px;
  }
}
</style>