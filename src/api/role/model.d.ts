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

export interface AllRoleListItemDto {
  /** 创建时间 */
  lqbCreateTime?: string
  /** 是否被删除：1->已删除；0->未删除 */
  lqbDeleted?: number
  lqbId?: number
  /** 排序字段 */
  lqbOrderNum?: number
  /** 关联平台主键id */
  lqbPlatformId?: number
  /** 描述 */
  lqbRemark?: string
  /** 名称 */
  lqbRoleName?: string
  /** 启用状态：0->禁用；1->启用 */
  lqbRoleStatus?: number
  /** 后台用户数量 */
  lqbUserCount?: number
}