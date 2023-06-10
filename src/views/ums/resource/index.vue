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
          <el-form-item label="资源名称：">
            <el-input
              v-model="data.listQuery.nameKeyword"
              class="input-width"
              placeholder="资源名称"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="资源路径：">
            <el-input
              v-model="data.listQuery.urlKeyword"
              class="input-width"
              placeholder="资源路径"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="资源分类：">
            <el-select
              v-model="data.listQuery.categoryId"
              placeholder="全部"
              clearable
              class="input-width"
            >
              <el-option
                v-for="item in data.categoryOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
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
      <el-button size="small" class="btn-add" @click="handleShowCategory()">资源分类</el-button>
    </el-card>
    <div class="table-container">
      <el-table
        ref="resourceTable"
        :data="data.list"
        style="width: 100%"
        v-loading="data.listLoading"
        border
      >
        <el-table-column label="编号" width="100" align="center">
          <template #default="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="资源名称" align="center">
          <template #default="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="资源路径" align="center">
          <template #default="scope">{{ scope.row.url }}</template>
        </el-table-column>
        <el-table-column label="描述" align="center">
          <template #default="scope">{{ scope.row.description }}</template>
        </el-table-column>
        <el-table-column label="添加时间" width="160" align="center">
          <template #default="scope">{{ formatDateTime(scope.row.createTime) }}</template>
        </el-table-column>
        <el-table-column label="操作" width="140" align="center">
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
        :current-page.sync="data.listQuery.pageNum"
        :page-size="data.listQuery.pageSize"
        :page-sizes="[10, 15, 20]"
        :total="data.total"
      ></el-pagination>
    </div>
    <el-dialog
      :title="data.isEdit ? '编辑资源' : '添加资源'"
      :visible.sync="data.dialogVisible"
      width="40%"
    >
      <el-form :model="data.resource" ref="resourceForm" label-width="150px" size="small">
        <el-form-item label="资源名称：">
          <el-input v-model="data.resource.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="资源路径：">
          <el-input v-model="data.resource.url" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="资源分类：">
          <el-select
            v-model="data.resource.categoryId"
            placeholder="全部"
            clearable
            style="width: 250px"
          >
            <el-option
              v-for="item in data.categoryOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述：">
          <el-input
            v-model="data.resource.description"
            type="textarea"
            :rows="5"
            style="width: 250px"
          ></el-input>
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
import { fetchList, createResource, updateResource, deleteResource } from '@/api/resource';
import { listAllCate } from '@/api/resourceCategory';
import { formatDate } from '@/utils/date';

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  nameKeyword: null,
  urlKeyword: null,
  categoryId: null,
};
const defaultResource = {
  id: null,
  name: null,
  url: null,
  categoryId: null,
  description: '',
};
const router = useRouter();

const data = reactive<any>({
  listQuery: Object.assign({}, defaultListQuery),
  list: [],
  total: 0,
  listLoading: false,
  dialogVisible: false,
  resource: Object.assign({}, defaultResource),
  isEdit: false,
  categoryOptions: [],
  defaultCategoryId: null,
});
getList();
getCateList();

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
  data.resource = Object.assign({}, defaultResource);
  data.resource.categoryId = data.defaultCategoryId;
}
function handleDelete(index, row) {
  ElMessageBox.confirm('是否要删除该资源?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    deleteResource(row.id).then((response) => {
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
  data.resource = Object.assign({}, row);
}
function handleDialogConfirm() {
  ElMessageBox.confirm('是否要确认?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    if (data.isEdit) {
      updateResource(data.resource.id, data.resource).then((response) => {
        ElMessage({
          message: '修改成功！',
          type: 'success',
        });
        data.dialogVisible = false;
        getList();
      });
    } else {
      createResource(data.resource).then((response) => {
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
function handleShowCategory() {
  router.push({ path: '/ums/resourceCategory' });
}
function getList() {
  data.listLoading = true;
  fetchList(data.listQuery).then((response) => {
    data.listLoading = false;
    data.list = response.data.list;
    data.total = response.data.total;
  });
}
function getCateList() {
  listAllCate().then((response) => {
    let cateList = response.data;
    for (let i = 0; i < cateList.length; i++) {
      let cate = cateList[i];
      data.categoryOptions.push({ label: cate.name, value: cate.id });
    }
    data.defaultCategoryId = cateList[0].id;
  });
}
</script>
<style></style>
