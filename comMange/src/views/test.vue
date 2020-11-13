<template>
  <div id="parent">
    <!-- 3.使用子组件 -->
    <Pagination></Pagination>
  </div>
</template>

<script>
// 1.引入子组件
import Pagination from "@/components/Pagination";
export default {
  // 2.注册子组件
  components: {
    Pagination,
  },
};
</script>