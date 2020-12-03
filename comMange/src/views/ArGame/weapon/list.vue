<template>
  <div id="weapon_list" class="shadow_container">
    <div class="pageTitle">武器列表</div>

    <!-- 查询表单 -->
    <el-form label-width="80px">
      <el-form-item label="武器名称">
        <el-input v-model="find_form.data.weaponName" clearable></el-input>
        <el-button type="primary" style="margin-left: 20px" @click="findData"
          >查询</el-button
        >
      </el-form-item>
    </el-form>

    <el-table :data="data_list" style="width: 100%" border>
      <el-table-column
        prop="weaponName"
        label="武器名称"
        width="180"
      ></el-table-column>

      <!-- <el-table-column label="图标" width="120">
        <template slot-scope="scope">
          <el-avatar
            :size="80"
            :src="scope.row.imgUrl"
            shape="square"
          ></el-avatar>
        </template>
      </el-table-column> -->

      <el-table-column
        prop="spendGlod"
        label="金币消耗"
        width="150"
      ></el-table-column>

      <el-table-column prop="type" label="类型" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.weaponType == 0">免费武器</span>
          <span v-else-if="scope.row.weaponType == 1">轻型武器</span>
          <span v-else-if="scope.row.weaponType == 2">中型武器</span>
          <span v-else-if="scope.row.weaponType == 3">重型武器</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="criticalChance"
        label="暴击几率"
        width="120"
      ></el-table-column>

      <el-table-column
        prop="criticalMultiple"
        label="暴击伤害系数"
        width="120"
      ></el-table-column>

      <el-table-column
        prop="minDamage"
        label="最小伤害"
        width="120"
      ></el-table-column>

      <el-table-column
        prop="maxDamage"
        label="最大伤害"
        width="120"
      ></el-table-column>

      <el-table-column
        prop="updateTime"
        label="更新时间"
        width="180"
      ></el-table-column>

      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            type="warning"
            @click="toDetails(1, scope.row.weaponID)"
            size="small"
            >修改</el-button
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
import Pagination from "@/components/Pagination";
import { createGet, filteObj, spliceImg, hintMessage } from "@/utils/common";
import { getDataList, delData } from "@/utils/api/apis";
export default {
  components: {
    Pagination,
  },
  mounted() {
    this.find_form = createGet();
    var form = filteObj({ ...this.find_form });
    getDataList(this.model, this.control, 1, form, this, "data_list");
  },

  data() {
    return {
      find_form: { data: {} },
      data_list: [],

      model: "ARGame",
      control: "armsConfig",
    };
  },

  methods: {
    // 跳转到详情页
    toDetails(type, id) {
      this.$router.push({
        path: "weapon_details",
        query: { id },
      });
    },

    // 查询列表
    findData() {
      var form = filteObj({ ...this.find_form });
      getDataList(this.model, this.control, 1, form, this, "data_list");
    },

    // 删除当前行
    delRow(id) {
      delData(this.model, this.control, 1, { weaponID: id }).then((res) => {
        hintMessage(this, res);
        var form = filteObj({ ...this.find_form });
        getDataList(this.model, this.control, 1, form, this, "data_list");
      });
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
      var form = filteObj({ ...this.find_form });
      getDataList(this.model, this.control, 1, form, this, "data_list");
    },
  },

  watch: {
    // 拼接图片url
    data_list() {
      this.data_list = spliceImg(this.data_list, "resourcesID", true);
    },
  },
};
</script>

<style lang='scss'>
#weapon_list {
  form {
    .el-input {
      width: 300px;
    }
  }
}
</style>