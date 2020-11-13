
<template>
  <div id="synthesize_list" class="shadow_container">
    <div class="pageTitle">
      合成方案
      <el-button type="success" @click="toDetails(0)">添加方案</el-button>
    </div>

    <!-- 查询表单 -->
    <el-form label-width="80px">
      <el-form-item label="方案名称">
        <el-input v-model="find_form.data.weaponName"></el-input>
        <el-button type="primary" style="margin-left: 20px" @click="findData"
          >查询</el-button
        >
      </el-form-item>
    </el-form>

    <el-table :data="data_list" style="width: 100%" border>
      <el-table-column
        prop="propName"
        label="道具名称"
        width="180"
      ></el-table-column>

      <el-table-column prop="ico" label="缩略图" width="120">
        <template slot-scope="scope">
          <el-avatar
            :size="80"
            :src="scope.row.imgUrl"
            shape="square"
          ></el-avatar>
        </template>
      </el-table-column>

      <el-table-column
        prop="describe"
        label="配方描述"
        width="200"
      ></el-table-column>

      <el-table-column prop="isEnable" label="启用状态" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.isEnable == 0">禁用</span>
          <span v-else>启用</span>
        </template></el-table-column
      >
      <el-table-column
        prop="updateTime"
        label="更新时间"
        width="180"
      ></el-table-column>

      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            type="warning"
            @click="toDetails(1, scope.row.propID)"
            size="small"
            >修改</el-button
          >

          <el-button
            type="danger"
            @click="delRow(scope.row.propID)"
            size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <Pagination
      :find="find_form"
      @sizeChange="pageChange('size', $event)"
      @currChange="pageChange('curr', $event)"
    ></Pagination>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { createGet, filteObj, spliceImg } from "@/utils/common";
import { getDataList } from "@/utils/api/apis";
export default {
  components: {
    Pagination,
  },
  mounted() {
    this.find_form = createGet();
    var form = { ...this.find_form };
    getDataList(this.model, this.control, 1, form, this, "data_list");
  },

  data() {
    return {
      find_form: { data: {} },
      data_list: [],

      model: "propChip",
      control: "propChipGlue",
    };
  },

  methods: {
    // 跳转到详情页
    toDetails(type, id) {
      this.$router.push({
        path: "props_synthesizeDetails",
        query: { id },
      });
    },

    // 查询列表
    findData() {
      var form = filteObj({ ...this.find_form });
      getDataList(this.model, this.control, 1, form, this, "data_list");
    },

    // 删除当前行
    delRow(id) {
      console.log("删除", id);
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
      getDataList(this.model, this.control, 1, form, this, "data_list");
    },
  },

  watch: {
    // 拼接图片url
    data_list() {
      this.data_list = spliceImg(this.data_list, "glueImg", true);
    },
  },
};
</script>

<style lang='scss'>
#synthesize_list {
  form {
    .el-input {
      width: 300px;
    }
  }
}
</style>