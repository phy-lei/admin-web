<template>
  <div class="icon-body">
    <el-input
      v-model="name"
      clearable
      placeholder="请输入图标名称"
      :prefix-icon="Icons.Search"
      @change="change"
    ></el-input>
    <div class="icon-list">
      <div class="list-container">
        <div
          v-for="(Icon, index) in IconList"
          :key="index"
          :class="['icon-item-wrapper', props.activeIcon === Icon.name ? 'active' : '']"
          @click="selectedIcon(Icon)"
        >
          <el-icon class="el-input__icon">
            <component :is="Icon.name"></component>
          </el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import * as Icons from '@element-plus/icons-vue';

const props = defineProps({
  activeIcon: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:active-icon']);

const name = ref('');

const IconList = ref(Icons);
const selectedIcon = (icon) => {
  console.log('%c [ xxx ]', 'font-size:13px; background:pink; color:#bf2c9f;', props);
  document.body.click();
  emit('update:active-icon', icon.name);
};

const change = () => {
  console.log('%c [ xxx ]', 'font-size:13px; background:pink; color:#bf2c9f;', name.value);
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.icon-body {
  width: 100%;
  padding: 10px;
  .icon-list {
    height: 200px;
    overflow: auto;
    margin-top: 10px;
    .list-container {
      display: flex;
      flex-wrap: wrap;
      .icon-item-wrapper {
        width: 25px;
        height: 25px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          background: #ececec;
        }

        &.active {
          background: #ececec;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>
