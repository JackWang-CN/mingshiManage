<template>
  <div id="entrust" class="card_container">
    <!-- 进行中活动 -->
    <div class="pageTitle">进行中活动</div>

    <!-- 查询条件 -->

    <div class="search">
      <div class="filter">
        <el-input
          v-model="find_form.data.reqId"
          placeholder="活动主题、券名称"
        ></el-input>
        <el-button type="primary">最近</el-button>
        <el-button>快过期</el-button>
      </div>
      <el-button type="primary">切换为统计图</el-button>
    </div>

    <!-- 委托列表 -->
    <el-table
      :data="data_list"
      tooltip-effect="dark"
      :border="true"
      @selection-change="select"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        prop="activityTheme"
        label="活动主题"
        width="200"
        sortable
      ></el-table-column>
      <el-table-column
        prop="couponName"
        label="券名称"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="validDay"
        label="持续天数"
        width="150"
      ></el-table-column>
      <el-table-column prop="total" label="总数" width="100"></el-table-column>
      <el-table-column prop="receiveAmount" label="领取率" width="100">
        <template slot-scope="scope"
          >{{ scope.row.receiveAmount / scope.row.total }}%</template
        >
      </el-table-column>
      <el-table-column label="使用率" width="100">
        <template slot-scope="scope"
          >{{ scope.row.useAmount / scope.row.total }}%</template
        >
      </el-table-column>
      <el-table-column
        prop="describe"
        label="券详情"
        width="300"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="delRow(scope.row.reqId)" type="danger" size="small"
            >终止</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页插件 -->
    <pagination
      :find="find_form"
      @sizeChange="pageChange('size', $event)"
      @currChange="pageChange('curr', $event)"
    ></pagination>
  </div>
</template>

<script>
import pagination from "@/components/Pagination";
import { getData, getDataList, delData } from "@/utils/api/apis";
import { createGet, filteObj, spliceKey } from "@/utils/common";
export default {
  components: {
    pagination,
  },
  mounted() {
    this.find_form = createGet();
    var form = { ...this.find_form };
    // 首次加载
    getData(this.model, this.control, 1, form).then((res) => {
      this.data_list = res.data;
    });
  },

  data() {
    return {
      find_form: { data: {} },
      data_list: [],
      select_list: [],
      btn_status: false,

      model: "activity",
      control: "ongoing",
    };
  },

  methods: {
    // 查询
    findList() {
      this.btn_status = true;
      setTimeout(() => {
        this.btn_status = false;
      }, 500);

      var form = { ...this.find_form };
      form.data = filteObj(form.data);
      form.data = spliceKey(form.data);
      getData(this.model, this.control, 1, form).then((res) => {
        this.data_list = res.data;
      });
    },

    // 删除当前
    delRow(reqId) {
      var obj = { reqId };
      delData(this.$vision.merchant, "Meraddata", "del", obj).then((res) => {
        if (res) {
          this.$message.success("删除成功！");
          getData(this.model, this.control, 1, form).then((res) => {
            this.data_list = res.data;
          });
        }
      });
    },

    // 删除批量
    delList() {
      if (this.select_list.length) {
        delData(
          this.$vision.merchant,
          "Meraddata",
          "delList",
          this.select_list
        ).then((res) => {
          if (res) {
            this.$message.success("删除成功！");
            getData(this.model, this.control, 1, form).then((res) => {
              this.data_list = res.data;
            });
          }
        });
      } else {
        this.$message.error("请勾选至少一项");
        return;
      }
    },

    // 跳转到详情页
    toDetails(id) {
      this.$router.push({
        path: "entrust_details",
        query: { id },
      });
    },

    // 重置
    resetForm() {
      this.find_form = {
        currPage: 1,
        pageSize: 10,
        data: {},
      };
    },

    // 获取选中项
    select(list) {
      this.select_list = list;
    },

    // 分页改变时触发
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
      getDataList(this.model, this.control, 1, form, this);
    },
  },

  watch: {
    // 监听数据列表
    data_list() {
      this.data_list.forEach((item) => {
        var time = new Date(item.endTime) - new Date(item.startTime);
        item.validDay = Math.floor(time / 1000 / 3600 / 24);
      });
    },
  },
};
</script>

<style lang='scss'>
#entrust {
  // 查询表单
  .search {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .filter {
      .el-input {
        margin-right: 100px;
      }
    }
    .el-input {
      width: 300px;
    }
  }

  // 角色列表
  .el-table {
    .cell {
      max-height: 200px;
      img {
        height: 180px;
      }
    }
  }
}
</style>