<template>
  <el-card class="form-container" shadow="never">
    <el-tree
      :data="data.menuTreeList"
      show-checkbox
      default-expand-all
      node-key="id"
      ref="tree"
      highlight-current
      :props="{
        children: 'children',
        label: 'title',
      }"
    ></el-tree>
    <div style="margin-top: 20px" align="center">
      <el-button type="primary" @click="handleSave()">保存</el-button>
      <el-button @click="handleClear()">清空</el-button>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { fetchTreeList } from '@/api/menu';
import { listMenuByRole, allocMenu } from '@/api/role';

const route = useRoute();
const router = useRouter();

const tree = ref();

const data = reactive({
  menuTreeList: [],
  roleId: route.query.roleId,
});
treeList();
getRoleMenu(data.roleId);

function treeList() {
  fetchTreeList().then((response) => {
    data.menuTreeList = response.data;
  });
}
function getRoleMenu(roleId) {
  listMenuByRole(roleId).then((response) => {
    let menuList = response.data;
    let checkedMenuIds = [];
    if (menuList != null && menuList.length > 0) {
      for (let i = 0; i < menuList.length; i++) {
        let menu = menuList[i];
        if (menu.parentId !== 0) {
          checkedMenuIds.push(menu.id);
        }
      }
    }
    tree.value.setCheckedKeys(checkedMenuIds);
  });
}
function handleSave() {
  let checkedNodes = tree.value.getCheckedNodes();
  let checkedMenuIds = new Set();
  if (checkedNodes != null && checkedNodes.length > 0) {
    for (let i = 0; i < checkedNodes.length; i++) {
      let checkedNode = checkedNodes[i];
      checkedMenuIds.add(checkedNode.id);
      if (checkedNode.parentId !== 0) {
        checkedMenuIds.add(checkedNode.parentId);
      }
    }
  }
  ElMessageBox.confirm('是否分配菜单？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    let params = new URLSearchParams();
    params.append('roleId', this.roleId);
    params.append('menuIds', Array.from(checkedMenuIds));
    allocMenu(params).then((response) => {
      ElMessage({
        message: '分配成功',
        type: 'success',
        duration: 1000,
      });
      router.back();
    });
  });
}
function handleClear() {
  tree.value.setCheckedKeys([]);
}
</script>

<style scoped></style>
