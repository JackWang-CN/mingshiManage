<template>
  <div class="container">
    <h1>首页</h1>
  </div>
</template>

<script>
// import { switchKeyName } from "@/utils/utils";
export default {
  mounted() {},
  data() {
    return {
      // 图片列表
      banner: [],
      dialogFormVisible: false,
    };
  },
  methods: {
    // 新增
    addImg() {
      this.dialogFormVisible = true;
    },
    // 编辑
    changeInfo(row) {
      this.dialogFormVisible = true;
    },
    // 保存修改
    saveChange() {},
    // 删除
    deleteRow(row) {},
  },
};
</script>

<style lang="scss">
.dashboard {
  &-container {
    margin: 30px;
    h1 {
      font-weight: normal;
      font-size: 18px;
      border-bottom: 1px solid #d6d5d5;
      padding-bottom: 5px;
    }
    .table {
      margin-bottom: 20px;
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
