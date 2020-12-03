<template>
  <div id="gameObj_list" class="shadow_container">
    <div class="pageTitle">游戏对象列表</div>
    <el-tabs v-model="activeName" type="card">
      <!-- 查询表单 -->
      <el-form label-width="80px">
        <el-form-item label="对象名称">
          <el-input v-model="find_form.data.name" clearable></el-input>
          <el-button type="primary" style="margin-left: 20px" @click="findData"
            >查询</el-button
          >
          <el-button type="success" @click="toDetails()">添加对象</el-button>
        </el-form-item>
      </el-form>

      <el-tab-pane label="游戏对象" name="gameObj">
        <!-- 游戏对象列表 -->
        <el-table :data="data_list" style="width: 100%" border>
          <el-table-column
            prop="name"
            label="对象名称"
            width="180"
          ></el-table-column>

          <el-table-column prop="ico" label="图标" width="120">
            <template slot-scope="scope">
              <el-avatar
                :size="70"
                :src="scope.row.imgUrl"
                shape="square"
              ></el-avatar>
            </template>
          </el-table-column>

          <el-table-column
            prop="speed"
            label="速度"
            width="180"
          ></el-table-column>

          <el-table-column prop="typeName" label="类型" width="120">
          </el-table-column>

          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button
                type="warning"
                @click="toDetails(scope.row.objectInfoID)"
                size="small"
                >修改</el-button
              >

              <el-button
                type="danger"
                @click="delRow(scope.row.objectInfoID)"
                size="small"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <!-- 生物对象列表 -->
      <el-tab-pane label="生物对象" name="biologyObj">
        <el-table :data="data_list" border>
          <el-table-column
            prop="name"
            label="生物名称"
            width="160"
          ></el-table-column>

          <el-table-column prop="gender" label="生物性别" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.gender == 0">女</span>
              <span v-else-if="scope.row.gender == 1">男</span>
            </template></el-table-column
          >

          <el-table-column prop="ico" label="图标" width="120">
            <template slot-scope="scope">
              <el-avatar
                :size="70"
                :src="scope.row.imgUrl"
                shape="square"
              ></el-avatar>
            </template>
          </el-table-column>

          <el-table-column
            prop="criticalChance"
            label="暴击几率"
            width="100"
          ></el-table-column>

          <el-table-column
            prop="speed"
            label="速度"
            width="100"
          ></el-table-column>

          <el-table-column prop="type" label="生命值" width="160">
            <template slot-scope="scope">
              {{ scope.row.minHp + "~" + scope.row.maxHp }}
            </template>
          </el-table-column>

          <el-table-column prop="type" label="回血量" width="160">
            <template slot-scope="scope">
              <div>
                战斗状态：{{ scope.row.backBlood ? scope.row.backBlood : 0 }}
              </div>
              <div>
                正常状态：{{
                  scope.row.normalBackCount ? scope.row.normalBackCount : 0
                }}
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="attacked" label="能否被攻击" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.attacked == 0">否</span>
              <span v-else-if="scope.row.attacked == 1">是</span>
            </template></el-table-column
          >

          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button
                type="warning"
                @click="toDetails(scope.row.creatureInfoID)"
                size="small"
                >修改</el-button
              >

              <el-button
                type="danger"
                @click="delRow(scope.row.creatureInfoID)"
                size="small"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

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
    var { tab } = this.$route.params;
    this.activeName = tab || "gameObj";
  },

  data() {
    return {
      find_form: { data: {} },
      data_list: [],

      activeName: "",
      model: "ARGame",
      control: "",
    };
  },

  methods: {
    // 跳转到详情页
    toDetails(id) {
      var path = this.control + "_details";
      this.$router.push({
        path,
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
      switch (this.control) {
        case "gameObj":
          var form = { objectInfoID: id };
          break;
        case "biologyObj":
          var form = { creatureInfoID: id };
          break;
      }
      delData(this.model, this.control, 1, form).then((res) => {
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
      var form = { ...this.find_form };
      getDataList(this.model, this.control, 1, form, this, "data_list");
    },
  },

  watch: {
    // 拼接图片url
    data_list() {
      spliceImg(this.data_list, "mainImageID", true);
      console.log(this.data_list);
    },

    // 切换tab
    activeName(value) {
      this.control = value;
      this.find_form = createGet();
      var form = filteObj({ ...this.find_form });
      getDataList(this.model, this.control, 1, form, this, "data_list");
    },
  },
};
</script>

<style lang='scss'>
#gameObj_list {
  form {
    .el-input {
      width: 300px;
    }
  }
}
</style>