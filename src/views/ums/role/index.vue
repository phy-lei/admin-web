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
              placeholder="角色名称"
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
        ref="roleTable"
        :data="data.list"
        style="width: 100%"
        v-loading="data.listLoading"
        border
      >
        <el-table-column label="编号" width="100" align="center">
          <template #default="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="角色名称" align="center">
          <template #default="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="描述" align="center">
          <template #default="scope">{{ scope.row.description }}</template>
        </el-table-column>
        <el-table-column label="用户数" width="100" align="center">
          <template #default="scope">{{ scope.row.adminCount }}</template>
        </el-table-column>
        <el-table-column label="添加时间" width="160" align="center">
          <template #default="scope">{{ formatDateTime(scope.row.createTime) }}</template>
        </el-table-column>
        <el-table-column label="是否启用" width="140" align="center">
          <template #default="scope">
            <el-switch
              @change="handleStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.status"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template #default="scope">
            <el-row>
              <el-button
                size="small"
                type="text"
                @click="handleSelectMenu(scope.$index, scope.row)"
              >
                分配菜单
              </el-button>
              <el-button
                size="small"
                type="text"
                @click="handleSelectResource(scope.$index, scope.row)"
              >
                分配资源
              </el-button>
            </el-row>
            <el-row>
              <el-button size="small" type="text" @click="handleUpdate(scope.$index, scope.row)">
                编辑
              </el-button>
              <el-button size="small" type="text" @click="handleDelete(scope.$index, scope.row)">
                删除
              </el-button>
            </el-row>
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
        :page-sizes="[5, 10, 15]"
        :total="data.total"
      ></el-pagination>
    </div>
    <el-dialog
      :title="data.isEdit ? '编辑角色' : '添加角色'"
      :visible.sync="data.dialogVisible"
      width="40%"
    >
      <el-form :model="data.role" ref="roleForm" label-width="150px" size="small">
        <el-form-item label="角色名称：">
          <el-input v-model="data.role.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="描述：">
          <el-input
            v-model="data.role.description"
            type="textarea"
            :rows="5"
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-radio-group v-model="data.role.status">
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
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { fetchList, createRole, updateRole, updateStatus, deleteRole } from '@/api/role';
import { formatDate } from '@/utils/date';

const router = useRouter();

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  keyword: null,
};
const defaultRole = {
  id: null,
  name: null,
  description: null,
  adminCount: 0,
  status: 1,
};

const data = reactive<any>({
  listQuery: Object.assign({}, defaultListQuery),
  list: null,
  total: null,
  listLoading: false,
  dialogVisible: false,
  role: Object.assign({}, defaultRole),
  isEdit: false,
});
getList();

function formatDateTime(time) {
  if (time == null || time === '') {
    return 'N/A';
  }
  let date = new Date(time);
  return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
}

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
  data.role = Object.assign({}, defaultRole);
}
function handleStatusChange(index, row) {
  ElMessageBox.confirm('是否要修改该状态?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      updateStatus(row.id, { status: row.status }).then((response) => {
        ElMessage({
          type: 'success',
          message: '修改成功!',
        });
      });
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消修改',
      });
      getList();
    });
}
function handleDelete(index, row) {
  ElMessageBox.confirm('是否要删除该角色?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    let ids = [];
    ids.push(row.id);
    let params = new URLSearchParams();
    params.append('ids', ids);
    deleteRole(params).then((response) => {
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
  data.role = Object.assign({}, row);
}
function handleDialogConfirm() {
  ElMessageBox.confirm('是否要确认?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    if (data.isEdit) {
      updateRole(data.role.id, data.role).then((response) => {
        ElMessage({
          message: '修改成功！',
          type: 'success',
        });
        data.dialogVisible = false;
        getList();
      });
    } else {
      createRole(data.role).then((response) => {
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
function handleSelectMenu(index, row) {
  router.push({ path: '/ums/allocMenu', query: { roleId: row.id } });
}
function handleSelectResource(index, row) {
  router.push({ path: '/ums/allocResource', query: { roleId: row.id } });
}
function getList() {
  data.listLoading = true;
  fetchList(data.listQuery).then((response) => {
    data.listLoading = false;
    data.list = response.data.list;
    data.total = response.data.total;
  });
}
</script>
<style></style>
