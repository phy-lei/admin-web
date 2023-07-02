<template>
  <div>
    <ProTable
      ref="proTable"
      :columns="columns"
      :request-api="getMenuListAllApi"
      :pagination="false"
      row-key="lqbId"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary" plain @click="handleAdd">添加</el-button>
      </template>

      <!-- 用户状态 slot -->
      <template #lqbRoleStatus="scope">
        <el-button text bg type="primary">
          {{ scope.row.lqbRoleStatus === 1 ? '启用' : '禁用' }}
        </el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
        <el-button type="primary" @click="del(scope.row)">删除</el-button>
      </template>
    </ProTable>

    <AddDialog ref="addDialog" @confirm="roleAddHandler"></AddDialog>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import ProTable from '@/components/ProTable/index.vue';
import AddDialog from './components/AddDialog.vue';
import { ColumnProps } from '@/components/ProTable/interface';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getMenuListAllApi, addMenuApi, updateMenuApi, delMenuApi } from '@/api/menu';

const addDialog = ref<InstanceType<typeof AddDialog>>();
const proTable = ref<InstanceType<typeof ProTable>>();
const columns: Partial<ColumnProps>[] = [
  { type: 'index', label: '#', width: 80 },
  {
    prop: 'lqbMenuName',
    label: '菜单名称',
  },
  {
    prop: 'lqbIcon',
    label: '图标',
    width: 80,
  },
  {
    prop: 'lqbOrderNum',
    label: '排序',
  },
  { prop: 'lqbUrl', label: '访问路径' },
  {
    prop: 'lqbRoleStatus',
    label: '状态',
  },
  { prop: 'operation', label: '操作', width: 380, fixed: 'right' },
];

const handleAdd = () => {
  addDialog.value?.showDialog(proTable.value?.tableData as any);
};

const roleAddHandler = (data) => {
  console.log('%c [ xxx ]', 'font-size:13px; background:pink; color:#bf2c9f;', data);
  if (!addDialog.value?.isEdit) {
    addMenuApi(data).then(() => {
      ElMessage({
        message: '添加成功！',
        type: 'success',
      });
      proTable.value?.getTableList();
    });
  } else {
    updateMenuApi(data).then(() => {
      ElMessage({
        message: '修改成功！',
        type: 'success',
      });
      proTable.value?.getTableList();
    });
  }
};

const edit = (row) => {
  console.log('%c [ row ]', 'font-size:13px; background:pink; color:#bf2c9f;', row);
  addDialog.value?.showDialog(proTable.value?.tableData as any, row);
};

const del = (row) => {
  ElMessageBox.confirm('是否要删除该角色?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    delMenuApi(row.lqbId).then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功!',
      });
      proTable.value?.getTableList();
    });
  });
};
</script>
