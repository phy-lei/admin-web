<template>
  <div>
    <el-card class="login-form-layout">
      <el-form
        ref="form"
        auto-complete="on"
        :model="loginForm"
        :rules="loginRules"
        label-position="left"
      >
        <div style="text-align: center">
          <svg-icon
            icon-class="login-mall"
            style="width: 56px; height: 56px; color: #409eff"
          ></svg-icon>
        </div>
        <h2 class="login-title color-main">mall-admin-web</h2>
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            name="username"
            type="text"
            auto-complete="on"
            placeholder="请输入用户名"
          >
            <span slot="prefix">
              <svg-icon icon-class="user" class="color-main"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            name="password"
            type="password"
            auto-complete="on"
            placeholder="请输入密码"
          >
            <span slot="prefix">
              <svg-icon icon-class="password" class="color-main"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 60px; text-align: center">
          <el-button style="width: 45%" type="primary" :loading="loading" @click="handleLogin">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus';
import { useUserStore } from '@/stores/modules/user';
import { useTabsStore } from '@/stores/modules/tabs';
import { useKeepAliveStore } from '@/stores/modules/keepAlive';
import { loginApi } from '@/api/login';
import { initDynamicRouter } from '@/router/modules/dynamicRouter';
import { HOME_URL } from '@/config';
import { getTimeState } from '@/utils';

const router = useRouter();
const userStore = useUserStore();
const tabsStore = useTabsStore();
const keepAliveStore = useKeepAliveStore();

const loginForm = reactive({
  username: '',
  password: '',
});

const loading = ref(false);

const form = ref();

const validateUsername = (rule: any, value: string, callback: any) => {
  if (!(value.trim().length >= 3)) {
    callback(new Error('请输入正确的用户名'));
  } else {
    callback();
  }
};
const validatePass = (rule: any, value: any, callback: any) => {
  if (value.length < 3) {
    callback(new Error('密码不能小于3位'));
  } else {
    callback();
  }
};
const loginRules = {
  username: [{ required: true, trigger: 'blur', validator: validateUsername }],
  password: [{ required: true, trigger: 'blur', validator: validatePass }],
};

const handleLogin = () => {
  form.value.validate(async (valid: any) => {
    if (valid) {
      loading.value = true;
      try {
        // 1.执行登录接口
        const res = await loginApi({
          lqbUsername: loginForm.username,
          lqbPasswd: loginForm.password,
        });
        userStore.setToken(res.tokenValue);

        // 2.添加动态路由
        await initDynamicRouter();

        // 3.清空 tabs、keepAlive 数据
        tabsStore.closeMultipleTab();
        keepAliveStore.setKeepAliveName();

        // 4.跳转到首页
        router.push(HOME_URL);

        ElNotification({
          title: getTimeState(),
          message: '欢迎登录lqb',
          type: 'success',
          duration: 3000,
        });
      } finally {
        loading.value = false;
      }
    } else {
      console.log('参数验证不合法！');
      return false;
    }
  });
};
</script>

<style lang="scss" scoped>
.login-form-layout {
  position: absolute;
  left: 0;
  right: 0;
  width: 360px;
  margin: 140px auto;
  border-top: 10px solid #409eff;
}

.login-title {
  text-align: center;
}

.login-center-layout {
  background: #409eff;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  margin-top: 200px;
}
</style>
