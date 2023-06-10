import { ReqAuth, ReqParams, ResResult } from './model';
import { get, post } from '@/utils/http';

enum URL {
  login = '/oauth-service/user/login',
  permission = '/v1/user/permission',
}

export const login = async (data: ReqParams) => post<ResResult>({ url: URL.login, data });

export const permission = async () => get<ReqAuth>({ url: URL.permission });

export const fetchList = async (data: ReqParams) => post<any>({ url: URL.login, data });

export const createAdmin = async () => get<ReqAuth>({ url: URL.permission });

export const updateAdmin = async (data: ReqParams) => post<any>({ url: URL.login, data });

export const updateStatus = async () => get<ReqAuth>({ url: URL.permission });

export const deleteAdmin = async (data: ReqParams) => post<any>({ url: URL.login, data });

export const getRoleByAdmin = async () => get<ReqAuth>({ url: URL.permission });

export const allocRole = async (data: ReqParams) => post<any>({ url: URL.login, data });


export default {
  login,
  permission,
  fetchList,
  createAdmin,
  updateAdmin,
  updateStatus,
  deleteAdmin,
  getRoleByAdmin,
  allocRole,
};
