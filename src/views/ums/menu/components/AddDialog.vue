<template>
  <el-dialog
    v-model="dialogVisible"
    :title="isEdit ? '添加菜单' : '修改菜单'"
    width="40%"
    destroy-on-close
    append-to-body
  >
    <el-form ref="ruleFormRef" :model="data" :rules="rules" label-width="150px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="上级菜单" prop="lqbParentId">
            <el-tree-select
              v-model="data.lqbParentId"
              :data="menuList"
              check-strictly
              :render-after-expand="false"
              :props="defaultProps"
            />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="菜单名称" prop="lqbMenuName">
            <el-input v-model="data.lqbMenuName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="显示排序" prop="lqbOrderNum">
            <el-input-number v-model="data.lqbOrderNum" :min="1" controls-position="right" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="路由地址" prop="lqbUrl">
            <el-input v-model="data.lqbUrl"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="显示状态" prop="lqbHidden">
            <el-radio-group v-model="data.lqbHidden">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单状态" prop="lqbHidden">
            <el-radio-group v-model="data.lqbHidden">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
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
  label: 'lqbMenuName',
  value: 'lqbId',
};
const dialogVisible = ref(false);
const isEdit = ref(false);
const initData = {
  lqbParentId: -1,
  lqbMenuName: '',
  lqbOrderNum: 1,
  lqbUrl: '',
  lqbHidden: 1,
};

const menuList = ref<any[]>([]);

const ruleFormRef = ref<FormInstance>();
const data = ref({ ...initData });

const rules = reactive({
  lqbMenuName: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
  lqbUrl: [{ required: true, message: '请输入路由地址', trigger: 'blur' }],
});

const showDialog = (treeList, form?: typeof initData) => {
  menuList.value = [
    {
      lqbId: 0,
      lqbMenuName: '根目录',
      children: treeList,
    },
  ];
  console.log('%c [ xxx ]', 'font-size:13px; background:pink; color:#bf2c9f;', menuList.value);
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

const confirm = async () => {
  await ruleFormRef.value?.validate((valid) => {
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
