<template>
  <div class="theme-setting toolBar-icon">
    <SvgIcon name="theme" @click="openDrawer"></SvgIcon>
  </div>
</template>

<script setup lang="ts">
import mittBus from '@/utils/mittBus';
const openDrawer = () => {
  mittBus.emit('openThemeDrawer');
};
</script>
