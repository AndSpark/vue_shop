<template>
  <div>
    <el-card>
      <el-table :data="data" style="width: 100%" stripe border size="small">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="authName" label="权限名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template #default="{row}">
            <el-tag :type="color(row.level)">{{level(row.level)}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getRightsList } from "@/network/rights";
export default {
  name: "Rights",
  data() {
    return {
      data: [],
    };
  },
  created() {
    this.rightsList();
  },
  methods: {
    async rightsList() {
      let res = await getRightsList("list");
      if (res.meta.status !== 200) return this.$message.error(res.meta.status);
      this.data = res.data;
    },
    level(n) {
      switch (n) {
        case "0":
          return "一级";
        case "1":
          return "二级";
        case "2":
          return "三级";
      }
    },
    color(n) {
      switch (n) {
        case "0":
          return "";
        case "1":
          return "success";
        case "2":
          return "warning";
      }
    },
  },
};
</script>

<style lang='scss' scoped>
</style>