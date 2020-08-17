<template>
  <div id="userHouse_details" class="shadow_container">
    <div class="pageTitle">房产详情</div>

    <!-- 表单 -->
    <el-form label-width="100px">
      <el-form-item label="房产ID">{{ data_info.hpId }}</el-form-item>
      <el-form-item label="房产名称">{{ data_info.hpName }}</el-form-item>
      <el-form-item label="用户ID">{{ data_info.uid }}</el-form-item>
      <el-form-item label="类型">{{ data_info.hptype }}</el-form-item>
      <el-form-item label="状态">{{ data_info.hpstate }}</el-form-item>
      <el-form-item label="缩略图">{{ data_info.hpico }}</el-form-item>
      <el-form-item label="房产描述">{{ data_info.infoDes }}</el-form-item>
      <el-form-item label="商铺经营类别">
        {{
        data_info.busiCategory
        }}
      </el-form-item>
      <el-form-item label="三证合一代码">
        {{
        data_info.inteThrCode
        }}
      </el-form-item>
      <el-form-item label="三证附件照片">
        {{
        data_info.thrAttaPhoto
        }}
      </el-form-item>
      <el-form-item label="身份证正面照">
        {{
        data_info.idFacePhoto
        }}
      </el-form-item>
      <el-form-item label="身份证背面照">
        {{
        data_info.idBackPhoto
        }}
      </el-form-item>
      <el-form-item label="身份证持证照">
        {{
        data_info.idLicense
        }}
      </el-form-item>
      <el-form-item label="更新时间">{{ data_info.updateTime }}</el-form-item>
      <el-form-item label="审核时间">{{ data_info.auditTime }}</el-form-item>
      <el-form-item label="审核状态">{{ data_info.auditStatus }}</el-form-item>
      <el-form-item label="创建时间">{{ data_info.creationTime }}</el-form-item>
      <el-form-item>
        <el-button type="info" @click="cancel">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getDetailsInfo, updateDataList } from "@/utils/api/api";
import { filteObj } from "@/utils/common";
export default {
  mounted() {
    this.userId = this.$route.query.id;
    // 首次请求数据
    getDetailsInfo(
      this.$vision.user,
      this.control,
      { userId: this.userId },
      "data_info",
      this
    );
  },

  data() {
    return {
      data_info: {}, // 数据对象
      userId: "",
      control: "Spahousepro",
    };
  },

  methods: {
    // 提交保存
    sendSubmit() {
      updateDataList(
        this.$vision.user,
        "UserInfo",
        filteObj(this.data_info),
        this,
        "userdata_userList"
      );
    },

    // 取消
    cancel() {
      this.$router.push("userdata_houseList");
    },

    // 跳转到详情页
    toDetails(path) {
      this.$router.push({
        path,
        query: {
          id: this.userId,
        },
      });
    },
  },
};
</script>

<style lang="scss">
</style>
