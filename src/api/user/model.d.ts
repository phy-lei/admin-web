
export interface UserListReqParams {
  /** 搜索值 */
  keyword?: string
  /** 分页数 */
  pageNum?: number
  /** 分页大小 */
  pageSize?: number
}

interface ResponseDataListItemDepartmentsItem {
  /** 创建时间 */
  lqbCreateTime?: string
  /** 创建人ID */
  lqbCreateUserId?: number
  /** 是否被删除：1->已删除；0->未删除 */
  lqbDeleted?: number
  /** 部门名称 */
  lqbDeptName?: string
  /** 部门主键ID */
  lqbId?: number
  /** 排序字段 */
  lqbOrderNum?: number
  /** 上级部门ID */
  lqbParentId?: number
  /** 部门路径 */
  lqbParentPath?: string
  /** 关联平台表主键id */
  lqbPlatformId?: number
  /** 说明 */
  lqbRemark?: string
  /** 更新时间 */
  lqbUpdateTime?: string
  /** 操作人ID */
  lqbUpdateUserId?: number
}

interface ResponseDataListItemMenuListItem {
  children?: any[]
  /** 前端隐藏：0->不隐藏；1->隐藏 */
  lqbHidden?: number
  /** 图标路径 */
  lqbIcon?: string
  /** 菜单主键ID */
  lqbId?: number
  /** 菜单编号 */
  lqbMenuCode?: string
  /** 菜单级数 */
  lqbMenuLevel?: number
  /** 菜单名称 */
  lqbMenuName?: string
  /** 排序 */
  lqbOrderNum?: number
  /** 上级菜单ID */
  lqbParentId?: number
  /** 菜单路径 */
  lqbParentPath?: string
  /** 说明 */
  lqbRemark?: string
  /** 菜单访问路径 */
  lqbUrl?: string
  /** 前端名称 */
  lqbWebName?: string
}

interface ResponseDataListItemResourceListItem {
  /** 资源分类ID */
  lqbCategoryId?: number
  /** 创建时间 */
  lqbCreateTime?: string
  /** 创建人ID */
  lqbCreateUserId?: number
  /** 是否被删除：1->已删除；0->未删除 */
  lqbDeleted?: number
  /** 资源主键ID */
  lqbId?: number
  /** 菜单主键ID */
  lqbMenuId?: number
  /** 资源描述 */
  lqbRemark?: string
  /** 资源编号 */
  lqbResourceCode?: string
  /** 资源名称 */
  lqbResourceName?: string
  /** 更新时间 */
  lqbUpdateTime?: string
  /** 操作人ID */
  lqbUpdateUserId?: number
  /** 资源URL */
  lqbUrl?: string
}

export interface UserListListItem {
  /** 部门 */
  departments?: ResponseDataListItemDepartmentsItem[]
  /** 资源过滤 */
  filterList?: string[]
  /** 最后登录时间 */
  loginTime?: string
  /** 家庭地址 */
  lqbAddress?: string
  /** 是否是管理员：1->是；0->否 */
  lqbAdmin?: number
  /** 邮箱 */
  lqbEmail?: string
  /** 头像 */
  lqbIcon?: string
  lqbId?: number
  /** 手机号 */
  lqbMobile?: string
  /** 第二个手机号 */
  lqbMobileTwo?: string
  /** 昵称 */
  lqbNickName?: string
  /** 排序字段 */
  lqbOrderNum?: number
  /** 平台id */
  lqbPlatformId?: number
  /** 用户来源：0->自填；1->管理员添加；2->微信；3：第三方 */
  lqbSource?: number
  /** 座机号码 */
  lqbTelephone?: string
  /** 帐号启用状态：1->启用；0->禁用 */
  lqbUserStatus?: number
  /** 用户名 */
  lqbUsername?: string
  /** 菜单 */
  menuList?: ResponseDataListItemMenuListItem[]
  /** 资源 */
  resourceList?: ResponseDataListItemResourceListItem[]
  loading: boolean
}

export interface UserListResponseData {
  list?: UserListListItem[]
  pageNum?: number
  pageSize?: number
  total?: number
  totalPage?: number
}

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