<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">数据列表</span>
      <el-button class="btn-add" @click="handleAddProductCate()" size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="productCateTable" style="width: 100%" :data="list" v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="分类名称" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="级别" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.level | levelFilter }}</template>
        </el-table-column>
        <el-table-column label="商品数量" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.productCount }}</template>
        </el-table-column>
        <el-table-column label="数量单位" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.productUnit }}</template>
        </el-table-column>
        <el-table-column label="导航栏" width="100" align="center">
          <template slot-scope="scope">
            <el-switch @change="handleNavStatusChange(scope.$index, scope.row)" :active-value="1" :inactive-value="0"
              v-model="scope.row.navStatus">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="是否显示" width="100" align="center">
          <template slot-scope="scope">
            <el-switch @change="handleShowStatusChange(scope.$index, scope.row)" :active-value="1" :inactive-value="0"
              v-model="scope.row.showStatus">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="排序" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.sort }}</template>
        </el-table-column>
        <el-table-column label="设置" width="200" align="center">
          <template slot-scope="scope">
            <el-button size="mini" :disabled="scope.row.level | disableNextLevel"
              @click="handleShowNextLevel(scope.$index, scope.row)">查看下级
            </el-button>
            <el-button size="mini" @click="handleTransferProduct(scope.$index, scope.row)">转移商品
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleUpdate(scope.$index, scope.row)">编辑
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper" :page-size="listQuery.pageSize" :page-sizes="[5, 10, 15]"
        :current-page.sync="listQuery.pageNum" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { fetchList, deleteProductCate, updateShowStatus, updateNavStatus } from '@/api/productCate'

const data reactive({
  list: null,
  total: null,
  listLoading: true,
  listQuery: {
    pageNum: 1,
    pageSize: 5
  },
  parentId: 0
})

resetParentId();
getList();

function resetParentId() {
  listQuery.pageNum = 1;
  if ($route.query.parentId != null) {
    parentId = $route.query.parentId;
  } else {
    parentId = 0;
  }
}
function handleAddProductCate() {
  $router.push('/pms/addProductCate');
}
getList() {
  listLoading = true;
  fetchList(parentId, listQuery).then(response => {
    listLoading = false;
    list = response.data.list;
    total = response.data.total;
  });
}
function handleSizeChange(val) {
  listQuery.pageNum = 1;
  listQuery.pageSize = val;
  getList();
}
function handleCurrentChange(val) {
  listQuery.pageNum = val;
  getList();
}
function handleNavStatusChange(index, row) {
  let data = new URLSearchParams();
  let ids = [];
  ids.push(row.id)
  data.append('ids', ids);
  data.append('navStatus', row.navStatus);
  updateNavStatus(data).then(response => {
    $message({
      message: '修改成功',
      type: 'success',
      duration: 1000
    });
  });
}
function handleShowStatusChange(index, row) {
  let data = new URLSearchParams();
  let ids = [];
  ids.push(row.id)
  data.append('ids', ids);
  data.append('showStatus', row.showStatus);
  updateShowStatus(data).then(response => {
    $message({
      message: '修改成功',
      type: 'success',
      duration: 1000
    });
  });
}
function handleShowNextLevel(index, row) {
  $router.push({ path: '/pms/productCate', query: { parentId: row.id } })
}
function handleTransferProduct(index, row) {
  console.log('handleAddProductCate');
}
function handleUpdate(index, row) {
  $router.push({ path: '/pms/updateProductCate', query: { id: row.id } });
}
function handleDelete(index, row) {
  $confirm('是否要删除该品牌', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteProductCate(row.id).then(response => {
      $message({
        message: '删除成功',
        type: 'success',
        duration: 1000
      });
      getList();
    });
  });
}


export default {
  name: "productCateList",

  watch: {
    $route(route) {
      resetParentId();
      getList();
    }
  },
  filters: {
    levelFilter(value) {
      if (value === 0) {
        return '一级';
      } else if (value === 1) {
        return '二级';
      }
    },
    disableNextLevel(value) {
      if (value === 0) {
        return false;
      } else {
        return true;
      }
    }
  }
}
</script>

<style scoped></style>
