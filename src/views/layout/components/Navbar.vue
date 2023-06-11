<template>
  <el-menu class="navbar" mode="horizontal">
    <Hamburger
      class="hamburger-container"
      :toggleClick="toggleSideBar"
      :isActive="sidebar.opened"
    ></Hamburger>
    <Breadcrumb></Breadcrumb>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" :src="avatar" />
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>首页</el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display: block">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app';
import { useUserStore } from '@/store/user';

const { sidebar, toggleSideBar } = useAppStore();
const { avatar } = useUserStore();

const logout = () => {};
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  display: flex;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    padding: 0 10px;
  }
  .avatar-container {
    height: 50px;
    margin-left: auto;
    margin-right: 30px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
    }
  }
}
</style>
