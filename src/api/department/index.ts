import { DepartmentListItemDto } from './model';
import http from '@/api';
import { OAUTH } from '@/api/config/servicePort';

/**
 * @name 部门模块
 */
export const getDepartmentListAllApi = async (
  params: {
    /** 部门名称 */
    lqbDeptName?: string;
    /** 排序字段 */
    lqbOrderNum?: number;
    /** 所有父部门，格式：/研发中心/开发部 */
    lqbParenDeptName?: string;
    /** 上级部门ID */
    lqbParentId?: number;
    /** 说明 */
    lqbRemark?: string;
    /** 启用状态：0->禁用；1->启用 */
    lqbStatus?: number;
  } = {}
) => http.post<DepartmentListItemDto[]>(OAUTH + `/department/list`, params);

export const addDepartmentApi = async (params: DepartmentListItemDto) =>
  http.post(OAUTH + `/department/create`, params);

export const updateDepartmentApi = async (params: DepartmentListItemDto) =>
  http.post(OAUTH + `/department/update/${params.lqbId}`, params);

export const delDepartmentApi = async (id: number) => http.post(OAUTH + `/department/delete/${id}`);
