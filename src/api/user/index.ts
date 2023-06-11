import { UserListReqParams, UserListResponseData, ReqAuth, ReqParams, ResResult, UserListListItem } from './model';
import { get, post } from '@/utils/http';

enum URL {
  login = '/oauth-service/user/login',
  permission = '/v1/user/permission',
  userList = '/oauth-service/user/page',
  updateStatus = '/oauth-service/user/status/update',
  updateAdmin = '/oauth-service/user/update',
}

export const login = async (data: ReqParams) => post<ResResult>({ url: URL.login, data });

export const permission = async () => get<ReqAuth>({ url: URL.permission });

export const fetchList = async (data: UserListReqParams) => post<UserListResponseData>({ url: URL.userList, data });

export const createAdmin = async () => get<ReqAuth>({ url: URL.permission });

export const updateAdmin = async (data: UserListListItem) => post<any>({ url: URL.updateAdmin + `/${data.lqbId}`, data });

export const updateStatus = async (data: {
  lqbId: number
  lqbStatus: number
}) => post<ReqAuth>({ url: URL.updateStatus, data });

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
