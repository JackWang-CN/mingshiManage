<!-- 商户管理-优惠券列表 -->
<template>
  <div id="coupon_list" class="shadow_container">
    <div class="pageTitle">
      优惠券列表
      <el-button type="success" @click="toDetails">创建优惠券</el-button>
    </div>
    <!-- 查询条件 -->
    <el-form ref="find_form" :model="find_form" label-width="80px">
      <el-form-item label="券类型" label-width="100px">
        <el-select v-model="find_form.data.isBind" placeholder="请选择券类型">
          <el-option label="折扣券" value="0"></el-option>
          <el-option label="抵扣券" value="1"></el-option>
          <el-option label="兑换券" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="满减金额" label-width="100px">
        <el-input v-model="find_form.data.eXchangeMoney" placeholder="请输入满减金额"></el-input>
      </el-form-item>
      <el-form-item label="面值" label-width="100px">
        <el-input v-model="find_form.data.couponValue" placeholder="请输入面值"></el-input>
      </el-form-item>
      <el-form-item label="状态" label-width="100px">
        <el-select v-model="find_form.data.status" placeholder="请选择状态">
          <el-option label="未领取" value="0"></el-option>
          <el-option label="已领取" value="1"></el-option>
        </el-select>
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
    </el-form>
    <!-- 商户列表 -->
    <el-table :data="data_list" border style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column fixed prop="couponType" label="券类型" width="80">
        <template slot-scope="scope">
          {{
          scope.row.couponType == "0"
          ? "折扣券"
          : scope.row.couponType == "1"
          ? "抵扣券"
          : "兑换券"
          }}
        </template>
      </el-table-column>
      <el-table-column prop="resId" label="资源id" width="120"></el-table-column>
      <el-table-column prop="eXchangeMoney" label="满减金额" width="120"></el-table-column>
      <el-table-column prop="couponValue" label="面值" width="120"></el-table-column>
      <el-table-column prop="startTime" label="有效时间" width="120"></el-table-column>
      <el-table-column prop="endTime" label="过期时间" width="120"></el-table-column>
      <el-table-column prop="status" label="状态" width="120">
        <template slot-scope="scope">{{ scope.row.status == "0" ? "未领取" : "已领取" }}</template>
      </el-table-column>
      <el-table-column prop="creationtime" label="创建时间" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="show_edit(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="user_delete(scope.row)" type="text" size="small" class="btns_delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { createGet } from "@/utils/common";
import { getDataList } from "@/utils/api/apis";
export default {
  mounted() {
    // 首次加载
    this.find_form = createGet();
    var form = { ...this.find_form };
    getDataList(this.model, this.control, this.vision, form, this);
  },

  data() {
    return {
      // 查找条件
      find_form: {
        data: {},
      },
      select_list: [], //已选表单
      data_list: [],

      model: "",
      control: "",
      vision: "",
    };
  },

  methods: {
    // 跳转到详情页
    toDetails() {
      this.$router.push("coupon_details");
    },
  },
};
</script>

<style lang="scss">
#coupon_list {
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
