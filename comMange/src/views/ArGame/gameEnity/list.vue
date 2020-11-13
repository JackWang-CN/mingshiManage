<template>
  <div id="gameEnity_list" class="shadow_container">
    <div class="pageTitle">游戏实体列表</div>

    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="普通实体对象" name="0"> </el-tab-pane>
      <el-tab-pane label="生物实体对象" name="1"> </el-tab-pane>
    </el-tabs>

    <!-- 查询表单 -->
    <el-form label-width="80px">
      <el-form-item label="实体名称">
        <el-input v-model="find_form.data.entityName"></el-input>
        <el-button type="primary" style="margin-left: 20px" @click="findData"
          >查询</el-button
        >
        <el-button type="success" @click="showDetails(0)"
          >添加实体对象</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="data_list" style="width: 100%" border>
      <el-table-column
        prop="entityName"
        label="实体名称"
        width="180"
      ></el-table-column>

      <el-table-column
        prop="objectInfoName"
        label="游戏对象名称"
        width="150"
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
        prop="lootStoreName"
        label="奖池名称"
        width="150"
      ></el-table-column>

      <el-table-column
        prop="contentStoreName"
        label="内容池名称"
        width="150"
      ></el-table-column>

      <el-table-column prop="loopType" label="播放方式" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.loopType == 0">顺序</span>
          <span v-else-if="scope.row.loopType == 1">随机</span>
        </template></el-table-column
      >

      <el-table-column prop="isCreature" label="是否为生物" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.isCreature == 0">否</span>
          <span v-else-if="scope.row.isCreature == 1">是</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button
            type="warning"
            @click="showDetails(1, scope.row)"
            size="small"
            >修改</el-button
          >

          <el-button
            type="danger"
            @click="delRow(scope.row.gameEntityID)"
            size="small"
            >删除</el-button
          >

          <el-button
            v-if="activeName == 1"
            type="success"
            @click="toDetails(scope.row)"
            size="small"
            >阶段奖励</el-button
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

    <!-- 弹出框 -->
    <el-dialog
      title="实体对象详情"
      :visible.sync="show_details"
      @closed="clear"
    >
      <el-form label-width="100px">
        <el-form-item label="实体名称">
          <el-input v-model="data_info.entityName"></el-input>
        </el-form-item>

        <el-form-item label="游戏对象">
          <el-button type="success" size="small" @click="showGameObj"
            >选择对象</el-button
          >
          <el-tag style="margin-left: 5px" v-if="data_info.objName">{{
            data_info.objName
          }}</el-tag>
        </el-form-item>

        <el-form-item label="绑定奖池">
          <el-select v-model="data_info.lootStoreID">
            <el-option
              v-for="item in loot_list"
              :key="item.lootStoreID"
              :label="item.lootStoreName"
              :value="item.lootStoreID"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="携带媒体">
          <el-select v-model="data_info.contentStoreID">
            <el-option
              v-for="item in content_list"
              :key="item.contentStoreID"
              :label="item.storeName"
              :value="item.contentStoreID"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="轮播方式">
          <el-select v-model="data_info.loopType">
            <el-option label="随机" :value="1"></el-option>
            <el-option label="顺序" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="sendSubmit">提交</el-button>
          <el-button type="info" @click="show_details = false">取消</el-button>
        </el-form-item>
      </el-form>

      <!-- 内嵌弹出框 -->
      <el-dialog
        title="对象列表"
        :visible.sync="show_gameObj"
        width="25%"
        append-to-body
      >
        <!-- 模型 -->
        <ul class="model_list">
          <li
            v-for="model in gameObj_list"
            :key="model.objectInfoID"
            @click="selectModel(model)"
          >
            <el-avatar
              :size="70"
              :src="model.imgUrl"
              shape="square"
              class="model_ico"
            ></el-avatar>
            <div class="model_name">{{ model.name }}</div>
          </li>
        </ul>
        <!-- 分页插件 -->
        <Pagination
          :find="find_form"
          @sizeChange="pageChange('size', $event)"
          @currChange="pageChange('curr', $event)"
        ></Pagination>
        <!-- 选中模型 -->
        <div class="select_model" v-show="Object.keys(select_model).length">
          <div class="title">已选择</div>
          <div class="ico" @click="unSelect" title="点击删除">
            <el-avatar
              :size="70"
              :src="select_model.imgUrl"
              shape="square"
              class="model_ico"
            ></el-avatar>
            <div class="model_name">{{ select_model.name }}</div>
          </div>
        </div>
        <!-- 操作 -->
        <el-button type="primary" size="small" @click="confirmMode"
          >确认</el-button
        >
        <el-button size="small" @click="show_gameObj = false">取消</el-button>
      </el-dialog>
    </el-dialog>
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
  },

  data() {
    return {
      find_form: { data: {} },
      data_list: [],
      data_info: { isCreature: 0 },
      show_details: false,
      show_gameObj: false,
      loot_list: [], // 奖池
      content_list: [], // 内容池
      gameObj_list: [],
      select_model: {},
      operate: 0,
      activeName: "",
      model: "ARGame",
      control: "gameEntity",
      dialogControl: "gameObj",
    };
  },

  methods: {
    // 点击提交按钮
    sendSubmit() {
      this.data_info.isCreature = this.activeName - 0;
      switch (this.operate) {
        // 新增
        case 0:
          addData(this.model, this.control, 1, this.data_info).then((res) => {
            hintMessage(this, res);
            var form = filteObj({ ...this.find_form });
            getDataList(this.model, this.control, 1, form, this, "data_list");
            this.show_details = false;
          });
          break;
        // 修改
        case 1:
          updateData(this.model, this.control, 1, this.data_info).then(
            (res) => {
              hintMessage(this, res);
              var form = filteObj({ ...this.find_form });
              getDataList(this.model, this.control, 1, form, this, "data_list");
              this.show_details = false;
            }
          );
          break;
      }
    },

    // 跳转到详情页
    toDetails(row) {
      var { gameEntityID, entityName } = row;
      this.$router.push({
        path: "gameEnity_biologyDetails",
        query: { id: gameEntityID, name: entityName },
      });
    },

    // 展开详情
    showDetails(type, row) {
      // 请求奖池列表
      if (!this.loot_list.length) {
        getDataList(
          this.model,
          "lootStore",
          1,
          createGet(1, 99),
          this,
          "loot_list"
        );
      }

      // 请求内容池列表
      if (!this.content_list.length) {
        getDataList(
          this.model,
          "contentStore",
          1,
          createGet(1, 99),
          this,
          "content_list"
        );
      }

      this.show_details = true;
      this.operate = type;
      this.data_info = { ...row };
    },

    // 查询列表
    findData() {
      var form = filteObj({ ...this.find_form });
      getDataList(this.model, this.control, 1, form, this, "data_list");
    },

    // 打开对象列表
    showGameObj() {
      this.show_gameObj = true;

      // 请求游戏对象列表
      var form = filteObj(createGet());
      if (this.activeName == 0) {
        this.dialogControl = "gameObj";
      } else {
        this.dialogControl = "biologyObj";
      }
      console.log(this.find_form);
      getDataList(
        this.model,
        this.dialogControl,
        1,
        form,
        this,
        "gameObj_list"
      );
    },

    // 点击选中模型
    selectModel(mode) {
      this.select_model = { ...mode };
    },

    // 确认选择
    confirmMode() {
      this.data_info.gameEntityID = this.select_model.objectInfoID;
      this.data_info.objName = this.select_model.name;
      this.show_gameObj = false;
    },

    // 取消选中
    unSelect() {
      this.select_model = {};
    },

    // 删除当前行
    delRow(gameEntityID) {
      delData(this.model, this.control, 1, { gameEntityID }).then((res) => {
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

    // 清空
    clear() {
      this.data_info = {};
    },
  },

  watch: {
    // 拼接图片url
    data_list() {
      this.data_list = spliceImg(this.data_list, "infoID");
    },

    activeName(v) {
      var type = v - 0;
      this.find_form.data.isCreature = type;
      var form = filteObj({ ...this.find_form });
      getDataList(this.model, this.control, 1, form, this, "data_list");
    },
  },
};
</script>

<style lang='scss'>
#gameEnity_list {
  form {
    .el-input {
      width: 300px;
    }
  }
}
</style>