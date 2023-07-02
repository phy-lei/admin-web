import { ReqPage, ResPage } from '@/api/interface';
import { MenuTreeListItemDto } from './model';
import http from '@/api';
import { OAUTH } from '@/api/config/servicePort';

/**
 * @name 菜单模块
 */
export const getMenuListAllApi = async () =>
  http.get<MenuTreeListItemDto[]>(OAUTH + `/menu/treeList`);

export const addMenuApi = async (params: MenuTreeListItemDto) =>
  http.post(OAUTH + `/menu/create`, params);

export const updateMenuApi = async (params: MenuTreeListItemDto) =>
  http.post(OAUTH + `/menu/update/${params.lqbId}`, params);

export const delMenuApi = async (id: number) => http.post(OAUTH + `/menu/delete/${id}`);

export const getMenuListByRoleIdApi = async (roleId: number) =>
  http.get<MenuTreeListItemDto[]>(OAUTH + `/role/listMenu/${roleId}`);
