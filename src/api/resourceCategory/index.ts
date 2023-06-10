import { ReqAuth, ReqParams, ResResult } from './model';
import { get, post } from '@/utils/http';

enum URL {
  login = '/oauth-service/user/login',
  permission = '/v1/user/permission',
}

export const listAllCate = async (data: ReqParams) => get<ResResult>({ url: URL.login, data });



export default { listAllCate };
