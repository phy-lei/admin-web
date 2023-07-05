<template>
  <el-dialog v-model="dialogVisible" title="修改密码" width="500px" draggable>
    <div>
      <el-form ref="ruleFormRef" :model="data" :rules="rules">
        <el-form-item label="原密码" prop="oldPassword">
          <el-input v-model="data.oldPassword" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="data.newPassword" type="password" show-password></el-input>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { FormInstance } from 'element-plus';
import { updatePasswordApi } from '@/api/user';
import { useUserStore } from '@/stores/modules/user';

const emit = defineEmits(['confirm']);
const userStore = useUserStore();
const dialogVisible = ref(false);
const ruleFormRef = ref<FormInstance>();
const data = reactive({
  oldPassword: '',
  newPassword: '',
});
const rules = reactive({
  oldPassword: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
  newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
});
const openDialog = () => {
  dialogVisible.value = true;
};

const confirm = () => {
  ruleFormRef.value?.validate((valid) => {
    if (valid) {
      updatePasswordApi({ ...data, username: userStore.userInfo.lqbUsername }).then((res) => {
        console.log('%c [ xxx ]', 'font-size:13px; background:pink; color:#bf2c9f;', res);
        emit('confirm');
        dialogVisible.value = false;
      });
    }
  });
};

defineExpose({ openDialog });
</script>
