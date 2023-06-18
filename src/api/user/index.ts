import { UserListListItem } from './model';
import { ReqPage, ResPage } from '@/api/interface';
import http from '@/api';
import { PORT1 } from '@/api/config/servicePort';

/**
 * @name 用户管理模块
 */
export const fetchListApi = async (params: ReqPage) =>
  http.post<ResPage<UserListListItem[]>>(PORT1 + `/user/page`, params);

export const getUserInfoApi = async (id: number) => http.get(PORT1 + `/user/${id}`);

export const getCurrentUserInfoApi = async () => http.get(PORT1 + `/user/current`);

export const createAdminApi = async (params: UserListListItem) =>
  http.post(PORT1 + `/user/register`, params);

export const updateAdminApi = async (params: UserListListItem) =>
  http.post(PORT1 + `/user/update/${params.lqbId}`, params);

export const updateStatusApi = async (params: { lqbId: number; lqbStatus: number }) =>
  http.post(PORT1 + `/user/status/update/`, params);

export const deleteAdminApi = async (id: number) => http.post(PORT1 + `/user/delete/${id}`);

export const allocRoleApi = async (id: number, params: number[]) =>
  http.post(PORT1 + `/user/role/update/${id}`, params);

export const getRoleByIdApi = async (id: number) => http.get(PORT1 + `/user/role/${id}`);
