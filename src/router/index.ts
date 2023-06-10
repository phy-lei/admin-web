
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import permission from './permission'


/* Layout */
import Layout from '../views/layout/Layout.vue'

/**
 *                    if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap: RouteRecordRaw[] = [
  { path: '/login', component: () => import('@/views/login/login.vue') },
  // { path: '/404', component: () => import('@/views/404'),  },
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/home.vue'),
      meta: { title: '首页', icon: 'home' }
    },
    ]
  },

  {
    path: '/atom',
    component: Layout,
    redirect: '/atom',
    children: [{
      path: 'product',
      name: 'product',
      component: () => import('@/views/atom/atom.vue'),
      meta: { title: 'atom', icon: 'home' }
    },
    ]
  },


]

export const asyncRouterMap: RouteRecordRaw[] = [
  {
    path: '/ums',
    component: Layout,
    redirect: '/ums/admin',
    name: 'ums',
    meta: { title: '权限', icon: 'ums' },
    children: [
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/ums/admin/index.vue'),
        meta: { title: '用户列表', icon: 'ums-admin' }
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/ums/role/index.vue'),
        meta: { title: '角色列表', icon: 'ums-role' }
      },
      {
        path: 'allocMenu',
        name: 'allocMenu',
        component: () => import('@/views/ums/role/allocMenu.vue'),
        meta: { title: '分配菜单' },

      },
      {
        path: 'allocResource',
        name: 'allocResource',
        component: () => import('@/views/ums/role/allocResource.vue'),
        meta: { title: '分配资源' },

      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/ums/menu/index.vue'),
        meta: { title: '菜单列表', icon: 'ums-menu' }
      },
      {
        path: 'addMenu',
        name: 'addMenu',
        component: () => import('@/views/ums/menu/add.vue'),
        meta: { title: '添加菜单' },

      },
      {
        path: 'updateMenu',
        name: 'updateMenu',
        component: () => import('@/views/ums/menu/update.vue'),
        meta: { title: '修改菜单' },

      },
      {
        path: 'resource',
        name: 'resource',
        component: () => import('@/views/ums/resource/index.vue'),
        meta: { title: '资源列表', icon: 'ums-resource' }
      },
      {
        path: 'resourceCategory',
        name: 'resourceCategory',
        component: () => import('@/views/ums/resource/categoryList.vue'),
        meta: { title: '资源分类' },

      }
    ]
  },
]

constantRouterMap.push(...asyncRouterMap)

const router = createRouter({
  history: createWebHashHistory(), // history 模式则使用 createWebHistory()
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes: constantRouterMap,
});

permission(router)

export default router;


