<!-- 商品分类 -->
<template>
  <div id="goods_type" class="card_container">
    <div class="pageTitle">商品分类</div>
    <!-- 查询表单 -->

    <!-- 查询条件 -->
    <div class="search">
      <el-input
        v-model="find_form.info"
        placeholder="主题、描述、客户经理"
        prefix-icon="el-icon-search"
      ></el-input>
      <div>
        <el-button type="primary" @click="showDetails(0)">创建分类</el-button>
        <el-button type="warning" @click="resetType(0)">重置分类</el-button>
      </div>
    </div>

    <!-- 类型列表 -->
    <el-table
      :data="type_list"
      row-key="code"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="sort" label="顺序调整" width="250">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="shiftUp(0, scope.row.sort)"
            :disabled="scope.row.sort == 1"
            >最前</el-button
          >
          <el-button
            size="small"
            @click="shiftUp(1, scope.row.sort)"
            :disabled="scope.row.sort == 1"
            >∧</el-button
          >
          <el-button
            size="small"
            @click="shiftDown(1, scope.row.sort)"
            :disabled="scope.row.sort == length"
            >∨</el-button
          >
          <el-button
            size="small"
            @click="shiftDown(0, scope.row.sort)"
            :disabled="scope.row.sort == length"
            >最后</el-button
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="sort"
        label="序号"
        sortable
        width="150"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="分类名称"
        sortable
        width="150"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            @click="showDetails(1, scope.row)"
            >编辑</el-button
          >
          <el-button size="small" type="danger" @click="delRow(scope.row.sort)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出框 -->
    <el-dialog
      title="添加类型"
      :visible.sync="show_details"
      id="details_form"
      @closed="clear"
    >
      <el-form label-width="80px">
        <el-form-item label="分类名称">
          <el-input
            v-model="data_info.name"
            placeholder="请输入分类名称"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="sendSubmit">确 定</el-button>
          <el-button @click="show_details = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 分页插件 -->
    <pagination
      :find="find_form"
      @sizeChange="pageChange('size', $event)"
      @currChange="pageChange('curr', $event)"
    ></pagination>
  </div>
</template>

<script>
import { getData, getDataList } from "@/utils/api/apis";
import pagination from "@/components/Pagination";
import { createGet, hintMessage } from "@/utils/common";
export default {
  components: {
    pagination,
  },
  mounted() {
    this.find_form = createGet();
    var form = { ...this.find_form };
    getDataList(
      this.model,
      this.control,
      1,
      {},
      this,
      "type_list",
      "classDetailsList"
    );
  },

  data() {
    return {
      // 查询条件
      find_form: {},
      // 类型新增
      data_info: {},

      type_list: [],

      show_details: false, // 弹出框隐藏显示
      operate: 0,
      length: 0,

      model: "merGoods",
      control: "goodClass",
    };
  },
  methods: {
    // 发送提交请求
    sendSubmit() {
      var list = [...this.type_list];
      this.show_details = false;

      // 1.判断新增或修改
      switch (this.operate) {
        // 1-1 新增
        case 0:
          this.data_info.sort = this.type_list.length + 1;
          this.data_info.typeID = "";
          list.push(this.data_info);
          break;
        // 1-2 修改
        case 1:
          var index = this.data_info.sort - 1;
          list.splice(index, 1, this.data_info);
          break;
      }

      // 2.发送请求
      getData(this.model, this.control, 1, list, "editTypeList").then((res) => {
        hintMessage(this, res);
        var form = { ...this.find_form };
        getDataList(
          this.model,
          this.control,
          1,
          {},
          this,
          "type_list",
          "classDetailsList"
        );
      });
    },

    // 展示详情
    showDetails(type, row) {
      this.show_details = true;
      if (type) {
        this.operate = type;
        this.data_info = { ...row };
      }
    },

    // pageSize改变时触发
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
      getDataList(this.model, this.control, 1, form, this, "goods_list");
    },

    // 删除当前行
    delRow(sort) {
      var list = [...this.type_list];
      var index = sort - 1;
      list.splice(index, 1);
      list = this.reSort(list);

      getData(this.model, this.control, 1, list, "editTypeList").then((res) => {
        hintMessage(this, res);
        var form = { ...this.find_form };
        getDataList(
          this.model,
          this.control,
          1,
          {},
          this,
          "type_list",
          "classDetailsList"
        );
      });
    },

    // 上移调整
    shiftUp(type, sort) {
      var list = JSON.parse(JSON.stringify(this.type_list));
      var index = sort - 1;
      var newArr = list.splice(index, 1);
      if (type) {
        // 1.上移一位
        list.splice(index - 1, 0, newArr[0]);
      } else {
        // 2.上移到最前
        list.unshift(newArr[0]);
      }
      list = this.reSort(list);

      //  发送请求并重载
      getData(this.model, this.control, 1, list, "editTypeList").then((res) => {
        hintMessage(this, res);
        var form = { ...this.find_form };
        getDataList(
          this.model,
          this.control,
          1,
          {},
          this,
          "type_list",
          "classDetailsList"
        );
      });
    },

    // 下移调整
    shiftDown(type, sort) {
      var list = JSON.parse(JSON.stringify(this.type_list));
      var index = sort - 1;
      var newArr = list.splice(index, 1);
      if (type) {
        // 1.下移一位
        list.splice(index + 1, 0, newArr[0]);
      } else {
        // 2.下移到最后
        list.push(newArr[0]);
      }
      list = this.reSort(list);

      //  发送请求并重载
      getData(this.model, this.control, 1, list, "editTypeList").then((res) => {
        hintMessage(this, res);
        var form = { ...this.find_form };
        getDataList(
          this.model,
          this.control,
          1,
          {},
          this,
          "type_list",
          "classDetailsList"
        );
      });
    },

    // 重置分类
    resetType() {
      getData(this.model, this.control, 1, {}, "resetTypeList").then((res) => {
        hintMessage(this, res);
        var form = { ...this.find_form };
        getDataList(this.model, this.control, 1, form, this, "type_list");
      });
    },

    // 清空
    clear() {
      this.data_info = {};
    },

    // 重新排序
    reSort(list) {
      list.forEach((item, index) => {
        item.sort = index + 1;
      });
      return list;
    },
  },

  watch: {
    type_list() {
      if (this.type_list instanceof Array) this.length = this.type_list.length;
    },
  },
};
</script>

<style lang="scss">
#goods_type {
  .search {
    .el-input {
      width: 300px;
    }
  }

  .search {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  // 资源列表
  .el-table {
    display: inline-block;
    &::before {
      height: 0;
    }
  }

  // 弹出框
  #details_form {
    .el-input,
    .el-textarea {
      width: 300px;
    }
  }
}
</style>
