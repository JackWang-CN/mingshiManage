<!-- 一级标题 -->
<template>
  <div class="section_title">
    <h3>{{ text.pri }}</h3>
    <div>{{ text.sec }}</div>
    <span></span>
  </div>
</template>

<script>
export default {
  props: ["text"],

  data() {
    return {};
  },
};
</script>

<style lang='scss'>
.section_title {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 50px;

  > h3 {
    padding: 0 50px;
    font-size: 40px;
    color: #333;
    margin-bottom: 26px;
    background: url("../assets/images/地球.png") no-repeat 0px 4px;
  }

  > div {
    font-size: 24px;
    color: #999;
  }

  > span {
    display: inline-block;
    height: 4px;
    width: 40px;
    margin-top: 18px;
    border-radius: 2px;
    background: linear-gradient(91deg, #0014ff, #008eff);
  }
}
</style>
