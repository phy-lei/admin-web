import { ReqPage, ResPage } from '@/api/interface';
import http from '@/api';
import { OAUTH } from '@/api/config/servicePort';

/**
 * @name 菜单模块
 */
export const getMenuListAllApi = async () => http.get(OAUTH + `/menu/treeList`);

export const getMenuListPageApi = async () => http.get(OAUTH + `/menu/treeList`);
