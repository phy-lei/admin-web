<template>
  <el-dialog v-model="dialogVisible" title="分配菜单" width="40%" destroy-on-close append-to-body>
    <el-tree
      ref="tree"
      :data="menuTreeList"
      show-checkbox
      default-expand-all
      node-key="id"
      highlight-current
      :props="{
        children: 'children',
        label: 'title',
      }"
    ></el-tree>
    <template #footer>
      <span class="dialog-footer">
        <el-button size="small" @click="close">取 消</el-button>
        <el-button type="primary" size="small" @click="confirm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { getMenuListAllApi } from '@/api/menu';

const emit = defineEmits(['confirm']);

const dialogVisible = ref(false);
const menuTreeList = ref([]);

const getMenuListAll = async () => {
  const res = await getMenuListAllApi();
  console.log('%c [ xxx ]', 'font-size:13px; background:pink; color:#bf2c9f;', res);
};

const showDialog = () => {
  getMenuListAll();
  dialogVisible.value = true;
};

const close = () => {
  dialogVisible.value = false;
};

const confirm = () => {
  emit('confirm');
  close();
};

defineExpose({
  showDialog,
});
</script>
