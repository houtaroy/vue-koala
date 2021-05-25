import router from '@/router';
import store from '@/store';

router.beforeEach((to, from, next) => {
  console.log('我进守卫了');
  if (to.path === '/user/login') {
    next({ path: '/' });
  } else {
    // check login user.roles is null
    if (store.getters.permissions.length === 0) {
      // request login userInfo
      store
        .dispatch('permissions')
        .then((res) => {
          console.log('路由权限', res);
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
