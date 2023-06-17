import { ReqParams, LoginDto } from './model';
import authMenuList from '@/assets/json/authMenuList.json';
import authButtonList from '@/assets/json/authButtonList.json';
import http from '@/api';
import { PORT1 } from '@/api/config/servicePort';

/**
 * @name 登录模块
 */
export const loginApi = async (params: ReqParams) =>
  http.post<LoginDto>(PORT1 + `/user/login`, params, { noLoading: true });

// 获取菜单列表
export const getAuthMenuListApi = () => {
  // return http.get<Menu.MenuOptions[]>(PORT1 + `/menu/list`, {}, { noLoading: true });
  // 如果想让菜单变为本地数据，注释上一行代码，并引入本地 authMenuList.json 数据
  return authMenuList;
};

// 获取按钮权限
export const getAuthButtonListApi = () => {
  // return http.get<Login.ResAuthButtons>(PORT1 + `/auth/buttons`, {}, { noLoading: true });
  // 如果想让按钮权限变为本地数据，注释上一行代码，并引入本地 authButtonList.json 数据
  return authButtonList;
};

// 用户退出登录
export const logoutApi = () => {
  return http.post(PORT1 + `/logout`);
};
