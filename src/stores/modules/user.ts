import { defineStore } from 'pinia';
import { UserState } from '@/stores/interface';
import piniaPersistConfig from '@/config/piniaPersist';

export const useUserStore = defineStore({
  id: 'lqb-user',
  state: (): UserState => ({
    token: '',
    userInfo: { lqbUsername: '' } as UserState['userInfo'],
  }),
  getters: {},
  actions: {
    // Set Token
    setToken(token: string) {
      console.log('%c [ xxx ]', 'font-size:13px; background:pink; color:#bf2c9f;', token);
      this.token = token;
    },
    // Set setUserInfo
    setUserInfo(userInfo: UserState['userInfo']) {
      this.userInfo = userInfo;
    },
  },
  persist: piniaPersistConfig('lqb-user'),
});
