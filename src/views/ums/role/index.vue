<template>
  <div>
    <ProTable ref="proTable" :columns="columns" :request-api="getRoleListApi" row-key="lqbId">
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary" plain @click="handleAdd">添加</el-button>
      </template>

      <!-- 用户状态 slot -->
      <template #lqbRoleStatus="scope">
        <!-- 如果插槽的值为 el-switch，第一次加载会默认触发 switch 的 @change 方法，所有在外层包一个盒子，点击触发盒子 click 方法（暂时只能这样解决） -->
        <div @click="handleStatusChange(scope.row)">
          <el-switch
            :value="scope.row.lqbRoleStatus"
            :active-text="scope.row.lqbRoleStatus === 1 ? '启用' : '禁用'"
            :active-value="1"
            :inactive-value="0"
          />
        </div>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button type="primary" @click="allocMenu(scope.row)">分配菜单</el-button>
        <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
        <el-button type="primary" @click="del(scope.row)">删除</el-button>
      </template>
    </ProTable>

    <AddDialog ref="addDialog" @confirm="roleAddHandler"></AddDialog>
    <AllocMenuDialog ref="allocMenuDialog" @confirm="allocMenuConfirm"></AllocMenuDialog>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import ProTable from '@/components/ProTable/index.vue';
import AddDialog from './components/AddDialog.vue';
import AllocMenuDialog from './components/AllocMenuDialog.vue';
import { ColumnProps } from '@/components/ProTable/interface';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
  getRoleListApi,
  createRoleApi,
  updateRoleApi,
  updateRoleStatusApi,
  deleteRoleApi,
  allocMenuByIdApi,
} from '@/api/role';

const addDialog = ref<InstanceType<typeof AddDialog>>();
const allocMenuDialog = ref<InstanceType<typeof AllocMenuDialog>>();
const proTable = ref<InstanceType<typeof ProTable>>();
const columns: Partial<ColumnProps>[] = [
  { type: 'index', label: '#', width: 80 },
  {
    prop: 'lqbRoleName',
    label: '角色名称',
    width: 130,
    search: { el: 'input', key: 'keyword' },
  },
  // 😄 enum 可以直接是数组对象，也可以是请求方法(proTable 内部会执行获取 enum 的这个方法)，下面用户状态也同理
  // 😄 enum 为请求方法时，后台返回的数组对象 key 值不是 label 和 value 的情况，可以在 searchProps 中指定 label 和 value 的 key 值
  {
    prop: 'lqbRemark',
    label: '描述',
  },
  { prop: 'lqbUserCount', label: '用户数', width: 80 },
  { prop: 'lqbCreateTime', label: '添加时间' },
  {
    prop: 'lqbRoleStatus',
    label: '状态',
  },
  { prop: 'operation', label: '操作', width: 380, fixed: 'right' },
];

const handleAdd = () => {
  addDialog.value?.showDialog();
};

const roleAddHandler = (data) => {
  console.log('%c [ xxx ]', 'font-size:13px; background:pink; color:#bf2c9f;', data);
  if (!addDialog.value?.isEdit) {
    createRoleApi(data).then(() => {
      ElMessage({
        message: '添加成功！',
        type: 'success',
      });
      proTable.value?.getTableList();
    });
  } else {
    updateRoleApi(data).then(() => {
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
  addDialog.value?.showDialog(row);
};

const handleStatusChange = (row) => {
  ElMessageBox.confirm('是否要修改该状态?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    updateRoleStatusApi({
      id: row.lqbId,
      status: 1 ^ row.lqbRoleStatus,
    }).then(() => {
      ElMessage({
        type: 'success',
        message: '修改成功!',
      });
      proTable.value?.getTableList();
    });
  });
};

const del = (row) => {
  ElMessageBox.confirm('是否要删除该角色?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    deleteRoleApi([row.lqbId]).then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功!',
      });
      proTable.value?.getTableList();
    });
  });
};

const allocMenu = (row) => {
  allocMenuDialog.value?.showDialog(row.lqbId);
};

const allocMenuConfirm = (roleId: number, arr: number[]) => {
  allocMenuByIdApi(roleId, arr).then(() => {
    ElMessage({
      type: 'success',
      message: '分配菜单成功!',
    });
    proTable.value?.getTableList();
  });
};
</script>
