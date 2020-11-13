<template>
  <div id="pool_details" class="shadow_container">
    <div class="pageTitle">
      奖池详情
      <el-button type="success" @click="showDetails(0)">添加奖品</el-button>
    </div>

    <!-- 表格 -->
    <el-table :data="data_list">
      <el-table-column prop="lootName" label="奖品名称" width="180">
      </el-table-column>
      <el-table-column label="缩略图" width="180">
        <template slot-scope="scope">
          <el-avatar
            :size="60"
            :src="scope.row.imgUrl"
            shape="square"
          ></el-avatar>
        </template>
      </el-table-column>

      <el-table-column prop="change" label="掉落几率" width="180">
      </el-table-column>

      <el-table-column prop="minCount" label="掉落数量" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.count">{{ scope.row.count }}</span>
          <span v-else>{{
            scope.row.minCount + "~" + scope.row.maxCount
          }}</span>
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
          <el-button size="small" type="danger" @click="delRow(scope.row)"
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

    <!-- 弹出框 -->
    <el-dialog
      title="奖池详情"
      :visible.sync="show_details"
      width="25%"
      @closed="clear"
    >
      <el-form label-width="80px" class="details_form">
        <el-form-item label="奖品名称">
          <el-input v-model="data_info.lootName"></el-input>
        </el-form-item>

        <el-form-item label="奖品类型">
          <el-select v-model="data_info.typeID" @change="typeChange">
            <el-option label="金币" :value="0"></el-option>
            <el-option label="道具" :value="1"></el-option>
            <el-option label="碎片" :value="2"></el-option>
            <el-option label="优惠券" :value="3"></el-option>
            <el-option label="兑换券" :value="4"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="道具名称" v-show="data_info.typeID">
          <el-tag style="margin-right: 10px" v-if="data_info.propName">{{
            data_info.propName
          }}</el-tag>
          <el-button type="success" size="small" @click="showProps"
            >选择战利品</el-button
          >
        </el-form-item>

        <el-form-item label="掉落数量" v-show="data_info.typeID">
          <span>{{ data_info.count }}</span>
        </el-form-item>

        <el-form-item label="最小数量" v-show="!data_info.typeID">
          <el-input-number v-model="data_info.minCount"></el-input-number>
        </el-form-item>

        <el-form-item label="最大数量" v-show="!data_info.typeID">
          <el-input-number v-model="data_info.maxCount"></el-input-number>
        </el-form-item>

        <el-form-item label="掉落几率">
          <el-input v-model="data_info.change"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="sendSubmit">{{
            operate ? "保存" : "添加"
          }}</el-button>
          <el-button type="info" @click="show_details = false">取消</el-button>
        </el-form-item>
      </el-form>

      <!-- 内层弹出框 -->
      <el-dialog
        title="道具列表"
        :visible.sync="show_props"
        width="25%"
        append-to-body
      >
        <el-table :data="prop_list">
          <el-table-column
            prop="name"
            label="道具名称"
            width="150"
          ></el-table-column>

          <el-table-column prop="date" label="缩略图" width="150">
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
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { addData, updateData, getDataList, delData } from "@/utils/api/apis";
import { createGet, spliceImg, hintMessage } from "@/utils/common";
import { types } from "util";
export default {
  components: {
    Pagination,
  },
  mounted() {
    this.lootStoreID = this.$route.query.id;
    this.data_info.lootStoreID = this.lootStoreID;
    this.find_form = createGet();
    this.find_form.data = { lootStoreID: this.lootStoreID };
    // 请求当前奖池下的奖品列表
    getDataList(this.model, this.control, 1, this.find_form, this, "data_list");
  },

  data() {
    return {
      lootStoreID: "",
      countMode: 0,
      find_form: {},
      prop_form: {},
      data_list: [],
      data_info: { typeID: 0 },
      show_details: false,
      show_props: false,
      prize_list: [], // 奖品列表
      select_model: {},
      prop_list: [],

      imageUrl: "",
      operate: 0,
      model: "ARGame",
      control: "lootInfo",
      dialogModel: "",
      dialogControl: "",
    };
  },

  methods: {
    // 点击提交按钮
    async sendSubmit() {
      this.show_details = false;

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
        this.imageUrl = row.imgUrl;
        this.data_info = { ...row };
      }
    },

    // 展示道具列表
    showProps() {
      if (!this.data_info.typeID) {
        this.$message.error("请先选择奖品类型");
        return;
      }
      this.show_props = true;
      // 请求道具列表
      getDataList(
        this.dialogModel,
        this.dialogControl,
        1,
        this.prop_form,
        this,
        "prop_list"
      );
    },

    // 选择当前道具
    selectProp(row) {
      this.data_info.propName = row.name;
      this.data_info.propID = row.myID;
      this.show_props = false;
    },

    // 删除当前行
    delRow(row) {
      var { lootInfoID, lootStoreID } = row;
      delData(this.model, this.control, 1, { lootInfoID, lootStoreID }).then(
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
    },

    // 奖品类型改变
    typeChange(type) {
      if (type == 0) {
        this.data_info.count = 0;
      } else {
        this.data_info.minCount = 0;
        this.data_info.maxCount = 0;
        this.data_info.count = 1;
      }

      this.prop_form = createGet();
      switch (this.data_info.typeID) {
        // 道具
        case 1:
          this.dialogModel = "prop";
          this.dialogControl = "prop";
          break;
        // 碎片
        case 2:
          this.dialogModel = "propChip";
          this.dialogControl = "propChip";
          break;
        // 优惠券
        case 3:
          this.dialogModel = "coupon";
          this.dialogControl = "coupon";
          this.prop_form.data.typeID = "20100913374479831440037790705421";
          break;
        // 兑换券
        case 4:
          this.dialogModel = "coupon";
          this.dialogControl = "coupon";
          this.prop_form.data.typeID = "20100913374479831440037790705423";
          break;
      }
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
      this.imageUrl = "";
    },

    // 取消回到列表页
    cancel() {
      this.$router.push("prizePool_list");
    },
  },

  watch: {
    // 拼接图片url
    data_list() {
      spliceImg(this.data_list, "showResourceID", true);
    },

    prop_list() {
      switch (this.dialogModel) {
        case "prop":
          spliceImg(this.prop_list, "facadeImageID", true);
          var key = "propID";
          break;
        case "propChip":
          spliceImg(this.prop_list, "imgID", true);
          var key = "chipID";
          break;
        case "coupon":
          spliceImg(this.prop_list, "imageID");
          var key = "couponID";
          break;
      }
      this.prop_list.forEach((item) => {
        item.myID = item[key];
      });
    },
  },
};
</script>

<style lang='scss'>
#pool_details {
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

  // 图片上传
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
      width: 120px;
      height: 120px;
      line-height: 120px;
      text-align: center;
    }
    .avatar {
      width: 120px;
      height: 120px;
      display: block;
    }
  }
}
</style>