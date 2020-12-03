<template>
  <div>
    <el-input v-model="data_info.name[0].num"></el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data_info: { name: [{ num: "" }] },
    };
  },

  watch: {
    "data_info.name[0].num": {
      deep: true,
      handler(newV, old) {
        console.log(newV, old);
      },
    },
  },
};
</script>

<style>
</style>