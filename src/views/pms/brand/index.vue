<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button style="float: right" @click="searchBrandList()" type="primary" size="small">
          查询结果
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input style="width: 203px" v-model="listQuery.keyword" placeholder="品牌名称/关键字"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button class="btn-add" @click="addBrand()" size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="brandTable" :data="list" style="width: 100%" @selection-change="handleSelectionChange"
        v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="品牌名称" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="品牌首字母" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.firstLetter }}</template>
        </el-table-column>
        <el-table-column label="排序" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.sort }}</template>
        </el-table-column>
        <el-table-column label="品牌制造商" width="100" align="center">
          <template slot-scope="scope">
            <el-switch @change="handleFactoryStatusChange(scope.$index, scope.row)" :active-value="1" :inactive-value="0"
              v-model="scope.row.factoryStatus">
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
        <el-table-column label="相关" width="220" align="center">
          <template slot-scope="scope">
            <span>商品：</span>
            <el-button size="mini" type="text" @click="getProductList(scope.$index, scope.row)">100
            </el-button>
            <span>评价：</span>
            <el-button size="mini" type="text" @click="getProductCommentList(scope.$index, scope.row)">1000
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
import { fetchList, updateShowStatus, updateFactoryStatus, deleteBrand } from '@/api/brand'

const data = reactive({
  operates: [
    {
      label: "显示品牌",
      value: "showBrand"
    },
    {
      label: "隐藏品牌",
      value: "hideBrand"
    }
  ],
  operateType: null,
  listQuery: {
    keyword: null,
    pageNum: 1,
    pageSize: 10
  },
  list: null,
  total: null,
  listLoading: true,
  multipleSelection: []
})

getList();

function getList() {
  listLoading = true;
  fetchList(listQuery).then(response => {
    listLoading = false;
    list = response.data.list;
    total = response.data.total;
    totalPage = response.data.totalPage;
    pageSize = response.data.pageSize;
  });
}
function handleSelectionChange(val) {
  multipleSelection = val;
}
function handleUpdate(index, row) {
  $router.push({ path: '/pms/updateBrand', query: { id: row.id } })
}
function handleDelete(index, row) {
  $confirm('是否要删除该品牌', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteBrand(row.id).then(response => {
      $message({
        message: '删除成功',
        type: 'success',
        duration: 1000
      });
      getList();
    });
  });
}
function getProductList(index, row) {
  console.log(index, row);
}
function getProductCommentList(index, row) {
  console.log(index, row);
}
function handleFactoryStatusChange(index, row) {
  var data = new URLSearchParams();
  data.append("ids", row.id);
  data.append("factoryStatus", row.factoryStatus);
  updateFactoryStatus(data).then(response => {
    $message({
      message: '修改成功',
      type: 'success',
      duration: 1000
    });
  }).catch(error => {
    if (row.factoryStatus === 0) {
      row.factoryStatus = 1;
    } else {
      row.factoryStatus = 0;
    }
  });
}
function handleShowStatusChange(index, row) {
  let data = new URLSearchParams();
  ;
  data.append("ids", row.id);
  data.append("showStatus", row.showStatus);
  updateShowStatus(data).then(response => {
    $message({
      message: '修改成功',
      type: 'success',
      duration: 1000
    });
  }).catch(error => {
    if (row.showStatus === 0) {
      row.showStatus = 1;
    } else {
      row.showStatus = 0;
    }
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
function searchBrandList() {
  listQuery.pageNum = 1;
  getList();
}
function handleBatchOperate() {
  console.log(multipleSelection);
  if (multipleSelection < 1) {
    $message({
      message: '请选择一条记录',
      type: 'warning',
      duration: 1000
    });
    return;
  }
  let showStatus = 0;
  if (operateType === 'showBrand') {
    showStatus = 1;
  } else if (operateType === 'hideBrand') {
    showStatus = 0;
  } else {
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
  let data = new URLSearchParams();
  data.append("ids", ids);
  data.append("showStatus", showStatus);
  updateShowStatus(data).then(response => {
    getList();
    $message({
      message: '修改成功',
      type: 'success',
      duration: 1000
    });
  });
}
function addBrand() {
  $router.push({ path: '/pms/addBrand' })
}


</script>
<style rel="stylesheet/scss" lang="scss" scoped></style>


