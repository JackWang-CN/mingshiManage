<template>
  <!-- 职位列表 -->
  <div class="container" id="recruit_list">
    <h1>职位列表</h1>
    <template>
      <!-- 查询表单 -->
      <el-form ref="find_form" :model="find_form" label-width="100px">
        <!-- 查询条件 -->
        <el-form-item label="职位名称">
          <el-input
            v-model="find_form.name"
            placeholder="请输入职位名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="工作类型">
          <el-select v-model="find_form.type" placeholder="请选择工作类型">
            <el-option label="全职" value="fullTime"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作经验">
          <el-select v-model="find_form.time" placeholder="请选择工作经验">
            <el-option label="1年以内" value="1年以内"></el-option>
            <el-option label="1~2年" value="1~2年"></el-option>
            <el-option label="2~3年" value="2~3年"></el-option>
            <el-option label="3年以上" value="3年以上"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作地点">
          <el-select v-model="find_form.city" placeholder="请选择工作经验">
            <el-option label="成都" value="成都"></el-option>
            <el-option label="贵阳" value="贵阳"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位编号">
          <el-input
            v-model="find_form.id"
            placeholder="请输入职位编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="发布人">
          <el-input
            v-model="find_form.author"
            placeholder="请输入发布人"
          ></el-input>
        </el-form-item>
        <!-- 日期查询 -->
        <div class="date_btn">
          <el-form-item label="发布时间" label-width="100px">
            <el-date-picker
              v-model="find_form.date"
              lang="chinese"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <!-- 按钮组 -->
          <el-form-item>
            <el-button type="primary">查询</el-button>
            <el-button type="info" @click="resetForm">重置</el-button>
            <el-button type="danger" style="margin-left:50px"
              >批量删除</el-button
            >
          </el-form-item>
        </div>
      </el-form>

      <!-- 列表 -->
      <el-table :data="job_list" style="width: 100%" border>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="isDisable" label="是否禁用" sortable width="150">
          <template slot-scope="scope">{{
            scope.row.isDisable - 0 ? "是" : "否"
          }}</template>
        </el-table-column>
        <el-table-column prop="isStick" label="是否置顶" sortable width="150">
          <template slot-scope="scope">{{
            scope.row.isStick - 0 ? "是" : "否"
          }}</template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          sortable
          width="180"
        ></el-table-column>
        <el-table-column
          prop="term"
          label="工作经验"
          sortable
          width="150"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="工作地点"
          sortable
          width="150"
        ></el-table-column>
        <el-table-column
          prop="duties"
          label="岗位职责"
          sortable
          width="400"
        ></el-table-column>
        <el-table-column
          prop="power"
          label="岗位能力"
          width="400"
        ></el-table-column>
        <el-table-column
          prop="regmen"
          label="招聘人数"
          width="100"
        ></el-table-column>
        <el-table-column prop="creationtime" label="创建时间">
          <template slot-scope="scope">
            {{ new Date(scope.row.creationtime).toJSON() }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="changeRow(scope.row.recruitId)"
              >编辑</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="deleteRow(scope.row.recruitId)"
              >删除</el-button
            >
            <el-button
              :type="scope.row.isDisable - 0 ? 'success' : 'danger'"
              size="small"
              @click="switchSta(scope.row)"
              >{{ scope.row.isDisable - 0 ? "启用" : "禁用" }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>

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
    </template>
  </div>
</template>

<script>
import { getList, update, delList } from "@/utils/api/api";
export default {
  mounted() {
    this.getDataList();
  },
  data() {
    return {
      totalDataNum: 0,
      get_form: {
        currPage: 1,
        pageSize: 10,
        orderByFileds: "recruitId desc",
      },
      find_form: {
        title: "", //职位名称
        term: "", // 工作经验
        address: "", // 工作地点
        describe: "", // 职位描述
        duties: "", // 岗位职责
        power: "", // 岗位能力
        info: "", // 职位信息
        regmen: "", // 招聘人数
        contact: "", // 联系方式
        email: "", // 企业邮箱
      },
      job_list: [],
    };
  },
  methods: {
    // 请求列表数据
    getDataList() {
      getList("recruit", this.get_form)
        .then((res) => {
          if (!res) {
            this.job_list = [];
          } else {
            this.job_list = res.data;
            this.totalDataNum = res.totalDataNum;
          }
        })
        .catch((err) => {});
    },

    // 每页显示条数改变
    pageSizeChange(val) {
      this.get_form.pageSize = val;
      this.getDataList(this.get_form); // 重新加载列表
    },
    // 当前页码改变
    currentChange(val) {
      this.get_form.currPage = val;
      this.getDataList(this.get_form); // 重新加载列表
    },

    // 重置
    resetForm() {
      this.find_form = {};
    },

    // 修改当前行
    changeRow(recruitId) {
      this.$router.push({
        path: "recruit_change",
        query: { recruitId },
      });
    },

    // 改变禁用状态
    switchSta(sta) {
      var obj = {};
      obj.recruitId = sta.recruitId;
      var status = sta.isDisable - 0;
      status = !status - 0;
      obj.isDisable = status.toString();
      update("recruit", obj)
        .then((res) => {
          if (res == "1") {
            this.$message({
              type: "success",
              message: "修改已生效",
            });
            this.getDataList(this.get_form);
          }
        })
        .catch((err) => {});
    },

    // 删除当前行
    deleteRow(recruitId) {
      var obj = {};
      obj.recruitId = recruitId;
      delList("recruit", obj)
        .then((res) => {
          // 删除成功
          if (res == "1") {
            this.$message({
              type: "success",
              message: "删除成功！",
            });
          }
          // 重新加载列表
          this.getDataList(this.get_form);
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang="scss">
#recruit_list {
  form {
    padding-top: 25px;
    margin-bottom: 20px;
    .el-form-item {
      display: inline-block;
    }
    box-shadow: 0 0 5px -2px;
  }

  // 列表
  .el-table__body-wrapper {
    .el-table__row {
      :last-child {
        .cell {
          height: 70px;
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
