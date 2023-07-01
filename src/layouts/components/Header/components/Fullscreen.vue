<template>
  <div class="fullscreen toolBar-icon">
    <SvgIcon :name="isFullscreen ? 'zoom-in-screen' : 'full-screen'" @click="toggle"></SvgIcon>
  </div>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core';
const { toggle, isFullscreen } = useFullscreen();
</script>
