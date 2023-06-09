<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="productCate" :rules="rules" ref="productCateFrom" label-width="150px">
      <el-form-item label="分类名称：" prop="name">
        <el-input v-model="productCate.name"></el-input>
      </el-form-item>
      <el-form-item label="上级分类：">
        <el-select v-model="productCate.parentId" placeholder="请选择分类">
          <el-option v-for="item in selectProductCateList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数量单位：">
        <el-input v-model="productCate.productUnit"></el-input>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input v-model="productCate.sort"></el-input>
      </el-form-item>
      <el-form-item label="是否显示：">
        <el-radio-group v-model="productCate.showStatus">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否显示在导航栏：">
        <el-radio-group v-model="productCate.navStatus">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="分类图标：">
        <single-upload v-model="productCate.icon"></single-upload>
      </el-form-item>
      <el-form-item v-for="(filterProductAttr, index) in filterProductAttrList" :label="index | filterLabelFilter"
        :key="filterProductAttr.key">
        <el-cascader clearable v-model="filterProductAttr.value" :options="filterAttrs">
        </el-cascader>
        <el-button style="margin-left: 20px" @click.prevent="removeFilterAttr(filterProductAttr)">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="handleAddFilterAttr()">新增</el-button>
      </el-form-item>
      <el-form-item label="关键词：">
        <el-input v-model="productCate.keywords"></el-input>
      </el-form-item>
      <el-form-item label="分类描述：">
        <el-input type="textarea" :autosize="true" v-model="productCate.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('productCateFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('productCateFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { fetchList, createProductCate, updateProductCate, getProductCate } from '@/api/productCate';
import { fetchListWithAttr } from '@/api/productAttrCate';
import { getProductAttrInfo } from '@/api/productAttr';
import SingleUpload from '@/components/Upload/singleUpload';

const defaultProductCate = {
  description: '',
  icon: '',
  keywords: '',
  name: '',
  navStatus: 0,
  parentId: 0,
  productUnit: '',
  showStatus: 0,
  sort: 0,
  productAttributeIdList: []
};

const data =reactive({

  productCate: Object.assign({}, defaultProductCate),
  selectProductCateList: [],
  rules: {
    name: [
      { required: true, message: '请输入品牌名称', trigger: 'blur' },
      { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' }
    ]
  },
  filterAttrs: [],
  filterProductAttrList: [{
    value: []
  }]

})

if (isEdit) {
  getProductCate($route.query.id).then(response => {
    productCate = response.data;
  });
  getProductAttrInfo($route.query.id).then(response => {
    if (response.data != null && response.data.length > 0) {
      filterProductAttrList = [];
      for (let i = 0; i < response.data.length; i++) {
        filterProductAttrList.push({
          key: Date.now() + i,
          value: [response.data[i].attributeCategoryId, response.data[i].attributeId]
        })
      }
    }
  });
} else {
  productCate = Object.assign({}, defaultProductCate);
}
getSelectProductCateList();
getProductAttrCateList();


function getSelectProductCateList() {
  fetchList(0, { pageSize: 100, pageNum: 1 }).then(response => {
    selectProductCateList = response.data.list;
    selectProductCateList.unshift({ id: 0, name: '无上级分类' });
  });
}
function getProductAttrCateList() {
  fetchListWithAttr().then(response => {
    let list = response.data;
    for (let i = 0; i < list.length; i++) {
      let productAttrCate = list[i];
      let children = [];
      if (productAttrCate.productAttributeList != null && productAttrCate.productAttributeList.length > 0) {
        for (let j = 0; j < productAttrCate.productAttributeList.length; j++) {
          children.push({
            label: productAttrCate.productAttributeList[j].name,
            value: productAttrCate.productAttributeList[j].id
          })
        }
      }
      filterAttrs.push({ label: productAttrCate.name, value: productAttrCate.id, children: children });
    }
  });
}
function getProductAttributeIdList() {
  //获取选中的筛选商品属性
  let productAttributeIdList = [];
  for (let i = 0; i < filterProductAttrList.length; i++) {
    let item = filterProductAttrList[i];
    if (item.value !== null && item.value.length === 2) {
      productAttributeIdList.push(item.value[1]);
    }
  }
  return productAttributeIdList;
}
function onSubmit(formName) {
  $refs[formName].validate((valid) => {
    if (valid) {
      $confirm('是否提交数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (isEdit) {
          productCate.productAttributeIdList = getProductAttributeIdList();
          updateProductCate($route.query.id, productCate).then(response => {
            $message({
              message: '修改成功',
              type: 'success',
              duration: 1000
            });
            $router.back();
          });
        } else {
          productCate.productAttributeIdList = getProductAttributeIdList();
          createProductCate(productCate).then(response => {
            $refs[formName].resetFields();
            resetForm(formName);
            $message({
              message: '提交成功',
              type: 'success',
              duration: 1000
            });
          });
        }
      });

    } else {
      $message({
        message: '验证失败',
        type: 'error',
        duration: 1000
      });
      return false;
    }
  });
}
function resetForm(formName) {
  $refs[formName].resetFields();
  productCate = Object.assign({}, defaultProductCate);
  getSelectProductCateList();
  filterProductAttrList = [{
    value: []
  }];
}
function removeFilterAttr(productAttributeId) {
  if (filterProductAttrList.length === 1) {
    $message({
      message: '至少要留一个',
      type: 'warning',
      duration: 1000
    });
    return;
  }
  var index = filterProductAttrList.indexOf(productAttributeId);
  if (index !== -1) {
    filterProductAttrList.splice(index, 1)
  }
}
function handleAddFilterAttr() {
  if (filterProductAttrList.length === 3) {
    $message({
      message: '最多添加三个',
      type: 'warning',
      duration: 1000
    });
    return;
  }
  filterProductAttrList.push({
    value: null,
    key: Date.now()
  });
}

// export default {
//   name: "ProductCateDetail",
//   components: { SingleUpload },
//   props: {
//     isEdit: {
//       type: Boolean,
//       default: false
//     }
//   },

//   filters: {
//     filterLabelFilter(index) {
//       if (index === 0) {
//         return '筛选属性：';
//       } else {
//         return '';
//       }
//     }
//   }
// }
</script>

<style scoped></style>
