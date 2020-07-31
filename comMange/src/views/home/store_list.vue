<!-- 商户管理-商户列表 -->
<template>
  <div id="store" class="shadow_container">
    <div class="pageTitle">商户列表</div>
    <!-- 查询条件 -->
    <el-form ref="find_form" :model="find_form" label-width="80px">
      <el-form-item label="商家ID" label-width="100px">
        <el-input v-model="find_form.data.merId" placeholder="请输入商家ID"></el-input>
      </el-form-item>
      <el-form-item label="商家名称" label-width="100px">
        <el-input v-model="find_form.data.merName" placeholder="请输入商家名称"></el-input>
      </el-form-item>
      <el-form-item label="业务经理" label-width="100px">
        <el-input v-model="find_form.data.officeManager" placeholder="请输入业务经理"></el-input>
      </el-form-item>
      <el-form-item label="审核状态">
        <el-select v-model="find_form.data.checkStatus" placeholder="请选择审核状态">
          <el-option label="已通过" value="已通过"></el-option>
          <el-option label="已拒绝" value="已拒绝"></el-option>
          <el-option label="审核中" value="审核中"></el-option>
        </el-select>
      </el-form-item>
      <!-- 日期查询 -->
      <div class="date_btn">
        <el-form-item label="创建时间" label-width="100px">
          <el-date-picker
            v-model="find_form.data.creationTime"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item class="btns_find">
          <el-button type="primary" @click="queryData">查询</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </div>
    </el-form>
    <!-- 商户列表 -->
    <el-table :data="store_list" border style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column fixed prop="merId" label="商户ID" width="80"></el-table-column>
      <el-table-column prop="merName" label="商户名称" width="120"></el-table-column>
      <el-table-column prop="merHeadpng" label="商户头像" width="120"></el-table-column>
      <el-table-column prop="merAddr" label="商户地址" width="300"></el-table-column>
      <el-table-column prop="merTel" label="联系方式" width="150"></el-table-column>
      <el-table-column prop="creationTime" label="创建日期" width="200"></el-table-column>
      <el-table-column prop="officeManager" label="业务经理" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="500">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { creatGet, createObj, spliceKey} from "@/api/Common";
import { getDataList } from "@/api/api";
export default {
  data() {
    return {
      // 查找条件
      find_form: {
        currPage: 1,
        pageSize: 10,
        data: {
        },
      },
      // 日期选择
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      // 商户列表
      store_list: []
    };
  },
  mounted() {
    var get_form = creatGet();
    getDataList("c1", "Merinfo", get_form, "store_list", this);
  },
  methods: {
    queryData() {
      var get_form = {...this.find_form};
      get_form.data = createObj(get_form.data);
      get_form.data = spliceKey(get_form.data)
      getDataList("c1", "Merinfo", get_form, "store_list", this);
    },
    onSubmit() {
      console.log(
        "审核状态:",
        this.find_form.checkStatus,
        "创建日期",
        this.find_form.create_date[0]
      );
    },
    // 重置
    resetForm() {
      this.find_form.data = {
      };
    }
  }
};
</script>

<style lang='scss'>
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