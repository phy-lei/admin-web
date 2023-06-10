import { ReqAuth, ReqParams, ResResult } from './model';
import { get, post } from '@/utils/http';

enum URL {
  login = '/oauth-service/user/login',
  permission = '/v1/user/permission',
}

export const fetchAllResourceList = async (data: ReqParams) => get<ResResult>({ url: URL.login, data });

export const fetchList = async (data: ReqParams) => get<ResResult>({ url: URL.login, data });

export const createResource = async (data: ReqParams) => get<ResResult>({ url: URL.login, data });

export const updateResource = async (data: ReqParams) => get<ResResult>({ url: URL.login, data });

export const deleteResource = async (data: ReqParams) => get<ResResult>({ url: URL.login, data });



export default { fetchAllResourceList, fetchList, createResource, updateResource, deleteResource };
