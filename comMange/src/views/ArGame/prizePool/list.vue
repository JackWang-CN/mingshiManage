<template>
  <div id="pool_list" class="shadow_container">
    <div class="pageTitle">
      奖池列表
      <el-button type="success" @click="showDetails(0)">新增奖池</el-button>
    </div>

    <!-- 查询表单 -->
    <el-form label-width="80px" class="find_form">
      <el-form-item label="奖池名称">
        <el-input v-model="find_form.data.lootStoreName"></el-input>
        <el-button type="primary" style="margin-left: 20px" @click="findData"
          >查询</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="data_list" style="width: 100%" border>
      <el-table-column
        prop="lootStoreName"
        label="奖池名称"
        width="180"
      ></el-table-column>

      <el-table-column
        prop="describe"
        label="奖池描述"
        width="250"
      ></el-table-column>

      <el-table-column label="金币数量" width="200">
        <template slot-scope="scope">
          <div>范围：{{ scope.row.minGlod + "~" + scope.row.maxGlod }}</div>
        </template></el-table-column
      >

      <el-table-column label="掉落数量" width="200">
        <template slot-scope="scope">
          <div>
            范围：{{ scope.row.minLootCount + "~" + scope.row.maxLootCount }}
          </div>
        </template></el-table-column
      >

      <el-table-column
        prop="count"
        label="包含奖品种类"
        width="150"
      ></el-table-column>

      <el-table-column
        prop="updateTime"
        label="更新时间"
        width="180"
      ></el-table-column>

      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button
            type="warning"
            @click="showDetails(1, scope.row)"
            size="small"
            >修改</el-button
          >
          <el-button
            type="success"
            @click="toDetails(scope.row.lootStoreID)"
            size="small"
            >添加奖品</el-button
          >
          <el-button
            type="danger"
            @click="delRow(scope.row.lootStoreID)"
            size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出框 -->
    <el-dialog
      title="奖池详情"
      :visible.sync="show_details"
      width="25%"
      @closed="clear"
    >
      <el-form label-width="80px" class="details_form">
        <el-form-item label="奖池名称">
          <el-input v-model="data_info.lootStoreName"></el-input>
        </el-form-item>

        <el-form-item label="最小数量">
          <el-input-number v-model="data_info.minLootCount"></el-input-number>
        </el-form-item>

        <el-form-item label="最大数量">
          <el-input-number v-model="data_info.maxLootCount"></el-input-number>
        </el-form-item>

        <el-form-item label="最小金币">
          <el-input-number v-model="data_info.minGlod"></el-input-number>
        </el-form-item>

        <el-form-item label="最大金币">
          <el-input-number v-model="data_info.maxGlod"></el-input-number>
        </el-form-item>

        <el-form-item label="描述信息">
          <el-input
            type="textarea"
            :rows="3"
            v-model="data_info.describe"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="saveChange">{{
            operate ? "保存" : "添加"
          }}</el-button>
          <el-button type="info" @click="show_details = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 分页 -->
    <Pagination
      :find="find_form"
      @sizeChange="pageChange('size', $event)"
      @currChange="pageChange('curr', $event)"
    ></Pagination>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { createGet, filteObj, spliceImg, hintMessage } from "@/utils/common";
import { getDataList, addData, updateData, delData } from "@/utils/api/apis";
export default {
  components: {
    Pagination,
  },
  mounted() {
    this.find_form = createGet();
    var form = { ...this.find_form };
    getDataList(this.model, this.control, 1, form, this, "data_list");
  },

  data() {
    return {
      find_form: { data: {} },
      data_list: [],
      data_info: {},

      operate: 0,
      show_details: false,
      model: "ARGame",
      control: "lootStore",
    };
  },

  methods: {
    // 跳转到详情页
    toDetails(id) {
      this.$router.push({
        path: "prizePool_details",
        query: { id },
      });
    },

    // 展示详情
    showDetails(type, row) {
      this.operate = type;
      this.show_details = true;
      this.data_info = { ...row };
    },

    // 查询列表
    findData() {
      var form = filteObj({ ...this.find_form });
      getDataList(this.model, this.control, 1, form, this, "data_list");
    },

    // 删除当前行
    delRow(lootStoreID) {
      console.log("删除", lootStoreID);
      delData(this.model, this.control, 1, { lootStoreID }).then((res) => {
        hintMessage(this, res);
        this.findData();
      });
    },

    // 保存修改
    saveChange() {
      this.show_details = false;
      switch (this.operate) {
        case 0:
          addData(this.model, this.control, 1, this.data_info).then((res) => {
            hintMessage(this, res);
            this.findData();
          });
          break;
        case 1:
          updateData(this.model, this.control, 1, this.data_info).then(
            (res) => {
              hintMessage(this, res);
              this.findData();
            }
          );
          break;
      }
    },

    // 清空
    clear() {
      this.data_info = {};
    },

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
      getDataList(this.model, this.control, 1, form, this, "data_list");
    },
  },

  watch: {
    // 拼接图片url
    data_list() {
      spliceImg(this.data_list, "infoID");
    },
  },
};
</script>

<style lang='scss'>
#pool_list {
  // 查询表单
  .find_form {
    .el-input {
      width: 300px;
    }
  }

  // 详情表单
  .el-dialog {
    padding: 0 20px;
    .details_form {
      .el-input-number {
        width: 100%;
      }
    }
  }
}
</style>