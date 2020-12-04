<template>
  <!-- 新闻列表 -->
  <div class="container" id="news_list">
    <h1>
      新闻列表
      <span class="btns">
        <el-button type="success" @click="addOne">添加新闻</el-button>
        <el-button type="danger" @click="deleteManyRows">删除</el-button>
      </span>
    </h1>
    <template>
      <!-- 查询表单 -->
      <el-form
        ref="get_form"
        :model="get_form"
        label-width="80px"
        class="shadow_container"
      >
        <!-- 查询条件 -->
        <div style="display: flex; justify-content: space-between">
          <div>
            <el-form-item label="新闻标题">
              <el-input
                v-model="get_form.data.title"
                placeholder="请输入新闻标题"
              ></el-input>
            </el-form-item>
            <el-form-item label="新闻编号">
              <el-input
                v-model="get_form.data.caseId"
                placeholder="请输入新闻编号"
              ></el-input>
            </el-form-item>
            <el-form-item label="是否禁用">
              <el-select
                v-model="get_form.data.isDisable"
                placeholder="请选择状态"
              >
                <el-option label="启用" value="0"></el-option>
                <el-option label="禁用" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发布人">
              <el-input
                v-model="get_form.data.issuer"
                placeholder="请输入发布人"
              ></el-input>
            </el-form-item>
          </div>
          <!-- 按钮组 -->
          <el-form-item>
            <el-button type="primary" @click="filterList">查询</el-button>
            <el-button type="info" @click="resetForm">重置</el-button>
          </el-form-item>
        </div>

        <div class="date_btn"></div>
      </el-form>

      <!-- 列表 -->
      <el-table :data="news_list" style="width: 100%" border>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          sortable
          width="150"
        ></el-table-column>
        <el-table-column prop="mainMediaUrl" label="封面" width="200">
          <template slot-scope="scope">
            <el-avatar
              :size="100"
              :src="scope.row.imgUrl"
              shape="square"
            ></el-avatar>
          </template>
        </el-table-column>
        <el-table-column label="置顶" width="100">
          <template slot-scope="scope">
            {{ scope.row.isStick ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="content"
          label="文章内容"
          width="300"
        ></el-table-column>
        <el-table-column label="是否置顶" width="120">
          <template slot-scope="scope">
            {{ scope.row.isMainPage == "1" ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column prop="isEnable" label="启用状态" width="100">
          <template slot-scope="scope">
            {{ scope.row.isEnable ? "启用" : "禁用" }}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="发表时间" width="180">
        </el-table-column>
        <el-table-column
          prop="issuer"
          label="作者"
          width="180"
        ></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="changeRow(scope.row.caseID)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="delRow(scope.row.caseID)"
              >删除</el-button
            >
            <el-button
              :type="scope.row.isEnable ? 'danger' : 'success'"
              size="small"
              @click="switchSta(scope.row)"
              >{{ scope.row.isEnable ? "禁用" : "启用" }}</el-button
            >
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
import { getDataList, updateData, delData } from "@/utils/api/apis";
import { hintMessage, spliceImg } from "@/utils/common";
export default {
  created() {
    getDataList(this.model, this.control, 1, this.get_form, this, "news_list");
  },
  data() {
    return {
      totalDataNum: 0, // 数据总条数

      get_form: {
        currPage: 1,
        pageSize: 10,
        orderByFileds: "createTime desc",
        data: {
          caseScene: "0", // 0--新闻 1--产品
        },
      },

      news_list: [], // 新闻列表

      select_list: [], // 选中的列表

      model: "config",
      control: "case",
    };
  },
  methods: {
    /* ========================================查======================================== */

    // 每页显示条数改变
    pageSizeChange(val) {
      this.get_form.pageSize = val;
      getDataList(
        this.model,
        this.control,
        1,
        this.get_form,
        this,
        "news_list"
      );
    },
    // 当前页码改变
    currentChange(val) {
      this.get_form.currPage = val;
      getDataList(
        this.model,
        this.control,
        1,
        this.get_form,
        this,
        "news_list"
      );
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
      this.getNewsList(this.get_form);
    },

    /* ========================================删======================================== */
    // 删除当前行
    delRow(caseID) {
      delData(this.model, this.control, 1, { caseID }).then((res) => {
        hintMessage(this, res);
        getDataList(
          this.model,
          this.control,
          1,
          this.get_form,
          this,
          "news_list"
        );
      });
    },

    // 批量删除
    deleteManyRows() {
      if (this.select_list.length < 1) {
        this.$message.error("请至少选中一条数据");
        return;
      }

      delManyList("case", this.select_list)
        .then((res) => {
          console.log(res);
          if (res) {
            this.$message({
              type: "success",
              message: "批量删除成功",
            });
          }
          this.getNewsList(this.get_form);
        })
        .catch((err) => {});
    },

    /* ========================================改======================================== */
    // 改变禁用状态
    switchSta(row) {
      var { inEnable, caseID } = row;
      var status = !inEnable - 0;
      updateData(this.model, this.control, 1, {
        caseID,
        inEnable: status,
      }).then((res) => {
        hintMessage(this, res);
        getDataList(
          this.model,
          this.control,
          1,
          this.get_form,
          this,
          "case_list"
        );
      });
    },

    // 修改当前行
    changeRow(caseID) {
      this.$router.push({
        path: "news_change",
        query: { id: caseID },
      });
    },

    // 重置查询表单
    resetForm() {
      this.get_form = {
        currPage: 1,
        pageSize: 5,
        orderByFileds: "createTime desc",
        data: {
          caseScene: "0", // 0--新闻 1--产品
        },
      };
    },

    // 勾选事件
    selectRows(selection) {
      selection.forEach((item) => {
        var obj = {};
        obj.caseId = item.caseId;
        this.select_list.push(obj);
      });
    },

    // 添加
    addOne() {
      this.$router.push("news_publish");
    },
  },

  watch: {
    news_list() {
      spliceImg(this.news_list, "mainMediaUrl");
    },
  },
};
</script>

<style lang="scss">
#news_list {
  form {
    padding-top: 25px;
    margin-bottom: 20px;
    box-shadow: 0 0 5px -2px;
    padding-right: 25px;
    .el-form-item {
      display: inline-block;
    }
  }

  // 列表
  .el-table__body-wrapper {
    .el-table__row {
      :nth-last-child(2) {
        .cell {
          max-height: 70px;
        }
      }
    }
  }

  // 分页插件
  .page {
    margin-top: 20px;
  }
}
</style>
