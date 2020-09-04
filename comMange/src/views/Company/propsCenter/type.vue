<template>
  <div id="props_type" class="shadow_container">
    <div class="pageTitle">道具类型</div>

    <!-- 查询组件 -->
    <div class="search">
      <el-input v-model="find_form.info" placeholder="分类名称" prefix-icon="el-icon-search"></el-input>
      <el-button type="success" @click="switchDialog('1')">新增分类</el-button>
    </div>

    <!-- tab分页 -->
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="户型风格" name="1"></el-tab-pane>
      <el-tab-pane label="屋内道具" name="2"></el-tab-pane>
      <el-tab-pane label="AR宠物" name="3"></el-tab-pane>
    </el-tabs>

    <!-- 列表 -->
    <el-table :data="data_list" tooltip-effect="dark" border>
      <el-table-column prop="name" label="分类名称" width="200"></el-table-column>
      <el-table-column prop="code" label="分类编号" width="120"></el-table-column>
      <el-table-column prop="design" label="描述说明"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="switchDialog('2',scope.row)">详情</el-button>
          <el-button type="warning" size="small">修改</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出框 -->
    <el-dialog
      :title="operate_type=='1'?'添加类型':'类型详情'"
      :visible.sync="show_details"
      width="30%"
      @close="closeDetails"
    >
      <el-form label-width="80px" class="details_form">
        <!-- 基本类别 -->
        <div class="basic">
          <!-- 下拉框一 -->
          <el-form-item label="道具大类">
            <el-select v-model="add_form.large_type">
              <el-option label="户型风格" value="1"></el-option>
              <el-option label="屋内道具" value="2"></el-option>
              <el-option label="AR宠物" value="3"></el-option>
            </el-select>
          </el-form-item>
          <!-- 下拉框二 -->
          <el-form-item label="道具小类">
            <el-input v-model="add_form.small_type"></el-input>
          </el-form-item>
        </div>
        <!-- 特性 -->
        <div class="special">
          <div class="group">
            <h3>媒体附加</h3>
            <el-checkbox-group v-model="add_form.mediaList" @change="change('1')">
              <el-checkbox label="文字"></el-checkbox>
              <el-checkbox label="图片"></el-checkbox>
              <el-checkbox label="语音"></el-checkbox>
              <el-checkbox label="视频"></el-checkbox>
            </el-checkbox-group>
            <el-checkbox label="不允许" @change="uncheck('1')" v-model="check_group.mediaCheck"></el-checkbox>
          </div>
          <div class="group">
            <h3>摆放规则</h3>
            <el-checkbox-group v-model="add_form.placeList" @change="change('2')">
              <el-checkbox label="墙面"></el-checkbox>
              <el-checkbox label="地面"></el-checkbox>
              <el-checkbox label="房顶"></el-checkbox>
              <el-checkbox label="空中"></el-checkbox>
            </el-checkbox-group>
            <el-checkbox label="不限制" @change="uncheck('2')" v-model="check_group.placeCheck"></el-checkbox>
          </div>
          <div class="group">
            <h3>AI特性</h3>
            <el-checkbox-group v-model="add_form.AIList">
              <el-checkbox label="走"></el-checkbox>
              <el-checkbox label="跑"></el-checkbox>
              <el-checkbox label="大笑"></el-checkbox>
              <el-checkbox label="自由活动"></el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <el-form-item>
          <el-button type="primary" v-if="operate_type=='1'" @click="sendSubmit">添加</el-button>
          <el-button type="primary" v-else-if="operate_type=='2'">确定</el-button>
          <el-button type="info" v-if="operate_type=='1'" @click="switchDialog">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  mounted() {
    this.activeName = "1";
  },

  data() {
    return {
      find_form: {},
      data_list: [
        {
          name: "家具",
          code: "001",
          design: "椅子桌子板凳",
        },
      ],
      // 弹出框表单对象
      add_form: {
        mediaList: [],
        placeList: [],
        AIList: [],
      },

      activeName: "", // 1-户型风格 2-屋内道具 3-AR宠物
      show_details: false, // 隐藏&显示添加弹出框
      operate_type: "", // 操作类型 1-添加 2-修改
      check_group: {
        mediaCheck: false,
        placeCheck: false,
      },
    };
  },

  methods: {
    // 添加数据
    switchDialog(type) {
      this.show_details = !this.show_details;
      if (this.show_details) {
        this.operate_type = type;
      }
    },

    // 提交添加
    sendSubmit() {
      console.log(this.add_form);
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
      this.add_form = {
        mediaList: [],
        placeList: [],
        AIList: [],
      };
      this.check_group = {
        mediaCheck: false,
        placeCheck: false,
      };
    },

    // 全不选
    uncheck(type) {
      switch (type) {
        case "1":
          this.add_form.mediaList = ["none"];
          break;
        case "2":
          this.add_form.placeList = ["nolimit"];
          break;
      }
    },
  },

  watch: {
    activeName() {
      console.log(this.activeName);
      // 监听该变量，变量值改变时请求不同的信息渲染到列表上
    },
  },
};
</script>

<style lang='scss'>
#props_type {
  .search {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .el-input {
      width: 300px;
    }
  }
  .details_form {
    // 基本特性
    .basic {
      display: flex;
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