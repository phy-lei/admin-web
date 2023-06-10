<template>
   
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button style="float: right" type="primary" @click="handleSearchList()" size="small">
          查询搜索
        </el-button>
        <el-button
          style="float: right; margin-right: 15px"
          @click="handleResetSearch()"
          size="small"
        >
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="data.listQuery" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input
              v-model="data.listQuery.keyword"
              class="input-width"
              placeholder="帐号/姓名"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="small" class="btn-add" @click="handleAdd()" style="margin-left: 20px">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table
        ref="adminTable"
        :data="data.list"
        style="width: 100%"
        v-loading="data.listLoading"
        border
      >
        <el-table-column label="编号" width="100" align="center" prop="id"></el-table-column>
        <el-table-column label="姓名" align="center" prop="lqbNickName"></el-table-column>
        <el-table-column label="邮箱" align="center" prop="lqbEmail"></el-table-column>
        <el-table-column label="手机号" align="center" prop="lqbMobile"></el-table-column>
        <el-table-column label="是否启用" width="140" align="center">
          <template #default="scope">
            <el-switch
              @change="handleStatusChange(scope.row)"
              :active-value="1"
              :inactive-value="0"
              :loading="scope.row.loading"
              v-model="scope.row.lqbUserStatus"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button size="small" type="text" @click="handleSelectRole(scope.$index, scope.row)">
              分配角色
            </el-button>
            <el-button size="small" type="text" @click="handleUpdate(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button size="small" type="text" @click="handleDelete(scope.$index, scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="data.listQuery.pageNum"
        :page-size="data.listQuery.pageSize"
        :page-sizes="[10, 15, 20]"
        :total="data.total"
      ></el-pagination>
    </div>
    <el-dialog
      :title="data.isEdit ? '编辑用户' : '添加用户'"
      :visible.sync="data.dialogVisible"
      width="40%"
    >
      <el-form :model="data.admin" ref="adminForm" label-width="150px" size="small">
        <el-form-item label="帐号：">
          <el-input v-model="data.admin.username" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="data.admin.nickName" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="data.admin.email" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="data.admin.password" type="password" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input
            v-model="data.admin.note"
            type="textarea"
            :rows="5"
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-radio-group v-model="data.admin.status">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="data.dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="分配角色" :visible.sync="data.allocDialogVisible" width="30%">
      <el-select
        v-model="data.allocRoleIds"
        multiple
        placeholder="请选择"
        size="small"
        style="width: 80%"
      >
        <el-option
          v-for="item in data.allRoleList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="data.allocDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleAllocDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
  fetchList,
  createAdmin,
  updateAdmin,
  updateStatus,
  deleteAdmin,
  getRoleByAdmin,
  allocRole,
} from '@/api/user';

import { fetchAllRoleList } from '@/api/role';

const defaultListQuery = {
  pageNum: 1,
  pageSize: 20,
  keyword: '',
};
const defaultAdmin = {
  id: null,
  username: null,
  password: null,
  nickName: null,
  email: null,
  note: null,
  status: 1,
};
const isComplete = ref(false);
const data = reactive<any>({
  listQuery: Object.assign({}, defaultListQuery),
  list: [],
  total: 0,
  listLoading: false,
  dialogVisible: false,
  admin: Object.assign({}, defaultAdmin),
  isEdit: false,
  allocDialogVisible: false,
  allocRoleIds: [],
  allRoleList: [],
  allocAdminId: null,
});

getList();
// getAllRoleList();

function handleResetSearch() {
  data.listQuery = Object.assign({}, defaultListQuery);
}
function handleSearchList() {
  data.listQuery.pageNum = 1;
  getList();
}
function handleSizeChange(val) {
  data.listQuery.pageNum = 1;
  data.listQuery.pageSize = val;
  getList();
}
function handleCurrentChange(val) {
  data.listQuery.pageNum = val;
  getList();
}
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
  })
    .then(() => {
      updateStatus({
        lqbId: row.lqbId,
        lqbStatus: 1 ^ row.lqbUserStatus,
      })
        .then((response) => {
          console.log(
            '%c [ response ]',
            'font-size:13px; background:pink; color:#bf2c9f;',
            response
          );
          ElMessage({
            type: 'success',
            message: '修改成功!',
          });
        })
        .catch(() => {
          row.lqbUserStatus = 1 ^ row.lqbUserStatus;
        });
    })
    .catch(() => {
      row.lqbUserStatus = 1 ^ row.lqbUserStatus;
      ElMessage({
        type: 'info',
        message: '取消修改',
      });
    });
}
function handleDelete(index, row) {
  ElMessageBox.confirm('是否要删除该用户?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    deleteAdmin(row.id).then((response) => {
      ElMessage({
        type: 'success',
        message: '删除成功!',
      });
      getList();
    });
  });
}
function handleUpdate(index, row) {
  data.dialogVisible = true;
  data.isEdit = true;
  data.admin = Object.assign({}, row);
}
function handleDialogConfirm() {
  ElMessageBox.confirm('是否要确认?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    if (data.isEdit) {
      updateAdmin(data.admin.id, data.admin).then((response) => {
        ElMessage({
          message: '修改成功！',
          type: 'success',
        });
        data.dialogVisible = false;
        getList();
      });
    } else {
      createAdmin(data.admin).then((response) => {
        ElMessage({
          message: '添加成功！',
          type: 'success',
        });
        data.dialogVisible = false;
        getList();
      });
    }
  });
}
function handleAllocDialogConfirm() {
  ElMessageBox.confirm('是否要确认?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    let params = new URLSearchParams();
    params.append('adminId', data.allocAdminId);
    params.append('roleIds', data.allocRoleIds);
    allocRole(params).then((response) => {
      ElMessage({
        message: '分配成功！',
        type: 'success',
      });
      data.allocDialogVisible = false;
    });
  });
}
function handleSelectRole(index, row) {
  data.allocAdminId = row.id;
  data.allocDialogVisible = true;
  getRoleListByAdmin(row.id);
}
function getList() {
  data.listLoading = true;
  fetchList(data.listQuery).then((response) => {
    console.log('%c [ response ]', 'font-size:13px; background:pink; color:#bf2c9f;', response);
    data.listLoading = false;
    data.list = response.list;
    data.total = response.total;
    setTimeout(() => {
      isComplete.value = true;
    }, 2000);
  });
}
function getAllRoleList() {
  fetchAllRoleList().then((response) => {
    data.allRoleList = response.data;
  });
}
function getRoleListByAdmin(adminId) {
  getRoleByAdmin(adminId).then((response) => {
    let allocRoleList = response.data;
    data.allocRoleIds = [];
    if (allocRoleList != null && allocRoleList.length > 0) {
      for (let i = 0; i < allocRoleList.length; i++) {
        data.allocRoleIds.push(allocRoleList[i].id);
      }
    }
  });
}
</script>
<style></style>
