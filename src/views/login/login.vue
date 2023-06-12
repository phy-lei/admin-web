<template>
  <div>
    <el-card class="login-form-layout">
      <el-form
        autoComplete="on"
        :model="loginForm"
        :rules="loginRules"
        ref="form"
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
            name="username"
            type="text"
            v-model="loginForm.username"
            autoComplete="on"
            placeholder="请输入用户名"
          >
            <span slot="prefix">
              <svg-icon icon-class="user" class="color-main"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            type="password"
            v-model="loginForm.password"
            autoComplete="on"
            placeholder="请输入密码"
          >
            <span slot="prefix">
              <svg-icon icon-class="password" class="color-main"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 60px; text-align: center">
          <el-button
            style="width: 45%"
            type="primary"
            :loading="loading"
            @click.native.prevent="handleLogin"
          >
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
import { useUserStore } from '@/stores/user';

const store = useUserStore();
const router = useRouter();
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
      // let isSupport = getSupport();
      // if(isSupport===undefined||isSupport==null){
      //   this.dialogVisible =true;
      //   return;
      // }
      loading.value = true;

      store
        .login({
          lqbUsername: loginForm.username,
          lqbPasswd: loginForm.password,
        })
        .then((res) => {
          console.log('%c [ xxx ]', 'font-size:13px; background:pink; color:#bf2c9f;', res);
          if (res) {
            router.push({ name: 'home' });
          }
        })
        .finally(() => {
          loading.value = false;
        });
      // this.$store
      //   .dispatch('Login', this.loginForm)
      //   .then(() => {
      //     this.loading = false;
      //     setCookie('username', this.loginForm.username, 15);
      //     setCookie('password', this.loginForm.password, 15);
      //     this.$router.push({ path: '/' });
      //   })
      //   .catch(() => {
      //     this.loading = false;
      //   });
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
