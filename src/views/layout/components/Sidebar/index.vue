<template>
  <ScrollBar>
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      router
    >
      <sidebar-item :routes="routers"></sidebar-item>
    </el-menu>
  </ScrollBar>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import SidebarItem from './SidebarItem.vue';
import { useAppStore } from '@/store/app';
import { useRouterStore } from '@/store/router';
import ScrollBar from '@/components/ScrollBar/ScrollBar.vue';

const { sidebar } = useAppStore();
const { routers } = useRouterStore();

const isCollapse = computed(() => !sidebar.opened);
</script>
