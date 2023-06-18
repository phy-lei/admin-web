<template>
  <div class="fullscreen">
    <el-icon @click="toggle"><FullScreen /></el-icon>
    <!-- <i :class="['iconfont', isFullscreen ? 'icon-suoxiao' : 'icon-fangda']" class="toolBar-icon" @click="toggle"></i> -->
  </div>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core';
const { toggle, isFullscreen } = useFullscreen();
</script>
