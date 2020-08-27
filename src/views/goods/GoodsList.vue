<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input
            placeholder="请输入内容"
            class="input-with-select"
            size="mini"
            v-model="params.query"
            @change="getGoodsList"
            clearable
            @clear="getGoodsList"
          >
            <el-button slot="append" icon="el-icon-search" size="mini"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="mini" @click="toAdd">添加商品</el-button>
        </el-col>
      </el-row>
      <el-table :data="goodsList" size="mini">
        <el-table-column prop="goods_name" label="商品名称" min-width="500"></el-table-column>
        <el-table-column prop="goods_price" label="商品价格（元）" min-width="100"></el-table-column>
        <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
        <el-table-column prop="add_time" label="创建时间" min-width="100">
          <template #default="{row}">
            <p>{{new Date(row.add_time) | formatDate}}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{row}">
            <el-button type="primary" circle icon="el-icon-edit" size="mini"></el-button>
            <el-button
              type="danger"
              circle
              icon="el-icon-delete"
              size="mini"
              @click="deleteGoods(row.goods_id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.pagenum"
        :page-sizes="[10, 20]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { deleteDiglog } from "@/common/mixin";
import { formatDate } from "@/common/util";
import { goodsList_, deleteGoods_ } from "@/network/goods";
export default {
  name: "GoodsList",
  data() {
    return {
      goodsList: [],
      params: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      total: 0,
    };
  },
  mixins: [deleteDiglog],
  created() {
    this.getGoodsList();
  },
  filters: {
    formatDate(date) {
      return formatDate(date);
    },
  },
  methods: {
    async getGoodsList() {
      let res = await goodsList_(this.params);
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.goodsList = res.data.goods;
      this.total = res.data.total;
    },
    handleSizeChange(v) {
      this.params.pagesize = v;
      this.getGoodsList();
    },
    handleCurrentChange(v) {
      this.params.pagenum = v;
      this.getGoodsList();
    },

    deleteGoods(id) {
      this.showDeleteDiglog(id, deleteGoods_, this.getGoodsList);
    },
    toAdd() {
      this.$router.push("/add");
      this.$store.commit("currentPath", {
        path1: "商品管理",
        path2: "添加商品",
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.el-table {
  margin: 15px 0;
}
</style>