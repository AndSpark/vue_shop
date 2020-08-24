<template>
  <el-card>
    <!-- 搜索 -->
    <el-row :gutter="20">
      <el-col :span="7">
        <el-input
          placeholder="请输入内容"
          size="small"
          v-model="params.query"
          @change="getUsers"
          clearable
          @clear="getUsers"
        >
          <el-button slot="append" icon="el-icon-search" size="small" @click="getUsers"></el-button>
        </el-input>
      </el-col>
      <el-col :span="3">
        <el-button
          type="primary"
          size="small"
          @click="$refs.dialogAddUser.dialogFormVisible = true"
        >添加用户</el-button>
        <dialog-edit ref="dialogAddUser" v-model="formAdd" @sure="addUser"></dialog-edit>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="users" style="width: 100%" border stripe size="small">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="role_name" label="角色"></el-table-column>
      <el-table-column label="状态">
        <template #default="{row}">
          <el-switch v-model="row.mg_state" @change="mg_state(row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="140">
        <template #default="{row}">
          <el-button
            type="primary"
            circle
            icon="el-icon-edit"
            size="mini"
            @click="showEditDialog(row)"
          ></el-button>

          <el-button
            type="danger"
            circle
            icon="el-icon-delete"
            size="mini"
            @click="showDeleteDiglog(row.id)"
          ></el-button>
          <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
            <el-button type="warning" circle icon="el-icon-setting" size="mini"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 页码 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="params.pagenum"
      :page-sizes="[5, 10]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 编辑用户会话 -->
    <dialog-edit ref="dialogEditUser" v-model="formEdit" @sure="editUser"></dialog-edit>
  </el-card>
</template>

<script>
import DialogEdit from "@/components/content/dialog/DialogEdit";
import {
  getUserList,
  userState,
  createUser,
  editUser,
  deleteUser,
} from "@/network/users";
export default {
  name: "UsersTable",
  components: {
    DialogEdit,
  },
  data() {
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      if (regEmail.test(value)) {
        return callback();
      }
      callback(new Error("请输入合法邮箱"));
    };

    var checkPhone = (rule, value, callback) => {
      var regPhone = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (regPhone.test(value)) {
        return callback();
      }
      callback(new Error("请输入正确的手机号"));
    };

    return {
      params: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      users: [],
      total: 0,
      formAdd: {
        title: "添加用户",
        list: ["用户名称", "用户密码", "邮箱", "手机号"],
        rules: {
          username: [
            { required: true, message: "请输入用户名", trigger: "blur" },
            {
              min: 3,
              max: 10,
              message: "长度在 3 到 10 个字符",
              trigger: "blur",
            },
          ],
          password: [
            {
              required: true,
              message: "请输入密码",
              trigger: "blur",
            },
            {
              min: 6,
              max: 15,
              message: "长度在 6 到 15 个字符",
              trigger: "blur",
            },
          ],
          email: [
            { required: true, message: "请输入邮箱", trigger: "blur" },
            {
              validator: checkEmail,
              trigger: "blur",
            },
          ],
          mobile: [
            { required: true, message: "请输入手机号", trigger: "blur" },
            {
              validator: checkPhone,
              trigger: "blur",
            },
          ],
        },
        data: {
          username: "",
          password: "",
          email: "",
          mobile: "",
        },
      },
      formEdit: {
        title: "修改用户信息",
        list: ["用户名", "邮箱", "手机"],
        rules: {
          email: [
            { required: true, message: "请输入邮箱", trigger: "blur" },
            {
              validator: checkEmail,
              trigger: "blur",
            },
          ],
          mobile: [
            { required: true, message: "请输入手机号", trigger: "blur" },
            {
              validator: checkPhone,
              trigger: "blur",
            },
          ],
        },
        data: {
          username: "",
          email: "",
          mobile: "",
        },
        disabled: 0,
        id: 0,
      },
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      let res = await getUserList(this.params);
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.users = res.data.users;
      this.total = res.data.total;
    },
    handleSizeChange(v) {
      this.params.pagesize = v;
      this.getUsers();
    },
    handleCurrentChange(v) {
      this.params.pagenum = v;
      this.getUsers();
    },
    async mg_state(params) {
      let { uid = params.id, state = params.mg_state } = params;
      let res = await userState(uid, state);
      if (res.meta.status !== 200) {
        state = !state;
        return this.$message.error(res.meta.status);
      }
      this.$message.success(res.meta.msg);
    },
    addUser(formData) {
      formData.validate(async (v, p) => {
        if (!v) return this.$message.error(Object.values(p)[0][0].message);
        let res = await createUser(this.form.data);
        if (res.meta.status !== 201) return this.$message.error(res.meta.msg);
        this.$message.success(res.meta.msg);
        this.getUsers();
        this.$refs.dialogAddUser.dialogFormVisible = false;
      });
    },
    showEditDialog(row) {
      this.formEdit.data.username = row.username;
      this.formEdit.data.email = row.email;
      this.formEdit.data.mobile = row.mobile;
      this.formEdit.id = row.id;
      this.$refs.dialogEditUser.dialogFormVisible = true;
    },
    editUser(formData) {
      formData.validate(async (v, p) => {
        if (!v) return this.$message.error(Object.values(p)[0][0].message);
        let res = await editUser(
          this.formEdit.id,
          this.formEdit.data.email,
          this.formEdit.data.mobile
        );
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
        this.$message.success(res.meta.msg);
        this.getUsers();
        this.$refs.dialogEditUser.dialogFormVisible = false;
      });
    },
    showDeleteDiglog(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await deleteUser(id);
          if (res.meta.status !== 200) return this.$message.error("删除失败");
          this.getUsers();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang='scss' scoped>
.el-card {
  margin-top: 15px;
  .el-table {
    margin-top: 15px;
  }
  .el-pagination {
    margin-top: 15px;
  }
}
</style>