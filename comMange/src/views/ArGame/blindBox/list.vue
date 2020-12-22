<template>
  <div id="blind_list" class="shadow_container">
    <div class="pageTitle">
      盲盒列表
      <el-button type="success" @click="showDetails(0)">新增盲盒</el-button>
    </div>

    <!-- 查询表单 -->
    <el-form label-width="80px" class="find_form">
      <el-form-item label="盲盒名称">
        <el-input v-model="find_form.data.lootStoreName" clearable></el-input>
        <el-button type="primary" style="margin-left: 20px" @click="findData"
          >查询</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="data_list" style="width: 100%" border>
      <el-table-column
        prop="boxName"
        label="盲盒名称"
        width="180"
      ></el-table-column>

      <el-table-column label="图片" width="140">
        <template slot-scope="scope">
          <el-avatar
            :size="80"
            :src="scope.row.imgUrl"
            shape="square"
          ></el-avatar>
        </template>
      </el-table-column>

      <el-table-column label="掉落数量" width="200">
        <template slot-scope="scope">
          <div>范围：{{ scope.row.minCount + "~" + scope.row.maxCount }}</div>
        </template></el-table-column
      >

      <!-- <el-table-column
        prop="count"
        label="包含奖品种类"
        width="150"
      ></el-table-column> -->

      <el-table-column
        prop="updateTime"
        label="更新时间"
        width="180"
      ></el-table-column>

      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button
            type="warning"
            @click="showDetails(1, scope.row)"
            size="small"
            >修改</el-button
          >
          <el-button
            type="success"
            @click="toDetails(scope.row.boxID)"
            size="small"
            >添加奖品</el-button
          >
          <el-button type="danger" @click="delRow(scope.row.boxID)" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出框 -->
    <el-dialog
      title="盲盒详情"
      :visible.sync="show_details"
      width="25%"
      @closed="clear"
    >
      <el-form label-width="80px" class="details_form">
        <el-form-item label="名称">
          <el-input v-model="data_info.boxName"></el-input>
        </el-form-item>

        <el-form-item label="绑定道具">
          <el-button type="success" size="small" @click="showProp"
            >选择道具</el-button
          >

          <div class="mode_img" v-show="data_info.propID">
            <el-avatar :size="80" :src="propImg" shape="square"></el-avatar>
            <el-tag>{{ data_info.propName }}</el-tag>
          </div>
        </el-form-item>

        <el-form-item label="最小数量">
          <el-input-number v-model="data_info.minCount"></el-input-number>
        </el-form-item>

        <el-form-item label="最大数量">
          <el-input-number v-model="data_info.maxCount"></el-input-number>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="saveChange">{{
            operate ? "保存" : "添加"
          }}</el-button>
          <el-button type="info" @click="show_details = false">取消</el-button>
        </el-form-item>
      </el-form>

      <!-- 弹出框-模型列表 -->
      <el-dialog title="选择道具" :visible.sync="show_prop" append-to-body>
        <!-- 模型 -->
        <ul class="model_list">
          <li
            v-for="prop in prop_list"
            :key="prop.propID"
            @click="selectModel(prop)"
          >
            <el-avatar
              :size="70"
              :src="prop.imgUrl"
              shape="square"
              class="model_ico"
            ></el-avatar>
            <div class="model_name">{{ prop.name }}</div>
          </li>
        </ul>
        <!-- 分页插件 -->
        <Pagination
          :find="find_form"
          @sizeChange="pageChange('size', $event)"
          @currChange="pageChange('curr', $event)"
        ></Pagination>
        <!-- 选中模型 -->
        <div class="select_model" v-show="Object.keys(select_prop).length">
          <div class="title">已选择</div>
          <div class="ico" @click="unSelect" title="点击删除">
            <el-avatar
              :size="70"
              :src="select_prop.imgUrl"
              shape="square"
              class="model_ico"
            ></el-avatar>
            <div class="model_name">{{ select_prop.name }}</div>
          </div>
        </div>
        <!-- 操作 -->
        <el-button type="primary" size="small" @click="confirmMode"
          >确认</el-button
        >
        <el-button size="small" @click="show_prop = false">取消</el-button>
      </el-dialog>
    </el-dialog>

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
import { getDataList, addData, updateData, delData } from "@/utils/api/apis";
export default {
  components: {
    Pagination,
  },
  mounted() {
    this.find_form = createGet();
    var form = { ...this.find_form };
    getDataList(this.model, this.control, 1, form, this, "data_list");
  },

  data() {
    return {
      find_form: { data: {} },
      data_list: [],
      prop_list: [],
      img_list: [], // 待上传图片列表
      data_info: {},
      select_prop: {},

      propImg: "",
      operate: 0,
      show_details: false,
      show_prop: false,
      model: "prop",
      control: "blindBox",
    };
  },

  methods: {
    // 跳转到详情页
    toDetails(id) {
      this.$router.push({
        path: "blind_details",
        query: { id },
      });
    },

    // 展示详情
    showDetails(type, row) {
      this.operate = type;
      this.show_details = true;
      this.data_info = { ...row };
      if (type) {
        this.propImg = row.imgUrl;
      }
    },

    // 查询列表
    findData() {
      var form = filteObj({ ...this.find_form });
      getDataList(this.model, this.control, 1, form, this, "data_list");
    },

    // 删除当前行
    delRow(boxID) {
      delData(this.model, this.control, 1, { boxID }).then((res) => {
        hintMessage(this, res);
        this.findData();
      });
    },

    // 打开模型列表框
    showProp() {
      this.show_prop = true;
      this.find_form = createGet();
      var form = filteObj({ ...this.find_form });
      getDataList("prop", "prop", 1, form, this, "prop_list");
    },

    // 点击选中模型
    selectModel(prop) {
      this.select_prop = { ...prop };
    },

    // 取消选中
    unSelect() {
      this.select_prop = {};
    },

    // 确认选择
    confirmMode() {
      if (this.select_prop.propID) {
        this.data_info.propID = this.select_prop.propID;
        this.data_info.propName = this.select_prop.name;
        this.data_info.propImage = this.select_prop.facadeImageID;
        this.data_info.showResourceID = this.select_prop.resID;
        this.propImg = this.select_prop.imgUrl;
      }
      this.show_prop = false;
    },

    // 保存修改
    saveChange() {
      this.show_details = false;
      switch (this.operate) {
        case 0:
          addData(this.model, this.control, 1, this.data_info).then((res) => {
            hintMessage(this, res);
            this.findData();
          });
          break;
        case 1:
          updateData(this.model, this.control, 1, this.data_info).then(
            (res) => {
              hintMessage(this, res);
              this.findData();
            }
          );
          break;
      }
    },

    // 清空
    clear() {
      this.data_info = {};
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
      spliceImg(this.data_list, "propImage", true);
    },

    prop_list() {
      spliceImg(this.prop_list, "facadeImageID", true);
    },
  },
};
</script>

<style lang='scss'>
#blind_list {
  // 查询表单
  .find_form {
    .el-input {
      width: 300px;
    }
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

  // 详情表单
  .el-dialog {
    padding: 0 20px;
    .details_form {
      .el-input-number {
        width: 100%;
      }
    }
  }
}
</style>