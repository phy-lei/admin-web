<template>
  <div style="margin-top: 50px">
    <el-form :model="value" :rules="rules" ref="productInfoForm" label-width="120px" class="form-inner-container"
      size="small">
      <el-form-item label="商品分类：" prop="productCategoryId">
        <el-cascader v-model="selectProductCateValue" :options="productCateOptions">
        </el-cascader>
      </el-form-item>
      <el-form-item label="商品名称：" prop="name">
        <el-input v-model="value.name"></el-input>
      </el-form-item>
      <el-form-item label="副标题：" prop="subTitle">
        <el-input v-model="value.subTitle"></el-input>
      </el-form-item>
      <el-form-item label="商品品牌：" prop="brandId">
        <el-select v-model="value.brandId" @change="handleBrandChange" placeholder="请选择品牌">
          <el-option v-for="item in brandOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品介绍：">
        <el-input :autoSize="true" v-model="value.description" type="textarea" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="商品货号：">
        <el-input v-model="value.productSn"></el-input>
      </el-form-item>
      <el-form-item label="商品售价：">
        <el-input v-model="value.price"></el-input>
      </el-form-item>
      <el-form-item label="市场价：">
        <el-input v-model="value.originalPrice"></el-input>
      </el-form-item>
      <el-form-item label="商品库存：">
        <el-input v-model="value.stock"></el-input>
      </el-form-item>
      <el-form-item label="计量单位：">
        <el-input v-model="value.unit"></el-input>
      </el-form-item>
      <el-form-item label="商品重量：">
        <el-input v-model="value.weight" style="width: 300px"></el-input>
        <span style="margin-left: 20px">克</span>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="value.sort"></el-input>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="handleNext('productInfoForm')">下一步，填写商品促销</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { fetchListWithChildren } from '@/api/productCate'
import { fetchList as fetchBrandList } from '@/api/brand'
import { getProduct } from '@/api/product';

const data = reactive({

  hasEditCreated: false,
  //选中商品分类的值
  selectProductCateValue: [],
  productCateOptions: [],
  brandOptions: [],
  rules: {
    name: [
      { required: true, message: '请输入商品名称', trigger: 'blur' },
      { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' }
    ],
    subTitle: [{ required: true, message: '请输入商品副标题', trigger: 'blur' }],
    productCategoryId: [{ required: true, message: '请选择商品分类', trigger: 'blur' }],
    brandId: [{ required: true, message: '请选择商品品牌', trigger: 'blur' }],
    description: [{ required: true, message: '请输入商品介绍', trigger: 'blur' }],
    requiredProp: [{ required: true, message: '该项为必填项', trigger: 'blur' }]
  }

})

getProductCateList();
getBrandList();



//处理编辑逻辑
function handleEditCreated() {
  if (value.productCategoryId != null) {
    selectProductCateValue.push(value.cateParentId);
    selectProductCateValue.push(value.productCategoryId);
  }
  hasEditCreated = true;
}
function getProductCateList() {
  fetchListWithChildren().then(response => {
    let list = response.data;
    productCateOptions = [];
    for (let i = 0; i < list.length; i++) {
      let children = [];
      if (list[i].children != null && list[i].children.length > 0) {
        for (let j = 0; j < list[i].children.length; j++) {
          children.push({ label: list[i].children[j].name, value: list[i].children[j].id });
        }
      }
      productCateOptions.push({ label: list[i].name, value: list[i].id, children: children });
    }
  });
}
function getBrandList() {
  fetchBrandList({ pageNum: 1, pageSize: 100 }).then(response => {
    brandOptions = [];
    let brandList = response.data.list;
    for (let i = 0; i < brandList.length; i++) {
      brandOptions.push({ label: brandList[i].name, value: brandList[i].id });
    }
  });
}
function getCateNameById(id) {
  let name = null;
  for (let i = 0; i < productCateOptions.length; i++) {
    for (let j = 0; j < productCateOptions[i].children.length; j++) {
      if (productCateOptions[i].children[j].value === id) {
        name = productCateOptions[i].children[j].label;
        return name;
      }
    }
  }
  return name;
}
function handleNext(formName) {
  $refs[formName].validate((valid) => {
    if (valid) {
      $emit('nextStep');
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
function handleBrandChange(val) {
  let brandName = '';
  for (let i = 0; i < brandOptions.length; i++) {
    if (brandOptions[i].value === val) {
      brandName = brandOptions[i].label;
      break;
    }
  }
  value.brandName = brandName;
}


export default {
  name: "ProductInfoDetail",
  props: {
    value: Object,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    //商品的编号
    productId() {
      return value.id;
    }
  },
  watch: {
    productId: function (newValue) {
      if (!isEdit) return;
      if (hasEditCreated) return;
      if (newValue === undefined || newValue == null || newValue === 0) return;
      handleEditCreated();
    },
    selectProductCateValue: function (newValue) {
      if (newValue != null && newValue.length === 2) {
        value.productCategoryId = newValue[1];
        value.productCategoryName = getCateNameById(value.productCategoryId);
      } else {
        value.productCategoryId = null;
        value.productCategoryName = null;
      }
    }
  }
}
</script>

<style scoped></style>
