import { PostListItemDto } from './model';
import { ReqPage, ResPage } from '@/api/interface';
import http from '@/api';
import { OAUTH } from '@/api/config/servicePort';

/**
 * @name 岗位模块
 */
export const getPostListAllApi = async (params: ReqPage) =>
  http.post<PostListItemDto[]>(OAUTH + `/position/page`, params);

export const addPostApi = async (params: PostListItemDto) =>
  http.post(OAUTH + `/position/create`, params);

export const updatePostApi = async (params: PostListItemDto) =>
  http.post(OAUTH + `/position/update/${params.lqbId}`, params);

export const delPostApi = async (id: number) => http.post(OAUTH + `/position/delete/${id}`);
