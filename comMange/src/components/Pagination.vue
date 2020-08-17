<template>
  <!-- 分页组件 -->
  <div class="pagination">
    <el-pagination
      background
      layout="prev, pager,sizes, next"
      :total="find.totalDataNum"
      :page-sizes="[5,10,20,50]"
      :current-page="find.currPage"
      @size-change="sizeChange"
      @current-change="currChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: ["find"],

  methods: {
    sizeChange(page) {
      this.$emit("sizeChange", page);
    },

    currChange(curr) {
      this.$emit("currChange", curr);
    },
  },
};
</script>

<style>
.pagination {
  margin-top: 20px;
}
</style>