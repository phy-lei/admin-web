<template>
  <el-dialog
    v-model="dialogVisible"
    :title="isEdit ? '添加岗位' : '修改岗位'"
    width="40%"
    destroy-on-close
    append-to-body
  >
    <el-form ref="ruleFormRef" :model="data" :rules="rules" label-width="150px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="归属部门" prop="lqbDepartmentId">
            <el-tree-select
              v-model="data.lqbDepartmentId"
              :data="departmentList"
              check-strictly
              :render-after-expand="false"
              :props="defaultProps"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="岗位名称" prop="lqbName">
            <el-input v-model="data.lqbName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button size="small" @click="close">取 消</el-button>
        <el-button type="primary" size="small" @click="confirm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import type { FormInstance } from 'element-plus';
import { getDepartmentListAllApi } from '@/api/department';
import { handleTree } from '@/utils/index';

const defaultProps = {
  children: 'children',
  label: 'lqbDeptName',
  value: 'lqbId',
};
const emit = defineEmits(['confirm']);

const dialogVisible = ref(false);
const isEdit = ref(false);
const initData = {
  lqbName: '',
  lqbDepartmentId: 0,
};

const departmentList = ref<Awaited<ReturnType<typeof getDepartmentListAllApi>>>([]);

const ruleFormRef = ref<FormInstance>();
const data = ref({ ...initData });

const rules = reactive({
  lqbName: [{ required: true, message: '请输入岗位名称', trigger: 'blur' }],
});

const getDepartmentListAllProcess = async () => {
  const res = await getDepartmentListAllApi();
  const { tree } = handleTree(res);
  departmentList.value = tree;
};

getDepartmentListAllProcess();

const showDialog = (form?: typeof initData) => {
  if (form) {
    data.value = { ...form };
    isEdit.value = true;
  } else {
    isEdit.value = false;
    data.value = { ...initData };
  }
  dialogVisible.value = true;
};

const close = () => {
  dialogVisible.value = false;
  setTimeout(() => {
    Object.assign(data.value, initData);
  }, 500);
};

const confirm = () => {
  ruleFormRef.value?.validate((valid) => {
    if (valid) {
      emit('confirm', { ...data.value });
      close();
    }
  });
};

defineExpose({
  showDialog,
  isEdit,
});
</script>
