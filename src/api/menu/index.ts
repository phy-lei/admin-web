import { ReqAuth, ReqParams, ResResult } from './model';
import { get, post } from '@/utils/http';

enum URL {
  login = '/oauth-service/user/login',
  permission = '/v1/user/permission',
}



export const fetchList = async (data: ReqParams) => get<ResResult>({ url: URL.login, data });

export const getMenu = async (data: ReqParams) => get<ResResult>({ url: URL.login, data });

export const deleteMenu = async (data: ReqParams) => get<ResResult>({ url: URL.login, data });

export const updateHidden = async (data: ReqParams) => get<ResResult>({ url: URL.login, data });

export const createMenu = async (data: ReqParams) => get<ResResult>({ url: URL.login, data });

export const updateMenu = async (data: ReqParams) => get<ResResult>({ url: URL.login, data });

export const fetchTreeList = async (data: ReqParams) => get<ResResult>({ url: URL.login, data });



export default { fetchList, deleteMenu, updateHidden, createMenu, updateMenu, getMenu, fetchTreeList };
