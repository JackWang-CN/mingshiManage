
<template>
  <div id="event_list" class="shadow_container">
    <div class="pageTitle">事件列表</div>

    <el-tabs v-model="activeName" type="card">
      <!-- AR活动表 -->
      <el-tab-pane label="AR活动事件" name="ARActivityEvent">
        <!-- 查询表单 -->
        <el-form label-width="80px" class="find_form">
          <el-form-item label="活动名称">
            <el-input
              v-model="find_form.data.activityName"
              clearable
            ></el-input>
            <el-button
              type="primary"
              style="margin-left: 20px"
              @click="findData"
              >查询</el-button
            >
            <el-button type="success" @click="showDetails(0)"
              >添加事件</el-button
            >
          </el-form-item>
        </el-form>

        <el-table :data="activity_list" style="width: 100%" border>
          <el-table-column
            prop="activityName"
            label="活动名称"
            width="180"
          ></el-table-column>

          <el-table-column
            prop="activityContent"
            label="活动内容"
            width="200"
          ></el-table-column>

          <el-table-column label="中心坐标" width="150">
            <template slot-scope="scope">
              <div>经度：{{ scope.row.longitude }}</div>
              <div>纬度：{{ scope.row.latitude }}</div>
            </template>
          </el-table-column>

          <el-table-column
            prop="radius"
            label="范围半径"
            width="80"
          ></el-table-column>

          <el-table-column prop="isAlone" label="是否单独" width="80">
            <template slot-scope="scope">
              {{ scope.row.isAlone ? "否" : "是" }}
            </template>
          </el-table-column>

          <el-table-column prop="isFight" label="是否战斗" width="80">
            <template slot-scope="scope">
              {{ scope.row.isFight ? "否" : "是" }}
            </template>
          </el-table-column>

          <el-table-column prop="enable" label="启用状态" width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.enable == 0">禁用</span>
              <span v-else-if="scope.row.enable == 1">启用</span>
            </template></el-table-column
          >
          <el-table-column
            prop="startTime"
            label="开始时间"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="endTime"
            label="结束时间"
            width="180"
          ></el-table-column>
          <el-table-column fixed="right" label="操作" width="300">
            <template slot-scope="scope">
              <el-button
                type="primary"
                @click="showDetails(1, scope.row)"
                size="small"
                >修改</el-button
              >

              <el-button
                :type="scope.row.enable ? 'danger' : 'success'"
                @click="switchState(0, scope.row)"
                size="small"
                >{{ scope.row.enable ? "禁用" : "启用" }}</el-button
              >

              <el-button
                type="danger"
                @click="delRow(0, scope.row)"
                size="small"
                >删除</el-button
              >

              <el-button
                type="success"
                @click="toDetails(0, scope.row)"
                size="small"
                >添加元素</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <!-- AR广告表 -->
      <el-tab-pane label="AR广告事件" name="ARADEvent">
        <!-- 查询表单 -->
        <el-form label-width="80px" class="adv_form">
          <el-form-item label="商户名称">
            <el-input
              v-model="find_form.data.merchantName"
              clearable
            ></el-input>
          </el-form-item>

          <el-form-item label="广告名称">
            <el-input v-model="find_form.data.name" clearable></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              style="margin-left: 20px"
              @click="findData"
              >查询</el-button
            >
            <el-button type="success" @click="showDetails(0)"
              >添加事件</el-button
            >
          </el-form-item>
        </el-form>

        <el-table :data="advert_list" style="width: 100%" border>
          <el-table-column
            prop="merchantName"
            label="商家名称"
            width="180"
          ></el-table-column>

          <el-table-column
            prop="name"
            label="广告名称"
            width="180"
          ></el-table-column>

          <el-table-column
            prop="contentText"
            label="广告内容"
            width="200"
          ></el-table-column>

          <el-table-column label="中心坐标" width="180">
            <template slot-scope="scope">
              <div>经度：{{ scope.row.longitude }}</div>
              <div>纬度：{{ scope.row.latitude }}</div>
            </template>
          </el-table-column>

          <el-table-column
            prop="radius"
            label="范围半径"
            width="120"
          ></el-table-column>

          <el-table-column prop="enable" label="启用状态" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.enable == 0">禁用</span>
              <span v-else-if="scope.row.enable == 1">启用</span>
            </template></el-table-column
          >

          <el-table-column
            prop="startTime"
            label="开始时间"
            width="180"
          ></el-table-column>

          <el-table-column
            prop="endTime"
            label="结束时间"
            width="180"
          ></el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button
                type="warning"
                @click="showDetails(1, scope.row)"
                size="small"
                >修改</el-button
              >

              <el-button
                :type="scope.row.enable ? 'danger' : 'success'"
                @click="switchState(1, scope.row)"
                size="small"
                >{{ scope.row.enable ? "禁用" : "启用" }}</el-button
              >
              <el-button
                type="danger"
                @click="delRow(1, scope.row)"
                size="small"
                >删除</el-button
              >
              <el-button
                type="success"
                @click="toDetails(1, scope.row)"
                size="small"
                >添加元素</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <!-- AR世界事件表 -->
      <el-tab-pane label="AR世界事件" name="ARWorldEvent">
        <!-- 查询表单 -->
        <el-form label-width="80px" class="find_form">
          <el-form-item label="事件名称">
            <el-input v-model="find_form.data.name" clearable></el-input>
            <el-button
              type="primary"
              style="margin-left: 20px"
              @click="findData"
              >查询</el-button
            >
            <el-button type="success" @click="showDetails(0)"
              >添加事件</el-button
            >
          </el-form-item>
        </el-form>

        <el-table :data="world_list" style="width: 100%" border>
          <el-table-column
            prop="name"
            label="事件名称"
            width="180"
          ></el-table-column>

          <el-table-column
            prop="contentText"
            label="事件内容"
            width="200"
          ></el-table-column>

          <el-table-column label="中心坐标" width="180">
            <template slot-scope="scope">
              <div>经度：{{ scope.row.longitude }}</div>
              <div>纬度：{{ scope.row.latitude }}</div>
            </template>
          </el-table-column>

          <el-table-column
            prop="radius"
            label="范围半径"
            width="120"
          ></el-table-column>

          <el-table-column prop="enable" label="启用状态" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.enable == 0">禁用</span>
              <span v-else-if="scope.row.enable == 1">启用</span>
            </template></el-table-column
          >

          <el-table-column
            prop="startTime"
            label="开始时间"
            width="180"
          ></el-table-column>

          <el-table-column
            prop="endTime"
            label="结束时间"
            width="180"
          ></el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button
                type="warning"
                @click="showDetails(1, scope.row)"
                size="small"
                >修改</el-button
              >

              <el-button
                :type="scope.row.enable ? 'danger' : 'success'"
                @click="switchState(2, scope.row)"
                size="small"
                >{{ scope.row.enable ? "禁用" : "启用" }}</el-button
              >

              <el-button
                type="danger"
                @click="delRow(2, scope.row)"
                size="small"
                >删除</el-button
              >

              <el-button
                type="success"
                @click="toDetails(2, scope.row)"
                size="small"
                >添加元素</el-button
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

    <!-- 弹出框 -->
    <el-dialog
      :title="title"
      :visible.sync="show_details"
      width="35%"
      style="min-width: 300px"
      @closed="clear"
    >
      <!-- 活动 -->
      <el-form
        class="dialog_form"
        label-width="80px"
        v-show="activeName == 'ARActivityEvent'"
      >
        <el-form-item label="活动名称">
          <el-input v-model="data_info.activityName"> </el-input>
        </el-form-item>

        <el-form-item label="中心经度">
          <el-input v-model="data_info.longitude"> </el-input>
        </el-form-item>
        <el-form-item label="中心纬度">
          <el-input v-model="data_info.latitude"> </el-input>
        </el-form-item>
        <el-form-item label="范围半径">
          <el-input v-model="data_info.radius"> </el-input>
        </el-form-item>
        <el-form-item label="是否单独">
          <el-select v-model="data_info.isAlone">
            <el-option label="是" :value="1"></el-option>
            <el-option label="否" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否战斗">
          <el-select v-model="data_info.isFight">
            <el-option label="是" :value="1"></el-option>
            <el-option label="否" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="开始时间">
          <el-date-picker
            v-model="data_info.startTime"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            v-model="data_info.endTime"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动内容">
          <el-input
            type="textarea"
            :rows="3"
            v-model="data_info.activityContent"
          >
          </el-input>
        </el-form-item>
      </el-form>

      <!-- 广告 -->
      <el-form
        class="dialog_form"
        label-width="80px"
        v-show="activeName == 'ARADEvent'"
      >
        <el-form-item label="广告名称">
          <el-input v-model="data_info.name"> </el-input>
        </el-form-item>

        <el-form-item label="选择商户">
          <el-select v-model="data_info.merchantID">
            <el-option
              v-for="merchant in merchant_list"
              :key="merchant.merchantID"
              :label="merchant.merchantName"
              :value="merchant.merchantID"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="中心经度">
          <el-input v-model="data_info.longitude"> </el-input>
        </el-form-item>
        <el-form-item label="中心纬度">
          <el-input v-model="data_info.latitude"> </el-input>
        </el-form-item>
        <el-form-item label="范围半径">
          <el-input v-model="data_info.radius"> </el-input>
        </el-form-item>
        <el-form-item label="范围半径">
          <el-input v-model="data_info.radius"></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="data_info.startTime"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            v-model="data_info.endTime"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="广告内容">
          <el-input type="textarea" :rows="3" v-model="data_info.contentText">
          </el-input>
        </el-form-item>
      </el-form>

      <!-- 世界 -->
      <el-form
        class="dialog_form"
        label-width="80px"
        v-show="activeName == 'ARWorldEvent'"
      >
        <el-form-item label="事件名称">
          <el-input v-model="data_info.name"> </el-input>
        </el-form-item>

        <el-form-item label="中心经度">
          <el-input v-model="data_info.longitude"> </el-input>
        </el-form-item>
        <el-form-item label="中心纬度">
          <el-input v-model="data_info.latitude"> </el-input>
        </el-form-item>
        <el-form-item label="范围半径">
          <el-input v-model="data_info.radius"> </el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="data_info.startTime"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            v-model="data_info.endTime"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="事件内容">
          <el-input type="textarea" :rows="3" v-model="data_info.contentText">
          </el-input>
        </el-form-item>
      </el-form>

      <div class="dialog_btns">
        <el-button type="primary" @click="sendSubmit">提交</el-button>
        <el-button @click="show_details = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { createGet, filteObj, spliceImg, hintMessage } from "@/utils/common";
import {
  getDataList,
  getData,
  addData,
  updateData,
  delData,
} from "@/utils/api/apis";
export default {
  components: {
    Pagination,
  },
  mounted() {
    var { tab } = this.$route.params;
    this.activeName = tab || "ARActivityEvent";
    this.find_form = createGet();
  },

  data() {
    return {
      find_form: { data: {} },
      activity_list: [],
      advert_list: [],
      world_list: [],
      merchant_list: [],
      show_details: false,
      operate: 0,
      data_info: {},
      title: "",
      activeName: "activity",
      model: "ARGame",
      control: "",
    };
  },

  methods: {
    // 发送提交
    sendSubmit() {
      this.show_details = false;
      switch (this.operate) {
        case 0:
          addData(this.model, this.control, 1, this.data_info).then((res) => {
            hintMessage(this, res);
            var form = filteObj({ ...this.find_form });
            switch (this.control) {
              case "ARActivityEvent":
                var list = "activity_list";
                break;
              case "ARADEvent":
                var list = "advert_list";
                break;
              case "ARWorldEvent":
                var list = "world_list";
                break;
            }
            getDataList(this.model, this.control, 1, form, this, list);
          });
          break;
        case 1:
          updateData(this.model, this.control, 1, this.data_info).then(
            (res) => {
              hintMessage(this, res);
              var form = filteObj({ ...this.find_form });
              switch (this.control) {
                case "ARActivityEvent":
                  var list = "activity_list";
                  break;
                case "ARADEvent":
                  var list = "advert_list";
                  break;
                case "ARWorldEvent":
                  var list = "world_list";
                  break;
              }
              getDataList(this.model, this.control, 1, form, this, list);
            }
          );
          break;
      }
    },

    // 跳转到详情页
    toDetails(type, row) {
      switch (type) {
        case 0:
          var id = row.activityID,
            name = row.activityName;
          break;
        case 1:
          var id = row.adid,
            name = row.name;
          break;
        case 2:
          var id = row.worldEventID,
            name = row.name;
          break;
      }

      this.$router.push({
        path: "event_details",
        query: { id, name, tab: this.control },
      });
    },

    // 展示详情
    showDetails(type, row) {
      this.show_details = true;
      this.operate = type;
      this.data_info = { ...row };
    },

    // 查询列表
    findData() {
      var form = filteObj({ ...this.find_form });
      switch (this.activeName) {
        case "ARActivityEvent":
          var list = "activity_list";
          break;
        case "ARADEvent":
          var list = "advert_list";
          break;
        case "ARWorldEvent":
          var list = "world_list";
          break;
      }

      getDataList(this.model, this.control, 1, form, this, list);
    },

    // 启用/禁用
    switchState(type, row) {
      switch (type) {
        case 0:
          var form = { activityID: row.activityID },
            list = "activity_list";
          break;
        case 1:
          var form = { adid: row.adid },
            list = "advert_list";
          break;
        case 2:
          var form = { worldEventID: row.worldEventID },
            list = "world_list";
          break;
      }

      var state = row.enable;
      var operate = row.enable ? "disable" : "enable";
      updateData(this.model, this.control, 1, form, operate).then((res) => {
        hintMessage(this, res);
        var form = filteObj({ ...this.find_form });
        getDataList(this.model, this.control, 1, form, this, list);
      });
    },

    // 删除当前行
    delRow(type, id) {
      switch (type) {
        case 0:
          var info = { activityID: id };
          break;
        case 1:
          var info = { adid: id };
          break;
        case 2:
          var info = { worldEventID: id };
          break;
      }
      delData(this.model, this.control, 1, info).then((res) => {
        hintMessage(this, res);
        var form = filteObj({ ...this.find_form });
        switch (this.control) {
          case "ARActivityEvent":
            var list = "activity_list";
            break;
          case "ARADEvent":
            var list = "advert_list";
            break;
          case "ARWorldEvent":
            var list = "world_list";
            break;
        }
        getDataList(this.model, this.control, 1, form, this, list);
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

    // 切换激活页
    activeName(v) {
      this.control = v;
      this.find_form = createGet();
      var form = filteObj({ ...this.find_form });
      switch (v) {
        case "ARActivityEvent":
          this.title = "活动事件详情";
          var length = this.activity_list.length,
            list = "activity_list";
          break;
        case "ARADEvent":
          this.title = "广告事件详情";
          var length = this.advert_list.length,
            list = "advert_list";
          // 请求商家列表
          if (this.merchant_list.length == 0)
            getData("merchant", "merchantInfo", 1, createGet(1, 99999)).then(
              (res) => {
                this.merchant_list = res.resultObject.data;
              }
            );
          break;
        case "ARWorldEvent":
          this.title = "世界事件详情";
          var length = this.world_list.length,
            list = "world_list";
          break;
      }

      if (length == 0) {
        getDataList(this.model, this.control, 1, form, this, list);
      }
    },
  },
};
</script>

<style lang='scss'>
#event_list {
  .find_form {
    .el-input {
      width: auto;
    }
  }

  .adv_form {
    .el-form-item {
      display: inline-block;
    }
  }

  .dialog_form {
    .el-form-item {
      display: inline-block;
      .el-input,
      .el-textarea {
        max-width: 200px;
      }
    }

    .el-date-editor.el-input {
      width: auto;
    }
  }
}
</style>