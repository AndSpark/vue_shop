<template>
  <el-container class="home-container">
    <el-header>
      <div class="home-title">
        <img src="@/assets/logo.png" alt />
        <router-link to="/home">
          <h2>后台管理系统</h2>
        </router-link>
      </div>
      <el-button type="info" @click="logout" plain round>退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="width">
        <home-aside></home-aside>
      </el-aside>
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right" v-if="$route.path != '/welcome'">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{$store.state.path.path1}}</el-breadcrumb-item>
          <el-breadcrumb-item>{{$store.state.path.path2}}</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HomeAside from "@/views/home/childComps/HomeAside";
export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    HomeAside,
  },
  methods: {
    logout() {
      sessionStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
  computed: {
    width() {
      return this.$store.state.width;
    },
  },
};
</script>

<style lang="scss" scoped>
.home-container {
  height: 100vh;
  .el-header {
    background-color: #e1f5f6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 2px 2px #aaa;
    .home-title {
      img {
        width: 40px;
        height: 40px;
        margin: 10px 0;
      }
      h2 {
        float: right;
        font-size: 20px;
        line-height: 60px;
        text-indent: 0.5em;
        color: #333;
        user-select: none;
      }
    }
  }
  .el-aside {
    background-color: #e1f5f6;
    box-shadow: 2px 4px 2px 1px #aaa;
  }

  .el-breadcrumb {
    font-size: 14px;
    margin-bottom: 15px;
  }
}
</style>
