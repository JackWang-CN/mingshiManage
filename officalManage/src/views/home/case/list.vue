<template>
  <!-- 案例列表 -->
  <div class="container" id="case_list">
    <h1>案例列表</h1>
    <template>
      <!-- 查询表单 -->
      <el-form ref="get_form" :model="get_form" label-width="100px" class="shadow_container">
        <!-- 查询条件 -->
        <el-form-item label="新闻标题">
          <el-input v-model="get_form.data.title" placeholder="请输入新闻标题"></el-input>
        </el-form-item>
        <el-form-item label="新闻编号">
          <el-input v-model="get_form.data.caseId" placeholder="请输入新闻编号"></el-input>
        </el-form-item>
        <el-form-item label="是否禁用">
          <el-select v-model="get_form.data.isDisable" placeholder="请选择状态">
            <el-option label="启用" value="0"></el-option>
            <el-option label="禁用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布人">
          <el-input v-model="get_form.data.issuer" placeholder="请输入发布人"></el-input>
        </el-form-item>
        <!-- 日期查询 -->
        <div class="date_btn">
          <el-form-item label="发表时间" label-width="100px">
            <el-date-picker
              v-model="get_form.data._gt_creationTime"
              lang="chinese"
              type="datetimerange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <!-- 按钮组 -->
          <el-form-item>
            <el-button type="primary" @click="filterList">查询</el-button>
            <el-button type="info" @click="resetForm">重置</el-button>
            <el-button type="success" @click="addOne">添加</el-button>
            <el-button type="danger" style="margin-left:50px" @click="deleteManyRows">批量删除</el-button>
          </el-form-item>
        </div>
      </el-form>

      <!-- 列表 -->
      <el-table
        :data="case_list"
        style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
        border
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="title" label="标题" sortable width="200"></el-table-column>
        <el-table-column label="置顶" sortable width="100">
          <template slot-scope="scope">
            {{
            scope.row.isStick == "1" ? "是" : "否"
            }}
          </template>
        </el-table-column>
        <el-table-column label="主页显示" sortable width="120">
          <template slot-scope="scope">
            {{
            scope.row.isMainPage == "1" ? "是" : "否"
            }}
          </template>
        </el-table-column>
        <el-table-column prop="isDisable" label="状态" sortable width="100">
          <template slot-scope="scope">
            {{
            scope.row.isDisable == "1" ? "禁用" : "启用"
            }}
          </template>
        </el-table-column>
        <el-table-column prop="caseId" label="新闻编号" sortable width="250">
          <template slot-scope="scope">
            {{
            scope.row.caseId.substring(5)
            }}
          </template>
        </el-table-column>
        <el-table-column prop="creationtime" label="发表时间" sortable width="180">
          <template slot-scope="scope">{{ new Date(scope.row.creationtime).toJSON() }}</template>
        </el-table-column>
        <el-table-column prop="issuerName" label="作者" sortable width="180"></el-table-column>
        <el-table-column prop="mainMediaUrl" label="封面" sortable width="350">
          <template slot-scope="scope">
            <img :src="scope.row.mainMediaUrl" height="150px" alt />
          </template>
        </el-table-column>
        <el-table-column prop="content" label="文章内容"></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="changeRow(scope.row.caseId)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteRow(scope.row.caseId)">删除</el-button>
            <el-button
              :type="scope.row.isDisable - 0 ? 'success' : 'danger'"
              size="small"
              @click="switchSta(scope.row)"
            >{{ scope.row.isDisable - 0 ? "启用" : "禁用" }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!-- 分页 -->
    <div class="page">
      <el-pagination
        background
        layout="prev, sizes,pager, next"
        :total="totalDataNum || 0"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="get_form.pageSize"
        @size-change="pageSizeChange"
        @current-change="currentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getList, delList, delManyList, update } from "@/utils/api/api";
import { spliceUrl } from "@/utils/utils";

export default {
  mounted() {
    this.getCaseList(); // 首次加载产品案例列表
  },
  data() {
    return {
      totalDataNum: 0,
      get_form: {
        currPage: 1,
        pageSize: 10,
        data: {
          caseScene: "1" // 0--新闻 1--产品
        }
      },

      case_list: [], // 案例列表

      select_list: [] // 选中的列表
    };
  },
  methods: {
    // 请求列表数据
    getCaseList() {
      getList("case", this.get_form)
        .then(res => {
          if (!res) {
            this.case_list = [];
          } else {
            this.case_list = spliceUrl(res.data, "mainMediaUrl");
            this.totalDataNum = res.totalDataNum;
          }
        })
        .catch(err => {});
    },

    // 每页显示条数改变
    pageSizeChange(val) {
      this.get_form.pageSize = val;
      this.getCaseList(this.get_form); // 重新加载列表
    },
    // 当前页码改变
    currentChange(val) {
      this.get_form.currPage = val;
      this.getCaseList(this.get_form); // 重新加载列表
    },

    // 查询数据
    filterList() {
      // 获取用户输入的筛选条件，未输入则不添加
      var obj = {};
      for (const item in this.get_form.data) {
        if (this.get_form.data[item]) {
          obj[item] = this.get_form.data[item];
        }
      }
      // 筛选条件是否包含日期
      if (obj._gt_creationTime) {
        var arr = [...obj._gt_creationTime];
        obj._gt_creationTime = arr[0].toJSON();
        obj._lt_creationTime = arr[1].toJSON();
      }
      this.get_form.data = obj;
      this.getCaseList(this.get_form);
    },

    /* ========================================删======================================== */
    // 删除当前行
    deleteRow(caseId) {
      var obj = {};
      obj.caseId = caseId;
      delList("case", obj)
        .then(res => {
          // 删除成功
          if (res == "1") {
            this.$message({
              type: "success",
              message: "删除成功！"
            });
          }
          // 重新加载列表
          this.getCaseList(this.get_form);
        })
        .catch(err => {});
    },

    // 批量删除
    deleteManyRows() {
      if (this.select_list.length < 1) {
        this.$message.error("请至少选中一条数据");
        return;
      }
      delManyList("case", this.select_list)
        .then(res => {
          if (res) {
            this.$message({
              type: "success",
              message: "批量删除成功"
            });
            this.getCaseList(this.get_form);
          }
        })
        .catch(err => {});
    },

    /* ========================================改======================================== */
    // 改变禁用状态
    switchSta(sta) {
      var obj = {};
      obj.caseId = sta.caseId;
      var status = sta.isDisable - 0;
      status = !status - 0;
      obj.isDisable = status.toString();
      update("case", obj)
        .then(res => {
          if (res == "1") {
            this.$message({
              type: "success",
              message: "修改已生效"
            });
            this.getCaseList(this.get_form);
          }
        })
        .catch(err => {});
    },

    // 修改当前行
    changeRow(caseId) {
      this.$router.push({
        path: "case_change",
        query: { caseId }
      });
    },

    // 重置查询表单
    resetForm() {
      this.get_form = {
        currPage: 1,
        pageSize: 5,
        data: {
          caseScene: "1" // 0--新闻 1--产品
        }
      };
    },

    // 勾选事件
    selectRows(selection) {
      this.select_list = selection;
    },

    // 添加
    addOne() {
      this.$router.push("case_publish");
    }
  }
};
</script>

<style lang="scss">
#case_list {
  form {
    padding-top: 25px;
    margin-bottom: 20px;
    box-shadow: 0 0 5px -2px;
    .el-form-item {
      display: inline-block;
    }
  }

  // 列表
  .el-table__body-wrapper {
    .el-table__row {
      .cell {
        height: 140px;
      }
    }
  }

  // 分页插件
  .page {
    margin-top: 20px;
  }
}
</style>
