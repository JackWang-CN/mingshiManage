<template>
  <div id="event_details" class="shadow_container">
    <div class="pageTitle">
      {{ event_name }} 事件元素
      <el-button type="success" @click="showDetails(0)">添加元素</el-button>
    </div>

    <!-- 表格 -->
    <el-table :data="data_list">
      <el-table-column prop="eventID" label="归属事件ID" width="180">
      </el-table-column>

      <el-table-column prop="gameEntityName" label="游戏实体名称" width="180">
      </el-table-column>

      <el-table-column prop="objMainImageID" label="游戏实体图标" width="180">
        <template slot-scope="scope">
          <el-avatar
            :size="80"
            :src="scope.row.imgUrl"
            shape="square"
          ></el-avatar>
        </template>
      </el-table-column>

      <el-table-column prop="entityCount" label="游戏实体数量" width="180">
      </el-table-column>

      <el-table-column label="坐标" width="200">
        <template slot-scope="scope">
          <div>经度：{{ scope.row.longitude }}</div>
          <div>纬度：{{ scope.row.latitude }}</div>
        </template>
      </el-table-column>

      <el-table-column prop="radius" label="范围半径" width="120">
      </el-table-column>

      <el-table-column prop="respawnType" label="刷新类型" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.respawnType == 0">单次</span>
          <span v-else-if="scope.row.respawnType == 1">定时</span>
          <span v-else-if="scope.row.respawnType == 2">随机</span>
        </template>
      </el-table-column>

      <el-table-column prop="timeInterval" label="刷新时间间隔" width="120">
      </el-table-column>

      <el-table-column prop="disInterval" label="刷新距离间隔" width="120">
      </el-table-column>

      <el-table-column prop="enable" label="启用状态" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.enable == 0">禁用</span>
          <span v-else-if="scope.row.enable == 1">启用</span>
        </template>
      </el-table-column>

      <el-table-column prop="startTime" label="开始时间" width="180">
      </el-table-column>

      <el-table-column prop="endTime" label="结束时间" width="180">
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="warning"
            @click="showDetails(1, scope.row)"
            >修改</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="delRow(scope.row.elementID)"
            >删除</el-button
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

    <el-button style="margin: 20px 0 0 10px" type="info" @click="cancel"
      >返回</el-button
    >

    <!-- 弹出框 -->
    <el-dialog
      title="事件元素详情"
      :visible.sync="show_details"
      width="30%"
      @closed="clear"
    >
      <el-form label-width="100px">
        <el-form-item label="游戏实体类型">
          <el-select v-model="objType">
            <el-option label="普通实体" :value="0"></el-option>
            <el-option label="生物实体" :value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="游戏实体">
          <el-button type="success" size="small" @click="showObj"
            >选择实体</el-button
          >
          <div class="mode_img" v-show="data_info.gameEntityID">
            <el-avatar :size="80" :src="entityImg" shape="square"></el-avatar>
            <el-tag>{{ data_info.gameEntityName }}</el-tag>
          </div>
        </el-form-item>

        <el-form-item label="实体数量">
          <el-input-number v-model="data_info.entityCount"></el-input-number>
        </el-form-item>

        <el-form-item label="启用状态">
          <el-select v-model="data_info.enable">
            <el-option label="禁用" :value="0"></el-option>
            <el-option label="启用" :value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="中心经度">
          <el-input v-model="data_info.longitude"></el-input>
        </el-form-item>

        <el-form-item label="中心纬度">
          <el-input v-model="data_info.latitude"></el-input>
        </el-form-item>

        <el-form-item label="范围半径">
          <el-input v-model="data_info.radius"></el-input>
        </el-form-item>

        <el-form-item label="刷新类型">
          <el-select v-model="data_info.respawnType" @change="refreshChange">
            <el-option label="单次" :value="0"></el-option>
            <el-option label="定时" :value="1"></el-option>
            <el-option label="随机" :value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="刷新时间间隔" v-show="data_info.respawnType">
          <el-input-number
            v-model="data_info.timeInterval"
            :step="10"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="刷新距离间隔" v-show="data_info.respawnType">
          <el-input-number
            v-model="data_info.disInterval"
            :step="10"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="开始时间">
          <el-date-picker
            v-model="data_info.startTime"
            type="datetime"
            placeholder="选择开始时间"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="结束时间">
          <el-date-picker
            v-model="data_info.endTime"
            type="datetime"
            placeholder="选择结束时间"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="sendSubmit">提交</el-button>
          <el-button type="info" @click="show_details = false">取消</el-button>
        </el-form-item>
      </el-form>

      <el-dialog
        width="30%"
        :title="objType ? '普通实体' : '生物实体'"
        :visible.sync="show_obj"
        append-to-body
      >
        <!-- 模型 -->
        <ul class="model_list">
          <li
            v-for="model in obj_list"
            :key="model.resID"
            @click="selectModel(model)"
          >
            <el-avatar
              :size="70"
              :src="model.imgUrl"
              shape="square"
              class="model_ico"
            ></el-avatar>
            <div class="model_name">{{ model.entityName }}</div>
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
            <div class="model_name">{{ select_model.entityName }}</div>
          </div>
        </div>
        <!-- 操作 -->
        <el-button type="primary" size="small" @click="confirmMode"
          >确认</el-button
        >
        <el-button size="small" @click="show_obj = false">取消</el-button>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
const { ar_2d } = window.baseUrl;
import Pagination from "@/components/Pagination";
import { getDataList, addData, updateData, delData } from "@/utils/api/apis";
import { createGet, hintMessage, spliceImg } from "@/utils/common";
export default {
  components: {
    Pagination,
  },
  mounted() {
    var { id, name, tab } = this.$route.query;
    this.event_name = name;
    this.eventID = id;
    this.tab = tab;
    // 请求事件元素列表
    this.find_form = createGet();
    this.find_form.data = { eventID: id };
    getDataList(this.model, this.control, 1, this.find_form, this, "data_list");
  },

  data() {
    return {
      tab: "",
      event_name: "",
      find_form: {},
      data_info: {},
      data_list: [],
      obj_list: [],
      show_details: false,
      show_obj: false,
      objType: 0, // 游戏实体类型 0-普通 1-生物
      model_list: [], // 模型列表
      select_model: {},
      eventID: "",
      entityImg: "",

      operate: "0", // 0-新增 1-修改
      model: "ARGame",
      control: "eventElementInfo",

      dialogControl: "gameEntity",
    };
  },

  methods: {
    // 点击提交按钮
    sendSubmit() {
      this.data_info.eventID = this.eventID;

      if (this.data_info.respawnType == 0) {
        delete this.data_info.timeInterval;
        delete this.data_info.disInterval;
      }
      switch (this.operate) {
        // 新增
        case 0:
          addData(this.model, this.control, 1, this.data_info).then((res) => {
            hintMessage(this, res);
            getDataList(
              this.model,
              this.control,
              1,
              this.find_form,
              this,
              "data_list"
            );
            this.show_details = false;
          });
          break;
        // 修改
        case 1:
          updateData(this.model, this.control, 1, this.data_info).then(
            (res) => {
              hintMessage(this, res);
              getDataList(
                this.model,
                this.control,
                1,
                this.find_form,
                this,
                "data_list"
              );
              this.show_details = false;
            }
          );
      }
    },

    // 打开详情框
    showDetails(type, row) {
      this.show_details = true;
      this.operate = type;
      if (row) {
        this.data_info = { ...row };
        this.entityImg = row.imgUrl;
      }
    },

    // 打开实体列表框
    showObj() {
      this.show_obj = true;
      var form = createGet();
      form.data = { isCreature: this.objType };
      getDataList(this.model, this.dialogControl, 1, form, this, "obj_list");
    },

    // 点击选中模型
    selectModel(mode) {
      this.select_model = { ...mode };
    },

    // 刷新方式改变
    refreshChange(v) {},

    // 取消选中
    unSelect() {
      this.select_model = {};
    },

    // 确认选择
    confirmMode() {
      if (this.select_model.gameEntityID) {
        this.data_info.gameEntityID = this.select_model.gameEntityID;
        this.data_info.gameEntityName = this.select_model.entityName;
        this.entityImg = this.select_model.imgUrl;
      }
      this.show_obj = false;
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
      getDataList(
        this.model,
        this.control,
        1,
        this.find_form,
        this,
        "data_list"
      );
    },

    // 删除当前行
    delRow(elementID) {
      var form = { elementID, eventID: this.eventID };
      delData(this.model, this.control, 1, form).then((res) => {
        hintMessage(this, res);
        getDataList(
          this.model,
          this.control,
          1,
          this.find_form,
          this,
          "data_list"
        );
      });
    },

    // 清空
    clear() {
      this.data_info = {};
    },

    // 取消回到列表页
    cancel() {
      this.$router.push({
        name: "事件元素",
        params: { tab: this.tab },
      });
    },
  },

  watch: {
    obj_list() {
      spliceImg(this.obj_list, "mainImageID", true);
    },

    data_list() {
      spliceImg(this.data_list, "objMainImageID", true);
    },
  },
};
</script>

<style lang='scss'>
#event_details {
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

  // 模型列表
  #model_list {
    margin-bottom: 20px;
    li {
      padding: 10px;
      margin: 5px;
      display: inline-block;
      background-color: rgb(230, 230, 230);
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        color: #409eff;
      }
    }
  }

  .select_model {
    margin: 20px 0;
    span {
      margin-right: 10px;
      line-height: 32px;
    }
  }
}
</style>