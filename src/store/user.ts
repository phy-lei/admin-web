import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { getToken, setToken, removeToken } from '@/utils/auth';
import { ReqParams } from '@/api/user/model';
import fetchApi from '@/api/user';

export const useUserStore = defineStore('user', () => {
  const avatar = ref('')

  const login = async (params: ReqParams) => {
    // 密码加密
    // params.password = encryptByDES(params.password);
    const res = await fetchApi.login(params);
    console.log('%c [ res ]', 'font-size:13px; background:pink; color:#bf2c9f;', res);
    if (res) {
      // save token
      setToken(res.tokenValue);
    }
    return res;
  }

  return { avatar, login }
})