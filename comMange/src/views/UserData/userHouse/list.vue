<!-- 房产数据管理-房产列表 -->
<template>
  <div id="store" class="shadow_container">
    <div class="pageTitle">房产数据管理</div>

    <!-- 表单 -->
    <el-form ref="find_form" :model="find_form" label-width="80px">
      <el-form-item label="空间ID" label-width="100px">
        <el-input v-model="find_form.data.spaceId" placeholder="请输入空间ID"></el-input>
      </el-form-item>
      <el-form-item label="地产ID" label-width="100px">
        <el-input v-model="find_form.data.landId" placeholder="请输入地产ID"></el-input>
      </el-form-item>
      <el-form-item label="房产ID" label-width="100px">
        <el-input v-model="find_form.data.hpId" placeholder="请输入房产ID"></el-input>
      </el-form-item>
      <el-form-item label="用户ID" label-width="100px">
        <el-input v-model="find_form.data.uid" placeholder="请输入用户ID"></el-input>
      </el-form-item>
      <el-form-item label="资源ID" label-width="100px">
        <el-input v-model="find_form.data.resId" placeholder="请输入资源ID"></el-input>
      </el-form-item>
      <el-form-item label="房产类型" label-width="100px">
        <el-select v-model="find_form.data.hptype" placeholder="请选择房产类型">
          <el-option label="普通用户" value="0"></el-option>
          <el-option label="商家商铺" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="房产状态" label-width="100px">
        <el-select v-model="find_form.data.hpstate" placeholder="请选择房产状态">
          <el-option label="正常使用" value="0"></el-option>
          <el-option label="冻结" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商铺经营类别" label-width="100px">
        <el-input v-model="find_form.data.busiCategory" placeholder="请输入商铺经营类别"></el-input>
      </el-form-item>
      <el-form-item label="三证合一代码" label-width="100px">
        <el-input v-model="find_form.data.inteThrCode" placeholder="请输入三证合一代码"></el-input>
      </el-form-item>
      <el-form-item label="审核状态" label-width="100px">
        <el-input v-model="find_form.data.auditStatus" placeholder="请输入审核状态"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" label-width="100px">
        <el-date-picker
          v-model="find_form.data.creationTime"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <!-- 日期查询 -->
      <div class="date_btn">
        <el-form-item class="btns_find">
          <el-button type="primary" @click="queryData">查询</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
          <el-button
            type="success"
            style="margin-left:50px"
            @click="dialogFormVisibleOfAdd = true"
          >添加</el-button>
          <el-button type="danger" @click="delList">批量删除</el-button>
        </el-form-item>
      </div>
    </el-form>

    <!-- 表格 -->
    <el-table :data="store_list" border style="width: 100%" @selection-change="select">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="spaceId" label="空间ID" width="80"></el-table-column>
      <el-table-column prop="landId" label="地产ID" width="120"></el-table-column>
      <el-table-column prop="hpId" label="房产ID" width="120"></el-table-column>
      <el-table-column prop="uid" label="用户ID" width="120"></el-table-column>
      <el-table-column prop="resId" label="资源ID" width="120"></el-table-column>
      <el-table-column prop="hptype" label="房产类型" width="120">
        <template slot-scope="scope">
          {{
          scope.row.hptype == "0" ? "普通用户" : "商家商铺"
          }}
        </template>
      </el-table-column>
      <el-table-column prop="hpstate" label="房产状态" width="120">
        <template slot-scope="scope">
          {{
          scope.row.hpstate == "1" ? "冻结" : "正常使用"
          }}
        </template>
      </el-table-column>
      <el-table-column prop="hpico" label="房产缩略图" width="150">
        <template slot-scope="scope">
          <el-avatar shape="square" :size="100" :src="scope.row.hpico"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="hpName" label="房产名称" width="120"></el-table-column>
      <el-table-column prop="busiCategory" label="商铺经营类别" width="120"></el-table-column>
      <el-table-column prop="inteThrCode" label="三证合一代码" width="120"></el-table-column>
      <el-table-column prop="thrAttaPhoto" label="三证附件照片" width="120"></el-table-column>
      <el-table-column prop="idFacePhoto" label="身份证正面照" width="120"></el-table-column>
      <el-table-column prop="idBackPhoto" label="身份证背面照" width="120"></el-table-column>
      <el-table-column prop="idLicense" label="身份证持证照" width="120"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间" width="120"></el-table-column>
      <el-table-column prop="auditTime" label="审核时间" width="120"></el-table-column>
      <el-table-column prop="auditStatus" label="审核状态" width="120"></el-table-column>
      <el-table-column prop="creationtime" label="创建时间" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="toDetails(scope.row.uid)" type="primary" size="small">详情</el-button>
          <el-button @click="delRow(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { createGet, spliceKey } from "@/utils/common";
import { getDataList } from "@/utils/api/api";
export default {
  mounted() {
    this.find_form = createGet();
    getDataList(
      this.$vision.user,
      this.control,
      createGet(),
      "store_list",
      this,
      null,
      "hpico"
    );
  },

  data() {
    return {
      // 查找条件
      find_form: {},
      control: "Spahousepro",
      select_list: [], //已选表单
      add_form: {}, //添加表单内容
      edit_form: {}, //修改表单内容

      // 商户列表
      store_list: [],
    };
  },

  methods: {
    // 跳转到详情页
    toDetails(id) {
      this.$router.push({
        path: "userdata_houseDetails",
        query: {
          id,
        },
      });
    },

    // 获取选中列表
    select() {},

    // 删除当前
    delRow() {},

    // 批量删除
    delList() {},

    // 重置
    resetForm() {
      this.find_form.data = {};
    },
  },
};
</script>

<style lang="scss">
#store {
  form {
    .el-form-item {
      display: inline-block;
    }
    .date_btn {
      div {
        vertical-align: middle;
      }
    }
  }
}
</style>
