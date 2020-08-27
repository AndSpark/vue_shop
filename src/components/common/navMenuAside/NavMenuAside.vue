<template>
  <div>
    <p @click="isCollapse = !isCollapse" class="collapse">
      <i class="el-icon-s-fold" v-show="!isCollapse"></i>
      <i class="el-icon-s-unfold" v-show="isCollapse"></i>
    </p>
    <el-menu
      :collapse="isCollapse"
      :unique-opened="true"
      background-color="#e1f5f6"
      :collapse-transition="false"
      text-color="#111"
      router
      :default-active="$route.path.substr(1)"
    >
      <el-submenu v-for="(menu, index) in menus" :key="menu.id" :index="String(index)">
        <template slot="title">
          <i :class="iconList[menu.id]"></i>
          <span>{{ menu.authName }}</span>
        </template>
        <el-menu-item
          v-for="childMenu in menu.children"
          :key="childMenu.id"
          :index="`${childMenu.path}`"
          @click="up(childMenu.path)"
        >
          <i class="el-icon-menu"></i>
          <span>{{ childMenu.authName }}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "NavMenuAside",
  data() {
    return {
      isCollapse: false,
    };
  },
  props: {
    menus: {
      type: Array,
      default() {
        return [];
      },
    },
    iconList: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    isCollapse: {
      handler(newV, oldV) {
        this.$store.commit("collapse", newV ? "64px" : "200px");
      },
      immediate: true,
    },
  },
  created() {
    if (this.$route.path == "/add") {
      return this.$store.commit("currentPath", {
        path1: "商品管理",
        path2: "添加商品",
      });
    }
    this.$store.commit(
      "currentPath",
      this.currentPath(this.$route.path.substr(1))
    );
  },
  methods: {
    up(path) {
      this.$store.commit("currentPath", this.currentPath(path));
    },
    currentPath(path) {
      let menu = this.menus.filter((v) => {
        return v.children.find((x) => {
          return x.path == path;
        });
      })[0];
      let path1 = menu.authName;
      let path2 = menu.children.find((x) => x.path == path).authName;
      return { path1, path2 };
    },
  },
};
</script>

<style lang="scss" scoped>
.collapse {
  padding: 5px 0;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: #b4c4c5;
  }
}
.el-menu {
  .el-submenu {
    font-size: 12px;
  }
}
</style>
