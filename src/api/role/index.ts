import { AllRoleListItemDto, RoleListItemDto } from './model';
import { ReqPage, ResPage } from '@/api/interface';
import http from '@/api';
import { PORT1 } from '@/api/config/servicePort';

/**
 * @name 角色模块
 */
export const getAllRoleListApi = async () =>
  http.get<AllRoleListItemDto[]>(PORT1 + `/role/listAll`);

export const getRoleListApi = async (params: ReqPage) =>
  http.get<ResPage<RoleListItemDto[]>>(PORT1 + `/role/list`, params);

export const createRoleApi = async (params: RoleListItemDto) =>
  http.post(PORT1 + `/role/create`, params);

export const updateRoleApi = async (params: RoleListItemDto) =>
  http.post(PORT1 + `/role/update/${params.lqbId}`, params);

export const updateRoleStatusApi = async (params: { id: number; status: number }) =>
  http.post(PORT1 + `/role/updateStatus/${params.id}?status=${params.status}`);

export const deleteRoleApi = async (params: number[]) => http.post(PORT1 + `/role/delete`, params);

export const fetchAllRoleList = async (params: ReqPage) => http.get(PORT1 + `/role/list`, params);

export const allocResource = async (params: ReqPage) => http.get(PORT1 + `/role/list`, params);

export const listResourceByRole = async (params: ReqPage) => http.get(PORT1 + `/role/list`, params);

export const allocMenu = async (params: ReqPage) => http.get(PORT1 + `/role/list`, params);

export const listMenuByRole = async (params: ReqPage) => http.get(PORT1 + `/role/list`, params);
