<template>
  <div id="banner" class="container">
    <!-- 列表 -->
    <div class="table">
      <h1>
        轮播列表
        <span class="btns">
          <el-button type="success" @click="addImg('add')">新增</el-button>
          <el-button type="danger" @click="deleteManyRows">批量删除</el-button>
        </span>
      </h1>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="首页" name="0"></el-tab-pane>
        <el-tab-pane label="关于我们" name="1"></el-tab-pane>
        <el-tab-pane label="招聘信息" name="3"></el-tab-pane>
        <el-tab-pane label="联系我们" name="4"></el-tab-pane>
      </el-tabs>

      <el-table
        :data="data_list"
        style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
        @selection-change="selectRows"
        border
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          sortable
          width="180"
        ></el-table-column>
        <el-table-column prop="mediaId" label="编号" sortable width="200">
          <template slot-scope="scope">{{
            scope.row.mediaId ? scope.row.mediaId.substring(6) : ""
          }}</template>
        </el-table-column>
        <el-table-column
          prop="creationtime"
          label="上传时间"
          sortable
          width="180"
        ></el-table-column>
        <el-table-column prop="isDsable" label="状态" width="150">
          <template slot-scope="scope">{{
            scope.row.isDisable == "1" ? "禁用" : "启用"
          }}</template>
        </el-table-column>
        <el-table-column label="图片预览" width="650">
          <template slot-scope="scope">
            <img
              :src="scope.row.mediaUrl"
              alt="图片加载失败"
              :title="scope.row.title"
              height="200"
            />
          </template>
        </el-table-column>
        <el-table-column label="超链接" width="500">
          <template slot-scope="scope">
            <a :href="scope.row.jumpUrl">{{ scope.row.jumpUrl }}</a>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="addImg('update', scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="deleteRow(scope.row.mediaId)"
              >删除</el-button
            >
            <el-button
              :type="scope.row.isDisable - 0 ? 'success' : 'info'"
              size="small"
              @click="switchSta(scope.row)"
              >{{ scope.row.isDisable - 0 ? "启用" : "禁用" }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="page">
      <el-pagination
        background
        layout="prev, sizes,pager, next"
        :total="totalDataNum || 0"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="get_form.pageSize"
        @size-change="pageSizeChange"
        @current-change="currentChange"
      ></el-pagination>
    </div>

    <!-- 弹出框 -->
    <el-dialog :title="operate ? '修改' : '添加'" :visible.sync="show_Dialog">
      <el-form :model="change_form" label-width="100px">
        <el-form-item label="轮播标题">
          <el-input v-model="change_form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片预览" v-show="operate">
          <img :src="change_form.mediaUrl" height="250px" alt />
        </el-form-item>
        <el-form-item label="跳转地址">
          <el-input v-model="change_form.jumpUrl" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 下拉选择 -->
        <el-form-item label="上传到" v-if="!operate">
          <el-select
            v-model="change_form.data.scene"
            placeholder="请选择"
            @change="changeUpPar"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 图片上传 -->
        <el-form-item label="上传图片">
          <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :on-change="getFileList"
            :limit="1"
            :file-list="img_list"
            ref="upload"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="previewImg(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  class="el-upload-list__item-delete"
                  @click="removeImg(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show_Dialog = false">取 消</el-button>
        <el-button type="primary" @click="sendAdd">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 图片预览 -->
    <el-dialog :visible.sync="show_img">
      <img width="100%" :src="show_imgUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
import {
  getList, // 查
  addList, // 增
  update, // 改
  delList, // 删
  delManyList,
  upLoadFiles,
  classifyFiles,
} from "@/utils/api/api";
import { getDataList, addData, uploadFiles } from "@/utils/api/apis";
import { switchKeyName, spliceUrl } from "@/utils/utils";
export default {
  mounted() {
    this.activeName = "0";
  },

  data() {
    return {
      hierarchy: "offical_index_banner",
      remarks: "首页-轮播图",
      totalDataNum: 0,
      activeName: "",
      upScene: "",

      options: [
        { value: "0", label: "首页" },
        { value: "1", label: "关于我们" },
        { value: "3", label: "招聘信息" },
        { value: "4", label: "联系我们" },
      ],

      show_img: false,
      show_imgUrl: "", // 预览图地址
      operate: 0, // 0--添加 1--修改

      // 图片列表
      data_list: [],
      show_Dialog: false,

      // 首次请求表单
      get_form: {
        currPage: 1,
        pageSize: 10,
        data: {
          scene: "0",
        },
      },

      // 修改请求表单
      change_form: { data: {} },

      select_list: [], // 选中的列表
      img_list: [], // 上传的文件列表

      model: "config",
      control: "media",
    };
  },
  methods: {
    // 请求列表数据
    getDataList() {
      this.banner = [];
      getList("media", this.get_form)
        .then((res) => {
          if (res == null) {
            this.banner = [];
          } else {
            this.banner = spliceUrl(res.data, "mediaUrl");
            this.totalDataNum = res.totalDataNum;
          }
        })
        .catch((err) => {});
    },

    // 处理操作类型：新增||修改
    addImg(type, row) {
      if (type == "add") {
        this.operate = 0;
        this.change_form = { data: {} }; //重置
        this.change_form.scene = "0";
      } else {
        this.operate = 1;
        this.change_form = { ...row };
      }
      this.show_Dialog = true;
    },

    // 改变禁用状态
    switchSta(sta) {
      var obj = {};
      obj.mediaId = sta.mediaId;
      var status = sta.isDisable - 0;
      status = !status - 0;
      obj.isDisable = status.toString();
      update("media", obj)
        .then((res) => {
          this.getDataList();
        })
        .catch((err) => {});
    },

    // 删除
    deleteRow(mediaId) {
      var obj = {};
      obj.mediaId = mediaId;
      delList("media", obj)
        .then((res) => {
          if (res) {
            this.$message({
              type: "success",
              message: "删除成功",
            });
          }
          this.get_form.data.scene = this.activeName;
          this.getDataList();
        })
        .catch((err) => {});
    },

    // 批量删除
    deleteManyRows() {
      if (this.select_list.length < 1) {
        this.$message.error("请至少选中一条数据");
        return;
      }
      delManyList("media", this.select_list)
        .then((res) => {
          if (res) {
            this.$message({
              type: "success",
              message: "批量删除成功",
            });
            this.getDataList();
          }
        })
        .catch((err) => {});
    },

    // 勾选事件
    selectRows(selection) {
      this.select_list = selection;
    },

    // 点击上传按钮-上传文件
    async sendAdd() {
      var file = this.img_list;
      this.img_list = [];

      if (!this.operate) {
        // 新增
        if (file.length < 1) {
          this.$message.error("请先添加图片");
          return;
        }

        this.show_Dialog = false;
        var res = await uploadFiles(2, 1, file, this.remarks);

        console.log(res);
      } else {
        // 修改 --1 先判断是否上传图片 2-1 是则先上传，拿到resId再修改 2-2 否则直接修改
        if (file.length < 1) {
          update("media", this.change_form)
            .then((res) => {
              if (res) {
                this.$message.success("修改成功");
              }
              this.getDataList();
            })
            .catch((err) => {});
        } else {
          upLoadFiles(this.remarks, formData)
            .then((res) => {
              this.change_form.mediaUrl = res[0].resId;

              update("media", this.change_form).then((res) => {
                switch (res) {
                  case 1:
                    this.$message.success("修改成功！");
                }
                this.getDataList();
              });
            })
            .catch((err) => {});
        }
      }
    },

    // 预览上传的图片
    previewImg(file) {
      this.show_imgUrl = file.url;
      this.show_img = true;
    },

    // 点击删除按钮-删除上传列表中的图片
    removeImg(file) {
      this.img_list = [];
    },

    // 点击'+'号按钮-获取文件列表
    getFileList(file, list) {
      this.img_list = [...list];
    },

    // 每页显示条数改变
    pageSizeChange(val) {
      this.get_form.pageSize = val;
      this.getDataList(this.get_form); // 重新加载列表
    },
    // 当前页码改变
    currentChange(val) {
      this.get_form.currPage = val;
      this.getDataList(this.get_form); // 重新加载列表
    },

    // 选择上传场景时改变上传参数
    changeUpPar(v) {
      this.upScene = v;
      switch (v) {
        case "0":
          this.remarks = "首页-轮播图";
          break;
        case "1":
          this.remarks = "关于-轮播图";
          break;
        case "3":
          this.remarks = "招聘-轮播图";
          break;
        case "0":
          this.remarks = "联系-轮播图";
          break;
      }
    },
  },

  watch: {
    activeName(v) {
      this.data_list = [];
      this.get_form.data.scene = this.activeName;
      getDataList(this.model, this.control, 1, this.get_form, this);
    },
  },
};
</script>

<style lang="scss">
#banner {
  // 分页插件
  .page {
    margin-top: 20px;
  }
}
</style>
