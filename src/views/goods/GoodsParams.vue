<template>
  <div>
    <el-card>
      <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon></el-alert>
      <p>
        <span style="font-size:13px">选择商品分类：</span>
        <el-cascader
          v-model="selectGood.cat_id"
          :options="goods"
          :props="cascaderProps"
          size="mini"
          @change="goodsCateAttr"
        ></el-cascader>
      </p>
      <el-tabs v-model="activeName">
        <el-tab-pane label="动态参数" name="many">
          <goods-attr
            type="many"
            v-model="selectGood.manyAttr"
            :cat_id="catId"
            @refresh="goodsCateAttr"
          ></goods-attr>
        </el-tab-pane>
        <el-tab-pane label="静态参数" name="only">
          <goods-attr
            type="only"
            v-model="selectGood.onlyAttr"
            :cat_id="catId"
            @refresh="goodsCateAttr"
          ></goods-attr>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import GoodsAttr from "@/views/goods/paramsComps/GoodsAttr";
import { goodsCate_, goodsCateAttr_ } from "@/network/goods";

export default {
  name: "GoodsParams",
  data() {
    return {
      goods: [],
      selectGood: {
        cat_name: "",
        cat_id: 0,
        onlyAttr: [],
        manyAttr: [],
      },
      cascaderProps: {
        expandTrigger: "hover",
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
      activeName: "many",
    };
  },
  components: {
    GoodsAttr,
  },
  created() {
    this.goodsCate();
  },
  computed: {
    catId() {
      if (this.selectGood.cat_id) return this.selectGood.cat_id.reverse()[0];
    },
  },
  methods: {
    async goodsCate() {
      let res = await goodsCate_();
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.goods = res.data;
    },
    async goodsCateAttr() {
      let resOnly = await goodsCateAttr_(this.catId, "only");
      let resMany = await goodsCateAttr_(this.catId, "many");
      if (resOnly.meta.status !== 200)
        return this.$message.error(resOnly.meta.msg);
      if (resMany.meta.status !== 200)
        return this.$message.error(resMany.meta.msg);
      resMany.data.map((v, i, arr) => {
        v.attr_vals = v.attr_vals.split(",");
      });
      resOnly.data.map((v, i, arr) => {
        v.attr_vals = v.attr_vals.split(",");
      });
      this.selectGood.onlyAttr = resOnly.data;
      this.selectGood.manyAttr = resMany.data;
    },
  },
};
</script>

<style lang='scss' scoped>
p {
  margin: 15px 0;
}
</style>