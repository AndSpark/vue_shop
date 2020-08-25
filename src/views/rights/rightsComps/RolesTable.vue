<template>
  <div>
    <el-row
      :gutter="10"
      v-for="(item1, i1) in data.children"
      :key="item1.id"
      :class="['bdb',i1 == 0 ? ['bdt'] : 0] "
    >
      <el-col :span="4">
        <el-tag
          closable
          size="small"
          @close="deleteRight(data.id,item1.id,item1)"
          v-show="item1.id"
        >{{item1.authName}}</el-tag>
        <i class="el-icon-caret-right"></i>
      </el-col>
      <el-col :span="20">
        <el-row
          v-for="(item2, i2) in item1.children"
          :key="item2.id"
          :class="{bdt: i2 !== 0, row2:true}"
        >
          <el-col :span="6">
            <el-tag
              type="success"
              closable
              size="small"
              @close="deleteRight(data.id,item2.id,item2)"
              v-show="item2.id"
            >{{item2.authName}}</el-tag>
            <i class="el-icon-caret-right"></i>
          </el-col>
          <el-col :span="18">
            <el-tag
              size="small"
              closable
              type="warning"
              v-for="(item3) in item2.children"
              :key="item3.id"
              @close="deleteRight(data.id,item3.id,item3)"
              v-show="item3.id"
            >{{item3.authName}}</el-tag>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { deleteRoleRight_ } from "@/network/rights";
export default {
  name: "RolesTable",
  data() {
    return {};
  },
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    deleteRight(id, rightId, item) {
      this.$confirm("此操作将永久取消该权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await deleteRoleRight_(id, rightId);
          if (res.meta.status !== 200) return this.$message.error("操作失败");
          item.id = 0;
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
.el-row {
  display: flex;
  align-items: center;
}
.row2 {
  padding: 4px 0;
}
.el-tag {
  font-size: 10px;
  margin: 5px;
}
.bdt {
  border-top: 1px solid #eee;
}
.bdb {
  border-bottom: 1px solid #eee;
}
</style>