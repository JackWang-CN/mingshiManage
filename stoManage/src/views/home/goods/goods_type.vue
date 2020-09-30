<!-- 商品分类 -->
<template>
  <div id="goods_type" class="shadow_container">
    <div class="pageTitle">商品分类</div>
    <!-- 查询表单 -->

    <!-- 查询条件 -->
    <div class="search">
      <el-input
        v-model="find_form.info"
        placeholder="主题、描述、客户经理"
        prefix-icon="el-icon-search"
      ></el-input>
      <el-button type="primary" @click="showDetails(0)">创建分类</el-button>
    </div>

    <!-- 类型列表 -->
    <el-table
      :data="type_list"
      row-key="code"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column
        prop="name"
        label="分类名称"
        sortable
        width="150"
      ></el-table-column>
      <el-table-column prop="describe" label="分类描述"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            @click="showDetails(1, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="delRow(1, scope.row.typeID)"
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

        <el-form-item label="分类描述">
          <el-input
            type="textarea"
            v-model="data_info.describe"
            placeholder="请输入分类描述"
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
import { getData, addData, delData, getDataList } from "@/utils/api/apis";
import pagination from "@/components/Pagination";
import { createGet, hintMessage } from "@/utils/common";
export default {
  components: {
    pagination,
  },
  mounted() {
    this.find_form = createGet();
    var form = { ...this.find_form };
    getDataList(this.model, this.control, 1, form, this, "type_list");
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

      model: "merGoods",
      control: "goodClass",
    };
  },
  methods: {
    // 发送提交请求
    sendSubmit() {
      switch (this.operate) {
        case 0:
          getData(this.model, this.control, 1, this.data_info, "create").then(
            (res) => {
              console.log(res);
            }
          );
          break;
        case 1:
          addData(this.model, this.control, 1, this.data_info, "update").then(
            (res) => {
              this.show_details = false;
              hintMessage(this, res.code);
              // 重新加载刷新列表
              var form = { ...this.find_form };
              getDataList(this.model, this.control, 1, form, this, "type_list");
            }
          );
          break;
      }
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
    delRow(value) {
      delData(this.model, this.control, 1, { value }).then((res) => {
        hintMessage(this, res.code, "删除成功！");
        // 重新加载刷新列表
        var form = { ...this.find_form };
        getDataList(this.model, this.control, 1, form, this, "type_list");
      });
    },

    // 清空
    clear() {
      this.data_info = {};
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
