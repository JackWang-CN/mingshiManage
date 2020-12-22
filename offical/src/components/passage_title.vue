<!-- 二级标题 -->
<template>
  <h3 class="passage_title">
    {{ text }}
  </h3>
</template>

<script>
export default {
  props: ["text"],
};
</script>

<style lang='scss'>
/* 二级标题 */
.passage_title {
  text-align: left;
  font-size: 30px;
  margin-bottom: 18px;
  margin-top: 10px;
}
</style>
