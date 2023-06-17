import { UserListReqParams, UserListResponseData, ReqAuth, UserListListItem } from './model';

import http from '@/api';
import { PORT1 } from '@/api/config/servicePort';

/**
 * @name 用户管理模块
 */

export const fetchListApi = async (params: UserListReqParams) =>
  http.post<UserListResponseData>(PORT1 + `/user/page`, params);

// todo
export const createAdminApi = async () => http.get<ReqAuth>(PORT1 + `/user/page`);

export const updateAdminApi = async (params: UserListListItem) =>
  http.post<any>(PORT1 + `/user/update/${params.lqbId}`, params);

export const updateStatusApi = async (params: { lqbId: number; lqbStatus: number }) =>
  http.post<ReqAuth>(PORT1 + `status/update`, params);

export const deleteAdminApi = async (params: { lqbId: number; lqbStatus: number }) =>
  http.post<ReqAuth>(PORT1 + `status/update`, params);

export const getRoleByAdminApi = async (params: { lqbId: number; lqbStatus: number }) =>
  http.post<ReqAuth>(PORT1 + `status/update`, params);

export const allocRoleApi = async (params: { lqbId: number; lqbStatus: number }) =>
  http.post<ReqAuth>(PORT1 + `status/update`, params);
