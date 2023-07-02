<template>
  <el-dialog v-model="dialogVisible" title="分配菜单" width="40%" destroy-on-close append-to-body>
    <el-tree
      ref="tree"
      :data="menuTreeList"
      show-checkbox
      default-expand-all
      node-key="lqbId"
      highlight-current
      :default-checked-keys="selectedId"
      :props="defaultProps"
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
import { ElTree } from 'element-plus';
import { getMenuListAllApi, getMenuListByRoleIdApi } from '@/api/menu';

const emit = defineEmits(['confirm']);
const defaultProps = {
  children: 'children',
  label: 'lqbMenuName',
  value: 'lqbId',
};
const tree = ref<InstanceType<typeof ElTree>>();
const dialogVisible = ref(false);
const roleId = ref(0);
const selectedId = ref<number[]>([]);
const menuTreeList = ref<Awaited<ReturnType<typeof getMenuListAllApi>>>([]);

const getMenuListByRoleId = async (id) => {
  const res = await getMenuListByRoleIdApi(id);
  console.log('%c [ xxx ]', 'font-size:13px; background:pink; color:#bf2c9f;', res);
  selectedId.value = res.map((item) => item.lqbId);
};

const getMenuListAll = async () => {
  const res = await getMenuListAllApi();
  menuTreeList.value = res;
};

const showDialog = async (id) => {
  await getMenuListAll();
  roleId.value = id;
  await getMenuListByRoleId(id);
  dialogVisible.value = true;
};
const close = () => {
  dialogVisible.value = false;
};

const confirm = () => {
  emit('confirm', roleId.value, tree.value?.getCheckedKeys());
  close();
};

defineExpose({
  showDialog,
});
</script>
