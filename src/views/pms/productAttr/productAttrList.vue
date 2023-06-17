<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">

      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">数据列表</span>
      <el-button class="btn-add" @click="addProductAttr()" size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="productAttrTable" :data="list" style="width: 100%" @selection-change="handleSelectionChange"
        v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="属性名称" width="140" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="商品类型" width="140" align="center">
          <template slot-scope="scope">{{ $route.query.cname }}</template>
        </el-table-column>
        <el-table-column label="属性是否可选" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.selectType | selectTypeFilter }}</template>
        </el-table-column>
        <el-table-column label="属性值的录入方式" width="150" align="center">
          <template slot-scope="scope">{{ scope.row.inputType | inputTypeFilter }}</template>
        </el-table-column>
        <el-table-column label="可选值列表" align="center">
          <template slot-scope="scope">{{ scope.row.inputList }}</template>
        </el-table-column>
        <el-table-column label="排序" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.sort }}</template>
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
    <div class="batch-operate-container">
      <el-select size="small" v-model="operateType" placeholder="批量操作">
        <el-option v-for="item in operates" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button style="margin-left: 20px" class="search-button" @click="handleBatchOperate()" type="primary"
        size="small">
        确定
      </el-button>
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
import { fetchList, deleteProductAttr } from '@/api/productAttr'


const data= reactive({
  list: null,
  total: null,
  listLoading: true,
  listQuery: {
    pageNum: 1,
    pageSize: 5,
    type: $route.query.type
  },
  operateType: null,
  multipleSelection: [],
  operates: [
    {
      label: "删除",
      value: "deleteProductAttr"
    }
  ]
})

getList();


function getList() {
  listLoading = true;
  fetchList($route.query.cid, listQuery).then(response => {
    listLoading = false;
    list = response.data.list;
    total = response.data.total;
  });
}
function addProductAttr() {
  $router.push({ path: '/pms/addProductAttr', query: { cid: $route.query.cid, type: $route.query.type } });
}
function handleSelectionChange(val) {
  multipleSelection = val;
}
function handleBatchOperate() {
  if (multipleSelection < 1) {
    $message({
      message: '请选择一条记录',
      type: 'warning',
      duration: 1000
    });
    return;
  }
  if (operateType !== 'deleteProductAttr') {
    $message({
      message: '请选择批量操作类型',
      type: 'warning',
      duration: 1000
    });
    return;
  }
  let ids = [];
  for (let i = 0; i < multipleSelection.length; i++) {
    ids.push(multipleSelection[i].id);
  }
  handleDeleteProductAttr(ids);
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
function handleUpdate(index, row) {
  $router.push({ path: '/pms/updateProductAttr', query: { id: row.id } });
}
function handleDeleteProductAttr(ids) {
  $confirm('是否要删除该属性', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    let data = new URLSearchParams();
    data.append("ids", ids);
    deleteProductAttr(data).then(response => {
      $message({
        message: '删除成功',
        type: 'success',
        duration: 1000
      });
      getList();
    });
  });
}
function handleDelete(index, row) {
  let ids = [];
  ids.push(row.id);
  handleDeleteProductAttr(ids);
}



// export default {
//   name: 'productAttrList',

//   filters: {
//     inputTypeFilter(value) {
//       if (value === 1) {
//         return '从列表中选取';
//       } else {
//         return '手工录入'
//       }
//     },
//     selectTypeFilter(value) {
//       if (value === 1) {
//         return '单选';
//       } else if (value === 2) {
//         return '多选';
//       } else {
//         return '唯一'
//       }
//     },
//   }
// }
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>


