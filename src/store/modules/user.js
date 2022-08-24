import { openDoor, closeDoor, login, logout, getInfo, delUser, updateInfo, getRiskItems, getPieData, addAdmin, addPasserby, userList, editUser, getRegionList, getPolicy, updatePolicy, selectUserByName, addRecord, recordList, getNum, getLineData } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  username: '',
  phone: '',
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_PHONE: (state, phone) => {
    state.phone = phone
  },
  SET_USERNAME: (state, username) => {
    //console.log('123');
    state.username = username
  }
}

const actions = {
  openDoor({ commit }) {
    return new Promise((resolve, reject) => {
      openDoor()
        .then((response) => {
          const { httpCode } = response;
          resolve(httpCode);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  closeDoor({ commit }) {
    return new Promise((resolve, reject) => {
      closeDoor()
        .then((response) => {
          const { httpCode } = response;
          resolve(httpCode);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },


  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  addAdmin({ commit }, adminInfo) {
    return new Promise((resolve, reject) => {
      addAdmin(adminInfo)
        .then((response) => {
          //更新token
          const { data } = response;

          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  userList({ commit }, query) {
    return new Promise((resolve, reject) => {
      userList(query)
        .then((response) => {
          //更新token
          const { data } = response;
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  recordList({ commit }, query) {
    return new Promise((resolve, reject) => {
      recordList(query)
        .then((response) => {
          //更新token
          const { data } = response;
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },


  editUser({ commit }, data) {
    return new Promise((resolve, reject) => {
      editUser(data)
        .then((response) => {
          //更新token
          const { msg } = response;
          resolve(msg);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getRegionList({ commit }) {
    return new Promise((resolve, reject) => {
      getRegionList()
        .then((response) => {
          const { data } = response;
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getPolicy({ commit }) {
    return new Promise((resolve, reject) => {
      getPolicy()
        .then((response) => {
          const { data } = response;
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  //增加记录
  addRecord({ commit }, data) {
    return new Promise((resolve, reject) => {
      addRecord(data)
        .then((response) => {
          const { httpCode, msg } = response;
          resolve({ httpCode, msg });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  updatePolicy({ commit }, data) {
    return new Promise((resolve, reject) => {
      updatePolicy(data)
        .then((response) => {
          const { msg, data } = response;
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  selectUserByName({ commit }, data) {
    return new Promise((resolve, reject) => {
      selectUserByName(data)
        .then((response) => {
          const { data } = response;
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  updateInfo({ commit, state }, newInfo) {
    return new Promise((resolve, reject) => {
      updateInfo(newInfo)
        .then((response) => {
          //更新token
          const { data } = response;
          setToken(data.newToken);
          commit("SET_NAME", data.newName);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  delUser({ commit, state }, delInfo) {
    return new Promise((resolve, reject) => {
      delUser(delInfo)
        .then((response) => {
          //更新token
          const { data } = response;
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  addPasserby({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      addPasserby(data)
        .then((response) => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });

  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, name, avatar, introduction, phone, username } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        commit('SET_PHONE', phone)
        commit('SET_USERNAME', username)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getNum({ commit }) {
    return new Promise((resolve, reject) => {
      getNum()
        .then((response) => {
          const { data } = response;
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getLineData({ commit }) {
    return new Promise((resolve, reject) => {
      getLineData()
        .then((response) => {
          const { data } = response;
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getPieData({ commit }) {
    return new Promise((resolve, reject) => {
      getPieData()
        .then((response) => {
          const { data } = response;
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getRiskItems({ commit }) {
    return new Promise((resolve, reject) => {
      getRiskItems()
        .then((response) => {
          const { data } = response;
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
