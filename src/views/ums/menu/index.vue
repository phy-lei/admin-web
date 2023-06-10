<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">数据列表</span>
      <el-button class="btn-add" @click="handleAddMenu()" size="small">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table
        ref="menuTable"
        style="width: 100%"
        :data="data.list"
        v-loading="data.listLoading"
        border
      >
        <el-table-column label="编号" width="100" align="center">
          <template #default="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="菜单名称" align="center">
          <template #default="scope">{{ scope.row.title }}</template>
        </el-table-column>
        <el-table-column label="菜单级数" width="100" align="center">
          <template #default="scope">{{ levelFilter(scope.row.level) }}</template>
        </el-table-column>
        <el-table-column label="前端名称" align="center">
          <template #default="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="前端图标" width="100" align="center">
          <template #default="scope"><svg-icon :icon-class="scope.row.icon"></svg-icon></template>
        </el-table-column>
        <el-table-column label="是否显示" width="100" align="center">
          <template #default="scope">
            <el-switch
              @change="handleHiddenChange(scope.$index, scope.row)"
              :active-value="0"
              :inactive-value="1"
              v-model="scope.row.hidden"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="排序" width="100" align="center">
          <template #default="scope">{{ scope.row.sort }}</template>
        </el-table-column>
        <el-table-column label="设置" width="120" align="center">
          <template #default="scope">
            <el-button
              size="small"
              type="text"
              :disabled="disableNextLevel(scope.row.level)"
              @click="handleShowNextLevel(scope.$index, scope.row)"
            >
              查看下级
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
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
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="data.listQuery.pageSize"
        :page-sizes="[10, 15, 20]"
        :current-page.sync="data.listQuery.pageNum"
        :total="data.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { fetchList, deleteMenu, updateHidden } from '@/api/menu';

const route = useRoute();
const router = useRouter();
const data = reactive({
  list: [],
  total: 0,
  listLoading: true,
  listQuery: {
    pageNum: 1,
    pageSize: 5,
  },
  parentId: 0,
});

resetParentId();
getList();

// watch(
//   () => route,
//   () => {
//     resetParentId();
//     getList();
//   }
// );

function resetParentId() {
  data.listQuery.pageNum = 1;
  if (route.query.parentId != null) {
    data.parentId = route.query.parentId;
  } else {
    data.parentId = 0;
  }
}
function handleAddMenu() {
  router.push('/ums/addMenu');
}
function getList() {
  data.listLoading = true;
  fetchList(data.parentId, data.listQuery).then((response) => {
    data.listLoading = false;
    data.list = response.data.list;
    data.total = response.data.total;
  });
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
function handleHiddenChange(index, row) {
  updateHidden(row.id, { hidden: row.hidden }).then((response) => {
    ElMessage({
      message: '修改成功',
      type: 'success',
      duration: 1000,
    });
  });
}
function handleShowNextLevel(index, row) {
  router.push({ path: '/ums/menu', query: { parentId: row.id } });
}
function handleUpdate(index, row) {
  router.push({ path: '/ums/updateMenu', query: { id: row.id } });
}
function handleDelete(index, row) {
  ElMessageBox.confirm('是否要删除该菜单', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    deleteMenu(row.id).then((response) => {
      ElMessage({
        message: '删除成功',
        type: 'success',
        duration: 1000,
      });
      getList();
    });
  });
}

function levelFilter(value) {
  if (value === 0) {
    return '一级';
  } else if (value === 1) {
    return '二级';
  }
}
function disableNextLevel(value) {
  if (value === 0) {
    return false;
  } else {
    return true;
  }
}
</script>

<style scoped></style>
