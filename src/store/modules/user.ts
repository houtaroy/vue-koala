import { MutationTree, GetterTree, ActionTree, Module } from 'vuex';

import { Permission } from '@/types';
import * as authApi from '@/apis/auth';

export interface UserState {
  permissions: Permission[];
}

const state: UserState = {
  permissions: []
};

const getters: GetterTree<UserState, any> = {
  permissions(state): Permission[] {
    return state.permissions;
  }
};

const mutations: MutationTree<UserState> = {
  SET_PERMISSIONS(state, permissions) {
    state.permissions = permissions;
  }
};

const actions: ActionTree<UserState, any> = {
  permissions({ commit }) {
    return new Promise((resolve, reject) => {
      authApi
        .permissions()
        .then((result) => {
          commit('SET_PERMISSIONS', result);
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};

const user: Module<UserState, any> = {
  state,
  getters,
  mutations,
  actions
};

export default user;
