<!-- 商户管理-商户列表 -->
<template>
  <div id="store" class="shadow_container">
    <div class="pageTitle">拍卖行数据</div>
    <!-- 查询条件 -->
    <el-form ref="find_form" :model="find_form" label-width="80px">
      <el-form-item label="拍卖数据ID" label-width="100px">
        <el-input v-model="find_form.data.dataId" placeholder="请输入拍卖数据ID"></el-input>
      </el-form-item>
      <el-form-item label="道具资产id或个人优惠卷表id" label-width="100px">
        <el-input v-model="find_form.data.assetsId" placeholder="请输入道具资产id或个人优惠卷表id"></el-input>
      </el-form-item>
      <el-form-item label="资源ID" label-width="100px">
        <el-input v-model="find_form.data.resId" placeholder="请输入资源ID"></el-input>
      </el-form-item>
      <el-form-item label="道具类型" label-width="100px">
        <el-select v-model="find_form.data.rpmtype" placeholder="请选择道具类型">
          <el-option label="优惠券" value="1"></el-option>
          <el-option label="道具" value="2"></el-option>
          <el-option label="虚拟房产" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="资源缩略图" label-width="100px">
        <el-input v-model="find_form.data.rpmico" placeholder="请输入资源缩略图"></el-input>
      </el-form-item>
      <el-form-item label="拍卖品名称" label-width="100px">
        <el-input v-model="find_form.data.aname" placeholder="请输入拍卖品名称"></el-input>
      </el-form-item>
      <el-form-item label="拍卖品数量" label-width="100px">
        <el-input v-model="find_form.data.anum" placeholder="请输入拍卖品数量"></el-input>
      </el-form-item>
      <el-form-item label="拍卖品单价" label-width="100px">
        <el-input v-model="find_form.data.aunitp" placeholder="请输入拍卖品单价"></el-input>
      </el-form-item>
      <el-form-item label="信息简述" label-width="100px">
        <el-input v-model="find_form.data.infoDes" placeholder="请输入信息简述"></el-input>
      </el-form-item>
      <el-form-item label="拥有人id" label-width="100px">
        <el-input v-model="find_form.data.owner" placeholder="请输入拥有人id"></el-input>
      </el-form-item>
      <el-form-item label="交易价格" label-width="100px">
        <el-input v-model="find_form.data.tradePrice" placeholder="请输入交易价格"></el-input>
      </el-form-item>
      <el-form-item label="当前状态" label-width="100px">
        <el-input v-model="find_form.data.currentState" placeholder="请输入当前状态"></el-input>
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
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
      <!-- 日期查询 -->
      <div class="date_btn">
        <el-form-item class="btns_find">
          <el-button type="primary" @click="queryData">查询</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        <el-button type="success" style="margin-left:50px" @click="dialogFormVisibleOfAdd = true">添加</el-button>
        <el-button type="danger" @click="delete_list">批量删除</el-button>
        </el-form-item>
      </div>
    </el-form>
    <!-- 商户列表 -->
    <el-table :data="store_list" border style="width: 100%"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column fixed prop="dataId" label="拍卖数据ID" width="80"></el-table-column>
      <el-table-column prop="assetsId" label="道具资产id或个人优惠卷表id" width="120"></el-table-column>
      <el-table-column fixed prop="resId" label="资源ID" width="80"></el-table-column>
      <el-table-column prop="rpmtype" label="道具类型" width="120"></el-table-column>
      <el-table-column prop="rpmico" label="资源缩略图" width="120"></el-table-column>
      <el-table-column fixed prop="aname" label="拍卖品名称" width="80"></el-table-column>
      <el-table-column prop="anum" label="拍卖品数量" width="120"></el-table-column>
      <el-table-column prop="aunitp" label="拍卖品单价" width="120"></el-table-column>
      <el-table-column prop="infoDes" label="信息简述" width="120"></el-table-column>
      <el-table-column prop="expireTime" label="到期时间" width="120"></el-table-column>
      <el-table-column prop="owner" label="拥有人id" width="120"></el-table-column>
      <el-table-column prop="tradePrice" label="交易价格" width="120"></el-table-column>
      <el-table-column prop="listingTime" label="上架时间" width="120"></el-table-column>
      <el-table-column prop="dismountTime" label="下架时间" width="120"></el-table-column>
      <el-table-column prop="currentState" label="当前状态" width="120"></el-table-column>
      <el-table-column prop="creationtime" label="创建时间" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="show_edit(scope.row)"  type="text" size="small">编辑</el-button>
          <el-button @click="user_delete(scope.row)" type="text" size="small" class="btns_delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    
    <!-- 添加弹出框(添加) -->
    <el-dialog title="修改类别" :visible.sync="dialogFormVisibleOfAdd" width="40%">
      <!-- 新增表单 -->
      <el-form ref="add_form" :model="add_form" label-width="120px">
        <el-form-item label="道具资产id或个人优惠卷表id">
          <el-input v-model="add_form.assetsId" placeholder="请输入道具资产id或个人优惠卷表id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源ID">
          <el-input v-model="add_form.resId" placeholder="请输入资源ID" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="道具类型">
        <el-select v-model="add_form.rpmtype" placeholder="请选择道具类型">
          <el-option label="优惠券" :value="1"></el-option>
          <el-option label="道具" :value="2"></el-option>
          <el-option label="虚拟房产" :value="3"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="资源缩略图">
          <el-input v-model="add_form.rpmico" placeholder="请输入资源缩略图" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="拍卖品名称">
          <el-input v-model="add_form.aname" placeholder="请输入描述" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="金币值">
          <el-input v-model="add_form.anum" placeholder="请输入金币值" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="拍卖品单价">
          <el-input v-model="add_form.aunitp" placeholder="请输入拍卖品单价" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="信息简述">
          <el-input v-model="add_form.infoDes" placeholder="请输入信息简述" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="拥有人id">
          <el-input v-model="add_form.owner" placeholder="请输入拥有人id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="当前状态">
        <el-select v-model="add_form.currentState" placeholder="请选择当前状态">
          <el-option label="正在拍卖" :value="1"></el-option>
          <el-option label="已下架" :value="2"></el-option>
          <el-option label="已卖出" :value="3"></el-option>
        </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd">取 消</el-button>
        <el-button type="primary" @click="user_add">确 定</el-button>
      </div>
    </el-dialog>

    
    <!-- 添加弹出框(修改) -->
    <el-dialog title="添加类别" :visible.sync="dialogFormVisibleOfEdit" width="40%">
      <!-- 修改表单 -->
      <el-form ref="edit_form" :model="edit_form" label-width="120px">
        <el-form-item label="道具资产id或个人优惠卷表id">
          <el-input v-model="edit_form.assetsId" placeholder="请输入道具资产id或个人优惠卷表id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源ID">
          <el-input v-model="edit_form.resId" placeholder="请输入资源ID" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="道具类型">
        <el-select v-model="edit_form.rpmtype" placeholder="请选择道具类型">
          <el-option label="优惠券" :value="1"></el-option>
          <el-option label="道具" :value="2"></el-option>
          <el-option label="虚拟房产" :value="3"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="资源缩略图">
          <el-input v-model="edit_form.rpmico" placeholder="请输入资源缩略图" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="拍卖品名称">
          <el-input v-model="edit_form.aname" placeholder="请输入描述" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="金币值">
          <el-input v-model="edit_form.anum" placeholder="请输入金币值" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="拍卖品单价">
          <el-input v-model="edit_form.aunitp" placeholder="请输入拍卖品单价" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="信息简述">
          <el-input v-model="edit_form.infoDes" placeholder="请输入信息简述" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="拥有人id">
          <el-input v-model="edit_form.owner" placeholder="请输入拥有人id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="当前状态">
        <el-select v-model="edit_form.currentState" placeholder="请选择当前状态">
          <el-option label="正在拍卖" :value="1"></el-option>
          <el-option label="已下架" :value="2"></el-option>
          <el-option label="已卖出" :value="3"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="拍卖品单价">
          <el-input v-model="edit_form.aunitp" placeholder="请输入拍卖品单价" autocomplete="off"></el-input>
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
import { creatGet, createObj, spliceKey, deletconditionofbusiness} from "@/api/Common";
import { getDataList,putcreate,deletelist,deleteuser,patchedit  } from "@/api/api";
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
      select_list:[],//已选表单
      add_form: {},//添加表单内容
      edit_form:{},//修改表单内容
      dialogFormVisibleOfAdd: false,//添加表单弹窗
      dialogFormVisibleOfEdit:false,//修改表单弹窗
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
    getDataList("u1", "Auctiondata", get_form, "store_list", this);
  },
  methods: {
    queryData() {
      var get_form = {...this.find_form};
      get_form.data = createObj(get_form.data);
      get_form.data = spliceKey(get_form.data)
      getDataList("u1", "Auctiondata", get_form, "store_list", this);
    },
    // 添加当前
    user_add() {
      var add_form = createObj(this.add_form);
      putcreate("u1", "Auctiondata",add_form).then((res) => {
        console.log(res);
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
      patchedit("u1", "Auctiondata",this.edit_form).then((res) => {
        console.log(res);
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
        console.log(val);
        var del = {
              "tableId":val["tableId"],
              "dataId":val["dataId"]
          }
        deleteuser("u1", "Auctiondata",del).then((res) => {
          console.log(res);
          if (res != null) {
            this.$message.success("删除成功");
            this.resetForm();
            this.queryData();
          } else {
            this.$message.success("删除失败");
          }
        });
      })
        .catch((err) => {
          console.log(err);
        });
    },
    // 批量删除
    delete_list(){
      this.$confirm("确定要删除吗(｀・ω・´)", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
        console.log(this.select_list);
        var dellist = this.deletcondition(this.select_list)
        deletelist("u1", "Auctiondata",dellist).then((res) => {
          console.log(res);
          if (res != null) {
            this.$message.success("删除成功");
            this.resetForm();
            this.queryData();
          } else {
            this.$message.success("删除失败");
          }
        });
      })
        .catch((err) => {
          console.log(err);
        });
    },
    // 显示修改弹窗
    show_edit(val){
      this.dialogFormVisibleOfEdit = true;
      this.edit_form = {...val};
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
        .catch((err) => {
          console.log(err);
        });
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
        .catch((err) => {
          console.log(err);
        });
    },
    // 重置
    resetForm() {
      this.find_form.data = {
      };
    },
    //已选表单增减
    handleSelectionChange(val){
      this.select_list = val;
      console.log(val);
    },
    deletcondition(list){      
      var newObj = [];    
      list.forEach(item => {
          var json = {
              "tableId":item["tableId"],
              "dataId":item["dataId"]
          }
          newObj.push(json);
      });

      return newObj;
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