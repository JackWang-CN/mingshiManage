<template>
  <div id="props_type" class="shadow_container">
    <div class="pageTitle">道具类型</div>

    <!-- tab分页 -->
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="房产道具" name="propHouse"></el-tab-pane>
      <el-tab-pane label="屋内道具" name="prop"></el-tab-pane>
      <el-tab-pane label="宠物道具" name="propPet"></el-tab-pane>
    </el-tabs>

    <!-- 查询组件 -->
    <div class="search">
      <el-input v-model="find_form.info" placeholder="分类名称" prefix-icon="el-icon-search"></el-input>
      <el-button type="success" @click="showDetails(0)">新增分类</el-button>
    </div>

    <!-- 列表 -->
    <el-table :data="data_list" tooltip-effect="dark" border>
      <el-table-column prop="name" label="分类名称" width="200"></el-table-column>
      <el-table-column prop="describe" label="描述说明"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="warning" size="small" @click="showDetails(1,scope.row)">修改</el-button>
          <el-button type="danger" size="small" @click="delRow(scope.row.typeID)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出框 -->
    <el-dialog
      :title="operate==0?'添加类型':'类型详情'"
      :visible.sync="show_details"
      width="30%"
      @closed="closeDetails"
    >
      <el-form label-width="80px" class="details_form">
        <!-- 基本类别 -->
        <div class="basic">
          <!-- 下拉框一 -->
          <el-form-item label="所属父类">
            <el-select v-model="data_info.parentID">
              <el-option
                v-for="item in data_list"
                :key="item.typeID"
                :label="item.name"
                :value="item.typeID"
              ></el-option>
              <el-option label="新增父类" value></el-option>
            </el-select>
          </el-form-item>
          <!-- 下拉框二 -->
          <el-form-item label="类型名称">
            <el-input v-model="data_info.name"></el-input>
          </el-form-item>
          <el-form-item label="类型描述">
            <el-input type="textarea" v-model="data_info.describe" :rows="4"></el-input>
          </el-form-item>
        </div>
        <!-- 特性 -->
        <div class="special">
          <div class="group" v-if="model=='prop'">
            <h3>媒体附加</h3>
            <el-checkbox-group v-model="data_info.mediaSpecial">
              <el-checkbox
                v-for="item in prop_special.media"
                :key="item.majoKey"
                :label="item.majoKey"
              >{{item.value}}</el-checkbox>
            </el-checkbox-group>
          </div>

          <div class="group" v-if="model=='prop'">
            <h3>摆放规则</h3>
            <el-checkbox-group v-model="data_info.putSpecial">
              <el-checkbox
                v-for="item in prop_special.put"
                :key="item.majoKey"
                :label="item.majoKey"
              >{{item.value}}</el-checkbox>
            </el-checkbox-group>
          </div>

          <div class="group" v-if="model=='propPet'">
            <h3>AI特性</h3>
            <el-checkbox-group v-model="data_info.aiSpecial">
              <el-checkbox
                v-for="item in AI_special"
                :key="item.majoKey"
                :label="item.majoKey"
              >{{item.value}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <el-form-item>
          <el-button type="primary" v-if="operate==0" @click="sendSubmit(0)">添加</el-button>
          <el-button type="primary" v-else-if="operate==1" @click="sendSubmit(1)">确定</el-button>
          <el-button type="info" @click="show_details=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getDataList, addData, delData, updateData } from "@/utils/api/apis";
import { createGet, hintMessage } from "@/utils/common";
export default {
  mounted() {
    this.find_form = createGet();
    this.activeName = "propHouse";
  },

  data() {
    return {
      find_form: {},
      data_list: [],
      type_list: [],

      // 弹出框表单对象
      data_info: {
        mediaSpecial: [],
        aiSpecial: [],
        putSpecial: [],
      },

      prop_special: {
        media: [],
        put: [],
      },
      AI_special: [],

      activeName: "", // 1-户型风格 2-屋内道具 3-AR宠物
      show_details: false, // 隐藏&显示添加弹出框
      operate: "", // 操作类型 1-添加 2-修改
      check_group: {
        mediaCheck: false,
        placeCheck: false,
      },

      checkList: [],

      model: "prop",
      control: "propType",
    };
  },

  methods: {
    // 点击添加数据，打开弹出框
    showDetails(type, row) {
      this.show_details = !this.show_details;
      if (this.show_details) {
        this.operate = type;
      }

      var form = createGet(1, 99);
      switch (this.activeName) {
        case "prop":
          getDataList(
            this.model,
            this.control,
            1,
            form,
            this,
            "prop_special",
            "getSpecialConfig"
          );
          break;
        case "propPet":
          getDataList(
            this.model,
            this.control,
            1,
            form,
            this,
            "AI_special",
            "getSpecialConfig"
          );
          break;
      }
      console.log(this.data_list);

      if (type) {
        this.data_info = { ...row };
      }
    },

    // 提交添加
    sendSubmit(type) {
      this.show_details = false;
      var form = { ...this.data_info };
      switch (this.model) {
        case "propHouse":
          delete form.mediaSpecial;
          delete form.putSpecial;
          delete form.aiSpecial;
          break;
        case "prop":
          delete form.aiSpecial;
          break;
        case "propPet":
          delete form.mediaSpecial;
          delete form.putSpecial;
          break;
      }

      if (type == 0) {
        addData(this.model, this.control, 1, form).then((res) => {
          hintMessage(this, res);
          var form = { ...this.find_form };
          getDataList(this.model, this.control, 1, form, this);
        });
      } else {
        updateData(this.model, this.control, 1, form).then((res) => {
          hintMessage(this, res);
          var form = { ...this.find_form };
          getDataList(this.model, this.control, 1, form, this);
        });
      }
    },

    change(type) {
      switch (type) {
        case "1":
          this.check_group.mediaCheck = false;
          break;
        case "2":
          this.check_group.placeCheck = false;
          break;
      }
    },

    // 关闭弹出框的回调
    closeDetails() {
      this.data_info = {
        mediaSpecial: [],
        aiSpecial: [],
        putSpecial: [],
      };
    },

    // 删除当前行
    delRow(typeID) {
      delData(this.model, this.control, 1, { typeID }).then((res) => {
        hintMessage(this, res);
        var form = { ...this.find_form };
        getDataList(this.model, this.control, 1, form, this);
      });
    },
  },

  watch: {
    // 监听activeName，变量值改变时请求不同的信息渲染到列表上
    activeName() {
      // 请求当前道具分支的类型列表
      this.model = this.activeName;
      this.control = this.activeName + "Type";
      var form = { ...this.find_form };
      getDataList(this.model, this.control, 1, form, this);
    },
  },
};
</script>

<style lang='scss'>
#props_type {
  .search {
    display: flex;
    // justify-content: space-between;
    margin-bottom: 20px;
    .el-input {
      width: 300px;
      margin-right: 20px;
    }
  }
  .details_form {
    // 基本特性
    .basic {
      .el-form-item {
        display: block;
        .el-input,
        .el-textarea {
          width: 400px;
        }
      }
    }
    // 道具特性
    .special {
      .group {
        margin-bottom: 20px;
        border: 1px solid #dadada;
        padding: 10px;
        h3 {
          font-size: 16px;
          margin-bottom: 15px;
        }
        .el-checkbox-group {
          margin-bottom: 10px;
        }
      }
    }

    .el-select,
    .el-input {
      width: 8vw;
    }
  }
}
</style>