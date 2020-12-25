<template>
  <div id="synthesize_details" class="shadow_container">
    <div class="pageTitle">方案详情</div>
    <el-form label-width="100px">
      <el-form-item label="合成道具">
        <el-tag style="margin-right: 10px" v-if="data_info.glueName">{{
          data_info.glueName
        }}</el-tag>
        <el-button type="success" size="small" @click="showProps"
          >选择道具</el-button
        >
      </el-form-item>

      <el-form-item label="方案图片">
        <el-upload
          :auto-upload="false"
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :on-change="imgChange"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="启用状态" v-if="!operate">
        <el-select v-model="data_info.isEnable">
          <el-option :value="0" label="禁用"></el-option>
          <el-option :value="1" label="启用"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="碎片列表">
        <el-button type="success" @click="showChips" size="small"
          >添加碎片</el-button
        >
        <!-- 碎片列表 -->
        <el-table :data="data_info.chip" width="100%">
          <el-table-column
            prop="chipName"
            label="碎片名称"
            width="150"
          ></el-table-column>

          <el-table-column prop="chipNum" label="数量" width="250">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.chipNum"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button
                type="danger"
                size="small"
                @click="delRow(scope.row.chipID)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item label="配方描述">
        <el-input
          type="textarea"
          :rows="3"
          v-model="data_info.describe"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="sendSubmit">提交</el-button>
        <el-button type="info" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>

    <!-- 弹出框一 -->
    <el-dialog title="道具列表" :visible.sync="show_props" width="25%">
      <el-table :data="data_list">
        <el-table-column
          prop="name"
          label="道具名称"
          width="150"
        ></el-table-column>

        <el-table-column prop="date" label="日期" width="150">
          <template slot-scope="scope">
            <el-avatar
              :size="60"
              :src="scope.row.imgUrl"
              shape="square"
            ></el-avatar>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="selectProp(scope.row)"
              >选择</el-button
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
    </el-dialog>

    <!-- 弹出框二 -->
    <el-dialog title="碎片列表" :visible.sync="show_chips" width="25%">
      <el-table :data="newChip_list">
        <el-table-column
          prop="name"
          label="碎片名称"
          width="150"
        ></el-table-column>

        <el-table-column prop="date" label="日期" width="150">
          <template slot-scope="scope">
            <el-avatar
              :size="60"
              :src="scope.row.imgUrl"
              shape="square"
            ></el-avatar>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              type="primary"
              :disabled="scope.row.isSelect"
              size="small"
              @click="addChip(scope.row)"
              >{{ scope.row.isSelect ? "已添加" : "选择" }}</el-button
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
    </el-dialog>
  </div>
</template>

<script>
const { normal_file } = window.baseUrl;
import Pagination from "@/components/Pagination";
import {
  getDetails,
  addDataList,
  updateDetails,
  getDataList,
  uploadFiles,
} from "@/utils/api/apis";
import { createGet, spliceImg } from "@/utils/common";
export default {
  components: {
    Pagination,
  },

  mounted() {
    var { id } = this.$route.query;
    if (id) {
      this.operate = 1;
      getDetails(this.model, this.control, 1, { glueID: id }).then((res) => {
        this.data_info = res.resultObject;
        this.imageUrl = normal_file + res.resultObject.glueImg;
        this.chip_select = res.resultObject.chip;
        res.resultObject.chip.forEach((item) => {
          this.chipID_list.push(item.chipID);
        });
      });
    }
  },

  data() {
    return {
      find_form: {},
      data_info: {},
      data_list: [], // 原始道具列表

      chip_list: [], // 原始碎片列表
      newChip_list: [], // 编译后碎片列表
      chipID_list: [], // 碎片ID列表，用于判断是否已在列表中
      chip_select: [], // 选中碎片列表
      img_list: [],
      show_props: false,
      show_chips: false,
      imageUrl: "",
      operate: 0, // 0-新增 1-修改
      model: "propChip",
      control: "propChipGlue",

      dialogModel: "",
      dialogControl: "",
    };
  },

  methods: {
    // 点击提交按钮
    async sendSubmit() {
      switch (this.operate) {
        // 新增
        case 0:
          // 是否上传文件
          if (this.img_list.length > 0) {
            var res = await uploadFiles(1, 1, this.img_list);
            this.data_info.glueImg = res.resultObject[0].resID;
          } else {
            this.$message.error("请添加配方图片");
            return;
          }

          addDataList(
            this.model,
            this.control,
            1,
            this.data_info,
            this,
            "props_synthesizeList"
          );
          break;
        // 修改
        case 1:
          // 是否上传文件
          if (this.img_list.length > 0) {
            var res = await uploadFiles(1, 1, this.img_list);
            this.data_info.glueImg = res.resultObject[0].resID;
          }
          updateDetails(
            this.model,
            this.control,
            1,
            this.data_info,
            this,
            "props_synthesizeList"
          );
          break;
      }
    },

    // 图片状态改变
    imgChange(file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.img_list = [file];
    },

    // 展示道具列表
    showProps() {
      this.dialogModel = "prop";
      this.dialogControl = "prop";
      this.show_props = true;
      // 请求道具列表
      this.find_form = createGet();
      getDataList(
        this.dialogModel,
        this.dialogControl,
        1,
        this.find_form,
        this
      );
    },

    // 选中道具
    selectProp(row) {
      var { name, propID } = row;
      this.data_info.glueName = name;
      this.data_info.propID = propID;
      this.show_props = false;
    },

    // 展示碎片列表
    showChips() {
      this.dialogModel = "propChip";
      this.dialogControl = "propChip";
      this.show_chips = true;
      // 请求碎片列表
      this.find_form = createGet();
      getDataList(
        this.dialogModel,
        this.dialogControl,
        1,
        this.find_form,
        this,
        "chip_list"
      );
    },

    // 添加碎片
    addChip(row) {
      var { name, chipID } = row;
      this.chipID_list.push(chipID); // 推入碎片ID列表中
      this.chip_select.push({
        chipName: name,
        chipID,
        chipNum: 1,
      });
      this.data_info.chip = this.chip_select;
      this.show_chips = false;
    },

    // 删除碎片
    delRow(chipID) {
      // 从碎片ID列表中移出
      var index = this.chipID_list.indexOf(chipID);
      this.chipID_list.splice(index, 1);

      // 从选择碎片列表中移出
      this.data_info.chip.splice(index, 1);
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
      var list = this.dialogModel == "prop" ? "data_list" : "chip_list";
      getDataList(
        this.dialogModel,
        this.dialogControl,
        1,
        this.find_form,
        this,
        list
      );
    },

    // 取消回到列表页
    cancel() {
      this.$router.push("props_synthesizeList");
    },
  },

  watch: {
    // 拼接原始道具列表图片url
    data_list() {
      this.data_list = spliceImg(this.data_list, "facadeImageID", true);
    },

    // 编译碎片列表（1.图片拼接 2.添加是否已被添加判断属性）
    chip_list() {
      var list = [...this.chip_list];
      list = spliceImg(list, "imgID");
      list.forEach((item) => {
        var flag = this.chipID_list.includes(item.chipID);
        item.isSelect = flag;
      });
      this.newChip_list = list;
    },
  },
};
</script>

<style lang='scss'>
#synthesize_details {
  .el-form {
  }

  // 头像上传
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 150px;
      height: 150px;
      line-height: 150px;
      text-align: center;
    }
    .avatar {
      width: 150px;
      height: 150px;
      display: block;
    }
  }

  .el-input-number {
    width: 150px;
  }
}
</style>