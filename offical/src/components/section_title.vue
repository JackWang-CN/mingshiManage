<!-- 一级标题 -->
<template>
  <div class="section_title">
    <h3>{{ text.pri }}</h3>
    <div>{{ text.sec }}</div>
  </div>
</template>

<script>
export default {
  props: ["text"],
};
</script>

<style></style>
