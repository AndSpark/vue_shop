<template>
  <div class="user-list">
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
</style>
