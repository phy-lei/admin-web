import { ReqAuth, ReqParams, ResResult } from './model';
import { get, post } from '@/utils/http';

enum URL {
  login = '/oauth-service/user/login',
  permission = '/v1/user/permission',
}

const fetchList = async (data: ReqParams) => get<ResResult>({ url: URL.login, data });

const createRole = async () => get<ReqAuth>({ url: URL.permission });

const updateRole = async (data: ReqParams) => get<ResResult>({ url: URL.login, data });

const updateStatus = async () => get<ReqAuth>({ url: URL.permission });


const deleteRole = async (data: ReqParams) => get<ResResult>({ url: URL.login, data });


export default { fetchList, createRole, updateRole, updateStatus, deleteRole };
