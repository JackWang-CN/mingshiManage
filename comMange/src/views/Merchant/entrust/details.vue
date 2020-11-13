<template>
  <div id="entrust_details" class="shadow_container">
    <!-- 委托进度详情 -->
    <div class="pageTitle">委托详情</div>

    <el-tabs v-model="activeName" type="card">
      <!-- 当前阶段 -->
      <el-tab-pane label="当前阶段" name="current">
        <!-- 进度条 -->
        <el-steps :active="activeState" :space="170">
          <el-step
            v-for="item in progress_list"
            :key="item.stateID"
            :title="item.stateName"
          ></el-step>
        </el-steps>

        <!-- 表单 -->
        <el-form label-width="80px" v-if="isEnd">
          <el-form-item label="文件上传">
            <el-upload
              class="upload-demo"
              :auto-upload="false"
              :on-change="fileChange"
              action="#"
              multiple
              :limit="3"
            >
              <el-button size="small" type="primary">选择文件</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="阶段描述">
            <el-input
              type="textarea"
              :rows="3"
              v-model="data_info.describe"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="updateProgress(0)"
              >保存当前进度</el-button
            >
            <el-button type="primary" @click="updateProgress(1)"
              >保存进入下一步</el-button
            >
            <el-button type="text" @click="show_more = !show_more">{{
              show_more ? "收起∧" : "更多∨"
            }}</el-button>
            <el-button type="danger" v-show="show_more" @click="shutdownEntrust"
              >中止</el-button
            >
          </el-form-item>
        </el-form>
        <el-button type="info" @click="cancel">返回</el-button>
      </el-tab-pane>

      <!-- 历史进度 -->
      <el-tab-pane label="历史进度" name="history">
        <el-table :data="data_list" border>
          <el-table-column
            prop="phaseStatus"
            label="阶段"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="describe"
            label="阶段描述"
            width="300"
          ></el-table-column>
          <el-table-column
            prop="updateTime"
            label="更新时间"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="customerManager"
            label="客户经理"
            width="100"
          ></el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                @click="showDetails(scope.row.entrustProgressID)"
                type="primary"
                size="small"
                >查看附件</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!-- 弹出框-历史阶段详情 -->
    <el-dialog title="阶段详情" width="30%" :visible.sync="show_details">
      <el-form label-width="80px">
        <el-form-item label="附件资源" v-if="attachment_list.length">
          <div class="file_list">
            <a
              v-for="item in attachment_list"
              :key="item.resID"
              :href="
                'https://api.resources.scmsar.com/file/download/source/v1?Mark=' +
                item.resID
              "
              >{{ item.affixID }}</a
            >
          </div>
        </el-form-item>
        <el-form-item v-else>暂无数据</el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getDataList,
  getData,
  updateData,
  updateDetails,
  uploadFiles,
} from "@/utils/api/apis";
import { createGet, hintMessage } from "@/utils/common";
export default {
  created() {
    this.entrustID = this.$route.query.id;

    // 1.获取商家委托阶段列表（一共有几个阶段）
    getData(this.model, this.control, 1, createGet(1, 99), "stage/list").then(
      (res) => {
        this.progress_list = res.resultObject;
        this.breakOff = this.progress_list.pop();
      }
    );

    // 2.获取委托进度信息列表
    this.activeName = "current";
  },

  data() {
    return {
      roll_list: [
        "待受理",

        "受理",
        "需求确认",
        "签订合同",
        "策划执行",
        "完结待商户确认",
        "商户确认完结",
      ],
      data_list: [],
      data_info: {},
      file_list: [], // 文件列表
      progress_list: [], // 商家委托列表
      attachment_list: [], //当前阶段的附件列表
      breakOff: {}, // 中断的阶段数据模型
      entrustID: "",
      activeName: "",
      show_details: false, // 展示详情
      show_more: false, // 显示隐藏按钮
      activeObj: {}, // 当前的委托阶段数据对象
      activeState: 0, // 当前的委托阶段
      isEnd: false,
      model: "merchant",
      control: "merEntrustActivity",
    };
  },

  watch: {
    // 监听页面激活
    activeName() {
      switch (this.activeName) {
        case "current":
          getData(
            this.model,
            this.control,
            1,
            { value: this.entrustID },
            "progress/current"
          ).then((res) => {
            this.activeObj = res.resultObject;
            // 获取当前的阶段名称，遍历所有阶段，取得当前阶段在所有阶段中的序号
            var phaseStatus = this.activeObj.phaseStatus;
            this.isEnd = this.roll_list.includes(phaseStatus);
            if (phaseStatus == "中止" && !this.progress_list.includes("中止")) {
              this.progress_list.some((item, index) => {
                if (item.stateName == this.activeObj.prePhaseStatus) {
                  this.progress_list.splice(index, 0, this.breakOff);
                  this.activeState = index;
                }
                // 满足条件终止循环
                return item.stateName == this.activeObj.prePhaseStatus;
              });
            } else {
              this.progress_list.some((item, index) => {
                if (item.stateName == phaseStatus) {
                  this.activeState = index;
                }
                // 满足条件终止循环
                return item.stateName == phaseStatus;
              });
            }
          });
          break;
        case "history":
          getData(
            this.model,
            this.control,
            1,
            { value: this.entrustID },
            "progress/list"
          ).then((res) => {
            this.data_list = res.resultObject;
          });
          break;
      }
    },
  },

  methods: {
    // 展示详情
    showDetails(value) {
      this.show_details = true;
      getDataList(
        this.model,
        this.control,
        1,
        { value },
        this,
        "attachment_list",
        "progress/affixList"
      );
    },

    // 文件状态改变
    fileChange(file, list) {
      this.file_list = [...list];
    },

    // 更新进度 0-当前 1-下一个阶段
    async updateProgress(type) {
      var index = this.activeState;
      this.data_info.entrustID = this.entrustID;
      this.data_info.stateID = this.progress_list[index].stateID;

      // 是否上传文件
      if (this.file_list.length > 0) {
        var res = await uploadFiles(2, 1, this.file_list);
        if (res.resultObject instanceof Array) {
          var newArr = [];
          res.resultObject.forEach((item) => {
            newArr.push(item.resID);
          });
          this.data_info.affixList = [...newArr];
        }
      }

      // 判断是保存当前进度，还是进入下一阶段
      if (type) {
        index++;
        this.data_info.nextStateID = this.progress_list[index].stateID;
        var operate = "update/next";
      } else {
        var operate = "update";
      }
      var form = { ...this.data_info };
      this.data_info = {};
      updateData(this.model, this.control, 1, form, operate).then((res) => {
        hintMessage(this, res);
        getData(
          this.model,
          this.control,
          1,
          { value: this.entrustID },
          "progress/current"
        ).then((res) => {
          this.activeObj = res.resultObject;
          var phaseStatus = this.activeObj.phaseStatus;
          // 获取当前的阶段名称，遍历所有阶段，取得当前阶段在所有阶段中的序号
          this.progress_list.some((item, index) => {
            if (item.stateName == phaseStatus) {
              this.activeState = index;
            }
            // 满足条件终止循环
            return item.stateName == phaseStatus;
          });
        });
      });
    },

    // 中止委托
    shutdownEntrust() {
      this.data_info.entrustID = this.entrustID;
      console.log(this.data_info);
      updateDetails(
        this.model,
        this.control,
        1,
        this.data_info,
        this,
        "merchant_entrustList",
        "end"
      );
    },

    // 返回上一页
    cancel() {
      this.$router.push("entrust_list");
    },
  },
};
</script>

<style lang='scss'>
.el-steps {
  padding: 0 20px;
  margin: 40px 0;
}

form {
  .file_list {
    display: flex;
    flex-direction: column;
  }
}
</style>