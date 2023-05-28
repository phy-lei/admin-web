<template>
  <div class="app-wrapper" :class="classObj">
    <Sidebar class="sidebar-container"></Sidebar>
    <div class="main-container">
      <Navbar></Navbar>
      <AppMain></AppMain>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useAppStore } from '@/store/app';
import { Navbar, Sidebar, AppMain } from './components';
import useResize from './useHooks/useResize';

const { sidebar, device } = useAppStore();

const classObj = computed(() => ({
  hideSidebar: !sidebar.opened,
  withoutAnimation: sidebar.withoutAnimation,
  mobile: device.value === 'mobile',
}));

useResize();

// import ResizeMixin from './mixin/ResizeHandler'
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
