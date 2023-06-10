export interface ReqParams {
  lqbUsername: string;
  lqbPasswd: string;
}

export interface ReqAuth {
  auths: string[];
  modules: string[];
  is_admin?: 0 | 1;
}

export interface ResResult {
  isLogin?: boolean
  loginDevice?: string
  loginId?: Record<string, any>
  loginType?: string
  sessionTimeout?: number
  tag?: string
  tokenActivityTimeout?: number
  tokenName?: string
  tokenSessionTimeout?: number
  tokenTimeout?: number
  tokenValue: string
}