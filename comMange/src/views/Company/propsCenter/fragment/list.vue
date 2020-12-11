
<template>
  <div id="fragment_list" class="shadow_container">
    <div class="pageTitle">
      碎片列表
      <el-button type="success" @click="toDetails(0)">添加碎片</el-button>
    </div>

    <!-- 查询表单 -->
    <el-form label-width="80px">
      <el-form-item label="碎片名称">
        <el-input v-model="find_form.data.name" clearable></el-input>
        <el-button type="primary" style="margin-left: 20px" @click="findData"
          >查询</el-button
        >
      </el-form-item>
    </el-form>

    <el-table :data="data_list" style="width: 100%" border>
      <el-table-column
        prop="name"
        label="碎片名称"
        width="180"
      ></el-table-column>

      <el-table-column label="图标" width="120">
        <template slot-scope="scope">
          <el-avatar
            :size="80"
            :src="scope.row.imgUrl"
            shape="square"
          ></el-avatar>
        </template>
      </el-table-column>

      <el-table-column label="图片（未凑齐）" width="120">
        <template slot-scope="scope">
          <el-avatar
            :size="80"
            :src="scope.row.noFullUrl"
            shape="square"
          ></el-avatar>
        </template>
      </el-table-column>

      <el-table-column
        prop="describe"
        label="碎片描述"
        width="300"
      ></el-table-column>

      <el-table-column prop="isEnable" label="启用状态" width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.isEnable == 1">启用</span>
          <span v-else>禁用</span>
        </template></el-table-column
      >

      <el-table-column
        prop="expireTime"
        label="到期时间"
        width="180"
      ></el-table-column>

      <el-table-column
        prop="updateTime"
        label="更新时间"
        width="180"
      ></el-table-column>

      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="toDetails(1, scope.row.chipID)"
            size="small"
            >修改</el-button
          >

          <el-button
            type="danger"
            @click="delRow(scope.row.chipID)"
            size="small"
            >删除</el-button
          >

          <el-button
            @click="switchState(scope.row)"
            :type="scope.row.isEnable ? 'danger' : 'warning'"
            size="small"
            >{{ scope.row.isEnable ? "禁用" : "启用" }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <Pagination
      :find="find_form"
      @sizeChange="pageChange('size', $event)"
      @currChange="pageChange('curr', $event)"
    ></Pagination>
  </div>
</template>

<script>
const fileUrl = window.baseUrl.ar_2d;
import Pagination from "@/components/Pagination";
import { createGet, filteObj, spliceImg, hintMessage } from "@/utils/common";
import { getDataList, delData, updateData } from "@/utils/api/apis";
export default {
  components: {
    Pagination,
  },
  mounted() {
    this.find_form = createGet();
    var form = { ...this.find_form };
    getDataList(this.model, this.control, 1, form, this);
  },

  data() {
    return {
      find_form: { data: {} },
      data_list: [],

      model: "propChip",
      control: "propChip",
    };
  },

  methods: {
    // 跳转到详情页
    toDetails(type, id) {
      this.$router.push({
        path: "props_fragmentDetails",
        query: { id },
      });
    },

    // 查询列表
    findData() {
      var form = filteObj({ ...this.find_form });
      getDataList(this.model, this.control, 1, form, this);
    },

    // 删除当前行
    delRow(chipID) {
      delData(this.model, this.control, 1, { chipID }).then((res) => {
        hintMessage(this, res);
        var form = { ...this.find_form };
        getDataList(this.model, this.control, 1, form, this);
      });
    },

    // 切换禁用/启用
    switchState(row) {
      var { chipID, isEnable } = row;
      var operate = isEnable ? "disable" : "enable";
      updateData(this.model, this.control, 1, { chipID }, operate).then(
        (res) => {
          hintMessage(this, res);
          var form = { ...this.find_form };
          getDataList(this.model, this.control, 1, form, this);
        }
      );
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
      getDataList(this.model, this.control, 1, form, this);
    },
  },

  watch: {
    // 拼接图片url
    data_list() {
      spliceImg(this.data_list, "imgID", true);
      this.data_list.forEach((item) => {
        if (item.nonFullImgID) item.noFullUrl = fileUrl + item.nonFullImgID;
      });
    },
  },
};
</script>

<style lang='scss'>
#fragment_list {
  form {
    .el-input {
      width: 300px;
    }
  }
}
</style>