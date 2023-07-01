<template>
  <el-config-provider :locale="locale" :size="assemblySize" :button="buttonConfig">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { ElConfigProvider } from 'element-plus';
import { useGlobalStore } from '@/stores/modules/global';
import { useTheme } from '@/hooks/useTheme';

import zhCn from 'element-plus/es/locale/lang/zh-cn';

const globalStore = useGlobalStore();

const { initTheme } = useTheme();
initTheme();

const locale = ref(zhCn);

// element assemblySize
const assemblySize = computed(() => globalStore.assemblySize);

// element button config
const buttonConfig = reactive({ autoInsertSpace: false });
</script>
