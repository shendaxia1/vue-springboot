import { checklogin, logout, getInfo, getPermission } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  permissions: []
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
  }  ,
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {//这句话是一个异步结果，正确时返回resolve的值，错误时返回reject的值
      checklogin({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', response.token)
        setToken(response.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const  data  = response
        

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, name, avatar, introduction } = data

        // roles must be a non-empty array
        if (!roles || roles <= 0) {
          reject('getInfo: 用户角色为空，请添加角色后登陆!')
        }

        commit('SET_ROLES',roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        console.log(state.roles)
        resolve(roles)//成功后返回存储在vuex中的roles的值
      }).catch(error => {
        reject(error)
      })
    })
  },
 // 获取用户权限
  getUserPermissions({ commit, state }) {
    return new Promise((resolve, reject) => {
      getPermission(state.token).then(response => {
        const  data  = response
        

        if (!data) {
          reject('校验失败，请重新登陆或者联系管理员！')
        }

        const { permissions, name, avatar, introduction } = data

        // roles must be a non-empty array
        if (!permissions || permissions <= 0) {
          reject('getUserPermissions: 用户权限为空，请添加权限后登陆!')
        }

        commit('SET_PERMISSIONS',permissions)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(permissions)//成功后返回存储在vuex中的roles的值
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_PERMISSIONS', [])
        removeToken()
        resetRouter()
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
      commit('SET_PERMISSIONS', [])
      removeToken()
      resolve()
    })
  },

  // Dynamically modify permissions
  changePermissioins({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'
      commit('SET_TOKEN', token)
      setToken(token)

      const { permissions } = await dispatch('getPermission')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', permissions, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
