<template>
  <div class="container" id="about_photo">
    <h1>关于名视</h1>
    <!-- 轮播图 -->

    <el-form label-width="100px">
      <el-form-item label="图片墙" style="width:1400px">
        <!-- 列表 -->
        <el-table
          :data="photo_list"
          style="width: 100%"
          :default-sort="{ prop: 'date', order: 'descending' }"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="mediaUrl" label="预览" sortable width="500">
            <template slot-scope="scope">
              <img :src="scope.row.mediaUrl" height="200px" alt />
            </template>
          </el-table-column>
          <el-table-column prop="isDisable" label="状态" sortable width="100">
            <template slot-scope="scope">
              {{
              scope.row.isDisable == "1" ? "禁用" : "启用"
              }}
            </template>
          </el-table-column>
          <el-table-column prop="caseId" label="图片编号" sortable width="250">
            <template slot-scope="scope">
              {{
              scope.row.mediaId.substring(6)
              }}
            </template>
          </el-table-column>
          <el-table-column prop="creationtime" label="上传时间" sortable width="180"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
              <el-button
                :type="scope.row.isDisable - 0 ? 'success' : 'danger'"
                size="small"
                @click="switchSta(scope.row)"
              >{{ scope.row.isDisable - 0 ? "启用" : "禁用" }}</el-button>
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
          :before-upload="beforeAvatarUpload"
          :on-change="getFileList"
          :multiple="true"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{ file }">
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="previewImg(file)">
                <i class="el-icon-zoom-in"></i>
              </span>
              <span class="el-upload-list__item-delete" @click="removeImg(file)">
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
  getList,
  upLoadFiles,
  downloadFile,
  classifyFiles,
  update,
  delList,
} from "@/utils/api/api";
import { switchKeyName, spliceUrl } from "@/utils/utils";
export default {
  mounted() {
    this.getDataList();
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
      fileList: [], // 上传图片列表
      photo_list: [], // 接收图片列表
    };
  },
  methods: {
    // 获取图片列表
    getDataList() {
      getList("media", this.get_form)
        .then((res) => {
          if (!res) {
            this.photo_list = [];
          } else {
            this.photo_list = spliceUrl(res.data, "mediaUrl");
            this.totalDataNum = res.totalDataNum;
          }
        })
        .catch((err) => {});
    },

    // 点击上传按钮-上传文件
    fileUpload() {
      var file = this.fileList;
      if (file.length < 1) {
        this.$message.error("请先添加图片");
        return;
      }
      var formData = new window.FormData();
      file.forEach((item, index) => {
        formData.append("files" + index, item);
      });

      var remarks = "关于我们-照片墙";
      upLoadFiles(remarks, formData)
        .then((res) => {
          // 返回上传后的文件数组后转译成新数组作为参数继续调用接口
          var arr = switchKeyName(res, "resId", "mediaUrl", "2");
          classifyFiles(arr)
            .then((res) => {
              if (res.length) {
                this.$message.success("上传成功");
                this.fileList = [];
                this.$refs.photowall.uploadFiles = [];
                this.getDataList();
              }
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    },

    // 点击删除按钮-删除上传列表中的图片
    removeImg(file) {
      this.$refs.photowall.uploadFiles = [];
    },

    // 点击'+'号按钮-获取文件列表
    getFileList(file, fileList) {
      this.fileList = [];
      for (var i = 0; i < fileList.length; i++) {
        var obj = fileList[i].raw;
        this.fileList.push(obj);
      }
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

    // 删除当前行
    deleteRow(row) {
      delList("media", row)
        .then((res) => {
          if (res == "1") {
            this.$message({
              type: "success",
              message: "删除成功",
            });
          }
          this.getDataList();
        })
        .catch((err) => {});
    },

    // 每页显示条数改变
    pageSizeChange(val) {
      this.get_form.pageSize = val;
      this.getDataList(); // 重新加载列表
    },
    // 当前页码改变
    currentChange(val) {
      this.get_form.currPage = val;
      this.getDataList(); // 重新加载列表
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
};
</script>

<style lang="scss">
#about_photo {
  .page {
    margin-top: 20px;
  }
}
</style>
