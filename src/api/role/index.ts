import { AllRoleListItemDto, RoleListItemDto } from './model';
import { ReqPage, ResPage } from '@/api/interface';
import http from '@/api';
import { OAUTH } from '@/api/config/servicePort';

/**
 * @name 角色模块
 */
export const getAllRoleListApi = async () =>
  http.get<AllRoleListItemDto[]>(OAUTH + `/role/listAll`);

export const getRoleListApi = async (params: ReqPage) =>
  http.get<ResPage<RoleListItemDto[]>>(OAUTH + `/role/list`, params);

export const createRoleApi = async (params: RoleListItemDto) =>
  http.post(OAUTH + `/role/create`, params);

export const updateRoleApi = async (params: RoleListItemDto) =>
  http.post(OAUTH + `/role/update/${params.lqbId}`, params);

export const updateRoleStatusApi = async (params: { id: number; status: number }) =>
  http.post(OAUTH + `/role/updateStatus/${params.id}?status=${params.status}`);

export const deleteRoleApi = async (params: number[]) => http.post(OAUTH + `/role/delete`, params);

export const fetchAllRoleList = async (params: ReqPage) => http.get(OAUTH + `/role/list`, params);

export const allocMenuByIdApi = async (roleId: number, params: number[]) =>
  http.post(OAUTH + `/role/allocMenu/${roleId}`, params);
