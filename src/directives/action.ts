import Vue from 'vue';
import store from '@/store';

import { Permission } from '@/types';

const action = Vue.directive('permission', {
  inserted: function (el, binding, vnode) {
    const permissionCode = binding.arg || '';
    const permissionCodes: string[] = store.getters.permissions.map(
      (permission: Permission) => {
        return permission.code;
      }
    );
    if (!permissionCodes.includes(permissionCode)) {
      (el.parentNode && el.parentNode.removeChild(el)) ||
        (el.style.display = 'none');
    }
  }
});
