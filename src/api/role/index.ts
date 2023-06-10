import { ReqAuth, ReqParams, ResResult } from './model';
import { get, post } from '@/utils/http';

enum URL {
  login = '/oauth-service/user/login',
  permission = '/v1/user/permission',
}

export const fetchList = async (data: ReqParams) => get<ResResult>({ url: URL.login, data });

export const createRole = async () => get<ReqAuth>({ url: URL.permission });

export const updateRole = async (data: ReqParams) => get<ResResult>({ url: URL.login, data });

export const updateStatus = async () => get<ReqAuth>({ url: URL.permission });

export const deleteRole = async (data: ReqParams) => get<ResResult>({ url: URL.login, data });

export const fetchAllRoleList = async (data: ReqParams) => get<ResResult>({ url: URL.login, data });

export const allocResource = async (data: ReqParams) => get<ResResult>({ url: URL.login, data });

export const listResourceByRole = async (data: ReqParams) => get<ResResult>({ url: URL.login, data });


export default {
  fetchList,
  fetchAllRoleList,
  createRole,
  updateRole,
  updateStatus,
  deleteRole,
  allocResource,
  listResourceByRole
};
