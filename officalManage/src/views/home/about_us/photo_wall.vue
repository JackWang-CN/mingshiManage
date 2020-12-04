<template>
  <div class="container" id="about_photo">
    <h1>关于名视</h1>
    <!-- 轮播图 -->

    <el-form label-width="100px">
      <el-form-item label="图片墙" style="width: 1400px">
        <!-- 列表 -->
        <el-table
          :data="photo_list"
          style="width: 100%"
          :default-sort="{ prop: 'date', order: 'descending' }"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            prop="sortNum"
            label="序号"
            width="120"
          ></el-table-column>
          <el-table-column prop="mediaUrl" label="预览" width="500">
            <template slot-scope="scope">
              <img :src="scope.row.imgUrl" alt="加载失败" height="200px" />
            </template>
          </el-table-column>
          <el-table-column prop="isEnable" label="状态" width="100">
            <template slot-scope="scope">
              {{ scope.row.isEnable ? "启用" : "禁用" }}
            </template>
          </el-table-column>

          <el-table-column
            prop="jumpUrl"
            label="跳转地址"
            width="180"
          ></el-table-column>

          <el-table-column
            prop="createTime"
            label="上传时间"
            width="180"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="danger"
                size="small"
                @click="delRow(scope.row.mediaID)"
                >删除</el-button
              >
              <el-button
                :type="scope.row.isEnable ? 'danger' : 'success'"
                size="small"
                @click="switchState(scope.row)"
                >{{ scope.row.isEnable ? "禁用" : "启用" }}</el-button
              >
            </template>
          </el-table-column>
        </el-table>

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
      </el-form-item>
      <el-form-item label="上传图片">
        <el-upload
          ref="photowall"
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :on-change="getFileList"
          :multiple="true"
          :file-list="img_list"
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

      <!-- 按钮 -->
      <el-form-item>
        <el-button type="primary" @click="fileUpload">上传</el-button>
      </el-form-item>
    </el-form>

    <!-- 弹出框 -->
    <el-dialog :visible.sync="show_img">
      <img width="100%" :src="show_imgUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
import {
  getDataList,
  delData,
  uploadFiles,
  addData,
  updateData,
} from "@/utils/api/apis";
import { spliceImg, hintMessage } from "@/utils/common";
export default {
  mounted() {
    getDataList(this.model, this.control, 1, this.get_form, this, "photo_list");
  },
  data() {
    return {
      totalDataNum: 0, //数据总条数
      // 请求列表时的参数对象
      get_form: {
        currPage: 1,
        pageSize: 5,
        data: {
          scene: "2",
        },
      },
      show_imgUrl: "", // 预览图的url
      show_img: false, // 是否显示预览图
      img_list: [], // 上传图片列表
      photo_list: [], // 接收图片列表

      model: "config",
      control: "media",
    };
  },
  methods: {
    // 点击上传按钮-上传文件
    async fileUpload() {
      var file = this.img_list;
      this.img_list = [];
      if (file.length < 1) {
        this.$message.error("请先添加图片");
        return;
      }
      var remarks = "关于我们-照片墙";
      var res = await uploadFiles(2, 1, file, remarks);
      var mediaUrl = res.resultObject[0].resID;
      console.log(mediaUrl);

      var data_info = {
        title: "",
        scene: "2",
        sortNum: 0,
        mediaUrl,
        jumpUrl: "",
        isEnable: 1,
      };

      addData(this.model, this.control, 1, data_info).then((res) => {
        hintMessage(this, res);
        getDataList(
          this.model,
          this.control,
          1,
          this.get_form,
          this,
          "photo_list"
        );
      });
    },

    // 点击删除按钮-删除上传列表中的图片
    removeImg(file) {
      this.$refs.photowall.uploadFiles = [];
    },

    // 点击'+'号按钮-获取文件列表
    getFileList(file, list) {
      this.img_list = [...list];
    },

    // 改变禁用状态
    switchState(row) {
      var { isEnable, mediaID } = row;
      var status = !isEnable - 0;

      updateData(this.model, this.control, 1, {
        isEnable: status,
        mediaID,
      }).then((res) => {
        hintMessage(this, res);
        getDataList(
          this.model,
          this.control,
          1,
          this.get_form,
          this,
          "photo_list"
        );
      });
    },

    // 删除当前行
    delRow(mediaID) {
      delData(this.model, this.control, 1, { mediaID }).then((res) => {
        hintMessage(this, res);
        getDataList(
          this.model,
          this.control,
          1,
          this.get_form,
          this,
          "photo_list"
        );
      });
    },

    // 每页显示条数改变
    pageSizeChange(val) {
      this.get_form.pageSize = val;
      getDataList(
        this.model,
        this.control,
        1,
        this.get_form,
        this,
        "photo_list"
      );
    },
    // 当前页码改变
    currentChange(val) {
      this.get_form.currPage = val;
      getDataList(
        this.model,
        this.control,
        1,
        this.get_form,
        this,
        "photo_list"
      );
    },

    previewImg(file) {
      this.show_imgUrl = file.url;
      this.show_img = true;
    },

    // 上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },

  watch: {
    photo_list() {
      spliceImg(this.photo_list, "mediaUrl");
    },
  },
};
</script>

<style lang="scss">
#about_photo {
  .page {
    margin-top: 20px;
  }
}
</style>
