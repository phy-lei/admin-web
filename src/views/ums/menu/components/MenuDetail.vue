<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="data.menu" :rules="data.rules" ref="menuFrom" label-width="150px">
      <el-form-item label="菜单名称：" prop="title">
        <el-input v-model="data.menu.title"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单：">
        <el-select v-model="data.menu.parentId" placeholder="请选择菜单">
          <el-option
            v-for="item in data.selectMenuList"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="前端名称：" prop="name">
        <el-input v-model="data.menu.name"></el-input>
      </el-form-item>
      <el-form-item label="前端图标：" prop="icon">
        <el-input v-model="data.menu.icon" style="width: 80%"></el-input>
        <svg-icon style="margin-left: 8px" :icon-class="data.menu.icon"></svg-icon>
      </el-form-item>
      <el-form-item label="是否显示：">
        <el-radio-group v-model="data.menu.hidden">
          <el-radio :label="0">是</el-radio>
          <el-radio :label="1">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input v-model="data.menu.sort"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { fetchList, createMenu, updateMenu, getMenu } from '@/api/menu';

const defaultMenu = {
  title: '',
  parentId: 0,
  name: '',
  icon: '',
  hidden: 0,
  sort: 0,
};

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
});

const route = useRoute();
const router = useRouter();
const menuFrom = ref();
const data = reactive<any>({
  menu: Object.assign({}, defaultMenu),
  selectMenuList: [],
  rules: {
    title: [
      { required: true, message: '请输入菜单名称', trigger: 'blur' },
      { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' },
    ],
    name: [
      { required: true, message: '请输入前端名称', trigger: 'blur' },
      { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' },
    ],
    icon: [
      { required: true, message: '请输入前端图标', trigger: 'blur' },
      { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' },
    ],
  },
});

function init() {
  if (props.isEdit) {
    getMenu(route.query.id).then((response) => {
      data.menu = response.data;
    });
  } else {
    data.menu = Object.assign({}, defaultMenu);
  }
  getSelectMenuList();
}

init();

function getSelectMenuList() {
  fetchList(0, { pageSize: 100, pageNum: 1 }).then((response) => {
    data.selectMenuList = response.data.list;
    data.selectMenuList.unshift({ id: 0, title: '无上级菜单' });
  });
}
function onSubmit() {
  menuFrom.value.validate((valid) => {
    if (valid) {
      ElMessageBox.confirm('是否提交数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        if (props.isEdit) {
          updateMenu(route.query.id, data.menu).then((response) => {
            ElMessage({
              message: '修改成功',
              type: 'success',
              duration: 1000,
            });
            router.back();
          });
        } else {
          createMenu(data.menu).then((response) => {
            menuFrom.value.resetFields();
            resetForm();
            ElMessage({
              message: '提交成功',
              type: 'success',
              duration: 1000,
            });
            router.back();
          });
        }
      });
    } else {
      ElMessage({
        message: '验证失败',
        type: 'error',
        duration: 1000,
      });
      return false;
    }
  });
}
function resetForm() {
  menuFrom.value.resetFields();
  data.menu = Object.assign({}, defaultMenu);
  getSelectMenuList();
}
</script>

<style scoped></style>
