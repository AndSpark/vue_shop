<template>
  <nav-menu-aside :menus="menus" :iconList="iconList"></nav-menu-aside>
</template>

<script>
import NavMenuAside from "@/components/common/navMenuAside/NavMenuAside";

import { menus } from "@/network/users";
export default {
  name: "HomeAside",
  data() {
    return {
      iconList: {
        125: "el-icon-s-custom",
        103: "el-icon-key",
        101: "el-icon-s-goods",
        102: "el-icon-s-order",
        145: "el-icon-s-data",
      },
      menus: [],
    };
  },
  components: {
    NavMenuAside,
  },
  created() {
    this.menusRequest();
  },
  methods: {
    async menusRequest() {
      let res = await menus();
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.menus = res.data;
    },
  },
};
</script>

<style lang="scss" scoped></style>
