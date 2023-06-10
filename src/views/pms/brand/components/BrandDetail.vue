<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="brand" :rules="rules" ref="brandFrom" label-width="150px">
      <el-form-item label="品牌名称：" prop="name">
        <el-input v-model="brand.name"></el-input>
      </el-form-item>
      <el-form-item label="品牌首字母：">
        <el-input v-model="brand.firstLetter"></el-input>
      </el-form-item>
      <el-form-item label="品牌LOGO：" prop="logo">
        <single-upload v-model="brand.logo"></single-upload>
      </el-form-item>
      <el-form-item label="品牌专区大图：">
        <single-upload v-model="brand.bigPic"></single-upload>
      </el-form-item>
      <el-form-item label="品牌故事：">
        <el-input placeholder="请输入内容" type="textarea" v-model="brand.brandStory" :autosize="true"></el-input>
      </el-form-item>
      <el-form-item label="排序：" prop="sort">
        <el-input v-model.number="brand.sort"></el-input>
      </el-form-item>
      <el-form-item label="是否显示：">
        <el-radio-group v-model="brand.showStatus">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="品牌制造商：">
        <el-radio-group v-model="brand.factoryStatus">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('brandFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('brandFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { createBrand, getBrand, updateBrand } from '@/api/brand'
import SingleUpload from '@/components/Upload/singleUpload'
const defaultBrand = {
  bigPic: '',
  brandStory: '',
  factoryStatus: 0,
  firstLetter: '',
  logo: '',
  name: '',
  showStatus: 0,
  sort: 0
};

const data = reactive({
  brand: Object.assign({}, defaultBrand),
  rules: {
    name: [
      { required: true, message: '请输入品牌名称', trigger: 'blur' },
      { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' }
    ],
    logo: [
      { required: true, message: '请输入品牌logo', trigger: 'blur' }
    ],
    sort: [
      { type: 'number', message: '排序必须为数字' }
    ],
  }
})

if (isEdit) {
  getBrand($route.query.id).then(response => {
    brand = response.data;
  });
} else {
  brand = Object.assign({}, defaultBrand);
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
          updateBrand($route.query.id, brand).then(response => {
            $refs[formName].resetFields();
            $message({
              message: '修改成功',
              type: 'success',
              duration: 1000
            });
            $router.back();
          });
        } else {
          createBrand(brand).then(response => {
            $refs[formName].resetFields();
            brand = Object.assign({}, defaultBrand);
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
},
function resetForm(formName) {
  $refs[formName].resetFields();
  brand = Object.assign({}, defaultBrand);
}

export default {
  name: 'BrandDetail',
  components: { SingleUpload },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
}
</script>
<style></style>


