<template>
  <el-card>
    <el-button
      type="primary"
      size="small"
      @click="$refs.diglogAddRole.dialogFormVisible = true"
    >添加角色</el-button>
    <dialog-edit ref="diglogAddRole" v-model="formAdd" @sure="addRole"></dialog-edit>
    <el-table :data="roles" style="width: 100%" border size="small">
      <el-table-column type="index"></el-table-column>
      <el-table-column type="expand" label="详细">
        <template #default="{row}">
          <roles-table :data="row"></roles-table>
        </template>
      </el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作" width="300">
        <template #default="{row}">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(row)">编辑</el-button>

          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="showDeleteDiglog(row.id)"
          >删除</el-button>
          <el-button
            type="warning"
            icon="el-icon-setting"
            size="mini"
            @click="showSetDiaglog(row.id)"
          >分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <dialog-edit ref="diglogEditRole" v-model="formEdit" @sure="editRole"></dialog-edit>
    <el-dialog title="分配权限" :visible.sync="show">
      <el-tree
        :data="rights"
        show-checkbox
        :props="defaultProps"
        default-expand-all
        node-key="id"
        :default-checked-keys="hadRights"
        ref="tree"
      ></el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="setRole">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import DialogEdit from "@/components/content/dialog/DialogEdit";
import RolesTable from "@/views/rights/rightsComps/RolesTable";
import {
  getRolesList,
  addRole_,
  editRole_,
  deleteRole_,
  getRightsList,
  setRole_,
} from "@/network/rights";
export default {
  name: "Roles",
  data() {
    return {
      show: false,
      rights: [],
      roles: [],
      hadRights: [],
      setId: 0,
      defaultProps: {
        children: "children",
        label: "authName",
      },
      formAdd: {
        title: "添加角色",
        list: ["角色名称", "角色描述"],
        rules: {
          roleName: [
            { required: true, message: "请输入角色名称", trigger: "blur" },
          ],
          roleDesc: [
            {
              required: true,
              message: "请输入角色描述",
              trigger: "blur",
            },
          ],
        },
        data: {
          roleName: "",
          roleDesc: "",
        },
      },
      formEdit: {
        title: "修改角色",
        list: ["角色名称", "角色描述"],
        rules: {
          roleName: [
            { required: true, message: "请输入角色名称", trigger: "blur" },
          ],
          roleDesc: [
            {
              required: true,
              message: "请输入角色描述",
              trigger: "blur",
            },
          ],
        },
        data: {
          roleName: "",
          roleDesc: "",
        },
        id: 0,
      },
    };
  },
  components: {
    RolesTable,
    DialogEdit,
  },
  created() {
    this.rolesList();
  },
  methods: {
    async rolesList() {
      let res = await getRolesList();
      console.log(res);
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.roles = res.data;
    },
    addRole(formData) {
      formData.validate(async (v, p) => {
        if (!v) return this.$message.error(Object.values(p)[0][0].message);
        let res = await addRole_(this.formAdd.data);
        if (res.meta.status !== 201) return this.$message.error(res.meta.msg);
        this.$message.success(res.meta.msg);
        console.log(res);
        this.rolesList();
        this.$refs.diglogAddRole.dialogFormVisible = false;
      });
    },
    showEditDialog(row) {
      this.formEdit.data.roleName = row.roleName;
      this.formEdit.data.roleDesc = row.roleDesc;
      this.formEdit.id = row.id;
      this.$refs.diglogEditRole.dialogFormVisible = true;
    },
    editRole(formData) {
      formData.validate(async (v, p) => {
        if (!v) return this.$message.error(Object.values(p)[0][0].message);
        let res = await editRole_(
          this.formEdit.id,
          this.formEdit.data.roleName,
          this.formEdit.data.roleDesc
        );
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
        this.$message.success("编辑成功");
        this.rolesList();
        this.$refs.diglogEditRole.dialogFormVisible = false;
      });
    },
    showDeleteDiglog(id) {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await deleteRole_(id);
          if (res.meta.status !== 200) return this.$message.error("删除失败");
          this.rolesList();
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
    async showSetDiaglog(id) {
      this.setId = id;
      this.rolesList();
      let role = this.roles.find((v) => v.id == id);
      let arr = role.children;
      let res = await getRightsList("tree");
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.hadRights = this.allChilds(arr);
      this.rights = res.data;
      this.show = true;
    },

    async setRole() {
      let rights =
        this.$refs.tree.getCheckedKeys().join(",") +
        "," +
        this.$refs.tree.getHalfCheckedKeys().join(",");
      let res = await setRole_(this.setId, rights);
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.$message.success(res.meta.msg);
      this.rolesList();
      this.show = false;
    },
    allChilds(arr) {
      return arr.reduce((id, v) => {
        if (v.children) {
          id.push(...this.allChilds(v.children));
          return id;
        }
        id.push(v.id);
        return id;
      }, []);
    },
  },
};
</script>

<style lang='scss' scoped>
.el-table {
  margin-top: 15px;
}
</style>