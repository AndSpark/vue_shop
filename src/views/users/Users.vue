<template>
  <div class="user-list">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <users-table></users-table>
  </div>
</template>

<script>
import UsersTable from "@/views/users/childComps/UsersTable";
export default {
  name: "Users",
  data() {
    return {};
  },
  components: {
    UsersTable,
  },
};
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  font-size: 12px;
}
</style>
