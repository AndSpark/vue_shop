<template>
  <el-card>
    <el-button type="primary" size="mini" @click="selectCate">添加分类</el-button>
    <el-dialog title="添加分类" :visible.sync="addCateDialog">
      <el-form ref="cateForm" label-width="100px" :rules="addCateFormRules" :model="cateForm">
        <el-form-item label="分类名称:" prop="cat_name">
          <el-input v-model="cateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级名称:">
          <el-cascader
            ref="cascader"
            v-model="cateForm.cat_id"
            :options="addGoods"
            :props="cascaderProps"
            size="mini"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="closeCateDialog">取 消</el-button>
        <el-button type="primary" @click="addCategory">确 定</el-button>
      </div>
    </el-dialog>
    <el-table :data="goods" border size="mini" row-key="cat_id">
      <el-table-column prop="cat_name" label="分类名称"></el-table-column>
      <el-table-column label="是否有效">
        <template #default="{row}">
          <i class="el-icon-success" v-show="!row.cat_deleted"></i>
          <i class="el-icon-error" v-show="row.cat_deleted"></i>
        </template>
      </el-table-column>
      <el-table-column prop="cat_level" label="排序">
        <template #default="{row}">
          <el-tag v-show="row.cat_level == 0" size="mini">一级</el-tag>
          <el-tag type="success" v-show="row.cat_level == 1" size="mini">二级</el-tag>
          <el-tag type="warning" v-show="row.cat_level == 2" size="mini">三级</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{row}">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(row)">编辑</el-button>

          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="showDeleteDiglog(row.cat_id, delCate_,goodsCate)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="params.pagenum"
      :page-sizes="[5, 10]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalPage"
    ></el-pagination>
    <dialog-edit ref="dialogEditUser" v-model="formEdit" @sure="editCate"></dialog-edit>
  </el-card>
</template>

<script>
import DialogEdit from "@/components/content/dialog/DialogEdit";
import { goodsCate_, addCate_, delCate_, editCate_ } from "@/network/goods";
import { deleteDiglog } from "@/common/mixin";
export default {
  name: "GoodsCate",
  data() {
    return {
      goods: [],
      params: {
        pagenum: 1,
        pagesize: 5,
      },
      totalPage: 0,
      i: 0,
      addCateDialog: false,
      addcate: "",
      cateForm: {
        cat_name: "",
        cat_id: [],
      },
      formEdit: {
        title: "修改分类",
        list: ["分类名称"],
        rules: {
          cat_name: [
            { required: true, message: "请输分类名称", trigger: "blur" },
          ],
        },
        data: {
          cat_name: "",
        },
        cat_id: 0,
      },
      addCateFormRules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
      },
      cascaderProps: {
        expandTrigger: "hover",
        value: "cat_id",
        label: "cat_name",
        children: "children",
        checkStrictly: true,
      },
      addGoods: [],
    };
  },
  components: {
    DialogEdit,
  },
  mixins: [deleteDiglog],
  created() {
    this.goodsCate();
  },
  computed: {
    addCateForm() {
      let pid = this.cateForm.cat_id.reverse()[0] || 0;
      let level = 0;
      switch (this.cateForm.cat_id.length) {
        case 0:
          level = 0;
          break;
        case 1:
          level = 1;
          break;
        case 2:
          level = 2;
          break;
        default:
          break;
      }
      return {
        cat_name: this.cateForm.cat_name,
        cat_pid: pid,
        cat_level: level,
      };
    },
  },
  methods: {
    async goodsCate() {
      let res = await goodsCate_(this.params);
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      console.log(res);
      this.goods = res.data.result;
      this.totalPage = res.data.total;
    },
    handleSizeChange(v) {
      this.params.pagesize = v;
      this.goodsCate();
    },
    handleCurrentChange(v) {
      this.params.pagenum = v;
      this.goodsCate();
    },
    closeCateDialog() {
      this.$refs.cateForm.resetFields();
      this.cateForm.cat_id = "";
      this.addCateDialog = false;
    },
    async selectCate() {
      let res = await goodsCate_({ type: 2 });
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      console.log(res);
      this.addGoods = res.data;
      this.addCateDialog = true;
    },
    async addCategory() {
      this.$refs.cateForm.validate(async (v, p) => {
        if (!v) return this.$message.error(Object.values(p)[0][0].message);
        let res = await addCate_(this.addCateForm);
        if (res.meta.status !== 201) return this.$message.error(res.meta.msg);
        this.$message.success(res.meta.msg);
        this.goodsCate();
        this.$refs.cateForm.resetFields();
        this.cateForm.cat_id = [];
        this.addCateDialog = false;
      });
    },
    showEditDialog(row) {
      this.formEdit.data.cat_name = row.cat_name;
      this.formEdit.cat_id = row.cat_id;
      this.$refs.dialogEditUser.dialogFormVisible = true;
    },
    editCate(formData) {
      formData.validate(async (v, p) => {
        if (!v) return this.$message.error(Object.values(p)[0][0].message);
        let res = await editCate_(
          this.formEdit.cat_id,
          this.formEdit.data.cat_name
        );
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
        this.$message.success(res.meta.msg);
        this.goodsCate();
        this.$refs.dialogEditUser.dialogFormVisible = false;
      });
    },
    delCate_(id) {
      return delCate_(id);
    },
  },
};
</script>

<style lang='scss' scoped>
.el-table {
  margin: 15px 0;
}
.el-icon-success {
  color: green;
}
.el-icon-error {
  color: red;
}
</style>