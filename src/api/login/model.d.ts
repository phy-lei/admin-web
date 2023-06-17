export interface ReqParams {
  lqbUsername: string;
  lqbPasswd: string;
}

export interface LoginDto {
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