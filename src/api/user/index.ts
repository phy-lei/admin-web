import { UserListListItem } from './model';
import { ReqPage, ResPage } from '@/api/interface';
import http from '@/api';
import { OAUTH } from '@/api/config/servicePort';

/**
 * @name 用户管理模块
 */
export const fetchListApi = async (params: ReqPage) =>
  http.post<ResPage<UserListListItem>>(OAUTH + `/user/page`, params);

export const getUserInfoApi = async (id: number) => http.get(OAUTH + `/user/${id}`);

export const getCurrentUserInfoApi = async () => http.get(OAUTH + `/user/current`);

export const createAdminApi = async (params: UserListListItem) =>
  http.post(OAUTH + `/user/create`, params);

export const updateAdminApi = async (params: UserListListItem) =>
  http.post(OAUTH + `/user/update/${params.lqbId}`, params);

export const updateStatusApi = async (params: { lqbId: number; lqbStatus: number }) =>
  http.post(OAUTH + `/user/status/update/`, params);

export const deleteAdminApi = async (id: number) => http.post(OAUTH + `/user/delete/${id}`);

export const allocRoleApi = async (id: number, params: number[]) =>
  http.post(OAUTH + `/user/role/update/${id}`, params);

export const getRoleByIdApi = async (id: number) => http.get(OAUTH + `/user/role/${id}`);

export const updatePasswordApi = async (params: {
  /** 新密码 */
  newPassword: string;
  /** 旧密码 */
  oldPassword: string;
  /** 用户名 */
  username: string;
}) => http.post(OAUTH + `/user/password/update`, params);

export const getUserDetailApi = async (id: number) => http.get(OAUTH + `/user/${id}`);
