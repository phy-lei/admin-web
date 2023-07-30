<template>
  <div>
    <ProTable
      ref="proTable"
      :columns="columns"
      :request-api="getPostListAllApi"
      :pagination="true"
      row-key="lqbId"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary" plain @click="handleAdd">添加</el-button>
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
import { getPostListAllApi, addPostApi, delPostApi, updatePostApi } from '@/api/post';

const addDialog = ref<InstanceType<typeof AddDialog>>();
const proTable = ref<InstanceType<typeof ProTable>>();
const columns: Partial<ColumnProps>[] = [
  { type: 'index', label: '#', width: 80 },

  {
    prop: 'lqbName',
    label: '岗位名称',
  },

  { prop: 'operation', label: '操作', width: 380, fixed: 'right' },
];

const handleAdd = () => {
  addDialog.value?.showDialog();
};

const roleAddHandler = (data) => {
  if (!addDialog.value?.isEdit) {
    addPostApi(data).then(() => {
      ElMessage({
        message: '添加成功！',
        type: 'success',
      });
      proTable.value?.getTableList();
    });
  } else {
    updatePostApi(data).then(() => {
      ElMessage({
        message: '修改成功！',
        type: 'success',
      });
      proTable.value?.getTableList();
    });
  }
};

const edit = (row) => {
  addDialog.value?.showDialog(row);
};

const del = (row) => {
  ElMessageBox.confirm('是否要删除该岗位?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    delPostApi(row.lqbId).then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功!',
      });
      proTable.value?.getTableList();
    });
  });
};
</script>
