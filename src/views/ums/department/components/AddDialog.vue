<template>
  <el-dialog
    v-model="dialogVisible"
    :title="isEdit ? '添加部门' : '修改部门'"
    width="40%"
    destroy-on-close
    append-to-body
  >
    <el-form ref="ruleFormRef" :model="data" :rules="rules" label-width="150px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="上级部门" prop="lqbParentId">
            <el-tree-select
              v-model="data.lqbParentId"
              :data="departmentList"
              check-strictly
              :render-after-expand="false"
              :props="defaultProps"
            />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="部门名称" prop="lqbDeptName">
            <el-input v-model="data.lqbDeptName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="显示排序" prop="lqbOrderNum">
            <el-input-number v-model="data.lqbOrderNum" :min="1" controls-position="right" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="说明" prop="lqbRemark">
            <el-input v-model="data.lqbRemark"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="部门状态" prop="lqbStatus">
            <el-radio-group v-model="data.lqbStatus">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">禁用</el-radio>
            </el-radio-group>
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

const emit = defineEmits(['confirm']);
const defaultProps = {
  children: 'children',
  label: 'lqbDeptName',
  value: 'lqbId',
};
const dialogVisible = ref(false);
const isEdit = ref(false);
const initData = {
  lqbParentId: 0,
  lqbDeptName: '',
  lqbOrderNum: 1,
  lqbRemark: '',
  lqbStatus: 1,
};

const departmentList = ref<any[]>([]);

const ruleFormRef = ref<FormInstance>();
const data = ref({ ...initData });

const rules = reactive({
  lqbDeptName: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
  lqbOrderNum: [{ required: true, message: '请输入排序', trigger: 'blur' }],
});

const showDialog = (treeList, form?: typeof initData) => {
  departmentList.value = [
    {
      lqbId: 0,
      lqbDeptName: '根目录',
      children: treeList,
    },
  ];
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
