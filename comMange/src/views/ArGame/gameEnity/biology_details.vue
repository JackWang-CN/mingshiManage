<template>
  <div id="biology_details" class="shadow_container">
    <div class="pageTitle">
      {{ name }} 阶段奖励
      <el-button type="success" @click="showDetails(0)">添加阶段</el-button>
    </div>

    <!-- 表格 -->
    <el-table :data="stage_list">
      <el-table-column
        prop="stateName"
        label="阶段名称"
        width="150"
      ></el-table-column>

      <el-table-column prop="maxHP" label="血量高位" width="150">
        <template slot-scope="scope">
          {{ scope.row.maxHP + "%" }}
        </template>
      </el-table-column>

      <el-table-column prop="minHP" label="血量低位" width="150">
        <template slot-scope="scope">
          {{ scope.row.minHP + "%" }}
        </template>
      </el-table-column>

      <el-table-column
        prop="lootStoreName"
        label="奖池名称"
        width="150"
      ></el-table-column>

      <el-table-column
        prop="triggerChange"
        label="触发几率"
        width="150"
      ></el-table-column>

      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="showDetails(1, scope.row)"
            >修改</el-button
          >

          <el-button
            type="danger"
            size="small"
            @click="delRow(scope.row.stageID)"
            >删除</el-button
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

    <el-button style="margin: 20px 0 0 10px" type="info" @click="cancel"
      >返回</el-button
    >

    <!-- 弹出框 -->
    <el-dialog
      title="对象列表"
      :visible.sync="show_details"
      width="25%"
      @closed="clear"
    >
      <el-form
        label-width="80px"
        :rules="rules"
        ref="details_form"
        :model="data_info"
      >
        <el-form-item label="阶段名称">
          <el-input v-model="data_info.stateName"></el-input>
        </el-form-item>
        <el-form-item label="血量高位" prop="maxHP">
          <el-input v-model="data_info.maxHP" clearable>
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="血量低位" prop="minHP">
          <el-input v-model="data_info.minHP" clearable>
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="选择奖池">
          <el-select v-model="data_info.lootStoreID">
            <el-option
              v-for="item in loot_list"
              :key="item.lootStoreID"
              :label="item.lootStoreName"
              :value="item.lootStoreID"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="触发几率">
          <el-input v-model="data_info.triggerChange"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sendSubmit">提交</el-button>
          <el-button @click="show_details = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { getDataList, addData, updateData, delData } from "@/utils/api/apis";
import { createGet, filteObj, hintMessage } from "@/utils/common";
export default {
  components: {
    Pagination,
  },
  mounted() {
    var { id, name } = this.$route.query;
    this.name = name;
    this.gameObjectID = id;
    this.find_form = createGet();
    this.find_form.data = { gameObjectID: id };
    this.operate = 1;
    getDataList(
      this.model,
      this.control,
      1,
      this.find_form,
      this,
      "stage_list"
    );
  },

  data() {
    return {
      name: "",
      find_form: {},
      data_info: {},
      show_details: false,
      loot_list: [], // 奖池
      stage_list: [],
      gameObjectID: "",
      operate: 0, // 0-新增 1-修改
      model: "ARGame",
      control: "stageConfiguration",

      rules: {
        maxHP: [
          { required: true, message: "数值不能为空", trigger: "blur" },
          {
            validator: this.HPScope,
            trigger: "blur",
          },
        ],

        minHP: [
          { required: true, message: "数值不能为空", trigger: "blur" },
          {
            validator: this.HPScope,
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    // 点击提交按钮
    sendSubmit() {
      var flag = true;
      this.$refs["details_form"].validate((res) => {
        flag = res;
        console.log(res);
      });

      if (!flag) {
        return;
      }

      this.data_info.gameObjectID = this.gameObjectID;
      switch (this.operate) {
        // 新增
        case 0:
          addData(this.model, this.control, 1, this.data_info).then((res) => {
            hintMessage(this, res);
            getDataList(
              this.model,
              this.control,
              1,
              this.find_form,
              this,
              "stage_list"
            );
            this.show_details = false;
          });
          break;
        // 修改
        case 1:
          updateData(this.model, this.control, 1, this.data_info).then(
            (res) => {
              hintMessage(this, res);
              getDataList(
                this.model,
                this.control,
                1,
                this.find_form,
                this,
                "stage_list"
              );
              this.show_details = false;
            }
          );
          break;
      }
    },

    // 展示详情
    showDetails(type, row) {
      this.show_details = true;
      this.operate = type;

      // 请求奖池
      if (!this.loot_list.length) {
        getDataList(
          this.model,
          "lootStore",
          1,
          createGet(1, 99),
          this,
          "loot_list"
        );
      }

      this.operate = type;
      if (type) {
        this.data_info = { ...row };
      }
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
      getDataList(
        this.model,
        this.control,
        1,
        this.find_form,
        this,
        "stage_list"
      );
    },

    // 删除当前行
    delRow(stageID) {
      delData(this.model, this.control, 1, { stageID }).then((res) => {
        hintMessage(this, res);
        getDataList(
          this.model,
          this.control,
          1,
          this.find_form,
          this,
          "stage_list"
        );
      });
    },

    // 清空
    clear() {
      this.data_info = {};
      this.$refs["details_form"].resetFields();
    },

    // 取消回到列表页
    cancel() {
      this.$router.push({
        name: "实体对象列表",
        params: { tab: "1" },
      });
    },

    // 验证器：血量范围
    HPScope(rule, value, callback) {
      if (value > 100 || value < 0) {
        callback(new Error("取值范围为0~100之间"));
      } else {
        switch (rule.fullField) {
          case "minHP":
            if (value - 0 >= this.data_info.maxHP) {
              callback(new Error("必须小于高位血量值"));
            } else {
              callback();
            }
            break;
          case "maxHP":
            if (value - 0 <= this.data_info.minHP) {
              callback(new Error("必须大于低位血量值"));
            } else {
              callback();
            }
            break;
        }
      }
    },

    // 验证器：血量范围
    // HPScope(rule, value, callback) {
    //   if (value > 100 || value < 0) {
    //     callback(new Error("取值范围为0~100之间"));
    //   }
    // },
  },
};
</script>

<style lang='scss'>
#biology_details {
  form {
    .el-form-item {
      display: inline-block;
      .el-form-item__content {
        width: 300px;
        .el-input,
        .el-input-number,
        .el-select,
        .el-textarea {
          width: 100%;
        }
      }
    }
  }
}
</style>