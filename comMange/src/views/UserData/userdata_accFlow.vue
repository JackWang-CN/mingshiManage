<!-- 商户管理-商户列表 -->
<template>
  <div id="store" class="shadow_container">
    <div class="pageTitle">帐户流水</div>
    <!-- 查询条件 -->
    <el-form ref="find_form" :model="find_form" label-width="80px">
      <el-form-item label="用户ID" label-width="100px">
        <el-input
          v-model="find_form.data.userId"
          placeholder="请输入用户ID"
        ></el-input>
      </el-form-item>
      <el-form-item label="交易方名称" label-width="100px">
        <el-input
          v-model="find_form.data.iename"
          placeholder="请输入交易方名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="图标地址" label-width="100px">
        <el-input
          v-model="find_form.data.picourl"
          placeholder="请输入图标地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="流水类型" label-width="100px">
        <el-input
          v-model="find_form.data.flowType"
          placeholder="请输入流水类型"
        ></el-input>
      </el-form-item>
      <el-form-item label="消费类型" label-width="100px">
        <el-input
          v-model="find_form.data.payType"
          placeholder="请输入消费类型"
        ></el-input>
      </el-form-item>
      <el-form-item label="描述" label-width="100px">
        <el-input
          v-model="find_form.data.describe"
          placeholder="请输入描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="金币值" label-width="100px">
        <el-input
          v-model="find_form.data.goldCoinVal"
          placeholder="请输入金币值"
        ></el-input>
      </el-form-item>
      <el-form-item label="当前总金额" label-width="100px">
        <el-input
          v-model="find_form.data.totalGoldCoinVal"
          placeholder="请输入当前总金额"
        ></el-input>
      </el-form-item>
      <el-form-item label="创建时间" label-width="100px">
        <el-date-picker
          v-model="find_form.data.creationTime"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <!-- 日期查询 -->
      <div class="date_btn">
        <el-form-item class="btns_find">
          <el-button type="primary" @click="queryData">查询</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
          <el-button
            type="success"
            style="margin-left:50px"
            @click="dialogFormVisibleOfAdd = true"
            >添加</el-button
          >
          <el-button type="danger" @click="delete_list">批量删除</el-button>
        </el-form-item>
      </div>
    </el-form>
    <!-- 商户列表 -->
    <el-table
      :data="store_list"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        prop="userId"
        label="用户ID"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="picourl"
        label="图标地址"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="iename"
        label="交易方名称"
        width="150"
      ></el-table-column>

      <el-table-column
        prop="flowType"
        label="流水类型"
        width="120"
      ></el-table-column>

      <el-table-column
        prop="payType"
        label="消费类型"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="describe"
        label="描述"
        width="250"
      ></el-table-column>
      <el-table-column
        prop="goldCoinVal"
        label="金币值"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="totalGoldCoinVal"
        label="当前总金额"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="creationtime"
        label="创建时间"
        width="200"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="toDetails(scope.row)" type="primary" size="small"
            >编辑</el-button
          >
          <el-button @click="user_delete(scope.row)" type="danger" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  creatGet,
  createObj,
  spliceKey,
  deletconditionofbusiness,
} from "@/api/Common";
import {
  getDataList,
  putcreate,
  deletelist,
  deleteuser,
  patchedit,
} from "@/api/api";
export default {
  data() {
    return {
      // 查找条件
      find_form: {
        currPage: 1,
        pageSize: 10,
        data: {},
      },
      select_list: [], //已选表单
      add_form: {}, //添加表单内容
      edit_form: {}, //修改表单内容
      dialogFormVisibleOfAdd: false, //添加表单弹窗
      dialogFormVisibleOfEdit: false, //修改表单弹窗
      // 日期选择
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      // 商户列表
      store_list: [],
    };
  },
  mounted() {
    var get_form = creatGet();
    getDataList(this.$vision.user, "Accflow", get_form, "store_list", this);
  },
  methods: {
    queryData() {
      var get_form = { ...this.find_form };
      get_form.data = createObj(get_form.data);
      get_form.data = spliceKey(get_form.data);
      getDataList(this.$vision.user, "Accflow", get_form, "store_list", this);
    },
    // 添加当前
    user_add() {
      var add_form = createObj(this.add_form);
      putcreate(this.$vision.user, "Accflow", add_form).then((res) => {
        if (res != null) {
          this.$message.success("添加成功");
          this.resetForm();
          this.queryData();
          this.dialogFormVisibleOfAdd = false;
        } else {
          this.$message.success("添加失败");
        }
      });
    },
    // 修改当前
    user_update() {
      patchedit(this.$vision.user, "Accflow", this.edit_form).then((res) => {
        if (res != null) {
          this.$message.success("修改成功");
          this.resetForm();
          this.queryData();
          this.dialogFormVisibleOfEdit = false;
        } else {
          this.$message.success("修改失败");
        }
      });
    },
    // 删除当前
    user_delete(val) {
      this.$confirm("确定要删除吗(｀・ω・´)", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          var del = {
            tableId: val["tableId"],
            userId: val["userId"],
          };
          deleteuser(this.$vision.user, "Accflow", del).then((res) => {
            if (res != null) {
              this.$message.success("删除成功");
              this.resetForm();
              this.queryData();
            } else {
              this.$message.success("删除失败");
            }
          });
        })
        .catch((err) => {});
    },
    // 批量删除
    delete_list() {
      this.$confirm("确定要删除吗(｀・ω・´)", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          var dellist = this.deletcondition(this.select_list);
          deletelist(this.$vision.user, "Accflow", dellist).then((res) => {
            if (res != null) {
              this.$message.success("删除成功");
              this.resetForm();
              this.queryData();
            } else {
              this.$message.success("删除失败");
            }
          });
        })
        .catch((err) => {});
    },
    // 显示修改弹窗
    show_edit(val) {
      this.dialogFormVisibleOfEdit = true;
      this.edit_form = { ...val };
    },
    // 取消新增
    cancelAdd() {
      this.$confirm("确定要取消吗(｀・ω・´)", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            message: "取消新增!",
          });
          this.dialogFormVisibleOfAdd = false;
        })
        .catch((err) => {});
    },
    // 取消修改
    cancelEdit() {
      this.$confirm("确定要取消吗(｀・ω・´)", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            message: "取消修改!",
          });
          this.dialogFormVisibleOfEdit = false;
        })
        .catch((err) => {});
    },
    // 重置
    resetForm() {
      this.find_form.data = {};
    },
    //已选表单增减
    handleSelectionChange(val) {
      this.select_list = val;
    },
    deletcondition(list) {
      var newObj = [];
      list.forEach((item) => {
        var json = {
          tableId: item["tableId"],
          userId: item["userId"],
        };
        newObj.push(json);
      });

      return newObj;
    },
  },
};
</script>

<style lang="scss">
#store {
  form {
    .el-form-item {
      display: inline-block;
    }
    .date_btn {
      div {
        vertical-align: middle;
      }
    }
  }
}
</style>
