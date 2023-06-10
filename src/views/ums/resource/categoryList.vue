<template>
   
  <div class="app-container">
    <el-card shadow="never" class="operate-container">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="small" class="btn-add" @click="handleAdd()">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table
        ref="resourceCategoryTable"
        :data="data.list"
        style="width: 100%"
        v-loading="data.listLoading"
        border
      >
        <el-table-column label="编号" width="100" align="center">
          <template #default="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="名称" align="center">
          <template #default="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template #default="scope">{{ formatDateTime(scope.row.createTime) }}</template>
        </el-table-column>
        <el-table-column label="排序" align="center">
          <template #default="scope">{{ scope.row.sort }}</template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
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
    <el-dialog title="添加分类" :visible.sync="data.dialogVisible" width="40%">
      <el-form
        :model="data.resourceCategory"
        ref="resourceCategoryForm"
        label-width="150px"
        size="small"
      >
        <el-form-item label="名称：">
          <el-input v-model="data.resourceCategory.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input v-model="data.resourceCategory.sort" style="width: 250px"></el-input>
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
import { ElMessage, ElMessageBox } from 'element-plus';
import {
  listAllCate,
  createResourceCategory,
  updateResourceCategory,
  deleteResourceCategory,
} from '@/api/resourceCategory';
import { formatDate } from '@/utils/date';
const defaultResourceCategory = {
  name: null,
  sort: 0,
};

const data = reactive({
  list: [],
  listLoading: false,
  dialogVisible: false,
  isEdit: false,
  resourceCategory: Object.assign({}, defaultResourceCategory),
});

getList();

function formatDateTime(time) {
  if (time == null || time === '') {
    return 'N/A';
  }
  let date = new Date(time);
  return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
}

function handleAdd() {
  data.dialogVisible = true;
  data.isEdit = false;
  data.resourceCategory = Object.assign({}, defaultResourceCategory);
}
function handleUpdate(index, row) {
  data.dialogVisible = true;
  data.isEdit = true;
  data.resourceCategory = Object.assign({}, row);
}
function handleDelete(index, row) {
  ElMessageBox.confirm('是否要删除该分类?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    deleteResourceCategory(row.id).then((response) => {
      ElMessage({
        type: 'success',
        message: '删除成功!',
      });
      getList();
    });
  });
}
function handleDialogConfirm() {
  ElMessageBox.confirm('是否要确认?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    if (data.isEdit) {
      updateResourceCategory(data.resourceCategory.id, data.resourceCategory).then((response) => {
        ElMessage({
          message: '修改成功！',
          type: 'success',
        });
        data.dialogVisible = false;
        getList();
      });
    } else {
      createResourceCategory(data.resourceCategory).then((response) => {
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
function getList() {
  data.listLoading = true;
  listAllCate({}).then((response) => {
    data.listLoading = false;
    data.list = response.data;
  });
}
</script>
<style></style>
