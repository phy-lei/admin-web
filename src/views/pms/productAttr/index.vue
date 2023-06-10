<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">数据列表</span>
      <el-button class="btn-add" @click="addProductAttrCate()" size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="productAttrCateTable" style="width: 100%" :data="list" v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="类型名称" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="属性数量" width="200" align="center">
          <template slot-scope="scope">{{ scope.row.attributeCount == null ? 0 : scope.row.attributeCount }}</template>
        </el-table-column>
        <el-table-column label="参数数量" width="200" align="center">
          <template slot-scope="scope">{{ scope.row.paramCount == null ? 0 : scope.row.paramCount }}</template>
        </el-table-column>
        <el-table-column label="设置" width="200" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="getAttrList(scope.$index, scope.row)">属性列表
            </el-button>
            <el-button size="mini" @click="getParamList(scope.$index, scope.row)">参数列表
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :before-close="handleClose()" width="30%">
      <el-form ref="productAttrCatForm" :model="productAttrCate" :rules="rules" label-width="120px">
        <el-form-item label="类型名称" prop="name">
          <el-input v-model="productAttrCate.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm('productAttrCatForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { fetchList, createProductAttrCate, deleteProductAttrCate, updateProductAttrCate } from '@/api/productAttrCate'

const data = reactive({
  list: null,
  total: null,
  listLoading: true,
  listQuery: {
    pageNum: 1,
    pageSize: 5
  },
  dialogVisible: false,
  dialogTitle: '',
  productAttrCate: {
    name: '',
    id: null
  },
  rules: {
    name: [
      { required: true, message: '请输入类型名称', trigger: 'blur' }
    ]
  }
})

getList();

function getList() {
  listLoading = true;
  fetchList(listQuery).then(response => {
    listLoading = false;
    list = response.data.list;
    total = response.data.total;
  });
}
function addProductAttrCate() {
  dialogVisible = true;
  dialogTitle = "添加类型";
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
function handleDelete(index, row) {
  $confirm('是否要删除该品牌', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteProductAttrCate(row.id).then(response => {
      $message({
        message: '删除成功',
        type: 'success',
        duration: 1000
      });
      getList();
    });
  });
}
function handleUpdate(index, row) {
  dialogVisible = true;
  dialogTitle = "编辑类型";
  productAttrCate.name = row.name;
  productAttrCate.id = row.id;
}
function getAttrList(index, row) {
  $router.push({ path: '/pms/productAttrList', query: { cid: row.id, cname: row.name, type: 0 } })
}
function getParamList(index, row) {
  $router.push({ path: '/pms/productAttrList', query: { cid: row.id, cname: row.name, type: 1 } })
}
function handleConfirm(formName) {
  $refs[formName].validate((valid) => {
    if (valid) {
      let data = new URLSearchParams();
      data.append("name", productAttrCate.name);
      if (dialogTitle === "添加类型") {
        createProductAttrCate(data).then(response => {
          $message({
            message: '添加成功',
            type: 'success',
            duration: 1000
          });
          dialogVisible = false;
          getList();
        });
      } else {
        updateProductAttrCate(productAttrCate.id, data).then(response => {
          $message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
          dialogVisible = false;
          getList();
        });
      }
    } else {
      console.log('error submit!!');
      return false;
    }
  });
}
function handleClose() {
  if (!dialogVisible && $refs.productAttrCatForm) {
    $refs.productAttrCatForm.clearValidate()
  }
}


export default {
  name: 'productAttrCateList',
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped></style>


