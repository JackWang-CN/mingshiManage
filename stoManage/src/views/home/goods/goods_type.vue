<!-- 商品分类 -->
<template>
  <div id="goods_type" class="shadow_container">
    <div class="pageTitle">商品分类</div>
    <!-- 查询表单 -->

    <!-- 查询条件 -->
    <div class="search">
      <el-input v-model="find_form.info" placeholder="主题、描述、客户经理" prefix-icon="el-icon-search"></el-input>
      <el-button type="primary" @click="showDetails">创建分类</el-button>
    </div>

    <!-- 类型列表 -->
    <el-table
      :data="type_list"
      row-key="code"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="name" label="分类名称" sortable width="200"></el-table-column>
      <el-table-column prop="code" label="分类编号" sortable width="180"></el-table-column>
      <el-table-column prop="design" label="描述说明"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="showDetails(scope.row)">操作</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出框 -->
    <el-dialog title="添加类型" :visible.sync="show_details" id="dialog" width="30%">
      <el-form>
        <el-form-item label-width="80px" label="所属分类">
          <el-select v-model="add_form.large_name" placeholder="请选择分类">
            <el-option label="食品" value="1"></el-option>
            <el-option label="日用" value="2"></el-option>
            <el-option label="新增父类" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label-width="80px" :label="add_form.large_name=='0'?'父类名称':'分类名称'">
          <el-input v-model="add_form.type_name" placeholder="请输入分类名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sendSubmit">确 定</el-button>
        <el-button @click="show_details=false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 查询条件
      find_form: {},
      // 类型新增
      add_form: {},

      type_list: [
        {
          name: "食品",
          code: "1",
          design: "包含柴米油盐姜醋茶、速食、零食",
          children: [
            {
              name: "康师傅红烧牛肉面",
              code: "1-1",
              design: "就是这个味儿！",
            },
            {
              name: "统一老痰酸菜牛肉面",
              code: "1-2",
              design: "有人模仿我的脸",
            },
          ],
        },
        {
          name: "日用",
          code: "2",
          design: "卫生纸、日用护肤品、洗衣粉等",
        },
        {
          name: "厨具",
          code: "3",
          design: "锅碗瓢盆等",
        },
        {
          name: "电器",
          code: "4",
          design: "电视冰箱等",
        },
      ],

      show_details: false, // 弹出框隐藏显示
    };
  },
  methods: {
    // 发送提交请求
    sendSubmit() {
      console.log("提交");
    },

    // 创建分类
    showDetails() {
      this.show_details = true;
    },
  },
};
</script>

<style lang="scss">
#goods_type {
  .el-input {
    width: 300px;
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
  #dialog {
    .el-form-item {
    }
  }
}
</style>
