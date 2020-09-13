<template>
  <div id="props_list" class="shadow_container">
    <!-- 道具商城列表 -->
    <div class="pageTitle">
      道具列表
      <el-button type="success" @click="toDetails(0)">添加</el-button>
    </div>

    <!-- 表单 -->
    <el-form ref="find_form" :model="find_form" label-width="80px">
      <el-form-item label="道具名称" label-width="100px">
        <el-input v-model="find_form.data.name" placeholder="请输入道具名称"></el-input>
      </el-form-item>
      <el-form-item label="道具类型" label-width="100px">
        <el-select v-model="find_form.data.rpmtype" placeholder="请选择道具类型">
          <el-option label="户型风格" :value="1"></el-option>
          <el-option label="屋内道具" :value="2"></el-option>
          <el-option label="AR宠物" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="道具状态" label-width="100px">
        <el-select v-model="find_form.data.isEnable" placeholder="请选择道具状态">
          <el-option label="上架中" value="1"></el-option>
          <el-option label="已下架" value="0"></el-option>
        </el-select>
      </el-form-item>

      <!-- 按钮组 -->
      <el-form-item class="btns_find">
        <el-button type="primary" @click="findData">查询</el-button>
        <el-button type="info" @click="resetForm">重置</el-button>
        <el-button type="danger" @click="delList">批量删除</el-button>
      </el-form-item>
    </el-form>

    <!-- tab分页 -->
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="用户房产" name="house"></el-tab-pane>
      <el-tab-pane label="用户道具" name="prop"></el-tab-pane>
      <el-tab-pane label="用户宠物" name="pet"></el-tab-pane>
    </el-tabs>

    <!-- 表格 -->
    <el-table :data="data_list" border style="width: 100%" @selection-change="select">
      <el-table-column type="selection" width="55"></el-table-column>

      <el-table-column prop="name" label="道具名称" width="120"></el-table-column>
      <el-table-column prop="anum" label="售卖数量" width="120"></el-table-column>
      <el-table-column prop="aunitp" label="单价" width="120"></el-table-column>
      <el-table-column prop="typeID" label="道具类型" width="120">
        <!-- <template slot-scope="scope">
          <span v-if="scope.row.typeID==1">户型风格</span>
          <span v-else-if="scope.row.typeID==2">屋内道具</span>
          <span v-else-if="scope.row.typeID==3">AR宠物</span>
        </template>-->
      </el-table-column>
      <el-table-column prop="isEnable" label="道具状态" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.isEnable=1">上架中</span>
          <span v-else-if="scope.row.isEnable=0">已下架</span>
        </template>
      </el-table-column>
      <el-table-column prop="facadeImageID" label="道具缩略图" width="120">
        <template slot-scope="scope">
          <el-avatar shape="square" :size="80" :src="scope.row.rpmico"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="describe" label="道具描述" width="120"></el-table-column>
      <el-table-column prop="createTime" label="上架时间" width="170"></el-table-column>
      <el-table-column prop="validityTimestamp" label="有效期限" width="170"></el-table-column>
      <el-table-column label="操作" width="280">
        <template slot-scope="scope">
          <el-button @click="toDetails" type="info" size="small">详情</el-button>
          <el-button @click="toDetails(1,scope.row.propID)" type="primary" size="small">修改</el-button>
          <el-button
            @click="switchState(scope.row)"
            :type="scope.row.isEnable?'warning':'success'"
            size="small"
          >{{scope.row.isEnable?'下架':'上架'}}</el-button>
          <el-button @click="delRow(scope.row.propID)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页插件 -->
    <Pagination
      :find="find_form"
      @sizeChange="pageChange('size', $event)"
      @currChange="pageChange('curr', $event)"
    ></Pagination>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { createGet, spliceKey, filteObj } from "@/utils/common";
import { getDataList, updateData, delData } from "@/utils/api/apis";
export default {
  components: {
    Pagination,
  },
  mounted() {
    this.activeName = "house";

    this.find_form = createGet();
    var form = { ...this.find_form };
    // 首次加载
    getDataList(this.model, this.control, 1, form, this);
  },

  data() {
    return {
      find_form: { data: {} },
      data_list: [],
      select_list: [], // 选中的列表
      activeName: "",

      model: "prop",
      control: "prop",
    };
  },

  methods: {
    // 查询
    findData() {
      var form = { ...this.find_form };
      form.data = { ...this.find_form.data };
      form.data = filteObj(form.data);
      form.data = spliceKey(form.data);
      getDataList(this.model, this.control, 1, form, this);
    },

    // 跳转到详情页
    toDetails(type, id) {
      this.$router.push({
        path: "props_details",
        query: {
          id,
        },
      });
    },

    // 道具上下架
    switchState(row) {
      var { propID, isEnable } = row;
      isEnable = !isEnable - 0;
      if (isEnable) {
        var operate = "enable";
      } else {
        var operate = "disable";
      }
      var form = { propID, isEnable };
      updateData(this.model, this.control, 1, form, operate).then((res) => {
        if (res) {
          this.$message.success("操作成功！");
          var form = { ...this.find_form };
          getDataList(this.model, this.control, 1, form, this);
        }
      });
    },

    // 删除当前
    delRow(propID) {
      delData(this.model, this.control, 1, { propID }).then((res) => {
        this.$message.success("删除成功！");
        var form = { ...this.find_form };
        getDataList(this.model, this.control, 1, form, this);
      });
    },

    // 批量删除
    delList() {
      if (this.select_list.length) {
        delData(
          this.$vision.user,
          this.control,
          "delList",
          this.select_list
        ).then((res) => {
          this.$message.success("删除成功！");
          var form = { ...this.find_form };
          getDataList(
            this.$vision.user,
            this.control,
            form,
            "data_list",
            this,
            null,
            "rpmico"
          );
        });
      } else {
        this.$message.error("请选中至少一条选项");
      }
    },

    // 获取选中列表
    select(list) {
      this.select_list = list;
    },

    // 重置
    resetForm() {
      this.find_form.data = {};
    },

    // 分页属性改变
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
      delete form.totalDataNum;
      getDataList(this.model, this.control, 1, form, this);
    },
  },

  watch: {
    activeName() {
      console.log(1);
    },
  },
};
</script>

<style lang='scss'>
#props_list {
  form {
    .el-form-item {
      display: inline-block;
      .el-input,
      .el-select {
        width: 200px;
      }
    }
  }
}
</style>