<template>
  <div class="app-wrapper" :class="classObj">
    <Sidebar class="sidebar-container"></Sidebar>
    <div class="main-container">
      <Navbar></Navbar>
      <div class="main-wrap">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useAppStore } from '@/stores/app';
import { Navbar, Sidebar } from './components';
import useResize from './useHooks/useResize';

const { sidebar, device } = useAppStore();
const classObj = computed(() => ({
  hideSidebar: !sidebar.opened,
  withoutAnimation: sidebar.withoutAnimation,
  mobile: device === 'mobile',
}));

useResize();
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.app-wrapper {
  position: relative;
  min-height: 100vh;
  width: 100%;
  min-width: 750px;
  display: flex;
  .main-wrap {
    padding: 20px;
    width: 100%;
    height: calc(100vh - 50px);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }
}
</style>
