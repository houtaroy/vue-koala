import router from '@/router';
import store from '@/store';

import { asyncRoutes } from '@/router/config';
import { Permission } from '@/types';
import { RouteConfig } from 'vue-router';

router.beforeEach((to, from, next) => {
  if (to.path === '/user/login') {
    next({ path: '/' });
  } else {
    // check login user.roles is null
    if (store.getters.permissions.length === 0) {
      // request login userInfo
      store
        .dispatch('permissions')
        .then((res) => {
          router.addRoutes(filterAsyncRouters(asyncRoutes, res));
          next();
          // const permissions = res && res.permissions;
          // generate dynamic router
          // store.dispatch('GenerateRoutes', permissions).then(() => {
          //   // 根据roles权限生成可访问的路由表
          //   // 动态添加可访问路由表
          //   router.addRoutes(store.getters.addRouters);
          //   // 请求带有 redirect 重定向时，登录自动重定向到该地址
          //   const redirect = decodeURIComponent(from.query.redirect || to.path);
          //   if (to.path === redirect) {
          //     // set the replace: true so the navigation will not leave a history record
          //     next({ ...to, replace: true });
          //   } else {
          //     // 跳转到目的路由
          //     next({ path: redirect });
          //   }
          // });
        })
        .catch(() => {
          // 失败时，获取用户信息失败时，调用登出，来清空历史保留信息
          // store.dispatch('Logout').then(() => {
          //   next({ path: loginRoutePath, query: { redirect: to.fullPath } });
          // });
        });
    } else {
      next();
    }
  }
});

/**
 * 筛选动态路由
 *
 * @param routers 动态路由配置
 * @param permissions 权限实体数组
 * @returns 筛选后的路由配置数组
 */
function filterAsyncRouters(
  routers: RouteConfig[],
  permissions: Permission[]
): RouteConfig[] {
  const result: RouteConfig[] = [];
  routers.forEach((route) => {
    const newRoute = Object.assign({}, route);
    if (hasPermission(newRoute, permissions)) {
      result.push(newRoute);
      if (newRoute.children && newRoute.children.length) {
        newRoute.children = filterAsyncRouters(newRoute.children, permissions);
      }
    }
  });
  return result;
}

/**
 * 判断是否拥有路由权限
 *
 * @param route 路由实体
 * @param permissions 权限实体数组
 * @returns boolean 是否拥有权限 true 是, false 否
 */
function hasPermission(route: RouteConfig, permissions: Permission[]): boolean {
  let flag = true;
  if (route.meta && route.meta.permissions) {
    flag = false;
    for (const permission of permissions) {
      if (route.meta.permissions.includes(permission.code)) {
        flag = true;
        break;
      }
    }
  }
  return flag;
}
