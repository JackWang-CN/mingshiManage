<template>
  <!-- 我需要援助 -->
  <div id="entrust_details" class="card_container">
    <!-- <el-tabs v-model="activeName" type="border-card"> -->
    <!-- <el-tab-pane label="历史援助" name="history">
        <el-form class="find_form">
          <div class="search">
            <el-input
              v-model="find_form.info"
              placeholder="主题、描述、客户经理"
              prefix-icon="el-icon-search"
            ></el-input>
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

        <el-table :data="data_list" max-height="250">
          <el-table-column fixed prop="subject" label="主题" width="150"></el-table-column>
          <el-table-column prop="desInfo" label="描述" width="300"></el-table-column>
          <el-table-column prop="reqStatus" label="状态" width="120"></el-table-column>
          <el-table-column prop="progress" label="进度详情" width="120"></el-table-column>
          <el-table-column prop="customManager" label="客户经理" width="120"></el-table-column>
          <el-table-column prop="creationTime" label="申请时间" width="150"></el-table-column>
          <el-table-column prop="finishTime" label="完成时间" width="150"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>-->
    <div class="tabs">
      <span :class="activeName=='apply'?'active':''" @click="switchTabs('apply')">申请援助</span>
      <span :class="activeName=='history'?'active':''" @click="switchTabs('history')">历史援助</span>
    </div>
    <!-- 申请援助 -->
    <div class="apply" v-show="activeName=='apply'">
      <el-form label-width="100px">
        <el-form-item label="援助主题:">
          <el-input v-model="apply_form.title"></el-input>
        </el-form-item>
        <el-form-item label="内容描述:">
          <el-input type="textarea" v-model="apply_form.content" :rows="20"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">提交申请</el-button>
          <el-button type="danger">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 历史援助 -->
    <div class="history"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.activeName = "apply";
  },

  data() {
    return {
      // 申请援助数据对象
      apply_form: {},
      // 搜索数据对象
      find_form: {},
      data_list: [
        {
          subject: "双十一促销",
          desInfo: "双十一来临，折扣优惠力度巨大",
          reqStatus: "审核中",
          progress: "",
          customManager: "小刘",
          creationTime: "2020-08-18 12:00",
          finishTime: "",
        },
        {
          subject: "双十一促销",
          desInfo: "双十一来临，折扣优惠力度巨大",
          reqStatus: "审核中",
          progress: "",
          customManager: "小刘",
          creationTime: "2020-08-18 12:00",
          finishTime: "",
        },
        {
          subject: "双十一促销",
          desInfo: "双十一来临，折扣优惠力度巨大",
          reqStatus: "审核中",
          progress: "",
          customManager: "小刘",
          creationTime: "2020-08-18 12:00",
          finishTime: "",
        },
      ],

      activeName: "",
      showMore: false,
    };
  },

  watch: {
    activeName() {
      console.log(this.activeName);
    },
  },

  methods: {
    switchTabs(name) {
      this.activeName = name;
    },
  },
};
</script>

<style lang='scss'>
#entrust_details {
  color: #666666;
  .tabs {
    font-size: 14px;
    padding-left: 30px;
    margin-bottom: 20px;
    span {
      display: inline-block;
      width: 100px;
      text-align: center;
      padding: 10px 0;
      background-color: #f7f7f7;
      margin-right: 10px;
      cursor: pointer;
      &.active {
        color: #00b3e4;
      }
      &:hover {
        color: #00b3e4;
      }
    }
  }
  // 申请援助
}
</style>