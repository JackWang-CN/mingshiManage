<!-- 商户经营类别 -->
<template>
  <div id="store_type" class="shadow_container">
    <div class="pageTitle">商户经营类别</div>

    <!-- 列表 -->
    <el-table :data="data_list" border>
      <el-table-column
        prop="name"
        label="类型名称"
        width="180"
      ></el-table-column>

      <el-table-column
        prop="typeID"
        label="类型ID"
        width="180"
      ></el-table-column>
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
import { getDataList, addData } from "@/utils/api/apis";
import { createGet } from "@/utils/common";
export default {
  components: {
    Pagination,
  },

  mounted() {
    this.find_form = createGet();
    getDataList(this.model, this.control, 1, this.find_form, this);
  },

  data() {
    return {
      find_form: {},
      data_list: [],
      data_info: {},

      operate: 0,

      model: "merchant",
      control: "merManageType",
    };
  },

  methods: {
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
      getDataList(this.model, this.control, 1, form, this);
    },
  },
};
</script>

<style lang='scss'>
</style>