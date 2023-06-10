<template>
  <el-card class="form-container" shadow="never">
    <div
      v-for="(cate, index) in data.allResourceCate"
      :class="index === 0 ? 'top-line' : null"
      :key="'cate' + cate.id"
    >
      <el-row class="table-layout" style="background: #f2f6fc">
        <el-checkbox
          v-model="cate.checked"
          :indeterminate="isIndeterminate(cate.id)"
          @change="handleCheckAllChange(cate)"
        >
          {{ cate.name }}
        </el-checkbox>
      </el-row>
      <el-row class="table-layout">
        <el-col
          :span="8"
          v-for="resource in getResourceByCate(cate.id)"
          :key="resource.id"
          style="padding: 4px 0"
        >
          <el-checkbox v-model="resource.checked" @change="handleCheckChange(resource)">
            {{ resource.name }}
          </el-checkbox>
        </el-col>
      </el-row>
    </div>
    <div style="margin-top: 20px" align="center">
      <el-button type="primary" @click="handleSave()">保存</el-button>
      <el-button @click="handleClear()">清空</el-button>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { fetchAllResourceList } from '@/api/resource';
import { listAllCate } from '@/api/resourceCategory';
import { allocResource, listResourceByRole } from '@/api/role';

const route = useRoute();
const router = useRouter();
const data = reactive<any>({
  roleId: route.query.roleId,
  allResource: [],
  allResourceCate: [],
});

getAllResourceCateList();

function getAllResourceList() {
  fetchAllResourceList().then((response) => {
    data.allResource = response.data;
    for (let i = 0; i < data.allResource.length; i++) {
      data.allResource[i].checked = false;
    }
    getResourceByRole(data.roleId);
  });
}
function getAllResourceCateList() {
  listAllCate().then((response) => {
    data.allResourceCate = response.data;
    for (let i = 0; i < data.allResourceCate.length; i++) {
      data.allResourceCate[i].checked = false;
    }
    getAllResourceList();
  });
}
function getResourceByCate(categoryId) {
  let cateResource: any = [];
  if (data.allResource == null) return null;
  for (let i = 0; i < data.allResource.length; i++) {
    let resource = data.allResource[i];
    if (resource.categoryId === categoryId) {
      cateResource.push(resource);
    }
  }
  return cateResource;
}
function getResourceByRole(roleId) {
  listResourceByRole(roleId).then((response) => {
    let allocResource = response.data;
    data.allResource.forEach((item) => {
      item.checked = getResourceChecked(item.id, allocResource);
    });
    data.allResourceCate.forEach((item) => {
      item.checked = isAllChecked(item.id);
    });
  });
}
function getResourceChecked(resourceId, allocResource) {
  if (allocResource == null || allocResource.length === 0) return false;
  for (let i = 0; i < allocResource.length; i++) {
    if (allocResource[i].id === resourceId) {
      return true;
    }
  }
  return false;
}
function isIndeterminate(categoryId) {
  let cateResources = getResourceByCate(categoryId);
  if (cateResources == null) return false;
  let checkedCount = 0;
  for (let i = 0; i < cateResources.length; i++) {
    if (cateResources[i].checked === true) {
      checkedCount++;
    }
  }
  return !(checkedCount === 0 || checkedCount === cateResources.length);
}
function isAllChecked(categoryId) {
  let cateResources = getResourceByCate(categoryId);
  if (cateResources == null) return false;
  let checkedCount = 0;
  for (let i = 0; i < cateResources.length; i++) {
    if (cateResources[i].checked === true) {
      checkedCount++;
    }
  }
  if (checkedCount === 0) {
    return false;
  }
  return checkedCount === cateResources.length;
}
function handleSave() {
  ElMessageBox.confirm('是否分配资源？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    let checkedResourceIds: any = new Set();
    if (data.allResource != null && data.allResource.length > 0) {
      data.allResource.forEach((item) => {
        if (item.checked) {
          checkedResourceIds.add(item.id);
        }
      });
    }
    let params = new URLSearchParams();
    params.append('roleId', data.roleId);
    params.append('resourceIds', Array.from(checkedResourceIds));
    allocResource(params).then((response) => {
      ElMessage({
        message: '分配成功',
        type: 'success',
        duration: 1000,
      });
      router.back();
    });
  });
}
function handleClear() {
  data.allResourceCate.forEach((item) => {
    item.checked = false;
  });
  data.allResource.forEach((item) => {
    item.checked = false;
  });
}
function handleCheckAllChange(cate) {
  let cateResources = getResourceByCate(cate.id);
  for (let i = 0; i < cateResources.length; i++) {
    cateResources[i].checked = cate.checked;
  }
}
function handleCheckChange(resource) {
  data.allResourceCate.forEach((item) => {
    if (item.id === resource.categoryId) {
      item.checked = isAllChecked(resource.categoryId);
    }
  });
}
</script>

<style scoped>
.table-layout {
  padding: 20px;
  border-left: 1px solid #dcdfe6;
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
}

.top-line {
  border-top: 1px solid #dcdfe6;
}
</style>
