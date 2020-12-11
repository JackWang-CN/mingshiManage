<template>
  <div id="friend_list" class="card_container">
    <!-- 好友列表 -->
    <div class="pageTitle">好友列表</div>

    <!-- 查询条件 -->
    <div class="search">
      <div class="filter">
        <el-input
          v-model="find_form.data.reqId"
          placeholder="好友名称"
        ></el-input>
      </div>
    </div>

    <!-- 好友列表 -->
    <el-table
      :data="data_list"
      tooltip-effect="dark"
      :border="true"
      @selection-change="select"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        prop="reqId"
        label="好友名称"
        width="200"
        sortable
      ></el-table-column>
      <el-table-column
        prop="desInfo"
        label="头像"
        width="250"
      ></el-table-column>
      <el-table-column prop="reqStatus" label="添加时间" width="100">
        <template slot-scope="scope">{{
          scope.row.reqStatus ? "禁用" : "启用"
        }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="toDetails(scope.row.reqId)"
            type="primary"
            size="small"
            >编辑</el-button
          >
          <el-button @click="delRow(scope.row.reqId)" type="danger" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页插件 -->
    <pagination
      :find="find_form"
      @sizeChange="pageChange('size', $event)"
      @currChange="pageChange('curr', $event)"
    ></pagination>
  </div>
</template>

<script>
import pagination from "@/components/Pagination";
import { getDataList, delData } from "@/utils/api/apis";
import { createGet, filteObj, spliceKey } from "@/utils/common";
export default {
  components: {
    pagination,
  },
  mounted() {
    // 首次加载
    // getDataList(this.model, this.control, 1, createGet(1, 10), this);
  },

  data() {
    return {
      find_form: { data: {} },
      data_list: [],
      select_list: [],
      btn_status: false,

      model: "",
      control: "",
    };
  },

  methods: {
    // 查询
    findList() {
      this.btn_status = true;
      setTimeout(() => {
        this.btn_status = false;
      }, 500);

      var form = { ...this.find_form };
      form.data = filteObj(form.data);
      form.data = spliceKey(form.data);
      getDataList(
        this.$vision.merchant,
        "Entrustreqdata",
        form,
        "data_list",
        this,
        "btn_status"
      );
    },

    // 删除当前
    delRow(reqId) {
      var obj = { reqId };
      delData(this.$vision.merchant, "Meraddata", "del", obj).then((res) => {
        if (res) {
          this.$message.success("删除成功！");
          getDataList(
            this.$vision.merchant,
            "Meraddata",
            createGet(1, 10),
            "data_list",
            this
          );
        }
      });
    },
    // 删除批量
    delList() {
      if (this.select_list.length) {
        delData(
          this.$vision.merchant,
          "Meraddata",
          "delList",
          this.select_list
        ).then((res) => {
          if (res) {
            this.$message.success("删除成功！");
            getDataList(
              this.$vision.merchant,
              "Meraddata",
              this.find_form,
              "data_list",
              this
            );
          }
        });
      } else {
        this.$message.error("请勾选至少一项");
        return;
      }
    },

    // 跳转到详情页
    toDetails(id) {
      this.$router.push({
        path: "entrust_details",
        query: { id },
      });
    },

    // 重置
    resetForm() {
      this.find_form = {
        currPage: 1,
        pageSize: 10,
        data: {},
      };
    },

    // 获取选中项
    select(list) {
      this.select_list = list;
    },

    // 分页改变时触发
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
      getDataList(this.model, this.control, 1, createGet(1, 10), this);
    },
  },
};
</script>

<style lang='scss'>
#friend_list {
  // 查询表单
  .search {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .filter {
      .el-input {
        margin-right: 100px;
      }
    }
    .el-input {
      width: 300px;
    }
  }

  // 角色列表
  .el-table {
    .cell {
      max-height: 200px;
      img {
        height: 180px;
      }
    }
  }
}
</style>