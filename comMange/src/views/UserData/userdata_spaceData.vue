<!-- 商户管理-商户列表 -->
<template>
  <div id="store" class="shadow_container">
    <div class="pageTitle">空间数据管理</div>
    <!-- 查询条件 -->
    <el-form ref="find_form" :model="find_form" label-width="80px">
      <el-form-item label="空间ID" label-width="100px">
        <el-input
          v-model="find_form.data.spaceId"
          placeholder="请输入空间ID"
        ></el-input>
      </el-form-item>
      <el-form-item label="空间位置信息" label-width="100px">
        <el-input
          v-model="find_form.data.spaceinfo"
          placeholder="请输入空间位置信息"
        ></el-input>
      </el-form-item>
      <el-form-item label="空间维度信息" label-width="100px">
        <el-input
          v-model="find_form.data.centralpoint"
          placeholder="请输入空间维度信息"
        ></el-input>
      </el-form-item>
      <el-form-item label="空间类型" label-width="100px">
        <el-select
          v-model="find_form.data.spacetype"
          placeholder="请选择空间类型"
        >
          <el-option label="用户上传" value="0"></el-option>
          <el-option label="系统指定" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="空间状态" label-width="100px">
        <el-select
          v-model="find_form.data.spacestate"
          placeholder="请选择空间状态"
        >
          <el-option label="正常使用" value="0"></el-option>
          <el-option label="不可用(禁止抢占)" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="允许误差范围" label-width="100px">
        <el-input
          v-model="find_form.data.allowErrRan"
          placeholder="请输入允许误差范围"
        ></el-input>
      </el-form-item>
      <el-form-item label="资源id" label-width="100px">
        <el-input
          v-model="find_form.data.rId"
          placeholder="请输入资源id"
        ></el-input>
      </el-form-item>
      <el-form-item label="资源信息" label-width="100px">
        <el-input
          v-model="find_form.data.rinfo"
          placeholder="请输入资源信息"
        ></el-input>
      </el-form-item>
      <el-form-item label="资源描述" label-width="100px">
        <el-input
          v-model="find_form.data.rdescribe"
          placeholder="请输入资源描述"
        ></el-input>
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
            >添加</el-button
          >
          <el-button type="danger" @click="delete_list">批量删除</el-button>
        </el-form-item>
      </div>
    </el-form>
    <!-- 商户列表 -->
    <el-table
      :data="store_list"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        fixed
        prop="spaceId"
        label="空间ID"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="spaceinfo"
        label="空间位置信息"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="centralpoint"
        label="空间维度信息"
        width="120"
      ></el-table-column>
      <el-table-column prop="spacetype" label="空间类型" width="120">
        <template slot-scope="scope">{{
          scope.row.spacetype == "1" ? "系统指定" : "用户上传"
        }}</template></el-table-column
      >
      <el-table-column prop="spacestate" label="空间状态" width="120">
        <template slot-scope="scope">{{
          scope.row.spacestate == "1" ? "不可用(禁止抢占)" : "正常使用"
        }}</template></el-table-column
      >
      <el-table-column
        prop="allowErrRan"
        label="允许误差范围"
        width="120"
      ></el-table-column>
      <el-table-column prop="rId" label="资源id" width="120"></el-table-column>
      <el-table-column
        prop="rinfo"
        label="资源信息"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="rdescribe"
        label="资源描述"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="creationtime"
        label="创建时间"
        width="120"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="show_edit(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-button
            @click="user_delete(scope.row)"
            type="text"
            size="small"
            class="btns_delete"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加弹出框(添加) -->
    <el-dialog
      title="添加类别"
      :visible.sync="dialogFormVisibleOfAdd"
      width="40%"
    >
      <!-- 新增表单 -->
      <el-form ref="add_form" :model="add_form" label-width="120px">
        <el-form-item label="空间位置信息">
          <el-input
            v-model="add_form.spaceinfo"
            placeholder="请输入空间位置信息"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="空间维度信息">
          <el-input
            v-model="add_form.centralpoint"
            placeholder="请输入空间维度信息"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="空间类型">
          <el-select v-model="add_form.spacetype" placeholder="请选择空间类型">
            <el-option label="用户上传" value="0"></el-option>
            <el-option label="系统指定" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="空间状态">
          <el-select v-model="add_form.spacestate" placeholder="请选择空间状态">
            <el-option label="不可用(禁止抢占)" value="0"></el-option>
            <el-option label="正常使用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="允许误差范围">
          <el-input
            v-model="add_form.allowErrRan"
            placeholder="请输入允许误差范围"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="资源id">
          <el-input
            v-model="add_form.rId"
            placeholder="请输入资源id"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="资源信息">
          <el-input
            v-model="add_form.rinfo"
            placeholder="请输入资源信息"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="资源描述">
          <el-input
            v-model="add_form.rdescribe"
            placeholder="请输入资源描述"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd">取 消</el-button>
        <el-button type="primary" @click="user_add">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加弹出框(修改) -->
    <el-dialog
      title="修改类别"
      :visible.sync="dialogFormVisibleOfEdit"
      width="40%"
    >
      <!-- 修改表单 -->
      <el-form ref="edit_form" :model="edit_form" label-width="120px">
        <el-form-item label="空间位置信息">
          <el-input
            v-model="edit_form.spaceinfo"
            placeholder="请输入空间位置信息"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="空间维度信息">
          <el-input
            v-model="edit_form.centralpoint"
            placeholder="请输入空间维度信息"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="空间类型">
          <el-select v-model="edit_form.spacetype" placeholder="请选择空间类型">
            <el-option label="用户上传" value="0"></el-option>
            <el-option label="系统指定" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="空间状态">
          <el-select
            v-model="edit_form.spacestate"
            placeholder="请选择空间状态"
          >
            <el-option label="不可用(禁止抢占)" value="0"></el-option>
            <el-option label="正常使用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="允许误差范围">
          <el-input
            v-model="edit_form.allowErrRan"
            placeholder="请输入允许误差范围"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="资源id">
          <el-input
            v-model="edit_form.rId"
            placeholder="请输入资源id"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="资源信息">
          <el-input
            v-model="edit_form.rinfo"
            placeholder="请输入资源信息"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="资源描述">
          <el-input
            v-model="edit_form.rdescribe"
            placeholder="请输入资源描述"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit">取 消</el-button>
        <el-button type="primary" @click="user_update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 查找条件
      find_form: {
        currPage: 1,
        pageSize: 10,
        data: {},
      },
      select_list: [], //已选表单

      // 商户列表
      store_list: [],
    };
  },
  mounted() {
    var get_form = creatGet();
    getDataList("u1", "Spacedata", get_form, "store_list", this);
  },
  methods: {
    queryData() {
      var get_form = { ...this.find_form };
      get_form.data = createObj(get_form.data);
      get_form.data = spliceKey(get_form.data);
      getDataList("u1", "Spacedata", get_form, "store_list", this);
    },
    // 添加当前
    user_add() {
      var add_form = createObj(this.add_form);
      putcreate("u1", "Spacedata", add_form).then((res) => {
        if (res != null) {
          this.$message.success("添加成功");
          this.resetForm();
          this.queryData();
          this.dialogFormVisibleOfAdd = false;
        } else {
          this.$message.success("添加失败");
        }
      });
    },
    // 修改当前
    user_update() {
      patchedit("u1", "Spacedata", this.edit_form).then((res) => {
        if (res != null) {
          this.$message.success("修改成功");
          this.resetForm();
          this.queryData();
          this.dialogFormVisibleOfEdit = false;
        } else {
          this.$message.success("修改失败");
        }
      });
    },
    // 删除当前
    user_delete(val) {
      this.$confirm("确定要删除吗(｀・ω・´)", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          var del = {
            tableId: val["tableId"],
            spaceId: val["spaceId"],
          };
          deleteuser("u1", "Spacedata", del).then((res) => {
            if (res != null) {
              this.$message.success("删除成功");
              this.resetForm();
              this.queryData();
            } else {
              this.$message.success("删除失败");
            }
          });
        })
        .catch((err) => {});
    },
    // 批量删除
    delete_list() {
      this.$confirm("确定要删除吗(｀・ω・´)", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          var dellist = this.deletcondition(this.select_list);
          deletelist("u1", "Spacedata", dellist).then((res) => {
            if (res != null) {
              this.$message.success("删除成功");
              this.resetForm();
              this.queryData();
            } else {
              this.$message.success("删除失败");
            }
          });
        })
        .catch((err) => {});
    },
    // 显示修改弹窗
    show_edit(val) {
      this.dialogFormVisibleOfEdit = true;
      this.edit_form = { ...val };
    },
    // 取消新增
    cancelAdd() {
      this.$confirm("确定要取消吗(｀・ω・´)", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            message: "取消新增!",
          });
          this.dialogFormVisibleOfAdd = false;
        })
        .catch((err) => {});
    },
    // 取消修改
    cancelEdit() {
      this.$confirm("确定要取消吗(｀・ω・´)", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            message: "取消修改!",
          });
          this.dialogFormVisibleOfEdit = false;
        })
        .catch((err) => {});
    },
    // 重置
    resetForm() {
      this.find_form.data = {};
    },
    //已选表单增减
    handleSelectionChange(val) {
      this.select_list = val;
    },
    deletcondition(list) {
      var newObj = [];
      list.forEach((item) => {
        var json = {
          tableId: item["tableId"],
          spaceId: item["spaceId"],
        };
        newObj.push(json);
      });

      return newObj;
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
