<!-- 商品列表 -->
<template>
  <div id="goods_list" class="shadow_container">
    <div class="pageTitle">商品列表</div>
    <!-- 查询表单 -->
    <el-form id="find_form" :model="find_form" label-width="100px">
      <!-- 查询条件 -->
      <div class="search">
        <el-input v-model="find_form.info" placeholder="主题、描述、客户经理" prefix-icon="el-icon-search"></el-input>
        <div class="btns">
          <el-button type="success" style="margin-left:50px" @click="showDetails(0)">添加商品</el-button>
          <el-button type="danger" @click="delList" size="medium">删除商品</el-button>
          <el-button type="text" @click="switchMore">{{showMore?'收起∧':'筛选∨'}}</el-button>
        </div>
      </div>

      <!-- 高级筛选 -->
      <div class="more">
        <el-form-item label="商品类型" v-if="showMore">
          <el-select v-model="find_form.productType" placeholder="请选择商品类型">
            <el-option label="大类一" value="大类一"></el-option>
            <el-option label="大类二" value="大类二"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上架状态" v-if="showMore">
          <el-select v-model="find_form.isDisable" placeholder="请选择商品状态">
            <el-option label="上架中" :value="false"></el-option>
            <el-option label="已下架" :value="true"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="medium" v-if="showMore">搜索</el-button>
        </el-form-item>
      </div>
    </el-form>

    <!-- 商品列表 -->
    <el-table
      ref="goods_list"
      :data="goods_list"
      tooltip-effect="dark"
      :border="true"
      @selection-change="select"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="goodstNumber" label="商品编号" width="150" sortable></el-table-column>
      <el-table-column prop="name" label="商品名称" width="150" sortable></el-table-column>
      <el-table-column prop="imageID" label="商品图片" width="150"></el-table-column>
      <el-table-column prop="describe" label="详情描述" width="300"></el-table-column>
      <el-table-column prop="goodsTypeName" label="商品类型" width="150"></el-table-column>
      <el-table-column prop="dismountTime" label="下架时间" width="200"></el-table-column>
      <el-table-column prop="onShelfState" label="是否上架" width="100">
        <template slot-scope="scope">{{scope.row.onShelfState?'是':'否'}}</template>
      </el-table-column>

      <el-table-column label="操作" width="160px" fixed="right">
        <template slot-scope="scope">
          <el-button @click="showDetails(1,scope.row)" type="primary" size="small">编辑</el-button>
          <el-button @click="delRow(scope.row.goodstID)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页插件 -->
    <pagination
      :find="find_form"
      @sizeChange="pageChange('size',$event)"
      @currChange="pageChange('curr',$event)"
    ></pagination>

    <!-- 弹出框 -->
    <el-dialog title="商品详情" :visible.sync="show_details" width="20%" @closed="clear">
      <el-form label-width="100px" id="details_form">
        <el-form-item label="商品编号">
          <el-input v-model="data_info.goodsNumber"></el-input>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="data_info.name"></el-input>
        </el-form-item>
        <el-form-item label="详情描述">
          <el-input type="textarea" :rows="4" v-model="data_info.describe"></el-input>
        </el-form-item>
        <el-form-item label="商品类型">
          <el-select v-model="data_info.goodsTypeNumber">
            <el-option
              v-for="type in type_list"
              :key="type.typeID"
              :label="type.namePath"
              :value="type.typeNumber"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否上架">
          <el-select v-model="data_info.onShelfState">
            <el-option label="上架" :value="1"></el-option>
            <el-option label="下架" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下架时间">
          <el-date-picker v-model="data_info.dismountTime" type="datetime" placeholder="选择时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="资源预览" v-show="operate">
          <img :src="data_info.imageID" alt height="300" />
        </el-form-item>
        <el-form-item label="资源上传">
          <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :on-change="getFileList"
            :multiple="false"
            :file-list="file_list"
            :disabled="!!file_list.length"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="imgPreview(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span class="el-upload-list__item-delete" @click="imgRemove(file)">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="sendSubmit">确定</el-button>
          <el-button size="small" @click="show_details=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 图片预览 -->
    <el-dialog :visible.sync="previewBox">
      <img width="100%" :src="previewUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
import { createGet } from "@/utils/common";
import { getData, addData, delData, getDataList } from "@/utils/api/apis";
import pagination from "@/components/Pagination";
export default {
  components: {
    pagination,
  },
  mounted() {
    this.find_form = createGet();
    var form = { ...this.find_form };

    // 请求商品列表
    getDataList(this.model, this.control, 1, form, this, "goods_list");
    // 请求商品类型列表
    getDataList(this.model, "goodClass", 1, form, this, "type_list");
  },
  data() {
    return {
      // 查询条件
      find_form: {
        currPage: 1,
        pageSize: 10,
        totalDataNum: 0,
      },

      showMore: false,

      goods_list: [], // 商品列表
      data_info: {}, // 商品详情
      type_list: [], // 商品类型

      // 多选列表
      file_list: [],

      show_details: false,
      operate: 0, // 操作类型
      previewBox: false,
      previewUrl: "",

      model: "merGoods",
      control: "goods",
    };
  },

  methods: {
    // 发送提交
    sendSubmit() {
      this.show_details = false;
      switch (this.operate) {
        case 0:
          getData(this.model, this.control, 1, this.data_info, "create").then(
            (res) => {
              console.log(res);
            }
          );
          break;
        case 1:
          addData(this.model, this.control, 1, this.data_info, "update").then(
            (res) => {
              switch (res.code) {
                case "000000":
                  this.$message.success("修改成功！");
              }
              var form = { ...this.find_form };
              getDataList(
                this.model,
                this.control,
                1,
                form,
                this,
                "goods_list"
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
      }
    },

    // pageSize改变时触发
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
      getDataList(this.model, this.control, 1, form, this, "goods_list");
    },

    // 删除当前
    delRow(value) {
      delData(this.model, this.control, 1, { value }).then((res) => {
        if (res) {
          this.$message.success("删除成功！");
          var form = { ...this.find_form };
          getDataList(this.model, this.control, 1, form, this, "goods_list");
        }
      });
    },

    // 删除批量
    delList() {
      if (this.select_list.length) {
        delData(
          this.$vision.merchant,
          "Productinfo",
          "delList",
          this.select_list
        ).then((res) => {
          if (res) {
            this.$message.success("删除成功！");
            getDataList(
              this.$vision.merchant,
              "Productinfo",
              this.find_form,
              "goods_list",
              this,
              null,
              "productIco"
            );
          }
        });
      } else {
        this.$message.error("请勾选至少一项");
        return;
      }
    },

    // 获取选中项
    select(list) {
      this.select_list = list.map((item) => {
        return { productId: item.productId };
      });
    },

    // 隐藏&收起筛选条件
    switchMore() {
      this.showMore = !this.showMore;
    },

    // 1.获取文件列表
    getFileList(file, list) {
      this.file_list = list;
    },

    // 清空弹出框表单
    clear() {
      this.file_list = [];
      this.data_info = {};
    },

    // 预览图片
    imgPreview(file) {
      this.previewBox = true;
      this.previewUrl = file.url;
    },

    // 删除待上传图片
    imgRemove(file) {
      var id = file.uid,
        length = this.file_list.length;
      for (var i = 0; i < length; i++) {
        if (this.file_list[i].uid == id) {
          this.file_list.splice(i, 1);
          break;
        }
      }
    },

    // 重置
    resetForm() {
      this.find_form = {
        name: "",
        primary_type: "",
        secondary_type: "",
        create_date: "",
      };
    },
  },
};
</script>

<style lang='scss'>
#goods_list {
  // 查询表单
  #find_form {
    .el-form-item {
      display: inline-block;
    }
    .el-input {
      width: 200px;
    }
    .search {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    // .more {
    //   display: flex;
    //   align-items: center;
    //   justify-content: space-between;
    // }
  }
  // 商品列表
  .el-table {
    display: inline-block;
    &::before {
      height: 0;
    }
  }

  // 详情表单
  #details_form {
    .el-input,
    .el-textarea {
      width: 300px;
    }
  }
}
</style>