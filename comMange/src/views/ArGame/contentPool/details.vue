<template>
  <div id="contentPool_details" class="shadow_container">
    <div class="pageTitle">
      内容池详情
      <el-button type="success" @click="showDetails(0)">添加内容</el-button>
    </div>

    <!-- 表格 -->
    <el-table :data="data_list">
      <el-table-column prop="name" label="内容名称" width="180">
      </el-table-column>

      <el-table-column prop="type" label="内容类型" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 0">文本</span>
          <span v-else-if="scope.row.type == 1">图片</span>
          <span v-else-if="scope.row.type == 2">语音</span>
          <span v-else-if="scope.row.type == 3">视频</span>
        </template>
      </el-table-column>

      <el-table-column prop="text" label="内容文本" width="300">
      </el-table-column>

      <el-table-column prop="enable" label="启用状态" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.enable == 0">禁用</span>
          <span v-else-if="scope.row.enable == 1">启用</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="180">
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
            @click="delRow(scope.row.contentID)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出框 -->
    <el-dialog
      title="内容详情"
      :visible.sync="show_details"
      width="25%"
      @closed="clear"
    >
      <el-form label-width="80px" class="details_form">
        <el-form-item label="内容名称">
          <el-input v-model="data_info.name"></el-input>
        </el-form-item>

        <el-form-item label="内容类型" v-show="!operate">
          <el-select v-model="data_info.type" @change="typeChange">
            <el-option label="文本" :value="0"></el-option>
            <el-option label="图片" :value="1"></el-option>
            <el-option label="语音" :value="2"></el-option>
            <el-option label="视频" :value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="内容文本" v-show="data_info.type == 0">
          <el-input
            type="textarea"
            :rows="3"
            v-model="data_info.text"
          ></el-input>
        </el-form-item>

        <el-form-item label="添加文件" v-show="data_info.type">
          <el-upload
            :auto-upload="false"
            class="upload-demo"
            action="#"
            :on-change="fileChange"
          >
            <el-button type="success" size="small">点击上传</el-button>
          </el-upload>

          <el-button size="small" type="primary">从资源库中添加</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="sendSubmit">{{
            operate ? "保存" : "添加"
          }}</el-button>
          <el-button type="info" @click="show_details = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import {
  getDataList,
  addData,
  updateData,
  getFileList,
  uploadFiles,
  delData,
} from "@/utils/api/apis";
import { createGet, hintMessage } from "@/utils/common";
export default {
  components: {
    Pagination,
  },
  mounted() {
    // 请求内容列表
    this.contentStoreID = this.$route.query.id;
    this.data_info.contentStoreID = this.contentStoreID;
    this.find_form = createGet();
    this.find_form.data = { contentStoreID: this.contentStoreID };
    getDataList(this.model, this.control, 1, this.find_form, this, "data_list");
  },

  data() {
    return {
      find_form: {},
      data_list: [],
      data_info: { type: 0 },
      show_details: false,
      file_list: [],
      contentStoreID: "",

      operate: 0, // 0-新增 1-修改
      model: "ARGame",
      control: "ARContentInfo",
    };
  },

  methods: {
    // 点击提交按钮
    async sendSubmit() {
      this.show_details = false;
      switch (this.operate) {
        // 新增
        case 0:
          // 是否上传文件
          if (this.data_info.type != 0 && this.file_list.length > 0) {
            var res = await uploadFiles(
              4,
              1,
              this.file_list,
              false,
              "内容文件"
            );
            this.data_info.resourceID = res.resultObject[0].resID;
          } else if (this.data_info.type != 0 && this.file_list.length <= 0) {
            this.$message.error("请添加资源");
            return;
          }

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
          });
          break;
        // 修改
        case 1:
          // 是否上传文件
          if (this.data_info.type != 0 && this.file_list.length > 0) {
            var res = await uploadFiles(
              4,
              1,
              this.file_list,
              false,
              "内容文件"
            );
            this.data_info.resourceID = res.resultObject[0].resID;
          }

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
            }
          );
          break;
      }
    },

    // 展示详情
    showDetails(type, row) {
      this.show_details = true;
      this.operate = type;
      if (type) {
        this.data_info = { ...row };
      } else {
        this.data_info = { contentStoreID: this.contentStoreID, type: 0 };
      }
    },

    // 类型改变
    typeChange(type) {
      if (type == 0) {
        this.file_list = [];
      }
    },

    // 文件状态改变
    fileChange(file) {
      this.file_list = [file];
    },

    // 删除当前行
    delRow(contentID) {
      delData(this.model, this.control, 1, { contentID }).then((res) => {
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
      this.data_info = { type: 0 };
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
      getFileList("u3dResourceNameList", 1, this.find_form, this, "prize_list");
    },

    // 取消回到列表页
    cancel() {
      this.$router.push("contentPool_list");
    },
  },
};
</script>

<style lang='scss'>
#contentPool_details {
  form {
    .el-form-item {
      display: inline-block;
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

  .upload-demo {
    display: inline-block;
    margin-right: 10px;
  }
}
</style>