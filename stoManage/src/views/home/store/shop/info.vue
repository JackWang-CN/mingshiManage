<template>
  <!-- 基础信息 -->
  <div id="merchant_info" class="card_container">
    <div class="pageTitle">基础信息</div>
    <el-tabs v-model="activeName" type="card">
      <!-- 门店信息 -->
      <el-tab-pane label="门店信息" name="shop">
        <div class="container">
          <!-- 左——表单 -->
          <el-form label-width="120px">
            <el-form-item label="门店名称">
              <el-input v-model="shop_info.shopName"></el-input>
            </el-form-item>

            <el-form-item label="门店头像">
              <el-upload
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="getFileList"
                :multiple="false"
                :limit="1"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>

            <el-form-item label="手机号">
              <el-input v-model="shop_info.tel"></el-input>
            </el-form-item>

            <el-form-item label="开始营业时间">
              <el-time-select
                v-model="startTime"
                :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '23:45',
                }"
                placeholder="选择时间"
              >
              </el-time-select>
            </el-form-item>
            <el-form-item label="结束营业时间">
              <el-time-select
                v-model="endTime"
                :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '23:45',
                }"
                placeholder="选择时间"
              >
              </el-time-select>
            </el-form-item>

            <el-form-item label="门店地址">
              <el-input
                type="textarea"
                :rows="3"
                v-model="shop_info.address"
              ></el-input>
            </el-form-item>

            <el-form-item label="门店描述">
              <el-input
                type="textarea"
                :rows="3"
                v-model="shop_info.describe"
              ></el-input>
            </el-form-item>

            <!-- 按钮组 -->
            <el-form-item>
              <el-button type="primary" @click="sendSubmit">保存</el-button>

              <el-button type="danger" @click="switchModel(1)">取消</el-button>
            </el-form-item>
          </el-form>

          <!-- 右-店铺图片 -->
          <div class="images">
            <div class="backImg">
              店铺背景图
              <el-upload
                class="avatar-uploader"
                :auto-upload="false"
                action="#"
                :show-file-list="false"
                :on-change="getBack"
              >
                <img v-if="backImg" :src="backImg" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-button @click="uploadImg(0)">立即上传</el-button>
            </div>

            <div class="aroundImg">
              店铺环境图

              <div class="around_list">
                <img
                  v-for="(img, index) in shop_info.referImgIds"
                  :key="index"
                  :src="img.imgUrl"
                  alt=""
                />
              </div>

              <el-upload
                action="#"
                list-type="picture-card"
                :auto-upload="false"
                :on-change="getAround"
              >
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{ file }">
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url"
                    alt=""
                  />
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-delete"
                      @click="delFile(file)"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
              </el-upload>
              <el-button @click="uploadImg(1)">立即上传</el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <!-- 商户信息 -->
      <el-tab-pane label="商户信息" name="merchant">
        <!-- 左——表单 -->
        <el-form label-width="120px">
          <el-form-item label="店铺名称">
            <span>{{ data_info.name }}</span>
          </el-form-item>
          <el-form-item label="店铺类型">{{
            data_info.manageTypeID
          }}</el-form-item>
          <el-form-item label="手机号">
            <span v-show="mode">{{ data_info.tel }}</span>
          </el-form-item>
          <el-form-item label="状态">
            <span>{{ data_info.isEnable ? "启用" : "禁用" }}</span>
          </el-form-item>
          <el-form-item label="身份证正面">
            <span v-show="mode">{{ data_info.iDdFacePhoto }}</span>
          </el-form-item>
          <el-form-item label="身份证反面">
            <span v-show="mode">{{ data_info.idBackPhoto }}</span>
          </el-form-item>
          <el-form-item label="创建时间">
            <span>{{ data_info.createTime }}</span>
          </el-form-item>
          <el-form-item label="审核状态">
            <span>{{ data_info.checkStatus ? "通过" : "不通过" }}</span>
          </el-form-item>
          <el-form-item label="审核人员">
            <span>{{ data_info.checker }}</span>
          </el-form-item>
          <el-form-item label="审核时间">
            <span>{{ data_info.checkTime }}</span>
          </el-form-item>

          <el-form-item label="商户头像">
            <el-avatar :src="data_info.headImage" :size="90"></el-avatar>
          </el-form-item>
          <!-- <el-form-item label="上传头像" v-show="!mode">
            <el-upload
              class="avatar-uploader"
              action="#"
              :show-file-list="false"
              :auto-upload="false"
              :on-change="getFileList"
              :multiple="false"
              :limit="1"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item> -->

          <el-form-item label="商户地址">
            <span>{{ data_info.address }}</span>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
const fileUrl = window.baseUrl.normal_file;
import {
  getDetail,
  getDataDetail,
  uploadFiles,
  addData,
} from "@/utils/api/apis";
import {
  createGet,
  createFormData,
  spliceImg,
  hintMessage,
} from "@/utils/common";
export default {
  mounted() {
    // 请求商户&店铺基本信息
    getDataDetail("global", "merchant", 1, {}, this, "data_info", "info");
    getDetail("personalCenter", "shop", 1, {}, "info").then((res) => {
      this.shop_info = res.resultObject;
      this.backImg = fileUrl + this.shop_info.bannerImgIds[0].imgResId;

      spliceImg(this.shop_info.referImgIds, "imgResId");
    });

    this.activeName = "shop";
  },

  data() {
    return {
      get_form: {},
      data_info: {},
      shop_info: {},
      imageUrl: "", // 图片预览
      backImg: "", // 背景图预览
      back_list: [],
      aroundImg: [], // 背景图预览
      around_list: [],
      activeName: "",
      startTime: "",
      endTime: "",
      mode: 1, // 0 编辑模式, 1 查阅模式
      backup_info: {}, // 备份数据对象，备份data_info
      file_list: [],

      model: "personalCenter",
      control: "shop",
    };
  },

  methods: {
    switchModel(mode) {
      this.mode = mode;
      if (!mode) {
        this.backup_info = { ...this.data_info };
      } else {
        this.data_info = { ...this.backup_info };
      }
    },

    // 提交修改
    async sendSubmit() {
      if (this.file_list.length) {
        var res = await uploadFiles(1, 1, this.file_list);
        this.shop_info.headImage = res.resultObject[0].resID;
      }

      addData(this.model, this.control, 1, this.shop_info, "infoEdit").then(
        (res) => {
          hintMessage(this, res);
          getDetail("personalCenter", "shop", 1, {}, "info").then((res) => {
            this.shop_info = res.resultObject;
            this.backImg = fileUrl + this.shop_info.bannerImgIds[0].imgResId;

            spliceImg(this.shop_info.referImgIds, "imgResId");
          });
        }
      );
    },

    // 获取上传文件列表
    getFileList(file, list) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.file_list = list;
    },

    // 获取背景图
    getBack(file, list) {
      this.backImg = URL.createObjectURL(file.raw);
      this.back_list = [file];
    },

    // 获取背景图
    getAround(file, list) {
      this.aroundImg = URL.createObjectURL(file.raw);
      this.around_list = [...list];
    },

    // 删除环境图
    delFile() {},

    // 上传图片
    async uploadImg(type) {
      switch (type) {
        case 0:
          var list = this.back_list;
          var operate = "bannerEdit";
          break;
        case 1:
          var list = this.around_list;
          var operate = "referEdit";
          break;
      }

      var res = await uploadFiles(1, 1, list);
      var newArr = [];
      res.resultObject.forEach((item, index) => {
        var obj = {};
        obj.imgResId = item.resID;
        obj.sort = index;
        newArr.push(obj);
      });

      addData(
        this.model,
        this.control,
        1,
        { bannerImgIds: newArr },
        operate
      ).then((res) => {
        hintMessage(this, res, "添加成功");
        getDetail("personalCenter", "shop", 1, {}, "info").then((res) => {
          this.shop_info = res.resultObject;
          this.backImg = fileUrl + this.shop_info.bannerImgIds[0].imgResId;

          spliceImg(this.shop_info.referImgIds, "imgResId");
        });
      });
    },
  },
};
</script>

<style lang='scss'>
#merchant_info {
  .container {
    display: flex;
    // 表单
    .el-form {
      min-width: 500px;
      .el-form-item {
        .el-form-item__label {
          font-size: 15px;
          font-weight: bold;
          margin-left: 20px;
          margin-right: 30px;
        }
        .el-form-item__content {
          .el-input,
          .el-textarea {
            width: 300px;
          }
        }
      }
    }
    // 图片
    .images {
      margin-left: 200px;
      > div {
        height: 40%;
        .around_list {
          img {
            border-radius: 5px;
            height: 150px;
            margin: 0 10px;
          }
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
}
</style>