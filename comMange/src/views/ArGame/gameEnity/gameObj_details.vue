<template>
  <div id="gameEnity_details" class="shadow_container">
    <div class="pageTitle">普通实体对象</div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import {
  getDataList,
  getDataDetails,
  addDataList,
  updateDetails,
  getFileList,
} from "@/utils/api/apis";
import { createGet, filteObj } from "@/utils/common";
export default {
  components: {
    Pagination,
  },
  mounted() {
    // 请求奖池列表
    getDataList(
      this.model,
      "lootStore",
      1,
      createGet(1, 99),
      this,
      "loot_list"
    );

    // 请求内容池列表
    getDataList(
      this.model,
      "contentStore",
      1,
      createGet(1, 99),
      this,
      "content_list"
    );

    var { id } = this.$route.query;
    if (id) {
      this.operate = 1;
      getDataDetails(
        this.model,
        this.control,
        1,
        { gameEntityID: id },
        this,
        "data_info"
      );
    }
  },

  data() {
    return {
      find_form: {},

      gameObj_list: [], // 游戏对象列表
      operate: 0, // 0-新增 1-修改
      model: "ARGame",
      control: "gameEntity",
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
      getDataList(
        this.model,
        this.dialogControl,
        1,
        this.find_form,
        this,
        "gameObj_list"
      );
    },

    // 取消回到列表页
    cancel() {
      this.$router.push("gameEnity_list");
    },
  },
};
</script>

<style lang='scss'>
#gameEnity_details {
  form {
    .el-form-item__content {
      width: 300px;
      .el-input,
      .el-input-number,
      .el-select,
      .el-textarea {
        width: 100%;
      }
    }
  }
}
</style>