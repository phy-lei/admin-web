<template>
  <div>
    <ProTable ref="proTable" :columns="columns" :request-api="fetchListApi">
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary" plain @click="handleAdd">添加</el-button>
      </template>

      <!-- 用户状态 slot -->
      <template #lqbUserStatus="scope">
        <!-- 如果插槽的值为 el-switch，第一次加载会默认触发 switch 的 @change 方法，所有在外层包一个盒子，点击触发盒子 click 方法（暂时只能这样解决） -->
        <div @click="handleStatusChange(scope.row)">
          <el-switch
            :value="scope.row.lqbUserStatus"
            :active-text="scope.row.lqbUserStatus === 1 ? '启用' : '禁用'"
            :active-value="1"
            :inactive-value="0"
          />
        </div>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button type="primary" @click="handleSelectRole(scope.row)">分配角色</el-button>
        <el-button type="primary" @click="handleUpdate(scope.row)">编辑</el-button>
        <el-button type="primary" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </ProTable>

    <el-dialog
      v-model="data.dialogVisible"
      :title="data.isEdit ? '编辑用户' : '添加用户'"
      width="50%"
    >
      <el-form
        ref="ruleFormRef"
        :model="data.admin"
        label-width="150px"
        :inline="true"
        :rules="rules"
      >
        <el-form-item label="用户名称：" prop="lqbNickName">
          <el-input v-model="data.admin.lqbNickName" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="归属部门：" prop="departments">
          <el-tree-select
            v-model="data.admin.departments"
            :data="departmentsList"
            check-strictly
            :render-after-expand="false"
            multiple
          />
        </el-form-item>
        <el-form-item label="手机号码：" prop="lqbMobile">
          <el-input v-model="data.admin.lqbMobile" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="lqbEmail">
          <el-input v-model="data.admin.lqbEmail" style="width: 250px"></el-input>
        </el-form-item>

        <el-form-item label="登录帐号：" prop="lqbUsername" required>
          <el-input
            v-model="data.admin.lqbUsername"
            style="width: 250px"
            :disabled="data.isEdit"
          ></el-input>
        </el-form-item>
        <el-form-item label="登录密码：" prop="lqbPasswd" required>
          <el-input
            v-model="data.admin.lqbPasswd"
            style="width: 250px"
            :disabled="data.isEdit"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否启用：" prop="lqbUserStatus">
          <el-radio-group v-model="data.admin.lqbUserStatus">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="性别：" prop="lqbGender">
          <el-radio-group v-model="data.admin.lqbGender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleDialogConfirm">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="data.allocDialogVisible" title="分配角色" width="30%">
      <el-select
        v-model="data.allocRoleIds"
        multiple
        placeholder="请选择"
        size="small"
        style="width: 80%"
      >
        <el-option
          v-for="item in data.allRoleList"
          :key="item.lqbId"
          :label="item.lqbRoleName"
          :value="item.lqbId"
        ></el-option>
      </el-select>
      <template #footer>
        <span class="dialog-footer">
          <el-button size="small" @click="data.allocDialogVisible = false">取 消</el-button>
          <el-button type="primary" size="small" @click="handleAllocDialogConfirm()">
            确 定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { ElMessage, ElMessageBox, FormRules, FormInstance } from 'element-plus';
import ProTable from '@/components/ProTable/index.vue';
import { ColumnProps } from '@/components/ProTable/interface';
import {
  fetchListApi,
  createAdminApi,
  updateAdminApi,
  updateStatusApi,
  deleteAdminApi,
  allocRoleApi,
  getRoleByIdApi,
} from '@/api/user';

import { getAllRoleListApi } from '@/api/role';

type ListItem = Awaited<ReturnType<typeof fetchListApi>>['list'];

const defaultAdmin = {
  id: null,
  username: null,
  password: null,
  nickName: null,
  email: null,
  note: null,
  status: 1,
};
const proTable = ref<InstanceType<typeof ProTable>>();
const ruleFormRef = ref<FormInstance>();
const columns: Partial<ColumnProps>[] = [
  { type: 'index', label: '#', width: 80 },
  {
    prop: 'lqbNickName',
    label: '姓名',
    width: 130,
    search: { el: 'input', key: 'keyword' },
  },
  // 😄 enum 可以直接是数组对象，也可以是请求方法(proTable 内部会执行获取 enum 的这个方法)，下面用户状态也同理
  // 😄 enum 为请求方法时，后台返回的数组对象 key 值不是 label 和 value 的情况，可以在 searchProps 中指定 label 和 value 的 key 值
  {
    prop: 'lqbGender',
    label: '性别',
    width: 80,
  },
  { prop: 'lqbEmail', label: '邮箱' },
  { prop: 'lqbMobile', label: '手机号' },
  {
    prop: 'lqbUserStatus',
    label: '状态',
  },
  { prop: 'operation', label: '操作', width: 330, fixed: 'right' },
];

const data = reactive<any>({
  dialogVisible: false,
  admin: Object.assign({}, defaultAdmin),
  isEdit: false,
  allocDialogVisible: false,
  allocRoleIds: [],
  allRoleList: [],
  allocAdminId: null,
});

const rules = reactive<FormRules>({
  lqbUsername: [{ required: true, message: '请填写账号', trigger: 'blur' }],
  lqbPasswd: [{ required: true, message: '请填写密码', trigger: 'blur' }],
});

const departmentsList = ref([
  {
    value: '1',
    label: 'Level one 1',
    children: [
      {
        value: '1-1',
        label: 'Level two 1-1',
        children: [
          {
            value: '1-1-1',
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    value: '2',
    label: 'Level one 2',
    children: [
      {
        value: '2-1',
        label: 'Level two 2-1',
        children: [
          {
            value: '2-1-1',
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        value: '2-2',
        label: 'Level two 2-2',
        children: [
          {
            value: '2-2-1',
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    value: '3',
    label: 'Level one 3',
    children: [
      {
        value: '3-1',
        label: 'Level two 3-1',
        children: [
          {
            value: '3-1-1',
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        value: '3-2',
        label: 'Level two 3-2',
        children: [
          {
            value: '3-2-1',
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
]);

getAllRoleList();

function handleAdd() {
  data.dialogVisible = true;
  data.isEdit = false;
  data.admin = Object.assign({}, defaultAdmin);
}
function handleStatusChange(row) {
  ElMessageBox.confirm('是否要修改该状态?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    updateStatusApi({
      lqbId: row.lqbId,
      lqbStatus: 1 ^ row.lqbUserStatus,
    }).then(() => {
      ElMessage({
        type: 'success',
        message: '修改成功!',
      });
      proTable.value?.getTableList();
    });
  });
}
function handleDelete(row: ListItem[number]) {
  ElMessageBox.confirm('是否要删除该用户?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    deleteAdminApi(row.lqbId).then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功!',
      });
      proTable.value?.getTableList();
    });
  });
}
function handleUpdate(row: ListItem[number]) {
  data.dialogVisible = true;
  data.isEdit = true;
  data.admin = Object.assign({}, row);
  console.log('%c [ xxx ]', 'font-size:13px; background:pink; color:#bf2c9f;', data.admin);
}
async function handleDialogConfirm() {
  if (!ruleFormRef.value) return;
  await ruleFormRef.value.validate((valid) => {
    if (valid) {
      if (data.isEdit) {
        updateAdminApi(data.admin).then(() => {
          ElMessage({
            message: '修改成功！',
            type: 'success',
          });
          data.dialogVisible = false;
          proTable.value?.getTableList();
        });
      } else {
        createAdminApi(data.admin).then(() => {
          ElMessage({
            message: '添加成功！',
            type: 'success',
          });
          data.dialogVisible = false;
          proTable.value?.getTableList();
        });
      }
    }
  });
}
function handleAllocDialogConfirm() {
  allocRoleApi(data.allocAdminId, data.allocRoleIds).then(() => {
    ElMessage({
      message: '分配成功！',
      type: 'success',
    });
    data.allocDialogVisible = false;
  });
}

async function handleSelectRole(row: ListItem[number]) {
  const res = await getRoleByIdApi(row.lqbId);

  data.allocAdminId = row.lqbId;
  data.allocDialogVisible = true;
  console.log('%c [ xxx ]', 'font-size:13px; background:pink; color:#bf2c9f;', res);
  // todo 回显角色id
  data.allocRoleIds = res.map((item) => item.lqbId);
  // getRoleListByAdmin(row.id);
}

function getAllRoleList() {
  getAllRoleListApi().then((response) => {
    data.allRoleList = response;
  });
}
</script>
<style></style>
