<!-- 资源列表 -->
<template>
  <div id="resource_list" class="shadow_container">
    <div class="pageTitle">资源列表</div>
    <!-- 查询表单 -->
    <el-form ref="find_resource" :model="find_resource" label-width="100px">
      <!-- 查询条件 -->
      <el-form-item label="资源名称">
        <el-input v-model="find_resource.name" placeholder="请输入资源名称"></el-input>
      </el-form-item>
      <el-form-item label="资源主分类">
        <el-select v-model="find_resource.primary_type" placeholder="请选择主分类">
          <el-option label="大类一" value="大类一"></el-option>
          <el-option label="大类二" value="大类二"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="资源次分类">
        <el-select v-model="find_resource.secondary_type" placeholder="请选择次分类">
          <el-option label="小类一" value="小类一"></el-option>
          <el-option label="小类二" value="小类二"></el-option>
        </el-select>
      </el-form-item>
      <!-- 日期查询 -->
      <div class="date_btn">
        <el-form-item label="创建时间" label-width="100px">
          <el-date-picker
            v-model="find_resource.create_date"
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
          <el-button type="danger" style="margin-left:50px">批量删除</el-button>
        </el-form-item>
      </div>
    </el-form>

    <!-- 角色列表 -->
    <el-table ref="resource_list" :data="resource_list" tooltip-effect="dark" :border="true">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="资源名称" width="150"></el-table-column>
      <el-table-column prop="status" label="是否禁用" width="150"></el-table-column>
      <el-table-column prop="primary_type" label="所属主类" width="150"></el-table-column>
      <el-table-column prop="secondary_type" label="所属次类" width="150"></el-table-column>
      <el-table-column prop="code" label="资源ID" width="150"></el-table-column>
      <el-table-column prop="save_name" label="资源存储文件名" width="150"></el-table-column>
      <el-table-column prop="real_name" label="资源实际文件名" width="150"></el-table-column>
      <el-table-column prop="suffix_name" label="资源后缀名" width="100"></el-table-column>
      <el-table-column prop="create_date" label="创建时间" width="250"></el-table-column>
      <el-table-column prop="update_date" label="最后修改时间" width="250"></el-table-column>

      <el-table-column prop="message" label="详细说明" width="500"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="resource_update(scope.row)" type="text" size="small">编辑</el-button>
          <el-button
            @click="resource_delete(scope.row)"
            type="text"
            size="small"
            class="btns_delete"
          >删除</el-button>
          <el-button @click="resource_batchAdd(scope.row)" type="text" size="small">批量添加成员</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      find_resource: {
        name: "",
        primary_type: "",
        secondary_type: "",
        create_date: ""
      },
      resource_list: [
        {
          name: "空调",
          status: "启用",
          primary_type: "居家",
          secondary_type: "家电",
          code: "001",
          message: "用于公司内部开发管理。",
          save_name: "我的应用",
          real_name: "360安全中心",
          suffix_name: "exe",
          create_date: "2020-05-20 11:46",
          update_date: "2020-06-09 11:46"
        },
        {
          name: "冰箱",
          status: "启用",
          primary_type: "居家",
          secondary_type: "家电",
          code: "002",
          message: "用于查询、新增。",

          save_name: "我的应用",
          real_name: "360安全中心",
          suffix_name: "exe",
          create_date: "2020-05-20 11:46",
          update_date: "2020-06-09 11:46"
        },
        {
          name: "洗衣机",
          status: "启用",
          primary_type: "居家",
          secondary_type: "家电",
          code: "003",
          message: "测试角色模版。",
          save_name: "我的应用",
          real_name: "360安全中心",
          suffix_name: "exe",
          create_date: "2020-05-20 11:46",
          update_date: "2020-06-09 11:46"
        },
        {
          name: "电视机",
          status: "启用",
          primary_type: "居家",
          secondary_type: "家电",
          code: "004",
          message: "测试角色模版。",
          save_name: "我的应用",
          real_name: "360安全中心",
          suffix_name: "exe",
          create_date: "2020-05-20 11:46",
          update_date: "2020-06-09 11:46"
        }
      ],
      multipleSelection: []
    };
  },
  methods: {
    resource_add() {
      this.$router.push("author_resourceAdd");
    },
    resource_update() {
      console.log("点击了编辑");
    },
    resource_delete() {
      console.log("点击了删除");
    },
    resource_batchAdd() {
      console.log("点击了批量添加");
    },
    // 重置
    resetForm() {
      this.find_resource = {
        name: "",
        primary_type: "",
        secondary_type: "",
        create_date: ""
      };
    }
  }
};
</script>

<style lang='scss'>
#resource_list {
  // 查询表单
  form {
    .el-form-item {
      display: inline-block;
    }
  }
  // 角色列表
  .el-table {
    display: inline-block;
    &::before {
      height: 0;
    }
  }
}
</style>