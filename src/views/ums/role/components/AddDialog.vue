<template>
  <el-dialog
    v-model="dialogVisible"
    :title="isEdit ? '编辑角色' : '新增角色'"
    width="40%"
    destroy-on-close
    append-to-body
  >
    <el-form ref="ruleFormRef" :model="data" label-width="150px">
      <el-form-item label="角色名称：" prop="lqbNickName">
        <el-input v-model="data.lqbRoleName" style="width: 250px"></el-input>
      </el-form-item>
      <el-form-item label="描述：" prop="departments">
        <el-input v-model="data.lqbRemark" style="width: 250px" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="是否启用：" prop="lqbUserStatus">
        <el-radio-group v-model="data.lqbRoleStatus">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
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
import { ref } from 'vue';
import { RoleListItemDto } from '@/api/role/model';

const emit = defineEmits(['confirm']);

const dialogVisible = ref(false);
const isEdit = ref(false);
const initData = {
  lqbRoleName: '',
  lqbRemark: '',
  lqbRoleStatus: 1,
};
const data = ref<RoleListItemDto>({ ...initData });

const showDialog = (form?: RoleListItemDto) => {
  if (form) {
    data.value = { ...form };
    isEdit.value = true;
  } else {
    isEdit.value = false;
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
  emit('confirm', { ...data.value });
  close();
};

defineExpose({
  showDialog,
  isEdit,
});
</script>
