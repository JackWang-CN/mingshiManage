<!-- 用户反馈 -->
<template>
  <div id="feedback_list" class="shadow_container">
    <div class="pageTitle">用户反馈</div>

    <!-- 查询表单 -->
    <el-form label-width="60px">
      <el-form-item label="标题">
        <el-input v-model="find_form.data.title"></el-input>
        <el-button type="primary" style="margin-left: 20px" @click="findData"
          >查询</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="data_list" style="width: 100%" border>
      <el-table-column prop="logID" label="编号" width="180"></el-table-column>
      <el-table-column
        prop="nickname"
        label="用户昵称"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="text"
        label="反馈内容"
        width="300"
      ></el-table-column>
      <el-table-column prop="clientPlatform" label="客户端" width="120">
      </el-table-column>
      <el-table-column prop="clientScene" label="用户场景" width="120">
      </el-table-column>
      <el-table-column prop="type" label="类型" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 0">平台公告</span>
        </template>
      </el-table-column>
      <el-table-column prop="contactMethod" label="联系方式" width="120">
      </el-table-column>
      <el-table-column prop="contact" label="联系账号" width="120">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="showDetails(1, scope.row.logID)"
            size="small"
            >详情</el-button
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
    <el-dialog :visible.sync="show_details" title="反馈详情" @closed="clear">
      <el-form label-width="100px">
        <el-form-item label="反馈编号">{{ data_info.logID }}</el-form-item>
        <el-form-item label="客户端平台">{{
          data_info.clientPlatform
        }}</el-form-item>
        <el-form-item label="客户端场景">{{
          data_info.clientScene
        }}</el-form-item>
        <el-form-item label="用户昵称">{{ data_info.nickname }}</el-form-item>
        <el-form-item label="联系方式">{{
          data_info.contactMethod
        }}</el-form-item>
        <el-form-item label="反馈文本">{{ data_info.text }}</el-form-item>
        <el-form-item label="反馈截图">
          <div class="img_list">
            <img
              @click="showBigImg(img)"
              v-for="(img, index) in data_info.imgIDList"
              :key="index"
              :src="img"
              fit="fit"
            />
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="show_details = false">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog :visible.sync="show_bigImg">
      <img width="100%" :src="bigImg" alt="" />
    </el-dialog>
  </div>
</template>

<script>
const fileUrl = window.baseUrl.normal_file;
import Pagination from "@/components/Pagination";
import { createGet, filteObj } from "@/utils/common";
import { getDataList, getDetails } from "@/utils/api/apis";
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
      data_info: {},
      show_details: false,
      show_bigImg: false,
      bigImg: "",
      model: "notify",
      control: "feedback",
    };
  },

  methods: {
    // 查询列表
    findData() {
      var form = filteObj({ ...this.find_form });
      getDataList(this.model, this.control, 1, form, this, "data_list");
    },

    // 查看详情
    async showDetails(logID) {
      this.show_details = true;
      var res = await getDetails(this.model, this.control, 1, { logID });
      console.log(res);
      this.data_info = res.resultObject;
      var newArr = [];
      this.data_info.imgIDList.forEach((item) => {
        var imgUrl = fileUrl + item;
        newArr.push(imgUrl);
      });
      this.data_info.imgIDList = [...newArr];
    },

    // 查看大图
    showBigImg(img) {
      this.show_bigImg = true;
      this.bigImg = img;
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

  watch: {},
};
</script>

<style lang="scss">
#feedback_list {
  form {
    .el-input {
      width: 300px;
    }
  }

  // 图片列表
  .img_list {
    img {
      width: auto;
      height: 150px;
      cursor: pointer;
    }
  }
}
</style>