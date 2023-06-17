import { ReqAuth, ReqParams, ResResult, AllRoleListItemDto } from './model';
import { PORT1 } from '@/api/config/servicePort';
import http from '@/api';

enum URL {
  login = '/user/login',
  permission = '/v1/user/permission',
  roleList = '/role/listAll',
  allRoleList = '/role/listAll',
}

/**
 * @name 角色模块
 */
export const getAllRoleListApi = async () =>
  http.get<AllRoleListItemDto[]>(PORT1 + `/role/listAll`);

export const createRole = async () => http.post<ReqAuth>({ url: PORT1 + URL.permission });

export const fetchList = async (data: ReqParams) =>
  get<ResResult>({ url: PORT1 + URL.roleList, data });

export const updateRole = async (data: ReqParams) =>
  get<ResResult>({ url: PORT1 + URL.login, data });

export const updateStatus = async () => get<ReqAuth>({ url: PORT1 + URL.permission });

export const deleteRole = async (data: ReqParams) =>
  get<ResResult>({ url: PORT1 + URL.login, data });

export const fetchAllRoleList = async () =>
  get<AllRoleListItemDto[]>({ url: PORT1 + URL.allRoleList });

export const allocResource = async (data: ReqParams) =>
  get<ResResult>({ url: PORT1 + URL.login, data });

export const listResourceByRole = async (data: ReqParams) =>
  get<ResResult>({ url: PORT1 + URL.login, data });

export const allocMenu = async (data: ReqParams) =>
  get<ResResult>({ url: PORT1 + URL.login, data });

export const listMenuByRole = async (data: ReqParams) =>
  get<ResResult>({ url: PORT1 + URL.login, data });
