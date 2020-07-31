<!-- 资源类型 -->
<template>
  <div id="resource_type" class="shadow_container">
    <div class="pageTitle">资源分类</div>
    <!-- 查询表单 -->
    <el-form ref="find_form" :model="find_form" label-width="100px" id="find_form">
      <!-- 查询条件 -->
      <el-form-item label="主类型名称">
        <el-select v-model="find_form.primary_name" placeholder="请选择主分类" @change="getIndex">
          <el-option
            v-for="(item,index) in find_form.primary_list"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="次类型名称">
        <el-select v-model="find_form.secondary_name" placeholder="请选择次分类">
          <el-option
            v-for="(item,index) in find_form.secondary_list[find_form.index]"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 按钮组 -->
      <el-form-item>
        <el-button type="primary">查询分类</el-button>
        <el-button type="success" @click="dialogFormVisible = true">新增类型</el-button>
        <el-button type="danger" style="margin-left:50px">批量删除</el-button>
      </el-form-item>
    </el-form>

    <!-- 资源列表 -->
    <el-table ref="type_list" :data="type_list" tooltip-effect="dark" :border="true">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="primary_name" label="主类名称" width="150"></el-table-column>
      <el-table-column prop="secondary_name" label="次类名称" width="150"></el-table-column>
      <el-table-column prop="code" label="类型ID" width="150"></el-table-column>
      <el-table-column prop="message" label="详细说明" width="500"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="type_update(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="type_delete(scope.row)" type="text" size="small" class="btns_delete">删除</el-button>
          <el-button @click="type_batchAdd(scope.row)" type="text" size="small">批量添加资源</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增分类 -->
    <el-dialog title="新增分类" :visible.sync="dialogFormVisible" id="dialog" width="30%">
      <el-form>
        <el-form-item label="主类名称" label-width="80px">
          <el-input v-model="add_form.primary_name" placeholder="请输入主类名称"></el-input>
        </el-form-item>
        <el-form-item label="次类名称" label-width="80px">
          <el-input v-model="add_form.secondary_name" placeholder="请输入次类名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd">取 消</el-button>
        <el-button type="primary" @click="sendAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 查询条件
      find_form: {
        primary_list: ["美食", "交通"],
        secondary_list: [
          ["火锅", "烤肉", "中餐", "西餐", "海鲜"],
          ["公交", "地铁", "飞机", "火车", "轻轨"]
        ],
        primary_name: "",
        secondary_name: "",
        index: -1
      },
      // 类型新增
      add_form: {
        primary_name: "",
        secondary_name: ""
      },
      dialogFormVisible: false, // 弹出框隐藏显示

      type_list: [
        {
          primary_name: "美食",
          secondary_name: "火锅",
          code: "001",
          message: "可以吃火锅啦"
        },
        {
          primary_name: "美食",
          secondary_name: "烤肉",
          code: "002",
          message: "可以吃烤肉啦"
        },
        {
          primary_name: "美食",
          secondary_name: "中餐",
          code: "003",
          message: "可以吃中餐啦"
        },
        {
          primary_name: "美食",
          secondary_name: "西餐",
          code: "004",
          message: "可以吃西餐啦"
        }
      ],
      multipleSelection: []
    };
  },
  methods: {
    type_add() {
      this.$router.push("author_typeAdd");
    },
    type_update(row) {
      console.log("点击了编辑", "当前行ID：", row.code);
    },
    type_delete(row) {
      console.log("点击了删除", "当前行ID：", row.code);
    },
    type_batchAdd(row) {
      console.log("点击了批量添加", "当前行ID：", row.code);
    },
    // 获得一级菜单索引
    getIndex() {
      this.find_form.secondary_name = ""; // 清空次类
      var index = this.find_form.primary_list.indexOf(
        this.find_form.primary_name
      );
      this.find_form.index = index;
    },
    // 取消新增
    cancelAdd() {
      this.$confirm("确定取消吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            message: "取消操作"
          });
          this.dialogFormVisible = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 发送新增
    sendAdd() {
      alert("新增成功");
      this.dialogFormVisible = false;
    }
  }
};
</script>

<style lang='scss'>
#resource_type {
  // 查询表单
  form#find_form {
    .el-form-item {
      display: inline-block;
    }
  }
  // 资源列表
  .el-table {
    display: inline-block;
    &::before {
      height: 0;
    }
  }

  // 弹出框
  #dialog {
    .el-form-item {
    }
  }
}
</style>