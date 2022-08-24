import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  //默认界面
  {
    path: '/',
    component: Layout,
    redirect: '/datamonitor',
    children: [{
      path: 'datamonitor',
      name: 'datamonitor',
      component: () => import('@/views/datamonitor/index'),
      meta: { title: '数据监控', icon: 'shuju' }
    }]
  },
  {
    path: '/inout',
    component: Layout,
    redirect: '/inout/record',
    name: 'inout',
    meta: {
      title: '进出管理',
      icon: 'inlet-and-outlet'
    },
    children: [
      {
        path: 'record',
        component: () => import('@/views/inout/record/index'), // Parent router-view
        name: 'record',
        meta: { title: '进出记录', icon: 'bijijilu' },
      },
      {
        path: 'register',
        component: () => import('@/views/inout/register/index'),
        name: 'register',
        meta: { title: '进出登记', icon: 'dengji' }
      }
    ]
  },

  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'myinfo',
        name: 'myinfo',
        component: () => import('@/views/myinfo/index'),
        meta: { title: '账户信息', icon: 'xinxi' }
      }
    ]
  },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/systemmanage',
    component: Layout,
    redirect: '/systemmanage/structure',
    name: 'systemmanage',
    meta: { title: '系统管理', icon: 'guanli', roles: ['admin'] },
    children: [
      {
        path: 'structure',
        name: 'structure',
        component: () => import('@/views/structure/index'),
        meta: { title: '管理结构', icon: 'tree', roles: ['admin'] }
      },
      {
        path: 'adduser',
        name: 'adduser',
        component: () => import('@/views/adduser/index'),
        meta: { title: '添加管理员', icon: 'tianjiayonghu', roles: ['admin'] }
      },
      {
        path: 'importuser',
        name: 'importuser',
        component: () => import('@/views/importuser/index'),
        meta: {
          title: '导入用户', icon: 'daoru', roles: ['admin']
        }
      },
      {
        path: 'manageuser',
        name: 'manageuser',
        component: () => import('@/views/manageuser/index'),
        meta: {
          title: '管理用户', icon: 'user', roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'accesspolicy',
        name: 'accesspolicy',
        component: () => import('@/views/accesspolicy/index'),
        meta: { title: '出入政策', icon: 'shezhiguize', roles: ['admin'] }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
