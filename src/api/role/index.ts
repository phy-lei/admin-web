import { ReqAuth, ReqParams, ResResult, AllRoleListItemDto } from './model';
import { PORT1 } from '@/api/config/servicePort';
import { get, post } from '@/utils/http';

enum URL {
  login = '/user/login',
  permission = '/v1/user/permission',
  roleList = '/role/listAll',
  allRoleList = '/role/listAll',
}

export const fetchList = async (data: ReqParams) =>
  get<ResResult>({ url: PORT1 + URL.roleList, data });

export const createRole = async () => get<ReqAuth>({ url: PORT1 + URL.permission });

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

export default {
  fetchList,
  fetchAllRoleList,
  createRole,
  updateRole,
  updateStatus,
  deleteRole,
  allocResource,
  listResourceByRole,
  allocMenu,
  listMenuByRole,
};
