<template>
  <el-dialog v-model="dialogVisible" title="个人信息" width="500px" draggable>
    <div>
      <p>个人姓名：{{ userInfo.lqbUsername }}</p>
      <p>所在平台：{{ userInfo.lqbPlatformName }}</p>
      <p>手机号：{{ userInfo.lqbMobile }}</p>
      <p>邮箱{{ userInfo.lqbEmail }}</p>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/modules/user';

const userStore = useUserStore();

const userInfo = computed(() => userStore.userInfo);

const dialogVisible = ref(false);
const openDialog = () => {
  dialogVisible.value = true;
};

defineExpose({ openDialog });
</script>
